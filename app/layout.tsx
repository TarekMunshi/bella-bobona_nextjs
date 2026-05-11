import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getMenuFooterData } from "@/helpers/getMenuFooterData";
import { isSanityConfigured } from "@/lib/env";
import { SanityLive } from "@/sanity/live";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bella&Bona",
    template: "%s · Bella&Bona",
  },
  description:
    "Corporate lunches that boost culture — fresh chef-made meals, delivered to the office.",
  metadataBase:
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL.length > 0
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : undefined,
};

/** Required for `draftMode()` + Visual Editing/Presentation on Next 16 (avoid static prerender errors). */
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cms = isSanityConfigured() ? await getMenuFooterData() : null;
  const menu = cms?.menuDoc?.menu ?? null;
  const footer = cms?.footerDoc?.footer ?? null;
  const { isEnabled: isDraft } = await draftMode();
  const showSanityChrome = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${figtree.variable} ${inter.variable} h-full bg-white antialiased`}
    >
      <body
        style={{
          fontFamily:
            'var(--font-inter), ui-sans-serif, system-ui, "Figtree", sans-serif',
        }}
        className="flex min-h-screen flex-col bg-white text-neutral-900"
      >
        {showSanityChrome ? <SanityLive /> : null}
        {isDraft && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        <SiteHeader menu={menu as never} />
        <div className="min-w-0 flex-1">{children}</div>
        <SiteFooter footer={footer as never} />
      </body>
    </html>
  );
}
