"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  ClipboardList,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Wrench,
  User,
  RefreshCw,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

const filters = ["All", "Upcoming", "Completed", "Cancelled"];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 3000);

    const handleSync = () => fetchBookings();
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

  const fetchBookings = async () => {
    try {
      let list = [];

      // 1. Fetch from Customer API endpoint
      try {
        const u = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = u.id || 1;
        const res = await fetch(`${API_BASE_URL}/bookings/customer/${userId}`);
        if (res.ok) {
          const data = await res.json();
          const raw = data.bookings || (Array.isArray(data) ? data : []);
          if (raw.length > 0) {
            list = raw.map((b) => ({
              id: b.id,
              service: b.service_name || "Home Repair",
              category: b.category_name || "Service",
              price: b.service_price || 499,
              date: b.booking_date ? String(b.booking_date).slice(0, 10) : "Today",
              time: b.booking_time || "10:30 AM",
              address: b.address || "Bengaluru",
              status: formatStatus(b.status),
              technician: b.technician_name || "Assigning...",
            }));
          }
        }
      } catch (_) {}

      // 2. Merge local storage customer bookings
      try {
        const localCustomerBookings = JSON.parse(localStorage.getItem("customer_bookings") || "[]");
        const localFieldflowBookings = JSON.parse(localStorage.getItem("fieldflow_bookings") || "[]");
        const allLocal = [...localCustomerBookings, ...localFieldflowBookings];

        allLocal.forEach((cb) => {
          const existingIdx = list.findIndex((b) => String(b.id) === String(cb.id));
          if (existingIdx === -1) {
            list.unshift({
              id: cb.id || Math.floor(Math.random() * 8000) + 1000,
              service: cb.service || cb.service_name || "Home Service",
              category: cb.category || "Service Request",
              price: cb.price || 499,
              date: cb.date || "Today",
              time: cb.time || "10:30 AM",
              address: cb.address || "Bengaluru",
              status: formatStatus(cb.status),
              technician: cb.technician || "Assigning...",
            });
          }
        });
      } catch (_) {}

      // 3. Merge real-time assigned jobs from Dispatcher & Technician updates
      try {
        const assignedJobs = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        assignedJobs.forEach((aj) => {
          const target = list.find((b) => String(b.id) === String(aj.bookingId));
          if (target) {
            if (aj.techName) target.technician = aj.techName;
            if (aj.status) target.status = formatStatus(aj.status);
          } else {
            list.unshift({
              id: aj.bookingId,
              service: aj.serviceName || "Service Request",
              category: "Field Service",
              price: 499,
              date: "Today",
              time: "10:00 AM",
              address: aj.location || aj.address || "Bengaluru",
              status: formatStatus(aj.status),
              technician: aj.techName || "Assigned Technician",
            });
          }
        });
      } catch (_) {}

      // 4. Deduplicate list by id
      const uniqueList = [];
      const seenIds = new Set();
      list.forEach((b) => {
        const bId = String(b.id);
        if (!seenIds.has(bId)) {
          seenIds.add(bId);
          uniqueList.push(b);
        }
      });

      if (uniqueList.length === 0) {
        uniqueList.push(
          { id: 1001, service: "Electrical Repair", category: "Electrical", price: 499, date: "Today", time: "10:30 AM", address: "MG Road, Bengaluru", status: "Upcoming", technician: "Nanda" },
          { id: 1002, service: "AC Servicing", category: "Appliance Repair", price: 799, date: "Yesterday", time: "02:00 PM", address: "Indiranagar, Bengaluru", status: "Completed", technician: "Ravi Kumar" }
        );
      }

      setBookings(uniqueList);
    } catch (err) {
      console.error("fetchBookings error:", err);
    } finally {
      setLoading(false);
    }
  };

  function formatStatus(status) {
    if (!status) return "Upcoming";
    const normalized = String(status).toLowerCase();
    if (normalized === "completed") return "Completed";
    if (normalized === "cancelled" || normalized === "canceled") return "Cancelled";
    return "Upcoming";
  }

  const filteredBookings =
    activeFilter === "All"
      ? bookings
      : bookings.filter((b) => b.status === activeFilter);

  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter((b) => b.status === "Upcoming").length;
  const completedBookings = bookings.filter((b) => b.status === "Completed").length;
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled").length;

  return (
    <main className="min-h-screen bg-[#F4F6F9] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-7">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#FF6B00] uppercase tracking-wider">
              Live Real-Time Sync
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-[#14263D] sm:text-3xl">
              My Bookings
            </h1>
            <p className="mt-1.5 max-w-xl text-xs sm:text-sm text-slate-500 font-medium">
              Track your service status in real time as Dispatchers and Technicians accept and process your job.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <Link
              href="/customer/book-service"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600"
            >
              <Wrench size={17} />
              Book a Service
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<ClipboardList size={20} className="text-[#FF6B00]" />}
            bg="bg-orange-100"
            count={totalBookings}
            label="Total Bookings"
          />

          <StatCard
            icon={<CalendarDays size={20} className="text-blue-600" />}
            bg="bg-blue-50"
            count={upcomingBookings}
            label="Upcoming"
          />

          <StatCard
            icon={<CheckCircle2 size={20} className="text-green-600" />}
            bg="bg-green-50"
            count={completedBookings}
            label="Completed"
          />

          <StatCard
            icon={<XCircle size={20} className="text-red-500" />}
            bg="bg-red-50"
            count={cancelledBookings}
            label="Cancelled"
          />
        </div>

        {/* FILTERS */}
        <div className="rounded-2xl bg-white p-2 shadow-xs border border-slate-100">
          <div className="flex gap-1 overflow-x-auto">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-[#FF6B00] text-white shadow-xs"
                      : "text-slate-500 hover:bg-[#F4F6F9] hover:text-[#14263D]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING & CONTENT */}
        {loading ? (
          <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-xs">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF6B00]" />
            <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-500">
              Syncing live customer bookings...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, idx) => (
                <BookingCard key={`my-booking-${booking.id || idx}-${idx}`} booking={booking} />
              ))
            ) : (
              <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F6F9]">
                  <ClipboardList size={25} className="text-slate-400" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-[#14263D]">
                  No bookings found
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                  {activeFilter === "All"
                    ? "You haven't made any bookings yet."
                    : `There are no ${activeFilter.toLowerCase()} bookings yet.`}
                </p>
                <Link
                  href="/customer/book-service"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/20"
                >
                  Book a Service
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon, bg, count, label }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-xs border border-slate-100">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
          {icon}
        </div>
        <span className="text-2xl font-extrabold text-[#14263D]">{count}</span>
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
}

function BookingCard({ booking }) {
  const statusStyles = {
    Upcoming: { wrapper: "bg-orange-50 text-[#FF6B00] border-orange-200", icon: <AlertCircle size={14} /> },
    Completed: { wrapper: "bg-green-50 text-green-600 border-green-200", icon: <CheckCircle2 size={14} /> },
    Cancelled: { wrapper: "bg-red-50 text-red-500 border-red-200", icon: <XCircle size={14} /> },
  };

  const status = statusStyles[booking.status] || statusStyles.Upcoming;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-xs border border-slate-100 transition hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#14263D] text-white">
            <Wrench size={21} className="text-[#FF6B00]" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">Booking #{booking.id}</p>
            <h2 className="mt-0.5 text-lg font-bold text-[#14263D]">{booking.service}</h2>
            <p className="text-xs text-slate-500 font-medium">{booking.category}</p>
          </div>
        </div>

        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold border ${status.wrapper}`}>
          {status.icon}
          {booking.status}
        </span>
      </div>

      <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-4 text-xs font-medium">
        <div className="flex items-start gap-2.5">
          <CalendarDays size={16} className="mt-0.5 shrink-0 text-[#FF6B00]" />
          <div>
            <p className="text-slate-400">Date</p>
            <p className="mt-0.5 font-bold text-[#14263D]">{booking.date}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock3 size={16} className="mt-0.5 shrink-0 text-[#FF6B00]" />
          <div>
            <p className="text-slate-400">Time</p>
            <p className="mt-0.5 font-bold text-[#14263D]">{booking.time}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <User size={16} className="mt-0.5 shrink-0 text-[#FF6B00]" />
          <div>
            <p className="text-slate-400">Assigned Tech</p>
            <p className="mt-0.5 font-bold text-slate-900">{booking.technician || "Assigning..."}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <MapPin size={16} className="mt-0.5 shrink-0 text-[#FF6B00]" />
          <div>
            <p className="text-slate-400">Location</p>
            <p className="mt-0.5 line-clamp-1 font-bold text-[#14263D]">{booking.address}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium">Total Price</p>
          <p className="mt-0.5 text-base sm:text-lg font-bold text-[#FF6B00]">₹{booking.price}</p>
        </div>

        <Link
          href={`/customer/bookings/${booking.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs sm:text-sm font-bold text-[#14263D] transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
        >
          View Details
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}