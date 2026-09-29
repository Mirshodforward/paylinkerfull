import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { TahrirLandingPreview } from "@/components/tahrir/tahrir-landing-preview";
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
    title: tr("Ko‘rish — landing"),
    description: tr("Tahrir qilingan landingni tahrirsiz ko‘rish."),
    robots: { index: false, follow: false },
  };
}

export default function TahrirPreviewPage() {
  return (
    <TahrirLandingPreview
      titleFontClassName={display.className}
      bodyFontClassName={inter.className}
    />
  );
}
