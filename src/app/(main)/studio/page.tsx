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
 * UX DESIGN DECISIONS:
 * - Style categories shown as clickable cards (not a dropdown) for visual browsing
 * - Large preview area for generated logos — logos need to be seen at scale
 * - Download buttons are prominent — this is the core value delivery moment
 * - Empty state shows the style picker to encourage exploration before generating
 *
 * Created: 2026-03-24 by Builder 4 (pane1774 swarm)
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LOGO_STYLE_CATEGORIES } from "@/config/product";
import Image from "next/image";

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
   * Handle logo generation — sends request to /api/logo/generate
   * and updates state with the results.
   */
  const handleGenerateLogos = async () => {
    if (!businessName.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
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
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Logo Studio</h1>
        <p className="text-muted-foreground mt-2">
          Enter your business name, pick a style, and generate professional logos in seconds.
        </p>
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
            "Generate Logo (5 credits)"
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Each generation creates 4 unique variations in your selected style.
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
          <h2 className="text-lg font-semibold mb-4">
            Your Logos
            <Badge variant="secondary" className="ml-2 text-xs">
              {generatedLogos[0]?.style}
            </Badge>
          </h2>
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
        </div>
      )}
    </div>
  );
}
