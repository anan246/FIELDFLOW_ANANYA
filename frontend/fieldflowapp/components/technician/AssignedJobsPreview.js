"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

const MOCK_PREVIEW_JOBS = [
  {
    id: "#1001",
    customer: "Rahul Sharma",
    service: "Electrical Repair",
    location: "MG Road, Bengaluru",
    time: "10:30 AM",
    status: "Assigned",
  },
  {
    id: "#1002",
    customer: "Priya Singh",
    service: "AC Service",
    location: "Indiranagar, Bengaluru",
    time: "2:00 PM",
    status: "Assigned",
  },
];

export default function AssignedJobsPreview() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreviewJobs();
    const interval = setInterval(fetchPreviewJobs, 3000);

    const handleJobChange = () => fetchPreviewJobs();
    window.addEventListener("storage", handleJobChange);
    window.addEventListener("focus", handleJobChange);
    window.addEventListener("fieldflow_job_assigned", handleJobChange);
    window.addEventListener("fieldflow_job_status_change", handleJobChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleJobChange);
      window.removeEventListener("focus", handleJobChange);
      window.removeEventListener("fieldflow_job_assigned", handleJobChange);
      window.removeEventListener("fieldflow_job_status_change", handleJobChange);
    };
  }, []);

  const fetchPreviewJobs = async () => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("user") || "{}");
      const techName = activeUser.name?.toLowerCase() || "";

      let list = [];
      try {
        const res = await fetch(`${API_BASE_URL}/dispatcher/assigned-jobs`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            list = data.map((j) => ({
              id: `#${j.booking_id || j.id}`,
              customer: j.customer_name || "Customer",
              service: j.service_name || "Home Repair",
              location: j.address || "Bengaluru",
              time: j.booking_time || "Today",
              status: j.assignment_status || j.status || "Assigned",
              techName: j.technician_name || "",
            }));
          }
        }
      } catch (_) {}

      // Merge local storage assigned jobs
      try {
        const localAssigned = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        localAssigned.forEach((aj) => {
          const formattedId = `#${aj.bookingId}`;
          const existingIdx = list.findIndex((j) => j.id === formattedId);
          if (existingIdx === -1) {
            list.unshift({
              id: formattedId,
              customer: aj.customerName || "Customer",
              service: aj.serviceName || "Service Request",
              location: aj.location || aj.address || "Bengaluru",
              time: "Today 10:00 AM",
              status: aj.status || "Assigned",
              techName: aj.techName || "",
            });
          } else {
            list[existingIdx].status = aj.status || list[existingIdx].status;
          }
        });
      } catch (_) {}

      if (techName && techName !== "technician") {
        const filteredByTech = list.filter((j) => !j.techName || j.techName.toLowerCase().includes(techName));
        if (filteredByTech.length > 0) list = filteredByTech;
      }

      if (list.length === 0) list = MOCK_PREVIEW_JOBS;

      setJobs(list.slice(0, 3));
    } catch (err) {
      console.error(err);
      setJobs(MOCK_PREVIEW_JOBS);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    Assigned: "bg-orange-100 text-orange-700 font-bold",
    "On the Way": "bg-blue-100 text-blue-700 font-bold",
    "In Progress": "bg-purple-100 text-purple-700 font-bold",
    Completed: "bg-green-100 text-green-700 font-bold",
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 mt-6 sm:mt-8 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Today's Assigned Jobs
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Real-time assignments from Dispatcher</p>
        </div>

        <Link
          href="/technician/jobs"
          className="text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-bold flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-3.5">
        {loading ? (
          <div className="py-6 text-center text-xs text-slate-500 font-medium">Loading live jobs...</div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-100 hover:border-slate-200 transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {job.id}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {job.service}
                  </h3>
                </div>

                <p className="text-slate-600 text-xs mt-1 font-medium">Customer: <strong className="text-slate-800">{job.customer}</strong></p>

                <div className="flex items-center gap-4 mt-2 text-slate-500 text-xs font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-orange-500" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-blue-500" />
                    {job.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    statusColors[job.status] || "bg-amber-100 text-amber-700"
                  }`}
                >
                  {job.status}
                </span>

                <Link
                  href={`/technician/jobs/${job.id.replace("#", "")}`}
                  className="bg-[#111F36] hover:bg-[#111F36]/90 px-3.5 py-1.5 rounded-xl text-white text-xs font-bold transition shadow-2xs"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}