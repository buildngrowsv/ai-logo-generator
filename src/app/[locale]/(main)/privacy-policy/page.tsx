import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/legal/PolicyPage";

const COPY = {
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro:
      "This policy explains what LogoForge AI collects, how it is used to operate the service, and how to contact us about privacy questions.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We collect account information you provide during sign-in, basic billing metadata returned by our payment processor, and the prompts or brand details you submit to generate logos.",
          "We also collect technical data needed to secure and operate the service, such as request metadata, abuse-prevention signals, and application logs.",
        ],
      },
      {
        heading: "How we use information",
        body: [
          "We use submitted data to authenticate users, process payments, generate requested logo outputs, prevent abuse, and support customers.",
          "We do not sell personal information. Data may be processed by infrastructure providers that help us deliver hosting, authentication, payments, and AI inference.",
        ],
      },
      {
        heading: "Retention and contact",
        body: [
          "We retain information only as long as reasonably necessary to operate the service, satisfy legal obligations, resolve disputes, and enforce agreements.",
          "For privacy requests or questions, contact support@symplyai.io.",
        ],
      },
    ],
  },
  es: {
    eyebrow: "Legal",
    title: "Política de Privacidad",
    intro:
      "Esta política explica qué datos recopila LogoForge AI, cómo se usan para operar el servicio y cómo contactarnos sobre cuestiones de privacidad.",
    sections: [
      {
        heading: "Información que recopilamos",
        body: [
          "Recopilamos la información de cuenta que proporcionas al iniciar sesión, los metadatos básicos de facturación que devuelve nuestro procesador de pagos y los prompts o detalles de marca que envías para generar logotipos.",
          "También recopilamos datos técnicos necesarios para proteger y operar el servicio, como metadatos de solicitudes, señales de prevención de abuso y registros de la aplicación.",
        ],
      },
      {
        heading: "Cómo usamos la información",
        body: [
          "Usamos los datos enviados para autenticar usuarios, procesar pagos, generar los logotipos solicitados, prevenir abuso y dar soporte al cliente.",
          "No vendemos información personal. Los datos pueden ser procesados por proveedores de infraestructura que nos ayudan con hosting, autenticación, pagos e inferencia de IA.",
        ],
      },
      {
        heading: "Retención y contacto",
        body: [
          "Conservamos la información solo durante el tiempo razonablemente necesario para operar el servicio, cumplir obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos.",
          "Para solicitudes de privacidad o preguntas, contáctanos en support@symplyai.io.",
        ],
      },
    ],
  },
} as const;

export default async function PrivacyPolicyPage({
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
