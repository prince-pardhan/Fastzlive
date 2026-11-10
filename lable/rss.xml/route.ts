
import { NextResponse } from "next/server";
import { news } from "@/data/news";

const SITE_URL = "https://www.fastzlive.com";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function escapeXML(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = news
    .filter((item: any) => item.status === "published")
    .sort(
      (a: any, b: any) =>
        new Date(b.updatedAt || b.publishedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.publishedAt || a.createdAt).getTime()
    )
    .slice(0, 100);

  const items = articles.map((item: any) => {
    const slug = item.slug;
    const url = `${SITE_URL}/news/${slug}`;
    const date =
      item.publishedAt || item.updatedAt || item.createdAt;

    return `
      <item>
        <title>${escapeXML(item.title)}</title>
        <link>${escapeXML(url)}</link>
        <guid isPermaLink="true">${escapeXML(url)}</guid>
        <description>${escapeXML(
          item.summary || item.description || item.title
        )}</description>
        <pubDate>${new Date(date || Date.now()).toUTCString()}</pubDate>
        <category>${escapeXML(item.category || "News")}</category>
        ${
          item.image
            ? `<enclosure url="${escapeXML(item.image)}" type="image/jpeg" />`
            : ""
        }
      </item>
    `;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"
    xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Fastzlive - Latest Hindi News</title>
      <link>${SITE_URL}</link>
      <description>Fastzlive पर पढ़ें भारत, दुनिया, हरियाणा, राजनीति, बिजनेस, खेल और ताजा हिंदी खबरें।</description>
      <language>hi-IN</language>
      <copyright>Copyright ${new Date().getFullYear()} Fastzlive</copyright>
      <atom:link href="${SITE_URL}/rss.xml"
        rel="self" type="application/rss+xml" />
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${items.join("")}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },

    
  });
}
