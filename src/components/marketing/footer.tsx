import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BRAND_NAME, SITE_DOMAIN, SUPPORT_URL, TELEGRAM_BOT } from "@/lib/brand";
import { Logo } from "./logo";
import { getDict } from "@/lib/i18n/server";
import { LEGAL_LINKS, NAV_SECTIONS } from "./nav";

export async function Footer() {
  const { t } = await getDict();
  const F = t.footer;
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface-2)]">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              {F.about}
            </p>
          </div>

          <FooterCol title={F.colPage}>
            {NAV_SECTIONS.map((s) => (
              <FooterLink key={s.id} href={`/#${s.id}`}>
                {t.nav[s.key]}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={F.colProduct}>
            <FooterLink href="/signup?plan=vizitka">{F.vizitka}</FooterLink>
            <FooterLink href="/signup?plan=landing">{F.landing}</FooterLink>
            <FooterLink href="/demo">{F.demo}</FooterLink>
            <FooterLink href="/login">{F.login}</FooterLink>
          </FooterCol>

          <FooterCol title={F.colDocs}>
            {LEGAL_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {t.legalLinks[l.key]}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={F.colContact}>
            <FooterLink href={SUPPORT_URL} external>
              {F.support}
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
