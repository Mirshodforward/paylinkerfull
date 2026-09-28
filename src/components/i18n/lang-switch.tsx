"use client";

import { LANGS } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/cn";

/** UZ | RU almashtirgich — header, login va kabinetda */
export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.common.language}
      className={cn(
        "inline-flex rounded-[var(--radius-control)] border border-[color:var(--border)] bg-white p-0.5",
        className,
      )}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => l !== lang && setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-[0.55rem] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
            lang === l
              ? "pl-gradient text-white"
              : "text-[color:var(--muted-foreground)] hover:text-brand-700",
          )}
        >
          {l === "uz" ? "UZ" : "RU"}
        </button>
      ))}
    </div>
  );
}
