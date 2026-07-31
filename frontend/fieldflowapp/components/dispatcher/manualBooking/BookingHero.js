"use client";

import Link from "next/link";
import {
  PhoneCall,
  ClipboardPlus,
  ChevronRight,
  Clock3,
} from "lucide-react";

export default function BookingHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#08263B] via-[#0D3552] to-[#08263B] text-white shadow-xl">

      {/* Glow */}

      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"></div>

      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl"></div>

      <div className="relative flex flex-col gap-8 p-6 md:p-10 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="max-w-3xl">

          <div className="mb-5 flex flex-wrap items-center text-sm text-gray-300">

            <Link
              href="/dispatcher/dashboard"
              className="transition hover:text-white"
            >
              Dashboard
            </Link>

            <ChevronRight className="mx-2" size={16} />

            <span className="text-orange-400">
              Manual Booking
            </span>

          </div>

          <h1 className="text-3xl font-bold md:text-5xl">
            Manual Booking
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-300 md:text-base">
            Create bookings for customers who contact your
            support center directly through phone calls.
            Capture customer information, service details,
            scheduling preferences and dispatch jobs quickly.
          </p>

        </div>

        {/* Right */}

        <div className="grid w-full max-w-md grid-cols-2 gap-4">

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg">

            <PhoneCall className="mb-3 text-orange-400" />

            <h3 className="text-3xl font-bold">
              24/7
            </h3>

            <p className="mt-1 text-sm text-gray-300">
              Phone Support
            </p>

          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg">

            <ClipboardPlus className="mb-3 text-orange-400" />

            <h3 className="text-3xl font-bold">
              Fast
            </h3>

            <p className="mt-1 text-sm text-gray-300">
              Booking Flow
            </p>

          </div>

          <div className="col-span-2 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg">

            <div className="flex items-center gap-3">

              <Clock3 className="text-orange-400" />

              <div>

                <p className="font-semibold">
                  Average Booking Time
                </p>

                <p className="text-sm text-gray-300">
                  Less than 2 minutes
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}