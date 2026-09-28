"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  buildVizitkaPackages,
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
import { LOCALE } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";

type Props = {
  site: UnknownSite;
  onExtended?: (site: UnknownSite) => void;
};

export function VizitkaSubscriptionPanel({ site, onExtended }: Props) {
  const { lang, t } = useI18n();
  const S = t.dash.sub;
  const fmt = (n: number) => n.toLocaleString(LOCALE[lang]).replace(/\u00a0/g, " ");
  const som = (n: number) => `${fmt(n)} ${t.common.som}`;
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
    new Intl.DateTimeFormat(LOCALE[lang], {
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
        setMessage(S.extendedBalance);
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
      setMessage(e instanceof Error ? e.message : S.payFail);
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
      setMessage(S.extended);
    } catch (e) {
      setMessage(
        e instanceof ApiError
          ? e.message
          : e instanceof Error
            ? e.message
            : S.balanceFail,
      );
    } finally {
      setLoadingMonths(null);
    }
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[color:var(--border)] bg-gradient-to-b from-neutral-50/80 to-white p-5 shadow-sm">
      <div className="flex flex-col gap-1 border-b border-neutral-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--foreground)]">{S.title}</h3>
          <p className="mt-1 text-xs text-neutral-600">
            {S.lead}
          </p>
        </div>
        <div className="mt-2 text-right sm:mt-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            {S.endsAt}
          </p>
          <p className="text-sm font-semibold tabular-nums text-neutral-900">
            {endDate ?? "—"}
          </p>
          <p className="mt-0.5 text-xs text-neutral-600">
            {days <= 0
              ? S.expiredOrToday
              : S.daysLeft(days)}
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
                {S.recommended}
              </span>
            ) : (
              <span className="mb-2 h-5" />
            )}
            <span className="text-base font-semibold text-[color:var(--foreground)]">{p.months === 6 ? S.m6 : S.m12}</span>
            <span className="mt-1 text-lg font-bold tabular-nums text-neutral-900">
              {som(p.priceSom)}
            </span>
            {p.hint ? (
              <span className="mt-1 text-[11px] text-neutral-500">
                {S.perMonth(fmt(Math.round(p.priceSom / p.months)))}
              </span>
            ) : null}
            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                disabled={loadingMonths !== null}
                onClick={() => void payClick(p.months)}
                className="inline-flex h-9 items-center justify-center pl-gradient rounded-md px-3 text-xs font-medium text-white transition hover:brightness-[1.06] disabled:opacity-50"
              >
                {loadingMonths === p.months
                  ? S.redirecting
                  : S.payClick}
              </button>
              <button
                type="button"
                disabled={loadingMonths !== null}
                onClick={() => void payBalance(p.months)}
                className="inline-flex h-9 items-center justify-center rounded-md border border-[color:var(--border)] bg-white px-3 text-xs font-medium text-[color:var(--foreground)] transition hover:border-brand-300 disabled:opacity-50"
              >
                {loadingMonths === "balance" ? S.checking : S.payBalance}
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
