import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { BRAND_NAME, LOGO_SRC } from "@/lib/brand";

export type PromoSiteKind = "vizitka" | "landing" | "generic";

const COPY: Record<
  PromoSiteKind,
  { headline: string; body: string; cta: string }
> = {
  vizitka: {
    headline: "Mobil vizitkangizni yarating",
    body: "Kontaktlar, ijtimoiy tarmoqlar va manzil — bitta sahifada, telefonga mos.",
    cta: "Vizitka yaratish",
  },
  landing: {
    headline: "Landing sahifangizni yarating",
    body: "Hero, menyu, FAQ va aloqa — biznesingiz uchun to‘liq brend sahifasi.",
    cta: "Landing yaratish",
  },
  generic: {
    headline: "O‘z biznes sahifangizni yarating",
    body: "15 daqiqada vizitka yoki landing — dasturchisiz, dizaynersiz, mobilga mos.",
    cta: "Boshlash",
  },
};

/** Jamoat sahifalari (404, expired) uchun Paylinker reklamasi */
export function PaylinkerPublicPromo({
  slug,
  siteKind = "generic",
  className,
}: {
  slug?: string;
  siteKind?: PromoSiteKind;
  className?: string;
}) {
  const ref = slug?.trim();
  const copy = COPY[siteKind];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--radius-panel)] border border-white/10 text-white shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[color:var(--dark-surface)]"
      />
      <div
        aria-hidden
        className="pl-glow -right-10 -top-10 h-48 w-48"
        style={{ background: "var(--brand-from)", opacity: 0.35 }}
      />
      <div
        aria-hidden
        className="pl-glow -bottom-12 -left-8 h-44 w-44"
        style={{ background: "var(--brand-to)", opacity: 0.35 }}
      />

      <div className="relative border-b border-white/10 px-5 py-6 sm:px-7">
        <div className="flex items-start gap-4">
          <Image
            src={LOGO_SRC}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-[var(--radius-card)] bg-white/12 object-contain p-1.5 ring-1 ring-white/15"
          />
          <div className="min-w-0 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-300/90">
              {BRAND_NAME}
            </p>
            <p className="mt-0.5 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
              {copy.headline}
            </p>
          </div>
        </div>
        <p className="mt-4 text-left text-sm leading-relaxed text-white/78">
          {copy.body}
        </p>
      </div>

      <div className="relative flex flex-col gap-2.5 p-5 sm:flex-row sm:p-6">
        <Link
          href="/dashboard/sites/new"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-[var(--radius-control)] bg-white px-4 text-sm font-semibold text-brand-700 shadow-lg shadow-black/25 transition hover:bg-brand-50"
        >
          {copy.cta}
        </Link>
        <Link
          href={ref ? `/?ref=${encodeURIComponent(ref)}` : "/"}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-[var(--radius-control)] border border-white/25 bg-white/8 px-4 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/16"
        >
          Batafsil
        </Link>
      </div>
    </div>
  );
}