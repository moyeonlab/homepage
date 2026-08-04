import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 홈 디렉토리에 있는 무관한 lockfile 때문에 워크스페이스 루트가 잘못 추론되는 것을 방지
  outputFileTracingRoot: path.join(__dirname),

  // 서버 라우트가 없는 사이트라 정적 HTML로 내보내 Cloudflare에 올린다
  output: "export",

  // 정적 내보내기에는 Next의 이미지 최적화 서버가 없으므로 원본을 그대로 쓴다
  images: { unoptimized: true },

  // /about -> /about/index.html 로 내보내 정적 호스팅에서 경로가 어긋나지 않게 한다
  trailingSlash: true,
};

export default nextConfig;
