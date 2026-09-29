import { makeTr, type Tr } from "./i18n/tr";
import type { VizitkaPackage } from "./vizitka-packages";
import type { PublicPricing } from "./vizitka-pricing";

/** AI bilan landing boshlang‘ich paketi (bir martalik, UI va backend bilan mos) */
export const LANDING_AI_STARTER_PRICE_SOM = 5_000;

/** Sinxron fallback — API `landingPricesSom` bilan mos */
export const LANDING_PRICE_SOM = {
  "6": 780_000,
  "12": 1_180_000,
} as const;

function perMonthHint(months: number, totalSom: number, tr: Tr): string {
  const per = Math.round(totalSom / months);
  return tr("≈ {per} so'm/oy", { per: per.toLocaleString("ru-RU").replace(/\u00a0/g, " ") });
}

export function buildLandingFreePackage(freeDays: number, tr: Tr = makeTr("uz")) {
  return {
    id: "free" as const,
    trialDays: freeDays,
    title: tr("Bepul"),
    subtitle: tr("Sinov — barcha landing imkoniyatlari."),
    priceLabel: tr("0 so'm"),
  } as const;
}

export function buildLandingPackages(pricing: PublicPricing, tr: Tr = makeTr("uz")): VizitkaPackage[] {
  const p = pricing.landingPricesSom;
  return [
    {
      id: "p6",
      months: 6,
      priceSom: p["6"],
      title: tr("6 oy"),
      subtitle: tr("Ko‘pchilik tanlaydi — yumshoq narx va uzoq ishlab turish."),
      hint: perMonthHint(6, p["6"], tr),
      recommended: true,
    },
    {
      id: "p12",
      months: 12,
      priceSom: p["12"],
      title: tr("1 yil"),
      subtitle: tr("Eng foydali — bir yillik barqaror obuna."),
      hint: perMonthHint(12, p["12"], tr),
    },
  ];
}

export function landingPackagePriceByMonths(
  pricing: PublicPricing,
): Record<6 | 12, number> {
  const x = pricing.landingPricesSom;
  return { 6: x["6"], 12: x["12"] };
}
