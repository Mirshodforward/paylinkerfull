import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { TahrirPlayground } from "@/components/tahrir/tahrir-playground";
import { getDict } from "@/lib/i18n/server";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

const display = Playfair_Display({
  weight: ["700", "800"],
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { tr } = await getDict();
  return {
    title: tr("Tahrir — demo sahifa"),
    description: tr("Landingni tahrirlang; o‘ngda jonli ko‘rinish. «Ko‘rish» — to‘liq ekranda alohida sahifa."),
  };
}

export default async function TahrirPage() {
  const { t } = await getDict();
  return (
    <Suspense
      fallback={
        <div className="flex h-[100dvh] items-center justify-center bg-neutral-100 text-sm text-neutral-600">
          {t.common.loading}
        </div>
      }
    >
      <TahrirPlayground
        titleFontClassName={display.className}
        bodyFontClassName={inter.className}
      />
    </Suspense>
  );
}
