"use client";
import { useEffect, useState } from "react";
import { Wrench, MapPin, Star, Clock, Search, Filter, X, Phone, Mail, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

const API = API_BASE_URL;

const CATEGORIES = ["All", "Electrician", "Plumber", "AC Technician", "Carpenter", "Painter"];

const MOCK_TECHS = [
  { id: 1, name: "Ravi Kumar", email: "ravi@fieldflow.in", phone: "9876543210", category: "Electrician", experience: 5, working_area: "Bengaluru", available_today: true, rating: 4.8, jobs_done: 142 },
  { id: 2, name: "Suresh Nair", email: "suresh@fieldflow.in", phone: "9123456780", category: "Plumber", experience: 3, working_area: "Bengaluru", available_today: true, rating: 4.5, jobs_done: 89 },
  { id: 3, name: "Nanda", email: "nanda@fieldflow.in", phone: "9988776655", category: "AC Technician", experience: 7, working_area: "Bengaluru", available_today: true, rating: 4.9, jobs_done: 210 },
  { id: 4, name: "Pradeep Singh", email: "pradeep@mail.com", phone: "9871234560", category: "Carpenter", experience: 4, working_area: "Pune", available_today: true, rating: 4.3, jobs_done: 67 },
  { id: 5, name: "Kiran Rao", email: "kiran@mail.com", phone: "9765432100", category: "Painter", experience: 2, working_area: "Hyderabad", available_today: false, rating: 4.1, jobs_done: 34 },
  { id: 6, name: "Mohan Das", email: "mohan@mail.com", phone: "9654321098", category: "Electrician", experience: 6, working_area: "Chennai", available_today: true, rating: 4.7, jobs_done: 178 },
];

function TechModal({ tech, onClose, onToggle }) {
  if (!tech) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
        <div className="bg-[#111F36] px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/25">
              {tech.name?.[0]?.toUpperCase() || "T"}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{tech.name}</h3>
              <p className="text-slate-300 text-xs font-medium">{tech.category}</p>
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
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Rating", value: `⭐ ${tech.rating || 4.8}` },
              { label: "Jobs Done", value: tech.jobs_done || 12 },
              { label: "Exp", value: `${tech.experience || 3} yrs` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <p className="text-base sm:text-lg font-bold text-slate-900">{value}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase">{label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
              <Mail size={16} className="text-orange-500 shrink-0" />
              <span>{tech.email || "technician@fieldflow.in"}</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
              <Phone size={16} className="text-orange-500 shrink-0" />
              <span>{tech.phone || "9876543210"}</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
              <MapPin size={16} className="text-orange-500 shrink-0" />
              <span>{tech.working_area || tech.city || "Bengaluru"}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onToggle(tech.id, tech.available_today);
              onClose();
            }}
            className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
              tech.available_today
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20"
            }`}
          >
            {tech.available_today ? "Mark Unavailable" : "Mark Available Today"}
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

      // Merge current logged-in technician
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

      // Deduplicate by name
      const uniqueTechs = [];
      const seenNames = new Set();
      list.forEach((t) => {
        const tName = (t.name || "Technician").toLowerCase();
        if (!seenNames.has(tName)) {
          seenNames.add(tName);
          uniqueTechs.push(t);
        }
      });

      setTechs(uniqueTechs);
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

    const handleSync = () => fetchTechs();
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    window.addEventListener("fieldflow_technician_registered", handleSync);
    window.addEventListener("fieldflow_job_assigned", handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
      window.removeEventListener("fieldflow_technician_registered", handleSync);
      window.removeEventListener("fieldflow_job_assigned", handleSync);
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
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.working_area?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || t.category === category;
    const matchAvail =
      filterAvail === "all" || (filterAvail === "available" ? t.available_today : !t.available_today);
    return matchSearch && matchCat && matchAvail;
  });

  const totalAvail = techs.filter((t) => t.available_today).length;

  return (
    <>
      {selected && <TechModal tech={selected} onClose={() => setSelected(null)} onToggle={toggleAvailability} />}

      <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Technicians</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Live directory of verified field technicians & availability status
            </p>
          </div>
          <button
            type="button"
            onClick={fetchTechs}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh Technicians
          </button>
        </div>

        {/* Stat Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Total Technicians", value: techs.length, icon: Wrench },
            { label: "Available Today", value: totalAvail, icon: CheckCircle },
            { label: "Unavailable", value: techs.length - totalAvail, icon: XCircle },
            { label: "Categories", value: CATEGORIES.length - 1, icon: Filter },
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

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex-1">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or area..."
              className="bg-transparent text-xs sm:text-sm text-slate-800 outline-none w-full placeholder:text-slate-400"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} className="cursor-pointer">
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400 shrink-0 hidden sm:block" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-xs sm:text-sm font-bold border border-slate-200 rounded-xl px-3 py-2 outline-none bg-white text-slate-800 cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-1.5 shrink-0">
            {[["all", "All"], ["available", "Available"], ["unavailable", "Unavailable"]].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setFilterAvail(val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  filterAvail === val
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="text-center py-16 text-slate-500 font-semibold text-sm bg-white rounded-3xl border border-slate-100">
            Loading real-time technicians directory...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((t, idx) => (
              <div
                key={`tech-card-${t.id || t.name}-${idx}`}
                onClick={() => setSelected(t)}
                className="bg-white rounded-3xl border border-slate-100 shadow-xs p-5 cursor-pointer hover:shadow-md hover:border-orange-200 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#111F36] flex items-center justify-center text-white font-bold group-hover:bg-orange-500 transition shrink-0">
                      {t.name?.[0]?.toUpperCase() || "T"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm sm:text-base">{t.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{t.category || "Technician"}</p>
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
                    <MapPin size={14} className="text-orange-500 shrink-0" />
                    <span>{t.working_area || t.city || "Bengaluru"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-orange-500 shrink-0" />
                    <span>{t.experience || 3} yrs experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-orange-500 shrink-0" />
                    <span>⭐ {t.rating || 4.8} rating · {t.jobs_done || 12} jobs</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                      t.available_today ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {t.available_today ? "Available Today" : "Unavailable"}
                  </span>
                  <span className="text-xs font-bold text-orange-600 group-hover:underline">
                    View details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !filtered.length && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
            <Wrench size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-semibold">No technicians match your filters.</p>
          </div>
        )}
      </div>
    </>
  );
}
