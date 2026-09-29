import { makeTr, type Tr } from "./tr";
import type { Lang } from "./config";

/**
 * Mijoz sayti kontentining tilini matndan aniqlash.
 *
 * Chop etilgan saytlar ko'ruvchi cookie'siga bog'lanmasligi kerak (egasi
 * o'zbekcha yozgan sayt ruscha yorliq bilan chiqmasin). Shuning uchun
 * shablon yorliqlari ("Manzil", "Telefon", "Ko'p so'raladigan savollar")
 * kontentning o'zidan aniqlanadi: kirill harflari ko'p bo'lsa — ruscha.
 * Preview (tahrir) va ommaviy sahifa bir xil natija beradi.
 */
export function detectContentLang(...texts: Array<string | null | undefined>): Lang {
  const s = texts.filter(Boolean).join(" ");
  const cyr = (s.match(/[Ѐ-ӿ]/g) || []).length;
  const lat = (s.match(/[A-Za-z]/g) || []).length;
  if (cyr === 0) return "uz";
  return cyr >= lat ? "ru" : "uz";
}

export function contentTr(...texts: Array<string | null | undefined>): Tr {
  return makeTr(detectContentLang(...texts));
}
