/** Normalize Sanity slug strings into URL segments (`about`, `legal/privacy`). Home is "/" and is filtered out for `[...slug]`. */
export function extractSlugs(
  rows: Array<{ slug?: string | null }>,
): string[] {
  return rows
    .map((r) => {
      const raw = r.slug?.trim();
      if (!raw) return "";
      return raw.replace(/^\/+|\/+$/g, "");
    })
    .filter(Boolean);
}
