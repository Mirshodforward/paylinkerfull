import { Container } from "@/components/ui/container";
import { SITE_DOMAIN } from "@/lib/brand";
import { getDict } from "@/lib/i18n/server";
import { SectionIntro } from "./products";

export async function Features() {
  const { t } = await getDict();
  const I = t.features.items;
  const FEATURES = [
    { icon: <LinkIcon />, title: I.address.title, body: I.address.body(SITE_DOMAIN) },
    { icon: <TelegramIcon />, ...I.telegram },
    { icon: <PaletteIcon />, ...I.themes },
    { icon: <PhoneIcon />, ...I.mobile },
    { icon: <QrIcon />, ...I.qr },
    { icon: <InboxIcon />, ...I.inbox },
    { icon: <MapIcon />, ...I.map },
    { icon: <CardIcon />, ...I.click },
  ];
  return (
    <section
      id="imkoniyatlar"
      className="scroll-mt-20 border-t border-[color:var(--border)] bg-[color:var(--surface-2)] py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          description={t.features.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="pl-lift rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                {f.icon}
              </span>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-[color:var(--foreground)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

const S = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function LinkIcon() {
  return (
    <svg {...S}>
      <path d="M10 13a5 5 0 007.07 0l2.12-2.12a5 5 0 10-7.07-7.07L11 5" />
      <path d="M14 11a5 5 0 00-7.07 0L4.81 13.1a5 5 0 107.07 7.07L13 19" />
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg {...S}>
      <path d="M21 4.5L2.8 11.3a.5.5 0 00.05.94l4.6 1.4 1.7 5a.5.5 0 00.88.14l2.4-2.9 4.7 3.45a.5.5 0 00.79-.3L21 4.5z" />
      <path d="M7.45 13.64L21 4.5l-9.57 10.3" />
    </svg>
  );
}
function PaletteIcon() {
  return (
    <svg {...S}>
      <path d="M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1.1.9-2 2-2h1.5A4.5 4.5 0 0021 10c0-3.9-4-7-9-7z" />
      <circle cx="7.5" cy="12" r="1.2" />
      <circle cx="10" cy="7.5" r="1.2" />
      <circle cx="15" cy="7.5" r="1.2" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg {...S}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}
function QrIcon() {
  return (
    <svg {...S}>
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.5" />
      <path d="M14 14h3v3h-3zM20.5 14v3M17.5 20.5h3" />
    </svg>
  );
}
function InboxIcon() {
  return (
    <svg {...S}>
      <path d="M3.5 13.5h4l1.5 3h6l1.5-3h4" />
      <path d="M4.8 5.5h14.4l1.3 8v3.5a2 2 0 01-2 2H5.5a2 2 0 01-2-2V13.5l1.3-8z" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg {...S}>
      <path d="M12 21s6.5-5.4 6.5-10.5a6.5 6.5 0 10-13 0C5.5 15.6 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </svg>
  );
}
function CardIcon() {
  return (
    <svg {...S}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19M6 15h3" />
    </svg>
  );
}
