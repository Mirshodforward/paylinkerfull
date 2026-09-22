# Paylinker

O'zbekistondagi kichik va o'rta biznes uchun vizitka va landing sayt yaratish platformasi.
Shablon tanlanadi, matn tahrirlanadi — sayt `paylinker.uz/{nom}` manzilida ochiladi.

**Monorepo:** Next.js (frontend, `src/`) + NestJS (API, `api/`) + PostgreSQL (Prisma).

## Ishga tushirish (dev)

```bash
npm install
cd api && npm install && cd ..
npm run dev          # Next :8000 va Nest :8001 birga
```

Brauzerda [http://localhost:8000](http://localhost:8000).

Alohida ishga tushirish: `npm run dev:web` / `npm run dev:api`.

## Brend va domen

Brend nomi, domen, logo va Telegram havolalari **bitta joyda** — [`src/lib/brand.ts`](src/lib/brand.ts).

Ko'rinadigan domen `.env` orqali boshqariladi:

```env
NEXT_PUBLIC_SITE_DOMAIN=web.paylinker.uz   # bo'sh bo'lsa: paylinker.uz
```

`NEXT_PUBLIC_*` build vaqtida inline bo'ladi — o'zgartirgach `npm run build` qayta bajarilishi shart.

Logo fayllari `public/` da; hosilalarini qayta yasash:

```bash
bash scripts/generate-logo-assets.sh
```

## Production

**Deploy (web.paylinker.uz, Nginx, Certbot, PM2):** [deploy/DEPLOY.md](deploy/DEPLOY.md)
**SSL:** [deploy/SSL.md](deploy/SSL.md) · **Bir serverda bir nechta sayt:** [deploy/NGINX-MULTI-SITE.md](deploy/NGINX-MULTI-SITE.md)

```bash
npm run build:all       # Next + Nest
npm run migrate:deploy  # Prisma migratsiyalari
npm run pm2             # pm2 start paylinker.config.cjs
```

## Foydali skriptlar

| Buyruq | Vazifasi |
|--------|----------|
| `npm run dev` | Frontend + API birga (8000 / 8001) |
| `npm run build:all` | Ikkalasini build qilish |
| `npm run migrate:deploy` | Prisma migratsiya (Prisma 5.22) |
| `npm run pm2` / `pm2:restart` / `pm2:stop` | PM2 boshqaruvi |
| `npm run lint` | ESLint |
