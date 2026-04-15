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

  /**
   * Store lead via Resend Contacts API (primary) and DB (secondary).
   * Resend builds the remarketing audience; DB is a local backup.
   * Neither failure blocks the bonus generation — user trust comes first.
   */
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();

  if (resendApiKey && audienceId) {
    try {
      const response = await fetch("https://api.resend.com/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audience_id: audienceId,
          email,
          unsubscribed: false,
          first_name: "",
          last_name: "",
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`[email-capture] Resend error (${response.status}): ${errorBody}`);
      } else {
        console.info(`[email-capture] Added to Resend: ${email.slice(0, 3)}***@${email.split("@")[1]} source=${source}`);
      }
    } catch (err) {
      console.error("[email-capture] Resend request failed:", err);
    }
  }

  // DB backup — store locally when DATABASE_URL is set
  try {
    if (process.env.DATABASE_URL) {
      const { db } = await import("@/db");
      const { sql } = await import("drizzle-orm");

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS email_leads (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL,
          source TEXT NOT NULL DEFAULT 'unknown',
          ip_hash TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await db.execute(sql`
        INSERT INTO email_leads (email, source, ip_hash)
        VALUES (${email}, ${source}, ${clientIp.slice(0, 8) + "***"})
        ON CONFLICT DO NOTHING
      `);

      console.info(`[email-capture] Stored lead in DB: ${email.slice(0, 3)}***@${email.split("@")[1]} source=${source}`);
    } else if (!resendApiKey) {
      console.info(`[email-capture] Lead (no Resend, no DB): ${email.slice(0, 3)}***@${email.split("@")[1]} source=${source} ip=${clientIp.slice(0, 8)}***`);
    }
  } catch (storageError) {
    console.error("[email-capture] DB storage error (non-fatal):", storageError);
  }

  return NextResponse.json(
    { success: true, bonusGranted: true, message: "Thank you! 1 bonus generation unlocked." },
    { status: 200 }
  );
}
