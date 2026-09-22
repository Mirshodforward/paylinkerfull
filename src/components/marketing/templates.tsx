import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "./products";

/** Ro'yxat src/lib/store/types.ts dagi VIZITKA_TEMPLATES bilan mos */
const VIZITKA = [
  { name: "Minimal", body: "Ism, telefon va ijtimoiy tarmoqlar — faqat asosiy" },
  { name: "Linktree", body: "Ustma-ust tugmalar — barcha havola bir ustunda" },
  { name: "Social Wall", body: "To'rtta katta kontakt tile — bosish uchun qulay" },
  { name: "Dark", body: "Qora fon, markazlashgan minimal ko'rinish" },
  { name: "Business Card", body: "Markazda klassik biznes kartasi" },
  { name: "Polaroid", body: "Aylangan polaroid — rasm va lenta" },
  { name: "Ticket", body: "Chipta uslubidagi kesma chekka" },
];

const LANDING = [
  { name: "Default", body: "Hero, xizmatlar, galereya, FAQ va aloqa — to'liq tuzilma" },
  { name: "Simple", body: "Qisqa va tinch: hero, tavsif va kontakt" },
  { name: "Marketing", body: "Xususiyatlar, statistika va kuchli chaqiruvga urg'u" },
];

export function Templates() {
  return (
    <section
      id="shablonlar"
      className="scroll-mt-20 border-t border-[color:var(--border)] bg-[color:var(--surface-2)] py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          eyebrow="Shablonlar"
          title="10 ta tayyor shablon"
          description="Har birini 16 rang temasi va 6 fon naqshi bilan o'zgartirasiz — tanlov yuzlab ko'rinishga yetadi."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-700">
              Vizitka · 7 ta
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {VIZITKA.map((t) => (
                <TemplateCard key={t.name} name={t.name} body={t.body} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-700">
              Landing · 3 ta
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {LANDING.map((t) => (
                <TemplateCard key={t.name} name={t.name} body={t.body} />
              ))}
            </div>

            <div className="mt-6 rounded-[var(--radius-card)] border border-brand-200 bg-white p-5 shadow-[var(--shadow-sm)]">
              <p className="text-sm font-semibold text-[color:var(--foreground)]">
                Jonli namunani ko&apos;ring
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                Choyxona misolida to&apos;liq landing sahifa qanday chiqishini
                ko&apos;rib chiqing.
              </p>
              <Link
                href="/demo"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-[var(--radius-control)] border border-brand-200 bg-white px-4 text-sm font-medium text-brand-700 transition-colors hover:border-brand-400 hover:bg-brand-50"
              >
                Namunani ochish
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
