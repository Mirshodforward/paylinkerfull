import { COMPANY, OFERTA_DATE_RU, OFERTA_DATE_UZ } from "./company";
import type { LegalDoc } from "./types";

export const XAVFSIZLIK_UZ: LegalDoc = {
  title: "Xavfsizlik va firibgarlikka qarshi choralar",
  subtitle: "Firibgarlik xavflarini cheklash va nazorat qilish usullari",
  updated: `Oxirgi tahrir: ${OFERTA_DATE_UZ}`,
  intro: [
    {
      t: "p",
      text:
        "Ushbu bo'lim Ommaviy ofertaning ajralmas qismi hisoblanadi. Unda Paylinker firibgarlik " +
        "operatsiyalari xavfini qanday cheklashi va nazorat qilishi bayon etilgan.",
    },
    {
      t: "p",
      text:
        "Choralar Paylinker o'zining texnik vositalari bilan hamda xizmat ko'rsatuvchi bank va " +
        "to'lov tashkiloti bilan tuzilgan shartnomada nazarda tutilgan imkoniyatlardan foydalangan " +
        "holda qo'llaniladi.",
    },
  ],
  sections: [
    {
      n: "1",
      title: "Umumiy yondashuv",
      blocks: [
        {
          t: "p",
          text:
            "1.1. Paylinker to'lov operatsiyalarini o'zi qayta ishlamaydi va bank kartalari " +
            "ma'lumotlarini saqlamaydi. Barcha karta operatsiyalari litsenziyalangan to'lov " +
            "tashkiloti tomonidan amalga oshiriladi.",
        },
        {
          t: "p",
          text:
            "1.2. Shu sababli firibgarlikka qarshi himoya ikki darajada quriladi: to'lov " +
            "tashkiloti va bank darajasida hamda Paylinker platformasining o'z darajasida.",
        },
        {
          t: "p",
          text:
            "1.3. Paylinker bank bilan tuzilgan shartnomada nazarda tutilgan cheklovlarni joriy " +
            "etish orqali bankning firibgarlikka qarshi kurash imkoniyatlaridan foydalanadi.",
        },
      ],
    },
    {
      n: "2",
      title: "To'lov darajasidagi himoya",
      blocks: [
        {
          t: "ul",
          items: [
            "**Karta ma'lumotlari uzatilmaydi.** Karta raqami, amal qilish muddati va CVV faqat to'lov tashkilotining himoyalangan sahifasida kiritiladi. Bu ma'lumotlar Paylinker serverlariga umuman kelmaydi va saqlanmaydi.",
            "**Bank tomonidan tasdiqlash.** To'lov karta chiqargan bank tomonidan qo'shimcha tasdiqlash (bir martalik kod) talab qilinadi.",
            "**Har bir xabarning imzosi tekshiriladi.** To'lov tashkilotidan keladigan har bir tasdiq xabari maxfiy kalit asosidagi kriptografik imzo bilan tekshiriladi. Imzo to'g'ri kelmasa operatsiya rad etiladi — bu soxta tasdiq yuborish yo'lini yopadi.",
            "**Takroriy hisoblanishning oldi olinadi.** Har bir tranzaksiya noyob identifikatorga ega; bir xil tranzaksiya ikki marta hisobga olinmaydi.",
          ],
        },
      ],
    },
    {
      n: "3",
      title: "Amaldagi cheklovlar",
      blocks: [
        {
          t: "p",
          text:
            "Quyidagi cheklovlar platformada texnik jihatdan joriy etilgan va har bir so'rovda avtomatik qo'llanadi:",
        },
        {
          t: "table",
          head: ["Cheklov", "Qiymat", "Maqsadi"],
          rows: [
            ["Bir martalik eng kam to'lov", "1 000 so'm", "Karta sinash (card testing) uchun mayda to'lovlarni cheklash"],
            ["Bir martalik eng ko'p to'lov", "100 000 000 so'm", "Yirik shubhali operatsiyalarni cheklash"],
            ["To'lov yaratish chastotasi", "daqiqasiga 10 ta", "O'g'irlangan kartalarni ketma-ket sinashning oldini olish"],
            ["Kirish kodi so'rovi", "daqiqasiga 5 ta", "SMS/bot spami va raqamlarni sanashning oldini olish"],
            ["Kodni tekshirish urinishlari", "daqiqasiga 10 ta", "6 xonali kodni tanlab topishning (brute-force) oldini olish"],
            ["Umumiy so'rovlar chastotasi", "daqiqasiga 120 ta", "Avtomatlashtirilgan hujumlar va ortiqcha yuklamadan himoya"],
            ["Kirish kodi amal qilish muddati", "2 daqiqa", "O'g'irlangan kodning foydalanish oynasini qisqartirish"],
          ],
        },
        {
          t: "p",
          text:
            "Cheklov oshib ketganda so'rov vaqtincha rad etiladi. Doimiy takrorlanish qayd etiladi " +
            "va qo'lda tekshiruvga olinadi.",
        },
      ],
    },
    {
      n: "4",
      title: "Hisob va kirish xavfsizligi",
      blocks: [
        {
          t: "ul",
          items: [
            "**Parolsiz kirish.** Tizimga kirish telefon raqami va Telegram bot orqali yuborilgan bir martalik kod bilan amalga oshiriladi. Parol saqlanmaydi — demak, parol bazasining sizib chiqishi xavfi yo'q.",
            "**Kod bir martalik.** Har bir kod faqat bir marta ishlatiladi va 2 daqiqadan keyin kuchini yo'qotadi.",
            "**Barcha sahifalar HTTPS orqali.** Ma'lumotlar shifrlangan kanal orqali uzatiladi; HTTP so'rovlari avtomatik HTTPS ga yo'naltiriladi.",
            "**Boshqaruv paneli cheklangan.** Ma'muriy interfeysga faqat oldindan belgilangan ro'yxatdagi hisoblar kira oladi.",
            "**Bot xabarlari tasdiqlanadi.** Telegramdan keladigan har bir xabar maxfiy kalit bilan tekshiriladi — soxta xabar yuborib boshqa foydalanuvchi nomidan kod olish mumkin emas.",
          ],
        },
      ],
    },
    {
      n: "5",
      title: "Monitoring va shubhali operatsiyalar",
      blocks: [
        {
          t: "p",
          text: "5.1. Quyidagi holatlar shubhali deb hisoblanadi va qo'shimcha tekshiruvga olinadi:",
        },
        {
          t: "ul",
          items: [
            "qisqa vaqt ichida bir nechta kartadan to'lov urinishlari;",
            "ketma-ket muvaffaqiyatsiz to'lov urinishlari;",
            "bir hisobga g'ayrioddiy katta summa kiritilishi;",
            "to'lovdan so'ng darhol mablag'ni qaytarishni talab qilish;",
            "bir nechta hisobning bitta karta bilan bog'lanishi;",
            "chargeback (to'lovni qaytarib olish) bo'yicha bankdan murojaat kelishi.",
          ],
        },
        { t: "p", text: "5.2. Shubhali holat aniqlanganda Paylinker quyidagi choralarni qo'llaydi:" },
        {
          t: "ol",
          items: [
            "Operatsiyani to'xtatish yoki bajarilishini kechiktirish.",
            "Hisobni vaqtincha bloklash va obuna faollashtirishni to'xtatib turish.",
            "Foydalanuvchidan operatsiya bo'yicha tushuntirish va shaxsni tasdiqlovchi hujjat so'rash.",
            "Zarur hollarda bank va to'lov tashkilotini xabardor qilish va ular bilan birgalikda tekshiruv o'tkazish.",
            "Firibgarlik tasdiqlansa — hisobni butunlay bloklash va qonunchilikka muvofiq vakolatli organlarga xabar berish.",
          ],
        },
        {
          t: "p",
          text:
            "5.3. Tekshiruv odatda 3 ish kunidan oshmaydi. Shubha tasdiqlanmasa, cheklovlar " +
            "darhol olib tashlanadi va foydalanuvchiga xabar beriladi.",
        },
      ],
    },
    {
      n: "6",
      title: "Foydalanuvchi uchun tavsiyalar",
      blocks: [
        {
          t: "warn",
          text:
            "Paylinker xodimlari hech qachon sizdan karta raqami, CVV kodi yoki bankdan kelgan " +
            "bir martalik kodni so'ramaydi. Bunday so'rov kelsa — bu firibgarlik.",
        },
        {
          t: "ul",
          items: [
            "Kirish kodini hech kimga aytmang, hatto «qo'llab-quvvatlash xizmati» nomidan murojaat qilsa ham.",
            "Telegram akkauntingizga ikki bosqichli tasdiqlashni (2FA) yoqing.",
            "Faqat o'zingizga tegishli bank kartasidan foydalaning.",
            "To'lov faqat paylinker.uz domenidan boshlanishiga e'tibor bering — brauzerdagi manzilni tekshiring.",
            "Shaxsiy kabinetdagi to'lovlar tarixini vaqti-vaqti bilan ko'rib turing.",
            "Umumiy foydalanishdagi kompyuterda ishlaganingizdan so'ng hisobdan chiqing.",
          ],
        },
      ],
    },
    {
      n: "7",
      title: "Shubhali holat haqida xabar berish",
      blocks: [
        {
          t: "p",
          text:
            "Agar hisobingizda siz qilmagan operatsiyani ko'rsangiz yoki Paylinker nomidan shubhali " +
            "xabar olsangiz — darhol bizga murojaat qiling.",
        },
        {
          t: "table",
          head: ["Kanal", "Ma'lumot"],
          rows: [
            ["Elektron pochta", COMPANY.email],
            ["Telefon", COMPANY.phone],
            ["Telegram", "@paylinker_support"],
            ["Javob berish muddati", "shubhali operatsiyalar bo'yicha — 24 soat ichida"],
          ],
        },
        {
          t: "p",
          text:
            "Shu bilan birga kartangizni chiqargan bankka murojaat qilib, kartani bloklashni " +
            "so'rashingizni tavsiya qilamiz.",
        },
      ],
    },
  ],
};

export const XAVFSIZLIK_RU: LegalDoc = {
  title: "Безопасность и противодействие мошенничеству",
  subtitle: "Способы ограничения и контроля рисков мошеннических операций",
  updated: `Последняя редакция: ${OFERTA_DATE_RU}`,
  intro: [
    {
      t: "p",
      text:
        "Настоящий раздел является неотъемлемой частью Публичной оферты и описывает, как Paylinker " +
        "ограничивает и контролирует риски мошеннических операций.",
    },
    {
      t: "p",
      text:
        "Меры применяются как собственными техническими средствами Paylinker, так и с использованием " +
        "возможностей, предусмотренных договором с обслуживающим банком и платёжной организацией.",
    },
  ],
  sections: [
    {
      n: "1",
      title: "Общий подход",
      blocks: [
        {
          t: "p",
          text:
            "1.1. Paylinker не обрабатывает платёжные операции самостоятельно и не хранит данные " +
            "банковских карт. Все карточные операции проводятся лицензированной платёжной организацией.",
        },
        {
          t: "p",
          text:
            "1.2. Поэтому защита от мошенничества строится на двух уровнях: на уровне платёжной " +
            "организации и банка, и на уровне самой платформы Paylinker.",
        },
        {
          t: "p",
          text:
            "1.3. Paylinker использует возможности банка по борьбе с мошенническими операциями " +
            "путём реализации ограничений, предусмотренных договором с банком.",
        },
      ],
    },
    {
      n: "2",
      title: "Защита на уровне платежей",
      blocks: [
        {
          t: "ul",
          items: [
            "**Данные карты не передаются.** Номер карты, срок действия и CVV вводятся только на защищённой странице платёжной организации. Эти данные не поступают на серверы Paylinker и не хранятся.",
            "**Подтверждение банком.** Платёж требует дополнительного подтверждения банком-эмитентом (одноразовый код).",
            "**Проверка подписи каждого сообщения.** Каждое подтверждение от платёжной организации проверяется криптографической подписью на основе секретного ключа. При несовпадении подписи операция отклоняется — это закрывает возможность отправки поддельных подтверждений.",
            "**Защита от повторного зачисления.** Каждая транзакция имеет уникальный идентификатор; одна и та же транзакция не учитывается дважды.",
          ],
        },
      ],
    },
    {
      n: "3",
      title: "Действующие ограничения",
      blocks: [
        {
          t: "p",
          text: "Следующие ограничения технически реализованы на платформе и применяются автоматически к каждому запросу:",
        },
        {
          t: "table",
          head: ["Ограничение", "Значение", "Назначение"],
          rows: [
            ["Минимальный разовый платёж", "1 000 сум", "Ограничение мелких платежей для тестирования карт"],
            ["Максимальный разовый платёж", "100 000 000 сум", "Ограничение крупных подозрительных операций"],
            ["Частота создания платежей", "10 в минуту", "Предотвращение последовательного перебора краденых карт"],
            ["Запрос кода входа", "5 в минуту", "Защита от SMS/бот-спама и перебора номеров"],
            ["Попытки проверки кода", "10 в минуту", "Защита от подбора 6-значного кода (brute-force)"],
            ["Общая частота запросов", "120 в минуту", "Защита от автоматизированных атак и перегрузки"],
            ["Срок действия кода входа", "2 минуты", "Сокращение окна использования перехваченного кода"],
          ],
        },
        {
          t: "p",
          text:
            "При превышении лимита запрос временно отклоняется. Систематические превышения " +
            "фиксируются и берутся на ручную проверку.",
        },
      ],
    },
    {
      n: "4",
      title: "Безопасность учётной записи и входа",
      blocks: [
        {
          t: "ul",
          items: [
            "**Вход без пароля.** Вход выполняется по номеру телефона и одноразовому коду из Telegram-бота. Пароли не хранятся — следовательно, отсутствует риск утечки базы паролей.",
            "**Код одноразовый.** Каждый код используется один раз и теряет силу через 2 минуты.",
            "**Все страницы по HTTPS.** Данные передаются по шифрованному каналу; HTTP-запросы автоматически перенаправляются на HTTPS.",
            "**Панель управления ограничена.** Доступ к административному интерфейсу имеют только учётные записи из заранее заданного списка.",
            "**Сообщения бота проверяются.** Каждое сообщение от Telegram проверяется секретным ключом — отправить поддельное сообщение и получить код от имени другого пользователя невозможно.",
          ],
        },
      ],
    },
    {
      n: "5",
      title: "Мониторинг и подозрительные операции",
      blocks: [
        { t: "p", text: "5.1. Подозрительными считаются и берутся на дополнительную проверку:" },
        {
          t: "ul",
          items: [
            "попытки оплаты с нескольких карт за короткий промежуток времени;",
            "серия неуспешных попыток оплаты подряд;",
            "нетипично крупное пополнение одного счёта;",
            "требование возврата средств сразу после оплаты;",
            "привязка нескольких учётных записей к одной карте;",
            "поступление обращения от банка по chargeback (возвратному платежу).",
          ],
        },
        { t: "p", text: "5.2. При выявлении подозрительной ситуации Paylinker применяет следующие меры:" },
        {
          t: "ol",
          items: [
            "Приостановка операции или отсрочка её исполнения.",
            "Временная блокировка Счёта и приостановка активации подписок.",
            "Запрос у пользователя пояснений по операции и документа, удостоверяющего личность.",
            "При необходимости — уведомление банка и платёжной организации и проведение совместной проверки.",
            "При подтверждении мошенничества — полная блокировка учётной записи и уведомление уполномоченных органов в соответствии с законодательством.",
          ],
        },
        {
          t: "p",
          text:
            "5.3. Проверка обычно занимает не более 3 рабочих дней. Если подозрения не подтвердились, " +
            "ограничения снимаются незамедлительно с уведомлением пользователя.",
        },
      ],
    },
    {
      n: "6",
      title: "Рекомендации пользователю",
      blocks: [
        {
          t: "warn",
          text:
            "Сотрудники Paylinker никогда не запрашивают номер карты, CVV-код или одноразовый код " +
            "из банка. Если такой запрос поступил — это мошенничество.",
        },
        {
          t: "ul",
          items: [
            "Никому не сообщайте код входа, даже если обращаются от имени «службы поддержки».",
            "Включите двухфакторную защиту (2FA) в своём аккаунте Telegram.",
            "Используйте только принадлежащую вам банковскую карту.",
            "Убедитесь, что оплата начинается именно с домена paylinker.uz — проверяйте адрес в браузере.",
            "Периодически просматривайте историю платежей в Личном кабинете.",
            "Выходите из учётной записи после работы на общедоступном компьютере.",
          ],
        },
      ],
    },
    {
      n: "7",
      title: "Сообщить о подозрительной ситуации",
      blocks: [
        {
          t: "p",
          text:
            "Если вы увидели в своём счёте операцию, которую не совершали, либо получили " +
            "подозрительное сообщение от имени Paylinker — немедленно свяжитесь с нами.",
        },
        {
          t: "table",
          head: ["Канал", "Данные"],
          rows: [
            ["Электронная почта", COMPANY.email],
            ["Телефон", COMPANY.phone],
            ["Telegram", "@paylinker_support"],
            ["Срок реакции", "по подозрительным операциям — в течение 24 часов"],
          ],
        },
        {
          t: "p",
          text: "Одновременно рекомендуем обратиться в банк-эмитент вашей карты и заблокировать карту.",
        },
      ],
    },
  ],
};
