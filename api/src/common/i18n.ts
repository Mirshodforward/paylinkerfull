/**
 * API xabarlari tarjimasi.
 *
 * Kodda istisno matnlari o'zbekcha (yagona manba). Mijoz rus tilini tanlagan
 * bo'lsa (frontend cookie `pl_lang=ru` — API bir domenda, cookie avtomatik
 * keladi; yoki `x-lang: ru` sarlavhasi), javobdagi `message`
 * I18nExceptionFilter tomonidan shu xarita orqali almashtiriladi.
 *
 * Tarjima yo'q bo'lsa — o'zbekcha matn qaytadi (buzilmaydi).
 */
export type ApiLang = 'uz' | 'ru';

export function langFromRequest(req: {
  headers?: Record<string, string | string[] | undefined>;
}): ApiLang {
  const h = req.headers ?? {};
  const x = h['x-lang'];
  const xl = (Array.isArray(x) ? x[0] : x)?.toLowerCase();
  if (xl === 'ru' || xl === 'uz') return xl;
  const cookie = h.cookie;
  const c = Array.isArray(cookie) ? cookie.join(';') : cookie ?? '';
  const m = /(?:^|;\s*)pl_lang=(uz|ru)(?:;|$)/.exec(c);
  if (m) return m[1] as ApiLang;
  return 'uz';
}

/** Aniq (statik) xabarlar */
export const RU_MESSAGES: Record<string, string> = {
  // auth
  'Kod yoki raqam noto‘g‘ri / muddati o‘tgan': 'Неверный код или номер / срок действия истёк',
  'Sessiya yaroqsiz, qayta kiring': 'Сессия недействительна, войдите заново',
  'Sessiya bekor qilingan, qayta kiring': 'Сессия отменена, войдите заново',
  'Noto‘g‘ri token': 'Неверный токен',
  'Noto‘g‘ri token turi': 'Неверный тип токена',
  'Muddati tugadi, qayta kiring': 'Срок истёк, войдите заново',
  'Kirish muddati tugadi yoki token noto‘g‘ri': 'Срок входа истёк или неверный токен',
  'Token talab qilinadi': 'Требуется токен',
  'Havola yaroqsiz': 'Ссылка недействительна',
  "Test kirish o'chirilgan": 'Тестовый доступ отключён',
  'Admin huquqi yo‘q': 'Нет прав администратора',
  'Foydalanuvchi topilmadi': 'Пользователь не найден',
  "Telefon noto'g'ri kiritilgan": 'Неверно введён номер телефона',
  // vizitka / landing
  'Vizitka topilmadi': 'Визитка не найдена',
  'Landing topilmadi': 'Лендинг не найден',
  'Bu manzil allaqachon band': 'Этот адрес уже занят',
  'Bu manzil tizim tomonidan band': 'Этот адрес зарезервирован системой',
  'Bu manzil vizitka sifatida band': 'Этот адрес занят визиткой',
  'Bu manzil landing sayt tomonidan band': 'Этот адрес занят лендингом',
  'Bu slug band': 'Этот адрес занят',
  'Fayl tanlang': 'Выберите файл',
  'Faqat rasm fayli': 'Только файл изображения',
  // to'lov
  'Summa tanlangan paket narxi bilan mos emas': 'Сумма не соответствует цене выбранного пакета',
  'Noto‘g‘ri summa': 'Неверная сумма',
  "To'lov tizimi vaqtincha mavjud emas": 'Платёжная система временно недоступна',
  'subscriptionMonths bilan vizitkaId yoki landingId (bittasi) yuborilishi kerak':
    'Вместе с subscriptionMonths нужно передать vizitkaId или landingId (только один)',
  // class-validator
  'Kamida 1000 so‘m': 'Минимум 1000 сум',
  'Summa juda katta': 'Слишком большая сумма',
  'Faqat kichik harf, raqam va -': 'Только строчные буквы, цифры и -',
  'Faqat kichik harf, raqam va `-`': 'Только строчные буквы, цифры и `-`',
};

/** Dinamik (raqamli) xabarlar — regex bilan */
const RU_PATTERNS: Array<[RegExp, (m: RegExpMatchArray) => string]> = [
  [
    /^Balans yetarli emas\. (AI paket|Paket): (.+?) so'm\. Joriy balans: (.+?) so'm\.$/,
    (m) =>
      `Недостаточно средств на балансе. ${m[1] === 'AI paket' ? 'AI-пакет' : 'Пакет'}: ${m[2]} сум. Текущий баланс: ${m[3]} сум.`,
  ],
];

export function translateMessage(msg: string, lang: ApiLang): string {
  if (lang !== 'ru') return msg;
  const hit = RU_MESSAGES[msg];
  if (hit) return hit;
  for (const [re, fn] of RU_PATTERNS) {
    const m = msg.match(re);
    if (m) return fn(m);
  }
  return msg;
}
