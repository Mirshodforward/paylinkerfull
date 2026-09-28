/**
 * Tekshiruvchilar (bank / to'lov tizimi) uchun test kirish.
 *
 * Havola: https://paylinker.uz/test-access#<TEST_ACCESS_TOKEN>
 *
 * - Faqat `.env` da TEST_ACCESS_TOKEN (kamida 32 belgi) bo'lsa ishlaydi.
 * - O'chirish: TEST_ACCESS_TOKEN ni bo'shating va API ni qayta ishga
 *   tushiring. Mavjud test sessiyalari ham ≤15 daqiqada o'ladi — refresh
 *   test hisob uchun rad etiladi (auth.service.ts).
 * - Havola egasi FAQAT shu alohida test hisobga kiradi; admin emas,
 *   boshqa foydalanuvchilar ma'lumotiga kirish yo'q.
 */

/**
 * Test hisob raqami. "00" O'zbekistonda operator kodi emas — bunday raqam
 * haqiqiy abonentda bo'lmaydi va Telegram orqali ro'yxatdan o'tib bo'lmaydi.
 */
export const TEST_PHONE = "+998000000000";

export const TEST_FULL_NAME = "Test hisob (tekshiruv uchun)";

/**
 * Har kirishda balans shu miqdordan kam bo'lsa, shunga to'ldiriladi —
 * tekshiruvchi obunani faollashtirishni sinab ko'ra olsin
 * (eng qimmat paket: landing 12 oy).
 * Bu Payment yozuvi YARATMAYDI — to'lov statistikasiga ta'sir qilmaydi.
 */
export const TEST_BALANCE_FLOOR_SOM = 2_000_000;

/** Qisqa token — oson taxmin qilinadi; bunday sozlama o'chiq hisoblanadi */
export const TEST_TOKEN_MIN_LENGTH = 32;
