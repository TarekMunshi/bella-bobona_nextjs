import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

export type SupportCenterBlock = {
  _type: "supportCenter";
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: unknown;
};

export function SupportCenterSection({ block }: { block: SupportCenterBlock }) {
  const src = block.image
    ? urlFor(block.image as unknown)
        ?.width(920)
        .height(700)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;
  const href = block.ctaHref || "/";

  return (
    <section className="bg-bb-paper py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-10">
        <div className="space-y-6">
          <h2 className="text-[26px] font-bold tracking-tighter text-bb-green-strong">{block.heading}</h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-bb-green-strong/95">{block.body}</p>
          {/^https?:\/\//i.test(href) ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-bb-green px-8 py-3 text-sm font-semibold text-white"
            >
              {block.ctaLabel}
            </a>
          ) : (
            <Link
              href={href}
              className="inline-flex rounded-full bg-bb-green px-8 py-3 text-sm font-semibold text-white"
            >
              {block.ctaLabel}
            </Link>
          )}
        </div>
        <div className="relative aspect-[16/11] overflow-hidden rounded-[28px] bg-neutral-200">
          {src ? <Image src={src} alt="" fill sizes="560px" className="object-cover" /> : null}
        </div>
      </div>
    </section>
  );
}
