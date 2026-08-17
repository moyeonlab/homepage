import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

/*
  서체 구성 — Figma "Best fonts for websites" 목록에서 고르되,
  그 목록은 전부 라틴 전용이라 한글 짝이 필요하다.

  Inter      : 목록 1번. 화면용으로 설계된 산세리프.
  Pretendard : 한글. 애초에 Inter 계열의 한글 짝으로 만들어져 자소 폭과 획 두께가 맞는다.
               (이미 프로젝트에 설치되어 있고 CSS 로 불러온다)
  Playfair   : 목록의 세리프. "큰 글자에 적합"하다고 소개된 대로 영문 대형 표기에만.
*/
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// 기존 페이지들이 영문에 쓰던 서체 (학과 홈페이지와 동일)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-eng",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOYEON | 모두의문제연구소",
  description:
    "데이터를 통해 우리 주변의 문제를 발견하고, 다양한 전공의 학생들과 함께 모두를 위한 해결책을 만들어가는 한양대학교 학생 학회, 모두의문제연구소(MOYEON)입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${playfair.variable} ${poppins.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
