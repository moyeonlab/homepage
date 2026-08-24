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
 * ⚠ 단 `SYNC_STRICT=1` 이면 실패를 **종료코드 1** 로 알린다.
 *   〔2026-08-20 내부 리뷰가 잡은 것〕 정기 동기화 워크플로는 이 스크립트가 조용히
 *   0 으로 끝나면 `if: failure()` 알림이 **영영 안 뜬다.** 즉 매거진이 며칠째 안 잡혀
 *   홈페이지 목록이 낡아가도 아무도 모른다 — 이 파일이 막으려던 바로 그 상황이다.
 *   그래서 **문맥을 나눈다**: 배포 빌드(prebuild)는 지금처럼 살려 두고,
 *   정기 동기화만 엄격 모드로 돌린다. 어느 쪽이든 **지난 스냅샷은 그대로 쓴다**
 *   (엄격 모드도 파일을 망가뜨리지 않는다 — 종료코드만 다르다).
 *
 * 수동 실행: npm run magazine:sync
 * 자동 실행: npm run build 앞에 prebuild 로 붙어 있다 (엄격 아님)
 *           .github/workflows/magazine-sync.yml (SYNC_STRICT=1)
 */
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "..", "content", "magazine-snapshot.json");
// ★ 일부러 pages.dev 를 쓴다 (2026-08-24 커스텀 도메인 magazine.moyeonlab.com 도입 후에도).
//   이 주소는 Cloudflare Pages 가 직접 주는 것이라 DNS·존 설정과 무관하게 항상 살아 있다 —
//   자동 주간 동기화가 도메인 문제로 조용히 죽는 일을 막는다. 사람이 보는 링크만 새 도메인으로.
const SRC = "https://magazine-4r3.pages.dev/index.json";
const TIMEOUT_MS = 15000;
// 엄격 모드 — 실패를 종료코드로 알린다 (정기 동기화 워크플로 전용, 머리말 참조)
const STRICT = process.env.SYNC_STRICT === "1";

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
    if (STRICT) throw new Error(`매거진 목록을 내려받지 못했습니다: ${e.message}`);
    return;
  }

  const list = Array.isArray(data?.발행물) ? data.발행물 : [];
  if (!list.length) {
    // 0건을 덮어쓰면 멀쩡하던 목록이 사라진다. 이건 성공이 아니라 이상 신호다.
    say("!", `받은 목록이 0건입니다 — 덮어쓰지 않고 지난 스냅샷 ${prevCount ?? 0}건을 씁니다`);
    // ⚠ 스스로 「이상 신호」라고 적어 놓고 0 으로 끝나면 알림이 안 뜬다 — 엄격 모드에서는 알린다.
    if (STRICT) throw new Error("매거진 index.json 의 「발행물」이 0건입니다 (형식이 바뀌었을 수 있습니다)");
    return;
  }

  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n", "utf-8");
  const delta = prevCount === null ? "" : prevCount === list.length ? " (변동 없음)" : ` (${prevCount} → ${list.length})`;
  say("✓", `발행물 ${list.length}건 저장${delta}`);
}

// ⚠ throw 를 top-level await 밖으로 그냥 흘리면 Windows 노드가 libuv 어서션으로
//   죽어 종료코드가 127 이 된다(실측). 여기서 받아 **깔끔하게 1** 로 끝낸다 —
//   워크플로는 「0 이냐 아니냐」만 보지만, 크래시 로그는 원인을 가린다.
//   `process.exit()` 대신 `exitCode` 를 쓰는 이유: 남은 출력이 잘리지 않는다.
try {
  await main();
} catch (e) {
  say("!", e.message);
  process.exitCode = 1;
}
