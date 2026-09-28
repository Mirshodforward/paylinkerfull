import { Container } from "@/components/ui/container";
import { SITE_DOMAIN } from "@/lib/brand";
import { fill } from "@/lib/i18n/dict";
import { getDict } from "@/lib/i18n/server";
import { SectionIntro } from "./products";

export async function HowItWorks() {
  const { t } = await getDict();
  const STEPS = t.how.steps.map((st, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: st.title,
    body: fill(st.body, { domain: SITE_DOMAIN }),
  }));
  return (
    <section
      id="qanday"
      className="scroll-mt-20 border-t border-[color:var(--border)] bg-white py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          eyebrow={t.how.eyebrow}
          title={t.how.title}
          description={t.how.description}
        />

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="relative rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]"
            >
              {/* Qadamlar orasidagi ulagich — faqat keng ekranda */}
              {i < STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute right-[-10px] top-1/2 hidden h-px w-[20px] bg-brand-200 lg:block"
                />
              ) : null}
              <span className="pl-gradient-text text-2xl font-semibold tracking-tight tabular-nums">
                {s.n}
              </span>
              <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-[color:var(--foreground)]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
