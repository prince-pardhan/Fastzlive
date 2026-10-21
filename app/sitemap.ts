
import type { MetadataRoute } from "next";
import { news } from "@/data/news";

const baseUrl = "https://www.fastzlive.com";


export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Main website pages

    const paths = [
    "",
    "/news",
    "/news/india",
    "/news/world",
    "/news/haryana",
    "/news/rajasthan",
    "/news/punjab",
    "/news/delhi",
    "/news/uttar-pradesh",
    "/news/madhya-pradesh",
    "/news/maharashtra",
    "/news/gujarat",
    "/news/bihar",
    "/news/jharkhand",
    "/news/chhattisgarh",
    "/news/himachal-pradesh",
    "/news/uttarakhand",
    "/news/jammu-and-kashmir",
    "/news/uttar-pradesh-news",
    "/news/tamil-nadu",
    "/news/kerala",
    "/news/karnataka",
    "/news/andhra-pradesh",
    "/news/telangana",
    "/news/odisha",
    "/news/west-bengal",
    "/news/assam",
    "/news/goa",
    "/news/sikkim",
    "/news/manipur",
    "/news/meghalaya",
    "/news/mizoram",
    "/news/nagaland",
    "/news/tripura",
    "/news/arunachal-pradesh",
    "/news/politics",
    "/news/business",
    "/news/technology",
    "/news/sports",
    "/news/entertainment",
    "/news/education",
    "/news/crime",
    "/news/health",
    "/news/agriculture",
    "/news/weather",
    "/news/science",
    "/news/automobile",
    "/news/environment",
    "/news/defence",
    "/news/railways",
    "/news/jobs",
    "/news/results",
    "/news/government-schemes",
    "/news/viral",
    "/news/local",
    "/news/elections",
    "/news/economy",
    "/news/stock-market",
    "/news/startups",
    "/news/ai",
    "/news/cyber-security",
    "/news/mobile",
    "/news/cricket",
    "/news/football",
    "/news/ipl",
    "/news/bollywood",
    "/news/ott",
    "/news/lifestyle",
    "/news/tourism",
    "/news/monsoon",
    "/news/farmers",
    "/news/market-prices",
    "/news/road-accidents",
    "/news/courts",
    "/news/consumer-news",
    "/news/international",
    "/news/india-news",
    "/news/breaking-news",
    "/news/latest-news",
    "/news/trending",
    "/news/photo-gallery",
    "/news/videos",
    "/latest-news",
    "/breaking-news",
    "/trending-news",
    "/popular-news",
    "/videos",
    "/photo-gallery",
    "/tourism",
    "/restaurants",
    "/schools",
    "/gyms",
    "/blogs",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/editorial-policy",
    "/corrections-policy",
    "/advertise",
  ];

  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },

    // News categories
    {
      url: `${baseUrl}/news/india`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news/world`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/haryana`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/rajasthan`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/politics`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/business`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/technology`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/sports`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/entertainment`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/education`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/crime`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/health`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/agriculture`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/weather`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.8,
    },

    // Other website sections
    {
      url: `${baseUrl}/tourism`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/restaurants`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/schools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gyms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Important information pages
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Published news article pages
  const newsUrls: MetadataRoute.Sitemap = news
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${baseUrl}/news/${item.slug}`,
      lastModified: item.updatedAt
        ? new Date(item.updatedAt)
        : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Remove duplicate URLs
  const allUrls = [...staticRoutes, ...newsUrls];

  const uniqueUrls: MetadataRoute.Sitemap = Array.from(
    new Map(
      allUrls.map((item) => [item.url, item])
    ).values()
  );

  return uniqueUrls;
}
