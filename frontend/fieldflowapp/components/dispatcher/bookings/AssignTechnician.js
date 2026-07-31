"use client";

import { useEffect, useState } from "react";
import {
  X,
  User,
  Star,
  MapPin,
  CheckCircle,
} from "lucide-react";

import { API_BASE_URL } from "@/lib/apiConfig";

const DEFAULT_REGISTERED_TECHS = [
  {
    id: 1,
    name: "Nanda",
    email: "nanda@fieldflow.in",
    phone: "9876543210",
    category: "Electrician",
    experience: 5,
    working_area: "Bengaluru",
    available_today: true,
    status: "Available",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Ravi Kumar",
    email: "ravi@fieldflow.in",
    phone: "9123456780",
    category: "Plumber",
    experience: 4,
    working_area: "Bengaluru",
    available_today: true,
    status: "Available",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Suresh Nair",
    email: "suresh@fieldflow.in",
    phone: "9988776655",
    category: "AC Technician",
    experience: 6,
    working_area: "Bengaluru",
    available_today: true,
    status: "Available",
    rating: 4.7,
  },
];

export default function AssignTechnicianModal({
  isOpen,
  onClose,
  booking,
  onAssign,
}) {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchTechnicians();
    }
  }, [isOpen]);

  const fetchTechnicians = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/dispatcher/technicians?_=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Unable to load technicians.");
      const data = await res.json();
      setTechnicians(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchTechnicians error:", err);
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !booking) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#0B2C45]">
              Assign Technician
            </h2>

            <p className="mt-1 text-gray-500">
              Booking : {booking.id}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={24}/>
          </button>

        </div>

        {/* Customer */}

        <div className="px-8 pt-6">

          <div className="rounded-2xl border bg-gray-50 p-5">

            <h3 className="mb-3 font-bold text-[#0B2C45]">
              Customer Information
            </h3>

            <div className="space-y-2">

              <p>
                <strong>Name :</strong> {booking.customer}
              </p>

              <p>
                <strong>Service :</strong> {booking.service}
              </p>

              <p>
                <strong>Location :</strong> {booking.location}
              </p>

            </div>

          </div>

        </div>

        {/* Technician List */}

        <div className="max-h-[450px] space-y-4 overflow-y-auto p-8">

          {loading ? (

            <div className="text-center text-lg">
              Loading technicians...
            </div>

          ) : technicians.length === 0 ? (

            <div className="text-center text-gray-500">
              No technicians available.
            </div>

          ) : (

            technicians.map((tech) => (

              <div
                key={tech.id}
                className="flex items-center justify-between rounded-2xl border p-5 transition hover:border-orange-400"
              >

                <div className="space-y-2">

                  <div className="flex items-center gap-2">
                    <User className="text-orange-500"/>
                    <span className="font-bold text-gray-900">
                      {tech.name}
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                      {tech.category || tech.specialization || "Technician"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Star
                      size={15}
                      className="fill-yellow-500 text-yellow-500"
                    />
                    <span>{tech.rating || 4.8} rating · {tech.experience ? `${tech.experience} yrs exp` : "Experienced"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin size={15}/>
                    <span>{tech.working_area || tech.location || tech.city || "Bengaluru"}</span>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      tech.available_today !== false && tech.status !== "Busy"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tech.available_today !== false && tech.status !== "Busy" ? "Available" : "Busy"}
                  </span>

                </div>

                {tech.available_today !== false && tech.status !== "Busy" ? (
                  <button
                    onClick={() =>
                      onAssign(
                        booking.id,
                        tech.id,
                        tech.name
                      )
                    }
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >

                    <CheckCircle size={18}/>

                    Assign

                  </button>

                ) : (

                  <button
                    disabled
                    className="cursor-not-allowed rounded-xl bg-gray-200 px-5 py-3 text-gray-500"
                  >
                    Busy
                  </button>

                )}

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}
