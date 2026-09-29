import type { Metadata } from "next";
import { NotFoundPublic } from "@/components/sites/public-site-helpers";
import { getDict } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { tr } = await getDict();
  return {
    title: tr("404 — Bunday sayt topilmadi"),
    description: tr("Ushbu manzilda hozircha sayt yo'q. Paylinker da o'z vizitka yoki landing yarating."),
  };
}

export default async function NotFoundPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  return <NotFoundPublic slug={slug} />;
}
