<<<<<<< HEAD

import Navbar from "@/components/layout/Navbar";
import Footers from "@/components/layout/Footers";
=======
>>>>>>> 3ab050e (Add dispatcher module with backend integration)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

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
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className="min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footers />

=======
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
>>>>>>> 3ab050e (Add dispatcher module with backend integration)
      </body>
    </html>
  );
}