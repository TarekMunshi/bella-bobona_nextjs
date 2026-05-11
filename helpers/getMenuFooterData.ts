import type { ClientReturn } from "@sanity/client";
import { defineQuery } from "next-sanity";
import { draftMode } from "next/headers";
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

const NAV_FOOTER_QUERY = defineQuery(`{
  "menuDoc": *[_type == 'navigation' && (_id == 'navigation-menu' || _id == 'drafts.navigation-menu')][0]{
    _id,
    menu {
      brandText,
      "logo": logo ${IMG},
      items[]{
        label,
        destination {
          linkType,
          sectionId,
          url
        },
        submenu[]{
          label,
          destination {
            linkType,
            sectionId,
            url
          }
        }
      },
      downloadMenu {
        label,
        destination {
          linkType,
          sectionId,
          url
        }
      },
      primaryCta {
        label,
        destination {
          linkType,
          sectionId,
          url
        }
      },
      languageEnHref,
      languageDeHref
    }
  },
  "footerDoc": *[_type == 'navigation' && (_id == 'navigation-footer' || _id == 'drafts.navigation-footer')][0]{
    _id,
    footer {
      followTitle,
      followIntro,
      contactEmail,
      socialLinks[]{
        label,
        url
      },
      columns[]{
        title,
        links[]{
          label,
          url
        }
      },
      brandText,
      copyrightText
    }
  }
}`);

export type MenuFooterPayload = ClientReturn<typeof NAV_FOOTER_QUERY>;

export async function getMenuFooterData(): Promise<MenuFooterPayload | null> {
  const { isEnabled } = await draftMode();
  try {
    const { data } = await sanityFetch({
      query: NAV_FOOTER_QUERY,
      tags: ["sanity"],
      ...(isEnabled ? { perspective: "previewDrafts", stega: true } : {}),
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
