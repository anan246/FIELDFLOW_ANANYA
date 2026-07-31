"use client";

import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Clock3,
  FileText,
  TriangleAlert,
  CheckCircle2,
} from "lucide-react";

export default function BookingDetails({
  selectedCategory,
  selectedService,
}) {
  const [isEmergency, setIsEmergency] = useState(false);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* HEADER */}
      <div className="mb-6">

        <p className="text-xs font-semibold uppercase tracking-wide text-[#FF6B00]">
          Almost There
        </p>

        <h2 className="mt-1 text-xl font-bold text-[#14263D]">
          Booking Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Tell us where and when you need the service.
        </p>

      </div>

      {/* SELECTED SERVICE */}
      <div className="mb-6 rounded-xl border border-orange-100 bg-orange-50/60 p-4">

        <p className="text-xs font-medium text-slate-500">
          Selected Service
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">

          <div>
            <p className="font-bold text-[#14263D]">
              {selectedService.name}
            </p>

            <p className="text-xs text-slate-500">
              {selectedCategory.name}
            </p>
          </div>

          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#FF6B00]">
            {selectedService.pricingType === "Fixed"
              ? `₹${selectedService.price}`
              : "Quote after Inspection"}
          </span>

        </div>

      </div>

      {/* FORM */}
      <div className="grid gap-5 md:grid-cols-2">

        {/* ADDRESS */}
        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-semibold text-[#14263D]">
            Service Address
          </label>

          <div className="relative">

            <MapPin
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              rows="3"
              placeholder="Enter the complete address where the service is required"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:bg-white"
            />

          </div>

        </div>

        {/* DATE */}
        <div>

          <label className="mb-2 block text-sm font-semibold text-[#14263D]">
            Preferred Date
          </label>

          <div className="relative">

            <CalendarDays
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#FF6B00] focus:bg-white"
            />

          </div>

        </div>

        {/* TIME */}
        <div>

          <label className="mb-2 block text-sm font-semibold text-[#14263D]">
            Preferred Time
          </label>

          <div className="relative">

            <Clock3
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="time"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#FF6B00] focus:bg-white"
            />

          </div>

        </div>

        {/* ISSUE */}
        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-semibold text-[#14263D]">
            Describe Your Issue
          </label>

          <div className="relative">

            <FileText
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              rows="4"
              placeholder="Describe the problem or service you need..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:bg-white"
            />

          </div>

        </div>

      </div>

      {/* EMERGENCY */}
      <div className="mt-6 rounded-xl border border-slate-200 p-4">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <TriangleAlert size={20} />
          </div>

          <div className="flex-1">

            <h3 className="text-sm font-bold text-[#14263D]">
              Emergency Service
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Mark this if the service is urgent and requires priority
              assistance.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setIsEmergency(!isEmergency)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              isEmergency
                ? "bg-[#FF6B00]"
                : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                isEmergency
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>

        </div>

      </div>

      {/* BOOK BUTTON */}
      <div className="mt-7 flex justify-end">

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14263D] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0F1C2E] sm:w-auto"
        >
          <CheckCircle2 size={18} />
          Confirm Booking
        </button>

      </div>

    </section>
  );
}