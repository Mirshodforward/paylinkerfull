# paylinker.uz — Linux serverga deploy va Let’s Encrypt (Certbot)

Bu hujjat **paylinker.uz** (Next + Nginx) va orqa fonda **Nest** (`127.0.0.1:8001`) ni deploy qilish tartibi. API brauzerda **o‘sha domen** orqali (`/auth`, `/vizitka`, …).

## 1. DNS

Serveringiz **ochiq IP** sini oldingizdan:

| Yozuv (host) | Turi | Qiymat |
|--------------|------|--------|
| `@` (`paylinker.uz`) | A | server IP |
| `www` | A | server IP (nginx uni `paylinker.uz` ga 301 qiladi) |
| `api` | A | **tegmang** — bu alohida loyiha (Click to‘lov shlyuzi, :4000) |

`www` uchun CNAME emas, **A** yozuv qo‘ying (apex bilan bir xil IP) — Let’s Encrypt ikkalasini bitta sertifikatga oladi.

Certbot ishlashi uchun **80** va **443** portlari tashqaridan ochiq bo‘lishi kerak.

## 2. Serverda dasturlar

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
# Node.js 20 LTS (NodeSource yoki nvm — loyihangizga mos)
```

## 3. Loyihani joylash va build

Loyiha yo‘li ixtiyoriy (`/opt/paylinker`, `~/paylinker-frontend` va hokazo). Quyida **`$ROOT`** deb loyiha ildizini nazarda tutamiz.

```bash
# Masalan:
cd ~ && git clone <sizning-repo-url> paylinker-frontend
cd ~/paylinker-frontend   # bu sizning $ROOT
```

Yoki: `sudo mkdir -p /opt/paylinker && sudo chown $USER:$USER /opt/paylinker` va `git clone` shu yerga.

Ildizdagi `.env` faylini yarating: `deploy/env.production.example` ni namuna sifatida ko‘rib chiqing. Kamida quyidagilar to‘g‘ri bo‘lishi kerak:

- `DATABASE_URL` — ishlayotgan PostgreSQL
- `JWT_*`, `TELEGRAM_BOT_TOKEN`, CLICK maydonlari
- `INTERNAL_API_URL=http://127.0.0.1:8001` (server/RSC va Next rewrites)
- `NEXT_PUBLIC_SITE_DOMAIN=paylinker.uz` (UI dagi havola domeni: `paylinker.uz/{slug}`)
- `NEXT_PUBLIC_APP_URL=https://paylinker.uz` (billing matnlari va hokazo)
- `FRONTEND_ORIGIN=https://paylinker.uz,https://www.paylinker.uz`
- `PUBLIC_APP_URL=https://paylinker.uz`
- `TELEGRAM_POLLING=false` (prod odatda webhook)
- `TELEGRAM_WEBHOOK_SECRET` — tasodifiy (`openssl rand -hex 32`), webhook uchun **majburiy**
- `ADMIN_LOCKDOWN=1` va `ADMIN_PUBLIC_IDS` — **majburiy**, aks holda `/api/admin/*` hammaga ochiq

**Muhim:** `NEXT_PUBLIC_*` o‘zgarishidan keyin frontendni **qayta build** qilish kerak.

```bash
cd $ROOT
npm ci
cd api && npm ci && cd ..
npm run build:all
npm run migrate:deploy
```

### Prisma / migrate (P1012, Prisma 7)

Bu loyiha **Prisma 5.x** bilan bog‘langan (`api/package.json`). Serverda **`npx prisma ...`** ni `api` ichida **dependencies o‘rnatilmasdan** ishlatsangiz, `npx` odatda **eng so‘nggi Prisma 7** ni yuklaydi va `datasource url is no longer supported` (**P1012**) xatosini beradi.

**To‘g‘ri tartib:** avval `cd api && npm ci` (yoki yuqoridagi ketma-ketlik), keyin **faqat loyiha skripti** orqali:

```bash
cd $ROOT
npm run migrate:deploy
```

Skript **Prisma 5.22.0** CLIni `npx prisma@5.22.0` orqali chaqiradi (global o‘rnatilgan Prisma 7 bundan **ta’sir qilmaydi**).

Agar hozir qo‘lda bajarsangiz (`api` papkasida, `.env` loyiha ildizida):

```bash
cd ~/paylinker-frontend/api
npm ci
./node_modules/.bin/dotenv -e ../.env -- npx prisma@5.22.0 migrate deploy
```

(`dotenv` — bu `dotenv-cli` paketi; tizim buyrug‘i emas, **`npm ci` dan keyin** `node_modules/.bin` dan ishlaydi.)

## 4. PM2 (yoki systemd)

Loyiha ildizida (`cd $ROOT`):

```bash
sudo npm i -g pm2
# PM2: api/dist/main.js va Next .next — avval build
npm run build:all
pm2 start paylinker.config.cjs
# yoki: npm run pm2
pm2 save
pm2 startup   # ko‘rsatma bo‘yicha systemd qo‘shing
```

Tekshiruv (server ichida):

```bash
curl -sI http://127.0.0.1:8000 | head -1
curl -sI http://127.0.0.1:8001
```

## 5. Nginx

`deploy` katalogi **loyiha ildizida** (`$ROOT/deploy`). Oldingi xato yo‘l `/opt/paylinker` bo‘lsa-yu, sizda klon boshqa papkada bo‘lishi mumkin — **to‘liq yo‘lni o‘zingiz yazing**:

```bash
# $ROOT o'rniga haqiqiy yo'l, masalan: /home/ubuntu/paylinker-frontend
sudo cp /home/ubuntu/paylinker-frontend/deploy/nginx-paylinker.conf.example /etc/nginx/sites-available/paylinker
sudo ln -sf /etc/nginx/sites-available/paylinker /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

**Eslatma:** `sudo` bilan `$ROOT` yoki `~` ba’zan boshqa foydalanuvchi uchun bo‘lishi mumkin — **mutlaq yo‘l** (`/home/.../paylinker-frontend/deploy/...`) ishlatish xavfsizroq.

Agar avval xato `ln` tufayli **buzilgan symlink** qolgan bo‘lsa: `sudo rm -f /etc/nginx/sites-enabled/paylinker`, keyin yuqoridagi qadamlarni qayta bajaring.

Brauzerda `http://paylinker.uz` ochilishi kerak (sertifikatsiz, vaqtincha).

## 6. Certbot — SSL sertifikat (HTTPS)

**paylinker.uz** uchun SSL olish va Nginx ga ulash **bitta buyruq** bilan (oldindan DNS va HTTP (80) ishlayotgan bo‘lsin):

```bash
sudo certbot --nginx -d paylinker.uz -d www.paylinker.uz
```

`api.paylinker.uz` ning sertifikati **alohida** (boshqa loyiha) — bu buyruqqa qo‘shmang.

Certbot Nginx faylingizga `listen 443 ssl` va sertifikat yo‘llarini qo‘shadi; HTTP → HTTPS yo‘naltirishni so‘raydi (odatda **2** ni tanlang).

```bash
sudo certbot renew --dry-run
```

Batafsil (tekshiruvlar, muammolar, `.env` da `https://`): **[deploy/SSL.md](./SSL.md)**.

## 7. Telegram

- **Webhook** (polling o‘chiq bo‘lsa). Webhook **sir bilan** o‘rnatiladi — `.env` dagi
  `TELEGRAM_WEBHOOK_SECRET` bilan aynan bir xil qiymat:

  ```bash
  curl -s "https://api.telegram.org/bot<TOKEN>/setWebhook" \
    -d url=https://paylinker.uz/telegram/webhook \
    -d secret_token=<TELEGRAM_WEBHOOK_SECRET>
  ```

  **Sirsiz webhook 403 qaytaradi** (fail-closed). Sabab: bu endpoint OTP yaratadi
  va kodni update ichidagi `chat_id` ga yuboradi — himoyasiz bo‘lsa istalgan odam
  boshqa akkauntga kirib olishi mumkin edi.

- **CLICK** merchant kabinetida **Prepare/Complete:** `https://paylinker.uz/api/payments/click/prepare` va `.../complete` (backend Nest ga Nginx yoki Next orqali proxylanadi).

## 8. Firewall (ixtiyoriy)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 9. Keyingi deploy (yangilanish)

```bash
cd $ROOT
git pull
npm ci
cd api && npm ci && cd ..
npm run build:all
npm run migrate:deploy
pm2 restart all
```

Agar faqat `.env` dagi `NEXT_PUBLIC_*` o‘zgargan bo‘lsa — **`npm run build`** qayta ishga tushiring (Next.js brauzerga embed qiladi).

### ⚠️ `.env` o‘zgargach qanday restart qilish kerak

```bash
pm2 restart paylinker.config.cjs --update-env    # yoki: npm run pm2:restart
```

**`pm2 restart paylinker-api` (nom bo‘yicha) yetarli EMAS.** U `.env` ni qayta
o‘qimaydi: chaqiruvchi shell muhitini oladi va qolganini eski saqlangan
muhitdan tiklaydi. NestJS `ConfigModule` esa `process.env` da allaqachon
mavjud kalitni fayl qiymati bilan **almashtirmaydi** — natijada bir marta
bo‘sh saqlangan o‘zgaruvchi (masalan `TELEGRAM_BOT_TOKEN=`) keyin
to‘ldirilsa ham jarayonga **bo‘sh** bo‘lib yetib boradi.

Tekshirish (jarayon haqiqatda nimani ko‘rayotgani):

```bash
PID=$(pm2 pid paylinker-api)
tr '\0' '\n' < /proc/$PID/environ | grep TELEGRAM_BOT_TOKEN | wc -c
```

## 10. Joriy server holati (164.92.133.109, `asosiysever`)

Bu serverda bir nechta loyiha bor — ularni **ulashmaydigan** qilib joylandi:

| Loyiha | Domen | Port | Boshqaruv | Baza |
|--------|-------|------|-----------|------|
| **Paylinker** (bu loyiha) | `paylinker.uz`, `www` | 8000 / 8001 | pm2 `paylinker-web`, `paylinker-api` | `paylinkerweb_db` (rol `paylinkerweb`) |
| Paylinker Click shlyuzi | `api.paylinker.uz` | 4000 | systemd `paylinker.service` | `paylinker_api` (rol `api_user`) |
| Starspaymee | — | — | pm2 `starspaymee` | — |
| Mafiya Online | `game.mafiaonline.uz` | — | systemd `mafiya-online.service` | `mafia_db` |

- Loyiha yo'li: `/home/appuser/paylinkerweb` (foydalanuvchi `appuser`)
- Nginx: `/etc/nginx/sites-available/paylinker-web`
- Reboot: `pm2-appuser.service` yoqilgan (`pm2 save` bilan ro'yxat muzlatilgan)
- Bo'sh `paylinker_db` bazasi va `paylinker` roli **tegilmagan** — bu loyiha
  alohida `paylinkerweb_db` dan foydalanadi.

**Eslatma:** RAM 961 MB (+5 GB swap). `npm run build:all` swap hisobiga
ishlaydi, lekin sekin — build paytida boshqa og'ir ish qilmang.

## Muammolar

- **Bir serverda noto‘g‘ri sayt / boshqa front chiqyapti:** [deploy/NGINX-MULTI-SITE.md](NGINX-MULTI-SITE.md) — `server_name`, port ziddiyati, `default_server`.
- **Prisma P3018 / migratsiya:** Repoda endi **boshlang‘ich** migratsiya bor (`20260101000000_init_schema`). `git pull`, keyin bo‘sh/yomon holatda bazani tiklash: ma’lumotlar muhim emas bo‘lsa `psql` ichida `DROP SCHEMA public CASCADE; CREATE SCHEMA public;` va DB user uchun `GRANT ALL ON SCHEMA public ...`, keyin `npm run migrate:deploy`.
- **Prisma P1012 / Prisma 7:** `npx prisma` (versiyasiz) **ishlatilmaydi**. Faqat `npm run migrate:deploy` yoki `npx prisma@5.22.0 ...`.
- **CORS xatosi:** `FRONTEND_ORIGIN` da aynan brauzerdagi manzil (https, `www` bo‘lsa qo‘shing).
- **API 502:** PM2 da `paylinker-api` ishlayaptimi; Nginx `paylinker.uz` uchun `/auth`, `/vizitka` va boshqalar **Nest** ga proxylanayaptimi (namuna: [nginx-paylinker.conf.example](./nginx-paylinker.conf.example)); `api` subdomen ishlatilsa, u ham shu portga tushadi.
- **Sertifikat:** domenlar DNS da to‘g‘ri IP ga ko‘rsatayotganini va 80-port ochiq ekanini tekshiring.
