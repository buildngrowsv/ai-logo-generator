import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/legal/PolicyPage";

const COPY = {
  en: {
    eyebrow: "Legal",
    title: "Refund Policy",
    intro:
      "This policy explains how LogoForge AI handles refunds for subscriptions and credit purchases.",
    sections: [
      {
        heading: "Subscription charges",
        body: [
          "If you believe you were billed in error, contact support@symplyai.io promptly with your account email and payment details so we can review the charge.",
          "Where required by law, refunds will be handled in accordance with applicable consumer protection rules and our payment provider's requirements.",
        ],
      },
      {
        heading: "Credit packs and generated usage",
        body: [
          "One-time credit purchases are generally non-refundable once credits have been delivered or consumed, except where required by law or when a duplicate or fraudulent charge is confirmed.",
          "If a verified platform-side billing error prevented you from receiving purchased access, we will investigate and correct the issue or provide an appropriate remedy.",
        ],
      },
      {
        heading: "How to request help",
        body: [
          "Send refund and billing requests to support@symplyai.io. Include the account email, purchase date, and enough detail for us to locate the transaction quickly.",
        ],
      },
    ],
  },
  es: {
    eyebrow: "Legal",
    title: "Política de Reembolsos",
    intro:
      "Esta política explica cómo LogoForge AI maneja los reembolsos de suscripciones y compras de créditos.",
    sections: [
      {
        heading: "Cargos de suscripción",
        body: [
          "Si crees que se te cobró por error, escribe a support@symplyai.io con el correo de la cuenta y los detalles del pago para que podamos revisar el cargo.",
          "Cuando la ley lo exija, los reembolsos se tramitarán conforme a las normas de protección al consumidor aplicables y a los requisitos de nuestro proveedor de pagos.",
        ],
      },
      {
        heading: "Paquetes de créditos y uso generado",
        body: [
          "Las compras de créditos de un solo pago normalmente no son reembolsables una vez que los créditos han sido entregados o consumidos, salvo que la ley exija lo contrario o se confirme un cargo duplicado o fraudulento.",
          "Si un error verificable de la plataforma impidió que recibieras el acceso comprado, investigaremos y corregiremos el problema o proporcionaremos una solución adecuada.",
        ],
      },
      {
        heading: "Cómo solicitar ayuda",
        body: [
          "Envía solicitudes de reembolso o facturación a support@symplyai.io. Incluye el correo de la cuenta, la fecha de compra y suficiente detalle para localizar la transacción rápidamente.",
        ],
      },
    ],
  },
} as const;

export default async function RefundPolicyPage({
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
