import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// 수리데이터사이언스학과 공식 홈페이지가 영문에 쓰는 서체를 그대로 따른다
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-eng",
  display: "swap",
});

const SITE_URL = "https://homepage.moyeonlabs.workers.dev";

/**
 * Cloudflare Web Analytics 토큰. **여기에 토큰만 붙여넣으면 켜진다.**
 *
 *   Cloudflare 대시보드 → Analytics & Logs → Web Analytics → Add a site
 *   → 도메인 입력 → 나오는 스니펫의 `"token": "…"` 안쪽 32자리만 아래 따옴표에 넣는다.
 *
 * ★ 이 토큰은 비밀이 아니다 — 모든 방문자의 HTML 에 그대로 실려 나가는 값이라 커밋해도 된다.
 * ★ 이 사이트는 Pages 가 아니라 **Workers** 라 대시보드 토글로 자동 주입되지 않는다.
 *   (매거진 `magazine-4r3.pages.dev` 는 Pages 라서 토글 하나면 된다 — 방식이 서로 다르다)
 *
 * 비어 있으면 아무것도 렌더링하지 않는다. 넣기 전까지는 **방문자 수를 아무도 모른다.**
 * 확인법: 배포 뒤 페이지 소스에 `beacon.min.js` 가 보이면 켜진 것이다.
 */
const CF_ANALYTICS_TOKEN = "69ab4532514b40dcb6d2b2d6dd441e80";
const TITLE = "MOYEON | 모두의문제연구소";
const DESCRIPTION =
  "데이터를 통해 우리 주변의 문제를 발견하고, 다양한 전공의 학생들과 함께 모두를 위한 해결책을 만들어가는 한양대학교 학생 학회, 모두의문제연구소(MOYEON)입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | MOYEON",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "MOYEON | 모두의문제연구소",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/images/logo.png" }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${poppins.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* ★ 클라우드플레어가 준 스니펫 그대로 — type="module".
            지금 beacon.min.js 는 ES 모듈이라 classic script 로 부르면 실행이 안 될 수 있다.
            next/script 대신 평범한 <script> 를 쓴다 — 정적 내보내기(output: "export")라
            이 태그가 그대로 HTML 에 실려 나가고, 그게 클라우드플레어가 기대하는 형태다. */}
        {CF_ANALYTICS_TOKEN && (
          <script
            type="module"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  );
}
