import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { YandexMetrika } from "@/analytics/YandexMetrika";
import { siteMetadata, siteUrl } from "@/lib/seo";
import { structuredData } from "@/lib/schema";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["cyrillic", "latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "/",
    siteName: "Екатерина Гибадуллина",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Екатерина Гибадуллина — семейный психолог",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={nunitoSans.variable}>
        {structuredData.map((item) => (
          <script
            id={`schema-${item["@type"].toLowerCase()}`}
            key={item["@id"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
