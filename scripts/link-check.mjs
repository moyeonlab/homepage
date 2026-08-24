#!/usr/bin/env node
/**
 * 링크·자산 점검 — 빌드 결과(out/)를 훑어 «깨진 것»을 찾는다.
 *
 *   node scripts/link-check.mjs           내부 링크·이미지만 (네트워크 없음, 빠름)
 *   node scripts/link-check.mjs --바깥     바깥 링크까지 실제로 두드려 본다
 *
 * ──────────────────────────────────────────────────────────────────
 * 왜 있나 (2026-08-25)
 * ──────────────────────────────────────────────────────────────────
 * 이 사이트는 정적 내보내기(static export)라 «빌드가 성공했다»는 것이
 * «링크가 살아 있다»를 뜻하지 않는다. Next.js 는 존재하지 않는 경로로 가는
 * <Link> 도 그냥 만들어 낸다. 이미지도 마찬가지다 — 파일이 없어도 빌드는 된다.
 *
 * 실제로 이 저장소는 슬래시 하나로 한 번 데었다(`/join` ↔ `/join/`).
 * 그런 것은 사람이 눈으로 훑어서는 못 잡는다.
 *
 * ⚠ 바깥 링크 검사는 «없어졌다»의 증거가 되기 어렵다 —
 *   인스타그램은 없는 게시물에도 로그인 벽을 돌려주고(그래서 200),
 *   봇을 막는 사이트는 살아 있어도 403 을 준다. 그래서 기본은 끄고,
 *   켜더라도 «참고»로만 적는다. 판정하지 않는다.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const OUT = join(ROOT, "out");
const 바깥검사 = process.argv.includes("--바깥");

if (!existsSync(OUT)) {
  console.error("out/ 이 없습니다 — 먼저 `npm run build` 를 돌리세요.");
  process.exit(2);
}

/** out/ 아래 모든 파일 */
function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const 모든파일 = walk(OUT);
const html파일 = 모든파일.filter((p) => p.endsWith(".html"));
const 있는경로 = new Set(모든파일.map((p) => "/" + relative(OUT, p).replace(/\\/g, "/")));

/** 사이트 경로 하나가 실제로 열리는가 */
function 열리나(url) {
  const p = url.split(/[?#]/)[0];
  if (있는경로.has(p)) return true;
  if (있는경로.has(p + ".html")) return true;
  if (p.endsWith("/") && 있는경로.has(p + "index.html")) return true;
  if (!p.endsWith("/") && 있는경로.has(p + "/index.html")) return true;
  return false;
}

const 내부깨짐 = [];
const 이미지깨짐 = [];
const 바깥링크 = new Map();   // url -> [찾은 곳]

for (const f of html파일) {
  const 쪽 = "/" + relative(OUT, f).replace(/\\/g, "/");
  const html = readFileSync(f, "utf8");

  for (const m of html.matchAll(/<a\b[^>]*?href=["']([^"']+)["']/gi)) {
    const href = m[1].trim();
    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    if (/^https?:\/\//i.test(href)) {
      if (!바깥링크.has(href)) 바깥링크.set(href, []);
      바깥링크.get(href).push(쪽);
      continue;
    }
    if (href.startsWith("/") && !열리나(href)) 내부깨짐.push([쪽, href]);
  }

  for (const m of html.matchAll(/<img\b[^>]*?src=["']([^"']+)["']/gi)) {
    const src = m[1].trim();
    if (!src || /^(data:|https?:)/i.test(src)) continue;
    // Next.js 이미지 최적화 경로는 원본 쿼리를 본다
    const 실제 = src.startsWith("/_next/image")
      ? decodeURIComponent(new URLSearchParams(src.split("?")[1] || "").get("url") || "")
      : src;
    if (실제.startsWith("/") && !열리나(실제)) 이미지깨짐.push([쪽, 실제]);
  }
}

console.log(`\n=== 링크 점검 ===`);
console.log(`HTML ${html파일.length}쪽 · 파일 ${모든파일.length}개\n`);

let 실패 = 0;

if (내부깨짐.length) {
  실패 += 내부깨짐.length;
  console.log(`✖ 내부 링크 ${내부깨짐.length}건이 열리지 않습니다`);
  for (const [쪽, href] of 내부깨짐.slice(0, 25)) console.log(`    ${쪽}  →  ${href}`);
  if (내부깨짐.length > 25) console.log(`    … 외 ${내부깨짐.length - 25}건`);
} else console.log("✓ 내부 링크 전부 열림");

if (이미지깨짐.length) {
  실패 += 이미지깨짐.length;
  console.log(`\n✖ 이미지 ${이미지깨짐.length}건이 없습니다`);
  for (const [쪽, src] of 이미지깨짐.slice(0, 25)) console.log(`    ${쪽}  →  ${src}`);
} else console.log("✓ 이미지 전부 있음");

// 안 쓰이는 이미지 — 지우라는 뜻이 아니라 «알고는 있자»는 것이다
const 쓰인이미지 = new Set();
for (const f of html파일) {
  const html = readFileSync(f, "utf8");
  for (const m of html.matchAll(/\/images\/[^\s"'?)]+/g)) 쓰인이미지.add(decodeURIComponent(m[0]));
}
const 모든이미지 = [...있는경로].filter((p) => p.startsWith("/images/"));
const 안쓰임 = 모든이미지.filter((p) => !쓰인이미지.has(p));
console.log(`\n· /images 자산 ${모든이미지.length}개 중 어느 쪽에서도 안 쓰이는 것 ${안쓰임.length}개`);
for (const p of 안쓰임.slice(0, 15)) console.log(`    ${p}`);
if (안쓰임.length > 15) console.log(`    … 외 ${안쓰임.length - 15}개`);

console.log(`\n· 바깥 링크 ${바깥링크.size}종`);
if (바깥검사) {
  console.log("  (두드려 봅니다 — 결과는 «참고»입니다. 판정하지 않습니다)");
  for (const [url, 쪽들] of 바깥링크) {
    let 표시;
    try {
      const r = await fetch(url, { method: "GET", redirect: "follow",
        headers: { "user-agent": "Mozilla/5.0 (moyeonlab link check)" },
        signal: AbortSignal.timeout(12000) });
      표시 = `${r.status}`;
    } catch (e) { 표시 = `실패(${e.name})`; }
    const 수상 = !/^2\d\d$/.test(표시);
    console.log(`    ${수상 ? "?" : " "} ${표시.padEnd(12)} ${url}`);
    if (수상) console.log(`      ↳ ${쪽들.slice(0, 3).join(", ")}`);
  }
} else {
  const 도메인 = new Map();
  for (const u of 바깥링크.keys()) {
    const h = new URL(u).hostname.replace(/^www\./, "");
    도메인.set(h, (도메인.get(h) || 0) + 1);
  }
  for (const [h, n] of [...도메인].sort((a, b) => b[1] - a[1]))
    console.log(`    ${String(n).padStart(3)}  ${h}`);
  console.log("  (--바깥 을 붙이면 실제로 두드려 봅니다)");
}

console.log();
process.exit(실패 ? 1 : 0);
