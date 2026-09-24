/**
 * Ijrochi (oferta beruvchi) rekvizitlari.
 *
 * ⚠️ TO'LDIRILISHI SHART: quyidagi TODO qiymatlar hujjatda shundayligicha
 * ko'rinadi. Ro'yxatdan o'tish guvohnomasi va bank ma'lumotlari bilan
 * almashtiring — ularsiz oferta to'liq huquqiy kuchga ega bo'lmaydi.
 */
export const TODO = "__TO'LDIRILISHI KERAK__";

export const COMPANY = {
  /** Tashkiliy-huquqiy shakl */
  formUz: "Yakka tartibdagi tadbirkor",
  formRu: "Индивидуальный предприниматель",
  /** Masalan: "Yakka tartibdagi tadbirkor SHAVKATOV M." */
  nameUz: TODO,
  nameRu: TODO,
  /** STIR (INN) */
  tin: TODO,
  /** Ro'yxatdan o'tgan manzil */
  addressUz: TODO,
  addressRu: TODO,
  /** Bank hisob raqami */
  bankAccount: TODO,
  bankNameUz: TODO,
  bankNameRu: TODO,
  /** Bank MFO kodi */
  bankMfo: TODO,
  /** Aloqa */
  email: TODO,
  phone: TODO,
} as const;

/** Oferta tahriri — aksept dalili sifatida bazaga yoziladi */
export const OFERTA_VERSION = "1.0";
export const OFERTA_DATE_UZ = "2026-yil 24-sentyabr";
export const OFERTA_DATE_RU = "24 сентября 2026 года";

/** Hujjatlarda ko'rsatiladigan ish vaqti */
export const SUPPORT_HOURS_UZ = "Dushanba–Juma, 09:00–18:00 (Toshkent vaqti)";
export const SUPPORT_HOURS_RU = "Понедельник–Пятница, 09:00–18:00 (по Ташкенту)";
