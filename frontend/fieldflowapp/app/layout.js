"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

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
  description: "FieldFlow Home Services",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isDashboard =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/customer") ||
    pathname?.startsWith("/dispatcher") ||
    pathname?.startsWith("/technician");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-[#F4F6FB]`}
      >
        {!isDashboard && <Navbar />}

        <LayoutWrapper>
          {isDashboard ? children : <main className="flex-grow">{children}</main>}
        </LayoutWrapper>

        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}