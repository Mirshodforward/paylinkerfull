"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSites } from "@/lib/store/hooks";
import { trialDaysLeft } from "@/lib/store/store";
import { SITE_DOMAIN } from "@/lib/brand";
import { useI18n } from "@/lib/i18n/provider";

export function Overview() {
  const { sites, ready } = useSites();
  const { t } = useI18n();
  const O = t.dash.overview;

  if (!ready) {
    return <OverviewSkeleton />;
  }

  if (sites.length === 0) {
    return <EmptyOverview />;
  }

  const publishedCount = sites.filter((s) => s.status === "published").length;
  const totalServices = sites.reduce(
    (acc, s) => acc + (s.type === "landing" ? s.content.services.length : 0),
    0,
  );
  const mostRecent = sites[0];
  const avgDaysLeft =
    Math.round(
      sites.reduce((acc, s) => acc + trialDaysLeft(s), 0) / sites.length,
    ) || 0;

  return (
    <div className="space-y-6 px-5 py-6 lg:px-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label={O.sites} value={sites.length} />
        <Stat label={O.published} value={publishedCount} />
        <Stat label={O.services} value={totalServices} />
        <Stat
          label={O.subLeft}
          value={avgDaysLeft > 0 ? O.days(avgDaysLeft) : O.expired}
          muted
        />
      </div>

      <TrialBanner />

      <div className="rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
              {O.lastEdited}
            </p>
            <p className="mt-1 text-lg font-semibold text-[color:var(--foreground)]">
              {mostRecent.content.businessName}
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              {SITE_DOMAIN}/<span className="font-mono">{mostRecent.slug}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              href={`/${mostRecent.slug}`}
              variant="secondary"
              size="sm"
              target="_blank"
            >
              {O.view}
            </Button>
            <Button href={`/dashboard/sites/${mostRecent.id}`} size="sm">
              {O.edit}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <QuickAction
          href="/dashboard/sites/new"
          title={O.quickNew}
          hint={O.quickNewHint}
          primary
        />
        <QuickAction
          href="/dashboard/sites"
          title={O.quickManage}
          hint={O.quickManageHint(sites.length)}
        />
        <QuickAction
          href="/dashboard/inbox"
          title={O.quickInbox}
          hint={O.quickInboxHint}
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  muted,
}: {
  label: string;
  value: number | string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-5 shadow-[var(--shadow-sm)]">
      <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
        {label}
      </p>
      <p
        className={`mt-3 text-3xl font-semibold tracking-tight tabular-nums ${muted ? "text-[color:var(--muted-foreground)]" : "text-[color:var(--foreground)]"}`}
      >
        {value}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  title,
  hint,
  primary,
}: {
  href: string;
  title: string;
  hint: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "pl-lift group flex items-start justify-between rounded-[var(--radius-card)] border p-5 " +
        (primary
          ? "pl-gradient border-transparent text-white shadow-[var(--shadow-brand)]"
          : "border-[color:var(--border)] bg-white text-[color:var(--foreground)] shadow-[var(--shadow-sm)] hover:border-brand-300")
      }
    >
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p
          className={
            "mt-1 text-xs " +
            (primary ? "text-neutral-300" : "text-neutral-500")
          }
        >
          {hint}
        </p>
      </div>
      <span aria-hidden className="mt-1 text-lg transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

function EmptyOverview() {
  const { t } = useI18n();
  const O = t.dash.overview;
  return (
    <div className="px-5 py-16 lg:px-10">
      <div className="mx-auto max-w-xl rounded-[var(--radius-panel)] border border-[color:var(--border)] bg-white p-8 text-center shadow-[var(--shadow-sm)]">
        <div
          aria-hidden
          className="pl-gradient mx-auto flex h-12 w-12 items-center justify-center rounded-[var(--radius-card)] text-white shadow-[var(--shadow-brand)]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10h10M10 5v10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
          {O.emptyTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {O.emptyBody}
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button href="/dashboard/sites/new" size="lg">
            {O.emptyCta}
          </Button>
        </div>
      </div>
    </div>
  );
}

function TrialBanner() {
  const { t } = useI18n();
  const O = t.dash.overview;
  return (
    <div className="pl-gradient flex flex-col gap-3 rounded-[var(--radius-card)] border border-transparent p-5 text-white shadow-[var(--shadow-brand)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-neutral-300">
          {O.trialEyebrow}
        </p>
        <p className="mt-1 text-sm">
          {O.trialBody}
        </p>
      </div>
      <Button href="/dashboard/billing" variant="inverse" size="sm">
        {O.trialCta}
      </Button>
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-4 px-5 py-6 lg:px-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-[var(--radius-card)] border border-[color:var(--border)] bg-[color:var(--surface-3)]"
          />
        ))}
      </div>
      <div className="h-20 animate-pulse rounded-[var(--radius-card)] border border-[color:var(--border)] bg-[color:var(--surface-3)]" />
    </div>
  );
}

