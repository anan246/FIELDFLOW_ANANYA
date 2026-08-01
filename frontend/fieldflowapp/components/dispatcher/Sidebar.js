"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  X,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dispatcher" },
  { title: "Dispatcher Board", icon: ClipboardList, href: "/dispatcher/board" },
  { title: "Bookings", icon: CalendarCheck, href: "/dispatcher/bookings" },
  { title: "Manual Booking", icon: ClipboardPlus, href: "/dispatcher/manual-booking" },
  { title: "Emergency Queue", icon: AlertTriangle, href: "/dispatcher/emergency" },
  { title: "Job Tracking", icon: Truck, href: "/dispatcher/job-tracking" },
  { title: "Notifications", icon: Bell, href: "/dispatcher/notifications" },
  { title: "Profile", icon: User, href: "/dispatcher/profile" },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (_) {}
    router.push("/login");
  }

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 flex-col bg-[#08263B] text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 flex" : "-translate-x-full lg:translate-x-0 hidden lg:flex"
        }`}
      >
        {/* Logo */}
        <div className="border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-500 p-3 shadow-lg">
              <Wrench size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">FieldFlow</h1>
              <p className="text-sm text-gray-300">Dispatcher Panel</p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden rounded-lg p-1.5 text-slate-300 hover:bg-white/10"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/dispatcher"
                  ? pathname === "/dispatcher"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200 ${
                      active
                        ? "bg-orange-500 text-white shadow-lg font-bold"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={20} className="transition-transform group-hover:scale-110 shrink-0" />
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-200 hover:bg-red-500 hover:text-white cursor-pointer"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}