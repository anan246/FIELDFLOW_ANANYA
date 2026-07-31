"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Bell,
  User,
  LogOut,
  Wrench,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/technician/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Assigned Jobs",
    href: "/technician/jobs",
    icon: ClipboardList,
  },
  {
    title: "Schedule",
    href: "/technician/schedule",
    icon: CalendarDays,
  },
  {
    title: "Notifications",
    href: "/technician/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/technician/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/technician/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#111F36] text-white flex flex-col justify-between shrink-0 shadow-lg">
      <div>
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <Wrench className="text-[#FF6000]" size={26} />
          <h1 className="text-xl font-extrabold tracking-tight">FieldFlow</h1>
        </div>

        <nav className="mt-6 flex flex-col gap-1.5 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                  isActive
                    ? "bg-[#FF6000] text-white shadow-md shadow-orange-500/25"
                    : "hover:bg-white/10 text-slate-300 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300 text-sm font-bold w-full px-2 py-2">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}