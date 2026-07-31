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

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideLayout =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/customer") ||
    pathname?.startsWith("/technician") ||
    pathname?.startsWith("/dispatcher");

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {!hideLayout && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!hideLayout && <Footers />}
      </body>
    </html>
  );
}