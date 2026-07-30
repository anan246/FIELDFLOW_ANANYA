"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const API = "http://localhost:5001/api/admin";

const roleBadge = {
  customer:   "bg-blue-100 text-blue-700",
  technician: "bg-orange-100 text-orange-700",
  dispatcher: "bg-purple-100 text-purple-700",
  admin:      "bg-red-100 text-red-700",
};

export default function UsersPage() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchUsers() {
    const token = localStorage.getItem("token");
    fetch(`${API}/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchUsers(); }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this user?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${API}/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  }

  if (loading) return <div className="flex items-center justify-center h-full text-gray-400 text-lg">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-[#08263B] mb-2">Users</h2>
      <p className="text-gray-500 mb-8">All registered users on FieldFlow</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">City</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-3 text-gray-400">{u.id}</td>
                  <td className="py-3 font-medium text-[#08263B]">{u.name}</td>
                  <td className="py-3 text-gray-600">{u.email}</td>
                  <td className="py-3 text-gray-600">{u.phone}</td>
                  <td className="py-3 text-gray-600">{u.city || "—"}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleBadge[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="py-3 text-gray-400">{new Date(u.created_at).toLocaleDateString("en-IN")}</td>
                  <td className="py-3">
                    <button onClick={() => handleDelete(u.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!users.length && <p className="text-center text-gray-400 py-8">No users found.</p>}
        </div>
      </div>
    </div>
  );
}
