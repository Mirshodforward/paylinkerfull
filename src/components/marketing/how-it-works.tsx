import { Container } from "@/components/ui/container";
import { SITE_DOMAIN } from "@/lib/brand";
import { SectionIntro } from "./products";

const STEPS = [
  {
    n: "01",
    title: "Telegram orqali kiring",
    body: "Telefon raqamingizni kiriting, botdan kelgan 6 xonali kodni yozing. Parol kerak emas.",
  },
  {
    n: "02",
    title: "Shablon tanlang",
    body: "Vizitka uchun 7 ta, landing uchun 3 ta shablon. Rang temasi va fon naqshini bir bosishda almashtirasiz.",
  },
  {
    n: "03",
    title: "Matn va rasm yozing",
    body: "Tahrirlagichda o'zgartirishni darhol telefon ekrani ko'rinishida ko'rasiz. Saqlash tugmasi bir joyda.",
  },
  {
    n: "04",
    title: "Chop eting",
    body: `Sayt ${SITE_DOMAIN}/nomingiz manzilida ochiladi. Havolani ulashing yoki QR kodni chop eting.`,
  },
];

export function HowItWorks() {
  return (
    <section
      id="qanday"
      className="scroll-mt-20 border-t border-[color:var(--border)] bg-white py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          eyebrow="Qanday ishlaydi"
          title="To'rt qadam — taxminan 15 daqiqa"
          description="Ro'yxatdan o'tishdan chop etishgacha. Hech qanday texnik sozlama yo'q."
        />

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="relative rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-sm)]"
            >
              {/* Qadamlar orasidagi ulagich — faqat keng ekranda */}
              {i < STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute right-[-10px] top-1/2 hidden h-px w-[20px] bg-brand-200 lg:block"
                />
              ) : null}
              <span className="pl-gradient-text text-2xl font-semibold tracking-tight tabular-nums">
                {s.n}
              </span>
              <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-[color:var(--foreground)]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
