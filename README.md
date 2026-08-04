# 모두의 문제 연구소 — 홈페이지 (Next.js 버전)

한양대 ERICA 수리데이터사이언스학과 학회 "모두의 문제 연구소" 홈페이지의 Next.js 재구축 버전입니다.
서버 없이 **정적 HTML로 내보내(`output: "export"`)** Cloudflare에 올립니다.

> 이 브랜치는 기존 `main`의 정적 HTML 사이트를 **대체하는 제안**입니다.
> 병합 전 확인이 필요한 사항은 아래 [병합 전 체크리스트](#병합-전-체크리스트)를 보세요.

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

## 병합 전 체크리스트

- [ ] `main`의 카드뉴스 이미지 42장(`images/cardnews/`)을 이 사이트로 이전
- [ ] `main`의 매거진(`magazine.html`, `js/magazine-feed.js`) 기능 이전 여부 결정
- [ ] `js/news-data.js`를 읽어가는 학과 쇼츠 파이프라인(shorts-studio) 연동 경로 재조정
- [ ] `mds.hanyang.ac.kr` 학생활동 링크가 아직 옛 Google Sites를 가리킴 → 새 주소로 교체 요청
- [ ] 일러스트 3종의 사용 라이선스 확인
