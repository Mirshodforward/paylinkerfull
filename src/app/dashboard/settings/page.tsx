import { Topbar } from "@/components/dashboard/topbar";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { getDict } from "@/lib/i18n/server";

export default async function SettingsPage() {
  const { t } = await getDict();
  return (
    <>
      <Topbar breadcrumb={t.dash.pages.breadcrumb} title={t.dash.pages.settings} />
      <ComingSoon
        title={t.dash.soon.settingsTitle}
        description={t.dash.soon.settingsDesc}
      />
    </>
  );
}
