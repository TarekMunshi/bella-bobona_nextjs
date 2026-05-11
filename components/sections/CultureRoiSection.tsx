import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export type CultureRoiBlock = {
  _type: "cultureRoi";
  _key?: string;
  pageHeading?: string;
  stats?:
    | { value?: string; label?: string; description?: string }[]
    | null;
  featureImage?: unknown;
  features?:
    | { title?: string; description?: string }[]
    | null;
  bannerHeadline?: string;
  bannerButtonLabel?: string;
  bannerButtonHref?: string;
  promoTitle?: string;
  promoCurrentPrice?: string;
  promoOriginalPrice?: string;
  promoSavings?: string;
  promoImage?: unknown;
};

export function CultureRoiSection({ block }: { block: CultureRoiBlock }) {
  const stats = block.stats ?? [];
  const feats = block.features ?? [];
  const promoSrc = block.promoImage
    ? urlFor(block.promoImage as unknown)?.width(600).fit("crop").auto("format").url()
    : undefined;
  const featureSrc = block.featureImage
    ? urlFor(block.featureImage as unknown)?.width(1200).height(1400).fit("crop").auto("format").url()
    : undefined;

  const bannerHref = block.bannerButtonHref || "#contact";

  return (
    <section id="culture-roi" className="mx-auto max-w-7xl space-y-12 px-4 py-14 lg:px-10 lg:py-20">
      <h2 className="max-w-4xl text-[28px] font-bold leading-tight tracking-tighter text-neutral-950 sm:text-3xl lg:text-[36px]">
        {block.pageHeading}
      </h2>

      <div className="grid gap-5 lg:grid-cols-3">
        {stats.map((s, i) => (
          <article key={`${s.value}-${i}`} className="rounded-[24px] bg-bb-green-strong px-7 py-8 text-white">
            <div
              className="text-[40px] font-bold leading-none"
              style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
            >
              {s.value}
            </div>
            <p className="mt-5 text-[17px] font-semibold leading-snug">{s.label}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/85">{s.description}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-7 overflow-hidden rounded-[28px] bg-neutral-100 lg:grid-cols-2">
        <div className="relative min-h-[340px]">
          {featureSrc ? (
            <Image
              src={featureSrc}
              alt=""
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="h-full bg-neutral-200" />
          )}
        </div>
        <div className="flex flex-col justify-center gap-6 px-9 py-10">
          <ul className="space-y-6">
            {feats.map((f, i) => (
              <li key={`${f.title}-${i}`} className="flex gap-4">
                <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bb-green text-sm text-white">
                  ✓
                </div>
                <div>
                  <p className="text-[17px] font-bold">{f.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-neutral-800">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-[28px] bg-[#ffd7dc] px-6 py-10 sm:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p
              className="text-[30px] font-bold leading-snug tracking-tighter text-[#8b1538]"
              style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
            >
              {block.bannerHeadline}
            </p>
            <div>
              {block.bannerButtonLabel ? (
                /^https?:\/\//i.test(bannerHref) ? (
                  <a
                    href={bannerHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-[#691220] px-7 py-3 text-sm font-semibold text-white"
                  >
                    {block.bannerButtonLabel}
                  </a>
                ) : (
                  <Link
                    href={bannerHref}
                    className="inline-flex rounded-full bg-[#691220] px-7 py-3 text-sm font-semibold text-white"
                  >
                    {block.bannerButtonLabel}
                  </Link>
                )
              ) : null}
            </div>
          </div>
          <div className="rounded-[24px] bg-[#691220] p-8">
            <div className="rounded-[22px] bg-white p-5 shadow-xl">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-neutral-900">{block.promoCurrentPrice}</span>
                <span className="text-lg text-neutral-400 line-through">{block.promoOriginalPrice}</span>
              </div>
              {block.promoSavings ? (
                <span className="mt-4 inline-flex items-center rounded-full bg-bb-lime/90 px-3 py-1 text-xs font-semibold text-neutral-900">
                  ↘ {block.promoSavings}
                </span>
              ) : null}
              <h3 className="mt-4 text-xl font-semibold">{block.promoTitle}</h3>
              <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
                {promoSrc ? (
                  <Image src={promoSrc} alt={block.promoTitle || ""} fill className="object-cover" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
