import { COMPANY, OFERTA_DATE_RU, OFERTA_DATE_UZ, SUPPORT_HOURS_RU, SUPPORT_HOURS_UZ } from "./company";
import type { LegalDoc } from "./types";

export const TOLOV_UZ: LegalDoc = {
  title: "To'lov va pul qaytarish",
  subtitle: "To'lov usullari, tartibi va mablag'ni qaytarish shartlari",
  updated: `Oxirgi tahrir: ${OFERTA_DATE_UZ}`,
  intro: [
    {
      t: "p",
      text:
        "Ushbu bo'lim Ommaviy ofertaning ajralmas qismi hisoblanadi va Paylinker platformasida " +
        "to'lovlar qanday amalga oshirilishini hamda mablag' qanday hollarda qaytarilishini batafsil tushuntiradi.",
    },
  ],
  sections: [
    {
      n: "1",
      title: "To'lov usullari",
      blocks: [
        {
          t: "p",
          text:
            "1.1. To'lov CLICK to'lov tizimi orqali, ushbu tizim qo'llab-quvvatlaydigan bank kartalari " +
            "yordamida amalga oshiriladi.",
        },
        {
          t: "p",
          text:
            "1.2. To'lov valyutasi — O'zbekiston Respublikasi so'mi (UZS). Boshqa valyutada to'lov qabul qilinmaydi.",
        },
        {
          t: "p",
          text:
            "1.3. Karta ma'lumotlari (raqam, amal qilish muddati, CVV) CLICK ning himoyalangan " +
            "sahifasida kiritiladi. Ushbu ma'lumotlar Paylinker serverlariga uzatilmaydi va " +
            "Paylinker tomonidan saqlanmaydi.",
        },
        {
          t: "p",
          text:
            "1.4. Naqd pul, bank o'tkazmasi yoki boshqa usullar hozirda qabul qilinmaydi. " +
            "Yuridik shaxslar uchun to'lov shartlarini alohida kelishish mumkin — aloqa bo'limiga murojaat qiling.",
        },
      ],
    },
    {
      n: "2",
      title: "To'lov qanday amalga oshiriladi",
      blocks: [
        {
          t: "p",
          text:
            "Paylinkerda to'lov ikki bosqichli: avval Hisob (balans) to'ldiriladi, so'ngra shu " +
            "mablag' hisobidan Obuna faollashtiriladi. Bu Buyurtmachiga bir marta to'ldirib, " +
            "keyin bir nechta saytga obuna ochish imkonini beradi.",
        },
        {
          t: "ol",
          items: [
            "Shaxsiy kabinetga kiring va «Hisobni to'ldirish» bo'limini oching.",
            "To'ldirish summasini tanlang yoki o'zingiz kiriting.",
            "«To'lash» tugmasini bosing — CLICK ning himoyalangan sahifasiga o'tasiz.",
            "Karta ma'lumotlarini kiriting va bankdan kelgan tasdiqlash kodini tasdiqlang.",
            "To'lov muvaffaqiyatli bo'lsa, summa bir necha soniya ichida Hisobingizga tushadi.",
            "«Saytlarim» bo'limida kerakli saytni tanlab, Obuna muddatini (6 yoki 12 oy) faollashtiring — narx Hisobdan yechiladi.",
          ],
        },
        {
          t: "note",
          text:
            "Obuna faollashtirilgan zahoti sayt chop etiladi va paylinker.uz/nomingiz manzilida ochiladi.",
        },
      ],
    },
    {
      n: "3",
      title: "Summa chegaralari va komissiya",
      blocks: [
        {
          t: "table",
          head: ["Ko'rsatkich", "Qiymat"],
          rows: [
            ["Bir martalik eng kam to'ldirish", "1 000 so'm"],
            ["Bir martalik eng ko'p to'ldirish", "100 000 000 so'm"],
            ["Valyuta", "O'zbekiston so'mi (UZS)"],
            ["Paylinker komissiyasi", "olinmaydi"],
            ["Hisobdagi mablag'ga foiz", "hisoblanmaydi"],
          ],
        },
        {
          t: "p",
          text:
            "3.1. Paylinker to'lov uchun qo'shimcha komissiya olmaydi. To'lov tizimi yoki karta " +
            "chiqargan bank o'z tariflariga muvofiq komissiya undirishi mumkin — bu haqda to'lov " +
            "sahifasida ma'lumot beriladi.",
        },
        {
          t: "p",
          text:
            "3.2. Xizmat narxlari Platformaning «Tariflar» bo'limida e'lon qilinadi va to'lovdan " +
            "oldin Shaxsiy kabinetda ko'rsatiladi.",
        },
      ],
    },
    {
      n: "4",
      title: "To'lovning tasdiqlanishi",
      blocks: [
        {
          t: "p",
          text:
            "4.1. To'lov amalga oshirilgach, Hisobdagi qoldiq Shaxsiy kabinetda darhol yangilanadi. " +
            "Barcha to'lovlar tarixi «Hisob» bo'limida ko'rinadi.",
        },
        {
          t: "p",
          text:
            "4.2. To'lov haqidagi elektron kvitansiya CLICK tomonidan taqdim etiladi (ilova yoki SMS orqali).",
        },
        {
          t: "p",
          text:
            "4.3. Agar karta hisobidan mablag' yechilgan, lekin Hisobga tushmagan bo'lsa — " +
            "odatda bu 24 soat ichida avtomatik hal bo'ladi. Hal bo'lmasa, to'lov sanasi, summasi " +
            "va CLICK tranzaksiya raqamini ko'rsatib bizga murojaat qiling.",
        },
      ],
    },
    {
      n: "5",
      title: "Pul qaytarish asoslari",
      blocks: [
        {
          t: "p",
          text:
            "5.1. Faollashtirilgan Obuna uchun to'langan mablag' qaytarilmaydi — xizmat faollashtirilgan " +
            "paytdan boshlab ko'rsatila boshlanadi va natijasi (chop etilgan sayt) darhol taqdim etiladi.",
        },
        { t: "p", text: "5.2. Mablag' quyidagi hollarda qaytariladi:" },
        {
          t: "ul",
          items: [
            "**Texnik nosozlik** — Paylinker aybi bilan sayt uzluksiz 24 soatdan ortiq ochilmagan bo'lsa. Buyurtmachi tanlovi bo'yicha obuna muddati uzaytiriladi yoki mos keluvchi qism qaytariladi.",
            "**Sarflanmagan balans** — Hisobda qolgan va hech qanday obunaga sarflanmagan mablag' ariza bo'yicha qaytariladi.",
            "**Ikki marta yechilgan to'lov** — texnik xato tufayli bir xil summa ikki marta yechilgan bo'lsa, ortiqchasi to'liq qaytariladi.",
            "**Qonun hujjatlarida nazarda tutilgan boshqa hollar.**",
          ],
        },
        { t: "p", text: "5.3. Mablag' quyidagi hollarda qaytarilmaydi:" },
        {
          t: "ul",
          items: [
            "Buyurtmachi fikridan qaytgani yoki xizmatdan foydalanmagani sababli (obuna faollashtirilgandan keyin);",
            "Ommaviy oferta shartlari buzilgani uchun sayt to'xtatilgan bo'lsa;",
            "sayt Buyurtmachining o'z xatosi tufayli (noto'g'ri kontent, o'chirib yuborish) ishlamay qolgan bo'lsa;",
            "internet-provayder yoki Buyurtmachi qurilmasidagi nosozlik tufayli sayt ochilmagan bo'lsa.",
          ],
        },
      ],
    },
    {
      n: "6",
      title: "Qaytarish uchun ariza berish tartibi",
      blocks: [
        {
          t: "p",
          text:
            "6.1. Ariza erkin shaklda, elektron pochta orqali yuboriladi. Arizada quyidagilar ko'rsatiladi:",
        },
        {
          t: "ol",
          items: [
            "Buyurtmachining F.I.Sh. va ro'yxatdan o'tgan telefon raqami;",
            "qaytarish so'ralayotgan summa;",
            "to'lov sanasi va CLICK tranzaksiya raqami (mavjud bo'lsa);",
            "qaytarish sababi;",
            "mablag' qaytarilishi kerak bo'lgan karta raqamining oxirgi 4 raqami.",
          ],
        },
        {
          t: "p",
          text: `6.2. Ariza quyidagi manzilga yuboriladi: ${COMPANY.email}`,
        },
        {
          t: "p",
          text:
            "6.3. Ariza 10 (o'n) ish kuni ichida ko'rib chiqiladi. Qo'shimcha tekshiruv talab " +
            "etilsa, Buyurtmachiga bu haqda xabar beriladi.",
        },
        {
          t: "p",
          text:
            "6.4. Ijobiy hal qilingan taqdirda mablag' to'lov amalga oshirilgan usul orqali, " +
            "ya'ni o'sha bank kartasiga qaytariladi. Boshqa kartaga yoki naqd shaklda qaytarilmaydi.",
        },
        {
          t: "p",
          text:
            "6.5. Mablag'ning kartaga tushishi banklar o'rtasidagi hisob-kitob muddatiga bog'liq " +
            "va qo'shimcha 3–10 ish kunini olishi mumkin.",
        },
        {
          t: "warn",
          text:
            "Bank kartasini yo'qotgan yoki uning muddati tugagan bo'lsa, arizada buni albatta " +
            "ko'rsating — qaytarish tartibi alohida kelishiladi.",
        },
      ],
    },
    {
      n: "7",
      title: "Obunani bekor qilish",
      blocks: [
        {
          t: "p",
          text:
            "7.1. Paylinkerda avtomatik takroriy to'lov (avtoto'lov) yo'q. Obuna muddati tugagach " +
            "o'z-o'zidan uzaytirilmaydi va kartadan mablag' yechilmaydi.",
        },
        {
          t: "p",
          text:
            "7.2. Obunani davom ettirmaslik uchun hech qanday harakat talab etilmaydi — muddat " +
            "tugagach sayt avtomatik to'xtatiladi.",
        },
        {
          t: "p",
          text:
            "7.3. Saytni istalgan vaqtda Shaxsiy kabinetdan o'chirish mumkin. Bu holatda " +
            "to'langan obuna qaytarilmaydi (5.3-band).",
        },
      ],
    },
    {
      n: "8",
      title: "Murojaat",
      blocks: [
        {
          t: "table",
          head: ["Kanal", "Ma'lumot"],
          rows: [
            ["Elektron pochta", COMPANY.email],
            ["Telefon", COMPANY.phone],
            ["Telegram", "@paylinker_support"],
            ["Ish vaqti", SUPPORT_HOURS_UZ],
            ["Javob berish muddati", "1 ish kuni (murakkab holatlarda — 3 ish kuni)"],
          ],
        },
      ],
    },
  ],
};

export const TOLOV_RU: LegalDoc = {
  title: "Оплата и возврат средств",
  subtitle: "Способы оплаты, порядок расчётов и условия возврата",
  updated: `Последняя редакция: ${OFERTA_DATE_RU}`,
  intro: [
    {
      t: "p",
      text:
        "Настоящий раздел является неотъемлемой частью Публичной оферты и подробно разъясняет, " +
        "как производятся платежи на платформе Paylinker и в каких случаях возвращаются средства.",
    },
  ],
  sections: [
    {
      n: "1",
      title: "Способы оплаты",
      blocks: [
        {
          t: "p",
          text:
            "1.1. Оплата производится через платёжную систему CLICK банковскими картами, " +
            "поддерживаемыми данной системой.",
        },
        {
          t: "p",
          text: "1.2. Валюта платежа — сум Республики Узбекистан (UZS). Оплата в иной валюте не принимается.",
        },
        {
          t: "p",
          text:
            "1.3. Данные карты (номер, срок действия, CVV) вводятся на защищённой странице CLICK. " +
            "Эти данные не передаются на серверы Paylinker и не хранятся Paylinker.",
        },
        {
          t: "p",
          text:
            "1.4. Наличные, банковский перевод и иные способы в настоящее время не принимаются. " +
            "Для юридических лиц условия оплаты могут быть согласованы отдельно — обратитесь в поддержку.",
        },
      ],
    },
    {
      n: "2",
      title: "Как происходит оплата",
      blocks: [
        {
          t: "p",
          text:
            "Оплата в Paylinker двухэтапная: сначала пополняется Счёт (баланс), затем за счёт этих " +
            "средств активируется Подписка. Это позволяет пополнить один раз и открыть подписку для нескольких сайтов.",
        },
        {
          t: "ol",
          items: [
            "Войдите в Личный кабинет и откройте раздел «Пополнение счёта».",
            "Выберите сумму пополнения или введите свою.",
            "Нажмите «Оплатить» — откроется защищённая страница CLICK.",
            "Введите данные карты и подтвердите код, присланный банком.",
            "При успешной оплате сумма зачисляется на Счёт в течение нескольких секунд.",
            "В разделе «Мои сайты» выберите сайт и активируйте Подписку (6 или 12 месяцев) — стоимость спишется со Счёта.",
          ],
        },
        {
          t: "note",
          text: "Сразу после активации Подписки сайт публикуется и открывается по адресу paylinker.uz/ваше-имя.",
        },
      ],
    },
    {
      n: "3",
      title: "Лимиты сумм и комиссия",
      blocks: [
        {
          t: "table",
          head: ["Показатель", "Значение"],
          rows: [
            ["Минимальное разовое пополнение", "1 000 сум"],
            ["Максимальное разовое пополнение", "100 000 000 сум"],
            ["Валюта", "сум Узбекистана (UZS)"],
            ["Комиссия Paylinker", "не взимается"],
            ["Проценты на остаток Счёта", "не начисляются"],
          ],
        },
        {
          t: "p",
          text:
            "3.1. Paylinker не взимает дополнительную комиссию. Платёжная система или банк-эмитент " +
            "могут удержать комиссию согласно своим тарифам — информация об этом отображается на странице оплаты.",
        },
        {
          t: "p",
          text:
            "3.2. Стоимость услуг публикуется в разделе «Тарифы» и отображается в Личном кабинете до оплаты.",
        },
      ],
    },
    {
      n: "4",
      title: "Подтверждение платежа",
      blocks: [
        {
          t: "p",
          text:
            "4.1. После проведения платежа остаток Счёта сразу обновляется в Личном кабинете. " +
            "История всех платежей доступна в разделе «Счёт».",
        },
        { t: "p", text: "4.2. Электронную квитанцию предоставляет CLICK (в приложении или по SMS)." },
        {
          t: "p",
          text:
            "4.3. Если средства списаны с карты, но не зачислены на Счёт — обычно это решается " +
            "автоматически в течение 24 часов. Если нет, обратитесь к нам, указав дату, сумму " +
            "и номер транзакции CLICK.",
        },
      ],
    },
    {
      n: "5",
      title: "Основания для возврата",
      blocks: [
        {
          t: "p",
          text:
            "5.1. Средства за активированную Подписку не возвращаются — услуга начинает оказываться " +
            "с момента активации, а её результат (опубликованный сайт) предоставляется немедленно.",
        },
        { t: "p", text: "5.2. Средства возвращаются в следующих случаях:" },
        {
          t: "ul",
          items: [
            "**Технический сбой** — если по вине Paylinker сайт был недоступен непрерывно более 24 часов. По выбору Заказчика срок подписки продлевается или возвращается соответствующая часть.",
            "**Неизрасходованный баланс** — средства, оставшиеся на Счёте и не потраченные на подписку, возвращаются по заявлению.",
            "**Двойное списание** — при техническом сбое, повлёкшем повторное списание, излишек возвращается полностью.",
            "**Иные случаи, предусмотренные законодательством.**",
          ],
        },
        { t: "p", text: "5.3. Средства не возвращаются, если:" },
        {
          t: "ul",
          items: [
            "Заказчик передумал или не воспользовался услугой (после активации подписки);",
            "сайт приостановлен за нарушение условий Публичной оферты;",
            "сайт перестал работать из-за действий самого Заказчика (некорректный контент, удаление);",
            "сайт был недоступен из-за сбоя у интернет-провайдера или на устройстве Заказчика.",
          ],
        },
      ],
    },
    {
      n: "6",
      title: "Порядок подачи заявления на возврат",
      blocks: [
        { t: "p", text: "6.1. Заявление подаётся в свободной форме по электронной почте и должно содержать:" },
        {
          t: "ol",
          items: [
            "Ф.И.О. Заказчика и номер телефона, указанный при регистрации;",
            "сумму, подлежащую возврату;",
            "дату платежа и номер транзакции CLICK (при наличии);",
            "причину возврата;",
            "последние 4 цифры номера карты, на которую следует вернуть средства.",
          ],
        },
        { t: "p", text: `6.2. Заявление направляется по адресу: ${COMPANY.email}` },
        {
          t: "p",
          text:
            "6.3. Заявление рассматривается в течение 10 (десяти) рабочих дней. При необходимости " +
            "дополнительной проверки Заказчик уведомляется отдельно.",
        },
        {
          t: "p",
          text:
            "6.4. При положительном решении средства возвращаются тем же способом, то есть на ту же " +
            "банковскую карту. Возврат на другую карту или наличными не производится.",
        },
        {
          t: "p",
          text:
            "6.5. Зачисление на карту зависит от сроков межбанковских расчётов и может занять " +
            "дополнительно 3–10 рабочих дней.",
        },
        {
          t: "warn",
          text:
            "Если карта утеряна или срок её действия истёк — обязательно укажите это в заявлении, " +
            "порядок возврата согласуется отдельно.",
        },
      ],
    },
    {
      n: "7",
      title: "Отмена подписки",
      blocks: [
        {
          t: "p",
          text:
            "7.1. В Paylinker нет автоматических повторных списаний (автоплатежа). По истечении " +
            "срока подписка не продлевается автоматически и средства с карты не списываются.",
        },
        {
          t: "p",
          text:
            "7.2. Чтобы не продлевать подписку, никаких действий не требуется — по окончании срока " +
            "сайт приостанавливается автоматически.",
        },
        {
          t: "p",
          text:
            "7.3. Сайт можно удалить в Личном кабинете в любое время. Оплаченная подписка " +
            "при этом не возвращается (пункт 5.3).",
        },
      ],
    },
    {
      n: "8",
      title: "Контакты",
      blocks: [
        {
          t: "table",
          head: ["Канал", "Данные"],
          rows: [
            ["Электронная почта", COMPANY.email],
            ["Телефон", COMPANY.phone],
            ["Telegram", "@paylinker_support"],
            ["Время работы", SUPPORT_HOURS_RU],
            ["Срок ответа", "1 рабочий день (в сложных случаях — 3 рабочих дня)"],
          ],
        },
      ],
    },
  ],
};
