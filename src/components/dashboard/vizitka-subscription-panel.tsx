"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  buildVizitkaPackages,
  formatSom,
  packagePriceByMonths,
} from "@/lib/vizitka-packages";
import {
  FALLBACK_PUBLIC_PRICING,
  fetchVizitkaPricing,
  type PublicPricing,
} from "@/lib/vizitka-pricing";
import { buildClickPayUrl } from "@/lib/click-checkout";
import { clickInvoiceAmountSom } from "@/lib/click-invoice-amount";
import { api, ApiError } from "@/lib/api";
import { trialDaysLeft } from "@/lib/store/store";
import { normalizeSite } from "@/lib/store/normalize";
import type { UnknownSite } from "@/lib/store/types";
import {
  createVizitkaSubscriptionPayment,
  extendVizitkaSubscription,
} from "@/lib/vizitka-client";

type Props = {
  site: UnknownSite;
  onExtended?: (site: UnknownSite) => void;
};

export function VizitkaSubscriptionPanel({ site, onExtended }: Props) {
  const [loadingMonths, setLoadingMonths] = useState<6 | 12 | "balance" | null>(
    null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [pricing, setPricing] = useState<PublicPricing>(FALLBACK_PUBLIC_PRICING);

  useEffect(() => {
    void fetchVizitkaPricing().then(setPricing).catch(() => {});
  }, []);

  const packages = useMemo(() => buildVizitkaPackages(pricing), [pricing]);
  const priceByMonths = useMemo(() => packagePriceByMonths(pricing), [pricing]);

  if (site.type !== "vizitka") return null;

  const endsIso = site.subscriptionEndsAt ?? site.trialEndsAt;
  const days = trialDaysLeft(site);
  const endDate =
    endsIso &&
    new Intl.DateTimeFormat("uz-UZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(endsIso));

  async function payClick(months: 6 | 12) {
    setMessage(null);
    setLoadingMonths(months);
    try {
      const amountSom = priceByMonths[months];
      const me = await api<{ user: { balance: number } }>("/auth/me");
      const need = clickInvoiceAmountSom(
        Math.max(0, amountSom - me.user.balance),
      );
      if (need === 0) {
        const res = await extendVizitkaSubscription(site.id, months);
        const updated = normalizeSite(res.site as UnknownSite);
        onExtended?.(updated);
        setMessage("Obuna muddati uzaytirildi (balansdan).");
        setLoadingMonths(null);
        return;
      }
      const payment = await createVizitkaSubscriptionPayment({
        vizitkaId: site.id,
        subscriptionMonths: months,
        amountSom,
      });
      const returnUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/dashboard/sites?vizitka=${encodeURIComponent(site.id)}&click=1`
          : "/dashboard/sites";
      window.location.assign(buildClickPayUrl(payment, returnUrl));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "To‘lov boshlanmadi");
      setLoadingMonths(null);
    }
  }

  async function payBalance(months: 6 | 12) {
    setMessage(null);
    setLoadingMonths("balance");
    try {
      const res = await extendVizitkaSubscription(site.id, months);
      const updated = normalizeSite(res.site as UnknownSite);
      onExtended?.(updated);
      setMessage("Obuna muddati uzaytirildi.");
    } catch (e) {
      setMessage(
        e instanceof ApiError
          ? e.message
          : e instanceof Error
            ? e.message
            : "Balansdan yechilmadi",
      );
    } finally {
      setLoadingMonths(null);
    }
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[color:var(--border)] bg-gradient-to-b from-neutral-50/80 to-white p-5 shadow-sm">
      <div className="flex flex-col gap-1 border-b border-neutral-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--foreground)]">Obuna muddati</h3>
          <p className="mt-1 text-xs text-neutral-600">
            Paket tanlang — muddat joriy tugash sanasiga qo‘shiladi (CLICK yoki balans).
          </p>
        </div>
        <div className="mt-2 text-right sm:mt-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            Tugash sanasi
          </p>
          <p className="text-sm font-semibold tabular-nums text-neutral-900">
            {endDate ?? "—"}
          </p>
          <p className="mt-0.5 text-xs text-neutral-600">
            {days <= 0
              ? "Muddati tugagan yoki bugun tugaydi"
              : `~${days} kun qoldi`}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {packages.map((p) => (
          <div
            key={p.id}
            className={cn(
              "flex flex-col rounded-xl border p-4",
              p.recommended
                ? "border-brand-500 bg-white ring-1 ring-brand-200"
                : "border-neutral-200 bg-white",
            )}
          >
            {p.recommended ? (
              <span className="mb-2 inline-flex w-fit pl-gradient rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Tavsiya
              </span>
            ) : (
              <span className="mb-2 h-5" />
            )}
            <span className="text-base font-semibold text-[color:var(--foreground)]">{p.title}</span>
            <span className="mt-1 text-lg font-bold tabular-nums text-neutral-900">
              {formatSom(p.priceSom)}
            </span>
            {p.hint ? (
              <span className="mt-1 text-[11px] text-neutral-500">{p.hint}</span>
            ) : null}
            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                disabled={loadingMonths !== null}
                onClick={() => void payClick(p.months)}
                className="inline-flex h-9 items-center justify-center pl-gradient rounded-md px-3 text-xs font-medium text-white transition hover:brightness-[1.06] disabled:opacity-50"
              >
                {loadingMonths === p.months
                  ? "Yo‘naltirilmoqda…"
                  : "CLICK bilan to‘lash"}
              </button>
              <button
                type="button"
                disabled={loadingMonths !== null}
                onClick={() => void payBalance(p.months)}
                className="inline-flex h-9 items-center justify-center rounded-md border border-[color:var(--border)] bg-white px-3 text-xs font-medium text-[color:var(--foreground)] transition hover:border-brand-300 disabled:opacity-50"
              >
                {loadingMonths === "balance" ? "Tekshirilmoqda…" : "Balansdan uzaytirish"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {message ? (
        <p className="mt-4 text-sm text-amber-800" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
