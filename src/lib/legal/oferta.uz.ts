import { COMPANY, OFERTA_DATE_UZ, OFERTA_VERSION, SUPPORT_HOURS_UZ } from "./company";
import type { LegalDoc } from "./types";

export const OFERTA_UZ: LegalDoc = {
  title: "Ommaviy oferta",
  subtitle: "Paylinker platformasi xizmatlarini ko'rsatish to'g'risidagi shartnoma",
  updated: `Tahrir ${OFERTA_VERSION} · ${OFERTA_DATE_UZ}`,
  intro: [
    {
      t: "p",
      text:
        `Ushbu hujjat ${COMPANY.formUz} ${COMPANY.nameUz} (keyingi o'rinlarda — «Ijrochi») nomidan ` +
        "har qanday jismoniy yoki yuridik shaxsga (keyingi o'rinlarda — «Buyurtmachi») beriladigan " +
        "rasmiy ommaviy oferta hisoblanadi.",
    },
    {
      t: "p",
      text:
        "Oferta O'zbekiston Respublikasi Fuqarolik kodeksining oferta, aksept va ommaviy shartnoma " +
        "to'g'risidagi qoidalariga muvofiq tuzilgan. Buyurtmachi tomonidan oferta aksept qilinishi " +
        "yozma shaklda tuzilgan shartnomaga tenglashtiriladi.",
    },
    {
      t: "warn",
      text:
        "Iltimos, ro'yxatdan o'tishdan oldin ushbu hujjatni to'liq o'qib chiqing. " +
        "Ro'yxatdan o'tishni yakunlash — oferta shartlari bilan to'liq va so'zsiz roziligingizni bildiradi.",
    },
  ],
  sections: [
    {
      n: "1",
      title: "Atamalar va ta'riflar",
      blocks: [
        {
          t: "ul",
          items: [
            "**Platforma** — paylinker.uz domenida joylashgan dasturiy-apparat majmui va unga tegishli barcha sahifalar.",
            "**Ijrochi** — Platformaga egalik qiluvchi va xizmat ko'rsatuvchi shaxs; rekvizitlari ushbu hujjatning yakuniy bo'limida keltirilgan.",
            "**Buyurtmachi** — Platformada ro'yxatdan o'tgan va xizmatlardan foydalanuvchi shaxs.",
            "**Xizmat** — Buyurtmachiga Platformada veb-sahifa (vizitka yoki landing) yaratish, tahrirlash va uni ommaviy tarmoqda chop etish imkoniyatini berish.",
            "**Sayt** — Buyurtmachi Platforma vositalari orqali yaratgan va paylinker.uz/{nom} manzilida chop etilgan veb-sahifa.",
            "**Manzil (slug)** — Sayt ochiladigan noyob nom, masalan paylinker.uz/choyxona.",
            "**Shaxsiy kabinet** — Buyurtmachining Platformadagi himoyalangan bo'limi.",
            "**Hisob (balans)** — Buyurtmachining Shaxsiy kabinetidagi oldindan to'langan mablag'lari hisobi.",
            "**Obuna** — Sayt chop etilgan holatda turishi uchun to'langan muddat (6 yoki 12 oy).",
            "**Sinov muddati** — Obuna to'lanmagan holda Sayt chop etilgan turadigan bepul muddat.",
            "**Kontent** — Buyurtmachi Saytga joylagan har qanday matn, tasvir, logotip, havola va boshqa materiallar.",
            "**Aksept** — ushbu Ofertani qabul qilish, ya'ni uning barcha shartlariga to'liq va so'zsiz rozilik bildirish.",
          ],
        },
      ],
    },
    {
      n: "2",
      title: "Ofertaning predmeti",
      blocks: [
        {
          t: "p",
          text:
            "2.1. Ijrochi Buyurtmachiga Platforma orqali Sayt yaratish, uni tahrirlash va ommaviy " +
            "tarmoqda chop etish bo'yicha xizmat ko'rsatadi, Buyurtmachi esa ushbu xizmat uchun " +
            "belgilangan tartibda haq to'laydi.",
        },
        {
          t: "p",
          text:
            "2.2. Xizmat masofaviy tarzda, Platformaning dasturiy vositalari orqali ko'rsatiladi. " +
            "Ijrochi Buyurtmachiga tayyor shablonlar, matn va tasvirlarni tahrirlash vositalari hamda " +
            "Saytni ommaviy tarmoqda joylashtirish uchun texnik infratuzilmani taqdim etadi.",
        },
        {
          t: "p",
          text:
            "2.3. Ijrochi Buyurtmachi uchun Kontent (matn, tasvir, logotip) tayyorlab bermaydi, " +
            "dizayn xizmatlarini ko'rsatmaydi va Buyurtmachi biznesiga mijoz jalb qilishni kafolatlamaydi.",
        },
        {
          t: "p",
          text:
            "2.4. Xizmat «qanday bo'lsa, shunday» (as is) asosida taqdim etiladi. Platformaning " +
            "funksional imkoniyatlari saytning tegishli bo'limlarida e'lon qilinadi va Ijrochi " +
            "tomonidan takomillashtirilishi mumkin.",
        },
      ],
    },
    {
      n: "3",
      title: "Ofertani aksept qilish",
      blocks: [
        {
          t: "p",
          text:
            "3.1. Ofertani aksept qilish quyidagi harakatlardan istalgan biri orqali amalga oshiriladi:",
        },
        {
          t: "ol",
          items: [
            "Platformada ro'yxatdan o'tish jarayonida «Ommaviy oferta shartlarini qabul qilaman» degan belgini qo'yish va ro'yxatdan o'tishni yakunlash;",
            "Shaxsiy kabinetga kirish;",
            "Hisobni to'ldirish yoki Obunani faollashtirish.",
          ],
        },
        {
          t: "p",
          text:
            "3.2. Aksept qilingan paytdan boshlab Oferta Tomonlar o'rtasidagi yozma shartnoma kuchiga ega bo'ladi. " +
            "Alohida qog'oz shartnoma imzolanishi talab etilmaydi.",
        },
        {
          t: "p",
          text:
            "3.3. Aksept fakti, sanasi va Oferta tahriri raqami Ijrochining axborot tizimida qayd etiladi " +
            "va nizo yuzaga kelganda dalil sifatida qabul qilinadi.",
        },
        {
          t: "p",
          text:
            "3.4. Ofertaning shartlariga rozi bo'lmagan shaxs Platformadan foydalanishdan o'zini tiyishi shart.",
        },
      ],
    },
    {
      n: "4",
      title: "Ro'yxatdan o'tish va Shaxsiy kabinet",
      blocks: [
        {
          t: "p",
          text:
            "4.1. Ro'yxatdan o'tish uchun Buyurtmachi telefon raqamini kiritadi va Ijrochining " +
            "Telegram boti yuborgan bir martalik kodni tasdiqlaydi. Parol talab etilmaydi.",
        },
        {
          t: "p",
          text:
            "4.2. Telefon raqami va Telegram akkaunti Buyurtmachini identifikatsiya qilish vositasi hisoblanadi. " +
            "Ushbu vositalar orqali amalga oshirilgan barcha harakatlar Buyurtmachi tomonidan " +
            "amalga oshirilgan deb hisoblanadi.",
        },
        {
          t: "p",
          text:
            "4.3. Buyurtmachi o'z telefon raqami va Telegram akkaunti xavfsizligini mustaqil ta'minlaydi. " +
            "Ularni uchinchi shaxslarga berish oqibatida yuzaga kelgan zarar uchun Ijrochi javobgar emas.",
        },
        {
          t: "p",
          text:
            "4.4. Buyurtmachi o'zi to'g'risida haqiqiy ma'lumot taqdim etish majburiyatini oladi. " +
            "Noto'g'ri ma'lumot taqdim etilishi oqibatlari Buyurtmachi zimmasida qoladi.",
        },
        {
          t: "p",
          text:
            "4.5. Yoshi 18 ga to'lmagan shaxslar Platformadan qonuniy vakilining roziligi bilan foydalanishi mumkin.",
        },
      ],
    },
    {
      n: "5",
      title: "Xizmat ko'rsatish tartibi",
      blocks: [
        {
          t: "p",
          text:
            "5.1. Buyurtmachi Shaxsiy kabinetda Sayt yaratadi, shablon tanlaydi, Kontent joylaydi va " +
            "Sayt uchun noyob Manzil belgilaydi.",
        },
        {
          t: "p",
          text:
            "5.2. Yangi yaratilgan Sayt uchun bepul Sinov muddati beriladi. Sinov muddati davomiyligi " +
            "Platformaning «Tariflar» bo'limida e'lon qilinadi va yaratish paytida Buyurtmachiga ko'rsatiladi. " +
            "Sinov muddati uchun to'lov olinmaydi va karta ma'lumotlari so'ralmaydi.",
        },
        {
          t: "p",
          text:
            "5.3. Sinov muddati tugagach Sayt avtomatik ravishda to'xtatiladi. Sayt manziliga kirgan " +
            "shaxs xizmat vaqtincha to'xtatilgani haqidagi sahifani ko'radi.",
        },
        {
          t: "p",
          text:
            "5.4. Obuna to'langanda Sayt qayta chop etiladi. Buyurtmachining Kontenti Sayt to'xtatilgan " +
            "davrda ham saqlanib turadi va Obuna yangilanganda o'sha holatida tiklanadi.",
        },
        {
          t: "p",
          text:
            "5.5. Obuna muddati tugash sanasidan 3 (uch) kun oldin Buyurtmachiga Telegram yoki SMS " +
            "orqali eslatma yuboriladi. Eslatma yuborilmagani Obunani o'z vaqtida yangilash " +
            "majburiyatidan ozod qilmaydi.",
        },
        {
          t: "p",
          text:
            "5.6. Xizmat ko'rsatilgan deb Sayt chop etilgan va ommaviy tarmoqda ochilgan paytdan " +
            "boshlab hisoblanadi. Obuna faollashtirilgan paytdan boshlab xizmat ko'rsatila boshlangan " +
            "deb e'tirof etiladi.",
        },
      ],
    },
    {
      n: "6",
      title: "Manzil (slug) bo'yicha shartlar",
      blocks: [
        {
          t: "p",
          text:
            "6.1. Manzil «birinchi murojaat — birinchi navbatda» tamoyili asosida beriladi va band " +
            "bo'lmagan taqdirdagina belgilanadi.",
        },
        {
          t: "p",
          text:
            "6.2. Tizim yo'llari bilan to'qnashuvchi nomlar (masalan login, dashboard, admin, api va shu kabilar) band hisoblanadi.",
        },
        {
          t: "p",
          text:
            "6.3. Ijrochi uchinchi shaxsning tovar belgisi, firma nomi yoki shaxsiy nomiga aniq da'vo " +
            "asosida Manzilni o'zgartirishni talab qilish yoki uni bekor qilish huquqini saqlab qoladi.",
        },
        {
          t: "p",
          text:
            "6.4. Manzil Buyurtmachiga mulk huquqida berilmaydi; u faqat Obuna amal qilish davrida " +
            "foydalanish uchun taqdim etiladi.",
        },
      ],
    },
    {
      n: "7",
      title: "Kontent va taqiqlangan foydalanish",
      blocks: [
        {
          t: "p",
          text:
            "7.1. Saytga joylangan butun Kontent uchun javobgarlik to'liq Buyurtmachi zimmasida. " +
            "Ijrochi Kontentni oldindan tekshirmaydi va uning qonuniyligi hamda haqqoniyligini kafolatlamaydi.",
        },
        {
          t: "p",
          text:
            "7.2. Buyurtmachi Kontentga nisbatan barcha zarur huquqlarga ega ekanini kafolatlaydi.",
        },
        { t: "p", text: "7.3. Platformadan foydalanganda quyidagilar taqiqlanadi:" },
        {
          t: "ul",
          items: [
            "O'zbekiston Respublikasi qonunchiligi taqiqlagan har qanday faoliyat;",
            "uchinchi shaxslarning mualliflik, tovar belgisi va boshqa huquqlarini buzish;",
            "firibgarlik, «moliyaviy piramida», soxta yutuq, soxta yig'im-terim va shunga o'xshash sxemalar;",
            "litsenziya talab qiluvchi faoliyatni (moliyaviy xizmatlar, tibbiyot, qimor va h.k.) tegishli ruxsatsiz reklama qilish;",
            "giyohvand moddalar, qurol, kontrafakt va muomalasi cheklangan boshqa tovarlarni taklif qilish;",
            "zo'ravonlik, kamsitish, tuhmat va milliy, irqiy yoki diniy adovatni qo'zg'atuvchi materiallar;",
            "voyaga yetmaganlarga zarar yetkazuvchi va pornografik materiallar;",
            "uchinchi shaxslarning shaxsga doir ma'lumotlarini ular roziligisiz e'lon qilish;",
            "zararli dasturlar tarqatish, fishing sahifalari yaratish yoki foydalanuvchilarni chalg'itish;",
            "Platformaga texnik hujum uyushtirish, uni avtomatlashtirilgan vositalar bilan haddan tashqari yuklash yoki himoya choralarini chetlab o'tishga urinish.",
          ],
        },
        {
          t: "p",
          text:
            "7.4. Ushbu bandning buzilishi aniqlanganda Ijrochi Saytni ogohlantirishsiz to'xtatish yoki " +
            "o'chirish, shuningdek Buyurtmachi hisobini bloklash huquqiga ega. Bunday holatda to'langan " +
            "mablag' qaytarilmaydi.",
        },
        {
          t: "p",
          text:
            "7.5. Ijrochi vakolatli davlat organining qonuniy talabi bo'yicha Sayt faoliyatini " +
            "to'xtatadi va zarur ma'lumotlarni taqdim etadi.",
        },
      ],
    },
    {
      n: "8",
      title: "Xizmat narxi va to'lov tartibi",
      blocks: [
        {
          t: "p",
          text:
            "8.1. Xizmat narxi O'zbekiston Respublikasi milliy valyutasida — so'mda belgilanadi va " +
            "Platformaning «Tariflar» bo'limida e'lon qilinadi. E'lon qilingan narx ommaviy oferta " +
            "shartlarining ajralmas qismidir.",
        },
        {
          t: "p",
          text:
            "8.2. To'lov ikki bosqichda amalga oshiriladi: avval Buyurtmachi Hisobini to'ldiradi, " +
            "so'ngra Hisobdagi mablag' hisobidan tanlangan Obunani faollashtiradi.",
        },
        {
          t: "p",
          text:
            "8.3. Hisob to'lov tashkiloti orqali bank kartasi yordamida to'ldiriladi. Karta ma'lumotlari " +
            "to'lov tashkilotining himoyalangan sahifasida kiritiladi va Ijrochiga uzatilmaydi hamda " +
            "Ijrochi tomonidan saqlanmaydi.",
        },
        {
          t: "p",
          text:
            "8.4. Hisobdagi mablag'ga foiz hisoblanmaydi. Hisob boshqa foydalanuvchiga o'tkazilmaydi.",
        },
        {
          t: "p",
          text:
            "8.5. Obuna faollashtirilgan paytda uning narxi Hisobdan yechib olinadi. Hisobdagi mablag' " +
            "yetarli bo'lmasa Obuna faollashtirilmaydi.",
        },
        {
          t: "p",
          text:
            "8.6. To'lov Buyurtmachining bank kartasidan mablag' yechib olingan va to'lov tashkilotidan " +
            "tasdiq kelgan paytdan boshlab amalga oshirilgan hisoblanadi.",
        },
        {
          t: "p",
          text:
            "8.7. Ijrochi tariflarni bir tomonlama o'zgartirish huquqiga ega. Yangi tariflar ularning " +
            "e'lon qilingan paytidan boshlab kuchga kiradi va allaqachon to'langan Obunaning amal qilish " +
            "muddatiga ta'sir qilmaydi.",
        },
        {
          t: "p",
          text:
            "8.8. To'lovlar bo'yicha batafsil ma'lumot — Platformaning «To'lov va pul qaytarish» bo'limida.",
        },
      ],
    },
    {
      n: "9",
      title: "Pul qaytarish",
      blocks: [
        {
          t: "p",
          text:
            "9.1. Faollashtirilgan Obuna uchun to'langan mablag' qaytarilmaydi, chunki xizmat " +
            "faollashtirilgan paytdan boshlab ko'rsatila boshlanadi va uning natijasi (chop etilgan Sayt) " +
            "Buyurtmachiga darhol taqdim etiladi.",
        },
        {
          t: "p",
          text:
            "9.2. Istisno: agar Ijrochining aybi bilan yuzaga kelgan texnik nosozlik tufayli Sayt " +
            "uzluksiz 24 (yigirma to'rt) soatdan ortiq ochilmagan bo'lsa, Buyurtmachi tanlovi bo'yicha " +
            "Obuna muddati uzaytiriladi yoki mos keluvchi qism qaytariladi.",
        },
        {
          t: "p",
          text:
            "9.3. Hisobdagi sarflanmagan mablag' Buyurtmachining yozma arizasi bo'yicha qaytariladi. " +
            "Ariza ko'rib chiqilgandan so'ng mablag' 10 (o'n) ish kuni ichida to'lov amalga oshirilgan " +
            "usul orqali qaytariladi.",
        },
        {
          t: "p",
          text:
            "9.4. Xizmat ushbu Ofertaning 7-bandini buzgani uchun to'xtatilgan bo'lsa, mablag' qaytarilmaydi.",
        },
        {
          t: "p",
          text:
            "9.5. Ushbu bo'lim iste'molchilarga O'zbekiston Respublikasining «Iste'molchilarning " +
            "huquqlarini himoya qilish to'g'risida»gi Qonuni bilan berilgan huquqlarni cheklamaydi. " +
            "Qonun hujjatlarida nazarda tutilgan hollarda mablag' qonunda belgilangan tartibda qaytariladi.",
        },
        {
          t: "p",
          text:
            "9.6. Qaytarish tartibi, ariza shakli va muddatlari — «To'lov va pul qaytarish» bo'limida batafsil bayon etilgan.",
        },
      ],
    },
    {
      n: "10",
      title: "Tomonlarning huquq va majburiyatlari",
      blocks: [
        { t: "p", text: "10.1. Ijrochi majburiyatlari:" },
        {
          t: "ul",
          items: [
            "Obuna amal qilish davrida Saytning ommaviy tarmoqda ochiq turishini ta'minlash;",
            "Buyurtmachi murojaatlarini qabul qilish va ko'rib chiqish;",
            "shaxsga doir ma'lumotlarni qonunchilikka muvofiq qayta ishlash va himoya qilish;",
            "rejalashtirilgan texnik ishlar haqida imkon qadar oldindan xabar berish.",
          ],
        },
        { t: "p", text: "10.2. Ijrochi huquqlari:" },
        {
          t: "ul",
          items: [
            "Platformaning funksionalini, dizaynini va texnik yechimlarini o'zgartirish;",
            "profilaktika ishlari uchun xizmatni vaqtincha to'xtatish;",
            "ushbu Ofertaning 7-bandi buzilganda Saytni to'xtatish yoki o'chirish;",
            "firibgarlik alomatlari aniqlanganda 12-bandda nazarda tutilgan choralarni qo'llash;",
            "tariflarni va Oferta shartlarini o'zgartirish.",
          ],
        },
        { t: "p", text: "10.3. Buyurtmachi majburiyatlari:" },
        {
          t: "ul",
          items: [
            "xizmat uchun o'z vaqtida va to'liq haq to'lash;",
            "Kontentning qonuniyligini ta'minlash;",
            "identifikatsiya vositalari (telefon, Telegram akkaunt) xavfsizligini ta'minlash;",
            "Platformadan ushbu Oferta va qonunchilik doirasida foydalanish.",
          ],
        },
        { t: "p", text: "10.4. Buyurtmachi huquqlari:" },
        {
          t: "ul",
          items: [
            "xizmatdan Obuna amal qilish davrida to'liq hajmda foydalanish;",
            "Kontentni istalgan vaqtda o'zgartirish;",
            "Hisobdagi sarflanmagan mablag'ni qaytarishni talab qilish;",
            "texnik qo'llab-quvvatlashga murojaat qilish.",
          ],
        },
      ],
    },
    {
      n: "11",
      title: "Intellektual mulk",
      blocks: [
        {
          t: "p",
          text:
            "11.1. Platforma, uning dasturiy kodi, dizayni, shablonlari, «Paylinker» nomi va logotipi " +
            "Ijrochiga tegishli va qonun bilan himoyalanadi.",
        },
        {
          t: "p",
          text:
            "11.2. Buyurtmachi Kontentga bo'lgan huquqlarini saqlab qoladi. Buyurtmachi Ijrochiga " +
            "Kontentni Sayt ishlashi uchun zarur hajmda saqlash, qayta ishlash va ommaga namoyish etish " +
            "bo'yicha oddiy (mutlaq bo'lmagan) litsenziya beradi. Ushbu litsenziya Sayt o'chirilishi bilan tugaydi.",
        },
        {
          t: "p",
          text:
            "11.3. Ijrochi Buyurtmachi nomi va Saytini o'z reklama materiallarida faqat Buyurtmachining " +
            "alohida roziligi bilan ishlatishi mumkin.",
        },
      ],
    },
    {
      n: "12",
      title: "Firibgarlikka qarshi choralar va xavflarni nazorat qilish",
      blocks: [
        {
          t: "p",
          text:
            "12.1. Ijrochi to'lov tashkiloti bilan tuzilgan shartnomada nazarda tutilgan imkoniyatlardan " +
            "foydalangan holda firibgarlik operatsiyalarini cheklash va nazorat qilish choralarini qo'llaydi.",
        },
        {
          t: "p",
          text:
            "12.2. Qo'llaniladigan choralar, cheklovlar va shubhali operatsiya aniqlanganda amal qilish " +
            "tartibi Platformaning «Xavfsizlik va firibgarlikka qarshi choralar» bo'limida batafsil bayon etilgan. " +
            "Ushbu bo'lim Ofertaning ajralmas qismi hisoblanadi.",
        },
        {
          t: "p",
          text:
            "12.3. Buyurtmachi o'ziga tegishli bo'lmagan bank kartasidan uning egasi roziligisiz " +
            "foydalanmaslik majburiyatini oladi.",
        },
        {
          t: "p",
          text:
            "12.4. Firibgarlik alomatlari aniqlanganda Ijrochi operatsiyani to'xtatish, Hisobni vaqtincha " +
            "bloklash va Buyurtmachidan tushuntirish talab qilish huquqiga ega.",
        },
      ],
    },
    {
      n: "13",
      title: "Shaxsga doir ma'lumotlar",
      blocks: [
        {
          t: "p",
          text:
            "13.1. Ofertani aksept qilish bilan Buyurtmachi o'zining shaxsga doir ma'lumotlarini " +
            "«Shaxsga doir ma'lumotlar to'g'risida»gi Qonunga muvofiq qayta ishlashga rozilik bildiradi.",
        },
        {
          t: "p",
          text:
            "13.2. Quyidagi ma'lumotlar qayta ishlanadi: telefon raqami, Telegram akkaunti identifikatori " +
            "va ismi, Buyurtmachi ko'rsatgan ism, to'lov operatsiyalari tarixi, Saytga joylangan Kontent, " +
            "shuningdek texnik jurnal ma'lumotlari (IP-manzil, so'rov vaqti).",
        },
        {
          t: "p",
          text:
            "13.3. Qayta ishlash maqsadi: Buyurtmachini identifikatsiya qilish, xizmat ko'rsatish, " +
            "to'lovlarni amalga oshirish, xabarnomalar yuborish, firibgarlikning oldini olish va " +
            "qonunchilik talablarini bajarish.",
        },
        {
          t: "p",
          text:
            "13.4. Ma'lumotlar O'zbekiston Respublikasi hududida joylashgan serverlarda saqlanadi. " +
            "Ma'lumotlar uchinchi shaxslarga faqat xizmat ko'rsatish uchun zarur hajmda (to'lov tashkiloti, " +
            "SMS va Telegram xabar yetkazish xizmatlari) yoki qonuniy talab asosida uzatiladi.",
        },
        {
          t: "p",
          text:
            "13.5. Buyurtmachi o'z ma'lumotlarini aniqlashtirish, bloklash yoki o'chirishni talab qilish " +
            "huquqiga ega. Buning uchun Ijrochining aloqa manziliga murojaat qilish kifoya. Ma'lumotlarni " +
            "o'chirish xizmat ko'rsatishni to'xtatishga olib keladi.",
        },
        {
          t: "p",
          text:
            "13.6. Buyurtmachi Saytga uchinchi shaxslarning shaxsga doir ma'lumotlarini joylagan taqdirda, " +
            "ular roziligini olish majburiyati Buyurtmachi zimmasida.",
        },
      ],
    },
    {
      n: "14",
      title: "Javobgarlik",
      blocks: [
        {
          t: "p",
          text:
            "14.1. Tomonlar o'z majburiyatlarini bajarmaganlik uchun O'zbekiston Respublikasi " +
            "qonunchiligiga muvofiq javobgar bo'ladilar.",
        },
        {
          t: "p",
          text:
            "14.2. Ijrochining javobgarligi har qanday holatda nizo yuzaga kelgan Sayt bo'yicha " +
            "oxirgi 6 (olti) oy ichida Buyurtmachi to'lagan summa bilan cheklanadi.",
        },
        { t: "p", text: "14.3. Ijrochi quyidagilar uchun javobgar emas:" },
        {
          t: "ul",
          items: [
            "Buyurtmachining Kontenti va uning qonuniyligi uchun;",
            "Buyurtmachi biznesining moliyaviy natijalari va mijozlar soni uchun;",
            "Buyurtmachi identifikatsiya vositalarini yo'qotishi oqibatlari uchun;",
            "internet-provayderlar, to'lov tashkilotlari, Telegram va boshqa uchinchi shaxslar xizmatlaridagi uzilishlar uchun;",
            "olinmagan foyda va bilvosita zarar uchun.",
          ],
        },
        {
          t: "p",
          text:
            "14.4. Ijrochi Platformaning uzluksiz va xatosiz ishlashini kafolatlamaydi, biroq " +
            "aniqlangan nosozliklarni imkon qadar tez bartaraf etish choralarini ko'radi.",
        },
      ],
    },
    {
      n: "15",
      title: "Fors-major",
      blocks: [
        {
          t: "p",
          text:
            "15.1. Tomonlar yengib bo'lmaydigan kuch holatlari (tabiiy ofat, urush, epidemiya, davlat " +
            "organlarining qarorlari, elektr ta'minoti yoki magistral internet aloqasining uzilishi, " +
            "keng ko'lamli kiberhujumlar) tufayli majburiyatlarni bajarmaganlik uchun javobgarlikdan ozod etiladi.",
        },
        {
          t: "p",
          text:
            "15.2. Bunday holatlar 30 (o'ttiz) kundan ortiq davom etsa, har bir Tomon shartnomani " +
            "bir tomonlama bekor qilish huquqiga ega.",
        },
      ],
    },
    {
      n: "16",
      title: "Shartnomani o'zgartirish va bekor qilish",
      blocks: [
        {
          t: "p",
          text:
            "16.1. Ijrochi Oferta shartlarini bir tomonlama o'zgartirish huquqiga ega. Yangi tahrir " +
            "Platformada e'lon qilingan paytdan boshlab kuchga kiradi.",
        },
        {
          t: "p",
          text:
            "16.2. Muhim o'zgarishlar (narx, javobgarlik, pul qaytarish tartibi) haqida Buyurtmachiga " +
            "Shaxsiy kabinet yoki Telegram orqali xabar beriladi.",
        },
        {
          t: "p",
          text:
            "16.3. Yangi tahrir kuchga kirgandan keyin Platformadan foydalanishni davom ettirish " +
            "o'zgarishlarga rozilik deb hisoblanadi. Rozi bo'lmagan Buyurtmachi xizmatdan foydalanishni to'xtatishi kerak.",
        },
        {
          t: "p",
          text:
            "16.4. Buyurtmachi istalgan vaqtda Saytni o'chirish va xizmatdan voz kechish huquqiga ega. " +
            "Bunda 9-bandda nazarda tutilgan qoidalar qo'llaniladi.",
        },
        {
          t: "p",
          text:
            "16.5. Obuna yangilanmagan holda Sayt to'xtatilgandan keyin Ijrochi Kontentni kamida " +
            "6 (olti) oy saqlaydi. Ushbu muddat o'tgach Kontent qaytarib bo'lmaydigan tarzda o'chirilishi mumkin.",
        },
      ],
    },
    {
      n: "17",
      title: "Nizolarni hal qilish",
      blocks: [
        {
          t: "p",
          text:
            "17.1. Tomonlar nizolarni muzokaralar yo'li bilan hal qilishga intiladilar. " +
            "Da'vo (pretenziya) tartibi majburiy hisoblanadi.",
        },
        {
          t: "p",
          text:
            "17.2. Da'vo Ijrochining aloqa manziliga yuboriladi va 15 (o'n besh) ish kuni ichida ko'rib chiqiladi.",
        },
        {
          t: "p",
          text:
            "17.3. Kelishuvga erishilmagan taqdirda nizo O'zbekiston Respublikasi qonunchiligiga muvofiq " +
            "vakolatli sud tomonidan ko'rib chiqiladi. Iste'molchi bo'lgan Buyurtmachi qonunda nazarda " +
            "tutilgan sudga murojaat qilish huquqlarini saqlab qoladi.",
        },
        {
          t: "p",
          text: "17.4. Shartnomaga O'zbekiston Respublikasining moddiy huquqi qo'llaniladi.",
        },
      ],
    },
    {
      n: "18",
      title: "Yakuniy qoidalar",
      blocks: [
        {
          t: "p",
          text:
            "18.1. Oferta Platformada e'lon qilingan paytdan boshlab kuchga kiradi va u yangi tahrir " +
            "bilan almashtirilgunga yoki bekor qilingunga qadar amal qiladi.",
        },
        {
          t: "p",
          text:
            "18.2. Ofertaning biror qoidasi haqiqiy emas deb topilsa, bu qolgan qoidalarning " +
            "haqiqiyligiga ta'sir qilmaydi.",
        },
        {
          t: "p",
          text:
            "18.3. Ofertaning ajralmas qismlari: «To'lov va pul qaytarish» hamda " +
            "«Xavfsizlik va firibgarlikka qarshi choralar» bo'limlari.",
        },
        {
          t: "p",
          text:
            "18.4. Hujjat o'zbek va rus tillarida tuzilgan. Matnlar o'rtasida tafovut bo'lsa, " +
            "o'zbek tilidagi matn ustunlikka ega.",
        },
      ],
    },
    {
      n: "19",
      title: "Ijrochining rekvizitlari",
      blocks: [
        {
          t: "table",
          head: ["Ko'rsatkich", "Qiymat"],
          rows: [
            ["Tashkiliy-huquqiy shakl", COMPANY.formUz],
            ["Nomi", COMPANY.nameUz],
            ["STIR (INN)", COMPANY.tin],
            ["Manzil", COMPANY.addressUz],
            ["Hisob raqami", COMPANY.bankAccount],
            ["Bank", COMPANY.bankNameUz],
            ["MFO", COMPANY.bankMfo],
            ["Elektron pochta", COMPANY.email],
            ["Telefon", COMPANY.phone],
            ["Veb-sayt", "paylinker.uz"],
            ["Ish vaqti", SUPPORT_HOURS_UZ],
          ],
        },
      ],
    },
  ],
};
