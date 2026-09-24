import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { LegalPage } from "@/components/legal/legal-page";
import { OFERTA_UZ } from "@/lib/legal/oferta.uz";
import { OFERTA_RU } from "@/lib/legal/oferta.ru";

export const metadata = {
  title: "Ommaviy oferta — Paylinker",
  description:
    "Paylinker platformasi xizmatlarini ko'rsatish to'g'risidagi ommaviy oferta (shartnoma).",
};

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
