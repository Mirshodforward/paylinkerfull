#!/usr/bin/env node
/**
 * i18n codemod — o'zbekcha UI satrlarini `tr("...")` ga o'raydi.
 *
 *   node scripts/i18n/codemod.mjs [--server] [--dry] <fayl...>
 *
 * Nima qiladi (TypeScript AST orqali, regex emas):
 *  - JSX matn:            <p>Yangi sayt</p>        -> <p>{tr("Yangi sayt")}</p>
 *  - JSX atribut:         placeholder="Nom"        -> placeholder={tr("Nom")}
 *  - Xabar satrlari:      setErr("Xato")           -> setErr(tr("Xato"))
 *  - Shablon-literal:     `${n} kun qoldi`         -> tr("{n} kun qoldi", { n })
 *  - Obyekt maydonlari:   { label: "Nom" }         -> { label: tr("Nom") }
 *  - Komponentga hook:    const { tr } = useI18n();   (mavjud useI18n() ga qo'shiladi)
 *  - Oddiy funksiyaga:    function f(a, tr: Tr)    + barcha chaqiruvlarga `tr` qo'shiladi
 *  - Modul konstantasi:   const X = [...]          -> const X = (tr: Tr) => [...]; X -> X(tr)
 *  - useMemo/useCallback deps ga `tr` qo'shiladi (til o'zgarganda qayta hisoblansin)
 *
 * Qo'lda ko'rib chiqish kerak bo'lgan joylarni (satr birikmalari, eksport
 * qilingan konstantalar, murakkab holatlar) `MANUAL:` prefiksi bilan chiqaradi.
 *
 * --server: "use client" siz fayl — hook o'rniga `const { tr } = await getDict();`
 */
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const ts = require("typescript");

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const SERVER = args.includes("--server");
const files = args.filter((a) => !a.startsWith("--"));

// ── Sozlamalar ───────────────────────────────────────────────────────────────
const NOTRANSLATE = new Set([
  "Instagram", "Telegram", "TikTok", "YouTube", "Facebook", "CLICK", "Paylinker", "QR", "SMS",
  "AI", "WhatsApp", "Google", "Yandex", "UZS", "HTML", "URL", "ID", "OK", "PDF", "PNG", "JPG",
  "my.click.uz", "paylinker.uz", "Linktree", "Polaroid", "Ticket", "Minimal", "Dark",
  "Business Card", "Social Wall", "Default", "Simple", "Marketing", "Geist", "Escape", "Enter",
  "Backspace", "Tab", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End",
]);
const DENY_ATTRS = new Set([
  "className", "class", "href", "src", "id", "key", "type", "name", "value", "htmlFor", "target",
  "rel", "role", "style", "viewBox", "d", "stroke", "fill", "width", "height", "inputMode",
  "autoComplete", "pattern", "xmlns", "cx", "cy", "r", "rx", "ry", "points", "transform",
  "strokeWidth", "strokeLinecap", "strokeLinejoin", "fillRule", "clipRule", "x", "y", "x1", "x2",
  "y1", "y2", "dir", "lang", "method", "action", "encType", "accept", "download", "sizes",
  "srcSet", "loading", "decoding", "referrerPolicy", "crossOrigin", "tabIndex", "maxLength",
  "minLength", "min", "max", "step", "rows", "cols", "size", "form", "list", "autoCapitalize",
  "autoCorrect", "spellCheck", "aria-controls", "aria-labelledby", "aria-describedby",
  "aria-current", "aria-live", "aria-hidden", "aria-expanded", "aria-pressed", "aria-modal",
  "aria-haspopup", "aria-selected", "aria-checked", "aria-disabled", "aria-orientation",
  "as", "variant", "mark", "layout", "objectFit", "priority", "unoptimized", "quality",
  "sandbox", "allow", "frameBorder", "scrolling", "wrap", "shape", "dominantBaseline",
  "textAnchor", "fontFamily", "letterSpacing", "opacity", "offset", "stopColor", "gradientUnits",
  "patternUnits", "preserveAspectRatio", "mode", "kind", "status", "align", "tone", "color",
  "icon", "plan", "filter", "tier", "step", "months", "field", "path",
]);
const UI_ATTRS = new Set([
  "placeholder", "title", "alt", "aria-label", "aria-description", "aria-placeholder", "aria-valuetext",
  "label", "hint", "description", "eyebrow", "subtitle", "heading", "text", "tagline", "cta",
  "message", "helper", "emptyLabel", "confirmLabel", "cancelLabel", "breadcrumb", "suffix",
  "badge", "tooltip", "caption", "note", "error", "success", "warning", "info", "buttonLabel",
  "summary", "lead", "body", "question", "answer", "okLabel", "emptyText", "emptyHint",
  "primaryLabel", "secondaryLabel", "addLabel", "removeLabel", "sublabel", "prefixLabel",
]);
const UI_KEYS = new Set([
  "label", "title", "description", "hint", "subtitle", "tagline", "placeholder", "text", "cta",
  "message", "helper", "eyebrow", "body", "question", "answer", "caption", "note", "heading",
  "lead", "summary", "desc", "tooltip", "empty", "error", "success", "warning", "info", "badge",
  "buttonLabel", "emptyLabel", "emptyText", "emptyHint", "sublabel", "short", "long", "value",
  "q", "a", "content", "detail", "details", "explain", "example", "sample", "step", "action",
  // sayt kontenti uchun standart/namuna matnlar (yangi sayt yaratishda ko'rsatiladi)
  "category", "businessName", "headline", "tagline", "address", "hoursLine", "hours", "about",
  "heroTitle", "heroSubtitle", "heroEyebrow", "heroCta", "aboutTitle", "aboutLead", "navAbout",
  "navFaq", "navContact", "navCta", "contactSubtitle", "footerCopyrightSuffix", "brandName",
]);
// `value` faqat obyekt ichida UI bo'lsa (masalan {value: "Ha"}) — TW/id heuristikasi filtrlaydi
const ALLOW_CALLS = new Set([
  "setMessage", "setErr", "setError", "setStatus", "setInfo", "setHint", "setToast", "setNotice",
  "setSuccess", "setWarning", "setSlugError", "setNameError", "setFormError", "setSaveMessage",
  "setUploadError", "setDeleteError", "setBootError", "setMsg", "setNote", "setBanner",
  "toast", "alert", "confirm", "useState", "setFeedback", "setResult", "setLabel", "setTitle",
  "setAiError", "setAiStatus", "setSubmitError", "setPayError", "setSaveError", "setCopied",
  "setCopyStatus", "setPublishError", "setPublishMessage",
]);
const ALLOW_NEW = new Set(["Error", "ApiError", "TypeError", "RangeError"]);
const TW = /\b(from-|via-|to-|flex|grid|rounded|text-|bg-|border|px-|py-|p-\d|m-\d|h-\d|w-\d|items-|gap-|mt-|mb-|inline|hidden|shadow|ring-|hover:|transition|font-|tracking|leading|min-|max-|shrink|absolute|relative|z-\d|overflow|opacity|space-|justify|object-|truncate|tabular|uppercase|sr-only|pointer|sm:|lg:|md:|xl:|focus:|disabled:|group-)/;
// Faqat id sifatida ishlatilishi EHTIMOLI YO'Q kichik harfli o'zbekcha so'zlar
const UZ_WORDS = new Set(["bugun", "kecha", "hozir", "yo'q", "yo‘q", "yoʻq", "so'm", "so‘m", "soʻm", "bepul", "tayyor", "kutilmoqda", "yuklanmoqda", "saqlanmoqda", "muvaffaqiyatli", "xato", "xatolik"]);

const hasUzApos = (s) => /[a-z][ʻ‘’'`][a-z]/i.test(s);
const letters = (s) => (s.match(/\p{L}/gu) || []).length;

function isUiTextStrong(s) {
  const t = s.trim();
  if (letters(t) < 2) return false;
  if (NOTRANSLATE.has(t)) return false;
  if (TW.test(t) && !/ /.test(t)) return false;
  if (/^(https?:|\/|@|#|\.|mailto:|tel:|data:|blob:)/.test(t) || /:\/\//.test(t)) return false;
  if (/^[A-Z0-9_]+$/.test(t)) return false;
  if (/^(Bearer|application\/|text\/|image\/|multipart\/)/.test(t)) return false;
  if (/^[\w.-]+\/[\w.-]+$/.test(t)) return false;
  if (/^[a-z0-9_.:\-\/]+$/.test(t)) return UZ_WORDS.has(t) || hasUzApos(t);
  if (hasUzApos(t)) return true;
  if (/ /.test(t) && letters(t) >= 4) return !TW.test(t) || /[ʻ‘’']/.test(t);
  if (/^[A-ZÀ-ÿ][a-zà-ÿ]+$/.test(t)) return true;
  if (/^\p{Lu}\p{Ll}+$/u.test(t)) return true;
  return false;
}
function isUiJsxText(s) {
  const t = s.trim();
  if (letters(t) < 2) return false;
  if (NOTRANSLATE.has(t)) return false;
  if (/^[A-Z0-9_]+$/.test(t) && !/ /.test(t)) return false;
  return true;
}
function decodeEntities(s) {
  return s
    .replace(/&apos;/g, "'").replace(/&#39;/g, "'").replace(/&lsquo;/g, "‘").replace(/&rsquo;/g, "’")
    .replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ").replace(/&hellip;/g, "…").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–")
    .replace(/&middot;/g, "·").replace(/&times;/g, "×");
}
const json = (s) => JSON.stringify(s);

// ── Fayl bo'yicha ────────────────────────────────────────────────────────────
const report = [];
const allKeys = new Map(); // key -> [file:line]

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const isClient = /^\s*(["'])use client\1/.test(src) || /"use client"/.test(src.slice(0, 200));
  const serverMode = SERVER || !isClient;
  const edits = []; // {start,end,text}
  const keys = [];
  const line = (pos) => sf.getLineAndCharacterOfPosition(pos).line + 1;
  const manual = (node, why) => report.push(`MANUAL: ${file}:${line(node.getStart(sf))}  ${why}  :: ${node.getText(sf).slice(0, 90).replace(/\n/g, " ")}`);
  const addKey = (k, node) => keys.push({ k, at: `${file}:${line(node.getStart(sf))}` });

  // Har bir o'rin uchun eng tashqi funksiya (yoki modul o'zgaruvchisi)
  function outermostFn(node) {
    let n = node, fn = null;
    while (n && n !== sf) {
      if (ts.isFunctionDeclaration(n) || ts.isFunctionExpression(n) || ts.isArrowFunction(n) || ts.isMethodDeclaration(n)) fn = n;
      n = n.parent;
    }
    return fn;
  }
  function moduleVarDecl(node) {
    let n = node;
    while (n && n !== sf) {
      if (ts.isVariableDeclaration(n) && ts.isVariableDeclarationList(n.parent) && ts.isVariableStatement(n.parent.parent) && n.parent.parent.parent === sf) return n;
      n = n.parent;
    }
    return null;
  }
  const needTr = new Set(); // funksiya tugunlari
  const needTrModuleVars = new Map(); // decl -> true
  function markScope(node) {
    const fn = outermostFn(node);
    if (fn) needTr.add(fn);
    else {
      const d = moduleVarDecl(node);
      if (d) needTrModuleVars.set(d, true);
      else manual(node, "modul darajasida, o'zgaruvchidan tashqari");
    }
  }

  // ── Kontekst tekshiruvi (satr literal UI mi?) ──
  function literalContext(lit) {
    let n = lit;
    let p = n.parent;
    while (p) {
      if (ts.isAsExpression(p) || ts.isParenthesizedExpression(p) || ts.isConditionalExpression(p) || ts.isNonNullExpression(p) || ts.isSatisfiesExpression?.(p)) { n = p; p = p.parent; continue; }
      if (ts.isBinaryExpression(p)) {
        const k = p.operatorToken.kind;
        if ([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.InKeyword].includes(k)) return "exclude";
        if ([ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.AmpersandAmpersandToken].includes(k)) { n = p; p = p.parent; continue; }
        if (k === ts.SyntaxKind.PlusToken) return "concat";
        return "exclude";
      }
      if (ts.isArrayLiteralExpression(p)) { n = p; p = p.parent; continue; }
      if (ts.isJsxExpression(p)) return "allow";
      if (ts.isJsxAttribute(p)) return "attr";
      if (ts.isPropertyAssignment(p)) { if (p.name === n) return "exclude"; return UI_KEYS.has(p.name.getText(sf).replace(/["']/g, "")) ? "allow" : "prop-other"; }
      if (ts.isShorthandPropertyAssignment(p)) return "exclude";
      if (ts.isCallExpression(p)) {
        if (p.expression === n) return "exclude";
        const callee = p.expression.getText(sf);
        const last = callee.split(".").pop();
        if (callee === "tr" || callee.endsWith(".tr")) return "exclude";
        if (ALLOW_CALLS.has(last) || ALLOW_CALLS.has(callee)) return "allow";
        // React state setter'lari: setFoo("...") — holat matni UI dir. Id lar (kichik harf,
        // probelsiz) isUiTextStrong dan o'tmaydi, shuning uchun xavfsiz.
        if (/^set[A-Z]/.test(last) && ts.isIdentifier(p.expression)) return "allow";
        return "call-other";
      }
      if (ts.isNewExpression(p)) { const c = p.expression.getText(sf); return ALLOW_NEW.has(c) ? "allow" : "exclude"; }
      if (ts.isVariableDeclaration(p)) return p.initializer === n ? "allow" : "exclude";
      if (ts.isReturnStatement(p)) return "allow";
      if (ts.isArrowFunction(p)) return p.body === n ? "allow" : "exclude";
      if (ts.isParameter(p)) return p.initializer === n ? "allow" : "exclude";
      if (ts.isPropertyDeclaration(p)) return p.initializer === n ? "allow" : "exclude";
      if (ts.isTemplateSpan(p) || ts.isTemplateExpression(p)) return "exclude"; // alohida ishlanadi
      if (ts.isCaseClause(p) || ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isLiteralTypeNode(p) || ts.isEnumMember(p) || ts.isComputedPropertyName(p) || ts.isTypeOfExpression(p) || ts.isDecorator(p) || ts.isExpressionStatement(p) || ts.isElementAccessExpression(p) || ts.isPropertyAccessExpression(p) || ts.isExternalModuleReference(p) || ts.isIndexedAccessTypeNode(p) || ts.isTypeReferenceNode(p)) return "exclude";
      if (ts.isSpreadElement(p) || ts.isSpreadAssignment(p)) return "exclude";
      if (ts.isPrefixUnaryExpression(p) || ts.isDeleteExpression(p) || ts.isVoidExpression(p) || ts.isAwaitExpression(p)) return "exclude";
      if (ts.isObjectLiteralExpression(p)) { n = p; p = p.parent; continue; } // array ichidagi obyekt: PropertyAssignment orqali keladi; bu yerga faqat spread bilan
      return "exclude";
    }
    return "exclude";
  }

  function tplToTr(node) {
    // TemplateExpression -> tr("...{name}...", { name: expr })
    const parts = [node.head.text];
    const vars = [];
    const used = new Map();
    for (const span of node.templateSpans) {
      const e = span.expression;
      let name = "v";
      if (ts.isIdentifier(e)) name = e.text;
      else if (ts.isPropertyAccessExpression(e)) name = e.name.text;
      else if (ts.isCallExpression(e)) {
        const c = e.expression;
        if (ts.isPropertyAccessExpression(c)) name = ts.isIdentifier(c.expression) ? c.expression.text : (ts.isPropertyAccessExpression(c.expression) ? c.expression.name.text : c.name.text);
        else if (e.arguments[0] && ts.isIdentifier(e.arguments[0])) name = e.arguments[0].text;
        else if (ts.isIdentifier(c)) name = c.text;
      } else if (ts.isConditionalExpression(e) || ts.isBinaryExpression(e)) name = "v";
      name = name.replace(/[^\w]/g, "") || "v";
      if (/^\d/.test(name)) name = "v" + name;
      const base = name; let i = 1;
      while (used.has(name)) { i += 1; name = base + i; }
      used.set(name, true);
      vars.push([name, e.getText(sf)]);
      parts.push(`{${name}}`, span.literal.text);
    }
    const key = parts.join("");
    return { key, code: `tr(${json(key)}, { ${vars.map(([n, x]) => (n === x ? n : `${n}: ${x}`)).join(", ")} })` };
  }

  // ── Yig'ish ──
  const handled = new Set();
  function visit(node) {
    // JSX matn
    if (ts.isJsxText(node)) {
      if (!node.containsOnlyTriviaWhiteSpaces) {
        const raw = node.getText(sf);
        const dec = decodeEntities(raw);
        const lead = dec.match(/^\s*/)[0], trail = dec.match(/\s*$/)[0];
        const core = dec.trim().replace(/\s+/g, " ");
        if (isUiJsxText(core)) {
          // JSX qoidasi: yangi qatorli bo'sh joy tashlanadi (aynan saqlaymiz — format
          // buzilmasin), bir qatordagi bo'sh joy esa bitta probelga aylanadi -> {" "}
          const pre = lead.includes("\n") ? lead : lead ? '{" "}' : "";
          const post = trail.includes("\n") ? trail : trail ? '{" "}' : "";
          edits.push({ start: node.getStart(sf), end: node.getEnd(), text: `${pre}{tr(${json(core)})}${post}` });
          addKey(core, node); markScope(node);
        }
      }
      return;
    }
    // JSX atribut string literal
    if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const name = node.name.getText(sf);
      const val = node.initializer.text;
      const tag = node.parent?.parent?.tagName?.getText(sf) ?? "";
      const customTag = /^[A-Z]/.test(tag);
      const valueOnComponent = (name === "value" || name === "defaultValue") && customTag && isUiTextStrong(val);
      if (valueOnComponent || (!DENY_ATTRS.has(name) && !name.startsWith("on") && !name.startsWith("data-") && (UI_ATTRS.has(name) ? isUiJsxText(val) : isUiTextStrong(val)))) {
        edits.push({ start: node.initializer.getStart(sf), end: node.initializer.getEnd(), text: `{tr(${json(val)})}` });
        addKey(val, node); markScope(node);
      }
      return;
    }
    // Shablon-literal (o'rin egalari bilan)
    if (ts.isTemplateExpression(node)) {
      const litParts = [node.head.text, ...node.templateSpans.map((s) => s.literal.text)].join(" ");
      if (isUiTextStrong(litParts)) {
        const ctx = literalContext(node);
        if (ctx === "allow" || ctx === "attr") {
          const { key, code } = tplToTr(node);
          edits.push({ start: node.getStart(sf), end: node.getEnd(), text: code });
          addKey(key, node); markScope(node);
          return;
        } else if (ctx !== "exclude") manual(node, `shablon-literal (${ctx})`);
      }
      // ichidagi ifodalar ham tekshirilsin
      node.templateSpans.forEach((s) => visit(s.expression));
      return;
    }
    // Oddiy string literal
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && !handled.has(node)) {
      const val = node.text;
      const strong = isUiTextStrong(val);
      if (strong) {
        const ctx = literalContext(node);
        if (ctx === "allow") {
          edits.push({ start: node.getStart(sf), end: node.getEnd(), text: `tr(${json(val)})` });
          addKey(val, node); markScope(node);
        } else if (ctx === "concat") manual(node, "satr birikmasi (+)");
        else if (ctx === "call-other") manual(node, "boshqa funksiya argumenti");
        else if (ctx === "prop-other") manual(node, "noma'lum obyekt maydoni");
      }
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);

  // ── Modul konstantalarini funksiyaga aylantirish + havolalarni yangilash ──
  const modVarNames = new Map(); // name -> decl
  for (const decl of needTrModuleVars.keys()) {
    if (!ts.isIdentifier(decl.name)) { manual(decl, "destrukturlangan modul o'zgaruvchisi"); continue; }
    const stmt = decl.parent.parent;
    const exported = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (exported) { manual(decl, "EKSPORT qilingan modul konstantasi — boshqa fayllar ham foydalanadi"); continue; }
    if (decl.initializer && (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))) continue; // bu funksiya; outermostFn ushlaydi
    modVarNames.set(decl.name.text, decl);
  }
  // Funksiya-ifodali modul konstantalari ham needTr ga kiradi (outermostFn orqali) — ular komponent/hook/helper
  for (const [name, decl] of modVarNames) {
    const init = decl.initializer;
    const typeAnn = decl.type ? `: ${decl.type.getText(sf)}` : "";
    // Ichki tahrirlar (satrlar) initializer ichida — shuning uchun butunini
    // almashtirmaymiz, faqat ikki chetiga qo'shamiz: `X: T = init` -> `X = (tr: Tr): T => (init)`
    edits.push({ start: decl.name.getEnd(), end: init.getStart(sf), text: ` = (tr: Tr)${typeAnn} => (` });
    edits.push({ start: init.getEnd(), end: init.getEnd(), text: ")" });
    // havolalar
    function refs(n) {
      if (ts.isIdentifier(n) && n.text === name && n !== decl.name) {
        const p = n.parent;
        const isPropName = (ts.isPropertyAccessExpression(p) && p.name === n) || (ts.isPropertyAssignment(p) && p.name === n) || ts.isShorthandPropertyAssignment(p) && p.name === n;
        const isTypePos = ts.isTypeQueryNode(p) || ts.isTypeReferenceNode(p);
        if (!isPropName && !isTypePos) {
          if (ts.isShorthandPropertyAssignment(p)) { manual(n, "qisqa obyekt maydoni sifatida havola"); return; }
          edits.push({ start: n.getStart(sf), end: n.getEnd(), text: `${name}(tr)` });
          markScope(n);
        } else if (isTypePos) manual(n, "typeof havola — tur o'zgaradi");
      }
      ts.forEachChild(n, refs);
    }
    refs(sf);
  }

  // ── Funksiyalar: hook yoki parametr (fixpoint) ──
  const fnInfo = new Map(); // fn -> {kind: 'component'|'hook'|'helper', name}
  function fnName(fn) {
    if (ts.isFunctionDeclaration(fn) && fn.name) return fn.name.text;
    if (ts.isMethodDeclaration(fn)) return fn.name.getText(sf);
    if (ts.isVariableDeclaration(fn.parent) && ts.isIdentifier(fn.parent.name)) return fn.parent.name.text;
    return null;
  }
  function classify(fn) {
    const name = fnName(fn);
    if (!name) return "anon";
    if (/^use[A-Z]/.test(name)) return "hook";
    if (/^[A-Z]/.test(name)) return "component";
    return "helper";
  }
  const helperNames = new Map(); // name -> fn
  let changed = true;
  const hookFns = new Set(), paramFns = new Set();
  while (changed) {
    changed = false;
    for (const fn of needTr) {
      if (hookFns.has(fn) || paramFns.has(fn)) continue;
      const kind = classify(fn);
      if (kind === "component" || kind === "hook") hookFns.add(fn);
      else if (kind === "helper") { paramFns.add(fn); helperNames.set(fnName(fn), fn); }
      else { manual(fn, "nomsiz eng tashqi funksiya — qo'lda"); hookFns.add(fn); }
      changed = true;
    }
    // helper chaqiruvchilar ham tr ga muhtoj
    for (const [name, fn] of helperNames) {
      function findCalls(n) {
        if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === name) {
          if (!n.__trAdded) {
            n.__trAdded = true;
            const insertAt = n.arguments.length ? n.arguments[n.arguments.length - 1].getEnd() : n.getEnd() - 1;
            edits.push({ start: insertAt, end: insertAt, text: n.arguments.length ? ", tr" : "tr" });
            const outer = outermostFn(n);
            if (outer && outer !== fn && !needTr.has(outer)) { needTr.add(outer); changed = true; }
            else if (!outer) manual(n, `helper ${name} modul darajasida chaqirilgan`);
          }
        } else if (ts.isIdentifier(n) && n.text === name && !(ts.isCallExpression(n.parent) && n.parent.expression === n) && n !== fn.name && !(ts.isVariableDeclaration(n.parent) && n.parent.name === n) && !(ts.isPropertyAccessExpression(n.parent) && n.parent.name === n)) {
          manual(n, `helper ${name} havola sifatida uzatilgan (chaqirilmagan)`);
        }
        ts.forEachChild(n, findCalls);
      }
      if (!fn.__scanned) { fn.__scanned = true; findCalls(sf); }
    }
  }
  // eksport qilingan helper — boshqa fayllar chaqiradi
  for (const fn of paramFns) {
    const stmt = ts.isFunctionDeclaration(fn) ? fn : fn.parent?.parent?.parent;
    if (stmt?.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) manual(fn, `EKSPORT qilingan helper ${fnName(fn)} ga tr parametri qo'shildi — chaqiruvchi fayllarni yangilang`);
  }
  // parametr qo'shish
  for (const fn of paramFns) {
    const params = fn.parameters;
    const hasTr = params.some((p) => p.name.getText(sf) === "tr");
    if (hasTr) continue;
    if (params.length) {
      const last = params[params.length - 1];
      if (last.dotDotDotToken) { manual(fn, "rest parametr — tr ni qo'lda qo'shing"); continue; }
      const hasParen = fn.getChildren(sf).some((c) => c.kind === ts.SyntaxKind.OpenParenToken);
      if (!hasParen && params.length === 1) {
        edits.push({ start: last.getStart(sf), end: last.getEnd(), text: `(${last.getText(sf)}, tr: Tr)` });
      } else {
        edits.push({ start: last.getEnd(), end: last.getEnd(), text: ", tr: Tr" });
      }
    } else {
      // bo'sh qavslar: `function f()` yoki `() =>`
      const openParen = fn.getChildren(sf).find((c) => c.kind === ts.SyntaxKind.OpenParenToken);
      if (openParen) edits.push({ start: openParen.getEnd(), end: openParen.getEnd(), text: "tr: Tr" });
      else manual(fn, "qavssiz arrow — tr parametrini qo'lda qo'shing");
    }
  }
  // hook qo'shish
  let needImportHook = false, needImportServer = false, needImportTr = paramFns.size > 0 || modVarNames.size > 0;
  for (const fn of hookFns) {
    const body = fn.body;
    if (!body) continue;
    if (!ts.isBlock(body)) {
      // ifoda tanali arrow: blokka aylantiramiz
      const bt = body.getText(sf);
      const inject = serverMode ? "const { tr } = await getDict();" : "const { tr } = useI18n();";
      edits.push({ start: body.getStart(sf), end: body.getEnd(), text: `{\n  ${inject}\n  return (${bt});\n}` });
      if (serverMode && !fn.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword)) edits.push({ start: fn.getStart(sf), end: fn.getStart(sf), text: "async " });
      serverMode ? (needImportServer = true) : (needImportHook = true);
      continue;
    }
    // mavjud useI18n() destrukturasi bormi?
    let existing = null;
    for (const st of body.statements) {
      if (ts.isVariableStatement(st)) for (const d of st.declarationList.declarations) {
        if (d.initializer && ts.isCallExpression(d.initializer) && d.initializer.expression.getText(sf) === "useI18n" && ts.isObjectBindingPattern(d.name)) existing = d;
        if (d.initializer && ts.isAwaitExpression(d.initializer) && ts.isCallExpression(d.initializer.expression) && d.initializer.expression.expression.getText(sf) === "getDict" && ts.isObjectBindingPattern(d.name)) existing = d;
      }
    }
    if (existing) {
      const els = existing.name.elements;
      if (!els.some((e) => e.name.getText(sf) === "tr")) {
        const at = els[els.length - 1].getEnd();
        edits.push({ start: at, end: at, text: ", tr" });
      }
      continue;
    }
    const insertPos = body.getStart(sf) + 1;
    const indent = "  ";
    if (serverMode) {
      edits.push({ start: insertPos, end: insertPos, text: `\n${indent}const { tr } = await getDict();` });
      if (!fn.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword)) {
        const fnStart = ts.isFunctionDeclaration(fn) ? (fn.modifiers ? fn.modifiers[fn.modifiers.length - 1].getEnd() + 1 : fn.getStart(sf)) : fn.getStart(sf);
        edits.push({ start: fnStart, end: fnStart, text: "async " });
      }
      needImportServer = true;
    } else {
      edits.push({ start: insertPos, end: insertPos, text: `\n${indent}const { tr } = useI18n();` });
      needImportHook = true;
    }
  }
  // useMemo/useCallback deps
  function depsVisit(n) {
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && ["useMemo", "useCallback"].includes(n.expression.text) && n.arguments.length === 2 && ts.isArrayLiteralExpression(n.arguments[1])) {
      const cbStart = n.arguments[0].getStart(sf), cbEnd = n.arguments[0].getEnd();
      const touches = edits.some((e) => e.start >= cbStart && e.end <= cbEnd && /\btr\b/.test(e.text));
      const deps = n.arguments[1];
      if (touches && !deps.elements.some((e) => e.getText(sf) === "tr")) {
        const at = deps.elements.length ? deps.elements[deps.elements.length - 1].getEnd() : deps.getStart(sf) + 1;
        edits.push({ start: at, end: at, text: deps.elements.length ? ", tr" : "tr" });
      }
    }
    ts.forEachChild(n, depsVisit);
  }
  depsVisit(sf);

  if (!edits.length) { console.log(`— ${file}: o'zgarish yo'q`); continue; }

  // ── Importlar ──
  const imports = [];
  if (needImportHook) imports.push({ mod: "@/lib/i18n/provider", spec: "useI18n" });
  if (needImportServer) imports.push({ mod: "@/lib/i18n/server", spec: "getDict" });
  if (needImportTr) imports.push({ mod: "@/lib/i18n/tr", spec: "type Tr" });
  let lastImportEnd = 0;
  const existingImports = sf.statements.filter(ts.isImportDeclaration);
  for (const imp of existingImports) lastImportEnd = Math.max(lastImportEnd, imp.getEnd());
  for (const { mod, spec } of imports) {
    const ex = existingImports.find((i) => i.moduleSpecifier.text === mod);
    if (ex && ex.importClause?.namedBindings && ts.isNamedImports(ex.importClause.namedBindings)) {
      const names = ex.importClause.namedBindings.elements.map((e) => e.getText(sf));
      const bare = spec.replace(/^type /, "");
      if (!names.some((n) => n.replace(/^type /, "") === bare)) {
        const at = ex.importClause.namedBindings.elements[ex.importClause.namedBindings.elements.length - 1].getEnd();
        edits.push({ start: at, end: at, text: `, ${spec}` });
      }
    } else {
      const text = spec.startsWith("type ") ? `\nimport type { ${spec.slice(5)} } from "${mod}";` : `\nimport { ${spec} } from "${mod}";`;
      edits.push({ start: lastImportEnd, end: lastImportEnd, text });
    }
  }

  // ── Qo'llash (oxiridan boshiga) ──
  edits.sort((a, b) => b.start - a.start || b.end - a.end);
  // ustma-ust tushgan tahrirlarni aniqlash
  for (let i = 1; i < edits.length; i++) {
    const a = edits[i - 1], b = edits[i];
    if (b.end > a.start && !(b.start === b.end || a.start === a.end)) { console.error(`XATO: ustma-ust tahrir ${file} @${a.start}/${b.start}`); process.exit(1); }
  }
  let out = src;
  for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  if (!DRY) writeFileSync(file, out);
  for (const { k, at } of keys) { if (!allKeys.has(k)) allKeys.set(k, []); allKeys.get(k).push(at); }
  console.log(`✓ ${file}: ${keys.length} satr, ${hookFns.size} hook, ${paramFns.size} helper-param, ${modVarNames.size} modul-konst`);
}

// ── Hisobot ──
if (report.length) { console.log("\n" + report.join("\n")); }
const keysOut = process.env.KEYS_OUT;
if (keysOut) {
  const obj = {};
  for (const [k, at] of allKeys) obj[k] = at;
  writeFileSync(keysOut, JSON.stringify(obj, null, 1));
  console.log(`\nKalitlar: ${allKeys.size} ta -> ${keysOut}`);
}
