import type { Metadata } from "next";
import { DEFAULT_AVATAR_SRC } from "@/avatar";
import { featureEnabled, isSearchBlocked } from "@/config";
import { getThemeCssBlock } from "@/color";
import { getFontCssBlock, getGoogleFontsUrl } from "@/font";
import { buildPersonJsonLd } from "@/lib/seo";
import { cvData, cvMeta } from "@/resume";
import { advanced } from "@/resume-advanced";
import "./globals.css";

const blockSearch = isSearchBlocked();
const ogImage = advanced.meta.ogImage ?? DEFAULT_AVATAR_SRC;

export const metadata: Metadata = {
  title: cvMeta.siteTitle,
  description: cvMeta.description,
  ...(blockSearch
    ? {}
    : {
        keywords: advanced.meta.keywords,
        openGraph: {
          title: cvMeta.siteTitle,
          description: cvMeta.description,
          type: "website",
          url: cvMeta.siteUrl,
          locale: "vi_VN",
          images: [{ url: ogImage }],
        },
        twitter: {
          card: "summary_large_image",
          title: cvMeta.siteTitle,
          description: cvMeta.description,
          images: [ogImage],
        },
      }),
  metadataBase: new URL(cvMeta.siteUrl),
  robots: blockSearch
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          "max-video-preview": -1,
          "max-image-preview": "none",
          "max-snippet": -1,
        },
      }
    : { index: true, follow: true },
  icons: {
    icon: DEFAULT_AVATAR_SRC,
    shortcut: DEFAULT_AVATAR_SRC,
    apple: DEFAULT_AVATAR_SRC,
  },
};

const personJsonLd =
  featureEnabled("jsonLd") && !blockSearch
    ? buildPersonJsonLd({
        name: cvData.header.fullName,
        jobTitle: cvData.header.position,
        email: cvData.header.email,
        url: cvData.header.portfolio,
        address: cvData.header.address,
      })
    : null;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleFontsUrl = getGoogleFontsUrl();

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href={googleFontsUrl} />
        {personJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        )}
        <style
          dangerouslySetInnerHTML={{
            __html: `${getThemeCssBlock()}\n${getFontCssBlock()}`,
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
