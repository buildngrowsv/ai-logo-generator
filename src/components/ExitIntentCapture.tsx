"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const COOKIE_NAME = "exit_intent_capture_dismissed";
const DISMISS_DAYS = 7;
const SCROLL_THRESHOLD = 0.35;
const DWELL_MS = 60_000;

function hasDismissCookie(): boolean {
  if (typeof document === "undefined") return true;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .some((part) => part.startsWith(`${COOKIE_NAME}=`));
}

function writeDismissCookie(): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000);
  document.cookie = `${COOKIE_NAME}=1; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export default function ExitIntentCapture() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const headline = useMemo(
    () => "Get logo design tips & exclusive deals",
    []
  );

  const dismiss = useCallback(() => {
    writeDismissCookie();
    setVisible(false);
  }, []);

  const openIfEligible = useCallback(() => {
    if (hasDismissCookie()) return;
    setVisible(true);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedEmail = email.trim();
      if (!trimmedEmail) return;

      setSubmitting(true);
      setError(null);

      try {
        const response = await fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: trimmedEmail,
            source: "exit_intent_capture",
            cloneTag: "generateailogo",
          }),
        });

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(body?.error || "Failed to subscribe");
        }

        writeDismissCookie();
        setSubmitted(true);
        setTimeout(() => setVisible(false), 2000);
      } catch (submissionError) {
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : "Failed to subscribe"
        );
      } finally {
        setSubmitting(false);
      }
    },
    [email]
  );

  useEffect(() => {
    if (hasDismissCookie()) return;

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 10) {
        openIfEligible();
      }
    };

    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const percentScrolled = window.scrollY / scrollableHeight;
      if (percentScrolled >= SCROLL_THRESHOLD) {
        setHasScrolled(true);
      }
    };

    const dwellTimer = window.setTimeout(() => {
      if (hasScrolled) {
        openIfEligible();
      }
    }, DWELL_MS);

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(dwellTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled, openIfEligible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-capture-title"
    >
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        aria-hidden="true"
        onClick={dismiss}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0f]/95 p-8 shadow-2xl backdrop-blur-xl">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">You&apos;re subscribed</h3>
            <p className="mt-2 text-sm text-gray-400">
              We&apos;ll send logo tips, product updates, and occasional offers.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                <span className="text-2xl">✉️</span>
              </div>
              <h3
                id="exit-intent-capture-title"
                className="text-xl font-bold text-white"
              >
                {headline}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-gray-400">
                Join the list for faster branding ideas, launch offers, and AI
                logo workflow advice built for founders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                autoComplete="email"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Subscribing..." : "Get Updates"}
              </button>
            </form>

            {error ? (
              <p className="mt-3 text-center text-xs text-red-300">{error}</p>
            ) : null}

            <p className="mt-4 text-center text-xs text-gray-500">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
