export type Destination = {
  linkType?: "section" | "url";
  sectionId?: string;
  url?: string;
};

export function hrefFromDestination(d?: Destination | null) {
  if (!d) return "#";
  if (d.linkType === "url" && d.url) return d.url;
  if (d.sectionId) {
    const id = String(d.sectionId).replace(/^#/, "");
    return `#${id}`;
  }
  return "#";
}
