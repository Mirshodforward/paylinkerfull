import { DEFAULT_LANDING_THEME } from "./themes";
import type { LandingRecord } from "./types";
import { makeTr, type Tr } from "../i18n/tr";

/** Hero ostidagi qisqa tavsif — lokal namuna, wizard va DB default bilan bir xil */
export function defaultLandingHeroDescription(tr: Tr = makeTr("uz")): string {
  return tr("Mijozlarimiz uchun qulay maskan — sifatli xizmat va yoqimli muhit.");
}

/** Server bilan ulanmagan vaqtdagi taxminiy ko'rinish — namuna bilan to'ldirilgan */
export function sampleLanding(tr: Tr = makeTr("uz")): LandingRecord {
  const now = new Date().toISOString();
  return {
    id: "local",
    ownerPublicId: "",

    name: "mening-saytim",
    category: "",
    plan: "10kun",
    expiredAt: null,

    blockHeader: true,
    blockHero: true,
    blockAbout: true,
    blockFaq: true,
    blockContact: true,
    blockFooter: true,
    blocktheme: DEFAULT_LANDING_THEME,

    brandName: tr("Nomdor Choyxonasi"),
    logourl: "",
    navAbout: tr("Biz haqimizda"),
    navFaq: tr("FAQ"),
    navContact: tr("Aloqa"),
    navCta: tr("Joy band qilish"),

    heroTitle: tr("Nomdor Choyxonasida haqiqiy dam olish zavqini his qiling"),
    description: defaultLandingHeroDescription(tr),
    heroCta: tr("Biz bilan bog'lanish"),
    heroImageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",

    aboutTitle: tr("Milliy an'ana va zamonaviy xizmat uyg'unligi"),
    aboutLead:
      tr("Nomdor Choyxonasi mehmonlarga milliy taomlar, sifatli xizmat va yoqimli muhit taqdim etadi."),
    aboutImageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    aboutBullet1: tr("Keng, shinam va toza zallar"),
    aboutBullet2: tr("Tezkor xizmat va xushmuomala jamoa"),
    aboutBullet3: tr("Oilaviy va alohida suhbat xonalari"),
    aboutBullet4: tr("Oldindan stol band qilish imkoniyati"),

    faq1Q: tr("Oldindan stol band qilish mumkinmi?"),
    faq1A: tr("Ha, telefon yoki forma orqali band qilishingiz mumkin."),
    faq2Q: tr("Oilaviy xonalar bormi?"),
    faq2A: tr("Ha, oilaviy va alohida xonalar mavjud."),
    faq3Q: tr("Tadbir o'tkazsa bo'ladimi?"),
    faq3A: tr("Ha, kichik marosim va tadbirlar uchun xizmat ko'rsatamiz."),
    faq4Q: tr("Yetkazib berish bormi?"),
    faq4A: tr("Ayrim hududlarga yetkazib berish mavjud."),

    contactSubtitle:
      tr("Savolingiz bormi yoki stol band qilmoqchimisiz? Ma'lumotlaringizni qoldiring."),
    address: tr("Toshkent shahri, Markaziy ko'cha 12-uy"),
    phoneTel: "+998901234567",
    telegram: "@nomdor_choyxonasi",
    hours: tr("Har kuni 09:00 — 23:00"),

    footerCopyrightSuffix:
      tr("Nomdor Choyxonasi. Barcha huquqlar himoyalangan."),

    createdAt: now,
    updatedAt: now,
  };
}
