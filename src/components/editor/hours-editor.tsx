"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { Tr } from "@/lib/i18n/tr";
import { useI18n } from "@/lib/i18n/provider";
import { makeTr } from "@/lib/i18n/tr";

const DAY_LABELS = (tr: Tr) => ([tr("Du"), tr("Se"), tr("Cho"), tr("Pa"), tr("Ju"), tr("Sh"), tr("Yak")]);
const DAY_NAMES = (tr: Tr) => ([tr("Dushanba"), tr("Seshanba"), tr("Chorshanba"), tr("Payshanba"), tr("Juma"), tr("Shanba"), tr("Yakshanba")]);

/**
 * Saqlangan "ish vaqti" matni qaysi tilda yozilgan bo'lsa ham o'qilsin:
 * foydalanuvchi UI tilini almashtirsa, eski matn buzilmasin.
 */
const PARSE_TRS: Tr[] = [makeTr("uz"), makeTr("ru")];
const EVERY_DAY_WORDS = PARSE_TRS.map((t) => t("Har kuni").toLowerCase());
const DAY_OFF_WORDS = PARSE_TRS.map((t) => t("Dam olish").toLowerCase());

const TIME_OPTIONS = buildTimeOptions();

function buildTimeOptions(): string[] {
  const result: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      result.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return result;
}

type Preset = {
  label: string;
  value: string;
};

const PRESETS = (tr: Tr): Preset[] => ([
  { label: tr("Du–Sh 09:00–20:00"), value: tr("Du–Sh: 09:00 – 20:00") },
  { label: tr("Har kuni 09:00–22:00"), value: tr("Har kuni: 09:00 – 22:00") },
  { label: tr("Du–Ju 09:00–18:00"), value: tr("Du–Ju: 09:00 – 18:00") },
  { label: tr("24 soat"), value: tr("24 soat") },
  { label: tr("Kelishuv asosida"), value: tr("Kelishuv asosida") },
]);

type Mode = "preset" | "custom";

export function HoursEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const { tr } = useI18n();
  const matchedPreset = PRESETS(tr).find((p) => p.value === value);
  const [mode, setMode] = useState<Mode>(matchedPreset || !value ? "preset" : "custom");

  const { days, start, end } = useMemo(() => parseCustom(value, tr), [value, tr]);

  const applyCustom = (nextDays: boolean[], nextStart: string, nextEnd: string) => {
    onChange(formatCustom(nextDays, nextStart, nextEnd, tr));
  };

  const toggleDay = (i: number) => {
    const next = [...days];
    next[i] = !next[i];
    applyCustom(next, start, end);
  };

  return (
    <div className="space-y-3 rounded-md border border-[color:var(--border)] bg-neutral-50 p-3">
      <div className="flex items-center gap-1.5 rounded-md bg-white p-1">
        <ModeTab active={mode === "preset"} onClick={() => setMode("preset")}>
          {tr("Tez tanlash")}
        </ModeTab>
        <ModeTab active={mode === "custom"} onClick={() => setMode("custom")}>
          {tr("Moslash")}
        </ModeTab>
      </div>

      {mode === "preset" ? (
        <div className="flex flex-wrap gap-1.5">
          {PRESETS(tr).map((p) => {
            const selected = value === p.value;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => onChange(p.value)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                  selected
                    ? "pl-gradient border-transparent text-white"
                    : "border-[color:var(--border)] bg-white text-[color:var(--foreground)] hover:border-brand-300",
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
              {tr("Ish kunlari")}
            </p>
            <div className="flex gap-1">
              {DAY_LABELS(tr).map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleDay(i)}
                  aria-pressed={days[i]}
                  aria-label={DAY_NAMES(tr)[i]}
                  className={cn(
                    "flex h-9 flex-1 items-center justify-center rounded-md border text-xs font-medium transition-colors",
                    days[i]
                      ? "pl-gradient border-transparent text-white"
                      : "border-[color:var(--border)] bg-white text-neutral-500 hover:border-brand-300 hover:text-brand-700",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <TimeSelect
              label={tr("Ochilish")}
              value={start}
              onChange={(v) => applyCustom(days, v, end)}
            />
            <TimeSelect
              label={tr("Yopilish")}
              value={end}
              onChange={(v) => applyCustom(days, start, v)}
            />
          </div>
        </div>
      )}

      <div className="rounded-md border border-dashed border-[color:var(--border)] bg-white px-3 py-2 text-xs">
        <span className="text-neutral-500">{tr("Saytda chiqadi:")}</span>{" "}
        <span className="font-medium text-[color:var(--foreground)]">{value || "—"}</span>
      </div>
    </div>
  );
}

function ModeTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "pl-gradient text-white"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-brand-700",
      )}
    >
      {children}
    </button>
  );
}

function TimeSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-[color:var(--border)] bg-white px-2 text-sm text-[color:var(--foreground)] focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      >
        {TIME_OPTIONS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}

function parseCustom(value: string, tr: Tr): { days: boolean[]; start: string; end: string } {
  const fallback = {
    days: [true, true, true, true, true, true, false],
    start: "09:00",
    end: "20:00",
  };

  if (!value) return fallback;

  const timeMatch = value.match(/(\d{1,2}:\d{2})\s*[–\-—]\s*(\d{1,2}:\d{2})/);
  const start = timeMatch ? normalizeTime(timeMatch[1]) : fallback.start;
  const end = timeMatch ? normalizeTime(timeMatch[2]) : fallback.end;

  const lower = value.toLowerCase();
  const empty: boolean[] = [false, false, false, false, false, false, false];

  if (EVERY_DAY_WORDS.some((w) => lower.includes(w))) {
    return { days: [true, true, true, true, true, true, true], start, end };
  }
  if (DAY_OFF_WORDS.some((w) => lower.includes(w))) {
    return { days: empty, start, end };
  }

  const colonIdx = value.indexOf(":");
  const dayPortion = (colonIdx !== -1 ? value.slice(0, colonIdx) : value).trim();
  if (!dayPortion) return fallback;

  const days = [...empty];

  const rangeMatch = dayPortion.match(/^([^\s–\-—,;]+)\s*[–\-—]\s*([^\s–\-—,;]+)$/);
  if (rangeMatch) {
    const startIdx = labelIndex(rangeMatch[1], tr);
    const endIdx = labelIndex(rangeMatch[2], tr);
    if (startIdx !== -1 && endIdx !== -1 && startIdx <= endIdx) {
      for (let i = startIdx; i <= endIdx; i++) days[i] = true;
      return { days, start, end };
    }
  }

  const parts = dayPortion.split(/[,;]+/).map((s) => s.trim()).filter(Boolean);
  let found = false;
  for (const p of parts) {
    const idx = labelIndex(p, tr);
    if (idx !== -1) {
      days[idx] = true;
      found = true;
    }
  }
  if (found) return { days, start, end };

  return fallback;
}

function labelIndex(raw: string, tr: Tr): number {
  const norm = raw.toLowerCase().replace(/\s+/g, "");
  for (const t of [tr, ...PARSE_TRS]) {
    const idx = DAY_LABELS(t).findIndex((l) => l.toLowerCase() === norm);
    if (idx !== -1) return idx;
  }
  return -1;
}

function normalizeTime(raw: string): string {
  const [h, m] = raw.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

function formatCustom(days: boolean[], start: string, end: string, tr: Tr): string {
  const count = days.filter(Boolean).length;
  if (count === 0) return tr("Dam olish");
  if (count === 7) return tr("Har kuni: {start} – {end}", { start, end });

  const firstIdx = days.findIndex(Boolean);
  const lastIdx = days.lastIndexOf(true);
  const contiguous = days
    .slice(firstIdx, lastIdx + 1)
    .every((d) => d);

  if (contiguous) {
    return `${DAY_LABELS(tr)[firstIdx]}–${DAY_LABELS(tr)[lastIdx]}: ${start} – ${end}`;
  }

  const active = days
    .map((d, i) => (d ? DAY_LABELS(tr)[i] : null))
    .filter(Boolean)
    .join(", ");
  return `${active}: ${start} – ${end}`;
}
