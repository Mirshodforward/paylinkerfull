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

/**
 * class-validator standart (inglizcha) xabarlari — ikkala tilga.
 * DTO maydon nomlari foydalanuvchiga tushunarli nom bilan almashtiriladi.
 */
type Bi = { uz: string; ru: string };
const CV_FIELDS: Record<string, Bi> = {
  phone: { uz: 'Telefon raqam', ru: 'Номер телефона' },
  contactNumber: { uz: 'Telefon raqam', ru: 'Номер телефона' },
  code: { uz: 'Kod', ru: 'Код' },
  token: { uz: 'Havola', ru: 'Ссылка' },
  refreshToken: { uz: 'Sessiya', ru: 'Сессия' },
  name: { uz: 'Nom', ru: 'Название' },
  headline: { uz: 'Sarlavha', ru: 'Заголовок' },
  shortDescription: { uz: 'Qisqa tavsif', ru: 'Краткое описание' },
  description: { uz: 'Tavsif', ru: 'Описание' },
  message: { uz: 'Xabar', ru: 'Сообщение' },
  address: { uz: 'Manzil', ru: 'Адрес' },
  mapLink: { uz: 'Xarita havolasi', ru: 'Ссылка на карту' },
  workHour: { uz: 'Ish vaqti', ru: 'Время работы' },
  logoUrl: { uz: 'Logotip', ru: 'Логотип' },
  photoUrl: { uz: 'Rasm', ru: 'Изображение' },
  category: { uz: 'Kategoriya', ru: 'Категория' },
  templateId: { uz: 'Shablon', ru: 'Шаблон' },
  patternId: { uz: 'Naqsh', ru: 'Узор' },
  colorThemeId: { uz: 'Rang mavzusi', ru: 'Цветовая тема' },
  theme: { uz: 'Mavzu', ru: 'Тема' },
  plan: { uz: 'Tarif', ru: 'Тариф' },
  months: { uz: 'Oylar soni', ru: 'Количество месяцев' },
  subscriptionMonths: { uz: 'Obuna muddati', ru: 'Срок подписки' },
  amount: { uz: 'Summa', ru: 'Сумма' },
  balance: { uz: 'Balans', ru: 'Баланс' },
  status: { uz: 'Holat', ru: 'Статус' },
  extendByDays: { uz: 'Uzaytirish kunlari', ru: 'Дни продления' },
  freePublishDays: { uz: 'Bepul kunlar', ru: 'Бесплатные дни' },
  expiredAt: { uz: 'Tugash sanasi', ru: 'Дата окончания' },
};
const fieldName = (raw: string, lang: ApiLang): string =>
  CV_FIELDS[raw]?.[lang] ?? raw;

const CV_PATTERNS: Array<[RegExp, (m: RegExpMatchArray, lang: ApiLang) => string]> = [
  [
    /^(\w+) must be longer than or equal to (\d+) and shorter than or equal to (\d+) characters$/,
    (m, l) =>
      m[2] === m[3]
        ? l === 'ru'
          ? `${fieldName(m[1], l)}: ровно ${m[2]} символов`
          : `${fieldName(m[1], l)}: aynan ${m[2]} ta belgi`
        : l === 'ru'
          ? `${fieldName(m[1], l)}: от ${m[2]} до ${m[3]} символов`
          : `${fieldName(m[1], l)}: ${m[2]} dan ${m[3]} gacha belgi`,
  ],
  [
    /^(\w+) must be longer than or equal to (\d+) characters$/,
    (m, l) =>
      l === 'ru'
        ? `${fieldName(m[1], l)}: минимум ${m[2]} символов`
        : `${fieldName(m[1], l)}: kamida ${m[2]} ta belgi`,
  ],
  [
    /^(\w+) must be shorter than or equal to (\d+) characters$/,
    (m, l) =>
      l === 'ru'
        ? `${fieldName(m[1], l)}: не более ${m[2]} символов`
        : `${fieldName(m[1], l)}: ko‘pi bilan ${m[2]} ta belgi`,
  ],
  [
    /^(\w+) must be a string$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: должно быть текстом` : `${fieldName(m[1], l)}: matn bo‘lishi kerak`),
  ],
  [
    /^(\w+) should not be empty$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: не должно быть пустым` : `${fieldName(m[1], l)}: bo‘sh bo‘lmasligi kerak`),
  ],
  [
    /^(\w+) must be an integer number$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: должно быть целым числом` : `${fieldName(m[1], l)}: butun son bo‘lishi kerak`),
  ],
  [
    /^(\w+) must be a number conforming to the specified constraints$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: должно быть числом` : `${fieldName(m[1], l)}: son bo‘lishi kerak`),
  ],
  [
    /^(\w+) must be a boolean value$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: должно быть да/нет` : `${fieldName(m[1], l)}: ha/yo‘q bo‘lishi kerak`),
  ],
  [
    /^(\w+) must not be less than (-?\d+)$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: не менее ${m[2]}` : `${fieldName(m[1], l)}: kamida ${m[2]}`),
  ],
  [
    /^(\w+) must not be greater than (-?\d+)$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: не более ${m[2]}` : `${fieldName(m[1], l)}: ko‘pi bilan ${m[2]}`),
  ],
  [
    /^(\w+) must be one of the following values: (.*)$/,
    (m, l) =>
      l === 'ru'
        ? `${fieldName(m[1], l)}: допустимые значения — ${m[2]}`
        : `${fieldName(m[1], l)}: ruxsat etilgan qiymatlar — ${m[2]}`,
  ],
  [
    /^(\w+) must match .+ regular expression$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: неверный формат` : `${fieldName(m[1], l)}: format noto‘g‘ri`),
  ],
  [
    /^(\w+) must be a valid ISO 8601 date string$/,
    (m, l) => (l === 'ru' ? `${fieldName(m[1], l)}: неверный формат даты` : `${fieldName(m[1], l)}: sana formati noto‘g‘ri`),
  ],
  [
    /^property (\w+) should not exist$/,
    (m, l) => (l === 'ru' ? `Недопустимое поле: ${m[1]}` : `Ruxsat etilmagan maydon: ${m[1]}`),
  ],
];

export function translateMessage(msg: string, lang: ApiLang): string {
  for (const [re, fn] of CV_PATTERNS) {
    const m = msg.match(re);
    if (m) return fn(m, lang);
  }
  if (lang !== 'ru') return msg;
  const hit = RU_MESSAGES[msg];
  if (hit) return hit;
  for (const [re, fn] of RU_PATTERNS) {
    const m = msg.match(re);
    if (m) return fn(m);
  }
  return msg;
}
