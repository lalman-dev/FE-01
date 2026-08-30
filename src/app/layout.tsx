import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_METADATA } from "@/data/portfolioData";

export const metadata: Metadata = {
  metadataBase: new URL("https://lalman.dev"),
  title: {
    default: `${SITE_METADATA.author} | Frontend Engineer & AI Workflows`,
    template: `%s | ${SITE_METADATA.author}`,
  },
  description: SITE_METADATA.positioning,
  keywords: [
    "Frontend Engineer",
    "AI Workflows",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Web Development",
    "Lalman Chaudhary",
    "ApplyPilot",
  ],
  authors: [{ name: SITE_METADATA.author, url: "https://lalman.dev" }],
  creator: SITE_METADATA.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lalman.dev",
    title: `${SITE_METADATA.author} — Frontend Engineer & AI Workflows`,
    description: SITE_METADATA.positioning,
    siteName: `${SITE_METADATA.author} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_METADATA.author} — Frontend Engineer & AI Workflows`,
    description: SITE_METADATA.positioning,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
