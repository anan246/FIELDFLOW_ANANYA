"use client";
import { useEffect, useState } from "react";
import { Trash2, Search, Filter, X, Mail, Phone, MapPin, Calendar, ShieldCheck, User, RefreshCw } from "lucide-react";
import { ADMIN_API_BASE_URL } from "@/lib/apiConfig";

const API = ADMIN_API_BASE_URL;

const ROLE_COLORS = {
  customer: "bg-slate-100 text-slate-700 font-bold",
  technician: "bg-[#FF6000]/15 text-[#FF6000] font-bold",
  dispatcher: "bg-amber-100 text-amber-700 font-bold",
  admin: "bg-[#111F36] text-white font-bold",
};

function formatDateSafe(dateStr) {
  if (!dateStr) return "01/08/2026";
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? "01/08/2026" : d.toLocaleDateString("en-IN");
}

const MOCK_USERS = [
  { id: 1, name: "Priya Sharma", email: "priya@mail.com", phone: "9876543210", city: "Bengaluru", role: "customer", created_at: "2026-08-01T00:00:00.000Z" },
  { id: 2, name: "Ravi Kumar", email: "ravi@fieldflow.in", phone: "9123456780", city: "Bengaluru", role: "technician", created_at: "2026-08-01T00:00:00.000Z" },
  { id: 3, name: "Nanda", email: "nanda@fieldflow.in", phone: "9876543210", city: "Bengaluru", role: "technician", created_at: "2026-08-01T00:00:00.000Z" },
  { id: 4, name: "Suresh Nair", email: "suresh@fieldflow.in", phone: "9988776655", city: "Bengaluru", role: "technician", created_at: "2026-08-01T00:00:00.000Z" },
  { id: 5, name: "Ananya L S", email: "ananya@fieldflow.in", phone: "9988776655", city: "Bengaluru", role: "admin", created_at: "2026-08-01T00:00:00.000Z" },
  { id: 6, name: "Meera Tiwari", email: "meera@fieldflow.in", phone: "9871234560", city: "Delhi", role: "dispatcher", created_at: "2026-08-01T00:00:00.000Z" },
  { id: 7, name: "Rahul Sharma", email: "rahul@mail.com", phone: "9765432100", city: "Bengaluru", role: "customer", created_at: "2026-08-01T00:00:00.000Z" },
];

const ROLES = ["all", "customer", "technician", "dispatcher", "admin"];

function UserModal({ user, onClose, onDelete }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
        <div className="bg-[#111F36] px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/25">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{user.name}</h3>
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full capitalize ${ROLE_COLORS[user.role]}`}>
                {user.role}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "Phone", value: user.phone || "9876543210" },
              { icon: MapPin, label: "City / Location", value: user.city || user.address || "Bengaluru" },
              { icon: Calendar, label: "Joined Date", value: formatDateSafe(user.created_at) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                <Icon size={16} className="text-orange-500 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">{label}</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#111F36] text-white font-bold text-xs sm:text-sm hover:bg-[#111F36]/90 transition cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete(user.id);
                onClose();
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-xs sm:text-sm hover:bg-red-100 transition cursor-pointer"
            >
              <Trash2 size={15} /> Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 3000);

    const handleSync = () => fetchUsers();
    window.addEventListener("focus", handleSync);
    window.addEventListener("storage", handleSync);
    window.addEventListener("fieldflow_customer_registered", handleSync);
    window.addEventListener("fieldflow_technician_registered", handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleSync);
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("fieldflow_customer_registered", handleSync);
      window.removeEventListener("fieldflow_technician_registered", handleSync);
    };
  }, []);

  const fetchUsers = async () => {
    let list = [];

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/users`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          list = data;
        }
      }
    } catch (_) {}

    try {
      const localCustomers = JSON.parse(localStorage.getItem("allRegisteredCustomers") || "[]");
      localCustomers.forEach((c) => {
        if (!list.some((u) => u.email === c.email || String(u.id) === String(c.id))) {
          list.unshift(c);
        }
      });
    } catch (_) {}

    try {
      const localTechs = JSON.parse(localStorage.getItem("allRegisteredTechnicians") || "[]");
      localTechs.forEach((t) => {
        if (!list.some((u) => u.email === t.email || String(u.id) === String(t.id))) {
          list.unshift({ ...t, role: "technician" });
        }
      });
    } catch (_) {}

    try {
      const activeUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (activeUser.email && !list.some((u) => u.email === activeUser.email)) {
        list.unshift(activeUser);
      }
    } catch (_) {}

    if (list.length === 0) {
      list = MOCK_USERS;
    } else {
      MOCK_USERS.forEach((m) => {
        if (!list.some((u) => u.email === m.email || u.name === m.name)) {
          list.push(m);
        }
      });
    }

    setUsers(list);
    setLoading(false);
  };

  async function handleDelete(id) {
    if (!confirm("Delete this user from FieldFlow network?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API}/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    } catch (_) {}

    try {
      const localCustomers = JSON.parse(localStorage.getItem("allRegisteredCustomers") || "[]");
      const filteredC = localCustomers.filter((c) => String(c.id) !== String(id));
      localStorage.setItem("allRegisteredCustomers", JSON.stringify(filteredC));
    } catch (_) {}

    setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
  }

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.city?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const counts = ROLES.slice(1).reduce((acc, r) => ({ ...acc, [r]: users.filter((u) => u.role === r).length }), {});

  return (
    <>
      {selected && <UserModal user={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />}

      <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Registered Users</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Live customer registrations, technicians, dispatchers, and admins
            </p>
          </div>
          <button
            type="button"
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh Users
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Total Users", value: users.length, icon: User },
            { label: "Customers", value: counts.customer || 0, icon: User },
            { label: "Technicians", value: counts.technician || 0, icon: ShieldCheck },
            { label: "Dispatchers", value: counts.dispatcher || 0, icon: Filter },
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
              placeholder="Search by name, email or city..."
              className="bg-transparent text-xs sm:text-sm text-slate-800 outline-none w-full placeholder:text-slate-400"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="cursor-pointer">
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 shrink-0">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer whitespace-nowrap ${
                  roleFilter === r
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {r === "all" ? "All Roles" : r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <h3 className="font-bold text-slate-900 text-sm">All Platform Users</h3>
            <span className="text-xs text-slate-500 font-medium">{filtered.length} results</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100 bg-[#F8FAFC]">
                  {["#", "Name", "Email", "Phone", "City", "Role", "Joined", "Action"].map((h) => (
                    <th key={h} className="px-6 py-3.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 font-semibold">
                      Loading registered users...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No users match your filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id || u.email} className="hover:bg-orange-50/40 transition">
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">#{u.id || "101"}</td>
                      <td className="px-6 py-4 cursor-pointer" onClick={() => setSelected(u)}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#111F36] flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {u.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <span className="font-bold text-slate-900 hover:text-orange-600 transition">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{u.email}</td>
                      <td className="px-6 py-4 text-slate-600">{u.phone || "9876543210"}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-orange-500 shrink-0" />
                          <span>{u.city || u.address || "Bengaluru"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold capitalize ${ROLE_COLORS[u.role] || "bg-slate-100 text-slate-700"}`}>
                          {u.role || "customer"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {formatDateSafe(u.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleDelete(u.id)}
                          className="p-2 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
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
