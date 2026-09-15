"use client";

import { useEffect, useState } from "react";
import { User, Phone, Wrench, CheckCircle, XCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";
import { getStoredData, subscribeRealtimeEvents, getGlobalSearchQuery } from "@/lib/realtimeStore";

export default function TechnicianPanel() {
  const [technicians, setTechnicians] = useState([]);
  const [search, setSearch] = useState("");

  const loadTechnicians = async () => {
    let list = [];
    try {
      const res = await fetch(`${API_BASE_URL}/dispatcher/technicians?_=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) list = data;
      }
    } catch (_) {}

    const localTechs = getStoredData("allRegisteredTechnicians", []);
    localTechs.forEach((t) => {
      const existingIdx = list.findIndex((item) => item.name?.toLowerCase() === t.name?.toLowerCase());
      if (existingIdx === -1) {
        list.unshift({
          id: t.id || Math.floor(Math.random() * 1000) + 10,
          name: t.name,
          specialization: t.specialization || t.category || "General Technician",
          phone: t.phone || "9876543210",
          status: t.status || "Available",
        });
      } else {
        list[existingIdx].status = t.status || list[existingIdx].status;
      }
    });

    if (list.length === 0) {
      list = [
        { id: 101, name: "Ravi Kumar", specialization: "AC Servicing", phone: "9123456780", status: "Available" },
        { id: 102, name: "Nanda", specialization: "Electrician", phone: "9123456781", status: "Available" },
        { id: 103, name: "Suresh Nair", specialization: "Plumbing", phone: "9123456782", status: "Available" },
      ];
    }

    setTechnicians(list);
  };

  useEffect(() => {
    loadTechnicians();
    setSearch(getGlobalSearchQuery("dispatcher"));

    const interval = setInterval(loadTechnicians, 4000);
    const unsubscribe = subscribeRealtimeEvents((type, payload) => {
      loadTechnicians();
      if (type === "fieldflow_search_update" && (payload.role === "dispatcher" || payload.role === "global")) {
        setSearch(payload.query || "");
      }
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const filteredTechnicians = technicians.filter(
    (tech) =>
      (tech.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (tech.specialization || "").toLowerCase().includes(search.toLowerCase()) ||
      (tech.phone || "").includes(search)
  );

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-[#08263B]">Technicians</h2>
        <p className="text-gray-500 text-sm mt-1">Available field technicians</p>
      </div>

      {/* List */}
      <div className="max-h-[650px] overflow-y-auto">
        {filteredTechnicians.map((tech) => (
          <div key={tech.id || tech.name} className="p-5 border-b hover:bg-slate-50 transition">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[#08263B] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {tech.name ? tech.name.charAt(0).toUpperCase() : <User size={20} />}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-[#08263B] text-base">{tech.name}</h3>

                <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-slate-500">
                  <Wrench size={13} className="text-orange-500" />
                  {tech.specialization || tech.category || "Field Specialist"}
                </div>

                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <Phone size={13} />
                  {tech.phone || "9876543210"}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {tech.status === "Available" ? (
                <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <CheckCircle size={14} />
                  Available
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-red-600 text-xs font-bold bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                  <XCircle size={14} />
                  Busy
                </span>
              )}

              <button
                disabled={tech.status !== "Available"}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                  tech.status === "Available"
                    ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {tech.status === "Available" ? "Active" : "Occupied"}
              </button>
            </div>
          </div>
        ))}

        {filteredTechnicians.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm font-medium">No technicians found matching query.</div>
        )}
      </div>
    </div>
  );
}
