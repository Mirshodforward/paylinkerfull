"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";
import { NAV_SECTIONS } from "./nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menyu ochiqda sahifa orqa fonda siljimasin
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl transition-colors",
        scrolled ? "border-[color:var(--border)]" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Asosiy navigatsiya"
        >
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[color:var(--muted-foreground)] transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/login" size="sm" className="min-w-[5.5rem]">
            Kirish
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobil-menyu"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] text-[color:var(--foreground)] transition-colors hover:bg-brand-50 hover:text-brand-700 md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobil-menyu"
          className="border-t border-[color:var(--border)] bg-white md:hidden"
        >
          <Container className="flex flex-col py-2">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="rounded-[var(--radius-control)] px-3 py-3 text-[15px] font-medium text-[color:var(--foreground)] transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {s.label}
              </a>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 6h14M3 10h14M3 14h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
