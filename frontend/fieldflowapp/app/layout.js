"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footers from "@/components/layout/Footer";
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

export const metadata = {
  title: "FieldFlow",
  description: "Home repair and field service booking platform",
};

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
      <body className="min-h-full flex flex-col bg-[#F4F6FB]">
        {!isDashboard && <Navbar />}

        {isDashboard ? (
          children
        ) : (
          <main className="flex-grow">{children}</main>
        )}

        {!isDashboard && <Footers />}
      </body>
    </html>
  );
}