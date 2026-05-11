import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/links";
import { hrefFromDestination } from "@/lib/links";
import { urlFor } from "@/lib/sanity/image";

export type MenuItem = {
  label?: string | null;
  destination?: Destination | null;
  submenu?: MenuItem[] | null;
};

type NavProps = {
  brandText?: string | null;
  logo?: Record<string, unknown> | null;
  items?: MenuItem[] | null;
  downloadMenu?: {
    label?: string | null;
    destination?: Destination | null;
  } | null;
  primaryCta?: {
    label?: string | null;
    destination?: Destination | null;
  } | null;
  languageEnHref?: string | null;
  languageDeHref?: string | null;
};

function InnerLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
}

export function SiteHeader({ menu }: { menu: NavProps | null | undefined }) {
  if (!menu) return null;

  const logoUrl = menu.logo
    ? urlFor(menu.logo as unknown)
      ?.width(412)
      .format("webp")
      .auto("format")
      .url()
    : undefined;

  const items = menu.items ?? [];

  const navText =
    "font-(family-name:--font-inter) text-lg font-medium leading-[26px] tracking-[-0.04px] text-[#1A211E]";

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
      <div className="mx-auto box-border flex h-[88px] w-full max-w-[1440px] flex-col items-center justify-center gap-[10px] px-4 sm:px-8 lg:px-[80px]">
        <div className="flex w-full min-h-0 min-w-0 flex-1 shrink-0 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-8 md:gap-[64px]">
            <InnerLink href="/" className="shrink-0">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={menu.brandText || "Bella&Bona"}
                  width={206}
                  height={36}
                  quality={100}
                  className="w-[206.182px] shrink-0 object-contain aspect-63/11"
                />
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-figtree), system-ui, sans-serif",
                    color: "#024930",
                  }}
                  className="text-xl font-semibold uppercase tracking-[0.2em]"
                >
                  {menu.brandText || "Bella&Bona"}
                </span>
              )}
            </InnerLink>

            <nav
              aria-label="Primary"
              className={`hidden min-w-0 items-end gap-x-10 md:flex ${navText}`}
            >
              {items.map((item, idx) => {
                const href = hrefFromDestination(item.destination);
                const kids = item.submenu?.filter((s) => s.label);
                if (kids?.length) {
                  return (
                    <div key={`${item.label}-${idx}`} className="group relative">
                      <button
                        type="button"
                        className={`inline-flex items-center gap-1 ${navText}`}
                      >
                        {item.label}{" "}
                        <svg
                          aria-hidden="true"
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="transition group-hover:-rotate-180"
                        >
                          <path d="M10 13L4 7h12l-6 6z" />
                        </svg>
                      </button>
                      <div className="pointer-events-none invisible absolute left-0 top-full z-30 min-w-[180px] translate-y-1 rounded-2xl border border-black/10 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                        {kids.map((sub, j) => (
                          <InnerLink
                            key={`${sub.label}-${j}`}
                            href={hrefFromDestination(sub.destination)}
                            className="block rounded-xl px-3 py-2 text-sm text-neutral-800 hover:bg-bb-lime/40"
                          >
                            {sub.label}
                          </InnerLink>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <InnerLink
                    key={`${item.label}-${idx}`}
                    href={href}
                    className={navText}
                  >
                    {item.label}
                  </InnerLink>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-end gap-10">
            {menu.downloadMenu?.label ? (
              <InnerLink
                href={hrefFromDestination(menu.downloadMenu.destination)}
                className="font-(family-name:--font-inter) text-lg font-normal leading-[26px] tracking-[-0.04px] text-[#1A211E] underline decoration-solid underline-offset-auto [text-decoration-skip-ink:none]"
              >
                {menu.downloadMenu.label}
              </InnerLink>
            ) : null}
            {menu.primaryCta?.label ? (
              <InnerLink
                href={hrefFromDestination(menu.primaryCta.destination)}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-[80px] bg-[rgba(0,38,22,0.9)] px-6 font-(family-name:--font-inter) text-lg font-medium leading-[26px] tracking-[-0.04px] text-[#FBFEFC] transition hover:bg-[rgba(0,38,22,1)]"
              >
                {menu.primaryCta.label}
              </InnerLink>
            ) : null}
            <div className="flex items-stretch rounded-[4px] border border-[rgba(0,31,21,0.10)]">
              <InnerLink
                href={menu.languageEnHref || "#"}
                className="relative z-1 flex h-8 w-[89px] items-center justify-center rounded-[4px] border border-[rgba(0,31,21,0.10)] bg-white font-(family-name:--font-inter) text-sm font-medium leading-5 tracking-normal text-[rgba(0,8,5,0.90)] shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_2px_1px_-1px_rgba(0,0,0,0.05),0_1px_4px_0_rgba(0,31,21,0.10),0_0_0_0.5px_rgba(0,0,0,0.05)]"
              >
                EN
              </InnerLink>
              <InnerLink
                href={menu.languageDeHref || "#"}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0, 20, 10, 0.20) 0%, rgba(0, 45, 30, 0.07) 100%), rgba(255, 255, 255, 0.90)",
                }}
                className="flex h-8 min-w-[89px] flex-1 items-center justify-center gap-2 self-stretch rounded-[4px] px-4 font-(family-name:--font-inter) text-sm font-normal leading-5 tracking-normal text-[rgba(0,8,5,0.90)]"
              >
                DE
              </InnerLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
