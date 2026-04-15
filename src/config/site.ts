/**
 * Site configuration — LogoForge AI branding, URLs, and metadata.
 *
 * PRODUCT CONTEXT:
 * LogoForge AI is a web-first SaaS that creates professional logos using
 * AI (fal.ai FLUX model). Users enter their business name and select a style
 * category (minimalist, tech, luxury, playful, etc.) and the AI generates
 * multiple logo variations. Built from the saas-clone-template (banananano2pro
 * architecture) as part of the AI Tool Competitor Cloning Factory initiative.
 *
 * MARKET POSITIONING:
 * Category: AI Logo Generator (~177 tools on Toolify)
 * Competitors: Looka ($20-$129), Brandmark ($25-$175), LogoAI ($29-$99)
 * Our wedge: Simpler UX, lower pricing ($4.90/mo), credit-based flexibility,
 * no upsell walls. Users get 3 free logos to try, then pay for unlimited.
 *
 * Clone created: 2026-03-24 by Builder 4 (pane1774 swarm)
 * Template source: Github/saas-clone-template (commit aca1a23)
 *
 * IMPORTED BY:
 * - src/app/layout.tsx (SEO metadata, JSON-LD structured data)
 * - src/components/layout/SiteHeader.tsx (logo text, brand gradient)
 * - src/components/layout/SiteFooter.tsx (brand name, support email, copyright)
 * - src/app/(main)/page.tsx (hero text, CTAs, trust bar)
 * - src/app/login/page.tsx (welcome message)
 * - src/app/login/layout.tsx (SEO metadata)
 */
export const siteConfig = {
  /**
   * Primary brand name — "LogoForge AI" communicates both the AI aspect
   * and the creation/crafting metaphor. Short enough for clean header layout.
   */
  siteName: "LogoForge AI",

  /**
   * One-sentence product description — focuses on speed + quality value prop
   * that differentiates from expensive manual design services.
   */
  siteDescription: "Create stunning professional logos in seconds with AI. Enter your business name, pick a style, and get unlimited logo variations.",

  /**
   * Production URL — will be set once deployed to Vercel with custom domain.
   * In development, NEXT_PUBLIC_APP_URL env var overrides this.
   */
  siteUrl: process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://generateailogo.com",

  /**
   * Support email — displayed in the footer and used for mailto: links.
   */
  supportEmail: "support@symplyai.io",

  /**
   * Brand gradient colors — purple-to-pink for a creative/design tool feel.
   * Purple conveys creativity and premium quality. Pink adds warmth and
   * approachability. This differentiates from the typical blue (tech) or
   * orange (productivity) that most SaaS tools use.
   */
  themeColors: {
    gradientFrom: "from-purple-500",
    gradientVia: "via-fuchsia-500",
    gradientTo: "to-pink-500",
    gradientFromHover: "hover:from-purple-600",
    gradientToHover: "hover:to-pink-600",
    accentBackground: "from-purple-500/20 to-pink-500/20",
    accentText: "text-purple-500",
    accentBorder: "border-purple-500/50",
    accentBorderHover: "hover:border-purple-500/30",
    accentRing: "ring-purple-500/20",
    badgeBackground: "bg-purple-500/20",
    badgeText: "text-purple-600 dark:text-purple-400",
    badgeHover: "hover:bg-purple-500/30",
  },

  socialLinks: {
    twitter: "",
    github: "",
    discord: "",
  },

  /**
   * Navigation links — includes the logo generator studio and gallery.
   */
  navigationLinks: [
    { label: "Create Logo", href: "/studio", protected: true },
    { label: "Gallery", href: "/gallery" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Dashboard", href: "/dashboard", protected: true },
  ],

  footerColumns: [
    {
      title: "Product",
      links: [
        { label: "Create Logo", href: "/studio" },
        { label: "Logo Gallery", href: "/gallery" },
        { label: "Pricing", href: "/pricing" },
        { label: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ],

  defaultTheme: "dark" as const,
};

export type SiteConfig = typeof siteConfig;
