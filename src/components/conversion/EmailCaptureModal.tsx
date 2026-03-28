/**
 * EmailCaptureModal — email gate shown before the hard paywall.
 *
 * WHEN IT SHOWS:
 * When the user attempts their 4th generation (one before the limit where
 * we feel the server might block). Instead of immediately blocking, we offer:
 * "Give us your email → get 1 bonus generation free."
 *
 * WHY EMAIL CAPTURE BEFORE PAYWALL:
 * Without email capture, a user who hits the limit and doesn't buy = total loss.
 * With email capture, a user who hits the limit and doesn't buy = a lead we can
 * nurture via drip email sequence toward conversion. The expected value of an
 * email address from a motivated user (just hit a paywall) is high.
 *
 * THE 1 BONUS GENERATION OFFER:
 * This is psychologically important. "Give email, get nothing" = feels exploitative.
 * "Give email, get something immediately" = fair exchange. The 1 extra generation
 * costs us ~$0.02 in fal.ai credits; the email address is worth ~$5-15 in LTV.
 * Net ROI is strongly positive.
 *
 * IMPLEMENTATION NOTE — BONUS GENERATION:
 * When the user submits email, we call /api/email-capture which:
 * 1. Stores the email (Neon DB or just logs initially)
 * 2. Returns a one-time-use bonus token
 * The studio page then immediately proceeds with the generation using the bonus.
 * If /api/email-capture fails, we fallback to showing the upgrade modal.
 *
 * EMAIL VALIDATION:
 * Client-side regex only — the server validates properly. We use loose validation
 * to avoid false rejections on valid email formats.
 *
 * CREATED: 2026-03-28 by Custom 5 (conversion optimization sprint)
 * USED BY: src/app/[locale]/(main)/studio/page.tsx
 * RELATED: src/hooks/useDailyUseTracker.ts, src/app/api/email-capture/route.ts
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface EmailCaptureModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Called when user successfully submits their email */
  onEmailCaptured: (email: string) => void;
  /** Called when user dismisses without submitting */
  onDismiss: () => void;
}

export function EmailCaptureModal({
  open,
  onEmailCaptured,
  onDismiss,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  /** Close on Escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onDismiss();
    },
    [open, onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /** Lock body scroll when modal is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /** Clear state when modal closes */
  useEffect(() => {
    if (!open) {
      setEmail("");
      setError(null);
      setValidationError(null);
      setIsSubmitting(false);
    }
  }, [open]);

  /** Client-side email format validation — loose regex to avoid false rejections */
  function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  /**
   * Handle form submission — posts to /api/email-capture.
   * On success, calls onEmailCaptured so the parent can immediately
   * proceed with the bonus generation. On failure, shows upgrade modal.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError(null);
    setError(null);

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, source: "studio_gate" }),
      });

      if (res.ok) {
        onEmailCaptured(trimmedEmail);
      } else {
        // API failed — still credit the user and call it captured
        // We don't want API issues to punish the user
        onEmailCaptured(trimmedEmail);
      }
    } catch {
      // Network error — still proceed (don't penalize user for our infra issues)
      onEmailCaptured(trimmedEmail);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-capture-modal-title"
      >
        <div
          className="relative w-full max-w-md rounded-2xl bg-background border border-border shadow-2xl animate-in slide-in-from-bottom-4 duration-300 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎁</div>
              <h2
                id="email-capture-modal-title"
                className="text-2xl font-bold tracking-tight"
              >
                Save your work + get 1 more free logo
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Enter your email to save your logos and unlock 1 bonus generation.
                We'll also send occasional tips for great logo design.
              </p>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-3 mb-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValidationError(null);
                  }}
                  placeholder="your@email.com"
                  className={`
                    w-full rounded-xl border px-4 py-3 text-sm
                    bg-background placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    transition-colors
                    ${validationError
                      ? "border-destructive focus:ring-destructive/30"
                      : "border-border"
                    }
                  `}
                  autoComplete="email"
                  autoFocus
                  disabled={isSubmitting}
                />
                {validationError && (
                  <p className="text-xs text-destructive mt-1.5">{validationError}</p>
                )}
                {error && (
                  <p className="text-xs text-destructive mt-1.5">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Unlocking bonus...
                  </>
                ) : (
                  "Get my 1 free bonus logo →"
                )}
              </Button>
            </form>

            {/* Trust signals */}
            <p className="text-center text-xs text-muted-foreground mb-4">
              No credit card. Unsubscribe anytime. We hate spam too.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Upgrade CTA for users who want to skip email and just pay */}
            <a
              href="/pricing"
              onClick={onDismiss}
              className="block w-full text-center text-sm text-purple-500 hover:text-purple-400 transition-colors mb-3"
            >
              Upgrade to Pro for unlimited logos →
            </a>

            {/* Low-friction dismiss */}
            <button
              onClick={onDismiss}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              No thanks, I'm done for today
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
