"use client";
import { useEffect, useState } from "react";

const API = "http://localhost:5001/api/admin";

const statusColors = {
  pending:     "bg-yellow-100 text-yellow-700",
  assigned:    "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  completed:   "bg-green-100 text-green-700",
  cancelled:   "bg-red-100 text-red-700",
};

const statuses = ["pending", "assigned", "in_progress", "completed", "cancelled"];

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);

  function fetchBookings() {
    const token = localStorage.getItem("token");
    fetch(`${API}/bookings`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setBookings)
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchBookings(); }, []);

  async function updateStatus(id, status) {
    const token = localStorage.getItem("token");
    await fetch(`${API}/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
  }

  if (loading) return <div className="flex items-center justify-center h-full text-gray-400 text-lg">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-[#08263B] mb-2">Bookings</h2>
      <p className="text-gray-500 mb-8">Manage all service bookings</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Service</th>
                <th className="pb-3 font-medium">Technician</th>
                <th className="pb-3 font-medium">City</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-3 text-gray-400">{b.id}</td>
                  <td className="py-3 font-medium text-[#08263B]">{b.customer_name || "—"}</td>
                  <td className="py-3 text-gray-600">{b.service_category}</td>
                  <td className="py-3 text-gray-600">{b.technician_name || "Unassigned"}</td>
                  <td className="py-3 text-gray-600">{b.city || "—"}</td>
                  <td className="py-3">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer ${statusColors[b.status]}`}>
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3 text-gray-400">{new Date(b.created_at).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!bookings.length && <p className="text-center text-gray-400 py-8">No bookings found.</p>}
        </div>
      </div>
    </div>
  );
}
