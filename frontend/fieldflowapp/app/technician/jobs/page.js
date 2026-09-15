"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Wrench, CheckCircle, RefreshCw, User, Phone, Search, X } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";
import { getGlobalSearchQuery, subscribeRealtimeEvents, updateJobStatus as updateStoreJobStatus } from "@/lib/realtimeStore";

const MOCK_ASSIGNED_JOBS = [
  {
    id: "1001",
    customer: "Rahul Sharma",
    service: "Electrical Repair",
    location: "MG Road, Bengaluru",
    time: "Today 10:30 AM",
    status: "Assigned",
    phone: "9876543210",
  },
  {
    id: "1002",
    customer: "Priya Singh",
    service: "AC Servicing",
    location: "Indiranagar, Bengaluru",
    time: "Today 02:00 PM",
    status: "Assigned",
    phone: "9123456789",
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAssignedJobs();
    setSearch(getGlobalSearchQuery("technician"));

    const interval = setInterval(fetchAssignedJobs, 3000);
    const unsubscribe = subscribeRealtimeEvents((type, payload) => {
      fetchAssignedJobs();
      if (type === "fieldflow_search_update" && (payload.role === "technician" || payload.role === "global")) {
        setSearch(payload.query || "");
      }
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const fetchAssignedJobs = async () => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("user") || "{}");
      const techName = activeUser.role === "technician" ? activeUser.name?.toLowerCase() || "" : "";

      let list = [];
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/technician/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            list = data.map((j) => ({
              id: String(j.bookingId || j.id),
              customer: j.customerName || j.customer_name || "Customer",
              service: j.serviceName || j.service_name || "Home Repair",
              location: j.address || "Bengaluru",
              time: j.bookingTime || j.booking_time || "Today",
              status: j.status || "Assigned",
              phone: j.customerPhone || j.phone || "9876543210",
              techName: j.technician_name || "",
            }));
          }
        }
      } catch (_) {}

      if (list.length === 0) {
        try {
          const res2 = await fetch(`${API_BASE_URL}/dispatcher/assigned-jobs`);
          if (res2.ok) {
            const data2 = await res2.json();
            if (Array.isArray(data2) && data2.length > 0) {
              list = data2.map((j) => ({
                id: String(j.booking_id || j.id),
                customer: j.customer_name || "Customer",
                service: j.service_name || "Home Repair",
                location: j.address || "Bengaluru",
                time: j.booking_time || "Today 10:00 AM",
                status: j.assignment_status || j.status || "Assigned",
                phone: j.customer_phone || j.phone || "9876543210",
                techName: j.technician_name || "",
              }));
            }
          }
        } catch (_) {}
      }

      // Merge local storage assigned jobs from Dispatcher
      try {
        const localAssigned = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        localAssigned.forEach((aj) => {
          const existingIdx = list.findIndex((j) => String(j.id) === String(aj.bookingId));
          if (existingIdx === -1) {
            list.unshift({
              id: String(aj.bookingId),
              customer: aj.customerName || aj.customer || "Customer",
              service: aj.serviceName || aj.service || "Service Request",
              location: aj.location || aj.address || "Bengaluru",
              time: "Today 10:00 AM",
              status: aj.status || "Assigned",
              phone: aj.phone || "9876543210",
              techName: aj.techName || "",
            });
          } else {
            list[existingIdx].status = aj.status || list[existingIdx].status;
            if (aj.techName) list[existingIdx].techName = aj.techName;
          }
        });
      } catch (_) {}

      // Merge recent customer bookings stream directly into Technician list
      try {
        const currentBooking = JSON.parse(localStorage.getItem("fieldflow_current_booking") || "null");
        if (currentBooking && currentBooking.id) {
          const existingIdx = list.findIndex((j) => String(j.id) === String(currentBooking.id));
          if (existingIdx === -1) {
            list.unshift({
              id: String(currentBooking.id),
              customer: currentBooking.customerName || currentBooking.customer_name || "Customer",
              service: currentBooking.service || currentBooking.service_name || "Home Repair",
              location: currentBooking.address || "Bengaluru",
              time: `${currentBooking.date || "Today"} ${currentBooking.time || "10:30 AM"}`,
              status: currentBooking.status || "Pending",
              phone: currentBooking.phone || "9876543210",
              techName: currentBooking.technician || "",
            });
          }
        }

        const localCustomerBookings = JSON.parse(localStorage.getItem("customer_bookings") || "[]");
        localCustomerBookings.forEach((cb) => {
          const bId = String(cb.id || cb.bookingId);
          const existingIdx = list.findIndex((j) => String(j.id) === bId);
          if (existingIdx === -1) {
            list.unshift({
              id: bId,
              customer: cb.customerName || cb.customer_name || "Customer",
              service: cb.service || cb.service_name || "Home Repair",
              location: cb.address || "Bengaluru",
              time: `${cb.date || "Today"} ${cb.time || "10:30 AM"}`,
              status: cb.status || "Pending",
              phone: cb.phone || "9876543210",
              techName: cb.technician || "",
            });
          }
        });
      } catch (_) {}

      // Filter by logged-in technician name if specific technician is logged in
      if (techName && techName !== "technician") {
        const filteredByTech = list.filter((j) => !j.techName || j.techName.toLowerCase().includes(techName));
        if (filteredByTech.length > 0) list = filteredByTech;
      }

      if (list.length === 0) list = MOCK_ASSIGNED_JOBS;

      // Deduplicate jobs by id
      const uniqueJobs = [];
      const seenIds = new Set();
      list.forEach((j) => {
        const jId = String(j.id);
        if (!seenIds.has(jId)) {
          seenIds.add(jId);
          uniqueJobs.push(j);
        }
      });

      setJobs(uniqueJobs);
    } catch (err) {
      console.error(err);
      setJobs(MOCK_ASSIGNED_JOBS);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (jobId, newStatus) => {
    updateStoreJobStatus(jobId, newStatus);
    setJobs((prev) =>
      prev.map((j) => (String(j.id) === String(jobId) ? { ...j, status: newStatus } : j))
    );

    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE_URL}/technician/jobs/${jobId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (_) {}
  };

  const filteredJobs = jobs.filter((job) => {
    const q = search.toLowerCase();
    return (
      (job.customer || "").toLowerCase().includes(q) ||
      (job.service || "").toLowerCase().includes(q) ||
      (job.location || "").toLowerCase().includes(q) ||
      (job.phone || "").includes(q) ||
      (job.status || "").toLowerCase().includes(q) ||
      String(job.id).includes(q)
    );
  });

  const statusColors = {
    Assigned: "bg-orange-100 text-orange-700 border-orange-200",
    "On the Way": "bg-blue-100 text-blue-700 border-blue-200",
    "In Progress": "bg-purple-100 text-purple-700 border-purple-200",
    Completed: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Wrench className="text-orange-500" /> Technician Jobs & Customer Service Requests
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Live customer service bookings received from Customers and Dispatchers in real time
            </p>
          </div>
          <button
            type="button"
            onClick={fetchAssignedJobs}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 transition shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh Jobs
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-500 font-semibold shadow-2xs">
            Loading customer jobs...
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job, idx) => (
              <div
                key={`tech-job-${job.id || idx}-${idx}`}
                className="bg-white rounded-2xl shadow-xs border border-slate-100 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      #{job.id}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">{job.service}</h2>
                  </div>

                  <p className="text-slate-600 text-sm font-medium flex items-center gap-1.5">
                    <User size={15} className="text-slate-400" /> Customer: <strong className="text-slate-900">{job.customer}</strong>
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-500 font-medium pt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} className="text-orange-500 shrink-0" />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock size={15} className="text-blue-500 shrink-0" />
                      {job.time}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Phone size={15} className="text-emerald-500 shrink-0" />
                      <a href={`tel:${job.phone || '9876543210'}`} className="hover:underline text-emerald-700 font-bold">
                        {job.phone || "9876543210"}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${
                      statusColors[job.status] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {job.status}
                  </span>

                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="On the Way">On the Way</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <Link
                    href={`/technician/jobs/${job.id}`}
                    className="bg-[#111F36] hover:bg-[#111F36]/90 text-white font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition shadow-2xs"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-500 font-semibold shadow-2xs">
                No jobs found matching query.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}