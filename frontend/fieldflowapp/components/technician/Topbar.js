"use client";

import { useEffect, useState } from "react";
import { Bell, Search, X } from "lucide-react";
import { getGlobalSearchQuery, setGlobalSearchQuery, subscribeRealtimeEvents } from "@/lib/realtimeStore";

export default function Topbar() {
  const [userName, setUserName] = useState("Technician");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      if (u.name) setUserName(u.name);
    } catch (_) {}
    setSearch(getGlobalSearchQuery("technician"));
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeRealtimeEvents((type, payload) => {
      if (type === "fieldflow_search_update" && (payload.role === "technician" || payload.role === "global")) {
        setSearch(payload.query || "");
      }
    });
    return unsubscribe;
  }, []);

  const handleSearchChange = (val) => {
    setSearch(val);
    setGlobalSearchQuery(val, "technician");
  };

  return (
    <header suppressHydrationWarning className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 mb-8 shadow-sm border border-gray-100">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Technician Dashboard</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your assigned jobs and schedule.</p>
      </div>

      <div className="flex items-center gap-4">

        <button
          type="button"
          suppressHydrationWarning
          className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
        >
          <Bell className="text-gray-600 w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
            3
          </span>
        </button>

        <div className="flex items-center gap-3" suppressHydrationWarning>
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-orange-500/20">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-400">Field Agent</p>
          </div>
        </div>
      </div>
    </header>
  );
}

