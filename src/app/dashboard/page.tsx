import { Topbar } from "@/components/dashboard/topbar";
import { Button } from "@/components/ui/button";
import { Overview } from "@/components/dashboard/overview";
import { getDict } from "@/lib/i18n/server";

export default async function DashboardPage() {
  const { t } = await getDict();
  return (
    <>
      <Topbar
        breadcrumb={t.dash.pages.breadcrumb}
        title={t.dash.pages.home}
        actions={
          <Button href="/dashboard/sites/new" size="sm">
            {t.dash.pages.newSite}
          </Button>
        }
      />
      <Overview />
    </>
  );
}
