import { Topbar } from "@/components/dashboard/topbar";
import { TopbarWalletActions } from "@/components/dashboard/topbar-wallet";
import { CreateSiteForm } from "@/components/dashboard/create-site-form";
import { Suspense } from "react";
import { getDict } from "@/lib/i18n/server";

export default async function NewSitePage() {
  const { t, tr } = await getDict();
  return (
    <>
      <Topbar
        breadcrumb={`${t.dash.pages.sites} › ${tr("Yangi")}`}
        title={tr("Yangi sayt yaratish")}
        actions={<TopbarWalletActions />}
      />
      <Suspense
        fallback={
          <div className="px-5 py-10 text-center text-sm text-neutral-500 lg:px-10">
            {t.common.loading}
          </div>
        }
      >
        <CreateSiteForm />
      </Suspense>
    </>
  );
}
