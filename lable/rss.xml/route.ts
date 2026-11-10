
import { NextResponse } from "next/server";

const SITE_URL = "https://www.fastzlive.com";

export async function GET() {
  // Replace this with your database/API news fetch.
  const response = await fetch(`${SITE_URL}/api/news?status=published`, {
    next: {
      revalidate: 900,
    },
  });

  if (!response.ok) {
    return new NextResponse("Unable to load news", {
      status: 502,
    });
  }

  const result = await response.json();

  const articles = Array.isArray(result)
    ? result
    : result.data ?? result.articles ?? [];

  const escapeXml = (value: unknown) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const items = articles
    .filter((article: any) => article.slug && article.title)
    .map((article: any) => {
      const url = `${SITE_URL}/news/${encodeURIComponent(article.slug)}`;

      const date = article.updatedAt || article.publishedAt || article.createdAt;

      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          <description>${escapeXml(
            article.summary || article.description || article.title
          )}</description>
          <pubDate>${new Date(date || Date.now()).toUTCString()}</pubDate>
          <category>${escapeXml(article.category || "News")}</category>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Fastzlive - Latest News</title>
      <link>${SITE_URL}</link>
      <description>Latest Hindi News, Breaking News and Live Updates</description>
      <language>hi-IN</language>
      <copyright>Copyright ${new Date().getFullYear()} Fastzlive</copyright>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
