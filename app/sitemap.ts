
import type { MetadataRoute } from "next";
import { news } from "@/data/news";

const baseUrl = "https://www.fastzlive.com/";
const sarch = "fastzlive";


export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Main website pages

    const paths = [
    "",
    "/fastzlive",
    "/fastzlive/india",
    "/fastzlive/world",
    "/fastzlive/haryana",
    "/fastzlive/rajasthan",
    "/fastzlive/punjab",
    "/fastzlive/delhi",
    "/fastzlive/uttar-pradesh",
    "/fastzlive/madhya-pradesh",
    "/fastzlive/maharashtra",
    "/fastzlive/gujarat",
    "/fastzlive/bihar",
    "/fastzlive/jharkhand",
    "/fastzlive/chhattisgarh",
    "/fastzlive/himachal-pradesh",
    "/fastzlive/uttarakhand",
    "/fastzlive/jammu-and-kashmir",
    "/fastzlive/uttar-pradesh-news",
    "/fastzlive/tamil-nadu",
    "/fastzlive/kerala",
    "/fastzlive/karnataka",
    "/fastzlive/andhra-pradesh",
    "/fastzlive/telangana",
    "/fastzlive/odisha",
    "/fastzlive/west-bengal",
    "/fastzlive/assam",
    "/fastzlive/goa",
    "/fastzlive/sikkim",
    "/fastzlive/manipur",
    "/fastzlive/meghalaya",
    "/fastzlive/mizoram",
    "/fastzlive/nagaland",
    "/fastzlive/tripura",
    "/fastzlive/arunachal-pradesh",
    "/fastzlive/politics",
    "/fastzlive/business",
    "/fastzlive/technology",
    "/fastzlive/sports",
    "/fastzlive/entertainment",
    "/fastzlive/education",
    "/fastzlive/crime",
    "/fastzlive/health",
    "/fastzlive/agriculture",
    "/fastzlive/weather",
    "/fastzlive/science",
    "/fastzlive/automobile",
    "/fastzlive/environment",
    "/fastzlive/defence",
    "/fastzlive/railways",
    "/fastzlive/jobs",
    "/fastzlive/results",
    "/fastzlive/government-schemes",
    "/fastzlive/viral",
    "/fastzlive/local",
    "/fastzlive/elections",
    "/fastzlive/economy",
    "/fastzlive/stock-market",
    "/fastzlive/startups",
    "/fastzlive/ai",
    "/fastzlive/cyber-security",
    "/fastzlive/mobile",
    "/fastzlive/cricket",
    "/fastzlive/football",
    "/fastzlive/ipl",
    "/fastzlive/bollywood",
    "/fastzlive/ott",
    "/fastzlive/lifestyle",
    "/fastzlive/tourism",
    "/fastzlive/monsoon",
    "/fastzlive/farmers",
    "/fastzlive/market-prices",
    "/fastzlive/road-accidents",
    "/fastzlive/courts",
    "/fastzlive/consumer-news",
    "/fastzlive/international",
    "/fastzlive/india-news",
    "/fastzlive/breaking-news",
    "/fastzlive/latest-news",
    "/fastzlive/trending",
    "/fastzlive/photo-gallery",
    "/fastzlive/videos",
    "/fastzlive/latest-news",
    "/fastzlive/breaking-news",
    "/fastzlive/trending-news",
    "/fastzlive/popular-news",
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
