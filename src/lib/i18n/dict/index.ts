import type { Lang } from "../config";
import { ru } from "./ru";
import { uz, type Dict } from "./uz";

export type { Dict };
export const DICT: Record<Lang, Dict> = { uz, ru };

/** `{domain}` kabi joy egalarini to'ldiradi */
export function fill(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}
