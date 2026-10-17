
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

const SITE_URL = "https://fastzlive.online";

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
        url: "/fast.png",
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
    images: ["/fast.png"],
  },

  icons: {
    icon: "/fast.png",
    shortcut: "/fast.png",
    apple: "/fast.png",
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
      </head>

      <body className={inter.className}>
        <MantineProvider defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
