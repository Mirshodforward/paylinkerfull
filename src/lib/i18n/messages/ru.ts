/**
 * Ruscha tarjimalar — kalit: o'zbekcha matn (aynan koddagi kabi).
 * Qismlarga bo'lingan: har fayl bitta soha. Bu yerda faqat birlashtiriladi.
 *
 * Yangi satr qo'shganda: `npm run i18n:check` yetishmayotgan kalitlarni ko'rsatadi.
 */
import { RU_COMMON } from "./ru/common";

export const RU_MESSAGES: Record<string, string> = {
  ...RU_COMMON,
};
