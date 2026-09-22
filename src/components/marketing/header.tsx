import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-white/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="#pricing"
            className="hidden rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[color:var(--muted-foreground)] transition-colors hover:bg-brand-50 hover:text-brand-700 sm:inline-flex"
          >
            Tariflar
          </a>
          <Button href="/login" variant="secondary" size="sm" className="min-w-[5rem]">
            Kirish
          </Button>
          {/* `hidden` Button ning bazaviy `inline-flex` sinfi bilan ziddiyatga
              kiradi (cn — oddiy join, tailwind-merge yo'q), shuning uchun
              ko'rinishni o'rovchi element boshqaradi. */}
          <span className="hidden sm:contents">
            <Button href="/signup" size="sm">
              Boshlash
            </Button>
          </span>
        </div>
      </Container>
    </header>
  );
}
