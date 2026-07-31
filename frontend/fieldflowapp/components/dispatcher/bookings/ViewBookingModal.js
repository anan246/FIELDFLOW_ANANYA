"use client";

import {
  X,
  User,
  Phone,
  MapPin,
  Wrench,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";

export default function ViewBookingModal({
  isOpen,
  onClose,
  booking,
}) {
  if (!isOpen || !booking) return null;

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Assigned: "bg-blue-100 text-blue-700",
    "In Progress": "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#0B2C45]">
              Booking Details
            </h2>

            <p className="text-gray-500 mt-1">
              Booking ID : {booking.id}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition"
          >
            <X size={24} />
          </button>

        </div>

        {/* Body */}

        <div className="grid gap-8 p-8 md:grid-cols-2">

          {/* Customer */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-lg font-bold text-[#0B2C45]">
              Customer Information
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <User className="text-orange-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Customer
                  </p>

                  <p className="font-semibold">
                    {booking.customer}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Phone className="text-orange-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {booking.phone}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <MapPin className="text-orange-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="font-semibold">
                    {booking.location}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Booking */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-lg font-bold text-[#0B2C45]">
              Booking Information
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Wrench className="text-orange-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Service
                  </p>

                  <p className="font-semibold">
                    {booking.service}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <ClipboardList className="text-orange-500" />

                <div>

                  <p className="text-sm text-gray-500">
                    Technician
                  </p>

                  <p className="font-semibold">
                    {booking.technician}
                  </p>

                </div>

              </div>

              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Status
                </p>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    statusColor[booking.status]
                  }`}
                >
                  {booking.status}
                </span>

              </div>

              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Priority
                </p>

                {booking.priority === "Emergency" ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                    <AlertTriangle size={16} />
                    Emergency
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                    Normal
                  </span>
                )}

              </div>

            </div>

          </div>

          {/* Description */}

          <div className="md:col-span-2 rounded-2xl border p-6">

            <h3 className="mb-3 text-lg font-bold text-[#0B2C45]">
              Problem Description
            </h3>

            <p className="text-gray-600 leading-7">
              Customer reported an issue with the{" "}
              <strong>{booking.service}</strong>. Technician
              should inspect the issue and update the job
              status after reaching the location.
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t px-8 py-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100 transition"
          >
            Close
          </button>

          <button
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition"
          >
            Assign Technician
          </button>

        </div>

      </div>

    </div>
  );
}