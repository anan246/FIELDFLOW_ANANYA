"use client";

import {
  User,
  Phone,
  Wrench,
  AlertTriangle,
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
} from "lucide-react";

export default function BookingSummary({ formData }) {
  const summaryItems = [
    {
      icon: User,
      label: "Customer",
      value: formData.customer || "Not provided",
    },
    {
      icon: Phone,
      label: "Phone",
      value: formData.phone || "Not provided",
    },
    {
      icon: Wrench,
      label: "Service",
      value: formData.service || "Not selected",
    },
    {
      icon: Calendar,
      label: "Date",
      value: formData.date || "Not selected",
    },
    {
      icon: Clock,
      label: "Time",
      value: formData.time || "Not selected",
    },
    {
      icon: MapPin,
      label: "City",
      value: formData.city || "Not provided",
    },
    {
      icon: IndianRupee,
      label: "Estimated Cost",
      value: formData.price
        ? `₹ ${formData.price}`
        : "Not specified",
    },
  ];

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md md:p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-[#08263B]">
            Booking Summary
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review all entered information before creating the booking.
          </p>

        </div>

        <div className="rounded-2xl bg-orange-100 p-4">
          <Wrench className="text-orange-500" size={28} />
        </div>

      </div>

      {/* Summary Grid */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {summaryItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">

                <div className="rounded-xl bg-orange-100 p-2">
                  <Icon
                    size={18}
                    className="text-orange-500"
                  />
                </div>

                <span className="text-sm font-semibold text-gray-600">
                  {item.label}
                </span>

              </div>

              <p className="break-words text-base font-semibold text-[#08263B]">
                {item.value}
              </p>

            </div>
          );
        })}

      </div>

      {/* Priority */}

      <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-orange-100 p-2">
              <AlertTriangle
                size={18}
                className="text-orange-500"
              />
            </div>

            <div>

              <p className="text-sm font-semibold text-gray-600">
                Priority
              </p>

              <p className="font-semibold text-[#08263B]">
                {formData.priority || "Not selected"}
              </p>

            </div>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              formData.priority === "Emergency"
                ? "bg-red-100 text-red-600"
                : formData.priority === "Normal"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {formData.priority || "Pending"}
          </span>

        </div>

      </div>

      {/* Address */}

      <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5">

        <div className="mb-3 flex items-center gap-3">

          <div className="rounded-xl bg-orange-100 p-2">
            <MapPin
              size={18}
              className="text-orange-500"
            />
          </div>

          <h3 className="font-semibold text-[#08263B]">
            Customer Address
          </h3>

        </div>

        <p className="leading-7 text-gray-600 break-words">
          {formData.address || "Address not provided"}
        </p>

      </div>

    </div>
  );
}