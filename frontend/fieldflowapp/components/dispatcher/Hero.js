"use client";

import { Plus, Bell, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-50 via-white to-orange-100 border border-orange-100 p-10">

      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-orange-200/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-orange-100/40 blur-3xl"></div>

      <div className="relative">

        <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-orange-600 font-semibold">
          Dispatcher Dashboard
        </span>

        <h1 className="mt-6 text-5xl font-bold text-[#08263B]">
          Manage Every
          <span className="text-orange-500"> Service Request </span>
          Efficiently
        </h1>

        <p className="mt-6 max-w-2xl text-gray-600 text-lg">
          Assign technicians, manage bookings, track live jobs,
          and monitor emergency requests from one dashboard.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">

          <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition">
            <Plus size={20} />
            Manual Booking
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-orange-300 bg-white px-6 py-3 text-orange-600 font-semibold hover:bg-orange-50 transition">
            <Bell size={20} />
            Emergency Broadcast
          </button>

        </div>

        <div className="mt-10 flex items-center gap-2 text-orange-500 font-semibold">
          Today's Operations
          <ArrowRight size={18} />
        </div>

      </div>

    </section>
  );
}