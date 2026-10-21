import type { MetadataRoute } from "next";


import { news } from "@/data/news"; // <-- Imported news data

const baseUrl = "https://www.fastzlive.com/";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}news`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}tourism`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}restaurants`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}schools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}gyms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // News detail pages (Added)
  const newsUrls: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${baseUrl}news/${item.slug}`,
    lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
    changeFrequency: "hourly",
    priority: 0.8,
  }));


  const allUrls: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...newsUrls, // <-- Included news URLs here
 
  ];

  // Remove duplicate URLs
  const uniqueUrls: MetadataRoute.Sitemap = Array.from(
    new Map(allUrls.map((item) => [item.url, item])).values()
  );

  return uniqueUrls;
}