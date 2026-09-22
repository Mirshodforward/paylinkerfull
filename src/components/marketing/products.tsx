import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type Product = {
  id: string;
  eyebrow: string;
  name: string;
  lead: string;
  points: string[];
  href: string;
  cta: string;
  highlighted: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "vizitka",
    eyebrow: "Bir ekranli",
    name: "Vizitka",
    lead: "Telefon, manzil va ijtimoiy tarmoqlar — bitta qulay sahifada. Mijoz bosadi va darhol bog'lanadi.",
    points: [
      "7 ta tayyor shablon",
      "Telefon, manzil, ish vaqti",
      "Instagram, Telegram, TikTok, YouTube, Facebook",
      "Xarita va QR kod",
    ],
    href: "/signup?plan=vizitka",
    cta: "Vizitka yaratish",
    highlighted: false,
  },
  {
    id: "landing",
    eyebrow: "Ko'p bo'limli",
    name: "Landing",
    lead: "To'liq brend sahifasi: xizmatlar, narxlar, galereya va aloqa formasi — biznesingizni to'liq ko'rsating.",
    points: [
      "Vizitkadagi barcha imkoniyatlar",
      "Xizmatlar va narxlar jadvali",
      "Galereya, xususiyatlar, statistika",
      "Savol-javob va aloqa formasi",
    ],
    href: "/signup?plan=landing",
    cta: "Landing yaratish",
    highlighted: true,
  },
];

export function Products() {
  return (
    <section id="mahsulotlar" className="scroll-mt-20 border-t border-[color:var(--border)] bg-white py-20 sm:py-24">
      <Container>
        <SectionIntro
          eyebrow="Ikki xil sayt"
          title="Biznesingizga qaysi biri mos?"
          description="Ikkalasi ham bir xil tahrirlagichda quriladi va paylinker.uz/nomingiz manzilida ochiladi."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              className={cn(
                "pl-lift flex flex-col rounded-[var(--radius-panel)] bg-white p-7 sm:p-8",
                p.highlighted
                  ? "pl-gradient-border shadow-[var(--shadow-lg)]"
                  : "border border-[color:var(--border)] shadow-[var(--shadow-sm)]",
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                {p.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                {p.name}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--muted-foreground)]">
                {p.lead}
              </p>

              <ul className="mt-6 space-y-3">
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-3 text-sm text-[color:var(--foreground)]"
                  >
                    <Tick highlighted={p.highlighted} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href={p.href}
                  className={cn(
                    "inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] px-5 text-sm font-semibold transition-all",
                    p.highlighted
                      ? "pl-gradient text-white shadow-[var(--shadow-brand)] hover:brightness-[1.06]"
                      : "border border-brand-200 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50",
                  )}
                >
                  {p.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-balance text-base leading-relaxed text-[color:var(--muted-foreground)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Tick({ highlighted = false }: { highlighted?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-px inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
        highlighted ? "pl-gradient" : "bg-brand-100",
      )}
    >
      <svg
        className={cn("h-3 w-3", highlighted ? "text-white" : "text-brand-700")}
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7.5L6 10.5L11 4.5" />
      </svg>
    </span>
  );
}
