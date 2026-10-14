import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fastzlive - Breaking News, ",
  description: "Fastzlive – Your trusted source for the latest breaking news, live news updates, India and international news, politics, business, technology, sports, entertainment, education, crime, agriculture, and local headlines. Stay informed with real-time news alerts, trending stories, exclusive updates, and in-depth coverage of the events that matter most. Get fast, accurate, and reliable news from across India and around the world, all in one place. stay informed about everything happening around you. NewzFast delivers timely, informative, and reliable news updates to keep you connected with the world, anytime and anywhere ",


  icons: {    
    icon: "/fast.png",
    shortcut: "/fast.png",
    apple: "/fast.png",
  },
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
