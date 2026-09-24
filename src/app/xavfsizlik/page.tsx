import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { LegalPage } from "@/components/legal/legal-page";
import { XAVFSIZLIK_RU, XAVFSIZLIK_UZ } from "@/lib/legal/xavfsizlik";

export const metadata = {
  title: "Xavfsizlik va firibgarlikka qarshi choralar — Paylinker",
  description:
    "Paylinker firibgarlik operatsiyalari xavfini qanday cheklaydi va nazorat qiladi: amaldagi cheklovlar, monitoring va foydalanuvchi uchun tavsiyalar.",
};

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
