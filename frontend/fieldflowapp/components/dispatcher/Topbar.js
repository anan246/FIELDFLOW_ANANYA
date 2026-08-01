"use client";

import { useEffect, useState } from "react";
import { Search, Bell, Calendar, Menu, User } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  const [userName, setUserName] = useState("Dispatcher");

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      if (u.name) setUserName(u.name);
    } catch (_) {}
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-3.5 sm:py-5">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition shrink-0"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        {/* Search Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search bookings, technicians..."
            className="w-full bg-slate-100 rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-11 pr-4 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <div className="hidden md:flex items-center gap-2 text-gray-500 text-xs sm:text-sm font-medium">
            <Calendar size={16} />
            <span>Today</span>
          </div>

          <div className="relative">
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-slate-100 transition text-slate-600 relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md shadow-orange-500/20 shrink-0">
              {userName.charAt(0).toUpperCase() || <User size={18} />}
            </div>
            <div className="hidden sm:block text-left">
              <h3 className="font-bold text-xs sm:text-sm text-[#08263B] leading-tight">{userName}</h3>
              <p className="text-[11px] text-gray-500 font-medium">Dispatcher</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}