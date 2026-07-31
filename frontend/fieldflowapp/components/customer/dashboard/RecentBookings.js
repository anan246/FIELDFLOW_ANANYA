"use client";

import Link from "next/link";
import { customerDashboardData } from "@/data/customerDashboardData";

export default function RecentBookings() {
  const getStatus = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "On the Way":
        return "bg-blue-100 text-blue-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Assigned":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-800">
          Recent Bookings
        </h2>

        <Link
          href="/customer/bookings"
          className="font-semibold text-[#FF6B00] hover:underline"
        >
          View All
        </Link>

      </div>

      {/* BOOKINGS */}
      <div className="space-y-4">

        {customerDashboardData.bookings.map((booking) => (

          <div
            key={booking.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#FF6B00]"
          >

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              {/* BOOKING INFO */}
              <div>

                <h3 className="text-lg font-semibold text-slate-800">
                  {booking.service}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Booking ID : {booking.id}
                </p>

                <p className="text-sm text-slate-500">
                  {booking.date}
                </p>

              </div>

              {/* STATUS + DETAILS */}
              <div className="flex flex-wrap items-center gap-3">

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatus(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

                <Link
                  href={`/customer/bookings/${booking.id}`}
                  className="rounded-xl bg-[#FF6B00] px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Details
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}