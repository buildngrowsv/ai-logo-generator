"use client";
/**
 * StickyBottomCTA — Conversion-boosting sticky bar that appears when the user
 * scrolls past the hero section. Dismissible with 24-hour localStorage cooldown
 * so it doesn't annoy returning visitors.
 *
 * IMPORTED BY: root layout or homepage component
 * WHY: Keeps the primary CTA visible during content consumption (features,
 * pricing, FAQ sections) where users often decide to act but lose the button.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

const DISMISS_KEY = "sticky-cta-dismissed";
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    /* Check localStorage for prior dismissal within cooldown window */
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt && Date.now() - Number(dismissedAt) < COOLDOWN_MS) {
      return; // still in cooldown
    }
    setDismissed(false);

    const onScroll = () => {
      /* Show after scrolling 600px (roughly past the hero section) */
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="border-t border-white/10 bg-gray-950/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <span className="hidden sm:inline text-sm font-semibold text-white truncate">
              LogoForge AI
            </span>
            <span className="text-sm text-gray-400 truncate">
              Create professional logos in seconds
            </span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/studio"
              className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Try Free
            </Link>
            <button
              onClick={handleDismiss}
              className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="Dismiss"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
