"use client";
import { useEffect, useState } from "react";

const API = "http://localhost:5001/api/admin";

export default function TechniciansPage() {
  const [techs, setTechs]   = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchTechs() {
    const token = localStorage.getItem("token");
    fetch(`${API}/technicians`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setTechs)
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchTechs(); }, []);

  async function toggleAvailability(id, current) {
    const token = localStorage.getItem("token");
    await fetch(`${API}/technicians/${id}/availability`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ available: !current }),
    });
    fetchTechs();
  }

  if (loading) return <div className="flex items-center justify-center h-full text-gray-400 text-lg">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-[#08263B] mb-2">Technicians</h2>
      <p className="text-gray-500 mb-8">Manage all registered technicians</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Experience</th>
                <th className="pb-3 font-medium">Working Area</th>
                <th className="pb-3 font-medium">Available Today</th>
              </tr>
            </thead>
            <tbody>
              {techs.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-3 text-gray-400">{t.id}</td>
                  <td className="py-3 font-medium text-[#08263B]">{t.name}</td>
                  <td className="py-3 text-gray-600">{t.email}</td>
                  <td className="py-3 text-gray-600">{t.category || "—"}</td>
                  <td className="py-3 text-gray-600">{t.experience ? `${t.experience} yrs` : "—"}</td>
                  <td className="py-3 text-gray-600">{t.working_area || "—"}</td>
                  <td className="py-3">
                    <button onClick={() => toggleAvailability(t.id, t.available_today)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition
                        ${t.available_today ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                      {t.available_today ? "Available" : "Unavailable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!techs.length && <p className="text-center text-gray-400 py-8">No technicians found.</p>}
        </div>
      </div>
    </div>
  );
}
