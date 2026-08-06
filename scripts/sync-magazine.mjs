/**
 * 매거진 발행물 목록을 내려받아 `content/magazine-snapshot.json` 에 저장한다.
 *
 * 왜 필요한가 —
 *   매거진 탭은 원래 브라우저에서만 목록을 불러왔다. 그래서 정적 HTML 에는
 *   발행물 제목이 **한 글자도 없었다**(2026-08-06 실측: /magazine/ 23KB, 홈 140KB).
 *   결과로 셋이 깨졌다.
 *     ① 검색엔진이 매거진을 못 본다 (네이버는 자바스크립트를 잘 안 돌린다)
 *     ② 불러오기가 실패하면 빈 페이지가 된다
 *     ③ /magazine/ 링크를 공유해도 미리보기에 내용이 없다
 *   → 빌드할 때 목록을 HTML 에 구워 넣고, 브라우저에서 최신으로 갱신한다.
 *
 * 실패해도 빌드를 죽이지 않는다. 매거진 사이트가 잠깐 죽었다고 홈페이지 배포가
 * 통째로 실패하면 안 된다 — 그때는 저장소에 커밋된 지난 스냅샷을 그대로 쓴다.
 * (그래서 이 JSON 은 생성물이지만 **커밋한다.**)
 *
 * 수동 실행: npm run magazine:sync
 * 자동 실행: npm run build 앞에 prebuild 로 붙어 있다
 */
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "..", "content", "magazine-snapshot.json");
const SRC = "https://magazine-4r3.pages.dev/index.json";
const TIMEOUT_MS = 15000;

function say(mark, msg) {
  console.log(`  ${mark} 매거진 스냅샷 — ${msg}`);
}

async function main() {
  let prevCount = null;
  try {
    prevCount = (JSON.parse(await readFile(OUT, "utf-8")).발행물 || []).length;
  } catch {
    /* 첫 실행이면 없는 게 정상이다 */
  }

  let data;
  try {
    const res = await fetch(SRC, {
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (e) {
    say("·", `내려받기 실패 (${e.message})`);
    if (prevCount === null) {
      // 스냅샷이 아예 없으면 빈 목록이라도 만들어 둬야 import 가 깨지지 않는다
      await writeFile(OUT, JSON.stringify({ 생성: null, 발행물: [] }, null, 2) + "\n", "utf-8");
      say("!", "지난 스냅샷도 없어 빈 목록으로 만듭니다 — 매거진 탭이 비어 보입니다");
    } else {
      say("→", `지난 스냅샷 ${prevCount}건을 그대로 씁니다 (빌드는 계속됩니다)`);
    }
    return;
  }

  const list = Array.isArray(data?.발행물) ? data.발행물 : [];
  if (!list.length) {
    // 0건을 덮어쓰면 멀쩡하던 목록이 사라진다. 이건 성공이 아니라 이상 신호다.
    say("!", `받은 목록이 0건입니다 — 덮어쓰지 않고 지난 스냅샷 ${prevCount ?? 0}건을 씁니다`);
    return;
  }

  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n", "utf-8");
  const delta = prevCount === null ? "" : prevCount === list.length ? " (변동 없음)" : ` (${prevCount} → ${list.length})`;
  say("✓", `발행물 ${list.length}건 저장${delta}`);
}

await main();
