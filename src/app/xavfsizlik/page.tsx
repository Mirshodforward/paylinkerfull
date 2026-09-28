import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { getLang } from "@/lib/i18n/server";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { LegalPage } from "@/components/legal/legal-page";
import { XAVFSIZLIK_RU, XAVFSIZLIK_UZ } from "@/lib/legal/xavfsizlik";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const d = lang === "ru" ? XAVFSIZLIK_RU : XAVFSIZLIK_UZ;
  return { title: `${d.title} — ${BRAND_NAME}`, description: d.subtitle };
}

export default function XavfsizlikPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <LegalPage doc={{ uz: XAVFSIZLIK_UZ, ru: XAVFSIZLIK_RU }} current="/xavfsizlik" />
      </main>
      <Footer />
    </>
  );
}
