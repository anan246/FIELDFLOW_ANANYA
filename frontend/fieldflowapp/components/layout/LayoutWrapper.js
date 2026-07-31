"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footers from "./Footers";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/dispatcher");

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        {children}
      </main>

      {!hideLayout && <Footers />}
    </>
  );
}