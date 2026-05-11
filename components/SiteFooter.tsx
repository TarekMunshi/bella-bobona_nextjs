import Link from "next/link";

type FooterLink = { label?: string | null; url?: string | null };
type FooterColumn = {
  title?: string | null;
  links?: FooterLink[] | null;
};

type SiteFooterProps = {
  footer: {
    followTitle?: string | null;
    followIntro?: string | null;
    contactEmail?: string | null;
    socialLinks?: { label?: string | null; url?: string | null }[] | null;
    columns?: FooterColumn[] | null;
    brandText?: string | null;
    copyrightText?: string | null;
  } | null;
};

function NavHref({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http")
  ) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function SiteFooter({ footer }: SiteFooterProps) {
  if (!footer) return null;

  const cols = footer.columns?.filter((c) => c.title) ?? [];

  return (
    <footer className="mt-20 bg-bb-green pb-10 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            {footer.followTitle ? (
              <h3 className="text-sm font-semibold tracking-wide">{footer.followTitle}</h3>
            ) : null}
            {footer.followIntro ? (
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">{footer.followIntro}</p>
            ) : null}
            {footer.contactEmail ? (
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                <span aria-hidden>✉️</span>
                <NavHref href={`mailto:${footer.contactEmail}`}>{footer.contactEmail}</NavHref>
              </p>
            ) : null}
            {footer.socialLinks?.length ? (
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-wider">
                {footer.socialLinks.map((s, i) =>
                  s?.url && s.label ? (
                    <NavHref
                      key={`${s.url}-${i}`}
                      href={s.url}
                      className="underline decoration-white/35 underline-offset-4 hover:text-bb-lime"
                    >
                      {s.label}
                    </NavHref>
                  ) : null,
                )}
              </div>
            ) : null}
          </div>
          {cols.map((col, i) => (
            <div key={`${col.title}-${i}`}>
              <h3 className="text-sm font-semibold tracking-wide">{col.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {(col.links ?? []).map((l, j) =>
                  l?.label && l.url ? (
                    <li key={`${l.url}-${j}`}>
                      <NavHref href={l.url} className="hover:text-bb-lime">
                        {l.label}
                      </NavHref>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <p
            className="text-center text-[clamp(2.75rem,12vw,8rem)] font-bold uppercase leading-none tracking-tighter text-bb-lime"
            style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
          >
            {footer.brandText?.toUpperCase() || "BELLABONA"}
          </p>
        </div>
        <div className="mt-10 border-t border-white/25 pt-8 text-center text-xs text-white/70">
          {footer.copyrightText}
        </div>
      </div>
    </footer>
  );
}
