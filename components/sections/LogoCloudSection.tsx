import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { urlFor } from "@/lib/sanity/image";

export type LogoCloudBlock = {
  _type: "homepageLogoCloud";
  _key?: string;
  headline?: string;
  logos?: {
    asset?: unknown;
    href?: string;
  }[] | null;
};

export function LogoCloudSection({ block }: { block: LogoCloudBlock }) {
  const logos = block.logos ?? [];
  return (
    <section id="customer-logos" className="py-14">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {block.headline}
      </p>
      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-8 px-6 opacity-80 grayscale">
        {logos.map((row, idx) => {
          const url = row.asset
            ? urlFor(row.asset as unknown)
                ?.height(56)
                .fit("max")
                .auto("format")
                .url()
            : null;
          if (!url) return null;
          const img = (
            <Image src={url} alt="" height={48} width={160} className="h-10 w-auto object-contain" />
          );
          const href = row.href;
          let wrap: ReactNode = img;
          if (href) {
            if (href.startsWith("/") || href.startsWith("#")) {
              wrap = <Link href={href}>{img}</Link>;
            } else {
              wrap = (
                <a href={href} target="_blank" rel="noreferrer">
                  {img}
                </a>
              );
            }
          }
          return (
            <div key={idx}>{wrap}</div>
          );
        })}
      </div>
    </section>
  );
}
