/** Sayt tillari. Tanlov cookie da saqlanadi — server komponentlar ham o'qiy olsin. */
export const LANGS = ["uz", "ru"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "uz";
export const LANG_COOKIE = "pl_lang";
/** 1 yil */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLang(v: unknown): v is Lang {
  return typeof v === "string" && (LANGS as readonly string[]).includes(v);
}

/** `Intl` / `toLocaleString` uchun */
export const LOCALE: Record<Lang, string> = { uz: "uz-UZ", ru: "ru-RU" };
