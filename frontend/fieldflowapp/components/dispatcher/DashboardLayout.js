"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <div className="flex-1 lg:ml-72">
        <Topbar />

        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}