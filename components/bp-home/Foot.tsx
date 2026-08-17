import Link from "next/link";
import Rule from "@/components/blueprint/Rule";
import { primaryNav, joinNavItem, site } from "@/content/site";

/** 도면의 표제란. 최소한의 사실만 모노로. */
export default function Foot() {
  const year = new Date().getFullYear();

  return (
    <footer className="bp-dark relative">
      <div className="bp-col">
        <Rule />
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="bp-headline text-2xl">{site.nameKo}</p>
            <p className="bp-label mt-3">{site.nameEn}</p>
            <p className="mt-6 text-sm bp-body text-[var(--bp-muted)]">
              {site.campus}
              <br />
              {site.department}
              <br />
              지도교수 {site.advisor}
            </p>
          </div>

          <nav aria-label="푸터 메뉴">
            <p className="bp-label">메뉴</p>
            <ul className="mt-4 space-y-2.5">
              {[...primaryNav, joinNavItem].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--bp-muted)] transition-colors hover:text-[var(--bp-text)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="bp-label">채널</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-[var(--bp-muted)] transition-colors hover:text-[var(--bp-text)]"
                >
                  Instagram
                </a>
              </li>
              {site.email && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-[var(--bp-muted)] transition-colors hover:text-[var(--bp-text)]"
                  >
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Rule />
        <div className="font-display flex flex-col gap-2 py-8 text-[11px] text-[var(--bp-muted)] sm:flex-row sm:justify-between">
          <p>© {year} {site.nameEn}. All rights reserved.</p>
          <p>{site.sloganOneLine}</p>
        </div>
      </div>
    </footer>
  );
}
