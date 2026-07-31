"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dispatcher/DashboardLayout";
import {
  AlertTriangle,
  Search,
  Clock3,
  Phone,
  Eye,
  UserCog,
  Siren,
  CheckCircle2,
} from "lucide-react";

import { API_BASE_URL } from "@/lib/apiConfig";

export default function EmergencyQueuePage() {

  const [emergencies, setEmergencies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadEmergencyJobs();
  }, []);

  const loadEmergencyJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dispatcher/emergency-jobs`);
      if (!response.ok) {
        console.warn("Could not fetch emergency jobs from server, using fallback");
        setLoading(false);
        return;
      }

      const data = await response.json();
      const list = Array.isArray(data) ? data : [];

      const formatted = list.map((job) => ({
        id: job.id,
        customer: job.customer_name || "Customer",
        service: job.service_name || "Emergency Service",
        location: job.address || "Location N/A",
        phone: job.phone || "N/A",
        priority: job.priority || "High",
        status: job.emergency_status || job.status || "Pending",
        time: job.created_at ? new Date(job.created_at).toLocaleTimeString() : "Just now",
      }));

      setEmergencies(formatted);
    } catch (error) {
      console.error("Emergency queue load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = emergencies.filter((item) =>
    (
      item.customer +
      item.service +
      item.address
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const critical = filtered.filter(
    (job) => job.priority === "Critical"
  );

  const high = filtered.filter(
    (job) => job.priority === "High"
  );

  const waitingCount = emergencies.filter(
    (job) => job.technician === "Not Assigned"
  ).length;

  const assignedCount = emergencies.filter(
    (job) => job.technician !== "Not Assigned"
  ).length;

  return (<DashboardLayout>

  <div className="space-y-8">

    {/* Hero */}

    <section className="rounded-3xl bg-gradient-to-r from-[#08263B] via-[#0E3653] to-[#08263B] p-8 text-white shadow-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <AlertTriangle
              size={34}
              className="text-orange-400"
            />

            <h1 className="text-4xl font-bold">
              Emergency Queue
            </h1>

          </div>

          <p className="mt-4 max-w-2xl leading-7 text-gray-300">
            Prioritize and dispatch urgent service requests.
            Critical jobs are displayed first so technicians
            can be assigned immediately.
          </p>

        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">

          <p className="text-gray-300">
            Live Emergencies
          </p>

          <h2 className="mt-2 text-5xl font-bold text-orange-400">
            {emergencies.length}
          </h2>

        </div>

      </div>

    </section>

    {/* Loading */}

    {loading ? (

      <div className="rounded-3xl bg-white p-10 text-center shadow-md">

        Loading emergency jobs...

      </div>

    ) : (

      <>

        {/* Stats */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Critical
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                  {critical.length}
                </h2>

              </div>

              <div className="rounded-2xl bg-red-100 p-4">

                <Siren className="text-red-600" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Waiting
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                  {waitingCount}
                </h2>

              </div>

              <div className="rounded-2xl bg-yellow-100 p-4">

                <Clock3 className="text-yellow-600" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Assigned
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                  {assignedCount}
                </h2>

              </div>

              <div className="rounded-2xl bg-blue-100 p-4">

                <UserCog className="text-blue-600" />

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Total
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                  {emergencies.length}
                </h2>

              </div>

              <div className="rounded-2xl bg-green-100 p-4">

                <CheckCircle2 className="text-green-600" />

              </div>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="rounded-3xl bg-white p-6 shadow-md">

          <div className="relative max-w-md">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search emergency..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#08263B]"
            />

          </div>

        </div>
        {/* Critical Section */}

<div>

  <div className="mb-6 flex items-center gap-3">

    <div className="h-4 w-4 rounded-full bg-red-600"></div>

    <h2 className="text-2xl font-bold text-[#08263B]">
      Critical Emergencies
    </h2>

  </div>

  {critical.length === 0 ? (

    <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-md">
      No critical emergencies.
    </div>

  ) : (

    <div className="grid gap-6 lg:grid-cols-2">

      {critical.map((job) => (

        <div
          key={job.id}
          className="rounded-3xl border-l-[8px] border-red-600 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >

          <div className="flex items-start justify-between">

            <div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                🚨 Critical
              </span>

              <h3 className="mt-4 text-2xl font-bold text-[#08263B]">
                {job.customer}
              </h3>

              <p className="mt-1 text-gray-500">
                {job.service}
              </p>

            </div>

            <div className="rounded-xl bg-red-50 px-4 py-3 text-center">

              <p className="text-xs text-gray-500">
                Waiting
              </p>

              <h3 className="font-bold text-red-600">
                {job.waiting}
              </h3>

            </div>

          </div>

          <div className="mt-6 space-y-3 text-sm">

            <p>
              📞{" "}
              <span className="font-medium">
                {job.phone}
              </span>
            </p>

            <p>
              📍{" "}
              <span className="font-medium">
                {job.address}
              </span>
            </p>

            <p>
              👨‍🔧{" "}
              <span
                className={`font-medium ${
                  job.technician === "Not Assigned"
                    ? "text-red-600"
                    : "text-[#08263B]"
                }`}
              >
                {job.technician}
              </span>
            </p>

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            <button
              onClick={() => {
                setSelectedBooking(job);
                setShowModal(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-[#08263B] px-5 py-3 text-white transition hover:bg-[#10364F]"
            >
              <Eye size={18} />
              View
            </button>

            <a
              href={`tel:${job.phone}`}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
            >
              <Phone size={18} />
              Call
            </a>

            <button
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-600"
            >
              <UserCog size={18} />
              Assign
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
{/* High Priority Section */}

<div>

  <div className="mb-6 mt-10 flex items-center gap-3">

    <div className="h-4 w-4 rounded-full bg-orange-500"></div>

    <h2 className="text-2xl font-bold text-[#08263B]">
      High Priority
    </h2>

  </div>

  {high.length === 0 ? (

    <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-md">
      No high priority emergencies.
    </div>

  ) : (

    <div className="grid gap-6 lg:grid-cols-2">

      {high.map((job) => (

        <div
          key={job.id}
          className="rounded-3xl border-l-[8px] border-orange-500 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >

          <div className="flex items-start justify-between">

            <div>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                ⚡ High Priority
              </span>

              <h3 className="mt-4 text-2xl font-bold text-[#08263B]">
                {job.customer}
              </h3>

              <p className="mt-1 text-gray-500">
                {job.service}
              </p>

            </div>

            <div className="rounded-xl bg-orange-50 px-4 py-3 text-center">

              <p className="text-xs text-gray-500">
                Waiting
              </p>

              <h3 className="font-bold text-orange-600">
                {job.waiting}
              </h3>

            </div>

          </div>

          <div className="mt-6 space-y-3 text-sm">

            <p>
              📞{" "}
              <span className="font-medium">
                {job.phone}
              </span>
            </p>

            <p>
              📍{" "}
              <span className="font-medium">
                {job.address}
              </span>
            </p>

            <p>
              👨‍🔧{" "}
              <span
                className={`font-medium ${
                  job.technician === "Not Assigned"
                    ? "text-red-600"
                    : "text-[#08263B]"
                }`}
              >
                {job.technician}
              </span>
            </p>

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            <button
              onClick={() => {
                setSelectedBooking(job);
                setShowModal(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-[#08263B] px-5 py-3 text-white transition hover:bg-[#10364F]"
            >
              <Eye size={18} />
              View
            </button>

          

            <button
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-600"
            >
              <UserCog size={18} />
              Reassign
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
{/* View Details Modal */}

{showModal && selectedBooking && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

    <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-8 py-6">

        <div>

          <h2 className="text-3xl font-bold text-[#08263B]">
            Emergency Details
          </h2>

          <p className="text-gray-500">
            Booking #{selectedBooking.id}
          </p>

        </div>

        <button
          onClick={() => {
            setShowModal(false);
            setSelectedBooking(null);
          }}
          className="rounded-xl bg-gray-100 px-4 py-2 transition hover:bg-gray-200"
        >
          ✕
        </button>

      </div>

      {/* Body */}

      <div className="grid gap-6 p-8 md:grid-cols-2">

        <div>

          <p className="text-sm text-gray-500">
            Customer
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            {selectedBooking.customer}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Phone
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            {selectedBooking.phone}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Service
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            {selectedBooking.service}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Waiting Time
          </p>

          <h3 className="mt-1 text-xl font-semibold text-red-600">
            {selectedBooking.waiting}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Technician
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            {selectedBooking.technician}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Priority
          </p>

          <span
            className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-semibold ${
              selectedBooking.priority === "Critical"
                ? "bg-red-100 text-red-600"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {selectedBooking.priority}
          </span>

        </div>

        <div className="md:col-span-2">

          <p className="text-sm text-gray-500">
            Address
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            {selectedBooking.address}
          </h3>

        </div>

      </div>

      {/* Footer */}

      <div className="flex flex-wrap justify-end gap-4 border-t p-6">

        <button
          onClick={() => {
            setShowModal(false);
            setSelectedBooking(null);
          }}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
        >
          Close
        </button>

      

        <button
          className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          Assign Technician
        </button>

      </div>

    </div>

  </div>

)}

      </>

    )}

  </div>

</DashboardLayout>

  );
}