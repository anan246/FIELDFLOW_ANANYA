"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Clock, User } from "lucide-react";

export default function JobDetailsPage() {
  const { id } = useParams();
  const statuses = [
    "Assigned",
    "Accepted",
    "On the Way",
    "In Progress",
    "Completed",
  ];

  const [status, setStatus] = useState("Assigned");
  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <Link
        href="/technician/jobs"
        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Job #{id}</h1>

      <div className="space-y-6">

        {/* Customer Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Customer Information</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <User size={16} className="text-orange-400" />
              Rahul Sharma
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-orange-400" />
              +91 9876543210
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-orange-400" />
              MG Road, Bengaluru
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-orange-400" />
              Today • 10:30 AM
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Service Details</h2>
          <h3 className="text-xl font-bold text-orange-500">Electrical Repair</h3>
          <p className="text-sm text-gray-400 mt-1">Booking ID #{id}</p>
        </div>

        {/* Customer Notes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Customer Notes</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Power socket in the living room is not working.
            Please bring replacement switches if needed.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Update Status</h2>
          <div className="flex flex-wrap gap-3">
            {statuses.map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item)}
                className={`px-4 py-2 rounded-lg transition ${
                  status === item
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="mt-4 text-gray-600">
            Current Status:
            <span className="font-semibold text-orange-500 ml-2">
              {status}
            </span>
          </p>
        </div>

        {/* Work Notes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-3">Work Notes</h2>
          <textarea
            rows={4}
            placeholder="Add notes about the job..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition resize-none"
          />
          <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition">
            Save Notes
          </button>
        </div>

      </div>
    </div>
  );
}
