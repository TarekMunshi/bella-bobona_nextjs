import type { Metadata } from "next";

import { PageSections } from "@/components/PageSections";
import { buildPagesMetadata } from "@/helpers/buildPagesMetadata";
import { getHomePagesDocument } from "@/helpers/getPagesData";
import { isSanityConfigured, siteUrl } from "@/lib/env";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  if (!isSanityConfigured()) return { title: "Bella&Bona" };
  const page = await getHomePagesDocument();
  return buildPagesMetadata(page ?? null);
}

export default async function Home() {
  const orgJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bella&Bona",
    url: siteUrl,
  };

  if (!isSanityConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-xl font-semibold text-bb-green">Bella&Bona — web</h1>
        <p className="mt-4 text-neutral-600">
          Set <code className="rounded bg-neutral-100 px-2 py-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and dataset
          in <code className="rounded bg-neutral-100 px-2 py-1">web/.env.local</code>.
        </p>
      </main>
    );
  }

  const page = await getHomePagesDocument();

  if (!page) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24">
        <p className="text-lg font-semibold text-bb-green">Homepage missing in Sanity.</p>
        <p className="mt-3 text-neutral-600">
          Create a <strong>Pages</strong> document with slug <code>/</code> (or <code>home</code> / <code>index</code>) and add
          sections.
        </p>
      </main>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJson) }} />
      <main className="mx-auto min-w-0 max-w-none">
        <PageSections components={page.components} />
      </main>
    </>
  );
}
