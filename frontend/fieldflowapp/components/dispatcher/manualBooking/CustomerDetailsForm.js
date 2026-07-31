"use client";

import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  MapPinned,
} from "lucide-react";

export default function CustomerDetailsCard({
  formData,
  handleChange,
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md md:p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-[#08263B]">
            Customer Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter customer information for the booking.
          </p>

        </div>

        <div className="rounded-2xl bg-orange-100 p-4">
          <User className="text-orange-500" size={28} />
        </div>

      </div>

      {/* Form */}

      <div className="space-y-6">

        {/* Customer Name */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Customer Name
          </label>

          <div className="relative">

            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Phone Number
          </label>

          <div className="relative">

            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address
          </label>

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="customer@email.com"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
            />

          </div>

        </div>

        {/* Address */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Address
          </label>

          <div className="relative">

            <MapPin
              size={18}
              className="absolute left-4 top-5 text-gray-400"
            />

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
            />

          </div>

        </div>

        {/* City + PIN */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              City
            </label>

            <div className="relative">

              <Building2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Bengaluru"
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              PIN Code
            </label>

            <div className="relative">

              <MapPinned
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="560001"
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 transition focus:border-orange-500 focus:outline-none"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}