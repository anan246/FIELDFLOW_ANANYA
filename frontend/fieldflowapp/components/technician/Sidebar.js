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
    <aside className="w-64 min-h-screen bg-[#17263C] text-white flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 px-6 py-6">
          <Wrench className="text-orange-500" size={28} />
          <h1 className="text-2xl font-bold">FieldFlow</h1>
        </div>

        <nav className="mt-8 flex flex-col gap-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  pathname === item.href
                    ? "bg-orange-500 text-white"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}