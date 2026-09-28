"use client";

import Link from "next/link";
import { LEGAL_LINKS } from "@/components/marketing/nav";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { LANGS } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { TODO } from "@/lib/legal/company";
import type { Bilingual, Block, LegalDoc } from "@/lib/legal/types";

/** Hujjat matni ikkala tilda ham lug'atdan emas, o'z faylidan keladi
 *  (src/lib/legal/*) — bu yerda faqat sahifa interfeysi tarjima qilinadi. */
export function LegalPage({ doc, current }: { doc: Bilingual; current: string }) {
  const { lang, setLang, t } = useI18n();
  const d: LegalDoc = doc[lang];

  return (
    <div className="bg-[color:var(--surface-2)] pb-20">
      <Container className="pt-10">
        {/* Yuqori qator: orqaga + til almashtirgich (global tilni o'zgartiradi) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--muted-foreground)] transition-colors hover:text-brand-700"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.legal.back}
          </Link>

          <div
            className="inline-flex rounded-[var(--radius-control)] border border-[color:var(--border)] bg-white p-1"
            role="group"
            aria-label={t.common.language}
          >
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => l !== lang && setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "rounded-[0.5rem] px-3 py-1.5 text-sm font-semibold transition-colors",
                  lang === l
                    ? "pl-gradient text-white"
                    : "text-[color:var(--muted-foreground)] hover:text-brand-700",
                )}
              >
                {l === "uz" ? "O'zbekcha" : "Русский"}
              </button>
            ))}
          </div>
        </div>

        {/* Hujjatlar orasida o'tish */}
        <nav className="mt-6 flex flex-wrap gap-2" aria-label={t.legal.docs}>
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.href === current ? "page" : undefined}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                l.href === current
                  ? "border-brand-300 bg-brand-50 text-brand-800"
                  : "border-[color:var(--border)] bg-white text-[color:var(--muted-foreground)] hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {t.legalLinks[l.key]}
            </Link>
          ))}
        </nav>

        <article className="mt-8 overflow-hidden rounded-[var(--radius-panel)] border border-[color:var(--border)] bg-white shadow-[var(--shadow-sm)]">
          <header className="border-b border-[color:var(--border)] px-6 py-8 sm:px-10">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
              {d.title}
            </h1>
            {d.subtitle ? (
              <p className="mt-2 text-base text-[color:var(--muted-foreground)]">{d.subtitle}</p>
            ) : null}
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-brand-700">
              {d.updated}
            </p>
          </header>

          <div className="px-6 py-8 sm:px-10">
            <div className="space-y-4">
              {d.intro.map((b, i) => (
                <BlockView key={i} b={b} />
              ))}
            </div>

            {/* Mundarija */}
            <nav
              aria-label={t.legal.contents}
              className="mt-10 rounded-[var(--radius-card)] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                {t.legal.contents}
              </p>
              <ol className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {d.sections.map((s) => (
                  <li key={s.n}>
                    <a
                      href={`#b${s.n}`}
                      className="text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-brand-700"
                    >
                      <span className="tabular-nums font-medium text-brand-700">{s.n}.</span> {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {d.sections.map((s) => (
              <section key={s.n} id={`b${s.n}`} className="mt-10 scroll-mt-6">
                <h2 className="text-lg font-semibold tracking-tight text-[color:var(--foreground)]">
                  <span className="tabular-nums text-brand-700">{s.n}.</span> {s.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {s.blocks.map((b, i) => (
                    <BlockView key={i} b={b} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  const { t } = useI18n();
  switch (b.t) {
    case "p":
      return (
        <p className="text-[15px] leading-[1.75] text-[color:var(--foreground)]">
          <Rich text={b.text} todo={t.legal.todo} />
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-[1.7] text-[color:var(--foreground)]">
              <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              <span><Rich text={it} todo={t.legal.todo} /></span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-[1.7] text-[color:var(--foreground)]">
              <span
                aria-hidden
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-semibold tabular-nums text-brand-800"
              >
                {i + 1}
              </span>
              <span><Rich text={it} todo={t.legal.todo} /></span>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <p className="rounded-[var(--radius-card)] border border-brand-200 bg-brand-50 px-4 py-3 text-[15px] leading-[1.7] text-brand-900">
          <Rich text={b.text} todo={t.legal.todo} />
        </p>
      );
    case "warn":
      return (
        <p className="rounded-[var(--radius-card)] border border-[color:var(--warning-border)] bg-[color:var(--warning-bg)] px-4 py-3 text-[15px] leading-[1.7] text-[color:var(--warning)]">
          <Rich text={b.text} todo={t.legal.todo} />
        </p>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[color:var(--border)]">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[color:var(--surface-2)]">
              <tr>
                {b.head.map((h) => (
                  <th
                    key={h}
                    className="border-b border-[color:var(--border)] px-4 py-3 font-semibold text-[color:var(--foreground)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-b border-[color:var(--border)] last:border-0">
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className={cn(
                        "px-4 py-3 align-top leading-[1.6]",
                        j === 0
                          ? "font-medium text-[color:var(--foreground)]"
                          : "text-[color:var(--muted-foreground)]",
                      )}
                    >
                      <Rich text={c} todo={t.legal.todo} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** `**qalin**` ni ajratadi va to'ldirilmagan rekvizitni ko'rinarli qiladi */
function Rich({ text, todo }: { text: string; todo: string }) {
  // Avval TODO belgilari, keyin har bo'lakda qalin matn
  const chunks = text.split(TODO);
  return (
    <>
      {chunks.map((chunk, ci) => (
        <span key={ci}>
          {ci > 0 ? (
            <span className="mx-0.5 rounded bg-[color:var(--warning-bg)] px-2 py-0.5 text-[13px] font-semibold text-[color:var(--warning)] ring-1 ring-[color:var(--warning-border)]">
              {todo}
            </span>
          ) : null}
          <Bold text={chunk} />
        </span>
      ))}
    </>
  );
}

function Bold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[color:var(--foreground)]">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
