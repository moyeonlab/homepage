import Link from "next/link";
import { primaryNav, joinNavItem, site, roots } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary-dark)] text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:py-16">
        <div>
          <p className="font-eng text-xl font-extrabold tracking-tight">{site.nameEn}</p>
          <p className="mt-1 text-sm text-white/70">{site.nameKo}</p>
          <p className="mt-6 whitespace-pre-line text-lg font-semibold">{site.slogan}</p>

          {/* 우리가 어디에 속해 있는지를 마지막까지 분명히 둔다 */}
          <dl className="mt-8 space-y-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-white/45">소속</dt>
              <dd className="text-white/80">
                {site.campus} {site.department}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-white/45">지도교수</dt>
              <dd className="text-white/80">{site.advisor}</dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-white/50">메뉴</p>
            <ul className="mt-3 space-y-2">
              {[...primaryNav, joinNavItem].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/80 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/50">채널</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-white/80 hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li className="text-sm text-white/60">
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="hover:text-white">
                    {site.email}
                  </a>
                ) : (
                  "공식 이메일 업데이트 예정"
                )}
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/50">뿌리</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={roots.departmentUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-white/80 hover:text-white"
                >
                  수리데이터사이언스학과
                </a>
              </li>
              {/* 캠퍼스 공식 주소는 확인 후 링크로 교체 예정 */}
              <li className="text-sm text-white/60">{site.campus}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.nameEn}. All rights reserved.
          </p>
          <p>{site.sloganOneLine}</p>
        </div>
      </div>
    </footer>
  );
}
