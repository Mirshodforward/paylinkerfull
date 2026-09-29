import type { Metadata } from "next";
import { ExpiredPublicContent } from "@/components/sites/expired-public-content";
import { ExpiredPageView } from "@/components/sites/expired-page-view";
import { BRAND_NAME } from "@/lib/brand";
import { getDict } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { tr } = await getDict();
  return {
    title: `${tr("Vaqtincha to'xtatilgan")} — ${BRAND_NAME}`,
    description: tr("Bu nomdagi sayt vaqtincha to'xtatilgan."),
  };
}

export const dynamic = "force-dynamic";

export default async function ExpiredPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const trimmed = slug?.trim();

  if (!trimmed) {
    const { tr } = await getDict();
    return (
      <ExpiredPageView
        businessName={tr("Biznes sahifangiz")}
        siteKind="generic"
        showSlugHint={false}
      />
    );
  }

  return <ExpiredPublicContent slug={trimmed} />;
}
