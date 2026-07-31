"use client";

import {
  Wrench,
  Calendar,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
} from "lucide-react";

export default function ServiceDetailsCard({
  formData,
  handleChange,
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md md:p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-[#08263B]">
            Service Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select the requested service and schedule.
          </p>

        </div>

        <div className="rounded-2xl bg-orange-100 p-4">
          <Wrench className="text-orange-500" size={28} />
        </div>

      </div>

      <div className="space-y-6">

        {/* Service */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Service Category
          </label>

          <div className="relative">

            <Wrench
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
            >
              <option value="">Select Service</option>
              <option>Electrical Repair</option>
              <option>Plumbing</option>
              <option>AC Service</option>
              <option>Cleaning</option>
              <option>Painting</option>
              <option>Carpentry</option>
              <option>Appliance Repair</option>
            </select>

          </div>

        </div>

        {/* Priority */}

        <div>

          <label className="mb-3 block text-sm font-semibold text-gray-700">
            Priority
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <label
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                formData.priority === "Normal"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="priority"
                value="Normal"
                checked={formData.priority === "Normal"}
                onChange={handleChange}
                className="hidden"
              />

              <div className="flex items-center gap-3">

                <div className="rounded-full bg-green-100 p-2">
                  <AlertTriangle
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <div>

                  <p className="font-semibold">
                    Normal
                  </p>

                  <p className="text-sm text-gray-500">
                    Standard Booking
                  </p>

                </div>

              </div>

            </label>

            <label
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                formData.priority === "Emergency"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="priority"
                value="Emergency"
                checked={formData.priority === "Emergency"}
                onChange={handleChange}
                className="hidden"
              />

              <div className="flex items-center gap-3">

                <div className="rounded-full bg-red-100 p-2">
                  <AlertTriangle
                    size={18}
                    className="text-red-600"
                  />
                </div>

                <div>

                  <p className="font-semibold text-red-600">
                    Emergency
                  </p>

                  <p className="text-sm text-gray-500">
                    Immediate Response
                  </p>

                </div>

              </div>

            </label>

          </div>

        </div>

        {/* Date & Time */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Preferred Date
            </label>

            <div className="relative">

              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Preferred Time
            </label>

            <div className="relative">

              <Clock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
              />

            </div>

          </div>

        </div>

        {/* Estimated Cost */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Estimated Cost (Optional)
          </label>

          <div className="relative">

            <DollarSign
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="500"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Problem Description
          </label>

          <div className="relative">

            <FileText
              size={18}
              className="absolute left-4 top-5 text-gray-400"
            />

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the customer's issue..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
            />

          </div>

        </div>

      </div>

    </div>
  );
}