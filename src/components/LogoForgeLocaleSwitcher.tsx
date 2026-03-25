/**
 * EN/ES switcher for LogoForge — uses next-intl navigation (Builder 25, T13).
 */
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LogoForgeLocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-md border border-border/60 bg-background/80 px-1 py-0.5 text-xs font-medium text-muted-foreground">
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: "en" })}
        className={`rounded px-2 py-0.5 ${activeLocale === "en" ? "bg-muted text-foreground" : ""}`}
      >
        EN
      </button>
      <span className="text-border">|</span>
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: "es" })}
        className={`rounded px-2 py-0.5 ${activeLocale === "es" ? "bg-muted text-foreground" : ""}`}
      >
        ES
      </button>
    </div>
  );
}
