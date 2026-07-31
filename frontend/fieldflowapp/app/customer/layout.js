"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  Bell,
  User,
  Settings,
  LogOut,
  Search,
  Mail,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

const navItems = [
  { href: "/customer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customer/book-service", label: "Book Service", icon: Wrench },
  { href: "/customer/bookings", label: "My Bookings", icon: ClipboardList },
  { href: "/customer/notifications", label: "Notifications", icon: Bell },
  { href: "/customer/profile", label: "Profile", icon: User },
];

export default function CustomerLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    function handler(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  }

  const userName = user?.name || "Customer";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#F4F6FB] text-slate-800 font-sans">
      {/* Mobile overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`w-64 bg-[#111F36] text-slate-300 flex flex-col fixed h-full z-50 transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 shadow-xl`}
      >
        {/* Brand Header */}
        <div className="px-6 py-6 flex items-center gap-3 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-[#FF6000] flex items-center justify-center text-white shadow-lg shadow-orange-500/25 shrink-0">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
              Field<span className="text-white">Flow</span>
            </h1>
          </div>
        </div>

        {/* Section Header & Main Nav */}
        <div className="flex-1 px-4 py-5 overflow-y-auto space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Overview
            </p>
            <nav className="space-y-1.5">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || (href === "/customer/dashboard" && pathname === "/customer");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setShowSidebar(false)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                      active
                        ? "bg-[#FF6000] text-white font-semibold shadow-lg shadow-orange-500/25"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-400"}`} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Navigation (Settings & Logout) */}
        <div className="p-4 border-t border-white/5 space-y-1.5">
          <Link
            href="/customer/settings"
            onClick={() => setShowSidebar(false)}
            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              pathname === "/customer/settings"
                ? "bg-[#FF6000] text-white font-semibold shadow-lg shadow-orange-500/25"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings className="w-5 h-5 text-slate-400" />
            <span>Settings</span>
          </Link>

          <button
            onClick={logout}
            suppressHydrationWarning
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium w-full text-left"
          >
            <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {userInitial}
            </div>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between shadow-xs">
          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setShowSidebar(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
            suppressHydrationWarning
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-4 py-2.5 flex-1 max-w-md ml-2 lg:ml-0">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="bg-transparent text-sm text-slate-800 outline-none w-full placeholder:text-slate-400"
              suppressHydrationWarning
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-3">
            {/* Mail Icon Button */}
            <button
              aria-label="Mail Messages"
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition shadow-2xs"
            >
              <Mail className="w-4 h-4 text-slate-600" />
            </button>

            {/* Notification Bell Button */}
            <button
              aria-label="Notifications"
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition shadow-2xs relative"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400 border border-white" />
            </button>

            {/* Profile Dropdown Badge */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile((v) => !v)}
                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-50 transition"
                suppressHydrationWarning
              >
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm shadow-xs border border-amber-200 shrink-0">
                  {userInitial}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 leading-tight">{userName}</p>
                  <p className="text-xs text-slate-400 font-normal">Customer</p>
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden py-1">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <p className="font-bold text-slate-900 text-sm">{userName}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || "customer@fieldflow.com"}</p>
                  </div>
                  <Link
                    href="/customer/profile"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition font-medium"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Profile
                  </Link>
                  <Link
                    href="/customer/settings"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition font-medium"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings
                  </Link>
                  <hr className="my-1 border-slate-100" />
                  <button
                    onClick={logout}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition font-medium w-full text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
