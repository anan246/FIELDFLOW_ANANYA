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
} from "lucide-react";

const filters = ["All", "Upcoming", "Completed", "Cancelled"];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Temporary user ID
  // Later replace with logged-in user ID
  const userId = 1;

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
  `http://localhost:5000/api/bookings/customer/${userId}`
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.message || "Failed to fetch bookings"
          );
        }

        const backendBookings = data.bookings || [];

        const formattedBookings = backendBookings.map((booking) => ({
          id: booking.id,

          service: booking.service_name || "Service",

          category: booking.category_name || "Service",

          price: booking.service_price || 0,

          // Keep date as YYYY-MM-DD to avoid timezone issue
          date: booking.booking_date
            ? String(booking.booking_date).slice(0, 10)
            : "-",

          time: formatTime(booking.booking_time),

          address: booking.address || "-",

          status: formatStatus(booking.status),

          service_id: booking.service_id,

          booking_date: booking.booking_date,

          booking_time: booking.booking_time,

          backend_status: booking.status,
        }));

        setBookings(formattedBookings);
      } catch (err) {
        console.error("Fetch bookings error:", err);
        setError(
          err.message || "Unable to load bookings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  function formatStatus(status) {
    if (!status) return "Upcoming";

    const normalized = status.toLowerCase();

    if (normalized === "completed") {
      return "Completed";
    }

    if (
      normalized === "cancelled" ||
      normalized === "canceled"
    ) {
      return "Cancelled";
    }

    return "Upcoming";
  }

  const filteredBookings =
    activeFilter === "All"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === activeFilter
        );

  const totalBookings = bookings.length;

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "Upcoming"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  return (
    <main className="min-h-screen bg-[#F4F6F9] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#FF6B00]">
              Service History
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#14263D] sm:text-3xl">
              My Bookings
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Track your upcoming services and view your previous bookings.
            </p>
          </div>

          <Link
            href="/customer/book-service"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600"
          >
            <Wrench size={17} />
            Book a Service
          </Link>
        </div>

        {/* STATS */}
        <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">

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
        <div className="mt-7 rounded-2xl bg-white p-2 shadow-sm">
          <div className="flex gap-1 overflow-x-auto">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#FF6B00] text-white shadow-sm"
                      : "text-slate-500 hover:bg-[#F4F6F9] hover:text-[#14263D]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-red-500"
              />

              <div>
                <p className="font-semibold text-red-600">
                  Unable to load bookings
                </p>

                <p className="mt-1 text-sm text-red-500">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="mt-5 rounded-2xl bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF6B00]" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading your bookings...
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">

            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                />
              ))
            ) : (
              <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F6F9]">
                  <ClipboardList
                    size={25}
                    className="text-slate-400"
                  />
                </div>

                <h2 className="mt-4 text-lg font-bold text-[#14263D]">
                  No bookings found
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {activeFilter === "All"
                    ? "You haven't made any bookings yet."
                    : `There are no ${activeFilter.toLowerCase()} bookings yet.`}
                </p>

                <Link
                  href="/customer/book-service"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-3 text-sm font-bold text-white"
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


/* STAT CARD */
function StatCard({ icon, bg, count, label }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-bold text-[#14263D]">
          {count}
        </span>

      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {label}
      </p>
    </div>
  );
}


/* TIME FORMAT */
function formatTime(time) {
  if (!time) return "-";

  const [hours, minutes] = time.split(":");

  let hour = Number(hours);

  const suffix = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${minutes} ${suffix}`;
}


/* BOOKING CARD */
function BookingCard({ booking }) {
  const statusStyles = {
    Upcoming: {
      wrapper: "bg-orange-50 text-[#FF6B00]",
      icon: <AlertCircle size={15} />,
    },

    Completed: {
      wrapper: "bg-green-50 text-green-600",
      icon: <CheckCircle2 size={15} />,
    },

    Cancelled: {
      wrapper: "bg-red-50 text-red-500",
      icon: <XCircle size={15} />,
    },
  };

  const status =
    statusStyles[booking.status] || statusStyles.Upcoming;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">

      {/* TOP */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#14263D]">
            <Wrench
              size={21}
              className="text-[#FF6B00]"
            />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Booking #{booking.id}
            </p>

            <h2 className="mt-1 font-bold text-[#14263D]">
              {booking.service}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {booking.category}
            </p>
          </div>

        </div>

        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${status.wrapper}`}
        >
          {status.icon}
          {booking.status}
        </span>

      </div>

      {/* DETAILS */}
      <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">

        <div className="flex items-start gap-3">
          <CalendarDays
            size={18}
            className="mt-0.5 shrink-0 text-[#FF6B00]"
          />

          <div>
            <p className="text-xs text-slate-400">
              Date
            </p>

            <p className="mt-1 text-sm font-semibold text-[#14263D]">
              {booking.date}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock3
            size={18}
            className="mt-0.5 shrink-0 text-[#FF6B00]"
          />

          <div>
            <p className="text-xs text-slate-400">
              Time
            </p>

            <p className="mt-1 text-sm font-semibold text-[#14263D]">
              {booking.time}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin
            size={18}
            className="mt-0.5 shrink-0 text-[#FF6B00]"
          />

          <div>
            <p className="text-xs text-slate-400">
              Location
            </p>

            <p className="mt-1 line-clamp-2 text-sm font-semibold text-[#14263D]">
              {booking.address}
            </p>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs text-slate-400">
            Total amount
          </p>

          <p className="mt-1 text-lg font-bold text-[#FF6B00]">
            ₹{booking.price}
          </p>
        </div>

        <Link
          href={`/customer/bookings/${booking.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#14263D] transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
        >
          View Details
          <ChevronRight size={17} />
        </Link>

      </div>

    </div>
  );
}