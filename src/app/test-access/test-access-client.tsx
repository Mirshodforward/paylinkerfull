"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { postJson } from "@/lib/api";
import { setTokens } from "@/lib/auth-storage";
import { isLang, LANG_COOKIE, LANG_COOKIE_MAX_AGE } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";

type Res = { accessToken: string; refreshToken: string };

/**
 * Havola: /test-access?lang=ru#<TOKEN>
 * Token URL ning `#` qismida — u serverga, jurnallarga va Referer ga tushmaydi.
 */
export function TestAccessClient() {
  const { t } = useI18n();
  const [state, setState] = useState<"loading" | "invalid" | "missing">("loading");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // StrictMode ikki marta chaqirmasin
    ran.current = true;

    const token = decodeURIComponent(window.location.hash.slice(1)).trim();
    // Tokenni manzil satridan darhol olib tashlaymiz (tarix va skrinshotlar uchun)
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    const lang = new URLSearchParams(window.location.search).get("lang");
    if (isLang(lang)) {
      document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
    }

    if (!token) {
      setState("missing");
      return;
    }
    void (async () => {
      try {
        const r = await postJson<Res>("/auth/test-access", { token });
        setTokens(r.accessToken, r.refreshToken);
        // To'liq qayta yuklash — yangi til cookie si server komponentlarga ham yetib borsin
        window.location.replace("/dashboard");
      } catch {
        setState("invalid");
      }
    })();
  }, []);

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-[var(--radius-panel)] border border-[color:var(--border)] bg-white p-8 text-center shadow-[var(--shadow-md)]">
        {state === "loading" ? (
          <>
            <span
              aria-hidden
              className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600"
            />
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">{t.testAccess.entering}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-[color:var(--foreground)]">
              {state === "missing" ? t.testAccess.missing : t.testAccess.invalid}
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-[var(--radius-control)] border border-brand-200 px-4 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50"
            >
              {t.testAccess.toLogin}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
