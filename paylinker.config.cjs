const path = require("path");

const root = __dirname;

/**
 * `.env` ni o'qib, qiymatlarni PM2 ga OSHKORA uzatamiz.
 *
 * NEGA: `pm2 restart <nom> --update-env` `.env` ni QAYTA O'QIMAYDI — u
 * chaqiruvchi shell muhitini oladi va qolganini eski saqlangan muhitdan
 * tiklaydi. NestJS ConfigModule esa `process.env` da allaqachon mavjud
 * kalitni fayl qiymati bilan almashtirmaydi. Natijada bir marta bo'sh
 * saqlangan o'zgaruvchi (masalan TELEGRAM_BOT_TOKEN=) keyin to'ldirilsa
 * ham jarayonga bo'sh bo'lib yetib borardi.
 *
 * Shuning uchun `.env` shu yerda o'qilib, har bir ilovaning `env` iga
 * to'liq qo'shiladi. `.env` o'zgargach quyidagicha qayta ishga tushiring:
 *
 *   pm2 restart paylinker.config.cjs --update-env
 *
 * (`pm2 restart paylinker-api` — nom bo'yicha — yetarli EMAS.)
 */
let fileEnv = {};
try {
  const dotenv = require("dotenv");
  const out = dotenv.config({ path: path.join(root, ".env") });
  fileEnv = out.parsed || {};
} catch {
  /* dotenv yo'q bo'lsa — faqat tizim env */
}

/**
 * Portlar: ildizdagi .env
 *   PAYLINKER_WEB_PORT  — Next (odat 8000)
 *   PAYLINKER_API_PORT  — Nest (odat 8001)
 * Nginx dagi upstream ham shu portlarga mos bo'lsin.
 */
const webPort = String(
  process.env.PAYLINKER_WEB_PORT || process.env.PORT || "8000",
);
const apiPort = String(
  process.env.PAYLINKER_API_PORT || process.env.API_PORT || "8001",
);

/**
 * Bitta buyruq — frontend (Next) + backend (Nest):
 *
 *   npm run build:all
 *   pm2 start paylinker.config.cjs
 *
 * yoki: npm run pm2
 *
 * To‘xtatish: pm2 stop paylinker-web paylinker-api
 * Qayta ishga tushirish (.env ni ham yangilaydi):
 *   pm2 restart paylinker.config.cjs --update-env
 *
 * .env loyiha ildizida (root) bo‘lishi kerak.
 */
module.exports = {
  apps: [
    {
      name: "paylinker-web",
      cwd: root,
      script: "npm",
      args: `run start -- --hostname 127.0.0.1 --port ${webPort}`,
      instances: 1,
      exec_mode: "fork",
      env: {
        ...fileEnv,
        NODE_ENV: "production",
        TZ: "Asia/Tashkent",
        PORT: webPort,
      },
    },
    {
      name: "paylinker-api",
      cwd: path.join(root, "api"),
      script: "dist/main.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        ...fileEnv,
        NODE_ENV: "production",
        TZ: "Asia/Tashkent",
        API_PORT: apiPort,
        PORT: apiPort,
      },
    },
  ],
};
