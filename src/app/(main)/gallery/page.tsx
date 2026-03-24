/**
 * Logo Gallery — showcase of example logos to demonstrate quality and styles.
 *
 * Shows static example logos organized by style category to help users
 * understand what each style looks like before generating their own.
 * In future, this could pull from a database of community-submitted logos
 * (with user permission) to provide social proof and inspiration.
 *
 * Created: 2026-03-24 by Builder 4 (pane1774 swarm)
 */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

/**
 * Example prompts that demonstrate what each style category produces.
 * These are NOT pre-generated images — they are prompt examples that
 * link to the studio with the style pre-selected. Users see the prompt
 * and click through to generate their own version.
 *
 * Using prompt examples instead of pre-generated images because:
 * 1. No need to store/host static images
 * 2. Drives users to the studio (conversion funnel)
 * 3. Sets expectations about what the AI can do
 */
const GALLERY_EXAMPLES = [
  {
    id: 1,
    businessName: "TechFlow",
    description: "Cloud computing startup",
    style: "tech",
    styleName: "Tech & Startup",
  },
  {
    id: 2,
    businessName: "Bloom Bakery",
    description: "Artisan sourdough bakery",
    style: "handcrafted",
    styleName: "Handcrafted & Artisan",
  },
  {
    id: 3,
    businessName: "NovaStar",
    description: "Space tourism company",
    style: "bold",
    styleName: "Bold & Athletic",
  },
  {
    id: 4,
    businessName: "Maison Luxe",
    description: "Premium fashion boutique",
    style: "luxury",
    styleName: "Luxury & Premium",
  },
  {
    id: 5,
    businessName: "PawPals",
    description: "Pet care mobile app",
    style: "playful",
    styleName: "Playful & Fun",
  },
  {
    id: 6,
    businessName: "Greenleaf Co",
    description: "Sustainable packaging company",
    style: "nature",
    styleName: "Nature & Organic",
  },
  {
    id: 7,
    businessName: "Zenith",
    description: "Meditation and wellness app",
    style: "minimalist",
    styleName: "Minimalist",
  },
  {
    id: 8,
    businessName: "Heritage Roasters",
    description: "Small-batch coffee roasters",
    style: "vintage",
    styleName: "Vintage & Retro",
  },
];

export default function GalleryPage() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Logo Gallery</h1>
        <p className="text-muted-foreground mt-2">
          Explore our style categories with example businesses. Click any card to try the style yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GALLERY_EXAMPLES.map((example) => (
          <Link
            key={example.id}
            href={`/studio?style=${example.style}`}
          >
            <Card className="group hover:border-purple-500/50 transition-all hover:shadow-lg cursor-pointer h-full">
              <CardContent className="p-5">
                {/**
                 * Style badge at the top of each card — helps users quickly
                 * scan which styles are available.
                 */}
                <Badge
                  variant="secondary"
                  className="text-[10px] mb-3 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                >
                  {example.styleName}
                </Badge>

                {/**
                 * Business name displayed prominently — shows what the logo
                 * text would look like. Uses a larger font to mimic a logo.
                 */}
                <p className="text-xl font-bold mb-1 group-hover:text-purple-500 transition-colors">
                  {example.businessName}
                </p>

                <p className="text-sm text-muted-foreground">
                  {example.description}
                </p>

                <p className="text-xs text-purple-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to try this style →
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA to drive users to the studio */}
      <div className="text-center mt-12 py-8 rounded-xl bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 border border-purple-500/20">
        <h2 className="text-2xl font-bold mb-2">Ready to create your logo?</h2>
        <p className="text-muted-foreground mb-4">
          3 free logo generations for new accounts. No credit card required.
        </p>
        <Link
          href="/studio"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Start Creating →
        </Link>
      </div>
    </div>
  );
}
