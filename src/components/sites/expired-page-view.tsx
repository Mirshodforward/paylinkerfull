"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/marketing/logo";
import { cn } from "@/lib/cn";
import { SITE_DOMAIN } from "@/lib/brand";

export type ExpiredSiteKind = "vizitka" | "landing" | "generic";

function GenericBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-brand-200/50 blur-3xl" />
      <div className="absolute -right-1/4 bottom-0 h-[65%] w-[65%] rounded-full bg-brand-200/50 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.9)_0%,_transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function ExpiredBackdrop({
  preview,
  siteKind,
}: {
  preview?: ReactNode;
  siteKind: ExpiredSiteKind;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {preview ? (
        <div
          className={cn(
            "absolute inset-0 flex justify-center",
            siteKind === "vizitka" && "items-center",
            siteKind === "landing" && "items-start",
          )}
        >
          <div
            className={cn(
              "origin-top blur-[26px] sm:blur-[34px]",
              siteKind === "vizitka" &&
                "h-[115%] w-full max-w-[520px] scale-[1.05] saturate-[1.08]",
              siteKind === "landing" &&
                "h-[130%] w-[min(200%,1200px)] max-w-none scale-[0.92] saturate-[1.05]",
            )}
          >
            {preview}
          </div>
        </div>
      ) : (
        <GenericBackdrop />
      )}
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/80 to-white/95" />
    </div>
  );
}

export function ExpiredPageView({
  businessName,
  slug,
  siteKind = "generic",
  preview,
  showSlugHint = true,
}: {
  businessName: string;
  slug?: string;
  siteKind?: ExpiredSiteKind;
  preview?: ReactNode;
  showSlugHint?: boolean;
}) {
  const hasSlug = Boolean(slug?.trim());
  const displaySlug = slug?.trim() ?? "";

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <ExpiredBackdrop preview={preview} siteKind={siteKind} />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-lg flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="pl-rise w-full overflow-hidden rounded-[var(--radius-panel)] border border-white/80 bg-white/88 shadow-[var(--shadow-lg)] backdrop-blur-xl">
          <div className="border-b border-brand-500/5 bg-gradient-to-br from-amber-50/90 via-white to-white px-6 pb-6 pt-8 text-center sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] bg-white shadow-md ring-1 ring-amber-200/60">
              <svg
                className="h-8 w-8 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-800/80">
              Vaqtincha to&apos;xtatilgan
            </p>
            <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-[1.75rem]">
              {businessName}
            </h1>
          </div>

          <div className="px-6 py-5 text-center sm:px-8">
            <p className="text-sm leading-relaxed text-neutral-600">
              {hasSlug && showSlugHint ? (
                <>
                  <span className="font-mono text-neutral-800">
                    {SITE_DOMAIN}/{displaySlug}
                  </span>{" "}
                  manzilidagi bu nomdagi sayt vaqtincha to&apos;xtatilgan.
                </>
              ) : (
                <>Bu nomdagi sayt vaqtincha to&apos;xtatilgan.</>
              )}
            </p>
            {hasSlug ? (
              <Link
                href="/login"
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-[var(--radius-control)] border border-brand-200 bg-white px-5 text-sm font-medium text-brand-700 transition hover:border-brand-400 hover:bg-brand-50 sm:w-auto sm:px-6"
              >
                Egamisaniz? Kirish
              </Link>
            ) : null}
          </div>
        </div>

        <Logo className="mt-8 shrink-0 opacity-35 transition-opacity hover:opacity-60" />
      </div>
    </div>
  );
}
