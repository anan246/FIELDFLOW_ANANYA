"use client";

import { useEffect, useState } from "react";
import SettingsHeader from "./SettingsHeader";
import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";

export default function SettingsLayout({ role = "customer" }) {
  const [active, setActive] = useState("security");
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(u.role ? u : { ...u, role });
    } catch {
      setUser({ role });
    }
  }, [role]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <SettingsHeader user={user} />

      {/* Mobile section dropdown menu */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          suppressHydrationWarning
          className="w-full flex items-center justify-between px-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-slate-900 text-sm font-bold shadow-xs"
        >
          <span className="capitalize">Tab: {active.replace("_", " ")}</span>
          <span className="text-[#FF6000] text-xs font-bold">{menuOpen ? "▲ Close" : "▼ Choose Tab"}</span>
        </button>
        {menuOpen && (
          <div className="mt-3 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xl p-2">
            <SettingsSidebar
              active={active}
              role={role}
              onSelect={(id) => {
                setActive(id);
                setMenuOpen(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Desktop fixed sidebar */}
        <div className="hidden lg:block">
          <SettingsSidebar active={active} role={role} onSelect={setActive} />
        </div>
        {/* Main content display area */}
        <SettingsContent active={active} />
      </div>
    </div>
  );
}
