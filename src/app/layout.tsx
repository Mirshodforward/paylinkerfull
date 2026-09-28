import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BRAND_NAME, SITE_URL } from "@/lib/brand";
import { LangProvider } from "@/lib/i18n/provider";
import { getDict, getLang } from "@/lib/i18n/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { lang, t } = await getDict();
  const title = `${BRAND_NAME} — ${t.meta.title}`;
  return {
    title,
    description: t.meta.description,
    applicationName: BRAND_NAME,
    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description: t.meta.ogDescription,
      siteName: BRAND_NAME,
      type: "website",
      locale: lang === "ru" ? "ru_RU" : "uz_UZ",
      images: [{ url: "/paylinker-logo-512.png", width: 512, height: 512 }],
    },
    twitter: {
      card: "summary",
      title,
      images: ["/paylinker-logo-512.png"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LangProvider initialLang={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
