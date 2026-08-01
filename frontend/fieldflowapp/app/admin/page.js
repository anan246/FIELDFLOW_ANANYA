"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Wrench,
  ClipboardList,
  CheckCircle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  X,
  BarChart2,
  DollarSign,
  Activity,
  MapPin,
  ArrowRight
} from "lucide-react";

import { API_BASE_URL, ADMIN_API_BASE_URL } from "@/lib/apiConfig";
import { getTranslation } from "@/lib/translations";

const API = ADMIN_API_BASE_URL;

const STATUS_STEPS = ["pending", "assigned", "in_progress", "completed"];

const statusStyle = (s) =>
  s === "completed"
    ? "bg-emerald-100 text-emerald-600 font-bold"
    : s === "assigned" || s === "in_progress"
    ? "bg-amber-100 text-amber-700 font-bold"
    : s === "pending"
    ? "bg-slate-100 text-slate-700 font-bold"
    : s === "cancelled"
    ? "bg-red-100 text-red-500 font-bold"
    : "bg-slate-100 text-slate-500 font-bold";

// Mock recent activity
const ACTIVITY = [
  { id: 1, action: "New booking created", user: "Priya S.", time: "2m ago", color: "bg-[#FF6000]" },
  { id: 2, action: "Technician marked available", user: "Ravi K.", time: "10m ago", color: "bg-[#111F36]" },
  { id: 3, action: "Booking #1038 completed", user: "System", time: "1h ago", color: "bg-[#FF6000]" },
  { id: 4, action: "New user registered", user: "Ananya L.", time: "2h ago", color: "bg-[#111F36]" },
  { id: 5, action: "Booking #1035 cancelled", user: "Meera T.", time: "3h ago", color: "bg-[#FF6000]" },
];

// Mock monthly revenue data
const REVENUE_MONTHS = [
  { month: "Jan", value: 42000 },
  { month: "Feb", value: 58000 },
  { month: "Mar", value: 51000 },
  { month: "Apr", value: 67000 },
  { month: "May", value: 73000 },
  { month: "Jun", value: 89000 },
];

function BookingModal({ booking, onClose }) {
  if (!booking) return null;
  const stepIndex = STATUS_STEPS.indexOf(booking.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
        {/* Modal Header */}
        <div className="bg-[#111F36] px-6 py-5 flex items-center justify-between text-white">
          <div>
            <h3 className="text-white font-bold text-lg">Booking #{booking.id}</h3>
            <p className="text-slate-300 text-xs mt-0.5">{booking.service_category}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Timeline */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Booking Status Timeline
            </p>
            <div className="flex items-center gap-0">
              {STATUS_STEPS.map((step, i) => {
                const done = i <= stepIndex;
                const current = i === stepIndex;
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                          current
                            ? "bg-orange-500 text-white shadow-md shadow-orange-500/25 ring-4 ring-orange-100"
                            : done
                            ? "bg-[#111F36] text-white"
                            : "bg-slate-100 border border-slate-200 text-slate-400"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <p
                        className={`text-[10px] mt-1.5 font-bold capitalize ${
                          done ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        {step.replace("_", " ")}
                      </p>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mb-4 ${
                          i < stepIndex ? "bg-[#111F36]" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Customer", value: booking.customer_name || "—" },
              { label: "Technician", value: booking.technician_name || "Unassigned" },
              { label: "Service", value: booking.service_category },
              { label: "City", value: booking.city || "—" },
              { label: "Status", value: booking.status },
              { label: "Date", value: new Date(booking.created_at).toLocaleDateString("en-IN") },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <p className="text-[11px] font-semibold text-slate-400 mb-0.5">{label}</p>
                <p className="text-sm font-bold text-slate-900 capitalize">{value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition text-sm shadow-md shadow-orange-500/20 cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

const MOCK_RECENT_BOOKINGS = [
  { id: 1042, customer_name: "Rahul Sharma", technician_name: "Nanda", service_category: "Electrician", city: "Bengaluru", status: "assigned", created_at: new Date().toISOString() },
  { id: 1041, customer_name: "Priya Sharma", technician_name: "Ravi Kumar", service_category: "AC Servicing", city: "Bengaluru", status: "in_progress", created_at: new Date().toISOString() },
  { id: 1040, customer_name: "Suresh Nair", technician_name: "Suresh Nair", service_category: "Plumbing", city: "Bengaluru", status: "completed", created_at: new Date().toISOString() },
  { id: 1039, customer_name: "Meera Tiwari", technician_name: "Unassigned", service_category: "Painting", city: "Delhi", status: "pending", created_at: new Date().toISOString() },
];

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [selected, setSelected] = useState(null);

  const fetchRealtimeData = async () => {
    try {
      const token = localStorage.getItem("token");
      let liveStats = null;
      try {
        const res = await fetch(`${API}/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) liveStats = await res.json();
      } catch (_) {}

      let liveDispatcherStats = null;
      try {
        const dRes = await fetch(`${API_BASE_URL}/dispatcher/dashboard`);
        if (dRes.ok) liveDispatcherStats = await dRes.json();
      } catch (_) {}

      let recentBookingsList = [];
      try {
        const bkRes = await fetch(`${API_BASE_URL}/dispatcher/pending-bookings`);
        if (bkRes.ok) {
          const list = await bkRes.json();
          if (Array.isArray(list) && list.length > 0) {
            recentBookingsList = list.map((b) => ({
              id: b.id,
              customer_name: b.customer_name || "Customer",
              technician_name: b.technician_name || "Unassigned",
              service_category: b.service_name || "Home Service",
              city: b.address || "Bengaluru",
              status: (b.status || "pending").toLowerCase().replace(" ", "_"),
              created_at: b.booking_date || new Date().toISOString(),
            }));
          }
        }
      } catch (_) {}

      // Merge customer bookings from localStorage
      try {
        const localCustomerBookings = JSON.parse(localStorage.getItem("customer_bookings") || "[]");
        localCustomerBookings.forEach((cb) => {
          if (!recentBookingsList.some((b) => String(b.id) === String(cb.id || cb.bookingId))) {
            recentBookingsList.unshift({
              id: cb.id || cb.bookingId || Math.floor(Math.random() * 8000) + 1000,
              customer_name: cb.customerName || cb.userName || cb.customer_name || "Customer",
              service_category: cb.serviceName || cb.serviceCategory || cb.service || "Home Service",
              technician_name: cb.technician_name || cb.technician || "Unassigned",
              city: cb.city || cb.address || "Bengaluru",
              status: (cb.status || "pending").toLowerCase().replace(" ", "_"),
              created_at: cb.created_at || new Date().toISOString(),
            });
          }
        });
      } catch (_) {}

      // Merge assigned jobs from localStorage
      try {
        const localAssignedJobs = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        localAssignedJobs.forEach((aj) => {
          const target = recentBookingsList.find((b) => String(b.id) === String(aj.bookingId));
          if (target) {
            if (aj.techName) target.technician_name = aj.techName;
            if (aj.status) target.status = aj.status.toLowerCase().replace(" ", "_");
          } else {
            recentBookingsList.unshift({
              id: aj.bookingId,
              customer_name: aj.customerName || "Customer",
              service_category: aj.serviceName || "Service Request",
              technician_name: aj.techName || "Assigned Technician",
              city: aj.location || aj.address || "Bengaluru",
              status: (aj.status || "assigned").toLowerCase().replace(" ", "_"),
              created_at: aj.assignedAt || new Date().toISOString(),
            });
          }
        });
      } catch (_) {}

      if (recentBookingsList.length === 0) {
        recentBookingsList = MOCK_RECENT_BOOKINGS;
      }

      const localTechs = JSON.parse(localStorage.getItem("allRegisteredTechnicians") || "[]");
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

      const totalTechsCount = Math.max(localTechs.length, liveDispatcherStats?.availableTechnicians || 0, liveStats?.stats?.totalTechnicians || 12);
      const totalBookingsCount = Math.max(recentBookingsList.length, liveDispatcherStats?.totalBookings || 0, liveStats?.stats?.totalBookings || 24);
      const pendingCount = liveDispatcherStats?.pendingBookings || liveStats?.stats?.pendingBookings || 18;
      const completedCount = liveStats?.stats?.completedBookings || 19;

      setData({
        stats: {
          totalUsers: (liveStats?.stats?.totalUsers || 142) + (storedUser.name ? 1 : 0),
          totalTechnicians: totalTechsCount,
          totalBookings: totalBookingsCount,
          pendingBookings: pendingCount,
          completedBookings: completedCount,
          revenue: liveStats?.stats?.revenue || 387500,
        },
        recentBookings: recentBookingsList,
      });
    } catch (err) {
      console.error("Admin realtime fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const [lang, setLang] = useState("en");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    fetchRealtimeData();

    function loadLang() {
      try {
        setLang(localStorage.getItem("fieldflow_language") || "en");
      } catch (_) {}
    }
    loadLang();

    const handleLangChange = (e) => setLang(e.detail || "en");

    // Auto-refresh stats in real time every 3 seconds
    const interval = setInterval(fetchRealtimeData, 3000);

    window.addEventListener("storage", fetchRealtimeData);
    window.addEventListener("storage", loadLang);
    window.addEventListener("focus", fetchRealtimeData);
    window.addEventListener("fieldflow_language_change", handleLangChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", fetchRealtimeData);
      window.removeEventListener("storage", loadLang);
      window.removeEventListener("focus", fetchRealtimeData);
      window.removeEventListener("fieldflow_language_change", handleLangChange);
    };
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium text-sm">Loading dashboard...</p>
        </div>
      </div>
    );

  const { stats, recentBookings } = data || {};
  const total = stats?.totalBookings || 1;
  const maxRevenue = Math.max(...REVENUE_MONTHS.map((m) => m.value));

  const userName = user?.name?.split(" ")[0] || "Admin";

  return (
    <>
      {selected && <BookingModal booking={selected} onClose={() => setSelected(null)} />}

      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Top Hero Card Header */}
        <div className="bg-[#111F36] rounded-2xl p-7 text-white relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[200px]">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden opacity-25">
            <div className="absolute -right-10 -bottom-16 w-64 h-64 rounded-full border-[28px] border-amber-500/20" />
            <div className="absolute right-12 top-6 w-32 h-32 rounded-full border-[16px] border-amber-500/15" />
          </div>

          <div className="relative z-10">
            <p className="text-orange-400 font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
              {getTranslation(lang, "welcome_back")} 👋
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 tracking-tight">
              {getTranslation(lang, "good_morning")}, {userName}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-md leading-relaxed font-normal">
              Here's what's happening across your FieldFlow network today.
            </p>
          </div>

          <div className="relative z-10 mt-6 flex items-center gap-4 flex-wrap">
            <Link
              href="/admin/bookings"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
            >
              {getTranslation(lang, "manage_bookings")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-slate-500 text-xs font-semibold">{getTranslation(lang, "total_users")}</p>
              <h4 className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats?.totalUsers ?? stats?.totalCustomers ?? 0}
              </h4>
              <p className="text-emerald-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
                +12% This Month
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-slate-500 text-xs font-semibold">{getTranslation(lang, "total_technicians")}</p>
              <h4 className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats?.totalTechnicians ?? 0}
              </h4>
              <p className="text-emerald-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
                Active & Verified
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
              <Wrench className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-slate-500 text-xs font-semibold">{getTranslation(lang, "total_bookings")}</p>
              <h4 className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats?.totalBookings ?? 0}
              </h4>
              <p className="text-emerald-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
                +2 This Week
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-slate-500 text-xs font-semibold">{getTranslation(lang, "completed")}</p>
              <h4 className="text-3xl font-extrabold text-slate-900 mt-1">
                {stats?.completedBookings ?? 0}
              </h4>
              <p className="text-emerald-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
                98% Completion
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Reports & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-slate-900">Reports & Analytics</h3>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                Last 6 months
              </span>
            </div>

            <div className="flex items-end gap-3 h-40 pt-4">
              {REVENUE_MONTHS.map(({ month, value }) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                  <p className="text-[10px] font-bold text-slate-800">
                    ₹{(value / 1000).toFixed(0)}k
                  </p>
                  <div
                    className="w-full rounded-t-xl transition-all duration-500"
                    style={{
                      height: `${Math.round((value / maxRevenue) * 110)}px`,
                      background: value === maxRevenue ? "#FF6000" : "#111F36",
                      opacity: value === maxRevenue ? 1 : 0.8,
                    }}
                  />
                  <p className="text-xs font-semibold text-slate-500">{month}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-100">
              {[
                { icon: Activity, label: "Avg Bookings/Month", value: Math.round((stats?.totalBookings || 0) / 6) },
                { icon: MapPin, label: "Active Cities", value: "8" },
                { icon: TrendingUp, label: "Growth Rate", value: "+18%" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mx-auto mb-2 text-orange-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">{value}</p>
                  <p className="text-xs text-slate-400 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111F36] rounded-2xl p-6 text-white flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-amber-400" />
                <h3 className="text-white font-bold text-lg">Revenue</h3>
              </div>

              <div className="text-center py-4">
                <p className="text-5xl font-extrabold text-white tracking-tight">₹4.8L</p>
                <p className="text-slate-300 text-xs mt-1 font-medium">Estimated this month</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 text-xs font-semibold">+22% vs last month</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Service Revenue", pct: 72 },
                { label: "Platform Fees", pct: 18 },
                { label: "Subscriptions", pct: 10 },
              ].map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{label}</span>
                    <span className="text-white font-bold">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Customer Bookings & Assigned Technicians</h3>
              <p className="text-xs text-slate-500 font-medium">Real-time updates across the platform</p>
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full hidden sm:block">
              Click row for details
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  {["Customer", "Service", "Technician", "Status", "Date"].map((h) => (
                    <th key={h} className="pb-3 px-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings?.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelected(b)}
                    className="hover:bg-orange-50/40 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {b.customer_name?.[0]?.toUpperCase() || "C"}
                        </div>
                        <span className="font-bold text-slate-900">{b.customer_name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 text-slate-600 font-medium">{b.service_category}</td>
                    <td className="py-3.5 px-2 text-slate-600 font-medium">
                      {b.technician_name && b.technician_name !== "Unassigned" ? (
                        <span className="text-orange-600 font-bold flex items-center gap-1">
                          <Wrench size={13} /> {b.technician_name}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusStyle(b.status)}`}>
                        {b.status?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-400 text-xs font-medium">
                      {new Date(b.created_at || Date.now()).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
