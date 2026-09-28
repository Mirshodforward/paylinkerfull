import { Container } from "@/components/ui/container";
import { SITE_DOMAIN, SUPPORT_URL } from "@/lib/brand";
import { fill } from "@/lib/i18n/dict";
import { getDict } from "@/lib/i18n/server";
import { SectionIntro } from "./products";

export async function Faq() {
  const { t } = await getDict();
  const ITEMS = t.faq.items.map((it) => ({ q: it.q, a: fill(it.a, { domain: SITE_DOMAIN }) }));
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-[color:var(--border)] bg-white py-20 sm:py-24"
    >
      <Container>
        <SectionIntro eyebrow={t.faq.eyebrow} title={t.faq.title} />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-[color:var(--border)] overflow-hidden rounded-[var(--radius-panel)] border border-[color:var(--border)] bg-white shadow-[var(--shadow-sm)]">
          {ITEMS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-50/60 [&::-webkit-details-marker]:hidden">
                <span className="text-[15px] font-medium text-[color:var(--foreground)]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-transform group-open:rotate-45"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 3v8M3 7h8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[color:var(--muted-foreground)]">
          {t.faq.notFound}{" "}
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
          >
            {t.faq.writeUs}
          </a>
        </p>
      </Container>
    </section>
  );
}
