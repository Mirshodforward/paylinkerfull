import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { apiBaseUrl } from "@/lib/api-base";
import { FALLBACK_PUBLIC_PRICING, type PublicPricing } from "@/lib/vizitka-pricing";

type Plan = {
  id: string;
  name: string;
  price: number;
  /** Masalan `· 6 oy` */
  priceSuffix: string;
  /** Ikkinchi qator: masalan 12 oylik paket */
  secondaryPriceLine?: string;
  perMonthApproxLine?: string;
  priceNote?: string;
  tagline: string;
  features: string[];
  highlighted: boolean;
};

async function loadPricing(): Promise<PublicPricing> {
  try {
    const r = await fetch(`${apiBaseUrl()}/vizitka/pricing`, { next: { revalidate: 60 } });
    if (!r.ok) throw new Error("pricing");
    const j = (await r.json()) as Partial<PublicPricing>;
    return {
      ...FALLBACK_PUBLIC_PRICING,
      ...j,
      pricesSom: { ...FALLBACK_PUBLIC_PRICING.pricesSom, ...j.pricesSom },
      landingPricesSom: {
        ...FALLBACK_PUBLIC_PRICING.landingPricesSom,
        ...j.landingPricesSom,
      },
    };
  } catch {
    return FALLBACK_PUBLIC_PRICING;
  }
}

function formatPrice(value: number) {
  return value.toLocaleString("ru-RU").replace(/\u00a0/g, " ");
}

export async function Pricing() {
  const pricing = await loadPricing();
  const v6 = pricing.pricesSom["6"];
  const v12 = pricing.pricesSom["12"];
  const perMoV = Math.round(v6 / 6 / 100) * 100;
  const l6 = pricing.landingPricesSom["6"];
  const l12 = pricing.landingPricesSom["12"];
  const perMoL = Math.round(l6 / 6 / 100) * 100;
  const plans: Plan[] = [
    {
      id: "vizitka",
      name: "Vizitka",
      price: v6,
      priceSuffix: "· 6 oy",
      secondaryPriceLine: `${formatPrice(v12)} so'm · 12 oy`,
      perMonthApproxLine: `≈ ${formatPrice(perMoV)} so'm/oy (6 oy paketi)`,
      priceNote: "6 oy va 1 yil paketlari",
      tagline: "Bir ekranli biznes kartasi",
      features: [
        "1 ekranli sayt",
        "Telefon, manzil, ijtimoiy tarmoq linklari",
        "Mobil telefonda mukammal",
      ],
      highlighted: false,
    },
    {
      id: "landing",
      name: "Landing",
      price: l6,
      priceSuffix: "· 6 oy",
      secondaryPriceLine: `${formatPrice(l12)} so'm · 12 oy`,
      perMonthApproxLine: `≈ ${formatPrice(perMoL)} so'm/oy (6 oy paketi)`,
      tagline: "Bir nechta bo'limli sayt",
      features: [
        "Vizitka tarifidagi barchasi",
        "Xizmatlar va narxlar jadvali",
        "Aloqa formasi (Telegram bot)",
        "Galereya va sharhlar",
      ],
      highlighted: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-[color:var(--border)] bg-white py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pl-glow -z-10 left-[-8%] top-1/4 h-[26rem] w-[26rem]"
        style={{ background: "var(--brand-from)", opacity: 0.1 }}
      />
      <div
        aria-hidden
        className="pl-glow -z-10 bottom-[-10%] right-[-8%] h-[26rem] w-[26rem]"
        style={{ background: "var(--brand-to)", opacity: 0.1 }}
      />

      <Container className="w-full">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            Tariflar
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-4xl md:text-5xl">
            Oddiy va tushunarli
          </h2>
          <p className="mt-4 text-base text-[color:var(--muted-foreground)]">
            {pricing.freePublishDays}{" "}
            kun bepul. Karta ma&apos;lumotisiz. Istalgan vaqtda bekor qiling.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "pl-lift relative flex h-full flex-col rounded-[var(--radius-panel)] bg-white p-8",
        plan.highlighted
          ? "pl-gradient-border shadow-[var(--shadow-lg)] md:-mt-3 md:pb-11"
          : "border border-[color:var(--border)] shadow-[var(--shadow-sm)]",
      )}
    >
      {plan.highlighted ? (
        <span className="pl-gradient absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-[var(--shadow-brand)]">
          Tavsiya
        </span>
      ) : null}

      <h3 className="text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
        {plan.name}
      </h3>
      <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">{plan.tagline}</p>

      <div className="mt-6 flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              "text-5xl font-semibold tracking-tight tabular-nums",
              plan.highlighted
                ? "pl-gradient-text"
                : "text-[color:var(--foreground)]",
            )}
          >
            {formatPrice(plan.price)}
          </span>
          <span className="text-sm text-[color:var(--muted-foreground)]">
            so&apos;m {plan.priceSuffix}
          </span>
        </div>
        {plan.secondaryPriceLine ? (
          <p className="text-sm font-medium text-[color:var(--foreground)]">
            {plan.secondaryPriceLine}
          </p>
        ) : null}
        {plan.perMonthApproxLine ? (
          <p className="text-sm font-medium text-[color:var(--muted-foreground)]">
            {plan.perMonthApproxLine}
          </p>
        ) : null}
        {plan.priceNote ? (
          <p className="text-xs text-[color:var(--muted-foreground)]">{plan.priceNote}</p>
        ) : null}
      </div>

      <div className="my-7 h-px w-full shrink-0 bg-[color:var(--border)]" />

      <ul className="space-y-3.5">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-[color:var(--foreground)]"
          >
            <span
              aria-hidden
              className={cn(
                "mt-px inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                plan.highlighted ? "pl-gradient" : "bg-brand-100",
              )}
            >
              <svg
                className={cn(
                  "h-3 w-3",
                  plan.highlighted ? "text-white" : "text-brand-700",
                )}
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
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Button
          href={`/signup?plan=${plan.id}`}
          size="lg"
          variant={plan.highlighted ? "primary" : "secondary"}
          className="w-full"
        >
          Tanlash
        </Button>
      </div>
    </div>
  );
}
