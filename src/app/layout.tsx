import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { Navbar } from "@/components/navigation/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Preferences Settings | ApplyPilot - AI Job Application Copilot",
  description: "Configure target roles, salary bands, technical stack, company dealbreakers, and AI copilot tailoring directives for ApplyPilot.",
  keywords: ["AI Job Copilot", "Job Preferences", "Resume Tailoring", "Frontend Engineer", "ApplyPilot"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50/50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 font-sans">
        <ToastProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
        </ToastProvider>
      </body>
    </html>
  );
}
