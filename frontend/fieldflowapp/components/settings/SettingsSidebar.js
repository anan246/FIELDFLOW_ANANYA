"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SETTINGS_MENU, PROFILE_LINKS } from "./data/settingsMenu";
import { getTranslation } from "@/lib/translations";

export default function SettingsSidebar({ active, onSelect, role }) {
  const [lang, setLang] = useState("en");
  const profileHref = PROFILE_LINKS[role] || `/${role || "customer"}/profile`;

  useEffect(() => {
    function loadLang() {
      try {
        setLang(localStorage.getItem("fieldflow_language") || "en");
      } catch (_) {}
    }
    loadLang();

    window.addEventListener("fieldflow_language_change", (e) => setLang(e.detail || "en"));
    window.addEventListener("storage", loadLang);
    return () => {
      window.removeEventListener("fieldflow_language_change", loadLang);
      window.removeEventListener("storage", loadLang);
    };
  }, []);

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border border-slate-100 rounded-3xl p-4 h-fit sticky top-6 shadow-xs">
      <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest px-3 py-2 mb-1">
        SETTINGS MENU
      </p>
      <nav className="space-y-1.5">
        {SETTINGS_MENU.map(({ id, label, icon: Icon, isLink, danger }) => {
          const isActive = active === id;
          const translatedLabel = getTranslation(lang, id) || label;

          if (isLink) {
            return (
              <Link
                key={id}
                href={profileHref}
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-sm font-bold"
              >
                <Icon size={18} className="text-slate-400 shrink-0" />
                <span>{translatedLabel}</span>
              </Link>
            );
          }
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              suppressHydrationWarning
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition text-sm font-bold text-left cursor-pointer ${
                isActive
                  ? "bg-[#FF6000] text-white shadow-md shadow-orange-500/25"
                  : danger
                  ? "text-red-500 hover:bg-red-50"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-white shrink-0" : "text-slate-400 shrink-0"} />
              <span>{translatedLabel}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
