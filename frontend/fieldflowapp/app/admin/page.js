"use client";
import { useEffect, useState } from "react";
import { Users, Wrench, ClipboardList, CheckCircle, TrendingUp, Clock, ArrowUpRight } from "lucide-react";

const API = "http://localhost:5001/api/admin";

export default function AdminDashboard() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser]       = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    const token = localStorage.getItem("token");
    fetch(`${API}/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#F8F9FB]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-[#08263B] font-medium">Loading dashboard...</p>
      </div>
    </div>
  );

  const { stats, recentBookings } = data || {};
  const total = stats?.totalBookings || 1;

  const statCards = [
    { label: "Total Customers",   value: stats?.totalCustomers,    icon: Users,         dark: true  },
    { label: "Technicians",       value: stats?.totalTechnicians,  icon: Wrench,        dark: false },
    { label: "Total Bookings",    value: stats?.totalBookings,     icon: ClipboardList, dark: true  },
    { label: "Completed Jobs",    value: stats?.completedBookings, icon: CheckCircle,   dark: false },
  ];

  const statusStyle = (s) => s === "completed"
    ? "bg-orange-100 text-orange-600"
    : s === "pending"
    ? "bg-[#08263B]/10 text-[#08263B]"
    : "bg-gray-100 text-gray-500";

  return (
    <div className="min-h-screen bg-[#F8F9FB]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#08263B]">
            Good morning, {user?.name?.split(" ")[0] || "Admin"} 👋
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">Here's what's happening with FieldFlow today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.[0] || "A"}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#08263B]">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map(({ label, value, icon: Icon, dark }) => (
            <div key={label}
              className={`rounded-2xl p-6 flex flex-col gap-5 ${dark ? "bg-[#08263B]" : "bg-orange-500"}`}>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center">
                  <Icon size={22} className="text-white" />
                </div>
                <span className="flex items-center gap-1 text-white/70 text-xs bg-white/15 px-2.5 py-1 rounded-full">
                  <ArrowUpRight size={11} /> Live
                </span>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">{value ?? 0}</p>
                <p className="text-white/60 text-sm mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#08263B]">Recent Bookings</h3>
              <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                Latest 8
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  {["Customer", "Service", "Technician", "Status", "Date"].map((h) => (
                    <th key={h} className="pb-3 text-gray-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings?.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-orange-50/40 transition">
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#08263B] flex items-center justify-center text-white text-xs font-bold">
                          {b.customer_name?.[0] || "?"}
                        </div>
                        <span className="font-medium text-[#08263B]">{b.customer_name || "—"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-gray-500">{b.service_category}</td>
                    <td className="py-3.5 text-gray-500">{b.technician_name || "—"}</td>
                    <td className="py-3.5">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-gray-400 text-xs">
                      {new Date(b.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!recentBookings?.length && (
              <div className="text-center py-12">
                <ClipboardList size={36} className="text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No bookings yet.</p>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="space-y-5">

            {/* Booking Breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#08263B] mb-5">Booking Breakdown</h3>
              <div className="space-y-4">
                {[
                  { label: "Completed", value: stats?.completedBookings || 0, color: "bg-orange-500" },
                  { label: "Pending",   value: stats?.pendingBookings || 0,   color: "bg-[#08263B]" },
                  { label: "Others",    value: Math.max(0, total - (stats?.pendingBookings || 0) - (stats?.completedBookings || 0)), color: "bg-gray-200" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-bold text-[#08263B]">{value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color} transition-all duration-500`}
                        style={{ width: `${Math.round((value / total) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-[#08263B] rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-bold text-lg">Platform Summary</h3>

              {[
                { icon: TrendingUp, label: "Completion Rate", value: `${stats?.totalBookings ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0}%` },
                { icon: Clock,      label: "Pending Jobs",    value: stats?.pendingBookings ?? 0 },
                { icon: Wrench,     label: "Technicians",     value: stats?.totalTechnicians ?? 0 },
                { icon: Users,      label: "Customers",       value: stats?.totalCustomers ?? 0 },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon size={15} className="text-orange-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{label}</span>
                  </div>
                  <span className="text-white font-bold">{value}</span>
                </div>
              ))}

              <div className="mt-2 bg-orange-500 rounded-xl p-4 text-center">
                <p className="text-white/70 text-xs mb-1">Total Users on Platform</p>
                <p className="text-3xl font-bold text-white">
                  {(stats?.totalCustomers || 0) + (stats?.totalTechnicians || 0)}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
