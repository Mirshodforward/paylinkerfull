#!/usr/bin/env node
/**
 * i18n tekshiruvi — `tr("...")` kalitlari ruscha xaritada bormi?
 *
 *   node scripts/i18n/check.mjs            # yetishmasa exit 1 (build oldidan)
 *   node scripts/i18n/check.mjs --report   # faqat hisobot, exit 0
 *   node scripts/i18n/check.mjs --out missing.json
 *
 * Kalitlar TypeScript AST orqali olinadi (regex emas): `tr("...")` va
 * `tr("...", {...})` chaqiruvlarining birinchi argumenti — satr literal.
 * Ruscha xarita kalitlari src/lib/i18n/messages/ru/*.ts dagi obyekt
 * literallaridan olinadi.
 */
import { createRequire } from "node:module";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const require = createRequire(import.meta.url);
const ts = require("typescript");

const args = process.argv.slice(2);
const REPORT = args.includes("--report");
const outIdx = args.indexOf("--out");
const OUT = outIdx !== -1 ? args[outIdx + 1] : null;

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (name !== "node_modules" && name !== ".next") walk(p, acc); }
    else if (/\.(ts|tsx)$/.test(name) && !name.endsWith(".d.ts")) acc.push(p);
  }
  return acc;
}

// ── Kalitlar (manba) ──
const used = new Map(); // key -> [file:line]
for (const file of walk("src")) {
  if (file.startsWith(join("src", "lib", "i18n", "messages"))) continue;
  const src = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const visit = (n) => {
    if (ts.isCallExpression(n)) {
      const c = n.expression;
      const isTr = (ts.isIdentifier(c) && c.text === "tr") || (ts.isPropertyAccessExpression(c) && c.name.text === "tr");
      const a = n.arguments[0];
      if (isTr && a && (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a))) {
        const line = sf.getLineAndCharacterOfPosition(a.getStart(sf)).line + 1;
        if (!used.has(a.text)) used.set(a.text, []);
        used.get(a.text).push(`${file}:${line}`);
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
}

// ── Ruscha xarita kalitlari ──
const have = new Set();
const msgDir = join("src", "lib", "i18n", "messages", "ru");
for (const file of walk(msgDir)) {
  const src = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const visit = (n) => {
    if (ts.isPropertyAssignment(n) && (ts.isStringLiteral(n.name) || ts.isNoSubstitutionTemplateLiteral(n.name))) have.add(n.name.text);
    else if (ts.isPropertyAssignment(n) && ts.isIdentifier(n.name)) have.add(n.name.text);
    ts.forEachChild(n, visit);
  };
  visit(sf);
}

const missing = [...used.keys()].filter((k) => !have.has(k));
const unused = [...have].filter((k) => !used.has(k));
console.log(`tr() kalitlari: ${used.size} | ruscha xaritada: ${have.size} | yetishmaydi: ${missing.length} | ishlatilmagan: ${unused.length}`);
if (OUT) {
  const obj = {};
  for (const k of missing) obj[k] = used.get(k);
  writeFileSync(OUT, JSON.stringify(obj, null, 1));
  console.log(`-> ${OUT}`);
}
if (missing.length && (REPORT || !OUT)) {
  const byFile = new Map();
  for (const k of missing) { const f = used.get(k)[0].split(":")[0]; if (!byFile.has(f)) byFile.set(f, 0); byFile.set(f, byFile.get(f) + 1); }
  for (const [f, c] of [...byFile].sort((a, b) => b[1] - a[1])) console.log(`  ${String(c).padStart(4)}  ${f}`);
}
if (missing.length && !REPORT) {
  console.error(`\nXATO: ${missing.length} ta kalit uchun ruscha tarjima yo'q. Qo'shing: src/lib/i18n/messages/ru/*.ts`);
  process.exit(1);
}
