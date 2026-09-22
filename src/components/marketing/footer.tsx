import { Container } from "@/components/ui/container";
import { BRAND_NAME, SUPPORT_URL } from "@/lib/brand";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-white">
      <Container className="flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <Logo />
          <p className="text-xs text-[color:var(--muted-foreground)]">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[color:var(--muted-foreground)]"
          aria-label="Footer"
        >
          <a href="#pricing" className="transition-colors hover:text-brand-700">
            Tariflar
          </a>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-brand-700"
          >
            Yordam
          </a>
        </nav>
      </Container>
    </footer>
  );
}
