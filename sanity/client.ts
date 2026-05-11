import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-06-13";

const studioUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
    : process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

/** Base URL for Stega overlays (Presentation / Visual Editing). No trailing slash. */
const normalizedStudioUrl = `${studioUrl}`.replace(/\/$/, "");

export const sanityClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: {
    studioUrl: normalizedStudioUrl,
  },
};

export const client = createClient(sanityClientConfig);
