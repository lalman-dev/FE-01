import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Preferences | ApplyPilot",
  description: "Configure your target job titles, work modes, salary expectations, and preferred tech stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
