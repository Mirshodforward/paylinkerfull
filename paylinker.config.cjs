const path = require("path");

const root = __dirname;

try {
  require("dotenv").config({ path: path.join(root, ".env") });
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
 * Qayta ishga tushirish: pm2 restart paylinker-web paylinker-api
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
        NODE_ENV: "production",
        TZ: "Asia/Tashkent",
        API_PORT: apiPort,
        PORT: apiPort,
      },
    },
  ],
};
