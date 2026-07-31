"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footers from "./Footers";

export default function GlobalShell({ children }) {
  const pathname = usePathname();

  const isCustomerArea = pathname.startsWith("/customer");

  return (
    <>
      {!isCustomerArea && <Navbar />}

      <main className="flex-grow">
        {children}
      </main>

      {!isCustomerArea && <Footers />}
    </>
  );
}