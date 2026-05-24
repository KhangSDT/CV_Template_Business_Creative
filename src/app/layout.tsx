import type { Metadata } from "next";
import { cvData, cvMeta } from "@/data/cv";
import { DEFAULT_AVATAR_SRC } from "@/avatar/config";
import { getThemeCssBlock } from "@/color/theme";
import { getFontCssBlock, getGoogleFontsUrl } from "@/font/config";
import { buildPersonJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  title: cvMeta.siteTitle,
  description: cvMeta.description,
  metadataBase: new URL(cvMeta.siteUrl),
  openGraph: {
    title: cvMeta.siteTitle,
    description: cvMeta.description,
    type: "website",
    url: cvMeta.siteUrl,
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: cvMeta.siteTitle,
    description: cvMeta.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: DEFAULT_AVATAR_SRC,
    shortcut: DEFAULT_AVATAR_SRC,
    apple: DEFAULT_AVATAR_SRC,
  },
};

const personJsonLd = buildPersonJsonLd({
  name: cvData.header.fullName,
  jobTitle: cvData.header.position,
  email: cvData.header.email,
  url: cvData.header.portfolio,
  address: cvData.header.address,
});

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
        <link rel="stylesheet" href={googleFontsUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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

