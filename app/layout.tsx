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
      </body>
    </html>
  );
}
