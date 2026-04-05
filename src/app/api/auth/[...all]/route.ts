/**
 * Better Auth catch-all route handler.
 *
 * WHY CATCH-ALL:
 * Better Auth uses a single API endpoint pattern where all auth-related requests
 * (sign-in, sign-out, session checks, OAuth callbacks, CSRF tokens) go through
 * one route handler. The [...all] catch-all segment captures every path under
 * /api/auth/ and passes it to Better Auth's handler.
 *
 * REQUESTS HANDLED:
 * - GET /api/auth/session — Check current session
 * - POST /api/auth/sign-in/social — Initiate OAuth sign-in
 * - GET /api/auth/callback/google — OAuth callback from Google
 * - POST /api/auth/sign-out — Sign out and clear session
 * - GET /api/auth/csrf — Get CSRF token
 *
 * IMPORTANT:
 * This route must be listed in PUBLIC_PATHS in middleware.ts.
 * If middleware blocks access to /api/auth/*, OAuth callbacks will fail
 * because the user doesn't have a session yet when Google redirects back.
 *
 * The auth configuration (providers, database adapter) is defined in src/lib/auth.ts.
 */
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

function isSessionRead(pathname: string) {
  return pathname.endsWith("/session") || pathname.endsWith("/get-session");
}

function isClientLog(pathname: string) {
  return pathname.endsWith("/_log");
}

export async function GET(request: Request) {
  const pathname = new URL(request.url).pathname;
  if (!process.env.DATABASE_URL && isSessionRead(pathname)) {
    return Response.json(null);
  }
  return handler.GET(request);
}

export async function POST(request: Request) {
  const pathname = new URL(request.url).pathname;
  if (!process.env.DATABASE_URL) {
    if (isSessionRead(pathname)) {
      return Response.json(null);
    }
    if (isClientLog(pathname)) {
      return new Response(null, { status: 204 });
    }
  }
  return handler.POST(request);
}
