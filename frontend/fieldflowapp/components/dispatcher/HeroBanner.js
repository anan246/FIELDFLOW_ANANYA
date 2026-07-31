"use client";

import { ArrowRight, ClipboardCheck, Users, AlertTriangle } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#08263B] via-[#0D3654] to-[#12486A] p-6 md:p-10 text-white">

      {/* Decorative Circles */}

      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-orange-500/10"></div>
      <div className="absolute right-20 bottom-0 h-40 w-40 rounded-full bg-white/5"></div>

      <div className="relative flex flex-col lg:flex-row justify-between gap-10">

        {/* Left */}

        <div className="max-w-2xl">

          <p className="uppercase tracking-[4px] text-orange-300 text-sm">
            Dispatcher Dashboard
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
            Welcome Back 👋
          </h1>

          <p className="mt-6 text-gray-200 leading-8">
            Monitor bookings, assign technicians, manage emergency
            requests and keep FieldFlow operations running smoothly.
          </p>

          

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-4 w-full lg:w-[350px]">

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">

            <ClipboardCheck className="text-orange-300 mb-4" size={32} />

            <h3 className="font-semibold">
              Bookings
            </h3>

            <p className="text-sm text-gray-300 mt-2">
              Manage all service requests efficiently.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">

            <Users className="text-green-300 mb-4" size={32} />

            <h3 className="font-semibold">
              Technicians
            </h3>

            <p className="text-sm text-gray-300 mt-2">
              Assign available technicians instantly.
            </p>

          </div>

          <div className="col-span-2 bg-orange-500 rounded-2xl p-5 shadow-lg">

            <AlertTriangle className="mb-3" size={30} />

            <h3 className="text-xl font-bold">
              Emergency Jobs
            </h3>

            <p className="text-orange-100 mt-2">
              High priority requests appear here first.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}