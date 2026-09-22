/**
 * Brend va domen — bitta manba.
 *
 * Ko'rinadigan havolalar `paylinker.uz/{slug}` ko'rinishida, lekin ilova
 * dastlab faqat `web.paylinker.uz` subdomenida turadi. Deploy paytida
 * `.env` ga quyidagini qo'shish kifoya — butun UI shunga moslashadi:
 *
 *   NEXT_PUBLIC_SITE_DOMAIN=web.paylinker.uz
 *
 * Eslatma: NEXT_PUBLIC_* build vaqtida inline bo'ladi — o'zgartirgach
 * `npm run build` qayta bajarilishi shart.
 */

export const BRAND_NAME = "Paylinker";

/** Ko'rinadigan domen — havolalar va matnlarda shu ishlatiladi */
export const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim().replace(/^https?:\/\//, "").replace(/\/$/, "") ||
  "paylinker.uz";

export const SITE_URL = `https://${SITE_DOMAIN}`;

/** Ommaviy sayt havolasi: `paylinker.uz/{slug}` */
export function siteUrl(slug: string) {
  return `${SITE_URL}/${slug}`;
}

/** Havolaning domensiz ko'rinishi: `paylinker.uz/choyxona` */
export function siteLabel(slug: string) {
  return `${SITE_DOMAIN}/${slug}`;
}

/** QR / yuklab olinadigan fayl nomi: `paylinker-choyxona` */
export function siteFileName(slug: string) {
  return `paylinker-${slug}`;
}

export const TELEGRAM_BOT =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT?.trim() || "paylinkeruz_bot";

export const SUPPORT_URL = "https://t.me/paylinker_support";

/** Logo — public/ ichidagi asosiy fayl (shaffof fon) */
export const LOGO_SRC = "/paylinker-logo.png";
