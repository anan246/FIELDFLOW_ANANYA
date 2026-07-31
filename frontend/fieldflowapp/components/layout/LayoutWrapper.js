"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isDashboard =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/customer") ||
    pathname.startsWith("/dispatcher") ||
    pathname.startsWith("/technician");

  return (
    <>
      {!isDashboard && <Navbar />}

      {isDashboard ? (
        children
      ) : (
        <main className="flex-grow">{children}</main>
      )}

      {!isDashboard && <Footer />}
    </>
  );
}