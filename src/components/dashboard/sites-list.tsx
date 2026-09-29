"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useSites } from "@/lib/store/hooks";
import { SiteCard } from "./site-card";
import { LandingSiteCard } from "./landing-site-card";
import { listMyLandings } from "@/lib/landings/client";
import type { LandingRecord } from "@/lib/landings/types";
import type { UnknownSite } from "@/lib/store/types";
import { getAccessToken } from "@/lib/auth-storage";
import { syncVizitkasFromServer } from "@/lib/sync-vizitkas";
import type { Dict } from "@/lib/i18n/dict";
import { useI18n } from "@/lib/i18n/provider";

type Row =
  | { kind: "vizitka"; site: UnknownSite }
  | { kind: "landing"; landing: LandingRecord };

type SitesFilter = "all" | "vizitka" | "landing";

const FILTER_OPTIONS: Array<{ id: SitesFilter; key: keyof Dict["dash"]["list"] }> = [
  { id: "all", key: "all" },
  { id: "vizitka", key: "vizitka" },
  { id: "landing", key: "landing" },
];

export function SitesList() {
  const { t, tr } = useI18n();
  const L = t.dash.list;
  const searchParams = useSearchParams();
  const { sites, ready } = useSites();
  const [landings, setLandings] = useState<LandingRecord[]>([]);
  const [landingsReady, setLandingsReady] = useState(false);
  const [filter, setFilter] = useState<SitesFilter>("all");
  const aliveRef = useRef(true);

  const refreshLandings = useCallback(async () => {
    if (!getAccessToken()) {
      if (aliveRef.current) {
        setLandings([]);
        setLandingsReady(true);
      }
      return;
    }
    try {
      const list = await listMyLandings();
      if (aliveRef.current) setLandings(list);
    } catch {
      if (aliveRef.current) setLandings([]);
    } finally {
      if (aliveRef.current) setLandingsReady(true);
    }
  }, []);

  useEffect(() => {
    aliveRef.current = true;
    const tid = window.setTimeout(() => {
      void refreshLandings();
    }, 0);
    return () => {
      aliveRef.current = false;
      window.clearTimeout(tid);
    };
  }, [refreshLandings]);

  useEffect(() => {
    if (searchParams.get("click") !== "1") return;
    void refreshLandings();
    if (getAccessToken()) {
      void syncVizitkasFromServer();
    }
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("click");
      url.searchParams.delete("landing");
      url.searchParams.delete("vizitka");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  }, [searchParams, refreshLandings]);

  const handleLandingUpdated = useCallback((updated: LandingRecord) => {
    setLandings((prev) =>
      prev.map((l) => (l.id === updated.id ? updated : l)),
    );
  }, []);

  const rows = useMemo<Row[]>(() => {
    const a: Row[] = sites.map((site) => ({ kind: "vizitka", site }));
    const b: Row[] = landings.map((landing) => ({ kind: "landing", landing }));
    return [...a, ...b].sort((x, y) => {
      const tx =
        x.kind === "vizitka" ? x.site.updatedAt : x.landing.updatedAt;
      const ty =
        y.kind === "vizitka" ? y.site.updatedAt : y.landing.updatedAt;
      return new Date(ty).getTime() - new Date(tx).getTime();
    });
  }, [sites, landings]);

  const filteredRows = useMemo(() => {
    if (filter === "all") return rows;
    if (filter === "vizitka") return rows.filter((r) => r.kind === "vizitka");
    return rows.filter((r) => r.kind === "landing");
  }, [rows, filter]);

  const listReady = ready && landingsReady;
  const isEmpty = sites.length === 0 && landings.length === 0;
  const filterEmpty =
    !isEmpty && listReady && filteredRows.length === 0 && filter !== "all";

  if (!listReady) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:px-5 lg:grid-cols-3 lg:px-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-56 rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white"
          />
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-xl rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-8 text-center">
          <div
            aria-hidden
            className="mx-auto flex h-12 w-12 items-center justify-center pl-gradient rounded-xl text-white"
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
            {L.emptyTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {L.emptyBody}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button href="/dashboard/sites/new" size="lg">
              {L.newSite}
            </Button>
            <Button href="/tahrir" variant="secondary" size="lg">
              {L.landingEditor}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 px-4 py-5 sm:px-5 sm:py-6 lg:px-10">
      <div
        className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        role="toolbar"
        aria-label={L.filterAria}
      >
        <p className="text-xs text-neutral-500">
          {tr("Jami:")}{" "}
          <span className="font-semibold text-[color:var(--foreground)]">{rows.length}</span>
          {filter !== "all" ? (
            <>
              {" "}
              {tr("· ko'rsatilmoqda:")}{" "}
              <span className="font-semibold text-[color:var(--foreground)]">
                {filteredRows.length}
              </span>
            </>
          ) : null}
        </p>
        <div className="grid w-full grid-cols-3 gap-1.5 rounded-xl border border-[color:var(--border)] bg-white p-1 sm:flex sm:w-auto sm:flex-wrap">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFilter(opt.id)}
              className={cn(
                "rounded-lg px-2 py-2 text-xs font-medium transition-colors sm:px-3 sm:py-1.5",
                filter === opt.id
                  ? "pl-gradient text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-brand-700",
              )}
            >
              {L[opt.key] as string}
            </button>
          ))}
        </div>
      </div>

      {filterEmpty ? (
        <div className="mb-6 rounded-[var(--radius-card)] border border-[color:var(--border)] bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-600">
          {filter === "vizitka" ? (
            <>
              <p className="font-medium text-[color:var(--foreground)]">{L.noVizitka}</p>
              <p className="mt-1">
                {L.noVizitkaBefore}{" "}
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="font-medium text-[color:var(--foreground)] underline underline-offset-2"
                >
                  {L.all}
                </button>
                {L.pickAllAfter === "." ? "" : " "}
                {L.pickAllAfter}
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-[color:var(--foreground)]">{L.noLanding}</p>
              <p className="mt-1">
                {L.noLandingBefore}{" "}
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="font-medium text-[color:var(--foreground)] underline underline-offset-2"
                >
                  {L.all}
                </button>
                {L.pickAllAfter === "." ? "" : " "}
                {L.pickAllAfter}
              </p>
              <div className="mt-4">
                <Button href="/tahrir" variant="secondary" size="sm">
                  {L.landingEditor}
                </Button>
              </div>
            </>
          )}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRows.map((row) =>
          row.kind === "vizitka" ? (
            <SiteCard key={`v-${row.site.id}`} site={row.site} />
          ) : (
            <LandingSiteCard
              key={`l-${row.landing.id}`}
              landing={row.landing}
              onDeleted={refreshLandings}
              onUpdated={handleLandingUpdated}
            />
          ),
        )}
        <Link
          href="/dashboard/sites/new"
          className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[color:var(--border)] bg-white p-4 text-center transition-colors hover:border-brand-300 sm:min-h-[220px] sm:p-5"
        >
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-500 text-[color:var(--foreground)]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M5 9h8M9 5v8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-[color:var(--foreground)]">{L.newSiteCard}</span>
            <span className="text-xs text-neutral-500">{L.newSiteCardHint}</span>
          </Link>
      </div>
    </div>
  );
}
