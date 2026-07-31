"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dispatcher/DashboardLayout";

import {
  ClipboardList,
  UserCog,
  Clock3,
  CheckCircle2,
  MapPin,
  Star,
  Wrench,
} from "lucide-react";

import { API_BASE_URL } from "@/lib/apiConfig";

export default function DispatcherBoardPage() {

  const [pendingJobs, setPendingJobs] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);

  const [selectedTechnician, setSelectedTechnician] = useState("");

  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    window.addEventListener("focus", loadData);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", loadData);
    };
  }, []);

  const loadData = async () => {
    try {
      const [jobsRes, techRes] = await Promise.all([
        fetch(`${API_BASE_URL}/dispatcher/pending-bookings?_=${Date.now()}`, { cache: "no-store" }),
        fetch(`${API_BASE_URL}/dispatcher/technicians?_=${Date.now()}`, { cache: "no-store" }),
      ]);

      const jobsData = jobsRes.ok ? await jobsRes.json() : [];
      const techsData = techRes.ok ? await techRes.json() : [];

      const jobsList = Array.isArray(jobsData) ? jobsData : [];
      const techsList = Array.isArray(techsData) ? techsData : [];

      const formattedJobs = jobsList.map((job) => ({
        id: job.id,
        location: job.address,
        priority: job.priority || "Normal",
        waiting: "New",
      }));

      setPendingJobs(formattedJobs);
      setTechnicians(techsList);

    } catch (error) {

      console.error("Dispatcher Board Error:", error);

    } finally {

      setLoading(false);

    }

  };

  const availableCount = technicians.filter(
    (tech) => tech.status === "Available"
  ).length;

  const busyCount = technicians.filter(
    (tech) => tech.status === "Busy"
  ).length;

  const handleAssign = async () => {

    if (!selectedJob || !selectedTechnician) {
      alert("Please select a technician.");
      return;
    }

    try {

      const response = await fetch(
        `${API_BASE_URL}/dispatcher/assign-technician`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: selectedJob.id,
            technician_id: Number(selectedTechnician),
            assigned_by: "Dispatcher01",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert("Technician Assigned Successfully");

      setShowAssignModal(false);
      setSelectedTechnician("");
      setSelectedJob(null);

      loadData();

    } catch (error) {

      console.error(error);

      alert("Assignment Failed");

    }

  };

 return (
  <DashboardLayout>
    <div className="space-y-8">

      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-[#08263B] via-[#10364F] to-[#08263B] p-8 text-white shadow-xl">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Dispatcher Board
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-gray-300">
              Monitor pending service requests and assign the most suitable
              available technician in real time.
            </p>

          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur">

            <p className="text-gray-300">
              Pending Assignments
            </p>

            <h2 className="mt-2 text-5xl font-bold text-orange-400">
              {pendingJobs.length}
            </h2>

          </div>

        </div>

      </section>

      {loading ? (

        <div className="rounded-3xl bg-white p-10 text-center shadow-md">
          Loading Dispatcher Board...
        </div>

      ) : (

        <>

          {/* Stats */}

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-6 shadow-md">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Pending Jobs
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                    {pendingJobs.length}
                  </h2>

                </div>

                <div className="rounded-2xl bg-red-100 p-4">
                  <ClipboardList className="text-red-600" />
                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Available
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                    {availableCount}
                  </h2>

                </div>

                <div className="rounded-2xl bg-green-100 p-4">
                  <CheckCircle2 className="text-green-600" />
                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Busy
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
                    {busyCount}
                  </h2>

                </div>

                <div className="rounded-2xl bg-orange-100 p-4">
                  <UserCog className="text-orange-600" />
                </div>

              </div>

            </div>

          </div>

          {/* Board */}

          <div className="grid gap-8 xl:grid-cols-2">

            {/* Pending Jobs */}

            <div>

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-[#08263B]">
                  Pending Jobs
                </h2>

                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                  {pendingJobs.length} Waiting
                </span>

              </div>

              <div className="space-y-5">

                {pendingJobs.map((job) => (

                  <div
                    key={job.id}
                    className="rounded-3xl border-l-[6px] border-orange-500 bg-white p-6 shadow-md transition hover:shadow-xl"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="text-xl font-bold text-[#08263B]">
                          {job.service}
                        </h3>

                        <p className="mt-1 text-gray-600">
                          {job.customer}
                        </p>

                      </div>

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                        {job.priority}
                      </span>

                    </div>

                    <div className="mt-5 space-y-2 text-sm">

                      <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        {job.location}
                      </p>

                      <p className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {job.waiting}
                      </p>

                    </div>

                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowAssignModal(true);
                      }}
                      className="mt-6 w-full rounded-xl bg-[#08263B] py-3 font-semibold text-white hover:bg-[#10364F]"
                    >
                      Assign Technician
                    </button>

                  </div>

                ))}

              </div>

            </div>

            {/* Available Technicians */}

            <div>

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-[#08263B]">
                  Available Technicians
                </h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                  {availableCount} Available
                </span>

              </div>

              <div className="space-y-5">

                {technicians.map((tech) => (

                  <div
                    key={tech.id}
                    className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <h3 className="text-xl font-bold text-[#08263B]">
                          {tech.name}
                        </h3>

                        <div className="mt-2 flex items-center gap-2">

                          <Star
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />

                          <span className="font-medium">
                            {tech.rating}
                          </span>

                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                          {tech.experience} Years Experience
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                          {tech.specialization}
                        </p>

                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          tech.status === "Available"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {tech.status}
                      </span>

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <Wrench
                          size={16}
                          className="text-orange-500"
                        />

                        Jobs Completed

                      </div>

                      <span className="font-bold text-[#08263B]">
                        {tech.jobs_completed}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </>

      )}
      {/* Assign Technician Modal */}

{showAssignModal && selectedJob && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

    <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-5">

        <div>

          <h2 className="text-2xl font-bold text-[#08263B]">
            Assign Technician
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Booking #{selectedJob.id}
          </p>

        </div>

        <button
          onClick={() => {
            setShowAssignModal(false);
            setSelectedJob(null);
            setSelectedTechnician("");
          }}
          className="rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200"
        >
          ✕
        </button>

      </div>

      {/* Booking Details */}

      <div className="space-y-4 p-6">

        <div className="rounded-2xl bg-slate-50 p-5">

          <h3 className="text-xl font-bold text-[#08263B]">
            {selectedJob.service}
          </h3>

          <p className="mt-2 text-gray-600">
            {selectedJob.customer}
          </p>

          <p className="mt-2 text-gray-500">
            📍 {selectedJob.location}
          </p>

          <span className="mt-4 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
            {selectedJob.priority}
          </span>

        </div>

        {/* Technician Selection */}

        <div>

          <label className="mb-3 block font-semibold text-[#08263B]">
            Select Technician
          </label>

          <select
            value={selectedTechnician}
            onChange={(e) =>
              setSelectedTechnician(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#08263B]"
          >

            <option value="">
              Select Technician
            </option>

            {technicians
              .filter(
                (tech) => tech.status === "Available"
              )
              .map((tech) => (

                <option
                  key={tech.id}
                  value={tech.id}
                >
                  {tech.name} • ⭐ {tech.rating}
                </option>

              ))}

          </select>

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-4 border-t p-6">

        <button
          onClick={() => {
            setShowAssignModal(false);
            setSelectedJob(null);
            setSelectedTechnician("");
          }}
          className="rounded-xl border border-gray-300 px-5 py-3 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleAssign}
          className="rounded-xl bg-[#08263B] px-6 py-3 font-semibold text-white hover:bg-[#10364F]"
        >
          Confirm Assignment
        </button>

      </div>

    </div>

  </div>

)}

    </div>
  </DashboardLayout>
);
}
