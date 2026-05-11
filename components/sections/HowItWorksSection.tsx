import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export type HowItWorksBlock = {
  _type: "howItWorks";
  _key?: string;
  sectionHeading?: string;
  steps?:
    | {
        media?: unknown;
        stepLabel?: string;
        title?: string;
        description?: string;
      }[]
    | null;
  ctaLabel?: string;
  ctaHref?: string;
};

export function HowItWorksSection({ block }: { block: HowItWorksBlock }) {
  const steps = block.steps ?? [];
  const href = block.ctaHref || "#contact";

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 lg:px-10">
      <h2 className="text-center text-[28px] font-bold leading-snug tracking-tighter sm:text-3xl lg:text-[34px]">
        {block.sectionHeading}
      </h2>
      <div className="mx-auto mt-14 grid gap-10 md:grid-cols-3">
        {steps.map((s, i) => {
            const src = s.media
              ? urlFor(s.media as unknown)
                  ?.width(960)
                  .height(900)
                  .fit("crop")
                  .auto("format")
                  .url()
              : undefined;
          return (
            <article key={`${s.title}-${i}`} className="flex flex-col">
              <div className="relative flex-1 overflow-hidden rounded-[26px] bg-neutral-100">
                <div className="relative aspect-[16/17]">
                  {src ? (
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-neutral-50 to-neutral-200" />
                  )}
                </div>
              </div>
              <div className="pt-8">
                {s.stepLabel ? (
                  <span className="inline-flex rounded-full bg-bb-lime/80 px-3 py-1 text-[11px] font-semibold text-bb-green">
                    {s.stepLabel}
                  </span>
                ) : null}
                <h3 className="mt-4 text-lg font-bold tracking-tight text-neutral-950">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                  {s.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
      {block.ctaLabel ? (
        <div className="mt-12 flex justify-center">
          {/^https?:\/\//i.test(href) ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-bb-green px-10 py-3 text-sm font-semibold text-white"
            >
              {block.ctaLabel}
            </a>
          ) : (
            <Link
              href={href}
              className="rounded-full bg-bb-green px-10 py-3 text-sm font-semibold text-white"
            >
              {block.ctaLabel}
            </Link>
          )}
        </div>
      ) : null}
    </section>
  );
}
