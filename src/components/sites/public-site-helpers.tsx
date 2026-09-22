import Link from "next/link";
import { Logo } from "@/components/marketing/logo";
import { BRAND_NAME, SITE_DOMAIN } from "@/lib/brand";

export function NotFoundPublic({ slug }: { slug?: string }) {
  const displaySlug = slug?.trim() || "name";

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div
        aria-hidden
        className="pl-grid pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-300/35 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="pl-rise rounded-[var(--radius-panel)] border border-[color:var(--border)] bg-white/90 p-8 text-center shadow-[var(--shadow-lg)] backdrop-blur-xl sm:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
            404 · {SITE_DOMAIN}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
            Bunday sayt topilmadi
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            <span className="font-mono text-neutral-800">
              {SITE_DOMAIN}/{displaySlug}
            </span>{" "}
            manzilida hozircha hech qanday sayt yo&apos;q. Bu nom ostida sizning
            saytingiz bo&apos;lishi mumkin.
          </p>
          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="pl-gradient inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition hover:brightness-[1.06] sm:w-auto"
            >
              {BRAND_NAME} haqida
            </Link>
            <Link
              href="/dashboard/sites/new"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-brand-200 bg-white px-5 text-sm font-medium text-brand-700 transition hover:border-brand-400 hover:bg-brand-50 sm:w-auto"
            >
              O&apos;z saytingizni yarating
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Logo className="opacity-40 transition-opacity hover:opacity-65" />
        </div>
      </div>
    </div>
  );
}
