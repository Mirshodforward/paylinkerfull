import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BRAND_NAME, SITE_URL } from "@/lib/brand";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = `${BRAND_NAME} — 15 daqiqada biznes saytingizni yarating`;

export const metadata: Metadata = {
  title: TITLE,
  description:
    "O'zbekistondagi kichik va o'rta biznes uchun oson va qulay sayt yaratish platformasi. Shablon tanlang, matnni tahrirlang va saytingiz tayyor.",
  applicationName: BRAND_NAME,
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description:
      "Dasturchisiz va dizaynersiz o'z biznes saytingizni yarating. 10 kun bepul sinov.",
    siteName: BRAND_NAME,
    type: "website",
    locale: "uz_UZ",
    images: [{ url: "/paylinker-logo-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    images: ["/paylinker-logo-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
