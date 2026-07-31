"use client";
import { useEffect, useState } from "react";
import { Trash2, Search, Filter, X, Mail, Phone, MapPin, Calendar, ShieldCheck, User } from "lucide-react";
import { ADMIN_API_BASE_URL } from "@/lib/apiConfig";

const API = ADMIN_API_BASE_URL;

const ROLE_COLORS = {
  customer: "bg-slate-100 text-slate-700",
  technician: "bg-amber-100 text-amber-700",
  dispatcher: "bg-[#FF6000]/15 text-[#FF6000]",
  admin: "bg-[#111F36] text-white",
};

const ROLE_ICONS = {
  customer: User,
  technician: ShieldCheck,
  dispatcher: Filter,
  admin: ShieldCheck,
};

const MOCK_USERS = [
  { id: 1, name: "Priya Sharma", email: "priya@mail.com", phone: "9876543210", city: "Bangalore", role: "customer", created_at: "2025-01-10T10:00:00Z" },
  { id: 2, name: "Ravi Kumar", email: "ravi@mail.com", phone: "9123456780", city: "Mumbai", role: "technician", created_at: "2025-02-14T09:00:00Z" },
  { id: 3, name: "Ananya Lal", email: "ananya@mail.com", phone: "9988776655", city: "Delhi", role: "admin", created_at: "2025-03-01T08:00:00Z" },
  { id: 4, name: "Meera Tiwari", email: "meera@mail.com", phone: "9871234560", city: "Pune", role: "dispatcher", created_at: "2025-03-15T11:00:00Z" },
  { id: 5, name: "Rohit Verma", email: "rohit@mail.com", phone: "9765432100", city: "Hyderabad", role: "customer", created_at: "2025-04-02T14:00:00Z" },
  { id: 6, name: "Sneha Patil", email: "sneha@mail.com", phone: "9654321098", city: "Chennai", role: "customer", created_at: "2025-04-20T10:00:00Z" },
  { id: 7, name: "Karan Mehta", email: "karan@mail.com", phone: "9543210987", city: "Bangalore", role: "technician", created_at: "2025-05-05T09:00:00Z" },
  { id: 8, name: "Divya Nair", email: "divya@mail.com", phone: "9432109876", city: "Mumbai", role: "customer", created_at: "2025-05-18T13:00:00Z" },
];

const ROLES = ["all", "customer", "technician", "dispatcher", "admin"];

function UserModal({ user, onClose, onDelete }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
        <div className="bg-[#111F36] px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FF6000] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/25">
              {user.name[0]}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{user.name}</h3>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${ROLE_COLORS[user.role]}`}>
                {user.role}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "Phone", value: user.phone || "—" },
              { icon: MapPin, label: "City", value: user.city || "—" },
              { icon: Calendar, label: "Joined", value: new Date(user.created_at).toLocaleDateString("en-IN") },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 py-3">
                <Icon size={15} className="text-[#FF6000] shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-slate-400">{label}</p>
                  <p className="text-sm font-bold text-slate-900">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#111F36] text-white font-semibold text-sm hover:bg-[#111F36]/90 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDelete(user.id);
                onClose();
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-500 font-semibold text-sm hover:bg-red-100 transition"
            >
              <Trash2 size={15} /> Delete
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

  function fetchUsers() {
    const token = localStorage.getItem("token");
    fetch(`${API}/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : MOCK_USERS);
      })
      .catch(() => setUsers(MOCK_USERS))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this user?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${API}/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.city?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const counts = ROLES.slice(1).reduce((acc, r) => ({ ...acc, [r]: users.filter((u) => u.role === r).length }), {});

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-[#FF6000] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <>
      {selected && <UserModal user={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />}

      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Users</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">All registered users across your FieldFlow network</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: users.length, icon: User },
            { label: "Customers", value: counts.customer || 0, icon: User },
            { label: "Technicians", value: counts.technician || 0, icon: ShieldCheck },
            { label: "Dispatchers", value: counts.dispatcher || 0, icon: Filter },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-xs font-semibold">{label}</p>
                <h4 className="text-3xl font-extrabold text-slate-900 mt-1">{value}</h4>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
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
              placeholder="Search by name, email or city..."
              className="bg-transparent text-sm text-slate-800 outline-none w-full placeholder:text-slate-400"
              suppressHydrationWarning
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} className="text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                  roleFilter === r
                    ? "bg-[#FF6000] text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {r === "all" ? "All Roles" : r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm">All Users</h3>
            <span className="text-xs text-slate-400 font-medium">{filtered.length} results · click row for details</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100 bg-[#F8FAFC]">
                  {["#", "Name", "Email", "Phone", "City", "Role", "Joined", "Action"].map((h) => (
                    <th key={h} className="px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-amber-50/30 transition">
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{u.id}</td>
                    <td className="px-6 py-4 cursor-pointer" onClick={() => setSelected(u)}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#111F36] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {u.name[0]}
                        </div>
                        <span className="font-bold text-slate-900 hover:text-[#FF6000] transition">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{u.email}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{u.phone || "—"}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-amber-500" />
                        {u.city || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${ROLE_COLORS[u.role]}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-medium">
                      {new Date(u.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-2 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && (
              <div className="text-center py-16">
                <User size={40} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No users match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
