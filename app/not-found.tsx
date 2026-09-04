import Link from "next/link";
import PageHero from "@/components/shared/PageHero";

/**
 * 404 페이지.
 *
 * 이걸 두기 전에는 Next.js 기본 화면이 나왔다 — **영문 한 줄**("404: This page could not
 * be found.")에 사이트 디자인과 무관한 모습이었다.
 *
 * 이 사이트는 옛 정적 HTML 사이트의 주소를 `public/_redirects` 로 넘겨주고 있다
 * (`/apply.html` → `/join/` 등). 인쇄물 QR·인스타 프로필·검색 색인에 옛 주소가 남아 있어서다.
 * 그 목록에 없는 주소로 들어오는 사람은 반드시 생기고, 그때 만나는 게 이 화면이다.
 * **모집 기간에 이 화면을 만난 사람을 그냥 놓치지 않도록** 지원 페이지로 보낸다.
 *
 * `robots: noindex` 는 Next.js 가 기본으로 붙인다.
 */
export default function NotFound() {
  return (
    <>
      <PageHero
        label="404"
        title={"찾는 페이지가 없습니다."}
        description="주소가 바뀌었거나 잘못 입력됐습니다. 아래에서 원하는 곳으로 이동할 수 있습니다."
      />
      <section className="container-page py-16 md:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/", title: "홈", desc: "모연이 어떤 학회인지" },
            { href: "/join/", title: "지원하기", desc: "모집 일정과 지원 방법" },
            // ⛔ 2026-09-04 — 네비와 같은 곳으로 보낸다. 옛 `/magazine/` 은 홈페이지 안
            //   목록이라, 404 에서 그리로 보내면 «매거진에 못 들어가는» 길로 다시 보낸다.
            { href: "https://magazine.moyeonlab.com", title: "매거진", desc: "공공데이터로 쓴 발행물" },
            { href: "/projects/", title: "프로젝트", desc: "지금까지 한 분석들" },
            { href: "/people/", title: "함께하는 사람들", desc: "운영진과 부서" },
            { href: "/contact/", title: "문의", desc: "협업·제휴 제안" },
          ].map((x) => (
            <li key={x.href}>
              <Link
                href={x.href}
                className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <span className="text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
                  {x.title}
                </span>
                <span className="mt-1 text-sm text-[var(--color-text-muted)]">{x.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
