/**
 * TrustBadges.tsx — Social proof / trust signal strip for LogoForge AI
 *
 * Purpose: Conversion optimization. Visitors who see trust badges before the
 * pricing section are more likely to complete checkout. This component renders
 * four concise trust signals: encryption, privacy (no data retention), GDPR
 * compliance, and user volume. Placed between the hero section and the
 * pricing section so it appears naturally in the scroll journey.
 *
 * Design notes:
 * - Blue accent (#3b82f6) matches the ai-logo-generator blue brand theme.
 * - Icon backgrounds use a low-opacity blue tint so the icons feel integrated
 *   without competing with the main CTA buttons.
 * - Inline SVGs only — no external icon library dependencies, zero extra bundle
 *   weight, works in any RSC / streaming context.
 * - Server Component: no interactivity needed, renders at build time.
 */

export default function TrustBadges() {
  return (
    <section className="border-t border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {/* Badge 1 — 256-bit Encryption */}
          <div className="flex flex-col items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-5">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-lg"
              style={{ background: "rgba(59, 130, 246, 0.1)" }}
            >
              {/* Lock icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#3b82f6" strokeWidth="1.75" fill="none" />
                <path
                  d="M8 11V7a4 4 0 0 1 8 0v4"
                  stroke="#3b82f6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="12" cy="16" r="1.25" fill="#3b82f6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">256-bit Encryption</p>
              <p className="text-xs text-white/40 mt-0.5 leading-snug">Bank-grade security</p>
            </div>
          </div>

          {/* Badge 2 — No Data Stored */}
          <div className="flex flex-col items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-5">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-lg"
              style={{ background: "rgba(59, 130, 246, 0.1)" }}
            >
              {/* Shield icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3L4 6.5v5C4 15.09 7.41 19.34 12 21c4.59-1.66 8-5.91 8-9.5v-5L12 3z"
                  stroke="#3b82f6"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M12 8v4M12 14.5h.01"
                  stroke="#3b82f6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">No Data Stored</p>
              <p className="text-xs text-white/40 mt-0.5 leading-snug">Designs stay private</p>
            </div>
          </div>

          {/* Badge 3 — GDPR Compliant */}
          <div className="flex flex-col items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-5">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-lg"
              style={{ background: "rgba(59, 130, 246, 0.1)" }}
            >
              {/* Checkmark-shield icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3L4 6.5v5C4 15.09 7.41 19.34 12 21c4.59-1.66 8-5.91 8-9.5v-5L12 3z"
                  stroke="#3b82f6"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#3b82f6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">GDPR Compliant</p>
              <p className="text-xs text-white/40 mt-0.5 leading-snug">EU privacy standards</p>
            </div>
          </div>

          {/* Badge 4 — 100,000+ Users */}
          <div className="flex flex-col items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-5">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-lg"
              style={{ background: "rgba(59, 130, 246, 0.1)" }}
            >
              {/* Users icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="9" cy="8" r="3" stroke="#3b82f6" strokeWidth="1.75" fill="none" />
                <path
                  d="M3 20c0-3.31 2.69-6 6-6s6 2.69 6 6"
                  stroke="#3b82f6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M16 6c1.66 0 3 1.34 3 3s-1.34 3-3 3"
                  stroke="#3b82f6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M19 20c0-2.76-1.56-5.14-3.86-6.28"
                  stroke="#3b82f6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">100,000+ Users</p>
              <p className="text-xs text-white/40 mt-0.5 leading-snug">Trusted worldwide</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
