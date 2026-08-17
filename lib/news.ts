import fs from "node:fs";
import path from "node:path";
import type { NewsItem } from "./types";

/**
 * js/news-data.js를 소식 데이터의 유일한 원본으로 쓴다 (별도 content/news.ts로 복제하지 않음).
 * 같은 파일을 학과 홍보 쇼츠 파이프라인(apps/shorts/scripts/collect_moyeon.js)도 읽는데,
 * 두 곳에 데이터를 복제하면 한쪽만 갱신되고 다른 쪽은 밀리는 사고가 난다
 * (매거진 발행물을 4곳에 따로 복사하다 이미 한 번 겪은 문제 — js/magazine-feed.js 참고).
 * 빌드 타임에 서버에서만 파싱하므로 브라우저에 eval이 노출되지 않는다.
 */
export function getNewsItems(): NewsItem[] {
  const filePath = path.join(process.cwd(), "js", "news-data.js");
  const src = fs.readFileSync(filePath, "utf8");
  const match = /var\s+newsItems\s*=\s*(\[[\s\S]*?\])\s*;/.exec(src);
  if (!match) throw new Error("news-data.js에서 newsItems 배열을 찾지 못함");

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const items = new Function(`return ${match[1]}`)() as NewsItem[];
  return items.sort((a, b) => b.id - a.id);
}
