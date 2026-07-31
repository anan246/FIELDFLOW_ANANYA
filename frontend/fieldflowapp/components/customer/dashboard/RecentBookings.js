"use client";

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

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Recent Bookings
        </h2>

        <button className="font-semibold text-[#FF6B00] hover:underline">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {customerDashboardData.bookings.map((booking) => (

          <div
            key={booking.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#FF6B00]"
          >

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

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

              <div className="flex flex-wrap items-center gap-3">

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatus(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

                <button className="rounded-xl bg-[#FF6B00] px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
                  Details
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}