import type { Metadata } from "next";
import "./globals.css";
import { Inter, Work_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "SpacesMMU",
  description:
    "Find the best study spaces near you for the Manchester Metropolitan University. Discover quiet study areas, group study rooms, and creative spaces designed to boost your productivity.",
  manifest: "/manifest.json",
  icons: {
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/icons/favicon.ico"],
  },
  appleWebApp: {
    capable: true,
    title: "SpacesMMU",
    statusBarStyle: "black-translucent",
  },
  keywords: [
    "Study spaces",
    "University of Manchester",
    "Study rooms",
    "Group study",
    "Quiet study areas",
    "Academic spaces",
  ],
  authors: [
    {
      name: "Komchan Mather",
      url: "https://www.linkedin.com/in/komchanmather/",
    },
  ],
  creator: "SpacesMMU Team",
  openGraph: {
    type: "website",
    url: "",
    title: "SpacesMMU - Built for Manchester Metropolitan University",
    description:
      "Find the best study spaces near you for the Manchester Metropolitan University. Discover quiet study areas, group study rooms, and creative spaces designed to boost your productivity.",
    siteName: "SpacesMMU",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpacesMMU - Built for Manchester Metropolitan University",
    description:
      "Find the best study spaces near you for the Manchester Metropolitan University. Discover quiet study areas, group study rooms, and creative spaces designed to boost your productivity.",
    images: [""],
    creator: "@SpacesMMU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="SpacesMMU" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${workSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
