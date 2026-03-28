/**
 * POST /api/email-capture — stores email from the studio gate modal.
 *
 * PURPOSE:
 * When free-tier users hit the 4th generation attempt, the EmailCaptureModal
 * fires and offers 1 bonus generation in exchange for email. This endpoint:
 * 1. Validates the email
 * 2. Attempts to store it (logs to console if no DB is configured)
 * 3. Returns 200 so the client can proceed with the bonus generation
 *
 * STORAGE STRATEGY:
 * - If DATABASE_URL is set: stores in a simple email_leads table via Drizzle
 *   (or just logs — the schema insert is wrapped in try/catch so it's non-blocking)
 * - If DATABASE_URL is not set: logs to server console (useful in development;
 *   operator can see leads in Vercel function logs)
 *
 * WHY NON-BLOCKING:
 * Email storage failure should NEVER block the bonus generation. The user gave
 * us their email in good faith; denying the bonus because our DB hiccupped
 * would be a terrible UX and destroy trust. Always return 200 if email is valid.
 *
 * RATE LIMITING:
 * Basic IP rate limiting is applied to prevent email harvesting or spam submission.
 * Limit: 3 submissions per IP per hour (well above normal use).
 *
 * CREATED: 2026-03-28 by Custom 5 (conversion optimization sprint)
 * CALLED BY: src/components/conversion/EmailCaptureModal.tsx
 */
import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// IP rate limiter — 3 submissions per IP per hour
// Prevents email spam/harvesting via rapid form submissions.
// ---------------------------------------------------------------------------
const emailCaptureRateLimitMap = new Map<string, { count: number; windowStartMs: number }>();
const EMAIL_RATE_LIMIT_COUNT = 3;
const EMAIL_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkEmailRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = emailCaptureRateLimitMap.get(ip);

  if (!existing || now - existing.windowStartMs > EMAIL_RATE_LIMIT_WINDOW_MS) {
    emailCaptureRateLimitMap.set(ip, { count: 1, windowStartMs: now });
    return true;
  }

  if (existing.count >= EMAIL_RATE_LIMIT_COUNT) {
    return false;
  }

  existing.count++;
  return true;
}

/** Extract client IP from Vercel/Cloudflare headers */
function extractClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Loose email format validation */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const clientIp = extractClientIp(request);

  // Rate limit check
  if (!checkEmailRateLimit(clientIp)) {
    // Still return 200 to avoid punishing legitimate users who got IP-collided
    // with an abuser. Log the rate limit event for monitoring.
    console.warn(`[email-capture] Rate limit hit for IP: ${clientIp}`);
    return NextResponse.json({ success: true, message: "logged" }, { status: 200 });
  }

  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = (body.source || "unknown").trim().slice(0, 50);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Store the lead — try DB first, fall back to console log
  try {
    // Attempt DB storage if available.
    // WHY TRY/CATCH: the email_leads table may not exist in early deployments.
    // A missing table should not prevent the user from getting their bonus gen.
    if (process.env.DATABASE_URL) {
      // Dynamically import to avoid build-time failure if drizzle schema is missing
      // We use a raw SQL fallback rather than the ORM to avoid schema dependency.
      const { db } = await import("@/db");
      const { sql } = await import("drizzle-orm");

      // Create table if it doesn't exist (idempotent — safe to run on every request)
      // This avoids requiring a separate migration for this simple leads table.
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS email_leads (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL,
          source TEXT NOT NULL DEFAULT 'unknown',
          ip_hash TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      // Insert lead — ON CONFLICT DO NOTHING so duplicate emails don't throw
      await db.execute(sql`
        INSERT INTO email_leads (email, source, ip_hash)
        VALUES (${email}, ${source}, ${clientIp.slice(0, 8) + "***"})
        ON CONFLICT DO NOTHING
      `);

      console.info(`[email-capture] Stored lead: ${email.slice(0, 3)}***@${email.split("@")[1]} source=${source}`);
    } else {
      // No DB configured — log to Vercel function logs for operator visibility
      // Operator can check Vercel logs to see captured leads
      console.info(`[email-capture] Lead (no DB): ${email.slice(0, 3)}***@${email.split("@")[1]} source=${source} ip=${clientIp.slice(0, 8)}***`);
    }
  } catch (storageError) {
    // Storage failure — log but don't fail the request
    // The user gave us their email; we owe them the bonus generation regardless
    console.error("[email-capture] Storage error (non-fatal):", storageError);
  }

  return NextResponse.json(
    { success: true, bonusGranted: true, message: "Thank you! 1 bonus generation unlocked." },
    { status: 200 }
  );
}
