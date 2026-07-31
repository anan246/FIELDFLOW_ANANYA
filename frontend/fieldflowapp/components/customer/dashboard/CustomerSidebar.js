"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  Bell,
  UserRound,
  Settings,
  LogOut,
  Wrench,
  Menu,
  X,
} from "lucide-react";

export default function CustomerSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/customer/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Book Service",
      href: "/customer/book-service",
      icon: CalendarPlus,
    },
    {
      name: "My Bookings",
      href: "/customer/bookings",
      icon: ClipboardList,
    },
    {
      name: "Notifications",
      href: "/customer/notifications",
      icon: Bell,
    },
    {
      name: "Profile",
      href: "/customer/profile",
      icon: UserRound,
    },
  ];

  const handleNavigation = () => {
    setOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE TOP BAR
          ===================================================== */}
      <div className="fixed left-0 right-0 top-0 z-[999] flex h-[68px] items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">

        {/* LOGO */}
        <Link
          href="/customer/dashboard"
          onClick={handleNavigation}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6B00]">
            <Wrench size={20} className="text-white" />
          </div>

          <span className="text-xl font-bold text-[#14263D]">
            Field<span className="text-[#FF6B00]">Flow</span>
          </span>
        </Link>

        {/* HAMBURGER */}
        <button
          type="button"
          onClick={() => {
            console.log("MENU CLICKED");
            setOpen(true);
          }}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="relative z-[999] flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-[#14263D] shadow-sm active:scale-95"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* =====================================================
          MOBILE OVERLAY
          ===================================================== */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[1000] bg-[#14263D]/40 lg:hidden"
        />
      )}

      {/* =====================================================
          MOBILE SIDEBAR
          ===================================================== */}
      <aside
        className={`fixed left-0 top-0 z-[1001] flex h-screen w-[280px] flex-col bg-[#14263D] shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* MOBILE SIDEBAR HEADER */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">

          <Link
            href="/customer/dashboard"
            onClick={handleNavigation}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6B00]">
              <Wrench size={20} className="text-white" />
            </div>

            <span className="text-xl font-bold text-white">
              Field<span className="text-[#FF6B00]">Flow</span>
            </span>
          </Link>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-7">

          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Overview
          </p>

          <nav className="mt-3 space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/customer/dashboard" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavigation}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#FF6B00] text-white shadow-md shadow-orange-900/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon
                    size={19}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-[#FF6B00]"
                    }
                  />

                  <span>{item.name}</span>
                </Link>
              );
            })}

          </nav>
        </div>

        {/* MOBILE SETTINGS + LOGOUT */}
        <div className="shrink-0 border-t border-white/10 p-4">

          <Link
            href="/settings"
            onClick={handleNavigation}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Settings size={19} />
            Settings
          </Link>

          <button
            type="button"
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>
      </aside>

      {/* =====================================================
          DESKTOP SIDEBAR
          YOUR ORIGINAL SIDEBAR — KEPT INTACT
          ===================================================== */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 bg-[#14263D] lg:flex lg:flex-col">

        {/* LOGO */}
        <div className="flex h-[76px] shrink-0 items-center border-b border-white/10 px-7">
          <Link
            href="/customer/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6B00]">
              <Wrench size={20} className="text-white" />
            </div>

            <span className="text-xl font-bold text-white">
              Field<span className="text-[#FF6B00]">Flow</span>
            </span>
          </Link>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-7">

          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Overview
          </p>

          <nav className="mt-3 space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/customer/dashboard" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#FF6B00] text-white shadow-md shadow-orange-900/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon
                    size={19}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-[#FF6B00]"
                    }
                  />

                  <span>{item.name}</span>
                </Link>
              );
            })}

          </nav>
        </div>

        {/* SETTINGS + LOGOUT */}
        <div className="shrink-0 border-t border-white/10 p-4">

          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Settings size={19} />
            Settings
          </Link>

          <button
            type="button"
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>
      </aside>
    </>
  );
}   