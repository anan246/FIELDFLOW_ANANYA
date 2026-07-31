"use client";

import { useEffect, useState } from "react";
import { Settings, User } from "lucide-react";
import { getTranslation } from "@/lib/translations";

export default function SettingsHeader({ user }) {
  const [lang, setLang] = useState("en");

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

  const userName = user?.name || "User";
  const userRole = user?.role || "Customer";
  const userEmail = user?.email || "user@fieldflow.in";
  const userInitial = userName.charAt(0).toUpperCase();

  const formattedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-100/90 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-2xs shrink-0">
          <Settings size={26} />
        </div>
        <div>
          <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">
            {getTranslation(lang, "account_settings")}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-0.5">
            {getTranslation(lang, "manage_preferences")} ({formattedRole})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-2.5 shadow-xs shrink-0">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-extrabold flex items-center justify-center text-base shrink-0 border border-amber-200">
          {user?.avatar ? (
            <img src={user.avatar} alt={userName} className="w-full h-full object-cover rounded-xl" />
          ) : (
            userInitial || <User size={18} />
          )}
        </div>
        <div className="text-left">
          <p className="text-slate-900 text-xs font-extrabold leading-tight">{userName}</p>
          <p className="text-slate-400 text-[11px] font-medium">{userEmail}</p>
        </div>
      </div>
    </div>
  );
}
