import { cookies } from "next/headers";
import { DEFAULT_LANG, isLang, LANG_COOKIE, type Lang } from "./config";
import { DICT, type Dict } from "./dict";
import { makeTr, type Tr } from "./tr";

export async function getLang(): Promise<Lang> {
  const v = (await cookies()).get(LANG_COOKIE)?.value;
  return isLang(v) ? v : DEFAULT_LANG;
}

export async function getDict(): Promise<{ lang: Lang; t: Dict; tr: Tr }> {
  const lang = await getLang();
  return { lang, t: DICT[lang], tr: makeTr(lang) };
}
