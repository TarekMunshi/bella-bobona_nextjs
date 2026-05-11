import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export type HeroBlock = {
  _type: "hero";
  _key?: string;
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: unknown;
  dishTags?: string[] | null;
  googlePlayHref?: string;
  appStoreHref?: string;
  ratingBadge?: string;
};

export function HeroSection({ block, priority }: { block: HeroBlock; priority?: boolean }) {
  const src = block.image
    ? urlFor(block.image as unknown)
        ?.width(1600)
        .height(1200)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  const ctaHref = block.ctaHref || "#contact";
  const usesNativeAnchor =
    /^https?:\/\//i.test(ctaHref) || ctaHref.startsWith("mailto:");

  return (
    <section
      id="hero"
      className="mx-auto max-w-7xl px-4 py-10 lg:px-10 lg:py-14"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="anim-fade-up flex flex-col justify-center gap-6 rounded-[28px] bg-bb-green px-8 py-12 text-bb-lime shadow-sm sm:px-12 lg:min-h-[420px]">
          <h1
            className="max-w-xl text-[32px] font-bold leading-tight sm:text-4xl lg:text-[40px]"
            style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif", letterSpacing: "-0.03em" }}
          >
            {block.headline}
          </h1>
          {block.subheadline ? (
            <p className="max-w-lg text-base leading-relaxed text-white/92">
              {block.subheadline}
            </p>
          ) : null}
          <div>
            {usesNativeAnchor ? (
              <a
                href={ctaHref}
                target={ctaHref.startsWith("mailto:") ? undefined : "_blank"}
                rel={ctaHref.startsWith("mailto:") ? undefined : "noreferrer"}
                className="inline-flex rounded-full bg-bb-lime px-6 py-3 text-sm font-semibold text-bb-green transition hover:brightness-105"
              >
                {block.ctaLabel}
              </a>
            ) : (
              <Link
                href={ctaHref}
                className="inline-flex rounded-full bg-bb-lime px-6 py-3 text-sm font-semibold text-bb-green transition hover:brightness-105"
              >
                {block.ctaLabel}
              </Link>
            )}
          </div>
        </div>

        <div className="relative min-h-[340px] overflow-hidden rounded-[28px] bg-neutral-200 lg:min-h-[420px]">
          {src ? (
            <>
              <Image
                src={src}
                alt=""
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
              {block.dishTags?.slice(0, 3).map((t, i) => (
                <div
                  key={`${t}-${i}`}
                  className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold shadow-sm sm:left-6 sm:top-8"
                  style={{ marginTop: `${i * 40}px` }}
                >
                  {t}
                </div>
              ))}
              <div className="absolute bottom-4 left-4 flex flex-wrap items-end gap-3 sm:bottom-6">
                {block.googlePlayHref ? (
                  <a href={block.googlePlayHref} target="_blank" rel="noreferrer">
                    <span className="inline-block rounded-md bg-black px-2 py-1 text-[10px] font-medium text-white shadow">
                      Get it on Google Play
                    </span>
                  </a>
                ) : null}
                {block.appStoreHref ? (
                  <a href={block.appStoreHref} target="_blank" rel="noreferrer">
                    <span className="inline-block rounded-md bg-black px-2 py-1 text-[10px] font-medium text-white shadow">
                      App Store
                    </span>
                  </a>
                ) : null}
              </div>
              {block.ratingBadge ? (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow sm:bottom-6 sm:right-6">
                  <span className="rounded bg-white text-lg">G</span>
                  {block.ratingBadge}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
