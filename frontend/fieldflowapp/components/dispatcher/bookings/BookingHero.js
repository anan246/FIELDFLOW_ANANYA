"use client";

import { ClipboardList, Plus, Clock } from "lucide-react";

export default function BookingHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#08263B] via-[#0D3552] to-[#08263B] text-white shadow-xl">

      {/* Background Circles */}
      <div className="absolute -top-16 -right-10 h-64 w-64 rounded-full bg-white/5"></div>
      <div className="absolute bottom-0 right-40 h-44 w-44 rounded-full bg-orange-500/10"></div>

      <div className="relative grid lg:grid-cols-3 gap-8 p-10">

        {/* Left */}
        <div className="lg:col-span-2">

          <p className="tracking-[5px] text-orange-400 uppercase font-semibold mb-4">
            Booking Management
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Manage All
            <br />
            Service Requests
          </h1>

          <p className="mt-6 text-gray-300 max-w-2xl text-lg leading-8">
            View customer bookings, assign technicians,
            prioritize emergency requests and monitor every
            service from one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600 transition">

              <Plus size={20} />
              Manual Booking

            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 hover:bg-white/20 transition">

              <Clock size={20} />
              Pending Jobs

            </button>

          </div>

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-5">

          <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5">
            <ClipboardList
              className="text-orange-400 mb-5"
              size={34}
            />

            <p className="text-3xl font-bold">124</p>

            <p className="text-gray-300 mt-1">
              Total Bookings
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5">
            <Clock
              className="text-yellow-300 mb-5"
              size={34}
            />

            <p className="text-3xl font-bold">18</p>

            <p className="text-gray-300 mt-1">
              Pending
            </p>
          </div>

          <div className="col-span-2 rounded-2xl bg-orange-500 p-6 shadow-lg">

            <h3 className="text-2xl font-bold">
              Emergency Queue
            </h3>

            <p className="mt-2 text-orange-100">
              5 high priority bookings require immediate technician assignment.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}