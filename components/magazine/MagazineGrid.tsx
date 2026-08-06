"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MAGAZINE_SITE = "https://magazine-4r3.pages.dev";

interface MagazineItem {
  형식?: string;
  no: number;
  title: string;
  dek?: string;
  url: string;
  thumb?: string;
  cover?: string;
  published?: string;
  date?: string;
  관점?: string;
}

function badge(item: MagazineItem) {
  if (item.형식 === "brief") return `데이터 브리프 ${String(item.no).padStart(2, "0")}`;
  return `매거진 ${item.no}호`;
}

function MagazineCard({ item }: { item: MagazineItem }) {
  const cover = item.thumb || item.cover;
  return (
    <a
      href={`${MAGAZINE_SITE}${item.url}`}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-blue-soft)]">
        {cover && (
          <Image
            src={`${MAGAZINE_SITE}${cover}`}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            unoptimized
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-bg-blue-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--color-primary)]">
          {badge(item)}
        </span>
        <h3 className="text-lg font-bold leading-snug tracking-tight text-[var(--color-text)]">
          {item.title}
        </h3>
        {item.dek && (
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {item.dek}
          </p>
        )}
        <div className="mt-1 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span>{item.published || item.date || ""}</span>
          {item.관점 && (
            <>
              <span aria-hidden>·</span>
              <span>{item.관점}</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}

/**
 * `initial` 은 빌드할 때 구워 넣는 발행물 목록이다 (`content/magazine-snapshot.json`).
 *
 * ★ 이 값이 있어야 **정적 HTML 에 발행물 제목이 들어간다.** 예전에는 브라우저에서만
 *   불러와서, 검색엔진이 매거진을 아예 못 봤고 불러오기가 실패하면 빈 페이지가 됐다.
 *   (2026-08-06 실측: /magazine/ 이 23KB 였고 발행물 제목이 0개였다)
 *
 * 그래도 브라우저에서 한 번 더 불러온다 — 매거진에 새 호가 나와도
 * **홈페이지를 다시 배포하지 않고** 목록이 갱신되게 하기 위해서다.
 * 갱신에 실패하면 구운 목록을 그대로 보여준다 (빈 화면보다 낫다).
 */
export default function MagazineGrid({ initial = [] }: { initial?: MagazineItem[] }) {
  const [items, setItems] = useState<MagazineItem[]>(initial);
  // 구운 목록도 없고 갱신도 실패한 경우에만 안내를 띄운다
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${MAGAZINE_SITE}/index.json`, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list: MagazineItem[] = (data && data.발행물) || [];
        if (!list.length) throw new Error("발행물 0건");
        setItems(list);
        setFailed(false);
      })
      .catch((e) => {
        if (cancelled) return;
        console.warn("매거진 목록 갱신 실패 — 빌드 시점 목록을 씁니다:", e);
        setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!items.length && failed) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-white p-10 text-center">
        <p className="text-[15px] text-[var(--color-text-muted)]">
          지금은 발행물 목록을 불러올 수 없습니다. 매거진 사이트에서 직접 확인해 주세요.
        </p>
        <a
          href={MAGAZINE_SITE}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          매거진 사이트에서 보기 ↗
        </a>
      </div>
    );
  }

  // 구운 목록이 없는 상태에서 갱신을 기다리는 중 (스냅샷 파일이 비어 있을 때만 일어난다)
  if (!items.length) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-[4/5] animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)]"
          />
        ))}
      </div>
    );
  }

  const issues = items.filter((x) => x.형식 !== "brief");
  const briefs = items.filter((x) => x.형식 === "brief");

  return (
    <div className="space-y-16">
      {issues.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-[var(--color-text-muted)]">
            매거진
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {issues.map((item) => (
              <MagazineCard key={`${item.형식}-${item.no}`} item={item} />
            ))}
          </div>
        </div>
      )}
      {briefs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-[var(--color-text-muted)]">
            데이터 브리프
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {briefs.map((item) => (
              <MagazineCard key={`${item.형식}-${item.no}`} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
