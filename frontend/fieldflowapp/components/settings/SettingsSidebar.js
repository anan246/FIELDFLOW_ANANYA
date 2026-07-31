"use client";

import Link from "next/link";
import { SETTINGS_MENU, PROFILE_LINKS } from "./data/settingsMenu";

export default function SettingsSidebar({ active, onSelect, role }) {
  const profileHref = PROFILE_LINKS[role] || `/${role || "customer"}/profile`;

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border border-slate-100 rounded-2xl p-3 h-fit sticky top-6 shadow-xs">
      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest px-3 py-2">
        Settings Menu
      </p>
      <nav className="space-y-1">
        {SETTINGS_MENU.map(({ id, label, icon: Icon, isLink, danger }) => {
          const isActive = active === id;
          if (isLink) {
            return (
              <Link
                key={id}
                href={profileHref}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-sm font-semibold"
              >
                <Icon size={18} className="text-slate-400" />
                <span>{label}</span>
              </Link>
            );
          }
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              suppressHydrationWarning
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-sm font-bold text-left ${
                isActive
                  ? "bg-[#FF6000] text-white shadow-md shadow-orange-500/20"
                  : danger
                  ? "text-red-500 hover:bg-red-50"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
