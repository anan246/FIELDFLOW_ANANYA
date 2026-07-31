"use client";
import { useEffect, useState } from "react";
import { Wrench, MapPin, Star, Clock, Search, Filter, X, Phone, Mail, CheckCircle, XCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

const API = API_BASE_URL;

const CATEGORIES = ["All", "Electrician", "Plumber", "AC Technician", "Carpenter", "Painter"];

const MOCK_TECHS = [
  { id: 1, name: "Ravi Kumar", email: "ravi@mail.com", phone: "9876543210", category: "Electrician", experience: 5, working_area: "Bangalore", available_today: true, rating: 4.8, jobs_done: 142 },
  { id: 2, name: "Suresh Nair", email: "suresh@mail.com", phone: "9123456780", category: "Plumber", experience: 3, working_area: "Mumbai", available_today: false, rating: 4.5, jobs_done: 89 },
  { id: 3, name: "Amit Sharma", email: "amit@mail.com", phone: "9988776655", category: "AC Technician", experience: 7, working_area: "Delhi", available_today: true, rating: 4.9, jobs_done: 210 },
  { id: 4, name: "Pradeep Singh", email: "pradeep@mail.com", phone: "9871234560", category: "Carpenter", experience: 4, working_area: "Pune", available_today: true, rating: 4.3, jobs_done: 67 },
  { id: 5, name: "Kiran Rao", email: "kiran@mail.com", phone: "9765432100", category: "Painter", experience: 2, working_area: "Hyderabad", available_today: false, rating: 4.1, jobs_done: 34 },
  { id: 6, name: "Mohan Das", email: "mohan@mail.com", phone: "9654321098", category: "Electrician", experience: 6, working_area: "Chennai", available_today: true, rating: 4.7, jobs_done: 178 },
];

function TechModal({ tech, onClose, onToggle }) {
  if (!tech) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
        <div className="bg-[#111F36] px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FF6000] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/25">
              {tech.name[0]}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{tech.name}</h3>
              <p className="text-slate-300 text-xs font-medium">{tech.category}</p>
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
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Rating", value: `⭐ ${tech.rating}` },
              { label: "Jobs Done", value: tech.jobs_done },
              { label: "Exp", value: `${tech.experience} yrs` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F8FAFC] border border-slate-100 rounded-xl p-3">
                <p className="text-lg font-bold text-slate-900">{value}</p>
                <p className="text-xs font-semibold text-slate-400">{label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-1">
            {[
              { icon: Mail, value: tech.email },
              { icon: Phone, value: tech.phone },
              { icon: MapPin, value: tech.working_area },
            ].map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <Icon size={15} className="text-[#FF6000] shrink-0" />
                {value}
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              onToggle(tech.id, tech.available_today);
              onClose();
            }}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
              tech.available_today
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-[#FF6000] text-white hover:bg-[#E55600] shadow-md shadow-orange-500/20"
            }`}
          >
            {tech.available_today ? "Mark Unavailable" : "Mark Available"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TechniciansPage() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filterAvail, setFilterAvail] = useState("all");
  const [selected, setSelected] = useState(null);

  async function fetchTechs() {
    try {
      const token = localStorage.getItem("token");
      let list = [];
      try {
        const res = await fetch(`${API_BASE_URL}/dispatcher/technicians`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) list = data;
        }
      } catch (_) {}

      if (list.length === 0) {
        try {
          const res2 = await fetch(`${API_BASE_URL}/technicians`, { headers: { Authorization: `Bearer ${token}` } });
          if (res2.ok) {
            const data2 = await res2.json();
            if (Array.isArray(data2) && data2.length > 0) list = data2;
          }
        } catch (_) {}
      }

      // Merge local storage registered technicians
      try {
        const localList = JSON.parse(localStorage.getItem("allRegisteredTechnicians") || "[]");
        localList.forEach((t) => {
          if (!list.some((existing) => existing.name?.toLowerCase() === t.name?.toLowerCase())) {
            list.unshift(t);
          }
        });
      } catch (_) {}

      // Merge current active session technician if applicable
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        if (stored.role === "technician" && stored.name) {
          if (!list.some((t) => t.name?.toLowerCase() === stored.name?.toLowerCase())) {
            list.unshift({
              id: stored.id || 999,
              name: stored.name,
              email: stored.email,
              phone: stored.phone || "9876543210",
              category: stored.category || "General Technician",
              experience: stored.experience || 3,
              working_area: stored.working_area || stored.city || "Bengaluru",
              available_today: true,
              status: "Available",
              rating: 4.8,
              jobs_done: 12,
            });
          }
        }
      } catch (_) {}

      MOCK_TECHS.forEach((m) => {
        if (!list.some((t) => t.name?.toLowerCase() === m.name?.toLowerCase())) {
          list.push(m);
        }
      });

      setTechs(list);
    } catch (err) {
      console.error(err);
      setTechs(MOCK_TECHS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTechs();
    const interval = setInterval(fetchTechs, 3000);
    window.addEventListener("storage", fetchTechs);
    window.addEventListener("focus", fetchTechs);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", fetchTechs);
      window.removeEventListener("focus", fetchTechs);
    };
  }, []);

  async function toggleAvailability(id, current) {
    const token = localStorage.getItem("token");
    await fetch(`${API}/technicians/${id}/availability`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ available: !current }),
    }).catch(() => {});
    setTechs((prev) => prev.map((t) => (t.id === id ? { ...t, available_today: !current } : t)));
  }

  const filtered = techs.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.working_area?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || t.category === category;
    const matchAvail =
      filterAvail === "all" || (filterAvail === "available" ? t.available_today : !t.available_today);
    return matchSearch && matchCat && matchAvail;
  });

  const totalAvail = techs.filter((t) => t.available_today).length;

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-[#FF6000] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <>
      {selected && <TechModal tech={selected} onClose={() => setSelected(null)} onToggle={toggleAvailability} />}

      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Technicians</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage and track all registered service technicians</p>
        </div>

        {/* Stat Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Technicians", value: techs.length, icon: Wrench },
            { label: "Available Today", value: totalAvail, icon: CheckCircle },
            { label: "Unavailable", value: techs.length - totalAvail, icon: XCircle },
            { label: "Categories", value: CATEGORIES.length - 1, icon: Filter },
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
              placeholder="Search by name or area..."
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm font-semibold border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white text-slate-800"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            {[["all", "All"], ["available", "Available"], ["unavailable", "Unavailable"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilterAvail(val)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  filterAvail === val
                    ? "bg-[#FF6000] text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelected(t)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 cursor-pointer hover:shadow-md hover:border-amber-200 transition group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#111F36] flex items-center justify-center text-white font-bold group-hover:bg-[#FF6000] transition">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{t.category}</p>
                  </div>
                </div>
                {t.available_today ? (
                  <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                ) : (
                  <XCircle size={18} className="text-slate-300 shrink-0" />
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-amber-500" />
                  {t.working_area}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-amber-500" />
                  {t.experience} yrs experience
                </div>
                <div className="flex items-center gap-2">
                  <Star size={13} className="text-amber-500" />
                  {t.rating ?? "—"} rating · {t.jobs_done ?? 0} jobs
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    t.available_today ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {t.available_today ? "Available Today" : "Unavailable"}
                </span>
                <span className="text-xs font-semibold text-[#FF6000] hover:underline">
                  View details →
                </span>
              </div>
            </div>
          ))}
        </div>

        {!filtered.length && (
          <div className="text-center py-16">
            <Wrench size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No technicians match your filters.</p>
          </div>
        )}
      </div>
    </>
  );
}
