import type { Dict } from "@/lib/i18n/dict";

/** Landing bo'limlari — header, footer va anchor'lar uchun yagona manba */
export const NAV_SECTIONS: { id: string; key: keyof Dict["nav"] }[] = [
  { id: "imkoniyatlar", key: "features" },
  { id: "qanday", key: "how" },
  { id: "shablonlar", key: "templates" },
  { id: "pricing", key: "pricing" },
  { id: "faq", key: "faq" },
];

/** Huquqiy hujjatlar — header, footer va hujjat sahifalari */
export const LEGAL_LINKS: { href: string; key: keyof Dict["legalLinks"] }[] = [
  { href: "/oferta", key: "oferta" },
  { href: "/tolov", key: "tolov" },
  { href: "/xavfsizlik", key: "xavfsizlik" },
];
