"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { getGlobalSearchQuery, subscribeRealtimeEvents } from "@/lib/realtimeStore";

export default function RecentBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecent();
    setSearch(getGlobalSearchQuery("customer"));

    const interval = setInterval(fetchRecent, 3000);
    const unsubscribe = subscribeRealtimeEvents((type, payload) => {
      fetchRecent();
      if (type === "fieldflow_search_update" && (payload.role === "customer" || payload.role === "global")) {
        setSearch(payload.query || "");
      }
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const fetchRecent = async () => {
    try {
      let list = [];
      try {
        const localCustomerBookings = JSON.parse(localStorage.getItem("customer_bookings") || "[]");
        const localFieldflowBookings = JSON.parse(localStorage.getItem("fieldflow_bookings") || "[]");
        list = [...localCustomerBookings, ...localFieldflowBookings];
      } catch (_) {}

      // Merge assigned jobs
      try {
        const assignedJobs = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        list = list.map((b) => {
          const match = assignedJobs.find((aj) => String(aj.bookingId) === String(b.id));
          if (match) {
            return {
              ...b,
              status: match.status || "Assigned",
              technician: match.techName || b.technician || "Assigned Technician",
            };
          }
          return b;
        });
      } catch (_) {}

      // Deduplicate list by id
      const uniqueList = [];
      const seenIds = new Set();
      list.forEach((b) => {
        const bId = String(b.id || b.bookingId || Math.random());
        if (!seenIds.has(bId)) {
          seenIds.add(bId);
          uniqueList.push(b);
        }
      });

      if (uniqueList.length === 0) {
        uniqueList.push(
          { id: 1001, service: "Electrical Repair", date: "Today", status: "Assigned", technician: "Nanda" },
          { id: 1002, service: "AC Servicing", date: "Yesterday", status: "Completed", technician: "Ravi Kumar" }
        );
      }

      setBookings(uniqueList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const q = search.toLowerCase();
    return (
      !q ||
      (b.service || b.service_name || "").toLowerCase().includes(q) ||
      (b.technician || "").toLowerCase().includes(q) ||
      String(b.id).includes(q)
    );
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 font-bold";
      case "On the Way":
      case "In Progress":
        return "bg-blue-100 text-blue-700 font-bold";
      case "Assigned":
        return "bg-orange-100 text-orange-700 font-bold";
      case "Cancelled":
        return "bg-red-100 text-red-700 font-bold";
      default:
        return "bg-amber-100 text-amber-700 font-bold";
    }
  };

  return (
    <section className="rounded-3xl border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Recent Bookings</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Real-time status updates</p>
        </div>

        <Link
          href="/customer/bookings"
          className="text-xs sm:text-sm font-bold text-[#FF6B00] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3.5">
        {loading ? (
          <div className="p-6 text-center text-xs text-slate-500 font-medium">Loading recent bookings...</div>
        ) : (
          filteredBookings.slice(0, 5).map((booking, idx) => (
            <div
              key={`recent-booking-${booking.id || idx}-${idx}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 transition hover:border-[#FF6B00]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Wrench size={16} className="text-orange-500 shrink-0" />
                    {booking.service || booking.service_name || "Home Service"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    Booking ID: <strong className="text-slate-800">#{booking.id}</strong> · {booking.date || "Today"}
                  </p>
                  {booking.technician && (
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      Assigned Tech: <strong className="text-slate-900">{booking.technician}</strong>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span className={`rounded-full px-3.5 py-1 text-xs ${getStatusStyle(booking.status)}`}>
                    {booking.status || "Pending"}
                  </span>

                  <Link
                    href={`/customer/bookings/${booking.id}`}
                    className="rounded-xl bg-[#FF6B00] px-4 py-1.5 text-xs font-bold text-white transition hover:bg-orange-600 shadow-2xs"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}

        {filteredBookings.length === 0 && !loading && (
          <div className="p-6 text-center text-xs text-slate-500 font-medium">No bookings match query.</div>
        )}
      </div>
    </section>
  );
}