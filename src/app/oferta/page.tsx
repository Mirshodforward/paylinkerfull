import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { getLang } from "@/lib/i18n/server";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { LegalPage } from "@/components/legal/legal-page";
import { OFERTA_UZ } from "@/lib/legal/oferta.uz";
import { OFERTA_RU } from "@/lib/legal/oferta.ru";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const d = lang === "ru" ? OFERTA_RU : OFERTA_UZ;
  return { title: `${d.title} — ${BRAND_NAME}`, description: d.subtitle };
}

export default function OfertaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <LegalPage doc={{ uz: OFERTA_UZ, ru: OFERTA_RU }} current="/oferta" />
      </main>
      <Footer />
    </>
  );
}
