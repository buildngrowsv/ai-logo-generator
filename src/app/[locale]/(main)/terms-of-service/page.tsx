import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/legal/PolicyPage";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://generateailogo.com";

export const metadata: Metadata = {
  title: "Terms of Service | LogoForge AI",
  description:
    "Terms of service for LogoForge AI — usage rules, billing, outputs, and disclaimers.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  openGraph: {
    title: "Terms of Service | LogoForge AI",
    description:
      "Terms of service for LogoForge AI — usage rules, billing, outputs, and disclaimers.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const COPY = {
  en: {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro:
      "These terms govern access to and use of LogoForge AI. By using the service, you agree to the terms below.",
    sections: [
      {
        heading: "Use of the service",
        body: [
          "You may use LogoForge AI only in compliance with applicable law and these terms. You are responsible for the content you submit and for maintaining the confidentiality of your account credentials.",
          "You may not use the service to violate intellectual property rights, abuse infrastructure, or attempt unauthorized access to the platform.",
        ],
      },
      {
        heading: "Billing and access",
        body: [
          "Paid subscriptions and credit packs are billed through our payment provider. Access to paid features depends on successful payment processing and applicable account configuration.",
          "We may suspend or limit access if abuse, fraud, chargebacks, or technical misuse is detected.",
        ],
      },
      {
        heading: "Outputs and disclaimers",
        body: [
          "AI-generated outputs may require human review before production use. You are responsible for evaluating generated assets for brand suitability, legal clearance, and trademark risk.",
          "The service is provided on an as-is basis to the maximum extent permitted by law.",
        ],
      },
    ],
  },
  es: {
    eyebrow: "Legal",
    title: "Términos del Servicio",
    intro:
      "Estos términos rigen el acceso y uso de LogoForge AI. Al usar el servicio, aceptas los términos descritos abajo.",
    sections: [
      {
        heading: "Uso del servicio",
        body: [
          "Puedes usar LogoForge AI solo en cumplimiento de la ley aplicable y de estos términos. Eres responsable del contenido que envías y de mantener la confidencialidad de tus credenciales.",
          "No puedes usar el servicio para infringir propiedad intelectual, abusar de la infraestructura o intentar acceso no autorizado a la plataforma.",
        ],
      },
      {
        heading: "Facturación y acceso",
        body: [
          "Las suscripciones pagadas y los paquetes de créditos se facturan a través de nuestro proveedor de pagos. El acceso a funciones pagadas depende del procesamiento correcto del pago y de la configuración de la cuenta.",
          "Podemos suspender o limitar el acceso si detectamos abuso, fraude, contracargos o uso técnico indebido.",
        ],
      },
      {
        heading: "Resultados y avisos",
        body: [
          "Los resultados generados por IA pueden requerir revisión humana antes de usarse en producción. Eres responsable de evaluar la idoneidad de marca, el cumplimiento legal y el riesgo de marcas registradas.",
          "El servicio se proporciona tal cual, en la máxima medida permitida por la ley.",
        ],
      },
    ],
  },
} as const;

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale] ?? COPY.en;

  return (
    <PolicyPage
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      sections={copy.sections}
    />
  );
}
