"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    function applyTheme() {
      try {
        const savedTheme = localStorage.getItem("fieldflow_theme") || "light";
        const root = document.documentElement;
        if (savedTheme === "dark") {
          root.classList.add("dark");
          document.body.classList.add("dark");
        } else if (savedTheme === "light") {
          root.classList.remove("dark");
          document.body.classList.remove("dark");
        } else {
          if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            root.classList.add("dark");
            document.body.classList.add("dark");
          } else {
            root.classList.remove("dark");
            document.body.classList.remove("dark");
          }
        }
      } catch (_) {}
    }

    applyTheme();

    window.addEventListener("fieldflow_theme_change", applyTheme);
    window.addEventListener("storage", applyTheme);
    return () => {
      window.removeEventListener("fieldflow_theme_change", applyTheme);
      window.removeEventListener("storage", applyTheme);
    };
  }, []);

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