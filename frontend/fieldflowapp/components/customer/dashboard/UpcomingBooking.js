"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
  ArrowRight,
} from "lucide-react";
import { customerDashboardData } from "@/data/customerDashboardData";

export default function UpcomingBooking() {
  const booking = customerDashboardData.upcomingBooking;

  return (
    <section className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl shadow-lg p-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

        <div>
          <p className="text-sm font-medium text-[#FF6B00]">
            Upcoming Booking
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-800">
            {booking.service}
          </h2>
        </div>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 w-fit">
          {booking.status}
        </span>

      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">

        <div className="flex items-center gap-3">
          <CalendarDays className="text-[#FF6B00]" size={20}/>
          <span>{booking.date}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock3 className="text-[#FF6B00]" size={20}/>
          <span>{booking.time}</span>
        </div>

        <div className="flex items-center gap-3">
          <User className="text-[#FF6B00]" size={20}/>
          <span>{booking.technician}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-[#FF6B00]" size={20}/>
          <span>{booking.location}</span>
        </div>

      </div>

      <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 text-white font-semibold hover:bg-orange-600 transition">
        View Details
        <ArrowRight size={18}/>
      </button>

    </section>
  );
}