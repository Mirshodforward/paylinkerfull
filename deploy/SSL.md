# web.paylinker.uz — SSL (Let’s Encrypt) va ulash

Bepul sertifikat: [Let’s Encrypt](https://letsencrypt.org/). Serverda **Certbot** + **Nginx** plugin ishlatiladi.

> **1-bosqich — faqat `web.paylinker.uz`.** Asosiy `paylinker.uz` hozircha tegilmaydi;
> uni keyin qo‘shish tartibi: [DEPLOY.md § 10](./DEPLOY.md).

## 1. Oldindan tekshiruvlar

| Tekshiruv | Buyruq / qoida |
|-----------|----------------|
| DNS | `web.paylinker.uz` **A** yozuvi server **ochiq IP** siga ishora qiladi. (`paylinker.uz`, `www`, `api` — keyingi bosqichlarda.) |
| 80-port | Tashqaridan ochiq: `curl -I http://web.paylinker.uz` — javob kelishi kerak (200 yoki 301). |
| Nginx | Loyihangizdagi site yoqilgan, `sudo nginx -t` xatosiz. |
| Ilovalar | Next (`127.0.0.1:8000`) va API (`127.0.0.1:8001`) PM2 orqali ishlayapti — aks holda HTTPS ochilganda ham 502 bo‘lishi mumkin. |

O‘rnatish (agar yo‘q bo‘lsa):

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

## 1a. Certbotdan oldin: Nginx `nginx -t` xatosiz bo‘lishi kerak

Certbot ishga tushishidan oldin **`sudo nginx -t`** muvaffaqiyatli tugashi shart. Agar ilgari noto‘g‘ri `cp` yoki yo‘l bilan symlink qilingan bo‘lsa, xato:

```text
open() "/etc/nginx/sites-enabled/paylinker" failed (2: No such file or directory)
```

Bu — **`sites-enabled/paylinker`** bor, lekin **`sites-available/paylinker`** yo‘q yoki symlink buzilgan.

**Tuzatish** (loyiha yo‘lingizni qo‘ying; root uchun `~/paylinker-frontend`):

```bash
sudo rm -f /etc/nginx/sites-enabled/paylinker

sudo cp ~/paylinker-frontend/deploy/nginx-paylinker.conf.example \
  /etc/nginx/sites-available/paylinker

sudo ln -sf /etc/nginx/sites-available/paylinker /etc/nginx/sites-enabled/paylinker

sudo nginx -t && sudo systemctl reload nginx
```

Keyin yana **§ 2** dagi `certbot --nginx` buyrug‘ini bajaring.

## 1b. DNS: har bir subdomen alohida yozuv talab qiladi

`paylinker.uz` A yozuvi **avtomatik ravishda** `web.paylinker.uz` yoki `api.paylinker.uz` ni yaratmaydi. Registrator yoki DNS (Cloudflare, UZINFOCOM va hokazo) panelida **alohida** yozuv qo‘shing:

| Yozuv (host) | Turi | Qiymat |
|--------------|------|--------|
| `web` yoki to‘liq `web.paylinker.uz` | **A** | serveringizning IP manzili — **1-bosqichda shart** |
| `api` yoki to‘liq `api.paylinker.uz` | **A** | o‘sha IP — faqat alohida API subdomen kerak bo‘lsa |

Serverda sinov (NXDOMAIN bo‘lmasa, IP qaytadi):

```bash
dig +short web.paylinker.uz A
# yoki
getent hosts web.paylinker.uz
```

Yangilanish 1–10 daqiqadan 48 soatgacha cho‘zilishi mumkin. **Let’s Encrypt** xatosi `NXDOMAIN` yoki `DNS problem` — hali A yozuv yo‘q yoki hali tarqalmagan.

**Sertifikatga yangi domen qo‘shish** (DNS ishlay boshlagach):

```bash
sudo certbot --nginx \
  -d web.paylinker.uz \
  -d api.paylinker.uz --expand
```

Shu buyruq mavjud sertifikatni **kengaytiradi** (`--expand`).

## 2. Sertifikat olish va Nginx ga ulash

### 1-bosqich — faqat `web.paylinker.uz`

```bash
sudo certbot --nginx -d web.paylinker.uz
```

### Keyinroq — asosiy domen va/yoki `api` qo‘shilganda

Bitta sertifikat barcha hostlar uchun (SAN):

```bash
sudo certbot --nginx \
  -d web.paylinker.uz \
  -d paylinker.uz \
  -d www.paylinker.uz --expand
```

**Eslatma:** DNS yozuvi yo‘q domenni `-d` ga qo‘shmang — Let’s Encrypt `NXDOMAIN` bilan butun buyruqni rad etadi.

Keyin:

- Email so‘raladi (xabar va tiklash uchun).
- Let’s Encrypt qoidalariga rozilik.
- **Redirect** tanlang: HTTP → HTTPS (2-variant odatda ma’qul).

Certbot `/etc/nginx/sites-available/paylinker` (yoki siz qaysi faylni ishlatayotgan bo‘lsangiz) ni **o‘zi yangilaydi**: `listen 443 ssl`, `ssl_certificate` va hokazo.

Sertifikat fayllari odatda:

- ` /etc/letsencrypt/live/web.paylinker.uz/fullchain.pem`
- ` /etc/letsencrypt/live/web.paylinker.uz/privkey.pem`

(Birinchi `-d` qaysi domen bo‘lsa, papka nomi shu bo‘lishi mumkin; certbot chiqishida aniq yo‘l ko‘rsatiladi.)

## 3. Tekshiruv

```bash
sudo nginx -t && sudo systemctl reload nginx
curl -sI https://web.paylinker.uz | head -5
```

Brauzerda qulf ikonkasi va sertifikat domenlari to‘g‘ri ko‘rinishi kerak.

## 4. Avtomatik yangilanish

Certbot odatda **systemd timer** orqali kuniga ikki marta tekshiradi. Qo‘lda sinov:

```bash
sudo certbot renew --dry-run
```

Muvaffaqiyatli bo‘lsa, sertifikat muddati tugashidan oldin avtomatik yangilanadi.

## 5. `.env` va ilovalar

HTTPS dan keyin server `.env` da `FRONTEND_ORIGIN` va `NEXT_PUBLIC_APP_URL` kabi domenlar **https** bo‘lsin. API brauzerda **bir xil domen** ishlatiladi; `INTERNAL_API_URL` Nest ichki manzili (RSC, rewrites). Keyin:

```env
INTERNAL_API_URL=http://127.0.0.1:8001
FRONTEND_ORIGIN=https://web.paylinker.uz
NEXT_PUBLIC_SITE_DOMAIN=web.paylinker.uz
NEXT_PUBLIC_APP_URL=https://web.paylinker.uz
PUBLIC_APP_URL=https://web.paylinker.uz
```

So‘ngra (o‘zgarishlar kiritilgan bo‘lsa):

```bash
cd /path/to/paylinker-frontend
npm run build
pm2 restart all
```

## 6. Tez-tez muammolar

| Muammo | Yechim |
|--------|--------|
| Agar avval noto‘g‘ri `ln` / yo‘l bo‘lsa, `sites-enabled/paylinker` buzilgan | [§ 1a](#1a-certbotdan-oldin-nginx-nginx--t-xatosiz-bolishi-kerak) — `sites-available` ga fayl nusxalang, symlinkni qayta yarating. |
| `nginx -t` / Certbot: `open() ... sites-enabled/paylinker failed` | Yuqoridagi kabi: buzilgan symlinkni o‘chirib, `nginx-paylinker.conf.example` ni `sites-available` ga nusxalang. |
| `NXDOMAIN` / `DNS problem` | [§ 1b](#1b-dns-har-bir-subdomen-alohida-yozuv-talab-qiladi) — o‘sha host uchun **A** yozuv qo‘shing; `dig +short web.paylinker.uz` IP qaytarishini kuting. |
| Certbot “connection refused” / challenge failed | 80-port firewallda ochiqmi; DNS hali eski IP dami — `dig web.paylinker.uz +short` tekshiring. |
| `Too many certificates` | Bir haftada bir xil domen uchun juda ko‘p urinish — LetsEncrypt cheklovi; biroz kuting yoki [staging](https://letsencrypt.org/docs/staging-environment/) bilan sinab ko‘ring. |
| HTTPS ochiladi, sahifa 502 | PM2 da `paylinker-web` / `paylinker-api` ishlayaptimi, portlar 8000 va 8001. |

To‘liq deploy ketma-ketligi: [DEPLOY.md](./DEPLOY.md).

**Bir serverda bir nechta domen / chalkash front:** [NGINX-MULTI-SITE.md](./NGINX-MULTI-SITE.md).
