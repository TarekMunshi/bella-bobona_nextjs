import type { Metadata } from "next";

import type { PagesDocument } from "@/helpers/getPagesData";
import { siteUrl, siteUrlDe } from "@/lib/env";
import { urlFor } from "@/lib/sanity/image";

export function ogImageUrlFromPageSeo(
  seo: PagesDocument["seo"] | undefined | null,
): string | undefined {
  const s = seo as
    | {
        metaImage?: unknown;
        open_graph?: { image?: string; imageAsset?: unknown };
        meta_image_url?: string;
      }
    | null
    | undefined;

  const pick = (s?.open_graph?.imageAsset ?? s?.metaImage) as unknown;
  const fromBuilder =
    pick &&
    urlFor(pick)
      ?.width(1200)
      .height(630)
      .fit("crop")
      .auto("format")
      .url();

  const out = fromBuilder ?? s?.open_graph?.image ?? s?.meta_image_url;
  return typeof out === "string" ? out : undefined;
}

export function buildPagesMetadata(doc: PagesDocument | null): Metadata {
  const seo = doc?.seo as
    | {
        nofollowAttributes?: boolean | null;
        meta_title?: string | null;
        meta_description?: string | null;
        open_graph?: {
          url?: string | null;
          title?: string | null;
          description?: string | null;
          site_name?: string | null;
        } | null;
      }
    | null
    | undefined;

  const title = seo?.meta_title?.trim() || doc?.title || "Bella&Bona";
  const description =
    seo?.meta_description ||
    "Fresh office lunches for modern teams — editable in Sanity, rendered with Next.js SSR/ISR.";
  const canonical = seo?.open_graph?.url || siteUrl;
  const og = ogImageUrlFromPageSeo(doc?.seo);
  const noindex = seo?.nofollowAttributes === true;

  return {
    title,
    description,
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        en: canonical,
        de: siteUrlDe,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: seo?.open_graph?.title || title,
      description: seo?.open_graph?.description || description,
      siteName: seo?.open_graph?.site_name || "Bella&Bona",
      locale: "en_US",
      alternateLocale: ["de_DE"],
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.open_graph?.title || title,
      description: seo?.open_graph?.description || description,
      images: og ? [og] : undefined,
    },
  };
}
