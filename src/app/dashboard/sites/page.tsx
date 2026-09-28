import { Suspense } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { TopbarWalletActions } from "@/components/dashboard/topbar-wallet";
import { SitesList } from "@/components/dashboard/sites-list";
import { getDict } from "@/lib/i18n/server";

export default async function SitesPage() {
  const { t } = await getDict();
  return (
    <>
      <Topbar
        breadcrumb={t.dash.pages.breadcrumb}
        title={t.dash.pages.sites}
        actions={<TopbarWalletActions />}
      />
      <Suspense fallback={null}>
        <SitesList />
      </Suspense>
    </>
  );
}
