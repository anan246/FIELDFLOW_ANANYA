"use client";

import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 mb-8 shadow-sm border border-gray-100">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Technician Dashboard</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage your assigned jobs and schedule.</p>
      </div>

      <div className="flex items-center gap-4">

        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 gap-2">
          <Search className="text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="bg-transparent outline-none text-sm text-gray-700 w-48"
          />
        </div>

        <button className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
          <Bell className="text-gray-600 w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
            T
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">Technician</p>
            <p className="text-xs text-gray-400">Field Agent</p>
          </div>
        </div>

      </div>
    </header>
  );
}
