import Link from "next/link";
import { getDict } from "@/lib/i18n/server";

type Props = {
  title: string;
  description: string;
  hint?: string;
};

export async function ComingSoon({ title, description, hint }: Props) {
  const { t } = await getDict();
  return (
    <div className="px-5 py-16 lg:px-10">
      <div className="mx-auto max-w-xl rounded-[var(--radius-card)] border border-[color:var(--border)] bg-white p-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {t.dash.soon.badge}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
        {hint ? (
          <p className="mt-4 text-xs text-neutral-500">{hint}</p>
        ) : null}
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center pl-gradient rounded-md px-5 text-sm font-medium text-white hover:brightness-[1.06]"
          >
            {t.dash.soon.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
