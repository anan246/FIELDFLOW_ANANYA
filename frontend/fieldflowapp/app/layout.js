"use client";

import GlobalShell from "@/components/layout/GlobalShell";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isDashboard =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/customer") ||
    pathname?.startsWith("/dispatcher") ||
    pathname?.startsWith("/technician");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}