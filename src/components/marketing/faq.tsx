import { Container } from "@/components/ui/container";
import { SITE_DOMAIN, SUPPORT_URL } from "@/lib/brand";
import { SectionIntro } from "./products";

const ITEMS = [
  {
    q: "Dasturlash yoki dizayn bilimi kerakmi?",
    a: "Yo'q. Shablon tanlaysiz, matnni yozasiz va rasm yuklaysiz — qolganini platforma qiladi. Kod yozish yoki dizayn dasturlari bilan ishlash talab qilinmaydi.",
  },
  {
    q: "Domen va hosting sotib olishim kerakmi?",
    a: `Kerak emas. Sayt ${SITE_DOMAIN}/nomingiz manzilida ochiladi — nomni o'zingiz tanlaysiz, agar band bo'lmasa.`,
  },
  {
    q: "Qanday ro'yxatdan o'taman?",
    a: "Telefon raqamingizni kiritasiz, Telegram botimiz 6 xonali kod yuboradi, shu kodni yozasiz. Parol o'ylab topish shart emas.",
  },
  {
    q: "Bepul sinash mumkinmi?",
    a: "Ha. Yangi sayt 10 kun bepul ochiq turadi va bunda karta ma'lumotlari so'ralmaydi. Yoqsa obunani davom ettirasiz.",
  },
  {
    q: "To'lovni qanday amalga oshiraman?",
    a: "Kabinetdagi hisobni CLICK orqali to'ldirasiz va obunani shundan uzaytirasiz. Karta ma'lumotlari Paylinkerda saqlanmaydi — to'lov CLICK tomonida bo'ladi.",
  },
  {
    q: "Saytni keyin o'zgartira olamanmi?",
    a: "Ha, istalgan vaqtda. Matn, rasm, rang temasi va hatto shablonni ham almashtirishingiz mumkin — o'zgarish darhol jonli saytda ko'rinadi.",
  },
  {
    q: "Obuna tugasa nima bo'ladi?",
    a: "Sayt vaqtincha to'xtatiladi va manzilga kirgan odam eslatma sahifasini ko'radi. Ma'lumotlaringiz saqlanib qoladi — obunani yangilaganingizda sayt o'sha holatida qayta ishga tushadi.",
  },
  {
    q: "Vizitka bilan Landing orasidagi farq nima?",
    a: "Vizitka — bir ekranli kontakt sahifasi: telefon, manzil, ijtimoiy tarmoqlar. Landing — ko'p bo'limli sayt: xizmatlar va narxlar, galereya, savol-javob va aloqa formasi ham bo'ladi.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-[color:var(--border)] bg-white py-20 sm:py-24"
    >
      <Container>
        <SectionIntro
          eyebrow="Savol-javob"
          title="Ko'p so'raladigan savollar"
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-[color:var(--border)] overflow-hidden rounded-[var(--radius-panel)] border border-[color:var(--border)] bg-white shadow-[var(--shadow-sm)]">
          {ITEMS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-50/60 [&::-webkit-details-marker]:hidden">
                <span className="text-[15px] font-medium text-[color:var(--foreground)]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-transform group-open:rotate-45"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 3v8M3 7h8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[color:var(--muted-foreground)]">
          Javob topmadingizmi?{" "}
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
          >
            Telegramda yozing
          </a>
        </p>
      </Container>
    </section>
  );
}
