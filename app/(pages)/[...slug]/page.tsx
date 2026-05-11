import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageSections } from "@/components/PageSections";
import { buildPagesMetadata } from "@/helpers/buildPagesMetadata";
import { getAllPageSlugRowsDraftAware, getPagesDocument } from "@/helpers/getPagesData";
import { getPublishedPageSlugRows } from "@/helpers/publishedPageSlugs";
import { extractSlugs } from "@/lib/extractSlugs";
import { isSanityConfigured } from "@/lib/env";

export const revalidate = 60;

async function slugPaths(rows: Awaited<ReturnType<typeof getPublishedPageSlugRows>>): Promise<
  string[]
> {
  const extracted = extractSlugs(rows.map((row) => ({ slug: row.slug })));
  return extracted.filter(Boolean);
}

async function filteredPathsPublished(): Promise<string[]> {
  return slugPaths(await getPublishedPageSlugRows());
}

async function filteredPathsDraftAware(): Promise<string[]> {
  return slugPaths(await getAllPageSlugRowsDraftAware());
}

export async function generateStaticParams() {
  if (!isSanityConfigured()) return [];
  const slugs = await filteredPathsPublished();
  return slugs.map((slug) => ({
    slug: slug.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  if (!isSanityConfigured()) return { title: "Bella&Bona" };
  const { slug } = await params;
  const path = slug.join("/");
  const page = await getPagesDocument(path);
  return buildPagesMetadata(page ?? null);
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  if (!isSanityConfigured()) notFound();

  const { slug } = await params;
  const path = slug.join("/");
  const allowed = await filteredPathsDraftAware();
  if (!allowed.includes(path)) {
    notFound();
  }

  const page = await getPagesDocument(path);
  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto min-w-0 max-w-none">
      <PageSections components={page.components} />
    </main>
  );
}
