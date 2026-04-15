/**
 * Programmatic SEO Pages Configuration — LogoForge AI
 *
 * WHY THIS FILE EXISTS:
 * Long-tail keywords like "best AI logo generator for startups" or
 * "LogoForge AI vs Looka" capture high-intent search traffic from people
 * actively comparing or seeking logo generation tools. Each entry here
 * generates a full static page at build time with unique content,
 * FAQ schema (rich snippets), and internal cross-links.
 *
 * MARKET CONTEXT:
 * AI logo generation is a $500M+ market with 177+ tools on Toolify.
 * Top competitors (Looka, Brandmark, LogoAI) charge $20-$175 per logo.
 * Our wedge: lower pricing ($4.90/mo), credit-based flexibility, and
 * simpler UX. These SEO pages capture comparison and audience traffic
 * that branded competitors dominate in SERPs.
 *
 * IMPORTED BY:
 * - src/app/vs/[competitor]/page.tsx (comparison pages)
 * - src/app/for/[audience]/page.tsx (audience landing pages)
 * - src/app/use-cases/[use-case]/page.tsx (guide pages)
 * - src/app/best/[slug]/page.tsx (listicle-style pages)
 * - src/app/sitemap.ts (includes all generated URLs)
 * - src/components/SeoInternalLinks.tsx (internal link grid)
 */

import { PRODUCT_CONFIG } from "@/lib/config";

export interface SeoCompetitorConfig {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly pricing: string;
  readonly weaknesses: string[];
}

export interface SeoAudienceConfig {
  readonly slug: string;
  readonly name: string;
  readonly painPoints: string[];
  readonly howWeHelp: string;
}

export interface SeoUseCaseConfig {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly steps: string[];
}

export interface SeoBestConfig {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly features: string[];
}

export interface SeoPageConfig {
  readonly competitors: SeoCompetitorConfig[];
  readonly audiences: SeoAudienceConfig[];
  readonly useCases: SeoUseCaseConfig[];
  readonly bestPages: SeoBestConfig[];
}

/**
 * Logo-specific SEO configuration. Each entry is carefully researched
 * against real competitor positioning and audience search behavior.
 */
export const SEO_PAGES_CONFIG: SeoPageConfig = {
  competitors: [
    {
      slug: "looka",
      name: "Looka",
      description:
        "Looka is an AI-powered logo maker that generates brand identities including logos, business cards, and social media assets. Popular for its brand kit feature.",
      pricing: "$20 one-time for basic logo, $65-$129 for brand kit",
      weaknesses: [
        "One-time purchase model means paying again for each new project or revision",
        "Premium brand kit packages cost $65-$129 — expensive for startups testing ideas",
        "Limited style control compared to prompt-based AI generation",
        "No free downloads — you must purchase before seeing the final hi-res logo",
      ],
    },
    {
      slug: "brandmark",
      name: "Brandmark",
      description:
        "Brandmark uses AI to generate logos, color palettes, and brand guides. Known for its clean design output and professional aesthetic.",
      pricing: "$25 for basic, $65 for designer, $175 for enterprise",
      weaknesses: [
        "Pricing starts at $25 per logo — no subscription model for ongoing needs",
        "Enterprise tier ($175) required for source files and full commercial rights",
        "Fewer style categories compared to generative AI models",
        "No iterative prompt refinement — limited control over AI output direction",
      ],
    },
    {
      slug: "logoai",
      name: "LogoAI",
      description:
        "LogoAI generates logos using AI algorithms and offers brand identity packages. Targets small businesses wanting quick professional logos.",
      pricing: "$29 basic, $59 premium, $99 brand kit",
      weaknesses: [
        "Basic package ($29) doesn't include editable source files",
        "AI outputs can feel templated — less creative variation than generative models",
        "No monthly subscription option for businesses needing ongoing logo iterations",
        "Social media kit locked behind the $99 brand kit tier",
      ],
    },
    {
      slug: "hatchful",
      name: "Hatchful by Shopify",
      description:
        "Hatchful is Shopify's free logo maker using templates. Simple and accessible but limited in AI capabilities and customization depth.",
      pricing: "Free",
      weaknesses: [
        "Template-based rather than AI-generated — limited uniqueness",
        "Very basic customization options (font, layout, color only)",
        "Designed primarily for Shopify merchants, not general business use",
        "Lower resolution outputs compared to dedicated AI logo generators",
      ],
    },
    {
      slug: "logomakr",
      name: "LogoMakr",
      description:
        "LogoMakr is a free web-based drag-and-drop logo editor. Users manually select icons from a clip-art library, add text, and arrange elements. No AI generation — every logo is manually assembled.",
      pricing: "Free low-res; $19 one-time per high-resolution download",
      weaknesses: [
        "No AI generation — every logo requires 20-40 minutes of manual assembly",
        "High-resolution downloads cost $19 per logo — no subscription option",
        "Shared icon library means logos look similar across thousands of businesses",
        "Dated interface and clip-art aesthetic, last meaningfully updated around 2015",
        "Requires design intuition for icon pairing, font selection, and color harmony",
      ],
    },
  ],

  audiences: [
    {
      slug: "startups",
      name: "Startups",
      painPoints: [
        "Need a professional logo fast to launch but can't afford $500-5000 design agency fees",
        "Iterating on brand identity during product-market fit — need to test multiple concepts cheaply",
        "Investor decks and pitch materials need polished branding on a bootstrap budget",
        "Multiple sub-brands or product lines each need distinct logos",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} lets startups generate professional logos in seconds for a fraction of agency costs. With ${PRODUCT_CONFIG.pricing.free.limit} free logos per ${PRODUCT_CONFIG.pricing.free.period} and plans starting at $${PRODUCT_CONFIG.pricing.basic.price}/mo, you can iterate on your brand identity as fast as your product evolves. No contracts, no waiting — just instant AI-generated logos whenever you need them.`,
    },
    {
      slug: "freelancers",
      name: "Freelancers & Solopreneurs",
      painPoints: [
        "Personal brand needs a professional logo but hiring a designer feels like overkill",
        "Client projects sometimes need quick logo concepts for pitches and mockups",
        "Multiple side projects each need distinct visual identities without breaking the bank",
        "Design skills aren't their strength — they need a tool that does the creative heavy lifting",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} is the perfect tool for freelancers who need professional logos without the professional price tag. Generate concepts for your personal brand, client pitches, or side projects in seconds. Our AI handles the design — you handle the business.`,
    },
    {
      slug: "small-businesses",
      name: "Small Business Owners",
      painPoints: [
        "Local businesses need logos for signage, business cards, and online presence but can't justify agency fees",
        "Rebranding or refreshing an outdated logo shouldn't cost thousands of dollars",
        "Need multiple formats (social media, print, web) from a single logo concept",
        "DIY design tools are too complex for someone focused on running their business",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} gives small business owners a direct path to professional branding. Enter your business name, describe your style, and get polished logo concepts instantly. No design skills needed, no expensive agencies — just affordable AI-generated logos that look like they cost 10x more.`,
    },
    {
      slug: "content-creators",
      name: "Content Creators & YouTubers",
      painPoints: [
        "Channel branding needs a memorable logo that stands out in thumbnails and overlays",
        "Multiple channels or brands each need their own visual identity",
        "Logos need to work at tiny sizes (favicon, mobile) and large sizes (merch, banners)",
        "Trend cycles demand frequent brand refreshes without recurring designer costs",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} helps content creators build recognizable brand identities. Generate logo concepts that work everywhere — from YouTube thumbnails to merch designs. With unlimited generation at $${PRODUCT_CONFIG.pricing.pro.price}/mo, you can experiment freely until your brand feels right.`,
    },
    {
      slug: "agencies",
      name: "Design Agencies & Studios",
      painPoints: [
        "Client discovery phase needs quick concept exploration before investing design hours",
        "Volume of small-budget clients doesn't justify full custom design process for each",
        "Need AI-assisted starting points that designers can then refine and polish",
        "Competitive pitches require multiple concept directions prepared in tight timeframes",
      ],
      howWeHelp: `${PRODUCT_CONFIG.name} accelerates the creative process for agencies. Use AI-generated concepts as starting points for client presentations, then refine the winning direction with your design team. Process more clients, faster — without sacrificing quality.`,
    },
  ],

  useCases: [
    {
      slug: "brand-identity",
      name: "Brand Identity Design",
      description:
        "Create a complete brand identity starting from an AI-generated logo. Build consistent visual language across all touchpoints from a single AI concept.",
      steps: [
        "Enter your brand name and describe your brand personality (modern, classic, playful, etc.)",
        "Review the AI-generated logo variations and select your favorites",
        "Download in multiple formats — PNG for web, SVG for print, favicon for browsers",
        "Use the logo as the foundation for your full brand kit: colors, typography, and visual style",
      ],
    },
    {
      slug: "social-media-branding",
      name: "Social Media Branding",
      description:
        "Generate logos optimized for social media profiles, cover images, and watermarks. Create consistent branding across Instagram, Twitter, LinkedIn, and TikTok.",
      steps: [
        "Generate your logo with a focus on simple, recognizable shapes that work at small sizes",
        "Download the logo and verify it reads clearly at 50x50px (profile icon size)",
        "Create variations for different platforms — square for Instagram, banner for LinkedIn",
        "Apply the logo as a watermark on your content for brand recognition",
      ],
    },
    {
      slug: "merch-design",
      name: "Merchandise & Print Design",
      description:
        "Generate logos suitable for printing on t-shirts, mugs, stickers, and other merchandise. Get high-resolution outputs that look sharp at any print size.",
      steps: [
        "Generate a logo with bold, high-contrast elements that reproduce well in print",
        "Download at maximum resolution for print-quality output",
        "Test the design at target print sizes — does it read on a mug? A billboard?",
        "Send the logo file to your print-on-demand provider or local printer",
      ],
    },
  ],

  bestPages: [
    {
      slug: "free-ai-logo-generator",
      title: "Best Free AI Logo Generator in 2026",
      description:
        "Compare the best free AI logo generators available in 2026. Find tools that create professional logos without upfront costs or design skills.",
      features: [
        "Free daily generation credits",
        "No watermarks on free tier outputs",
        "Multiple style categories",
        "High-resolution downloads",
        "Commercial usage rights",
      ],
    },
    {
      slug: "ai-logo-maker-for-startups",
      title: "Best AI Logo Maker for Startups in 2026",
      description:
        "The best AI logo makers for startups that need professional branding on a bootstrap budget. Fast, affordable, and no design skills required.",
      features: [
        "Under $10/month pricing",
        "Instant generation (no waiting for designers)",
        "Multiple concept variations per prompt",
        "Brand kit exports (favicon, social, print)",
        "Iterate unlimited times during brand discovery",
      ],
    },
    {
      slug: "logo-design-tool-for-non-designers",
      title: "Best Logo Design Tool for Non-Designers",
      description:
        "The best logo design tools for people who aren't designers. AI-powered generators that create professional logos from simple text prompts.",
      features: [
        "Text-to-logo AI generation",
        "No design skills required",
        "Style presets (minimalist, bold, vintage, etc.)",
        "One-click download in all formats",
        "Professional quality matching $500+ agency output",
      ],
    },
  ],
};
