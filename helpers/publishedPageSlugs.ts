import { defineQuery } from "next-sanity";

import { sanityFetch } from "@/sanity/live";

/** No `draftMode` import — safe from `generateStaticParams` (Next 16 module graph). */
export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == 'pages' && defined(slug.current)]{
    _type,
    "slug": slug.current,
  }
`);

export type PagesSlugRow = { _type?: string | null; slug?: string | null };

export async function getPublishedPageSlugRows(): Promise<PagesSlugRow[]> {
  try {
    const { data } = await sanityFetch({
      query: PAGE_SLUGS_QUERY,
      tags: ["sanity"],
      /** Required in `generateStaticParams`: avoid `draftMode()` / cookies (Next 16). */
      perspective: "published",
      stega: false,
    });
    const rows = data as PagesSlugRow[] | null | undefined;
    return rows ?? [];
  } catch (e) {
    console.error(e);
    return [];
  }
}
