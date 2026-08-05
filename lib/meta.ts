import type { Metadata } from "next";

/**
 * 페이지 메타데이터를 한 곳에서 만든다.
 *
 * ★ 2026-08-05 — 두 가지를 고치려고 만들었다. 둘 다 빌드 산출물을 직접 열어 확인한 것이다.
 *
 *  ① **모든 페이지의 og 가 루트 것 그대로였다.**
 *     Next.js 는 페이지가 `openGraph` 를 선언하지 않으면 부모 것을 **통째로** 물려준다.
 *     `title` 만 바꾸면 `<title>` 만 바뀌고 `og:title`·`og:url` 은 안 바뀐다.
 *     그래서 `/join` 을 카톡·인스타에 올려도 미리보기가 「MOYEON | 모두의문제연구소」로 뜨고
 *     링크는 `/` 로 갔다. **모집 공고를 뿌리는 링크가 그 페이지를 가리키지 않는다.**
 *
 *  ② **제목에 접미사가 두 번 붙었다.** 루트 template 이 `"%s | MOYEON"` 인데
 *     각 페이지가 `title: "매거진 | MOYEON"` 처럼 직접 붙여서 `매거진 | MOYEON | MOYEON` 이 됐다.
 *     → 여기서는 **접미사 없는 이름만** 넘긴다. 붙이는 것은 루트 template 한 곳이다.
 *
 * `metadataBase` 가 app/layout.tsx 에 있으므로 `path` 는 `/join` 처럼 상대경로로 준다.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  /** 접미사(`| MOYEON`) 없이. 루트 template 이 붙인다 */
  title: string;
  description: string;
  /** `/join` 처럼 앞에 슬래시 */
  path: string;
  /** 없으면 로고 */
  image?: string;
}): Metadata {
  const ogTitle = `${title} | MOYEON`;
  const img = image ?? "/images/logo.png";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: "MOYEON | 모두의문제연구소",
      title: ogTitle,
      description,
      url: path,
      images: [{ url: img }],
    },
    twitter: { card: "summary", title: ogTitle, description, images: [img] },
  };
}
