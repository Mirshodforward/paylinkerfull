"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE, type Lang } from "./config";
import { DICT, type Dict } from "./dict";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };

const I18nContext = createContext<Ctx | null>(null);

export function LangProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback(
    (l: Lang) => {
      document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
      document.documentElement.lang = l;
      // Klient komponentlar darhol, server komponentlar refresh dan keyin yangilanadi
      setLangState(l);
      router.refresh();
    },
    [router],
  );

  const value = useMemo(() => ({ lang, t: DICT[lang], setLang }), [lang, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const v = useContext(I18nContext);
  if (!v) throw new Error("useI18n LangProvider ichida chaqirilishi kerak");
  return v;
}
