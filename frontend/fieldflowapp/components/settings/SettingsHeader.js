"use client";

import { Settings, User } from "lucide-react";

export default function SettingsHeader({ user }) {
  const userName = user?.name || "FieldFlow User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-[#FF6000] shadow-2xs shrink-0">
          <Settings size={22} />
        </div>
        <div>
          <h1 className="text-slate-900 font-extrabold text-xl sm:text-2xl tracking-tight">
            Account Settings
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm capitalize mt-0.5 font-medium">
            Manage your {user?.role || "account"} preferences and configurations
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-2.5 w-fit shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm shrink-0 border border-amber-200">
          {user?.avatar ? (
            <img src={user.avatar} alt={userName} className="w-full h-full object-cover rounded-xl" />
          ) : (
            userInitial || <User size={18} />
          )}
        </div>
        <div>
          <p className="text-slate-900 text-xs font-bold">{userName}</p>
          <p className="text-slate-400 text-[11px] font-medium">{user?.email || "user@fieldflow.in"}</p>
        </div>
      </div>
    </div>
  );
}
