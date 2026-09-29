import type { Lang } from "./config";
import { RU_MESSAGES } from "./messages/ru";

export type Vars = Record<string, string | number>;

/**
 * Matn tarjimasi — gettext uslubida: kalit = o'zbekcha matnning o'zi.
 *
 *   tr("Yangi sayt")                  -> "Новый сайт"
 *   tr("{n} kun qoldi", { n: 3 })     -> "осталось 3 дн."
 *
 * Nega alohida (src/lib/i18n/dict dan tashqari)? Tuzilgan lug'at (`t.dash.card.edit`)
 * umumiy va ommaviy UI uchun; `tr()` esa katta ekranlar (sayt yaratish formasi,
 * tahrirlagich, admin panel) uchun — u yerda yuzlab satr bor va har biriga kalit
 * o'ylab topish o'rniga o'zbekcha matnning o'zi kalit bo'ladi.
 *
 * Tarjima topilmasa o'zbekcha matn qaytadi (sayt buzilmaydi). Yetishmayotgan
 * kalitlarni `npm run i18n:check` topadi — build oldidan ishlaydi.
 */
export type Tr = (key: string, vars?: Vars) => string;

const warned = new Set<string>();

export function makeTr(lang: Lang): Tr {
  const map: Record<string, string> | null = lang === "ru" ? RU_MESSAGES : null;
  return (key, vars) => {
    let s = key;
    if (map) {
      const hit = map[key];
      if (hit !== undefined) {
        s = hit;
      } else if (process.env.NODE_ENV !== "production" && !warned.has(key)) {
        warned.add(key);
        console.warn(`[i18n] ruscha tarjima yo'q: ${JSON.stringify(key)}`);
      }
    }
    if (vars) {
      s = s.replace(/\{(\w+)\}/g, (m, k: string) =>
        vars[k] === undefined ? m : String(vars[k]),
      );
    }
    return s;
  };
}
