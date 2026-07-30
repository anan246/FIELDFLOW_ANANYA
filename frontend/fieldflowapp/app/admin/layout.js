"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Wrench, ClipboardList, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin",              label: "Dashboard",   icon: LayoutDashboard },
  { href: "/admin/users",        label: "Users",       icon: Users },
  { href: "/admin/technicians",  label: "Technicians", icon: Wrench },
  { href: "/admin/bookings",     label: "Bookings",    icon: ClipboardList },
];

export default function AdminLayout({ children }) {
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.role !== "admin") router.replace("/register");
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/register");
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#08263B] flex flex-col">
        <div className="px-6 py-8 border-b border-white/10">
          <h1 className="text-2xl font-bold text-white">Field<span className="text-orange-500">Flow</span></h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
                  ${active ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`}>
                <Icon size={20} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-white/10">
          <button onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition w-full font-medium">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
