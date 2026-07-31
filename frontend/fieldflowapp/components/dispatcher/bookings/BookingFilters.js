"use client";

import { Search, RotateCcw } from "lucide-react";

export default function BookingFilters() {
  return (
    <section className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0B2C45]">
            Search & Filters
          </h2>
          <p className="text-gray-500 mt-1">
            Quickly find and manage service bookings.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 transition">
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5">

        {/* Search */}
        <div className="xl:col-span-2 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search booking..."
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        {/* Date */}
        <input
          type="date"
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />

        {/* Status */}
        <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200">
          <option>All Status</option>
          <option>Pending</option>
          <option>Assigned</option>
          <option>On the Way</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        {/* Service */}
        <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200">
          <option>All Services</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>AC Repair</option>
          <option>Cleaning</option>
          <option>Carpentry</option>
        </select>

        {/* Priority */}
        <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200">
          <option>Priority</option>
          <option>Normal</option>
          <option>Emergency</option>
        </select>

      </div>
    </section>
  );
}