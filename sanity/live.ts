"use server";

import { defineLive } from "next-sanity/live";

import { client } from "@/sanity/client";

/** Live Presentation + ISR tags (Mercado-style). Requires API tokens when using draft mode live. */
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-06-13",
  }),
  browserToken: process.env.SANITY_VIEWER_TOKEN,
  serverToken: process.env.SANITY_API_TOKEN,
});
