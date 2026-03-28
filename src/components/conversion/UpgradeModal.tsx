/**
 * UpgradeModal — post-generation conversion prompt shown after free-tier threshold.
 *
 * WHEN IT SHOWS:
 * After the user completes their 3rd free generation, this modal appears celebrating
 * their work while presenting the upgrade CTA. The timing is intentional — showing
 * upgrade after they've experienced value (seen 3 sets of logos) rather than before.
 * This is the "I've seen what this can do, now I want more" moment.
 *
 * DESIGN STRATEGY — "Value Anchoring":
 * The modal leads with what they just created, not with what they're missing.
 * "Your logos look amazing → keep creating unlimited" beats "You've run out of
 * free credits → pay now." This framing significantly improves conversion rates.
 * Reference: ConversionXL / Patrick McKenzie on value-first CTAs.
 *
 * PRICING DISPLAY:
 * Shows the lowest available plan ($4.90/mo Starter) as the entry CTA.
 * The "Most Popular" creator plan ($14.90/mo) is shown as a secondary option.
 * We lead with the lower price to reduce sticker shock, then let pricing page
 * do the full comparison work.
 *
 * DISMISS BEHAVIOR:
 * User can dismiss this modal and continue generating until the server hard-blocks.
 * The "Maybe Later" CTA is intentionally low-friction — forced paywalls cause
 * bounces; a soft reminder lets engaged users convert on their own terms.
 *
 * CREATED: 2026-03-28 by Custom 5 (conversion optimization sprint)
 * USED BY: src/app/[locale]/(main)/studio/page.tsx
 * RELATED: src/hooks/useDailyUseTracker.ts
 */
"use client";

import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface UpgradeModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Remaining free generations today (for counter display) */
  remainingFree: number;
  /** Called when user dismisses the modal without upgrading */
  onDismiss: () => void;
}

export function UpgradeModal({ open, remainingFree, onDismiss }: UpgradeModalProps) {
  /**
   * Close on Escape key — standard accessible modal behavior.
   * Users expect Escape to dismiss overlays; not supporting it creates
   * a frustrating experience that signals low-quality UI.
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onDismiss();
      }
    },
    [open, onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal is open — prevents background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop — click to dismiss */}
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
        aria-labelledby="upgrade-modal-title"
      >
        <div
          className="relative w-full max-w-md rounded-2xl bg-background border border-border shadow-2xl animate-in slide-in-from-bottom-4 duration-300 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient accent bar at top — matches brand purple-to-pink */}
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />

          <div className="p-8">
            {/* Celebration header — leads with value, not restriction */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">✦</div>
              <h2
                id="upgrade-modal-title"
                className="text-2xl font-bold tracking-tight"
              >
                Your logos look amazing!
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {remainingFree > 0
                  ? `You have ${remainingFree} free generation${remainingFree === 1 ? "" : "s"} left today. Go Pro to keep creating without limits.`
                  : "You've used all your free generations today. Upgrade to keep creating."}
              </p>
            </div>

            {/* Plan comparison — lead with starter price */}
            <div className="space-y-3 mb-6">
              {/* Starter plan — primary CTA */}
              <div className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">Starter</p>
                    <p className="text-xs text-muted-foreground">30 logos/month</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">$4.90</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                </div>
                <Link href="/pricing" onClick={onDismiss} className="block">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    size="sm"
                  >
                    Get Starter — $4.90/mo
                  </Button>
                </Link>
              </div>

              {/* Creator plan — secondary option with "Most Popular" badge */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">Creator</p>
                    <Badge className="text-[10px] bg-amber-500/20 text-amber-600 border-amber-500/30">
                      Most Popular
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">$14.90</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  150 logos/month + HD quality output + commercial license
                </p>
                <Link href="/pricing" onClick={onDismiss} className="block">
                  <Button
                    variant="outline"
                    className="w-full border-amber-500/40 hover:border-amber-500"
                    size="sm"
                  >
                    See Full Plans →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature highlights — reassure about value */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                "✓ HD quality output",
                "✓ Commercial license",
                "✓ All 8 style categories",
                "✓ Download as PNG/SVG",
              ].map((feature) => (
                <p key={feature} className="text-xs text-muted-foreground">
                  {feature}
                </p>
              ))}
            </div>

            {/* Dismiss button — low friction, lets user keep trying */}
            <button
              onClick={onDismiss}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {remainingFree > 0
                ? `Maybe later — I still have ${remainingFree} free ${remainingFree === 1 ? "generation" : "generations"}`
                : "Maybe later"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
