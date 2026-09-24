import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { LegalPage } from "@/components/legal/legal-page";
import { TOLOV_RU, TOLOV_UZ } from "@/lib/legal/tolov";

export const metadata = {
  title: "To'lov va pul qaytarish — Paylinker",
  description:
    "Paylinkerda to'lov usullari, summa chegaralari, to'lov tartibi va mablag'ni qaytarish shartlari.",
};

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
