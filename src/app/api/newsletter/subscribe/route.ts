import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; windowStartMs: number }>();
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitMap.get(ip);

  if (!existing || now - existing.windowStartMs > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStartMs: now });
    return true;
  }

  if (existing.count >= RATE_LIMIT_COUNT) return false;
  existing.count++;
  return true;
}

function extractClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const clientIp = extractClientIp(request);

  if (!checkRateLimit(clientIp)) {
    console.warn(`[newsletter-subscribe] Rate limit hit for IP: ${clientIp}`);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  let body: { email?: string; source?: string; cloneTag?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = (body.source || "unknown").trim().slice(0, 50);
  const cloneTag = (body.cloneTag || "generateailogo").trim().slice(0, 50);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();

  if (!resendApiKey || !audienceId) {
    console.warn(
      `[newsletter-subscribe] Missing Resend env vars. email=${email.slice(
        0,
        3
      )}*** source=${source} cloneTag=${cloneTag}`
    );
    return NextResponse.json(
      {
        success: true,
        persisted: false,
        blockedByEnv: !resendApiKey ? "RESEND_API_KEY" : "RESEND_AUDIENCE_ID",
      },
      { status: 200 }
    );
  }

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
        first_name: cloneTag,
        last_name: source,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `[newsletter-subscribe] Resend error (${response.status}): ${errorBody}`
      );
    } else {
      console.info(
        `[newsletter-subscribe] Added contact ${email.slice(
          0,
          3
        )}*** cloneTag=${cloneTag} source=${source}`
      );
    }
  } catch (error) {
    console.error("[newsletter-subscribe] Resend request failed:", error);
  }

  return NextResponse.json({ success: true, persisted: true }, { status: 200 });
}
