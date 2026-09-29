/**
 * Ruscha tarjimalar — kalit: o'zbekcha matn (aynan koddagi kabi).
 * Qismlarga bo'lingan: har fayl bitta soha. Bu yerda faqat birlashtiriladi.
 *
 * Yangi satr qo'shganda: `npm run i18n:check` yetishmayotgan kalitlarni ko'rsatadi.
 */
import { RU_ADMIN } from "./ru/admin";
import { RU_CHECK } from "./ru/check";
import { RU_COMMON } from "./ru/common";
import { RU_CREATE_SITE } from "./ru/create_site";
import { RU_DEFAULTS } from "./ru/defaults";
import { RU_EDITOR } from "./ru/editor";
import { RU_MISC } from "./ru/misc";
import { RU_TAHRIR } from "./ru/tahrir";

export const RU_MESSAGES: Record<string, string> = {
  ...RU_ADMIN,
  ...RU_CHECK,
  ...RU_COMMON,
  ...RU_CREATE_SITE,
  ...RU_DEFAULTS,
  ...RU_EDITOR,
  ...RU_MISC,
  ...RU_TAHRIR,
};
