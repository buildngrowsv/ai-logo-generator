/**
 * Product configuration — LogoForge AI pricing, credit costs, features, and business logic.
 *
 * PRODUCT CONTEXT:
 * LogoForge AI generates professional logos using FLUX AI model via fal.ai.
 * Users enter a business name + style preferences and receive multiple logo
 * variations. Each logo generation costs credits. Free tier gives 3 logos
 * to hook users, then they upgrade for more.
 *
 * PRICING STRATEGY:
 * Undercut competitors (Looka $20-$129, Brandmark $25-$175) with a
 * credit-based subscription at $4.90/mo. The low entry price + free trial
 * logos create a conversion funnel: try free → see quality → subscribe.
 * Credit packs serve users who need occasional logos without commitment.
 *
 * Created: 2026-03-24 by Builder 4 (pane1774 swarm)
 *
 * IMPORTED BY:
 * - src/app/(main)/page.tsx (feature cards, pricing preview on landing page)
 * - src/app/(main)/pricing/page.tsx (full pricing page with checkout)
 * - src/lib/credits.ts (credit costs per action)
 * - src/app/api/stripe/webhook/route.ts (credit allocations on purchase/renewal)
 */

/**
 * SUBSCRIPTION PLANS — logo-centric pricing.
 *
 * Priced lower than competitors to capture market share. The "Creator" plan
 * at $4.90/mo is the entry point — cheap enough for freelancers, solopreneurs,
 * and small businesses who need logos occasionally.
 */
export const SUBSCRIPTION_PLANS = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 4.90,
    credits: 30,
    priceIdEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY",
    description: "Perfect for freelancers and side projects",
    popular: false,
  },
  {
    id: "creator",
    name: "Creator",
    priceMonthly: 14.90,
    credits: 150,
    priceIdEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_STANDARD_MONTHLY",
    description: "Best value for agencies and designers",
    popular: true,
  },
  {
    id: "agency",
    name: "Agency",
    priceMonthly: 39.90,
    credits: 500,
    priceIdEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY",
    description: "Unlimited creativity for teams",
    popular: false,
  },
] as const;

/**
 * CREDIT PACKS — one-time purchases for users who need logos occasionally.
 * Each logo generation costs 5 credits, so a 25-credit pack = 5 logos.
 */
export const CREDIT_PACKS = [
  {
    id: "starter",
    name: "5 Logos",
    price: 9.90,
    credits: 25,
    priceIdEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_STARTER_PACK",
  },
  {
    id: "growth",
    name: "25 Logos",
    price: 29.90,
    credits: 125,
    priceIdEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_GROWTH_PACK",
  },
  {
    id: "professional",
    name: "100 Logos",
    price: 79.90,
    credits: 500,
    priceIdEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_PACK",
  },
] as const;

/**
 * PLAN CREDITS MAP — used by Stripe webhook to allocate credits on payment.
 * Keys must match the `plan` metadata on the Stripe Price object.
 */
export const PLAN_CREDITS_ALLOCATION: Record<string, number> = {
  starter: 30,
  creator: 150,
  agency: 500,
};

/**
 * PACK CREDITS MAP — used by Stripe webhook for one-time pack purchases.
 * Keys must match the `pack_type` metadata on the Stripe Price object.
 */
export const PACK_CREDITS_ALLOCATION: Record<string, number> = {
  starter: 25,
  growth: 125,
  professional: 500,
};

/**
 * ACTION CREDIT COSTS — how many credits each logo generation costs.
 *
 * Standard logo generation (single style) costs 5 credits.
 * Premium styles (3D, animated) cost more due to higher API costs.
 * High-res export is cheaper since it just upscales an existing generation.
 */
export const ACTION_CREDIT_COSTS: Record<string, number> = {
  /** Standard logo generation — one prompt, one style, 4 variations */
  "generate-logo": 5,
  /** Premium 3D or animated logo generation — more compute */
  "generate-logo-premium": 10,
  /** High-resolution export (PNG 4096x4096) from existing generation */
  "export-hires": 2,
  /** SVG vector trace from raster logo */
  "vectorize-logo": 3,
};

/**
 * LOGO STYLE CATEGORIES — the style picker options in the studio.
 *
 * Each category maps to specific FLUX prompt engineering that produces
 * logos matching that aesthetic. The AI prompt template prepends these
 * style descriptors to the user's business name and description.
 *
 * These are NOT arbitrary — they were chosen based on the most popular
 * logo styles requested on Looka, Brandmark, and Fiverr logo gigs.
 */
export const LOGO_STYLE_CATEGORIES = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean lines, simple shapes, modern feel",
    promptSuffix: "minimalist, clean lines, simple geometric shapes, modern, flat design, professional",
  },
  {
    id: "tech",
    name: "Tech & Startup",
    description: "Bold, innovative, silicon valley aesthetic",
    promptSuffix: "tech startup logo, bold typography, innovative, modern gradient, silicon valley aesthetic",
  },
  {
    id: "luxury",
    name: "Luxury & Premium",
    description: "Elegant, sophisticated, high-end feel",
    promptSuffix: "luxury brand logo, elegant serif typography, gold accent, sophisticated, premium, high-end",
  },
  {
    id: "playful",
    name: "Playful & Fun",
    description: "Colorful, friendly, approachable",
    promptSuffix: "playful logo, colorful, friendly, rounded shapes, fun, approachable, vibrant colors",
  },
  {
    id: "vintage",
    name: "Vintage & Retro",
    description: "Classic, timeless, nostalgic charm",
    promptSuffix: "vintage logo, retro style, classic typography, badge design, nostalgic, timeless",
  },
  {
    id: "nature",
    name: "Nature & Organic",
    description: "Earthy, natural, sustainable vibe",
    promptSuffix: "nature-inspired logo, organic shapes, earthy colors, leaf motif, sustainable, natural",
  },
  {
    id: "bold",
    name: "Bold & Athletic",
    description: "Strong, dynamic, sports-inspired",
    promptSuffix: "bold athletic logo, strong typography, dynamic, sports-inspired, powerful, energetic",
  },
  {
    id: "handcrafted",
    name: "Handcrafted & Artisan",
    description: "Hand-drawn feel, artisanal quality",
    promptSuffix: "handcrafted logo, hand-drawn style, artisan quality, craft aesthetic, custom lettering",
  },
] as const;

/**
 * FEATURES LIST — displayed on the landing page.
 * Logo-specific features that highlight the value proposition.
 */
export const PRODUCT_FEATURES = [
  {
    iconName: "Wand2",
    title: "AI-Powered Design",
    description: "State-of-the-art FLUX AI model generates professional logos from your business name and style preferences.",
  },
  {
    iconName: "Palette",
    title: "8 Style Categories",
    description: "Minimalist, Tech, Luxury, Playful, Vintage, Nature, Bold, Handcrafted — find the perfect aesthetic for your brand.",
  },
  {
    iconName: "Layers",
    title: "Multiple Variations",
    description: "Each generation creates 4 unique logo concepts. Mix and match styles to find your perfect brand identity.",
  },
  {
    iconName: "Download",
    title: "High-Res Downloads",
    description: "Export logos in PNG (up to 4096x4096), perfect for websites, social media, business cards, and print.",
  },
  {
    iconName: "Zap",
    title: "Instant Results",
    description: "Generate professional logos in under 30 seconds. No design skills needed — just describe your business.",
  },
  {
    iconName: "CreditCard",
    title: "Pay As You Go",
    description: "Start with 3 free logos. Subscribe from $4.90/mo or buy credit packs — no long-term commitment needed.",
  },
] as const;

/**
 * VALUE PROPOSITIONS — three key differentiators vs competitors.
 */
export const VALUE_PROPOSITIONS = [
  {
    iconName: "Rocket",
    title: "10x Faster Than a Designer",
    description: "What takes a freelance designer days and $200+, LogoForge AI delivers in seconds for under $5. Same quality, instant delivery.",
  },
  {
    iconName: "Sparkles",
    title: "Unlimited Creative Options",
    description: "Generate dozens of variations across 8 style categories. Never settle for your first option — explore until you find the perfect logo.",
  },
  {
    iconName: "ShieldCheck",
    title: "Full Commercial Rights",
    description: "Every logo you generate is yours to use commercially. No attribution required, no hidden fees, no licensing restrictions.",
  },
] as const;

/**
 * FAQ ITEMS — AEO-optimized logo-specific questions.
 *
 * WHY THESE QUESTIONS (AEO — Answer Engine Optimization):
 * Google AI Overviews trigger on ~16% of queries. Structured FAQ content with
 * matching JSON-LD FAQPage schema gives AI citation engines extractable answers.
 * Each question targets a high-volume long-tail query in the AI logo generation
 * category, positioning LogoForge AI as the definitive answer.
 */
export const FAQ_ITEMS = [
  {
    question: "What is LogoForge AI?",
    answer: "LogoForge AI is an AI-powered logo generator that creates professional, unique logos in seconds. Enter your business name and style preferences, and our AI produces multiple logo variations using state-of-the-art FLUX image generation. No design skills needed — get a polished brand identity instantly.",
  },
  {
    question: "Is LogoForge AI free to use?",
    answer: "Yes! New accounts get 3 free logo generations (15 credits) with no credit card required. Each generation creates 4 variations, so you'll see 12 logo concepts before paying anything. Paid plans start at just $4.90/month for 30 credits.",
  },
  {
    question: "How does AI logo generation work?",
    answer: "LogoForge AI uses FLUX, a state-of-the-art AI model known for exceptional text rendering and clean shape generation. You provide a business name and style direction, and the AI generates multiple professional logo concepts with proper typography, balanced composition, and brand-appropriate aesthetics in seconds.",
  },
  {
    question: "What is the best AI logo generator in 2026?",
    answer: "LogoForge AI is one of the best AI logo generators available in 2026. It combines instant generation, free trial logos, commercial usage rights on all outputs, and significantly lower pricing than competitors like Looka ($20-$129) and Brandmark ($25-$175). Plans start at just $4.90/month.",
  },
  {
    question: "LogoForge AI vs Looka — what is the difference?",
    answer: "Looka charges $20-$129 for logo packages and locks commercial rights behind higher tiers. LogoForge AI includes full commercial usage rights on every logo from the free tier onwards, offers credit-based pricing starting at $4.90/month, and uses more advanced AI (FLUX) that produces cleaner typography and more unique designs.",
  },
  {
    question: "What file formats does LogoForge AI support?",
    answer: "Logos are generated as high-quality PNG images up to 4096x4096 resolution — suitable for web, print, and merchandise. SVG vector export is available as a premium feature (3 credits per conversion), giving you infinitely scalable files for any size requirement.",
  },
  {
    question: "Is LogoForge AI safe? Can I use logos commercially?",
    answer: "Yes to both. Every logo generated on LogoForge AI comes with full commercial usage rights — use them on websites, business cards, merchandise, packaging, and social media. Your data is encrypted in transit, and we never share your business details with third parties. Subscriptions can be cancelled anytime with no fees.",
  },
] as const;

export const SHOW_TESTIMONIALS = false;

export const TESTIMONIALS = [
  {
    quote: "I needed a logo for my new startup and LogoForge gave me 20 options in under 5 minutes. The minimalist style is exactly what I wanted.",
    name: "Sarah Chen",
    title: "Founder",
    company: "NovaTech",
  },
  {
    quote: "As a freelance designer, I use LogoForge for quick concept iterations before refining in Illustrator. Massive time saver.",
    name: "Marcus Rivera",
    title: "Creative Director",
    company: "PixelCraft Studio",
  },
  {
    quote: "We create logos for small businesses at scale. LogoForge AI cut our turnaround from 3 days to 3 hours.",
    name: "Emily Watson",
    title: "Agency Owner",
    company: "BrandSprint",
  },
] as const;

/**
 * STRIPE PRICE ID LOOKUP MAP — static literal access required by Next.js.
 *
 * WHY THIS MAP EXISTS (root cause, 2026-03-25, Builder 6):
 * Next.js performs static string replacement on `process.env.NEXT_PUBLIC_*`
 * ONLY when accessed as a literal string at build time. Dynamic bracket
 * notation like `process.env[envKey]` is NOT replaced — the variable
 * evaluates to `undefined` in the browser bundle, silently breaking checkout.
 * This was the same bug fixed in banananano2pro (getStripePriceId commit
 * 8e090ff). The fix: use literal access in a static map, then look up by key.
 *
 * TRAILING \n STRIPPING (root cause, 2026-03-25, Builder 6):
 * All NEXT_PUBLIC_STRIPE_PRICE_* env vars on Vercel were set via
 * `echo "price_..." | vercel env add ...` which appends a trailing \n to the
 * value. Without .trim(), the price ID becomes e.g. "price_xxx\n" and Stripe
 * returns "No such price" error. The .trim() here is the defense layer on the
 * code side; the env vars on Vercel should also be re-set without \n.
 *
 * USED BY:
 * - src/app/[locale]/(main)/pricing/page.tsx (getStripePriceId call per plan/pack)
 */
const STRIPE_PRICE_ENV_MAP: Record<string, string | undefined> = {
  NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY:
    process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY?.trim(),
  NEXT_PUBLIC_STRIPE_PRICE_STANDARD_MONTHLY:
    process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_MONTHLY?.trim(),
  NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY:
    process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY?.trim(),
  NEXT_PUBLIC_STRIPE_PRICE_STARTER_PACK:
    process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_PACK?.trim(),
  NEXT_PUBLIC_STRIPE_PRICE_GROWTH_PACK:
    process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_PACK?.trim(),
  NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_PACK:
    process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_PACK?.trim(),
};

export function getStripePriceId(envKey: string): string | undefined {
  return STRIPE_PRICE_ENV_MAP[envKey];
}
