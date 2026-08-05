# 모두의 문제 연구소 — 홈페이지 (Next.js 버전)

한양대 ERICA 수리데이터사이언스학과 학회 "모두의 문제 연구소" 홈페이지의 Next.js 재구축 버전입니다.
서버 없이 **정적 HTML로 내보내(`output: "export"`)** Cloudflare에 올립니다.

> **2026-08-05:** 이 버전이 이미 `main`입니다 (`main` == `nextjs-site`, 차이 0커밋).
> 「제안 브랜치」라는 설명은 낡은 것이라 지웠습니다. 남은 항목은 아래 [남은 것](#남은-것)에 있습니다.

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
```

Turbopack은 이 프로젝트의 상위 경로에 한글이 있으면 크래시하므로 `dev`/`build` 모두 `--webpack`으로 고정되어 있습니다. **`--turbopack`으로 바꾸지 마세요.**

## 빌드 · 배포

```bash
npm run build    # out/ 에 정적 HTML 생성
npm run preview  # 배포와 동일한 환경으로 로컬 확인 (wrangler)
npm run deploy   # Cloudflare에 배포 — 프로덕션에 반영됩니다
```

Cloudflare Workers 빌드 설정(대시보드):

| 항목 | 값 |
|---|---|
| Build command | `npm ci && npm run build` |
| Deploy command | `npx wrangler deploy` |
| 정적 자산 경로 | `./out` (`wrangler.jsonc`에 지정됨) |

## 내용 수정 방법 (코드 몰라도 됨)

내용은 전부 `content/` 폴더의 데이터 파일에 있습니다. 이 파일들만 고치면 사이트에 반영됩니다.

| 수정할 것 | 파일 |
|---|---|
| 학회명·슬로건·소개문구·이메일·인스타 | `content/site.ts` |
| 프로젝트 | `content/projects.ts` |
| 연혁 | `content/history.ts` |
| 지도교수·운영진·역대 회장단 | `content/people.ts` |
| 모집 상태·일정·지원 링크 | `content/recruitment.ts` |
| 자주 묻는 질문 | `content/faq.ts` |

이미지는 `public/images/` 에 넣고 `/images/파일명` 으로 참조합니다.

## 페이지 구성

`/` 홈 · `/about` 소개 · `/activities` 활동 · `/projects` 프로젝트(+ 상세) · `/people` 사람들 · `/join` 지원하기

## 원칙

확인되지 않은 정보는 **지어내지 않습니다.** 자료가 없는 항목은 "자료 준비 중" / "업데이트 예정"으로 표시하고,
데이터 파일에 `// TODO` 주석을 남깁니다. 개인 전화번호는 공개하지 않습니다.

## 남은 것

**끝난 것** (2026-08-05 실측으로 확인)

- [x] 카드뉴스 이미지 이전 — `public/images/cardnews/` **46장**. `content/projects.ts`가 참조 중
- [x] 매거진 기능 이전 — `/magazine` + `components/magazine/MagazineGrid.tsx`.
      매거진이 `index.json`을 내보내고 홈페이지가 fetch 한다. **CORS 실측 확인**(`access-control-allow-origin: *`, 발행물 5건)
- [x] 일러스트 3종 라이선스 확인

**아직 남은 것**

- [ ] **Cloudflare Web Analytics 스니펫** — 지금 응답 HTML에 `beacon.min.js`가 **없다 = 방문자 수를 아무도 모른다.**
      이 사이트는 Pages가 아니라 **Workers**라 대시보드 토글이 없다. Web Analytics에서 사이트를 추가해
      **스니펫(토큰 포함)**을 받아 `</body>` 앞에 넣어야 한다. **토큰이 있어야 진행 가능**
- [ ] `js/news-data.js`를 읽어가는 학과 쇼츠 파이프라인(shorts-studio) 연동 경로 확인
      (`lib/news.ts`가 이 파일을 유일한 원본으로 읽는다 — **복제하지 말 것**)
- [ ] `mds.hanyang.ac.kr` 학생활동 링크가 아직 옛 Google Sites를 가리킴 → 새 주소로 교체 요청
- [ ] 도메인 확정 후 연결. 지금 주소가 세 곳에 하드코딩돼 있다 —
      `app/layout.tsx`(SITE_URL) · `components/magazine/MagazineGrid.tsx`(MAGAZINE_SITE) · `content/history.ts`(링크)

## 메타데이터 규칙 — 페이지를 추가할 때

**페이지 `metadata`는 `lib/meta.ts`의 `pageMeta()`로 만든다.** 직접 쓰지 않는다.

```ts
export const metadata: Metadata = pageMeta({
  title: "지원하기",              // ← 접미사(`| MOYEON`) 없이. 루트 template이 붙인다
  description: "…",
  path: "/join",                  // ← og:url·canonical 이 된다
});
```

2026-08-05에 실제로 났던 문제 두 가지를 막기 위한 것이다 (빌드 산출물을 열어 확인):

| 증상 | 원인 |
|---|---|
| 모든 페이지의 제목이 `X \| MOYEON \| MOYEON` | 페이지가 접미사를 직접 붙이는데 루트 `template`도 붙임 |
| `/join`을 공유해도 미리보기가 홈이고 링크가 `/`로 감 | **Next.js는 페이지가 `openGraph`를 선언하지 않으면 부모 것을 통째로 물려준다.** `title`만 바꾸면 `<title>`만 바뀌고 `og:title`·`og:url`은 안 바뀐다 |
