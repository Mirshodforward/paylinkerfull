"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { LEGAL_LINKS } from "@/components/legal/legal-page";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";
import { NAV_SECTIONS } from "./nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const docsRef = useRef<HTMLDivElement>(null);

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

  // Hujjatlar ro'yxati: tashqariga bosilsa yoki Escape bosilsa yopiladi
  useEffect(() => {
    if (!docsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) {
        setDocsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDocsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [docsOpen]);

  const navLink =
    "rounded-[var(--radius-control)] px-2.5 py-2 text-sm font-medium text-[color:var(--muted-foreground)] transition-colors hover:bg-brand-50 hover:text-brand-700";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl transition-colors",
        scrolled ? "border-[color:var(--border)]" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Asosiy navigatsiya">
          {NAV_SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={navLink}>
              {s.label}
            </a>
          ))}

          {/* Huquqiy hujjatlar — ro'yxat shaklida, navbarni cho'zib yubormasligi uchun */}
          <div className="relative" ref={docsRef}>
            <button
              type="button"
              onClick={() => setDocsOpen((v) => !v)}
              aria-expanded={docsOpen}
              aria-haspopup="menu"
              className={cn(navLink, "inline-flex items-center gap-1", docsOpen && "bg-brand-50 text-brand-700")}
            >
              Hujjatlar
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className={cn("transition-transform", docsOpen && "rotate-180")}
              >
                <path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {docsOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-1.5 shadow-[var(--shadow-lg)]"
              >
                {LEGAL_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    role="menuitem"
                    onClick={() => setDocsOpen(false)}
                    className="block rounded-[0.625rem] px-3 py-2.5 text-sm font-medium text-[color:var(--muted-foreground)] transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {l.uz}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] text-[color:var(--foreground)] transition-colors hover:bg-brand-50 hover:text-brand-700 lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobil-menyu" className="border-t border-[color:var(--border)] bg-white lg:hidden">
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

            <p className="mt-2 border-t border-[color:var(--border)] px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
              Hujjatlar
            </p>
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-[var(--radius-control)] px-3 py-3 text-[15px] font-medium text-[color:var(--foreground)] transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {l.uz}
              </Link>
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
      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
