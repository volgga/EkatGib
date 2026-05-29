import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/seo";

const INDEXNOW_KEY = "ADFA0265-AE7D-40E9-A5A7-A1CFC00790D8";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const sitemapUrl = new URL("/sitemap.xml", siteUrl);
const keyLocation = new URL(`/${INDEXNOW_KEY}.txt`, siteUrl);

function decodeXmlEntities(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function getSitemapUrls(xml: string): string[] {
  const urls = new Set<string>();

  for (const match of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)) {
    const url = decodeXmlEntities(match[1]?.trim() ?? "");

    if (url) {
      urls.add(url);
    }
  }

  return [...urls];
}

export async function POST() {
  let sitemapResponse: Response;

  try {
    sitemapResponse = await fetch(sitemapUrl, {
      cache: "no-store",
      headers: {
        accept: "application/xml,text/xml;q=0.9,*/*;q=0.8",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Sitemap is unavailable",
        sitemapUrl: sitemapUrl.toString(),
        details: error instanceof Error ? error.message : "Unknown fetch error",
      },
      { status: 502 },
    );
  }

  if (!sitemapResponse.ok) {
    return NextResponse.json(
      {
        error: "Sitemap request failed",
        sitemapUrl: sitemapUrl.toString(),
        status: sitemapResponse.status,
      },
      { status: 502 },
    );
  }

  const sitemapXml = await sitemapResponse.text();
  const urlList = getSitemapUrls(sitemapXml);

  if (urlList.length === 0) {
    return NextResponse.json(
      {
        error: "Sitemap does not contain URLs",
        sitemapUrl: sitemapUrl.toString(),
      },
      { status: 422 },
    );
  }

  let indexNowResponse: Response;

  try {
    indexNowResponse = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        host: siteUrl.hostname,
        key: INDEXNOW_KEY,
        keyLocation: keyLocation.toString(),
        urlList,
      }),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "IndexNow request failed",
        sentUrlCount: urlList.length,
        details: error instanceof Error ? error.message : "Unknown fetch error",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    sentUrlCount: urlList.length,
    indexNowStatus: indexNowResponse.status,
    ok: indexNowResponse.ok,
  });
}
