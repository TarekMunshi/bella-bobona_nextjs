export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const siteUrlDe =
  process.env.NEXT_PUBLIC_SITE_URL_DE?.replace(/\/$/, "") || `${siteUrl}/de`;

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export function isSanityConfigured() {
  return Boolean(sanityProjectId);
}
