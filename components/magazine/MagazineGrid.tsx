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
      className="group flex h-full flex-col overflow-hidden border border-[var(--bp-line-strong)] transition-colors duration-300 hover:border-[var(--bp-accent)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--bp-bg-soft)]">
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
        <span className="bp-label !text-[var(--bp-accent)]">
          {badge(item)}
        </span>
        <h3 className="bp-subhead text-lg leading-snug text-[var(--bp-text)]">
          {item.title}
        </h3>
        {item.dek && (
          <p className="line-clamp-2 flex-1 text-sm bp-body text-[var(--bp-muted)]">
            {item.dek}
          </p>
        )}
        <div className="mt-1 flex items-center gap-2 text-xs text-[var(--bp-muted)]">
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

export default function MagazineGrid() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [items, setItems] = useState<MagazineItem[]>([]);

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
        setStatus("ready");
      })
      .catch((e) => {
        if (cancelled) return;
        console.warn("매거진 목록을 불러오지 못했습니다:", e);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-[4/5] animate-pulse bg-[var(--bp-bg-soft)]"
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="border border-dashed border-[var(--bp-line-strong)] p-10 text-center">
        <p className="text-[15px] text-[var(--bp-muted)]">
          지금은 발행물 목록을 불러올 수 없습니다. 매거진 사이트에서 직접 확인해 주세요.
        </p>
        <a
          href={MAGAZINE_SITE}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--bp-accent)] hover:underline"
        >
          매거진 사이트에서 보기 ↗
        </a>
      </div>
    );
  }

  const issues = items.filter((x) => x.형식 !== "brief");
  const briefs = items.filter((x) => x.형식 === "brief");

  return (
    <div className="space-y-16">
      {issues.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold tracking-widest text-[var(--bp-muted)]">
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
          <h3 className="text-sm font-semibold tracking-widest text-[var(--bp-muted)]">
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
