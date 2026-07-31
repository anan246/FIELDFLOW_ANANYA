"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ClipboardList,
  CalendarCheck,
  ClipboardPlus,
  AlertTriangle,
  Bell,
  User,
  LogOut,
  Wrench,
  Truck,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dispatcher",
  },
  {
    title: "Dispatcher Board",
    icon: ClipboardList,
    href: "/dispatcher/board",
  },
  {
    title: "Bookings",
    icon: CalendarCheck,
    href: "/dispatcher/bookings",
  },
  {
    title: "Manual Booking",
    icon: ClipboardPlus,
    href: "/dispatcher/manual-booking",
  },
  {
    title: "Emergency Queue",
    icon: AlertTriangle,
    href: "/dispatcher/emergency",
  },
  {
  title: "Job Tracking",
  icon: Truck,
  href: "/dispatcher/job-tracking",
},
  {
    title: "Notifications",
    icon: Bell,
    href: "/dispatcher/notifications",
   
  },
  {
    title: "Profile",
    icon: User,
    href: "/dispatcher/profile",
  },
  
  
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col bg-[#08263B] text-white shadow-2xl lg:flex">

      {/* Logo */}

      <div className="border-b border-white/10 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-orange-500 p-3 shadow-lg">
            <Wrench size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              FieldFlow
            </h1>

            <p className="text-sm text-gray-300">
              Dispatcher Panel
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <ul className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
  item.href === "/dispatcher"
    ? pathname === "/dispatcher"
    : pathname === item.href ||
      pathname.startsWith(item.href + "/");

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200 ${
                    active
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon
                    size={20}
                    className="transition-transform group-hover:scale-110"
                  />

                  <div className="flex w-full items-center justify-between">

                    <span className="font-medium">
                      {item.title}
                    </span>

                    {item.badge && (
                      <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                        {item.badge}
                      </span>
                    )}

                  </div>

                </Link>
              </li>
            );
          })}

        </ul>

      </nav>

      {/* Footer */}

      <div className="border-t border-white/10 p-4">

        <button className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-red-500 hover:text-white">

          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}