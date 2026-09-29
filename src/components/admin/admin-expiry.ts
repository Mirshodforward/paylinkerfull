import { makeTr, type Tr } from "@/lib/i18n/tr";
import { LOCALE, type Lang } from "@/lib/i18n/config";

/** Kalendar bo‘yicha qolgan kunlar (00:00 oralig‘ida) */
export function calendarDaysUntilExpiry(iso: string): number | null {
  try {
    const end = new Date(iso);
    if (Number.isNaN(end.getTime())) return null;
    const now = new Date();
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((endDay.getTime() - today.getTime()) / 86400000);
  } catch {
    return null;
  }
}

export function expiryParts(iso: string | null | undefined, tr: Tr = makeTr("uz"), lang: Lang = "uz"): {
  dateLine: string;
  daysLine: string;
  daysClass: string;
} {
  if (!iso?.trim()) {
    return {
      dateLine: "—",
      daysLine: tr("Tugash sanasi yo‘q"),
      daysClass: "text-zinc-400",
    };
  }
  const end = new Date(iso);
  if (Number.isNaN(end.getTime())) {
    return {
      dateLine: "—",
      daysLine: tr("Noto‘g‘ri sana"),
      daysClass: "text-amber-700",
    };
  }
  const dateLine = end.toLocaleString(LOCALE[lang], {
    dateStyle: "short",
    timeStyle: "short",
  });
  const left = calendarDaysUntilExpiry(iso);
  if (left === null) {
    return { dateLine, daysLine: "", daysClass: "text-zinc-500" };
  }
  if (left > 0) {
    return {
      dateLine,
      daysLine: tr("{left} kun qoldi", { left }),
      daysClass: left <= 7 ? "text-amber-700" : "text-brand-700",
    };
  }
  if (left === 0) {
    return {
      dateLine,
      daysLine: tr("Bugun tugaydi"),
      daysClass: "text-amber-800",
    };
  }
  return {
    dateLine,
    daysLine: tr("Tugagan ({n} kun oldin)", { n: Math.abs(left) }),
    daysClass: "text-red-700",
  };
}

export function formatToday(lang: Lang = "uz"): string {
  return new Date().toLocaleDateString(LOCALE[lang], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function planLabel(plan: string, tr: Tr = makeTr("uz")): string {
  if (plan === "10kun") return tr("Sinov (10 kun)");
  if (plan === "6oy") return tr("6 oy");
  if (plan === "12oy") return tr("12 oy");
  return plan || "—";
}
