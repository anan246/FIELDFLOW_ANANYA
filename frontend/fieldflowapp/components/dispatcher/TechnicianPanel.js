"use client";

import { useEffect, useState } from "react";
import {
  User,
  Phone,
  Wrench,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function TechnicianPanel() {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dispatcher/technicians")
      .then((res) => res.json())
      .then((data) => setTechnicians(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-200">

      {/* Header */}

      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-[#08263B]">
          Technicians
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Available field technicians
        </p>
      </div>

      {/* List */}

      <div className="max-h-[650px] overflow-y-auto">

        {technicians.map((tech) => (

          <div
            key={tech.id}
            className="p-5 border-b hover:bg-slate-50 transition"
          >

            {/* Avatar */}

            <div className="flex items-start gap-4">

              <div className="h-14 w-14 rounded-full bg-[#08263B] text-white flex items-center justify-center">
                <User size={24} />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-[#08263B]">
                  {tech.name}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">

                  <Wrench size={14} />

                  {tech.specialization}

                </div>

                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">

                  <Phone size={14} />

                  {tech.phone}

                </div>

              </div>

            </div>

            {/* Status */}

            <div className="mt-4 flex justify-between items-center">

              {tech.status === "Available" ? (
                <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <CheckCircle size={16} />
                  Available
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-600 text-sm font-medium">
                  <XCircle size={16} />
                  Busy
                </span>
              )}

              <button
                disabled={tech.status !== "Available"}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  tech.status === "Available"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Assign
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}