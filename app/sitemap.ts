import type { MetadataRoute } from "next";
import { news } from "@/data/news";

// Agar blogs alag data file mein hain to import kar lo
// import { blogs } from "@/data/blogs";

const baseUrl = "https://www.fastzlive.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ========== 1. All Static / Category Paths ==========
  const paths = [
    "",
    "/news",
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
    "/fastzlive/trending-news",
    "/fastzlive/popular-news",

    // Extra useful pages
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

  // ========== 2. Static Routes with Priority ==========
  const staticRoutes: MetadataRoute.Sitemap = paths.map((path) => {
    const isHome = path === "";
    const isNewsCategory =
      path.startsWith("/news") ||
      path.startsWith("/fastzlive/") ||
      path.includes("breaking") ||
      path.includes("latest") ||
      path.includes("trending");

    return {
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: isHome
        ? "daily"
        : isNewsCategory
        ? "hourly"
        : path.includes("policy") || path.includes("terms") || path.includes("disclaimer")
        ? "yearly"
        : "weekly",
      priority: isHome
        ? 1.0
        : isNewsCategory
        ? 0.9
        : path === "/blogs" || path === "/tourism"
        ? 0.7
        : 0.5,
    };
  });

  // ========== 3. News Articles ==========
  const newsUrls: MetadataRoute.Sitemap = news
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${baseUrl}/news/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // ========== 4. Blogs (agar blogs data available ho) ==========
  // Agar aapke paas blogs array hai to yeh uncomment kar do
  /*
  const blogUrls: MetadataRoute.Sitemap = blogs
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${baseUrl}/blogs/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  */

  // ========== 5. Combine + Remove Duplicates ==========
  const allUrls = [
    ...staticRoutes,
    ...newsUrls,
    // ...blogUrls,   // blogs enable karne ke liye uncomment karo
  ];

  const uniqueUrls: MetadataRoute.Sitemap = Array.from(
    new Map(allUrls.map((item) => [item.url, item])).values()
  );

  return uniqueUrls;
}