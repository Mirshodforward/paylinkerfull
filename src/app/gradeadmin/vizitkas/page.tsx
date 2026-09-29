"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import {
  AdminAlert,
  AdminEmpty,
  AdminPageHeader,
  AdminTableWrap,
  adminTd,
  adminTh,
  adminTr,
} from "@/components/admin/admin-ui";
import { cn } from "@/lib/cn";
import type { Tr } from "@/lib/i18n/tr";
import { useI18n } from "@/lib/i18n/provider";

type Row = {
  id: string;
  slug: string;
  status: string;
  vizitkaStatus?: string;
  expiredAt?: string | null;
  updatedAt: string;
  content?: { businessName?: string };
  ownerNumber?: string;
  ownerName?: string | null;
};

const STATUS_OPTS = (tr: Tr) => ([
  { v: "DRAFT", label: tr("Qoralama") },
  { v: "ACTIVE", label: tr("Faol") },
  { v: "PAUSED", label: tr("Pauza") },
  { v: "EXPIRED", label: tr("Tugagan") },
] as const);

/** Kalendar bo‘yicha qolgan kunlar (00:00 oralig‘ida) */
function calendarDaysUntilExpiry(iso: string): number | null {
  try {
    const end = new Date(iso);
    if (Number.isNaN(end.getTime())) return null;
    const now = new Date();
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((endDay.getTime() - today.getTime()) / 86400000);
  } catch {
    return null;
  }
}

function expiryParts(iso: string | null | undefined, tr: Tr): {
  dateLine: string;
  daysLine: string;
  daysClass: string;
} {
  if (!iso?.trim()) {
    return {
      dateLine: "—",
      daysLine: tr("Tugash sanasi yo‘q"),
      daysClass: "text-zinc-400",
    };
  }
  const end = new Date(iso);
  if (Number.isNaN(end.getTime())) {
    return {
      dateLine: "—",
      daysLine: tr("Noto‘g‘ri sana"),
      daysClass: "text-amber-700",
    };
  }
  const dateLine = end.toLocaleString("uz-UZ", {
    dateStyle: "short",
    timeStyle: "short",
  });
  const left = calendarDaysUntilExpiry(iso);
  if (left === null) {
    return {
      dateLine,
      daysLine: "",
      daysClass: "text-zinc-500",
    };
  }
  if (left > 0) {
    return {
      dateLine,
      daysLine: tr("{left} kun qoldi", { left }),
      daysClass: left <= 7 ? "text-amber-700" : "text-brand-700",
    };
  }
  if (left === 0) {
    return {
      dateLine,
      daysLine: tr("Bugun tugaydi"),
      daysClass: "text-amber-800",
    };
  }
  return {
    dateLine,
    daysLine: tr("Tugagan ({n} kun oldin)", { n: Math.abs(left) }),
    daysClass: "text-red-700",
  };
}

function formatTodayUz(): string {
  return new Date().toLocaleDateString("uz-UZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminVizitkasPage() {
  const { tr } = useI18n();
  const [items, setItems] = useState<Row[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [dayInputs, setDayInputs] = useState<Record<string, string>>({});

  const reload = useCallback(async () => {
    const r = await api<{ items: Row[] }>("/api/admin/vizitkas");
    setItems(r.items ?? []);
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        await reload();
      } catch (e) {
        setErr(e instanceof ApiError ? tr(e.message) : tr("Xato"));
      }
    })();
  }, [reload]);

  async function patchRow(id: string, body: Record<string, unknown>) {
    setBusyId(id);
    setErr(null);
    try {
      await api(`/api/admin/vizitkas/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      if (body.extendByDays != null) {
        setDayInputs((m) => ({ ...m, [id]: "0" }));
      }
      await reload();
    } catch (e) {
      setErr(e instanceof ApiError ? tr(e.message) : tr("Xato"));
    } finally {
      setBusyId(null);
    }
  }

  async function removeRow(id: string, slug: string) {
    if (
      !window.confirm(
        tr("“{slug}” vizitkasini o‘chirish? Bu amal qaytarilmaydi.", { slug }),
      )
    ) {
      return;
    }
    setBusyId(id);
    setErr(null);
    try {
      await api(`/api/admin/vizitkas/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      await reload();
    } catch (e) {
      setErr(e instanceof ApiError ? tr(e.message) : tr("O‘chirishda xato"));
    } finally {
      setBusyId(null);
    }
  }

  const selCls =
    "h-9 max-w-[148px] rounded-lg border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-800 shadow-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50";

  const inpDays =
    "h-9 w-14 rounded-lg border border-zinc-200 bg-white px-2 text-xs font-medium tabular-nums outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50";

  const btnMini =
    "rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm transition-colors hover:bg-brand-50 hover:border-brand-200 hover:text-brand-900 disabled:opacity-50";

  const linkPrimary =
    "font-semibold text-brand-800 underline-offset-2 hover:text-brand-950 hover:underline";

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={tr("Vizitkalar")}
        description={tr("Barcha saytlar: holat, obuna tugashi, muddatni uzaytirish va o‘chirish.")}
        actions={
          <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white px-4 py-3 text-right shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              {tr("Bugungi sana")}
            </p>
            <p className="mt-1 max-w-[240px] text-sm font-semibold leading-snug text-zinc-900">
              {formatTodayUz()}
            </p>
          </div>
        }
      />

      {err ? <AdminAlert>{err}</AdminAlert> : null}

      <AdminTableWrap>
        <table className="w-full min-w-[880px] text-left">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/90">
              <th className={adminTh}>{tr("Manzil")}</th>
              <th className={adminTh}>{tr("Nomi")}</th>
              <th className={adminTh}>{tr("Holat")}</th>
              <th className={adminTh}>
                <span className="block font-semibold">{tr("Tugash")}</span>
                <span className="mt-0.5 block text-[10px] font-normal normal-case leading-snug text-zinc-500">
                  {tr("Sana va qolgan kunlar")}
                </span>
              </th>
              <th className={adminTh}>
                <span className="block font-semibold">{tr("+ kun")}</span>
                <span className="mt-0.5 block text-[10px] font-normal normal-case leading-snug text-zinc-500">
                  {tr("Raqam tugash sanasiga qo‘shiladi")}
                </span>
              </th>
              <th className={adminTh}>{tr("Yangilangan")}</th>
              <th className={`${adminTh} text-right`}>{tr("Amallar")}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v) => {
              const st = v.vizitkaStatus ?? v.status;
              const busy = busyId === v.id;
              const daysVal = dayInputs[v.id] ?? "0";
              const daysNum = parseInt(daysVal, 10);
              const canAddDays =
                Number.isFinite(daysNum) && daysNum >= 1 && daysNum <= 3650;
              const exp = expiryParts(v.expiredAt ?? undefined, tr);
              return (
                <tr key={v.id} className={cn(adminTr, busy && "opacity-70")}>
                  <td className={`${adminTd} font-mono text-xs text-zinc-600`}>{v.slug}</td>
                  <td className={`${adminTd} max-w-[160px] truncate font-medium`}>
                    {v.content?.businessName ?? "—"}
                  </td>
                  <td className={adminTd}>
                    <select
                      className={selCls}
                      disabled={busy}
                      value={
                        STATUS_OPTS(tr).some((o) => o.v === st) ? st : "DRAFT"
                      }
                      onChange={(e) =>
                        void patchRow(v.id, { status: e.target.value })
                      }
                    >
                      {STATUS_OPTS(tr).map((o) => (
                        <option key={o.v} value={o.v}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={`${adminTd} align-top text-zinc-800`}>
                    <div className="flex min-w-[132px] flex-col gap-1 py-0.5">
                      <span className="text-[13px] font-medium tabular-nums leading-snug text-zinc-900">
                        {exp.dateLine}
                      </span>
                      {exp.daysLine ? (
                        <span
                          className={cn(
                            "text-[11px] font-semibold leading-tight",
                            exp.daysClass,
                          )}
                        >
                          {exp.daysLine}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className={adminTd}>
                    <div className="flex max-w-[200px] flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <input
                          type="number"
                          min={0}
                          max={3650}
                          inputMode="numeric"
                          className={cn(inpDays, "w-16")}
                          disabled={busy}
                          value={daysVal}
                          onChange={(e) =>
                            setDayInputs((m) => ({
                              ...m,
                              [v.id]: e.target.value,
                            }))
                          }
                        />
                        <span
                          className="text-[11px] font-medium text-zinc-500"
                          title={tr("Tugash sanasiga qo‘shiladigan kunlar")}
                        >
                          {tr("kun")}
                        </span>
                        <button
                          type="button"
                          disabled={busy || !canAddDays}
                          onClick={() => {
                            if (!canAddDays) return;
                            void patchRow(v.id, { extendByDays: daysNum });
                          }}
                          className={btnMini}
                        >
                          {tr("Qo‘shish")}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className={`${adminTd} whitespace-nowrap text-xs text-zinc-500`}>
                    {new Date(v.updatedAt).toLocaleString("uz-UZ")}
                  </td>
                  <td className={`${adminTd} text-right text-xs`}>
                    <Link
                      href={`/gradeadmin/vizitkas/${encodeURIComponent(v.id)}`}
                      className={linkPrimary}
                    >
                      {tr("Tahrir")}
                    </Link>
                    <span className="mx-1.5 text-zinc-300">·</span>
                    <a
                      href={`/${encodeURIComponent(v.slug)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline"
                    >
                      {tr("Sayt")}
                    </a>
                    <span className="mx-1.5 text-zinc-300">·</span>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void removeRow(v.id, v.slug)}
                      className="font-semibold text-red-600 hover:text-red-700 hover:underline disabled:opacity-50"
                    >
                      {tr("O‘chirish")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {items.length === 0 ? (
          <AdminEmpty
            title={tr("Hozircha vizitka yo‘q")}
            hint={tr("Mijozlar yangi sayt yaratganda bu yerda ko‘rinadi.")}
          />
        ) : null}
      </AdminTableWrap>
    </div>
  );
}
