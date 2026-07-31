"use client";

import { useState } from "react";
import {
  X,
  User,
  Phone,
  Wrench,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";

export default function ManualBookingModal({
  isOpen,
  onClose,
  onCreateBooking,
}) {
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    service: "",
    location: "",
    priority: "Normal",
    date: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateBooking(formData);

    setFormData({
      customer: "",
      phone: "",
      service: "",
      location: "",
      priority: "Normal",
      date: "",
      notes: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#0B2C45]">
              Manual Booking
            </h2>

            <p className="mt-1 text-gray-500">
              Create a booking for customers who call directly.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8"
        >

          {/* Customer */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <User size={18} />
              Customer Name
            </label>

            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 focus:outline-none"
              placeholder="Rahul Kumar"
            />

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <Phone size={18} />
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 focus:outline-none"
              placeholder="+91 9876543210"
            />

          </div>

          {/* Service */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <Wrench size={18} />
              Service
            </label>

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 focus:outline-none"
            >
              <option value="">Select Service</option>
              <option>Electrical Repair</option>
              <option>Plumbing</option>
              <option>AC Service</option>
              <option>Cleaning</option>
              <option>Painting</option>
            </select>

          </div>

          {/* Location */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <MapPin size={18} />
              Address
            </label>

            <textarea
              rows={3}
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 focus:outline-none"
              placeholder="Customer Address"
            />

          </div>

          {/* Priority */}

          <div>

            <label className="mb-3 font-medium text-gray-700 block">
              Priority
            </label>

            <div className="flex gap-6">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="Normal"
                  checked={formData.priority === "Normal"}
                  onChange={handleChange}
                />
                Normal
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="Emergency"
                  checked={formData.priority === "Emergency"}
                  onChange={handleChange}
                />
                Emergency
              </label>

            </div>

          </div>

          {/* Date */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <Calendar size={18} />
              Preferred Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 focus:outline-none"
            />

          </div>

          {/* Notes */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
              <FileText size={18} />
              Notes
            </label>

            <textarea
              rows={4}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 focus:border-orange-500 focus:outline-none"
              placeholder="Additional instructions..."
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Create Booking
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}