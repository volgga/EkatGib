import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { siteMetadata, siteUrl } from "@/lib/seo";
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
  alternates: {
    canonical: "/",
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
      <body className={nunitoSans.variable}>{children}</body>
    </html>
  );
}
