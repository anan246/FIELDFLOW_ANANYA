"use client";

import { useEffect, useState } from "react";
import { Search, Calendar, Clock } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function PendingBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadBookings = () => fetch(`${API_BASE_URL}/dispatcher/pending-bookings?_=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
    loadBookings();
    const interval = setInterval(loadBookings, 5000);
    window.addEventListener("focus", loadBookings);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", loadBookings);
    };
  }, []);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customer_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      booking.service_name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-200">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b">

        <div>
          <h2 className="text-2xl font-bold text-[#08263B]">
            Pending Bookings
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Assign technicians to pending service requests.
          </p>
        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-100 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-orange-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[750px]">

          <thead className="bg-slate-50">

            <tr className="text-left text-gray-500">

              <th className="px-6 py-4">Booking</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Schedule</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredBookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-t hover:bg-orange-50 transition"
              >
                <td className="px-6 py-5 font-semibold text-[#08263B]">
                  #{booking.id}
                </td>

                <td className="px-6">
                  {booking.customer_name}
                </td>

                <td className="px-6">
                  {booking.service_name}
                </td>

                <td className="px-6">

                  <div className="flex flex-col gap-1 text-sm">

                    <span className="flex items-center gap-2">

                      <Calendar size={14} />

                      {new Date(
                        booking.booking_date
                      ).toLocaleDateString()}

                    </span>

                    <span className="flex items-center gap-2">

                      <Clock size={14} />

                      {booking.booking_time}

                    </span>

                  </div>

                </td>

                <td className="px-6">

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">

                    {booking.status}

                  </span>

                </td>

                <td className="px-6 text-center">

                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition">

                    Assign

                  </button>

                </td>

              </tr>

            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No pending bookings found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
