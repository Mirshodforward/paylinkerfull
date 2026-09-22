"use client";

import { VIZITKA_TEMPLATES, VizitkaTemplateId } from "@/lib/store/types";
import { cn } from "@/lib/cn";

type Props = {
  value: VizitkaTemplateId;
  onChange: (id: VizitkaTemplateId) => void;
};

export function VizitkaTemplateSwitcher({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-4 gap-1.5 rounded-lg border border-[color:var(--border)] bg-neutral-50 p-1">
      {VIZITKA_TEMPLATES.map((tpl) => {
        const active = tpl.id === value;
        return (
          <button
            key={tpl.id}
            type="button"
            onClick={() => onChange(tpl.id)}
            aria-pressed={active}
            className={cn(
              "h-8 rounded-md px-2 text-[11px] font-medium transition-colors",
              active
                ? "pl-gradient text-white shadow-[var(--shadow-brand)]"
                : "text-neutral-700 hover:bg-white hover:text-brand-700",
            )}
          >
            {tpl.name}
          </button>
        );
      })}
    </div>
  );
}
