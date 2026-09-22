"use client";

import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME, LOGO_SRC } from "@/lib/brand";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV = [
  {
    href: "/gradeadmin",
    label: "Umumiy",
    icon: IconOverview,
    exact: true as boolean,
  },
  { href: "/gradeadmin/vizitkas", label: "Vizitkalar", icon: IconSites, exact: false },
  { href: "/gradeadmin/landings", label: "Landinglar", icon: IconLanding, exact: false },
  { href: "/gradeadmin/users", label: "Foydalanuvchilar", icon: IconUsers, exact: false },
  { href: "/gradeadmin/payments", label: "To‘lovlar", icon: IconPayments, exact: false },
  { href: "/gradeadmin/settings", label: "Sozlamalar", icon: IconSettings, exact: false },
] as const;

function IconOverview({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3 9h12M9 3v12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect
        x="2"
        y="2"
        width="14"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function IconSites({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 7h13" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5" cy="5.3" r="0.6" fill="currentColor" />
      <circle cx="7" cy="5.3" r="0.6" fill="currentColor" />
    </svg>
  );
}

function IconLanding({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 6.5h8M5 9h5M5 11.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3.5 14.5c.8-2 3.2-3 5.5-3s4.7 1 5.5 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPayments({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 8h14" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12.5 11.3h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSettings({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 1.5v2.2M9 14.3v2.2M16.5 9h-2.2M3.7 9H1.5M14.1 3.9l-1.55 1.55M5.45 12.55L3.9 14.1M14.1 14.1l-1.55-1.55M5.45 5.45L3.9 3.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "";

  function navLink(item: (typeof NAV)[number]) {
    const active = item.exact ? path === item.href : path.startsWith(item.href);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          active
            ? "bg-white/[0.10] text-white shadow-[inset_3px_0_0_0_var(--brand-400)]"
            : "text-white/55 hover:bg-white/[0.07] hover:text-white/90",
        )}
      >
        <Icon
          className={cn(
            "h-[18px] w-[18px] shrink-0 transition-colors",
            active ? "text-brand-300" : "text-white/40 group-hover:text-white/70",
          )}
        />
        {item.label}
      </Link>
    );
  }

  return (
    <div className="flex min-h-screen bg-[color:var(--surface-3)]">
      <aside className="relative hidden w-[260px] shrink-0 flex-col border-r border-white/10 bg-[color:var(--dark-surface)] lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_130%_85%_at_0%_-20%,rgba(91,69,240,0.35),transparent_70%)]"
        />
        <div className="relative flex flex-1 flex-col px-4 pb-8 pt-10">
          <div className="px-3">
            <div className="flex items-center gap-2">
              <Image
                src={LOGO_SRC}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-xl bg-white/10 object-contain p-1"
              />
              <div>
                <p className="text-[13px] font-semibold tracking-tight text-white">{BRAND_NAME}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-300/80">
                  Admin
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-10 flex flex-col gap-1" aria-label="Admin navigatsiya">
            {NAV.map((item) => navLink(item))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/[0.07] hover:text-white/90"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="opacity-70">
                <path
                  d="M10 12L6 8l4-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Dashboard ga qaytish
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-white/90 backdrop-blur-md lg:hidden">
          <div className="flex h-14 items-center gap-3 px-4">
            <Image
              src={LOGO_SRC}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-lg object-contain"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[color:var(--foreground)]">Admin</p>
              <p className="truncate text-[11px] text-[color:var(--muted-foreground)]">{BRAND_NAME} boshqaruvi</p>
            </div>
          </div>
          <nav
            className="flex gap-1.5 overflow-x-auto px-3 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Admin mobil menyu"
          >
            {NAV.map((item) => {
              const active = item.exact ? path === item.href : path.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors",
                    active
                      ? "pl-gradient text-white shadow-[var(--shadow-brand)]"
                      : "bg-white text-[color:var(--muted-foreground)] hover:bg-brand-50 hover:text-brand-700",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/dashboard"
              className="ml-auto shrink-0 rounded-full border border-brand-200 bg-white px-3.5 py-2 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Dashboard
            </Link>
          </nav>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
