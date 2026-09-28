import { Topbar } from "@/components/dashboard/topbar";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { getDict } from "@/lib/i18n/server";

export default async function InboxPage() {
  const { t } = await getDict();
  const S = t.dash.soon;
  return (
    <>
      <Topbar breadcrumb={t.dash.pages.breadcrumb} title={t.dash.pages.inbox} />
      <ComingSoon
        title={S.inboxTitle}
        description={S.inboxDesc}
        hint={S.inboxHint}
      />
    </>
  );
}
