"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dispatcher/DashboardLayout";
import { API_BASE_URL } from "@/lib/apiConfig";
import {
  MapPin,
  Search,
  UserCog,
  Clock3,
  CheckCircle2,
  Truck,
  ClipboardList,
  Eye,
} from "lucide-react";

const DEFAULT_TRACKING_JOBS = [
  {
    booking_id: "BK1042",
    customer_name: "Rahul Sharma",
    service_name: "Electrical Repair",
    technician_name: "Nanda",
    technician_id: 1,
    address: "MG Road, Bengaluru",
    booking_time: "Today 10:30 AM",
    booking_status: "Assigned",
    status: "Assigned",
  },
  {
    booking_id: "BK1040",
    customer_name: "Suresh Nair",
    service_name: "Plumbing Repair",
    technician_name: "Ravi Kumar",
    technician_id: 2,
    address: "Whitefield, Bengaluru",
    booking_time: "Today 11:00 AM",
    booking_status: "On the Way",
    status: "On the Way",
  },
];

export default function JobTrackingPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 3000);
    window.addEventListener("focus", loadJobs);
    window.addEventListener("storage", loadJobs);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", loadJobs);
      window.removeEventListener("storage", loadJobs);
    };
  }, []);

  const loadJobs = async () => {
    try {
      let list = [];

      try {
        const response = await fetch(`${API_BASE_URL}/dispatcher/job-tracking?_=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) list = data;
        }
      } catch (_) {}

      if (list.length === 0) {
        try {
          const res2 = await fetch(`${API_BASE_URL}/dispatcher/assigned-jobs`);
          if (res2.ok) {
            const data2 = await res2.json();
            if (Array.isArray(data2) && data2.length > 0) {
              list = data2.map((j) => ({
                booking_id: j.booking_id || j.id,
                customer_name: j.customer_name || "Customer",
                service_name: j.service_name || "Home Repair",
                technician_name: j.technician_name || "Assigned Technician",
                technician_id: j.technician_id || 1,
                address: j.address || "Bengaluru",
                booking_time: j.booking_time || "Today 10:00 AM",
                booking_status: j.assignment_status || j.status || "Assigned",
                status: j.assignment_status || j.status || "Assigned",
              }));
            }
          }
        } catch (_) {}
      }

      // Merge local storage assigned jobs
      try {
        const localAssigned = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        localAssigned.forEach((aj) => {
          const existingIdx = list.findIndex((j) => String(j.booking_id) === String(aj.bookingId));
          if (existingIdx === -1) {
            list.unshift({
              booking_id: aj.bookingId,
              customer_name: aj.customerName || "Customer",
              service_name: aj.serviceName || "Service Request",
              technician_name: aj.techName || "Technician",
              technician_id: aj.technicianId || 1,
              address: aj.address || "Bengaluru",
              booking_time: "Today 10:00 AM",
              booking_status: aj.status || "Assigned",
              status: aj.status || "Assigned",
            });
          } else {
            list[existingIdx].technician_name = aj.techName || list[existingIdx].technician_name;
            list[existingIdx].booking_status = aj.status || list[existingIdx].booking_status;
          }
        });
      } catch (_) {}

      if (list.length === 0) {
        list = DEFAULT_TRACKING_JOBS;
      }

      setJobs(list);
      setError("");
    } catch (err) {
      console.error(err);
      setJobs(DEFAULT_TRACKING_JOBS);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await fetch(`${API_BASE_URL}/dispatcher/job-status/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }).catch(() => {});

      setJobs((prev) =>
        prev.map((j) =>
          String(j.booking_id) === String(bookingId)
            ? { ...j, booking_status: status, status }
            : j
        )
      );

      // Update local storage status
      try {
        const storedAssignments = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        const updated = storedAssignments.map((aj) =>
          String(aj.bookingId) === String(bookingId) ? { ...aj, status } : aj
        );
        localStorage.setItem("assigned_jobs", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      } catch (_) {}
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    (
      (job.customer_name || "") +
      (job.service_name || "") +
      (job.technician_name || "") +
      (job.booking_status || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const assigned = jobs.filter((j) => (j.booking_status || "Assigned") === "Assigned").length;
  const travelling = jobs.filter((j) => j.booking_status === "On the Way").length;
  const started = jobs.filter((j) => j.booking_status === "Started").length;
  const completed = jobs.filter((j) => j.booking_status === "Completed").length;
  const assignedTechnicians = new Set(jobs.map((j) => j.technician_name).filter(Boolean)).size;

  const badgeColor = (status) => {
    switch (status) {
      case "Assigned":
        return "bg-orange-100 text-orange-600 font-bold";
      case "On the Way":
        return "bg-blue-100 text-blue-600 font-bold";
      case "Started":
        return "bg-purple-100 text-purple-600 font-bold";
      case "Completed":
        return "bg-green-100 text-green-600 font-bold";
      default:
        return "bg-gray-100 text-gray-600 font-bold";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-r from-[#08263B] via-[#10364F] to-[#08263B] p-8 text-white shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold">Job Tracking</h1>
              <p className="mt-3 max-w-2xl leading-7 text-gray-300">
                Track every assigned job, assigned technician, customer location, and progress in real time.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-8 py-6 backdrop-blur">
              <p className="text-gray-300">Total Tracked Jobs</p>
              <h2 className="mt-2 text-5xl font-bold text-orange-400">{jobs.length}</h2>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-md">Loading Job Tracking...</div>
        ) : (
          <>
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Statistics */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Active Technicians</p>
                    <h2 className="mt-2 text-3xl font-bold text-[#08263B]">{assignedTechnicians}</h2>
                  </div>
                  <div className="rounded-2xl bg-blue-100 p-4">
                    <UserCog className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Assigned</p>
                    <h2 className="mt-2 text-3xl font-bold text-[#08263B]">{assigned}</h2>
                  </div>
                  <div className="rounded-2xl bg-orange-100 p-4">
                    <ClipboardList className="text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">On the Way</p>
                    <h2 className="mt-2 text-3xl font-bold text-[#08263B]">{travelling}</h2>
                  </div>
                  <div className="rounded-2xl bg-blue-100 p-4">
                    <Truck className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Started</p>
                    <h2 className="mt-2 text-3xl font-bold text-[#08263B]">{started}</h2>
                  </div>
                  <div className="rounded-2xl bg-purple-100 p-4">
                    <Clock3 className="text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Completed</p>
                    <h2 className="mt-2 text-3xl font-bold text-[#08263B]">{completed}</h2>
                  </div>
                  <div className="rounded-2xl bg-green-100 p-4">
                    <CheckCircle2 className="text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="rounded-3xl bg-white p-6 shadow-md">
              <div className="relative max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search booking, customer or technician..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#08263B]"
                />
              </div>
            </div>

            {/* Job List */}
            <div className="grid gap-6">
              {filteredJobs.length === 0 ? (
                <div className="rounded-3xl bg-white p-10 text-center shadow-md">
                  <h2 className="text-2xl font-bold text-gray-700">No Jobs Found</h2>
                  <p className="mt-2 text-gray-500">Try searching with another keyword.</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.booking_id}
                    className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl border border-slate-100"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-[#08263B]">{job.customer_name}</h2>
                          <p className="text-gray-500 text-xs mt-0.5">
                            Booking ID: <span className="font-semibold text-slate-800">#{job.booking_id}</span>
                          </p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <ClipboardList size={18} className="text-orange-500" />
                            <span>{job.service_name}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <UserCog size={18} className="text-blue-600" />
                            <span>Technician: <strong className="text-slate-900">{job.technician_name}</strong></span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-red-500" />
                            <span>{job.address}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock3 size={18} className="text-purple-500" />
                            <span>{job.booking_time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-4">
                        <span className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeColor(job.booking_status)}`}>
                          {job.booking_status}
                        </span>

                        <select
                          value={job.booking_status}
                          onChange={(e) => updateStatus(job.booking_id, e.target.value)}
                          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold cursor-pointer outline-none focus:border-orange-500"
                        >
                          <option value="Assigned">Assigned</option>
                          <option value="On the Way">On the Way</option>
                          <option value="Started">Started</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowModal(true);
                          }}
                          className="flex items-center gap-2 rounded-xl bg-[#08263B] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#10364F] cursor-pointer"
                        >
                          <Eye size={18} />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* View Details Modal */}
            {showModal && selectedJob && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-[#08263B]">Job Details</h2>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="rounded-xl bg-slate-100 px-4 py-2 text-slate-700 font-bold hover:bg-slate-200"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Booking ID</p>
                      <h3 className="font-bold text-slate-900 mt-0.5">#{selectedJob.booking_id}</h3>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Customer</p>
                      <h3 className="font-bold text-slate-900 mt-0.5">{selectedJob.customer_name}</h3>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Technician</p>
                      <h3 className="font-bold text-slate-900 mt-0.5">{selectedJob.technician_name}</h3>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Service</p>
                      <h3 className="font-bold text-slate-900 mt-0.5">{selectedJob.service_name}</h3>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Status</p>
                      <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold ${badgeColor(selectedJob.booking_status)}`}>
                        {selectedJob.booking_status}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Booking Time</p>
                      <h3 className="font-bold text-slate-900 mt-0.5">{selectedJob.booking_time}</h3>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Address</p>
                      <h3 className="font-bold text-slate-900 mt-0.5">{selectedJob.address}</h3>
                    </div>
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
