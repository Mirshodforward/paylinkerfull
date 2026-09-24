import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BRAND_NAME, SITE_DOMAIN, SUPPORT_URL, TELEGRAM_BOT } from "@/lib/brand";
import { Logo } from "./logo";
import { NAV_SECTIONS } from "./nav";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface-2)]">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              O&apos;zbekistondagi kichik va o&apos;rta biznes uchun vizitka va
              landing sayt yaratish platformasi.
            </p>
          </div>

          <FooterCol title="Sahifa">
            {NAV_SECTIONS.map((s) => (
              <FooterLink key={s.id} href={`#${s.id}`}>
                {s.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Mahsulot">
            <FooterLink href="/signup?plan=vizitka">Vizitka</FooterLink>
            <FooterLink href="/signup?plan=landing">Landing</FooterLink>
            <FooterLink href="/demo">Namuna</FooterLink>
            <FooterLink href="/login">Kirish</FooterLink>
          </FooterCol>

          <FooterCol title="Hujjatlar">
            <FooterLink href="/oferta">Ommaviy oferta</FooterLink>
            <FooterLink href="/tolov">To&apos;lov va qaytarish</FooterLink>
            <FooterLink href="/xavfsizlik">Xavfsizlik</FooterLink>
          </FooterCol>

          <FooterCol title="Aloqa">
            <FooterLink href={SUPPORT_URL} external>
              Telegram yordam
            </FooterLink>
            <FooterLink href={`https://t.me/${TELEGRAM_BOT}`} external>
              @{TELEGRAM_BOT}
            </FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[color:var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[color:var(--muted-foreground)]">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
          <p className="font-mono text-xs text-[color:var(--muted-foreground)]">
            {SITE_DOMAIN}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--foreground)]">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-brand-700";
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </li>
  );
}
