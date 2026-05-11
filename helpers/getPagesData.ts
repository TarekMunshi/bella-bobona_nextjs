import type { ClientReturn } from "@sanity/client";
import { defineQuery } from "next-sanity";
import { draftMode } from "next/headers";
import { PAGE_SLUGS_QUERY, type PagesSlugRow } from "@/helpers/publishedPageSlugs";
import { sanityFetch } from "@/sanity/live";

const IMG_ASSET = `asset->{
  "seoUrl": url+'/'+originalFilename,
  originalFilename,
  altText,
  _id,
  url
}`;

const IMG = `{
  ...,
  ${IMG_ASSET}
}`;

/** Slug fallback order for a path param (Mercado-compatible). */
export function buildSlugCandidates(param: string): string[] {
  const t = param.trim();
  if (!t || t === "/" || t === "index" || t === "home") {
    return ["/", "", "index", "home"];
  }
  const core = t.replace(/^\/+|\/+$/g, "");
  const uniq = new Set<string>();
  [t, core, `/${core}`].forEach((s) => {
    if (s) uniq.add(s);
  });
  return [...uniq];
}

const PAGES_DOCUMENT_QUERY = defineQuery(`*[_type == 'pages' && slug.current in $slugs][0]{
  _id,
  _type,
  title,
  slug,
  seo {
    nofollowAttributes,
    "meta_title": coalesce(metaTitle, ""),
    "meta_description": coalesce(metaDescription, ""),
    "meta_image_url": metaImage.asset->url,
    "metaImage": metaImage ${IMG},
    "open_graph": openGraph{
      title,
      description,
      url,
      "image": image.asset->url,
      "imageAsset": image ${IMG},
      "site_name": siteName
    },
    "seo_keywords": seoKeywords,
    twitter{
      _type,
      "card_type": cardType,
      creator,
      site
    }
  },
  components[]{
    _key,
    "comp_type": _type,

    _type == 'hero' => {
      headline,
      subheadline,
      ctaLabel,
      ctaHref,
      "image": image ${IMG},
      dishTags,
      googlePlayHref,
      appStoreHref,
      ratingBadge
    },

    _type == 'homepageLogoCloud' => {
      headline,
      logos[]{
        _key,
        href,
        "asset": asset ${IMG}
      }
    },

    _type == 'statsRow' => {
      items[]{
        value,
        label
      }
    },

    _type == 'mealGrid' => {
      sectionHeading,
      meals[]{
        tag,
        title,
        ratingPercent,
        reviewCount,
        "image": image ${IMG}
      },
      ctaLabel,
      ctaHref
    },

    _type == 'cultureRoi' => {
      pageHeading,
      stats[]{
        value,
        label,
        description
      },
      "featureImage": featureImage ${IMG},
      features[]{
        title,
        description
      },
      bannerHeadline,
      bannerButtonLabel,
      bannerButtonHref,
      promoTitle,
      promoCurrentPrice,
      promoOriginalPrice,
      promoSavings,
      "promoImage": promoImage ${IMG}
    },

    _type == 'howItWorks' => {
      sectionHeading,
      steps[]{
        "media": media ${IMG},
        stepLabel,
        title,
        description
      },
      ctaLabel,
      ctaHref
    },

    _type == 'lunchCalculator' => {
      calculatorHeading,
      daysQuestionLabel,
      employeesQuestionLabel,
      subsidyQuestionLabel,
      employeeResultHeading,
      companyResultHeading,
      employeeInfoNote,
      companyInfoNote,
      emailCaptureLabel,
      quoteButtonLabel,
      testimonialHeading,
      testimonialQuote,
      testimonialAttribution,
      "testimonialImageLeft": testimonialImageLeft ${IMG},
      "testimonialImageRight": testimonialImageRight ${IMG}
    },

    _type == 'contactLead' => {
      cardHeading,
      cardIntro,
      profileName,
      profileEmail,
      profilePhone,
      "profilePhoto": profilePhoto ${IMG},
      formHeading,
      consentText,
      submitLabel
    },

    _type == 'supportCenter' => {
      heading,
      body,
      ctaLabel,
      ctaHref,
      "image": image ${IMG}
    },

    _type == 'faqAccordion' => {
      sectionHeading,
      items[]{
        question,
        answer
      }
    }
  }
}`);

export type PagesDocument = ClientReturn<typeof PAGES_DOCUMENT_QUERY>;

export async function getPagesDocument(
  slugParam: string,
): Promise<PagesDocument | null> {
  const { isEnabled } = await draftMode();
  try {
    const slugs = buildSlugCandidates(slugParam);
    const { data } = await sanityFetch({
      query: PAGES_DOCUMENT_QUERY,
      params: { slugs },
      tags: ["sanity"],
      ...(isEnabled ? { perspective: "previewDrafts", stega: true } : {}),
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/** Single fetch: resolves home for slug `/`, empty, index, home. */
export async function getHomePagesDocument(): Promise<PagesDocument | null> {
  return getPagesDocument("/");
}

/** Draft-aware slug list when Presentation / Draft Mode is active. */
export async function getAllPageSlugRowsDraftAware(): Promise<PagesSlugRow[]> {
  const { isEnabled } = await draftMode();
  try {
    const { data } = await sanityFetch({
      query: PAGE_SLUGS_QUERY,
      tags: ["sanity"],
      ...(isEnabled ? { perspective: "previewDrafts", stega: true } : {}),
    });
    const rows = data as PagesSlugRow[] | null | undefined;
    return rows ?? [];
  } catch (e) {
    console.error(e);
    return [];
  }
}
