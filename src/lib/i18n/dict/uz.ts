/**
 * O'zbekcha lug'at — asosiy manba. `Dict` turi shundan olinadi, shuning
 * uchun ruscha lug'atda bitta kalit ham tushib qolsa build xato beradi.
 */
export const uz = {
  common: {
    language: "Til",
    homeAria: "bosh sahifa",
    som: "so'm",
    error: "Xatolik",
    loading: "Yuklanmoqda…",
  },

  meta: {
    title: "15 daqiqada biznes saytingizni yarating",
    description:
      "O'zbekistondagi kichik va o'rta biznes uchun oson va qulay sayt yaratish platformasi. Shablon tanlang, matnni tahrirlang va saytingiz tayyor.",
    ogDescription:
      "Dasturchisiz va dizaynersiz o'z biznes saytingizni yarating. 10 kun bepul sinov.",
    login: "Kirish",
    loginDescription: "Telegram orqali tezkor kirish",
  },

  nav: {
    features: "Imkoniyatlar",
    how: "Qanday ishlaydi",
    templates: "Shablonlar",
    pricing: "Tariflar",
    faq: "Savollar",
    docs: "Hujjatlar",
    login: "Kirish",
    ariaMain: "Asosiy navigatsiya",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
  },

  legalLinks: {
    oferta: "Ommaviy oferta",
    tolov: "To'lov va pul qaytarish",
    xavfsizlik: "Xavfsizlik",
  },

  hero: {
    badge: "Vizitka va landing — bir platformada",
    titleAccent: "15 daqiqada",
    titleRest: "biznes saytingizni yarating",
    lead: "Dasturchisiz va dizaynersiz. Shablon tanlang, matn yozing — tayyor.",
    start: "Boshlash",
    demo: "Namunani ko'rish",
    points: ["Dasturchisiz", "Mobilga mos", "10 kun bepul"],
    trust: "Karta ma'lumotisiz · Istalgan vaqtda bekor qilish",
  },

  products: {
    eyebrow: "Ikki xil sayt",
    title: "Biznesingizga qaysi biri mos?",
    description: (domain: string) =>
      `Ikkalasi ham bir xil tahrirlagichda quriladi va ${domain}/nomingiz manzilida ochiladi.`,
    vizitka: {
      eyebrow: "Bir ekranli",
      name: "Vizitka",
      lead: "Telefon, manzil va ijtimoiy tarmoqlar — bitta qulay sahifada. Mijoz bosadi va darhol bog'lanadi.",
      points: [
        "7 ta tayyor shablon",
        "Telefon, manzil, ish vaqti",
        "Instagram, Telegram, TikTok, YouTube, Facebook",
        "Xarita va QR kod",
      ],
      cta: "Vizitka yaratish",
    },
    landing: {
      eyebrow: "Ko'p bo'limli",
      name: "Landing",
      lead: "To'liq brend sahifasi: xizmatlar, narxlar, galereya va aloqa formasi — biznesingizni to'liq ko'rsating.",
      points: [
        "Vizitkadagi barcha imkoniyatlar",
        "Xizmatlar va narxlar jadvali",
        "Galereya, xususiyatlar, statistika",
        "Savol-javob va aloqa formasi",
      ],
      cta: "Landing yaratish",
    },
  },

  features: {
    eyebrow: "Imkoniyatlar",
    title: "Sayt uchun kerak bo'ladigan hammasi",
    description:
      "Dasturchi, dizayner, hosting va domen — hech biri kerak emas. Hammasi platformaning ichida.",
    items: {
      address: {
        title: "O'z manzilingiz",
        body: (domain: string) =>
          `Sayt ${domain}/nomingiz manzilida ochiladi. Domen sotib olish yoki hosting sozlash shart emas.`,
      },
      telegram: {
        title: "Telegram orqali kirish",
        body: "Parol o'ylab topish va eslab qolish kerak emas — telefon raqam va botdan kelgan kod yetarli.",
      },
      themes: {
        title: "16 rang temasi",
        body: "8 ta yorug', 8 ta to'q tema va 6 xil fon naqshi. Bir bosishda butun sayt ko'rinishi o'zgaradi.",
      },
      mobile: {
        title: "Mobilga mos",
        body: "Mijozlarning ko'pchiligi telefondan kiradi. Har bir shablon avval telefon ekrani uchun ishlangan.",
      },
      qr: {
        title: "QR kod",
        body: "Saytingizning QR kodini yuklab oling — menyu, vizitka kartochkasi yoki afishaga chop eting.",
      },
      inbox: {
        title: "Aloqa so'rovlari",
        body: "Landing saytdagi formani to'ldirgan mijoz so'rovi to'g'ridan-to'g'ri Telegram botingizga tushadi.",
      },
      map: {
        title: "Xarita va ish vaqti",
        body: "Manzil xaritada, ish vaqti jadvalda. Mijoz qayerga borishini va qachon ochiqligini darrov ko'radi.",
      },
      click: {
        title: "CLICK orqali to'lov",
        body: "Obunani kabinetdan CLICK orqali to'laysiz. Karta ma'lumotlari Paylinkerda saqlanmaydi.",
      },
    },
  },

  how: {
    eyebrow: "Qanday ishlaydi",
    title: "To'rt qadam — taxminan 15 daqiqa",
    description: "Ro'yxatdan o'tishdan chop etishgacha. Hech qanday texnik sozlama yo'q.",
    steps: [
      {
        title: "Telegram orqali kiring",
        body: "Telefon raqamingizni kiriting, botdan kelgan 6 xonali kodni yozing. Parol kerak emas.",
      },
      {
        title: "Shablon tanlang",
        body: "Vizitka uchun 7 ta, landing uchun 3 ta shablon. Rang temasi va fon naqshini bir bosishda almashtirasiz.",
      },
      {
        title: "Matn va rasm yozing",
        body: "Tahrirlagichda o'zgartirishni darhol telefon ekrani ko'rinishida ko'rasiz. Saqlash tugmasi bir joyda.",
      },
      {
        title: "Chop eting",
        body: "Sayt {domain}/nomingiz manzilida ochiladi. Havolani ulashing yoki QR kodni chop eting.",
      },
    ],
  },

  templates: {
    eyebrow: "Shablonlar",
    title: "10 ta tayyor shablon",
    description:
      "Har birini 16 rang temasi va 6 fon naqshi bilan o'zgartirasiz — tanlov yuzlab ko'rinishga yetadi.",
    vizitkaHeading: "Vizitka · 7 ta",
    landingHeading: "Landing · 3 ta",
    vizitka: {
      minimal: "Ism, telefon va ijtimoiy tarmoqlar — faqat asosiy",
      linktree: "Ustma-ust tugmalar — barcha havola bir ustunda",
      socialWall: "To'rtta katta kontakt tile — bosish uchun qulay",
      dark: "Qora fon, markazlashgan minimal ko'rinish",
      card: "Markazda klassik biznes kartasi",
      polaroid: "Aylangan polaroid — rasm va lenta",
      ticket: "Chipta uslubidagi kesma chekka",
    },
    landing: {
      default: "Hero, xizmatlar, galereya, FAQ va aloqa — to'liq tuzilma",
      simple: "Qisqa va tinch: hero, tavsif va kontakt",
      marketing: "Xususiyatlar, statistika va kuchli chaqiruvga urg'u",
    },
    demoTitle: "Jonli namunani ko'ring",
    demoBody: "Choyxona misolida to'liq landing sahifa qanday chiqishini ko'rib chiqing.",
    demoCta: "Namunani ochish",
  },

  pricing: {
    eyebrow: "Tariflar",
    title: "Oddiy va tushunarli",
    subtitle: (days: number) =>
      `${days} kun bepul. Karta ma'lumotisiz. Istalgan vaqtda bekor qiling.`,
    recommended: "Tavsiya",
    choose: "Tanlash",
    months6: "· 6 oy",
    months12: "· 12 oy",
    perMonth: (sum: string) => `≈ ${sum} so'm/oy (6 oy paketi)`,
    packagesNote: "6 oy va 1 yil paketlari",
    vizitka: {
      name: "Vizitka",
      tagline: "Bir ekranli biznes kartasi",
      features: [
        "1 ekranli sayt",
        "Telefon, manzil, ijtimoiy tarmoq linklari",
        "Mobil telefonda mukammal",
      ],
    },
    landing: {
      name: "Landing",
      tagline: "Bir nechta bo'limli sayt",
      features: [
        "Vizitka tarifidagi barchasi",
        "Xizmatlar va narxlar jadvali",
        "Aloqa formasi (Telegram bot)",
        "Galereya va sharhlar",
      ],
    },
  },

  faq: {
    eyebrow: "Savol-javob",
    title: "Ko'p so'raladigan savollar",
    notFound: "Javob topmadingizmi?",
    writeUs: "Telegramda yozing",
    items: [
      {
        q: "Dasturlash yoki dizayn bilimi kerakmi?",
        a: "Yo'q. Shablon tanlaysiz, matnni yozasiz va rasm yuklaysiz — qolganini platforma qiladi. Kod yozish yoki dizayn dasturlari bilan ishlash talab qilinmaydi.",
      },
      {
        q: "Domen va hosting sotib olishim kerakmi?",
        a: "Kerak emas. Sayt {domain}/nomingiz manzilida ochiladi — nomni o'zingiz tanlaysiz, agar band bo'lmasa.",
      },
      {
        q: "Qanday ro'yxatdan o'taman?",
        a: "Telefon raqamingizni kiritasiz, Telegram botimiz 6 xonali kod yuboradi, shu kodni yozasiz. Parol o'ylab topish shart emas.",
      },
      {
        q: "Bepul sinash mumkinmi?",
        a: "Ha. Yangi sayt 10 kun bepul ochiq turadi va bunda karta ma'lumotlari so'ralmaydi. Yoqsa obunani davom ettirasiz.",
      },
      {
        q: "To'lovni qanday amalga oshiraman?",
        a: "Kabinetdagi hisobni CLICK orqali to'ldirasiz va obunani shundan uzaytirasiz. Karta ma'lumotlari Paylinkerda saqlanmaydi — to'lov CLICK tomonida bo'ladi.",
      },
      {
        q: "Saytni keyin o'zgartira olamanmi?",
        a: "Ha, istalgan vaqtda. Matn, rasm, rang temasi va hatto shablonni ham almashtirishingiz mumkin — o'zgarish darhol jonli saytda ko'rinadi.",
      },
      {
        q: "Obuna tugasa nima bo'ladi?",
        a: "Sayt vaqtincha to'xtatiladi va manzilga kirgan odam eslatma sahifasini ko'radi. Ma'lumotlaringiz saqlanib qoladi — obunani yangilaganingizda sayt o'sha holatida qayta ishga tushadi.",
      },
      {
        q: "Vizitka bilan Landing orasidagi farq nima?",
        a: "Vizitka — bir ekranli kontakt sahifasi: telefon, manzil, ijtimoiy tarmoqlar. Landing — ko'p bo'limli sayt: xizmatlar va narxlar, galereya, savol-javob va aloqa formasi ham bo'ladi.",
      },
    ],
  },

  cta: {
    title: "Bugun boshlang — 10 kun bepul",
    lead: "Karta ma'lumotisiz. Yoqmasa hech narsa to'lamaysiz.",
    primary: "Saytimni yaratish",
    secondary: "Namunani ko'rish",
  },

  footer: {
    about:
      "O'zbekistondagi kichik va o'rta biznes uchun vizitka va landing sayt yaratish platformasi.",
    colPage: "Sahifa",
    colProduct: "Mahsulot",
    colDocs: "Hujjatlar",
    colContact: "Aloqa",
    vizitka: "Vizitka",
    landing: "Landing",
    demo: "Namuna",
    login: "Kirish",
    support: "Telegram yordam",
    aria: "Footer",
  },

  login: {
    title: "Kirish",
    subtitle: "Telegram bot — tezkor kirish",
    phone: "Telefon raqam",
    continue: "Davom etish",
    agreePrefix: "Men",
    agreeOferta: "Ommaviy oferta",
    agreeTolov: "To'lov va pul qaytarish",
    agreeSuffix:
      "shartlari bilan tanishdim va ularni qabul qilaman hamda shaxsga doir ma'lumotlarim qayta ishlanishiga rozilik bildiraman.",
    openBot: "O'ngdagi tugma orqali botni oching va yozing:",
    codeLabel: "6 xonali kod",
    enter: "Kirish",
    codeHintBefore: "Kod 2 daqiqagacha. Telegramdagi",
    codeHintRefresh: "Kodni yangilash",
    codeHintAfter: "orqali yangilaysiz.",
    otherNumber: "Boshqa raqam",
    errCode6: "6 xonali kodni kiriting",
    errCodeWrong: "Kod yoki muddati noto'g'ri",
  },

  legal: {
    back: "Bosh sahifa",
    contents: "Mundarija",
    docs: "Hujjatlar",
    todo: "To'ldirilishi kerak",
  },

  testAccess: {
    entering: "Test hisobga kirilmoqda…",
    invalid: "Havola yaroqsiz yoki test kirish o'chirilgan.",
    missing: "Havolada kirish kaliti yo'q.",
    toLogin: "Kirish sahifasiga",
  },

  dash: {
    nav: {
      home: "Bosh sahifa",
      sites: "Saytlarim",
      inbox: "Aloqa so'rovlari",
      billing: "To'lov va obuna",
      settings: "Sozlamalar",
      aria: "Kabinet navigatsiyasi",
      menuAria: "Kabinet menyusi",
    },
    pages: {
      breadcrumb: "Kabinet",
      home: "Bosh sahifa",
      newSite: "Yangi sayt",
      billing: "To'lov va obuna",
      sites: "Saytlarim",
      inbox: "Aloqa so'rovlari",
      settings: "Sozlamalar",
    },
    soon: {
      badge: "Tez orada",
      home: "Bosh sahifaga",
      inboxTitle: "Telegram orqali so'rovlar",
      inboxDesc:
        "Mijozlaringiz aloqa formasiga yozgan har bir xabar to'g'ridan-to'g'ri Telegram botingizga tushadi. Shu yerda ro'yxat holatida ham ko'rsatamiz.",
      inboxHint: "Telegram bot ulanishi keyingi bosqichda tayyor bo'ladi.",
      settingsTitle: "Hisob sozlamalari",
      settingsDesc: "Shaxsiy ma'lumotlar, xavfsizlik va bildirishnomalar.",
    },
    user: {
      client: "Mijoz",
      balance: "Balans +",
      support: "Yordam",
      profile: "Profil",
      logout: "Chiqish",
      openProfile: "Profil menyusini ochish",
      closeProfile: "Profil menyusini yopish",
    },
    wallet: {
      newSite: "Yangi sayt",
      newSiteAria: "Yangi sayt yaratish",
    },
    gate: {
      network:
        "API serveriga ulanib bo'lmadi (tarmoq yoki server hali yoqilmagan). Bir oz kutib, sahifani yangilang.",
      unexpected: "Server javobi kutilmagandek. Keyinroq qayta urinib ko'ring.",
      reload: "Sahifani yangilash",
    },
    overview: {
      sites: "Saytlar",
      published: "Nashr qilingan",
      services: "Xizmatlar",
      subLeft: "Obuna qolgan",
      expired: "Tugagan",
      days: (n: number) => `${n} kun`,
      lastEdited: "Oxirgi tahrirlangan",
      view: "Ko'rish",
      edit: "Tahrirlash",
      quickNew: "Yangi sayt yaratish",
      quickNewHint: "Vizitka yoki Landing",
      quickManage: "Saytlarimni boshqarish",
      quickManageHint: (n: number) => `${n} ta sayt`,
      quickInbox: "Aloqa so'rovlari",
      quickInboxHint: "Telegram'ga yuboriladi",
      emptyTitle: "Birinchi saytingizni yarating",
      emptyBody:
        "15 daqiqada oddiy vizitka yoki kengaytirilgan landing sahifani ishga tushiring. 10 kun bepul sinov davri ochiladi.",
      emptyCta: "Yangi sayt yaratish",
      trialEyebrow: "Bepul sinov",
      trialBody:
        "Sinov davomida barcha imkoniyatlar ochiq. Yoqsa — CLICK orqali to'laysiz, yoqmasa — hech narsa.",
      trialCta: "To'lovni sozlash",
    },
    list: {
      all: "Hammasi",
      vizitka: "Vizitka",
      landing: "Landing",
      filterAria: "Sayt turini filtrlash",
      emptyTitle: "Hozircha saytlar yo'q",
      emptyBody:
        "Vizitka yoki landing yarating — barchasi shu yerda ro'yxatda ko'rinadi va istalgan vaqtda tahrirlashingiz mumkin.",
      newSite: "Yangi sayt",
      landingEditor: "Landing tahriri",
      noVizitka: "Hozircha vizitka yo'q",
      noVizitkaBefore: "Yangi vizitka yoki boshqa turdagi saytlarni ko'rish uchun",
      noLanding: "Hozircha landing yo'q",
      noLandingBefore: "Landing yarating yoki",
      pickAllAfter: "ni tanlang.",
      newSiteCard: "Yangi sayt yaratish",
      newSiteCardHint: "Vizitka yoki Landing",
    },
    card: {
      tariff: "Tarif",
      type: "Tur",
      last: "Oxirgi",
      sub: "Obuna",
      days: (n: number) => `${n} kun`,
      expired: "Tugagan",
      close: "Yopish",
      extend: "Obunani uzaytirish",
      draft: "Qoralama",
      published: "Nashrda",
      paused: "Pauza",
      moreActions: "Qo'shimcha amallar",
      qr: "QR yuklash",
      duplicate: "Nusxa olish",
      delete: "O'chirish",
      cancel: "Bekor qilish",
      deleteSiteTitle: "Saytni o'chirish",
      deleteSiteBody:
        "butunlay o'chiriladi. Bu amaldan keyin ma'lumotlarni qayta tiklab bo'lmaydi.",
      deleteLandingTitle: "Landingni o'chirish",
      deleteLandingBody:
        "bazadan olib tashlanadi. Keyin bu manzilni boshqa sayt olishi mumkin.",
      deleting: "O'chirilmoqda…",
      confirmDelete: "Ha, o'chirish",
      deleteError: "O'chirishda xato yuz berdi. Qayta urinib ko'ring.",
      edit: "Tahrirlash",
      view: "Ko'rish",
      today: "bugun",
      yesterday: "kecha",
      daysAgo: (n: number) => `${n} kun oldin`,
      weeksAgo: (n: number) => `${n} hafta oldin`,
      monthsAgo: (n: number) => `${n} oy oldin`,
    },
    topup: {
      eyebrow: "To'lov tizimi",
      lead: "Balansni bank kartasi orqali to'ldiring — xavfsiz va tezkor.",
      current: "Joriy balans",
      noteBefore: "Summani kiriting yoki tezkor tanlovni bosing. Keyin",
      noteAfter: "sahifasida to'lovni yakunlaysiz (kartani shu yerda tanlaysiz).",
      amount: "Summa (so'm)",
      sending: "Jo'natilmoqda…",
      go: "CLICK ga o'tish",
      min: (n: string) => `Kamida ${n} so'm.`,
      createError: "To'lov yaratishda xato",
      unavailable:
        "To'lov tizimi hozircha ulanish bosqichida. Tez orada ishga tushadi.",
    },
    sub: {
      title: "Obuna muddati",
      lead: "Paket tanlang — muddat joriy tugash sanasiga qo'shiladi (CLICK yoki balans).",
      endsAt: "Tugash sanasi",
      expiredOrToday: "Muddati tugagan yoki bugun tugaydi",
      daysLeft: (n: number) => `~${n} kun qoldi`,
      trial: "Sinov muddati",
      recommended: "Tavsiya",
      payClick: "CLICK bilan to'lash",
      redirecting: "Yo'naltirilmoqda…",
      payBalance: "Balansdan uzaytirish",
      checking: "Tekshirilmoqda…",
      extendedBalance: "Obuna muddati uzaytirildi (balansdan).",
      extended: "Obuna muddati uzaytirildi.",
      balanceFail: "Balansdan yechilmadi",
      payFail: "To'lov boshlanmadi",
      m6: "6 oy",
      m12: "1 yil",
      m6Sub: "Ko'pchilik tanlaydi — yumshoq narx va uzoq ishlab turish.",
      m12Sub: "Eng foydali — bir yillik barqaror obuna.",
      perMonth: (sum: string) => `≈ ${sum} so'm/oy`,
    },
  },
};

export type Dict = typeof uz;
