/**
 * Better Auth Configuration — server-side authentication setup.
 *
 * WHY BETTER AUTH (not NextAuth):
 * Better Auth is a newer, framework-agnostic auth library that provides:
 * - Built-in database adapter (works directly with Drizzle/Neon)
 * - Simpler API surface than NextAuth v5
 * - First-class TypeScript support
 * - No separate "authOptions" pattern — just export the auth instance
 *
 * This template uses Better Auth + Google OAuth. The auth instance is
 * imported by API routes that need to check the user session.
 *
 * SETUP:
 * 1. Set BETTER_AUTH_SECRET (openssl rand -base64 32)
 * 2. Set BETTER_AUTH_URL (your production URL)
 * 3. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
 * 4. Set DATABASE_URL (Neon Postgres pooled connection string)
 *
 * Created: 2026-03-24 by Builder 4 for LogoForge AI clone
 */
import { betterAuth } from "better-auth";

/**
 * The auth instance — configured with Google OAuth and database session storage.
 * This is the SINGLE source of truth for auth in the application.
 *
 * Exported as `auth` and used by:
 * - src/app/api/auth/[...all]/route.ts (handles OAuth callbacks)
 * - Any API route that needs: auth.api.getSession({ headers })
 * - src/lib/auth-client.ts (client-side auth hooks via authClient)
 */
export const auth = betterAuth({
  /**
   * Database URL for session/user storage.
   * Better Auth auto-creates its own tables (user, session, account, verification)
   * on first use. These are separate from our app tables in db/schema/.
   */
  database: {
    type: "postgres",
    url: process.env.DATABASE_URL || "",
  },

  /**
   * Secret for signing session tokens.
   * MUST be a strong random string in production.
   * Generate with: openssl rand -base64 32
   */
  secret: process.env.BETTER_AUTH_SECRET,

  /**
   * Base URL for auth callbacks.
   * Better Auth uses this to construct redirect URIs for OAuth providers.
   * In production, this should be your domain (e.g., https://logoforgeai.com).
   */
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4738",

  /**
   * OAuth providers — Google only for launch.
   * Google has the highest conversion rate for sign-up because almost
   * everyone has a Google account. More providers can be added later.
   */
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
