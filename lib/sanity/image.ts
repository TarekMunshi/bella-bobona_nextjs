import { createImageUrlBuilder } from "@sanity/image-url";

import { client } from "@/sanity/client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: unknown) {
  if (source == null) return null;
  return builder.image(source as never);
}
