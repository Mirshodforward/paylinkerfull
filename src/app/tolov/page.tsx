import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { getLang } from "@/lib/i18n/server";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { LegalPage } from "@/components/legal/legal-page";
import { TOLOV_RU, TOLOV_UZ } from "@/lib/legal/tolov";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const d = lang === "ru" ? TOLOV_RU : TOLOV_UZ;
  return { title: `${d.title} — ${BRAND_NAME}`, description: d.subtitle };
}

export default function TolovPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <LegalPage doc={{ uz: TOLOV_UZ, ru: TOLOV_RU }} current="/tolov" />
      </main>
      <Footer />
    </>
  );
}
