"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/technician/Sidebar";
import { Search, Mail, Bell, Menu, ChevronDown, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function TechnicianLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser({ name: "Technician User", email: "tech@fieldflow.com", role: "technician" });
      }
    } catch {
      setUser({ name: "Technician User", email: "tech@fieldflow.com", role: "technician" });
    }
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

  const userName = user?.name || "Technician";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#F4F6FB] text-slate-800 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between shadow-xs">
          {/* Search */}
          <div className="flex items-center gap-3 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-4 py-2.5 flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, schedule, clients..."
              className="bg-transparent text-sm text-slate-800 outline-none w-full placeholder:text-slate-400"
              suppressHydrationWarning
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Mail Messages"
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition shadow-2xs"
            >
              <Mail className="w-4 h-4 text-slate-600" />
            </button>

            <button
              aria-label="Notifications"
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition shadow-2xs relative"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400 border border-white" />
            </button>

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
                  <p className="text-xs text-slate-400 font-normal">Technician</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              {showProfile && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden py-1">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <p className="font-bold text-slate-900 text-sm">{userName}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || "tech@fieldflow.com"}</p>
                  </div>
                  <Link
                    href="/technician/profile"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition font-medium"
                  >
                    <User className="w-4 h-4 text-slate-400" /> My Profile
                  </Link>
                  <Link
                    href="/technician/settings"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition font-medium"
                  >
                    <Settings className="w-4 h-4 text-slate-400" /> Settings
                  </Link>
                  <hr className="my-1 border-slate-100" />
                  <button
                    onClick={logout}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition font-medium w-full text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" /> Logout
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