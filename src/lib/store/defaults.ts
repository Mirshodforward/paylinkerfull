import {
  FaqItem,
  FeatureItem,
  LandingContent,
  ProcessStepItem,
  ServiceItem,
  StatItem,
  Testimonial,
  VizitkaContent,
  GalleryItem,
} from "./types";
import { makeTr, type Tr } from "../i18n/tr";

export function defaultVizitkaContent(name?: string, tr: Tr = makeTr("uz")): VizitkaContent {
  const businessName = name ?? tr("Biznesingiz nomi");
  return {
    businessName,
    category: tr("Xizmat / Biznes turi"),
    tagline: tr("Qisqa va lo'nda taqdimot"),
    description:
      tr("Mijozlarga o'zingiz haqingizda bir-ikki jumlada gapiring. Nima qilasiz va nima uchun sizni tanlashlari kerak."),
    phone: "+998 90 123 45 67",
    address: tr("Toshkent sh., Chilonzor tumani"),
    mapsUrl: "",
    hoursLine: tr("Du – Sh: 09:00 – 20:00"),
    social: [],
    accentInitials: deriveInitials(businessName),
    heroImage: undefined,
    logoImage: undefined,
    colorTheme: "mono",
    pattern: "none",
  };
}

export function defaultLandingContent(name?: string, tr: Tr = makeTr("uz")): LandingContent {
  const businessName = name ?? tr("Biznesingiz nomi");
  return {
    ...defaultVizitkaContent(businessName, tr),
    layoutVariant: "simple",
    sectionBlocks: [
      {
        id: "sb-1",
        title: tr("Biz haqimizda"),
        body:
          tr("Bu yerda kompaniyangiz yoki xizmatlaringiz haqida batafsil yozing — tarix, vaqf-muvaffaqiyat, ish tamoyilingiz."),
      },
      {
        id: "sb-2",
        title: tr("Nima uchun aynan biz?"),
        body:
          tr("Mijozlar uchun afzalliklaringizni aniq va sodda tilda yozing: tezkorlik, kafolat, individual yondashuv va hokazo."),
      },
    ],
    contactSectionTitle: tr("Ariza qoldiring"),
    contactSectionSubtitle:
      tr("Ism, telefon va Telegram — javob berish uchun yetarli. Xabar qoldiring, biz tezda bog‘lanamiz."),
    heroEyebrow: tr("O'ZBEKISTON · TOSHKENT"),
    heroTitle: tr("{businessName} — xizmatlaringiz sarhisobi", { businessName }),
    heroSubtitle:
      tr("Mijozlarga o'zingizni, xizmatlaringizni va narxlaringizni bir sahifada toza va tushunarli taqdim eting."),
    about:
      tr("Biznesingizning tarixi, jamoangiz va uslubingiz haqida qisqacha yozing. Mijoz sizni tushunishi uchun bu bo'lim muhim."),
    hours: tr("Du – Sh: 09:00 – 20:00\nYak: dam olish kuni"),
    services: defaultServices(tr),
    gallery: defaultGallery(tr),
    features: defaultFeatures(tr),
    stats: defaultStats(tr),
    testimonials: defaultTestimonials(tr),
    ctaTitle: tr("Bugun bog'laning — tezda javob beramiz"),
    ctaSubtitle:
      tr("Telefon qilish yoki xabar yozish — har ikkisi ham ochiq. Savollaringizga 24 soat ichida javob beramiz."),
    heroCtaPrimaryLabel: tr("Buyurtma berish"),
    heroCtaSecondaryLabel: tr("Xizmatlar"),
    servicesSectionTitle: tr("Xizmatlar va tariflar"),
    servicesSectionSubtitle:
      tr("Har bir paket — aniq narx va qisqa tavsif. Batafsil uchun biz bilan bog‘laning."),
    processSectionTitle: tr("Qanday ishlaymiz"),
    processSteps: defaultProcessSteps(tr),
    faqSectionTitle: tr("Ko‘p beriladigan savollar"),
    faqItems: defaultFaqItems(tr),
  };
}

function defaultProcessSteps(tr: Tr): ProcessStepItem[] {
  return [
    {
      id: "ps-1",
      step: "01",
      title: tr("Ariza"),
      body: tr("Saytdan yoki telefon orqali qisqa ariza qoldirasiz — biz loyiha bo‘yicha aniqlik kiritamiz."),
    },
    {
      id: "ps-2",
      step: "02",
      title: tr("Kelishuv"),
      body: tr("Hajm, muddat va narx bo‘yicha kelishib olamiz, shartnama yoki og‘zaki kelishuv."),
    },
    {
      id: "ps-3",
      step: "03",
      title: tr("Ishlash"),
      body: tr("Reja bo‘yicha bajaramiz, jarayonda qisqa yangilanishlar berib turamiz."),
    },
    {
      id: "ps-4",
      step: "04",
      title: tr("Topshirish"),
      body: tr("Natijani topshiramiz, kerak bo‘lsa tuzatishlar va qo‘llab-quvvatlash."),
    },
  ];
}

function defaultFaqItems(tr: Tr): FaqItem[] {
  return [
    {
      id: "fq-1",
      question: tr("Buyurtma qanday beriladi?"),
      answer:
        tr("Pastdagi forma orqali ism, telefon va izoh qoldiring yoki to‘g‘ridan-to‘g‘ri telefon qiling — tezda javob beramiz."),
    },
    {
      id: "fq-2",
      question: tr("To‘lov qanday amalga oshiriladi?"),
      answer:
        tr("Kelishilgan usulda: naqd, karta yoki hisob-kitob — har loyiha uchun alohida kelishamiz."),
    },
    {
      id: "fq-3",
      question: tr("Muddat qancha?"),
      answer:
        tr("Hajm va murakkablikka qarab o‘zgaradi. Aniq muddatni ariza yoki qisqa suhbatdan keyin beramiz."),
    },
    {
      id: "fq-4",
      question: tr("Kafolat bormi?"),
      answer:
        tr("Xizmat turiga qarab kafolat shartlari farq qiladi — batafsil shartlarni buyurtma oldidan muhokama qilamiz."),
    },
    {
      id: "fq-5",
      question: tr("Viloyatdan ham ish qilasizmi?"),
      answer:
        tr("Ha, masofadan ham jamoamiz bilan ishlaymiz — kerak bo‘lsa sayyohlik yoki onlayn formatda."),
    },
  ];
}

function defaultServices(tr: Tr): ServiceItem[] {
  return [
    {
      id: "svc-1",
      name: "Asosiy xizmat",
      price: tr("100 000 so'm"),
      description: tr("Mijozlar eng ko'p buyurtma qiladigan xizmat."),
      bullets: [tr("Tezkor boshlash"), tr("Standart hajm"), tr("Email orqali natija")],
    },
    {
      id: "svc-2",
      name: "Kengaytirilgan xizmat",
      price: tr("250 000 so'm"),
      description: tr("Premium variant — qo'shimcha imkoniyatlar bilan."),
      bullets: [tr("Qo‘shimcha reviziya"), tr("ustuvor navbat"), tr("qisqa konsultatsiya")],
    },
    {
      id: "svc-3",
      name: "Individual taklif",
      price: tr("Kelishuv asosida"),
      description: tr("Katta buyurtmalar uchun shaxsiy narx."),
      bullets: [tr("Shaxsiy menejer"), tr("moslashuvchan muddat"), tr("shartnoma bo‘yicha")],
    },
  ];
}

function defaultGallery(tr: Tr): GalleryItem[] {
  return [
    { id: "g-1", caption: tr("Namuna #1") },
    { id: "g-2", caption: tr("Namuna #2") },
    { id: "g-3", caption: tr("Namuna #3") },
    { id: "g-4", caption: tr("Namuna #4") },
  ];
}

function defaultFeatures(tr: Tr): FeatureItem[] {
  return [
    { id: "f-1", icon: "star", title: tr("Sifat kafolati"), description: tr("Har bir xizmat shaxsiy nazorat ostida bajariladi.") },
    { id: "f-2", icon: "clock", title: tr("Aniq vaqtda"), description: tr("Kelishilgan muddatda, kechikmasdan topshiramiz.") },
    { id: "f-3", icon: "shield", title: tr("Halol narx"), description: tr("Yashirin to'lovlar yo'q — barcha narxlar oldindan aytiladi.") },
    { id: "f-4", icon: "users", title: tr("Qo'llab-quvvatlash"), description: tr("Telefon yoki Telegram orqali — har doim aloqada.") },
  ];
}

function defaultStats(tr: Tr): StatItem[] {
  return [
    { id: "st-1", value: "500+", label: tr("Mamnun mijoz") },
    { id: "st-2", value: tr("5 yil"), label: tr("Bozorda tajriba") },
    { id: "st-3", value: tr("24 soat"), label: tr("Javob beramiz") },
    { id: "st-4", value: tr("100%"), label: tr("Sifat kafolati") },
  ];
}

function defaultTestimonials(tr: Tr): Testimonial[] {
  return [
    { id: "t-1", author: tr("Aziza K."), role: tr("Doimiy mijoz"), rating: 5, text: tr("Juda yoqdi. Har safar professionallik darajasida xizmat ko'rsatishadi. Tavsiya qilaman!") },
    { id: "t-2", author: tr("Sardor M."), role: tr("Biznes hamkor"), rating: 5, text: tr("Ishonchli va aniq. Kelishilgan vaqtda topshirib berishadi, natija har safar yuqori.") },
    { id: "t-3", author: tr("Malika R."), role: tr("Yangi mijoz"), rating: 5, text: tr("Do'stim tavsiya qilgan edi, ajoyib tajriba bo'ldi. Narx-sifat munosabati juda yaxshi.") },
  ];
}

export function deriveInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "WB";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
