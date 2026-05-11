import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export type MealGridBlock = {
  _type: "mealGrid";
  _key?: string;
  sectionHeading?: string;
  meals?:
    | {
        tag?: string;
        title?: string;
        image?: unknown;
        ratingPercent?: number;
        reviewCount?: number;
      }[]
    | null;
  ctaLabel?: string;
  ctaHref?: string;
};

export function MealGridSection({ block }: { block: MealGridBlock }) {
  const meals = block.meals ?? [];

  return (
    <section id="meal-options" className="bg-bb-lime py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <h2
          className="mx-auto max-w-4xl text-center text-[28px] font-bold leading-tight text-bb-green-strong sm:text-3xl lg:text-[34px]"
          style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif", letterSpacing: "-0.02em" }}
        >
          {block.sectionHeading}
        </h2>
        <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {meals.slice(0, 6).map((m, i) => {
            const src = m.image
              ? urlFor(m.image as unknown)
                  ?.width(560)
                  .height(560)
                  .fit("crop")
                  .auto("format")
                  .url()
              : undefined;
            const reviews = typeof m.reviewCount === "number" ? Math.round(m.reviewCount) : 0;
            const pct =
              typeof m.ratingPercent === "number"
                ? Math.round(m.ratingPercent)
                : undefined;
            return (
              <article
                key={`${m.title}-${i}`}
                className="flex flex-col rounded-[26px] bg-white px-7 pb-7 pt-6 shadow-[0_22px_50px_-30px_rgba(0,0,0,.35)]"
              >
                {m.tag ? (
                  <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-800">
                    <span>{m.tag}</span>
                    <span className="text-neutral-400" aria-hidden>
                      ✕
                    </span>
                  </div>
                ) : (
                  <div className="mb-6 h-8" />
                )}
                <div className="relative mx-auto mb-6 aspect-square w-[58%] max-w-[210px] overflow-hidden rounded-full bg-neutral-950 shadow-[inset_0_0_0_6px_#171717]">
                  {src ? (
                    <Image
                      src={src}
                      alt={m.title || ""}
                      fill
                      className="object-cover"
                      sizes="210px"
                    />
                  ) : null}
                </div>
                <h3 className="text-center text-lg font-bold leading-snug text-neutral-950">
                  {m.title}
                </h3>
                <div className="mt-5 flex flex-1 flex-col justify-end pt-6 text-[13px] text-neutral-500">
                  <span className="inline-flex items-center gap-2 text-neutral-800">
                    <span aria-hidden>👍</span>
                    <span className="font-semibold">{pct != null ? `${pct}%` : "—"}</span>
                    <span>
                      (<span>{reviews}</span> reviews)
                    </span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
        {block.ctaLabel && block.ctaHref ? (
          <div className="mt-14 flex justify-center">
            {/^https?:\/\//i.test(block.ctaHref) ? (
              <a
                href={block.ctaHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-bb-green-strong px-8 py-3 text-sm font-semibold text-white transition hover:bg-bb-green"
              >
                {block.ctaLabel}
              </a>
            ) : (
              <Link
                href={block.ctaHref}
                className="rounded-full bg-bb-green-strong px-8 py-3 text-sm font-semibold text-white transition hover:bg-bb-green"
              >
                {block.ctaLabel}
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
