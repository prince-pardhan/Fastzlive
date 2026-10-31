
import "@mantine/core/styles.css";
import {
  MantineProvider,
  ColorSchemeScript,
} from "@mantine/core";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://fastzlive.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Fastzlive",
    template: "%s | Fastzlive",
  },

  description:
    "Fastzlive brings you the latest breaking news, live updates, India news, world news, politics, business, technology, sports, entertainment, education, crime, agriculture and local headlines. Stay informed with timely news and important updates from India and around the world.",

  applicationName: "Fastzlive",

  keywords: [
    "Fastzlive",
    "Fastzlive.com",
    "https://www.fastzlive.com/",
    "Fastzlive News",
    "Fastzlive Hindi News",
    "breaking news",
    "latest news",
    "India news",
    "live news updates",
    "Hindi news",
    "world news",
    "politics news",
    "business news",
    "technology news",
    "sports news",
    "Haryana news",
    "Rajasthan news",
    "education news",
    "agriculture news",
    "national news",
    "international news",
    "today news",
    "latest Hindi news",
    "India breaking news",
    "live Hindi news",
    "top news headlines",
    "today breaking news",
    "current affairs",
    "government news",
    "election news",
    "crime news",
    "entertainment news",
    "Bollywood news",
    "health news",
    "weather news",
    "viral news",
    "local news",
    "Delhi news",
    "Punjab news",
    "Uttar Pradesh news",
    "Rajasthan breaking news",
    "Haryana breaking news",
    "Sirsa news",
    "Indian politics",
    "stock market news",
    "economy news",
    "startup news",
    "science news",
    "AI news",
    "mobile technology news",
    "automobile news",
    "cricket news",
    "football news",
    "IPL news",
    "exam results",
    "government jobs",
    "job updates",
    "school news",
    "college news",
    "university news",
    "farmer news",
    "crop news",
    "mandi rates",
    "monsoon updates",
    "India weather updates",
    "breaking headlines India",
    "daily news updates",
    "latest national headlines",
    "reliable news updates",
    "online news India",
    "Fastzlive",
    "Fastzlive.com",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive ",
    "Fastzlive",
    "Fastzlive.com",
    "Fastzlive News",
    "Fastzlive Hindi News",
    "Fastzlive Breaking News",
    "Fastzlive India",
    "Fastzlive Live News",
    "Fastzlive Latest News",
    "Fastzlive News Today",
    "Fastzlive Online News",
    "Fastzlive Headlines",
    "Fastzlive News Updates",
    "Fastzlive National News",
    "Fastzlive World News",
    "Fastzlive Haryana News",
    "Fastzlive Rajasthan News",
    "Fastzlive Politics News",
    "Fastzlive Sports News",
    "Fastzlive Technology News",
    "Fastzlive Agriculture News",
    "Fastzlive News Portal",
    "Fastzlive Digital News",
    "Fastzlive Breaking Headlines",
    "Fastzlive Daily Headlines",
    "Fastzlive India Updates",
    "Fastzlive Latest Headlines",
    "Fastzlive Hindi Samachar",
    "Fastzlive National Headlines",
    "Fastzlive International News",
    "Fastzlive Local News",
    "Fastzlive Sirsa News",
    "Fastzlive Haryana Samachar",
    "Fastzlive Rajasthan Samachar",
    "Fastzlive Education Updates",
    "Fastzlive Business Updates",
    "Fastzlive Entertainment Updates",
    "Fastzlive Cricket Updates",
    "Fastzlive Weather Updates",
    "Fastzlive Farmer News",
    "Fastzlive Online Samachar",
  ],

  authors: [{ name: "Fastzlive" }],
  creator: "Fastzlive",
  publisher: "Fastzlive",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "DhopHBOe3L8-ZxR5RzpTmYtl-qREqHPyCHufRqdT72E",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Fastzlive",
    title: "Fastzlive - Breaking News & Live Updates",
    description:
      "Read the latest breaking news, India news, world news, politics, business, technology, sports and local updates on Fastzlive.",
    images: [
      {
        url: "/fastz.png",
        width: 512,
        height: 512,
        alt: "Fastzlive News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fastzlive - Breaking News & Live Updates",
    description:
      "Get the latest breaking news and live updates from India and around the world with Fastzlive.",
    images: ["/fastz.png"],
  },

  icons: {
    icon: "/fastz.png",
    shortcut: "/fastz.png",
    apple: "/fastz.png",
  },

  category: "news",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta
          name="msvalidate.01"
          content="D8637ABD40A906283CD53357F69E615A"
        />
      </head>

      <body className={inter.className}>
        <MantineProvider defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
