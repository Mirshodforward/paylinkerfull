import { makeTr, type Tr } from "./i18n/tr";
import type { PublicPricing } from "./vizitka-pricing";

/** Mijoz vizitka paketlari — summa va muddat (oy) */
export type VizitkaPackageId = "free" | "p6" | "p12";

export type VizitkaPackage = {
  id: "p6" | "p12";
  months: 6 | 12;
  priceSom: number;
  title: string;
  subtitle: string;
  hint?: string;
  recommended?: boolean;
};

export function buildVizitkaFreePackage(freeDays: number, tr: Tr = makeTr("uz")) {
  return {
    id: "free" as const,
    trialDays: freeDays,
    title: tr("Bepul"),
    subtitle: tr("Sinov — barcha vizitka imkoniyatlari."),
    priceLabel: tr("0 so'm"),
  } as const;
}

function perMonthHint(months: number, totalSom: number, tr: Tr): string {
  const per = Math.round(totalSom / months);
  return tr("≈ {per} so'm/oy", { per: per.toLocaleString("ru-RU").replace(/\u00a0/g, " ") });
}

/** `GET /vizitka/pricing` dan kelgan narxlar asosida kartalar */
export function buildVizitkaPackages(pricing: PublicPricing, tr: Tr = makeTr("uz")): VizitkaPackage[] {
  const p = pricing.pricesSom;
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

export function packagePriceByMonths(pricing: PublicPricing): Record<6 | 12, number> {
  const x = pricing.pricesSom;
  return { 6: x["6"], 12: x["12"] };
}

/** 1 180 000 so'm — ikkala tilda ham bo'shliq bilan guruhlanadi */
export function formatSom(n: number, tr: Tr = makeTr("uz")): string {
  return tr("{n} so'm", { n: n.toLocaleString("ru-RU").replace(/\u00a0/g, " ") });
}
