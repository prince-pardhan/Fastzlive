export interface NewsItem {
  slug: string;
  title: string;
  updatedAt?: Date | string;
}

export const news: NewsItem[] = [
  {
    slug: "breaking-news-example-1",
    title: "Breaking News Example 1",
    updatedAt: new Date(),
  },
  {
    slug: "local-events-update-2026",
    title: "Local Events Update",
    updatedAt: new Date(),
  },
  // Add more news slugs here as needed
];