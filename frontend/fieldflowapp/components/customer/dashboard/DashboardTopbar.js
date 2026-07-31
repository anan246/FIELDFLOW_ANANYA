
"use client";

import Link from "next/link";
import {
  Search,
  Bell,
  Mail,
  Menu,
} from "lucide-react";

export default function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">

      <div className="flex h-[76px] items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* MOBILE MENU */}
        <button
          type="button"
          className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* SEARCH */}
        <div className="relative max-w-[560px] flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search services..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#FF6B00] focus:bg-white"
          />

        </div>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-2">

          {/* MAIL */}
          <button
            type="button"
            className="relative hidden h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-[#FF6B00] hover:text-[#FF6B00] sm:flex"
          >
            <Mail size={18} />
          </button>

          {/* NOTIFICATIONS */}
      <a
  href="/customer/notifications"
  aria-label="Open notifications"
  className="relative z-[9999] flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
>
  <Bell size={18} />

  <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B00]" />
</a>
          {/* PROFILE */}
          <div className="ml-2 hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-[#FF6B00]">
              M
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-slate-800">
                Madhushri
              </p>

              <p className="text-xs text-slate-400">
                Customer
              </p>
            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

