import { Topbar } from "@/components/dashboard/topbar";
import { ClickTopUpPanel } from "@/components/dashboard/click-top-up";
import { getDict } from "@/lib/i18n/server";

export default async function BillingPage() {
  const { t } = await getDict();
  return (
    <>
      <Topbar breadcrumb={t.dash.pages.breadcrumb} title={t.dash.pages.billing} />
      <div className="mx-auto max-w-2xl px-5 py-8 lg:px-10">
        <ClickTopUpPanel />
      </div>
    </>
  );
}
