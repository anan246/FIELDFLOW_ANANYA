"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Search, Filter, X, MapPin, Calendar, User, Wrench, RefreshCw } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

const STATUS_STEPS = ["pending", "assigned", "in_progress", "completed"];

const STATUS_COLORS = {
  pending: "bg-slate-100 text-slate-700 font-bold",
  assigned: "bg-amber-100 text-amber-700 font-bold",
  in_progress: "bg-orange-100 text-orange-700 font-bold",
  completed: "bg-emerald-100 text-emerald-700 font-bold",
  cancelled: "bg-red-100 text-red-700 font-bold",
};

const STATUSES = ["pending", "assigned", "in_progress", "completed", "cancelled"];

const MOCK_REAL_BOOKINGS = [
  { id: 1001, customer_name: "Rahul Sharma", service_category: "Electrical Repair", technician_name: "Nanda", city: "Bengaluru", status: "assigned", created_at: new Date().toISOString(), address: "MG Road, Bengaluru" },
  { id: 1002, customer_name: "Priya Sharma", service_category: "AC Servicing", technician_name: "Ravi Kumar", city: "Bengaluru", status: "in_progress", created_at: new Date().toISOString(), address: "Indiranagar, Bengaluru" },
  { id: 1003, customer_name: "Suresh Nair", service_category: "Plumbing Repair", technician_name: "Suresh Nair", city: "Bengaluru", status: "completed", created_at: new Date().toISOString(), address: "Whitefield, Bengaluru" },
  { id: 1004, customer_name: "Meera Tiwari", service_category: "Home Painting", technician_name: "Unassigned", city: "Delhi", status: "pending", created_at: new Date().toISOString(), address: "7 Connaught Place" },
  { id: 1005, customer_name: "Jetalal Gada", service_category: "Electronics Repair", technician_name: "Ravi Kumar", city: "Mumbai", status: "assigned", created_at: new Date().toISOString(), address: "Powai, Mumbai" },
];

function BookingModal({ booking, onClose, onStatusChange }) {
  if (!booking) return null;
  const stepIndex = STATUS_STEPS.indexOf(booking.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
        <div className="bg-[#111F36] px-6 py-5 flex items-center justify-between text-white">
          <div>
            <h3 className="text-white font-bold text-lg">Booking #{booking.id}</h3>
            <p className="text-slate-300 text-xs mt-0.5">{booking.service_category} · {booking.city}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Status Timeline</p>
            <div className="flex items-center">
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
                      <p className={`text-[10px] mt-1.5 font-bold capitalize whitespace-nowrap ${done ? "text-slate-900" : "text-slate-400"}`}>
                        {step.replace("_", " ")}
                      </p>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mb-4 ${i < stepIndex ? "bg-[#111F36]" : "bg-slate-200"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: User, label: "Customer", value: booking.customer_name },
              { icon: Wrench, label: "Technician", value: booking.technician_name || "Unassigned" },
              { icon: ClipboardList, label: "Service", value: booking.service_category },
              { icon: MapPin, label: "City", value: booking.city || "Bengaluru" },
              { icon: MapPin, label: "Address", value: booking.address || "Bengaluru" },
              { icon: Calendar, label: "Date", value: new Date(booking.created_at || Date.now()).toLocaleDateString("en-IN") },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-start gap-2">
                <Icon size={14} className="text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">{label}</p>
                  <p className="text-sm font-bold text-slate-900 capitalize">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    onStatusChange(booking.id, s);
                    onClose();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                    booking.status === s
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-[#111F36] hover:text-white"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#111F36] hover:bg-[#111F36]/90 text-white font-bold py-3 rounded-xl transition text-sm cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 3000);

    const handleSync = () => fetchBookings();
    window.addEventListener("focus", handleSync);
    window.addEventListener("storage", handleSync);
    window.addEventListener("fieldflow_booking_created", handleSync);
    window.addEventListener("fieldflow_job_assigned", handleSync);
    window.addEventListener("fieldflow_job_status_change", handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleSync);
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("fieldflow_booking_created", handleSync);
      window.removeEventListener("fieldflow_job_assigned", handleSync);
      window.removeEventListener("fieldflow_job_status_change", handleSync);
    };
  }, []);

  const fetchBookings = async () => {
    let list = [];

    // 1. Try fetching from Admin API endpoint
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/admin/bookings?_=${Date.now()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        const raw = Array.isArray(data) ? data : data.bookings || [];
        if (raw.length > 0) {
          list = raw.map((b) => ({
            id: b.id,
            customer_name: b.customer_name || b.customerName || "Customer",
            service_category: b.service_category || b.service_name || "Home Repair",
            technician_name: b.technician_name || "Unassigned",
            city: b.city || b.address || "Bengaluru",
            status: (b.status || "pending").toLowerCase().replaceAll(" ", "_"),
            created_at: b.created_at || b.booking_date || new Date().toISOString(),
            address: b.address || "Bengaluru",
          }));
        }
      }
    } catch (_) {}

    // 2. Fetch Dispatcher Pending Bookings
    if (list.length === 0) {
      try {
        const dispRes = await fetch(`${API_BASE_URL}/dispatcher/pending-bookings`);
        if (dispRes.ok) {
          const dispData = await dispRes.json();
          if (Array.isArray(dispData)) {
            list = dispData.map((b) => ({
              id: b.id,
              customer_name: b.customer_name || "Customer",
              service_category: b.service_name || "Home Repair",
              technician_name: b.technician_name || "Unassigned",
              city: b.address || "Bengaluru",
              status: (b.status || "pending").toLowerCase().replaceAll(" ", "_"),
              created_at: b.booking_date || new Date().toISOString(),
              address: b.address || "Bengaluru",
            }));
          }
        }
      } catch (_) {}
    }

    // 3. Merge Customer Bookings from localStorage
    try {
      const localCustomerBookings = JSON.parse(localStorage.getItem("customer_bookings") || "[]");
      localCustomerBookings.forEach((cb) => {
        const existingIdx = list.findIndex((b) => String(b.id) === String(cb.id || cb.bookingId));
        if (existingIdx === -1) {
          list.unshift({
            id: cb.id || cb.bookingId || Math.floor(Math.random() * 8000) + 1000,
            customer_name: cb.customerName || cb.userName || cb.customer_name || "Customer",
            service_category: cb.serviceName || cb.serviceCategory || cb.service || "Home Service",
            technician_name: cb.technician_name || cb.technician || "Unassigned",
            city: cb.city || cb.address || "Bengaluru",
            status: (cb.status || "pending").toLowerCase().replaceAll(" ", "_"),
            created_at: cb.created_at || new Date().toISOString(),
            address: cb.address || "Bengaluru",
          });
        }
      });
    } catch (_) {}

    // 4. Merge Assigned Jobs from localStorage (assigned by Dispatchers to Technicians)
    try {
      const localAssignedJobs = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
      localAssignedJobs.forEach((aj) => {
        const target = list.find((b) => String(b.id) === String(aj.bookingId));
        if (target) {
          if (aj.techName) target.technician_name = aj.techName;
          if (aj.status) target.status = (aj.status).toLowerCase().replaceAll(" ", "_");
        } else {
          list.unshift({
            id: aj.bookingId,
            customer_name: aj.customerName || "Customer",
            service_category: aj.serviceName || "Service Request",
            technician_name: aj.techName || "Assigned Technician",
            city: aj.location || aj.address || "Bengaluru",
            status: (aj.status || "assigned").toLowerCase().replaceAll(" ", "_"),
            created_at: aj.assignedAt || new Date().toISOString(),
            address: aj.location || "Bengaluru",
          });
        }
      });
    } catch (_) {}

    if (list.length === 0) {
      list = MOCK_REAL_BOOKINGS;
    }

    setBookings(list);
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const formattedStatus = newStatus.toLowerCase().replaceAll(" ", "_");
    setBookings((prev) =>
      prev.map((b) => (String(b.id) === String(id) ? { ...b, status: formattedStatus } : b))
    );

    // Sync to local storage
    try {
      const localAssignedJobs = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
      const updated = localAssignedJobs.map((aj) =>
        String(aj.bookingId) === String(id) ? { ...aj, status: newStatus } : aj
      );
      localStorage.setItem("assigned_jobs", JSON.stringify(updated));

      window.dispatchEvent(new CustomEvent("fieldflow_job_status_change", { detail: { jobId: id, status: newStatus } }));
      window.dispatchEvent(new Event("storage"));
    } catch (_) {}

    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE_URL}/api/admin/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (_) {}
  };

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.service_category?.toLowerCase().includes(search.toLowerCase()) ||
      b.technician_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.city?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: bookings.filter((b) => b.status === s).length }), {});

  return (
    <>
      {selected && (
        <BookingModal
          booking={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(id, status) => {
            updateStatus(id, status);
            setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
          }}
        />
      )}

      <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Admin Bookings</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Live bookings from all Customers and real-time assigned Technicians
            </p>
          </div>
          <button
            type="button"
            onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh Live Data
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            { label: "Total Bookings", value: bookings.length, icon: ClipboardList },
            { label: "Pending", value: counts.pending || 0, icon: ClipboardList },
            { label: "Assigned", value: counts.assigned || 0, icon: ClipboardList },
            { label: "Completed", value: counts.completed || 0, icon: ClipboardList },
            { label: "Cancelled", value: counts.cancelled || 0, icon: ClipboardList },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-semibold">{label}</p>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{value}</h4>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex-1">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer, technician, service..."
              className="bg-transparent text-xs sm:text-sm text-slate-800 outline-none w-full placeholder:text-slate-400"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="cursor-pointer">
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter size={15} className="text-slate-400 shrink-0 hidden sm:block" />
            <div className="flex gap-1.5 shrink-0">
              {[["all", "All"], ...STATUSES.map((s) => [s, s.replace("_", " ")])].map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFilterStatus(val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer whitespace-nowrap ${
                    filterStatus === val
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111F36] rounded-3xl shadow-lg border border-slate-800 overflow-hidden text-white">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <h3 className="font-bold text-white text-sm">All Customer Bookings & Technician Assignments</h3>
            <span className="text-xs text-slate-400 font-medium">{filtered.length} results</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800 bg-[#162942]">
                  {["#", "Customer", "Service", "Technician", "City", "Status", "Date"].map((h) => (
                    <th key={h} className="px-6 py-3.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-semibold">
                      Loading live bookings...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => (
                    <tr
                      key={b.id}
                      onClick={() => setSelected(b)}
                      className="hover:bg-white/5 transition cursor-pointer"
                    >
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">#{b.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {b.customer_name?.[0]?.toUpperCase() || "C"}
                          </div>
                          <span className="font-bold text-white">{b.customer_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{b.service_category}</td>
                      <td className="px-6 py-4 text-slate-300">
                        {b.technician_name && b.technician_name !== "Unassigned" ? (
                          <span className="text-orange-400 font-bold flex items-center gap-1">
                            <Wrench size={13} /> {b.technician_name}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-orange-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{b.city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold capitalize ${STATUS_COLORS[b.status] || "bg-slate-700 text-slate-300"}`}>
                          {b.status?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {new Date(b.created_at || Date.now()).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
