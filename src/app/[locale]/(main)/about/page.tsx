import { setRequestLocale } from "next-intl/server";
import { PolicyPage } from "@/components/legal/PolicyPage";

const COPY = {
  en: {
    eyebrow: "About",
    title: "About LogoForge AI",
    intro:
      "LogoForge AI helps founders, freelancers, and agencies turn a business name and rough brand direction into polished logo concepts in seconds.",
    sections: [
      {
        heading: "What we do",
        body: [
          "LogoForge AI generates original logo concepts using a text-first workflow built for branding. You provide your business name, style direction, and optional brand notes. We return multiple visual concepts designed to accelerate brand exploration.",
          "The product is optimized for early-stage teams that need momentum before they need a full custom brand engagement.",
        ],
      },
      {
        heading: "How the service works",
        body: [
          "Free visitors can try a limited number of generations. Paid plans and credit packs unlock higher volume usage for repeat brand exploration, agency work, and client iteration.",
          "Generated assets are delivered digitally through the web app. Support requests can be sent to support@symplyai.io.",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "LogoForge AI is designed for founders validating new ideas, solo operators launching small brands, and creative teams that want fast AI-assisted starting points before refining a final mark.",
        ],
      },
    ],
  },
  es: {
    eyebrow: "Acerca de",
    title: "Acerca de LogoForge AI",
    intro:
      "LogoForge AI ayuda a fundadores, freelancers y agencias a convertir el nombre de una marca y una dirección visual básica en conceptos de logotipo en segundos.",
    sections: [
      {
        heading: "Qué hacemos",
        body: [
          "LogoForge AI genera conceptos originales de logotipo con un flujo de trabajo basado en texto. Tú proporcionas el nombre del negocio, el estilo deseado y notas opcionales de marca. Nosotros devolvemos múltiples conceptos visuales para acelerar la exploración de identidad.",
          "El producto está pensado para equipos en etapa temprana que necesitan velocidad antes de contratar un proceso completo de branding.",
        ],
      },
      {
        heading: "Cómo funciona el servicio",
        body: [
          "Los visitantes gratuitos pueden probar un número limitado de generaciones. Los planes pagos y los paquetes de créditos desbloquean mayor volumen para trabajo repetido, agencias y proyectos para clientes.",
          "Los activos generados se entregan digitalmente dentro de la app. Las consultas de soporte pueden enviarse a support@symplyai.io.",
        ],
      },
      {
        heading: "Para quién es",
        body: [
          "LogoForge AI está diseñado para fundadores que validan ideas, operadores independientes que lanzan nuevas marcas y equipos creativos que quieren puntos de partida rápidos antes de refinar un logotipo final.",
        ],
      },
    ],
  },
} as const;

export default async function AboutPage({
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
