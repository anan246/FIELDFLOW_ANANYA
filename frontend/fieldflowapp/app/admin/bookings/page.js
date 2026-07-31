"use client";
import { useEffect, useState } from "react";
import { ClipboardList, Search, Filter, X, MapPin, Calendar, User, Wrench } from "lucide-react";
import { ADMIN_API_BASE_URL } from "@/lib/apiConfig";

const API = ADMIN_API_BASE_URL;

const STATUS_STEPS = ["pending", "assigned", "in_progress", "completed"];

const STATUS_COLORS = {
  pending: "bg-slate-100 text-slate-700",
  assigned: "bg-amber-100 text-amber-700",
  in_progress: "bg-[#FF6000]/15 text-[#FF6000]",
  completed: "bg-emerald-100 text-emerald-600",
  cancelled: "bg-red-100 text-red-500",
};

const STATUSES = ["pending", "assigned", "in_progress", "completed", "cancelled"];

const MOCK_BOOKINGS = [
  { id: 1001, customer_name: "Priya Sharma", service_category: "Electrician", technician_name: "Ravi Kumar", city: "Bangalore", status: "completed", created_at: "2025-06-01T10:00:00Z", address: "12 MG Road" },
  { id: 1002, customer_name: "Popat Lal", service_category: "Plumber", technician_name: null, city: "Mumbai", status: "pending", created_at: "2025-06-03T09:30:00Z", address: "45 Andheri West" },
  { id: 1003, customer_name: "Meera Tiwari", service_category: "AC Technician", technician_name: "Amit Sharma", city: "Delhi", status: "in_progress", created_at: "2025-06-05T14:00:00Z", address: "7 Connaught Place" },
  { id: 1004, customer_name: "Rohit Verma", service_category: "Carpenter", technician_name: "Pradeep Singh", city: "Pune", status: "assigned", created_at: "2025-06-06T11:00:00Z", address: "22 FC Road" },
  { id: 1005, customer_name: "Sneha Patil", service_category: "Painter", technician_name: null, city: "Hyderabad", status: "cancelled", created_at: "2025-06-07T08:00:00Z", address: "9 Banjara Hills" },
  { id: 1006, customer_name: "Karan Mehta", service_category: "Electrician", technician_name: "Mohan Das", city: "Chennai", status: "completed", created_at: "2025-06-08T16:00:00Z", address: "3 Anna Nagar" },
  { id: 1007, customer_name: "Jetalal", service_category: "Plumber", technician_name: "Suresh Nair", city: "Bangalore", status: "pending", created_at: "2025-06-09T10:30:00Z", address: "88 Koramangala" },
  { id: 1008, customer_name: "Arjun Reddy", service_category: "AC Technician", technician_name: "Amit Sharma", city: "Delhi", status: "assigned", created_at: "2025-06-10T13:00:00Z", address: "15 Dwarka" },
];

function BookingModal({ booking, onClose, onStatusChange }) {
  if (!booking) return null;
  const stepIndex = STATUS_STEPS.indexOf(booking.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100">
        <div className="bg-[#111F36] px-6 py-5 flex items-center justify-between text-white">
          <div>
            <h3 className="text-white font-bold text-lg">Booking #{booking.id}</h3>
            <p className="text-slate-300 text-xs mt-0.5">{booking.service_category} · {booking.city}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
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
                            ? "bg-[#FF6000] text-white shadow-md shadow-orange-500/25 ring-4 ring-orange-100"
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
              { icon: MapPin, label: "City", value: booking.city || "—" },
              { icon: MapPin, label: "Address", value: booking.address || "—" },
              { icon: Calendar, label: "Date", value: new Date(booking.created_at).toLocaleDateString("en-IN") },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-[#F8FAFC] border border-slate-100 rounded-xl p-3 flex items-start gap-2">
                <Icon size={14} className="text-[#FF6000] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-slate-400">{label}</p>
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
                  onClick={() => {
                    onStatusChange(booking.id, s);
                    onClose();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition capitalize ${
                    booking.status === s
                      ? "bg-[#FF6000] text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-[#111F36] hover:text-white"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#111F36] hover:bg-[#111F36]/90 text-white font-semibold py-3 rounded-xl transition text-sm"
          >
            Close
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

  function fetchBookings() {
    const token = localStorage.getItem("token");
    if (!token) {
      setBookings(MOCK_BOOKINGS);
      setLoading(false);
      return;
    }
    fetch(`${API}/bookings`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        const ct = r.headers.get("content-type");
        if (ct && ct.includes("application/json")) return r.json();
        return null;
      })
      .then((data) => {
        if (Array.isArray(data)) setBookings(data);
        else setBookings(MOCK_BOOKINGS);
      })
      .catch(() => setBookings(MOCK_BOOKINGS))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function updateStatus(id, status) {
    const token = localStorage.getItem("token");
    if (!token) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      return;
    }
    await fetch(`${API}/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    }).catch(() => {});
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.service_category?.toLowerCase().includes(search.toLowerCase()) ||
      b.city?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: bookings.filter((b) => b.status === s).length }), {});

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-[#FF6000] border-t-transparent rounded-full animate-spin" />
      </div>
    );

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

      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Bookings</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage all service bookings across your platform</p>
        </div>

        {/* Stat Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Total Bookings", value: bookings.length, icon: ClipboardList },
            { label: "Pending", value: counts.pending || 0, icon: ClipboardList },
            { label: "Assigned", value: counts.assigned || 0, icon: ClipboardList },
            { label: "Completed", value: counts.completed || 0, icon: ClipboardList },
            { label: "Cancelled", value: counts.cancelled || 0, icon: ClipboardList },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-semibold">{label}</p>
                <h4 className="text-3xl font-extrabold text-slate-900 mt-1">{value}</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl px-4 py-2.5 flex-1 min-w-48">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer, service, city..."
              className="bg-transparent text-sm text-slate-800 outline-none w-full placeholder:text-slate-400"
              suppressHydrationWarning
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} className="text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400" />
            <div className="flex flex-wrap gap-2">
              {[["all", "All"], ...STATUSES.map((s) => [s, s.replace("_", " ")])].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilterStatus(val)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                    filterStatus === val
                      ? "bg-[#FF6000] text-white shadow-md shadow-orange-500/20"
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
        <div className="bg-[#111F36] rounded-2xl shadow-md border border-slate-800 overflow-hidden text-white">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <h3 className="font-bold text-white text-sm">All Bookings</h3>
            <span className="text-xs text-slate-400 font-medium">{filtered.length} results · click row for details</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800 bg-[#162942]">
                  {["#", "Customer", "Service", "Technician", "City", "Status", "Date"].map((h) => (
                    <th key={h} className="px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelected(b)}
                    className="hover:bg-white/5 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{b.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#FF6000] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {b.customer_name?.[0] || "?"}
                        </div>
                        <span className="font-bold text-white">{b.customer_name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">{b.service_category}</td>
                    <td className="px-6 py-4 text-slate-300 font-medium">
                      {b.technician_name || <span className="text-slate-500 italic">Unassigned</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-amber-500" />
                        {b.city || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${STATUS_COLORS[b.status] || "bg-slate-700 text-slate-300"}`}>
                        {b.status?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-medium">
                      {new Date(b.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && (
              <div className="text-center py-16">
                <ClipboardList size={40} className="text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No bookings match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
