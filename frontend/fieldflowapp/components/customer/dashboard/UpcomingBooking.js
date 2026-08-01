"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
  ArrowRight,
  Wrench,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function UpcomingBooking() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcoming();
    const interval = setInterval(fetchUpcoming, 3000);

    const handleSync = () => fetchUpcoming();
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    window.addEventListener("fieldflow_booking_created", handleSync);
    window.addEventListener("fieldflow_job_assigned", handleSync);
    window.addEventListener("fieldflow_job_status_change", handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
      window.removeEventListener("fieldflow_booking_created", handleSync);
      window.removeEventListener("fieldflow_job_assigned", handleSync);
      window.removeEventListener("fieldflow_job_status_change", handleSync);
    };
  }, []);

  const fetchUpcoming = async () => {
    try {
      let list = [];

      try {
        const localCustomerBookings = JSON.parse(localStorage.getItem("customer_bookings") || "[]");
        const localFieldflowBookings = JSON.parse(localStorage.getItem("fieldflow_bookings") || "[]");
        list = [...localCustomerBookings, ...localFieldflowBookings];
      } catch (_) {}

      // Sync with assigned jobs from Dispatcher & Technician
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

      if (list.length === 0) {
        setBooking({
          id: 1001,
          service: "Electrical Repair",
          date: "Today",
          time: "10:30 AM",
          technician: "Nanda (Assigned)",
          location: "MG Road, Bengaluru",
          status: "Assigned",
        });
      } else {
        const upcoming = list.find((b) => b.status !== "Completed" && b.status !== "Cancelled") || list[0];
        setBooking({
          id: upcoming.id || 1001,
          service: upcoming.service || upcoming.service_name || "Home Repair Service",
          date: upcoming.date || upcoming.booking_date || "Today",
          time: upcoming.time || upcoming.booking_time || "10:30 AM",
          technician: upcoming.technician || upcoming.technician_name || "Assigning...",
          location: upcoming.address || upcoming.location || "Bengaluru",
          status: upcoming.status || "Pending",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    Completed: "bg-green-100 text-green-700 font-bold",
    "In Progress": "bg-purple-100 text-purple-700 font-bold",
    "On the Way": "bg-blue-100 text-blue-700 font-bold",
    Assigned: "bg-orange-100 text-orange-700 font-bold",
    Pending: "bg-amber-100 text-amber-700 font-bold",
  };

  if (loading) return <div className="rounded-3xl bg-white/80 p-6 shadow-md text-slate-500 font-semibold">Loading upcoming booking...</div>;
  if (!booking) return null;

  return (
    <section className="rounded-3xl border border-white/50 bg-white/90 backdrop-blur-xl shadow-lg p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
              Live Upcoming Booking
            </p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Wrench size={20} className="text-orange-500 shrink-0" />
              {booking.service}
            </h2>
          </div>

          <span className={`rounded-full px-3.5 py-1.5 text-xs font-bold w-fit ${statusColors[booking.status] || "bg-amber-100 text-amber-700"}`}>
            {booking.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-[#FF6B00] shrink-0" size={18}/>
            <span>{booking.date}</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock3 className="text-[#FF6B00] shrink-0" size={18}/>
            <span>{booking.time}</span>
          </div>

          <div className="flex items-center gap-3">
            <User className="text-[#FF6B00] shrink-0" size={18}/>
            <span>Tech: <strong className="text-slate-900">{booking.technician}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-[#FF6B00] shrink-0" size={18}/>
            <span className="truncate">{booking.location}</span>
          </div>
        </div>
      </div>

      <Link
        href="/customer/bookings"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 text-white font-bold text-xs sm:text-sm hover:bg-orange-600 transition shadow-md shadow-orange-500/20"
      >
        View Details & Live Status
        <ArrowRight size={16}/>
      </Link>
    </section>
  );
}