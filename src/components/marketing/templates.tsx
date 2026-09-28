import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getDict } from "@/lib/i18n/server";
import { SectionIntro } from "./products";

export async function Templates() {
  const { t } = await getDict();
  const T = t.templates;
  /** Nomlar — shablonlarning xos nomi (tarjima qilinmaydi); ro'yxat
   *  src/lib/store/types.ts dagi VIZITKA_TEMPLATES bilan mos */
  const VIZITKA = [
    { name: "Minimal", body: T.vizitka.minimal },
    { name: "Linktree", body: T.vizitka.linktree },
    { name: "Social Wall", body: T.vizitka.socialWall },
    { name: "Dark", body: T.vizitka.dark },
    { name: "Business Card", body: T.vizitka.card },
    { name: "Polaroid", body: T.vizitka.polaroid },
    { name: "Ticket", body: T.vizitka.ticket },
  ];
  const LANDING = [
    { name: "Default", body: T.landing.default },
    { name: "Simple", body: T.landing.simple },
    { name: "Marketing", body: T.landing.marketing },
  ];
  return (
    <section
      id="shablonlar"
      className="scroll-mt-20 border-t border-[color:var(--border)] bg-[color:var(--surface-2)] py-20 sm:py-24"
    >
      <Container>
        <SectionIntro eyebrow={T.eyebrow} title={T.title} description={T.description} />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-700">
              {T.vizitkaHeading}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {VIZITKA.map((t) => (
                <TemplateCard key={t.name} name={t.name} body={t.body} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-700">
              {T.landingHeading}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {LANDING.map((t) => (
                <TemplateCard key={t.name} name={t.name} body={t.body} />
              ))}
            </div>

            <div className="mt-6 rounded-[var(--radius-card)] border border-brand-200 bg-white p-5 shadow-[var(--shadow-sm)]">
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                {T.demoTitle}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                {T.demoBody}
              </p>
              <Link
                href="/demo"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-[var(--radius-control)] border border-brand-200 bg-white px-4 text-sm font-medium text-brand-700 transition-colors hover:border-brand-400 hover:bg-brand-50"
              >
                {T.demoCta}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TemplateCard({ name, body }: { name: string; body: string }) {
  return (
    <article className="pl-lift rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-4 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-2.5">
        <span className="pl-gradient h-2 w-2 shrink-0 rounded-full" aria-hidden />
        <h4 className="text-sm font-semibold tracking-tight text-[color:var(--foreground)]">
          {name}
        </h4>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--muted-foreground)]">
        {body}
      </p>
    </article>
  );
}
