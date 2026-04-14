import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://symplyai.io";

export const metadata: Metadata = {
  title: "Pricing — LogoForge AI | Free & Pro Plans",
  description:
    "Compare LogoForge AI pricing plans. Start free with daily generations or upgrade to Pro for unlimited AI logo generation, priority processing, and commercial usage rights.",
  alternates: { canonical: `${APP_URL}/pricing` },
  openGraph: {
    title: "Pricing — LogoForge AI",
    description:
      "See LogoForge AI pricing. Free plan to try AI logo generation, Pro plan for unlimited use and commercial rights.",
    url: `${APP_URL}/pricing`,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
