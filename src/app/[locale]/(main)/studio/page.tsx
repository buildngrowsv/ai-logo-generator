/**
 * Logo Studio — the main generation interface where users create logos.
 *
 * FLOW:
 * 1. User enters business name (required) and optional description
 * 2. User selects a style category from the 8 options
 * 3. Clicks "Generate Logo" → POST to /api/logo/generate
 * 4. Displays 4 logo variations in a grid
 * 5. User can download any logo or regenerate with different styles
 *
 * CONVERSION OPTIMIZATION (added 2026-03-28 by Custom 5):
 * The studio now includes 4 conversion triggers to maximize free→paid conversion:
 *
 * 1. CREDIT COUNTER: Shows "X free gens left today" in the header area.
 *    Anchors the free limit visually, creating urgency without being aggressive.
 *    Implemented via useDailyUseTracker hook + localStorage.
 *
 * 2. POST-GEN UPGRADE MODAL: After the 3rd free generation completes,
 *    UpgradeModal fires. Timing is post-value (user has seen quality) which
 *    converts better than pre-gen blocking. Shows $4.90/mo Starter CTA.
 *
 * 3. EMAIL CAPTURE GATE: On the 4th generation attempt, EmailCaptureModal fires
 *    offering 1 bonus generation in exchange for email. This turns blocked users
 *    into leads instead of lost traffic.
 *
 * 4. HD UPSELL BADGE: Generated logos are labeled "Standard Quality" with a
 *    "Pro: HD Output" badge to signal the quality upgrade available.
 *
 * UX DESIGN DECISIONS:
 * - Style categories shown as clickable cards (not a dropdown) for visual browsing
 * - Large preview area for generated logos — logos need to be seen at scale
 * - Download buttons are prominent — this is the core value delivery moment
 * - Empty state shows the style picker to encourage exploration before generating
 *
 * Created: 2026-03-24 by Builder 4 (pane1774 swarm)
 * Updated: 2026-03-28 by Custom 5 — added conversion optimization triggers
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LOGO_STYLE_CATEGORIES } from "@/config/product";
import Image from "next/image";
import { useDailyUseTracker } from "@/hooks/useDailyUseTracker";
import { UpgradeModal } from "@/components/conversion/UpgradeModal";
import { EmailCaptureModal } from "@/components/conversion/EmailCaptureModal";
import { ga4TrackLogoGenerationRequested } from "@/lib/analytics/ga4-web-events";

/**
 * Type for a generated logo returned from the API.
 */
interface GeneratedLogo {
  id: string;
  url: string;
  businessName: string;
  style: string;
  prompt: string;
}

export default function LogoStudioPage() {
  /**
   * Form state — business name is required, description is optional,
   * style defaults to "minimalist" (first category).
   */
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("minimalist");

  /**
   * Generation state — tracks loading, results, and errors.
   */
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<GeneratedLogo[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Conversion optimization state.
   * useDailyUseTracker manages localStorage-backed daily generation count,
   * and determines when to show each conversion modal.
   * See: src/hooks/useDailyUseTracker.ts for full logic.
   */
  const {
    remainingFree,
    showUpgradeModal,
    showEmailGate,
    recordGeneration,
    checkGenerationAttempt,
    dismissUpgradeModal,
    dismissEmailGate,
    captureEmail,
  } = useDailyUseTracker();

  /**
   * Handle logo generation — checks conversion gates first, then sends API request.
   *
   * GATE CHECK SEQUENCE:
   * 1. checkGenerationAttempt() decides if we show a modal before proceeding
   * 2. If "allow", proceed with the API call normally
   * 3. If "show_email_gate" or "show_upgrade_modal", the hook has already
   *    set the relevant modal state — return early and let the modal render
   * 4. After successful API response, recordGeneration() fires, which may
   *    also trigger the upgrade modal for post-gen timing
   */
  const handleGenerateLogos = async () => {
    if (!businessName.trim()) return;

    // Check if a conversion gate should fire BEFORE this generation
    const gateResult = checkGenerationAttempt();
    if (gateResult !== "allow") {
      // Modal is now visible (state set inside hook) — don't proceed with generation
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      /**
       * GA4 custom event at **request start** — see `ga4-web-events.ts` for why we avoid
       * sending **businessName** into analytics params (PII / brand secrets in user input).
       */
      ga4TrackLogoGenerationRequested({
        surface: "studio",
        styleCategory: selectedStyle,
      });

      const response = await fetch("/api/logo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          styleCategory: selectedStyle,
          description: description.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Generation failed. Please try again.");
        return;
      }

      setGeneratedLogos(data.logos);

      // Record this generation for conversion tracking.
      // This may trigger the post-generation upgrade modal (after 3rd use).
      recordGeneration();

    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Handle email capture — called by EmailCaptureModal on successful submission.
   * Marks email as captured, proceeds with the bonus generation.
   */
  const handleEmailCaptured = (_email: string) => {
    captureEmail();
    // After email capture, allow the generation to proceed
    // We call the API directly since the gate check has been satisfied
    handleGenerateLogosPostGate();
  };

  /**
   * handleGenerateLogosPostGate — runs the generation API call directly,
   * bypassing the conversion gate check. Used after email capture where
   * we've already done the gate check and want to reward with the bonus gen.
   */
  const handleGenerateLogosPostGate = async () => {
    if (!businessName.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      ga4TrackLogoGenerationRequested({
        surface: "studio_post_email_gate",
        styleCategory: selectedStyle,
      });

      const response = await fetch("/api/logo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          styleCategory: selectedStyle,
          description: description.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Generation failed. Please try again.");
        return;
      }

      setGeneratedLogos(data.logos);
      // Don't call recordGeneration() here — the bonus gen doesn't count
      // against the daily limit (no post-gen modal for bonus)

    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      {/* Page header with credit counter */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Logo Studio</h1>
          <p className="text-muted-foreground mt-2">
            Enter your business name, pick a style, and generate professional logos in seconds.
          </p>
        </div>
        {/**
         * FREE CREDIT COUNTER (Conversion Trigger #4)
         * Shows remaining free generations for the day.
         * Creates gentle urgency: "3 free left today" makes each generation feel valuable.
         * Disappears at 0 remaining (upgrade modal handles that moment instead).
         * Why show it: anchors the free limit visually early, normalizes the concept
         * before users hit the paywall. Reduces surprise and frustration at the wall.
         */}
        {remainingFree > 0 && (
          <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-medium text-purple-400">
              {remainingFree} free {remainingFree === 1 ? "generation" : "generations"} left today
            </span>
          </div>
        )}
        {remainingFree === 0 && (
          <a
            href="/pricing"
            className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 hover:border-amber-500/60 transition-colors"
          >
            <span className="text-xs font-medium text-amber-500">
              Go Pro for unlimited →
            </span>
          </a>
        )}
      </div>

      {/* Input section — business name + description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label htmlFor="businessName" className="text-sm font-medium mb-2 block">
            Business Name *
          </label>
          <Input
            id="businessName"
            placeholder="e.g. TechFlow, Bloom Bakery, NovaStar"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            maxLength={100}
            className="text-lg h-12"
          />
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium mb-2 block">
            Business Description (optional)
          </label>
          <Input
            id="description"
            placeholder="e.g. cloud computing startup, artisan bakery, space tourism"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className="text-lg h-12"
          />
        </div>
      </div>

      {/* Style category picker — shown as clickable cards */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Choose a Style</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LOGO_STYLE_CATEGORIES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`
                rounded-xl border-2 p-4 text-left transition-all cursor-pointer
                ${selectedStyle === style.id
                  ? "border-purple-500 bg-purple-500/10 shadow-lg"
                  : "border-border hover:border-purple-500/30 hover:bg-muted/50"
                }
              `}
            >
              <p className="font-medium text-sm">{style.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <div className="mb-8">
        <Button
          onClick={handleGenerateLogos}
          disabled={!businessName.trim() || isGenerating}
          size="lg"
          className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
        >
          {isGenerating ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating Logos...
            </>
          ) : (
            "Generate Logo"
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Each generation creates 4 unique variations in your selected style.
          {remainingFree > 0 && ` ${remainingFree} free ${remainingFree === 1 ? "generation" : "generations"} left today.`}
        </p>
      </div>

      {/* Error display */}
      {error && (
        <div className="rounded-xl border border-destructive/50 bg-destructive/5 p-4 mb-8">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Loading state — animated placeholder */}
      {isGenerating && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-muted animate-pulse flex items-center justify-center"
            >
              <div className="text-center">
                <div className="h-8 w-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Generating variation {i}...</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generated logos grid */}
      {generatedLogos.length > 0 && !isGenerating && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold">
              Your Logos
              <Badge variant="secondary" className="ml-2 text-xs">
                {generatedLogos[0]?.style}
              </Badge>
            </h2>
            {/**
             * HD UPSELL BADGE (Conversion Trigger #2)
             * Shows "Standard Quality" on free outputs with a "Pro: HD Output" nudge.
             * Signals that a better version is available without being obnoxious.
             * The quality delta doesn't have to be huge — the perception of "upgrade
             * exists" is enough to motivate conversion for quality-conscious users.
             */}
            <Badge
              variant="outline"
              className="text-xs border-amber-500/40 text-amber-600"
              title="Pro plan generates HD quality logos with sharper detail"
            >
              ✦ Standard Quality — Pro gets HD
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {generatedLogos.map((logo) => (
              <Card key={logo.id} className="group overflow-hidden">
                <CardContent className="p-0 relative">
                  {/**
                   * Logo preview — uses next/image with unoptimized flag
                   * because fal.ai URLs are external and don't need Next.js
                   * image optimization (they're already optimized CDN URLs).
                   */}
                  <div className="aspect-square relative bg-white rounded-t-xl overflow-hidden">
                    <Image
                      src={logo.url}
                      alt={`Logo for ${logo.businessName}`}
                      fill
                      className="object-contain p-4"
                      unoptimized
                    />
                  </div>
                  {/**
                   * Download button — appears on hover with a smooth transition.
                   * Uses a direct link to the fal.ai CDN URL. In production,
                   * this should go through /api/download for proper headers.
                   */}
                  <div className="p-3 flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a href={logo.url} download target="_blank" rel="noopener noreferrer">
                        Download PNG
                      </a>
                    </Button>
                    {/**
                     * Upgrade CTA per-logo card — surfaced after generation to
                     * capture users who clicked download and are now "done" with
                     * this logo. "Get HD version" is a natural next step for
                     * quality-conscious users.
                     */}
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 text-xs"
                    >
                      <a href="/pricing">Get HD</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state — shown before any generation */}
      {generatedLogos.length === 0 && !isGenerating && (
        <div className="text-center py-16 text-muted-foreground">
          <div className="text-6xl mb-4">✦</div>
          <p className="text-lg">Enter your business name and pick a style to get started.</p>
          <p className="text-sm mt-2">Each generation creates 4 unique logo variations.</p>
          <p className="text-sm mt-1">
            Free tier: {remainingFree} generation{remainingFree === 1 ? "" : "s"} remaining today.{" "}
            <a href="/pricing" className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2">
              Go Pro for unlimited →
            </a>
          </p>
        </div>
      )}

      {/**
       * UPGRADE MODAL (Conversion Trigger #1 — post-generation)
       * Shown after 3rd free generation completes.
       * Celebrates the result, presents upgrade CTAs.
       * User can dismiss and continue using remaining free gens.
       */}
      <UpgradeModal
        open={showUpgradeModal}
        remainingFree={remainingFree}
        onDismiss={dismissUpgradeModal}
      />

      {/**
       * EMAIL CAPTURE GATE (Conversion Trigger #3)
       * Shown on 4th generation attempt, before the hard paywall.
       * Offers 1 bonus generation in exchange for email.
       * Turns would-be lost users into leads.
       */}
      <EmailCaptureModal
        open={showEmailGate}
        onEmailCaptured={handleEmailCaptured}
        onDismiss={dismissEmailGate}
      />
    </div>
  );
}
