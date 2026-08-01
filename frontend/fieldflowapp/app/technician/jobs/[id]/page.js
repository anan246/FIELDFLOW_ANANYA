"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Clock, User, CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function JobDetailsPage() {
  const { id } = useParams();
  const statuses = [
    "Assigned",
    "On the Way",
    "In Progress",
    "Completed",
  ];

  const [job, setJob] = useState({
    id: id || "1001",
    customer: "Customer",
    service: "Home Service Repair",
    location: "Bengaluru",
    time: "Today 10:30 AM",
    status: "Assigned",
    phone: "9876543210",
    notes: "Service requested via FieldFlow platform.",
  });

  const [workNotes, setWorkNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = () => {
    try {
      const storedAssignments = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
      const found = storedAssignments.find((j) => String(j.bookingId || j.id) === String(id));
      if (found) {
        setJob({
          id: String(found.bookingId || id),
          customer: found.customerName || found.customer || "Customer",
          service: found.serviceName || found.service || "Home Service Repair",
          location: found.location || found.address || "Bengaluru",
          time: found.assignedAt ? new Date(found.assignedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Today 10:30 AM",
          status: found.status || "Assigned",
          phone: found.phone || "9876543210",
          notes: found.notes || "Job assigned by Dispatcher",
        });
      }
    } catch (_) {}
  };

  const handleStatusChange = async (newStatus) => {
    setJob((prev) => ({ ...prev, status: newStatus }));

    try {
      const storedAssignments = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
      const updated = storedAssignments.map((j) =>
        String(j.bookingId || j.id) === String(id) ? { ...j, status: newStatus } : j
      );
      localStorage.setItem("assigned_jobs", JSON.stringify(updated));

      window.dispatchEvent(new CustomEvent("fieldflow_job_status_change", { detail: { jobId: id, status: newStatus } }));
      window.dispatchEvent(new Event("storage"));
    } catch (_) {}

    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE_URL}/technician/jobs/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (_) {}
  };

  const handleSaveNotes = () => {
    setSavedNotes(true);
    setTimeout(() => setSavedNotes(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/technician/jobs"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 transition"
        >
          <ArrowLeft size={16} />
          Back to Assigned Jobs
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Job #{job.id}
          </h1>
          <span className="self-start sm:self-auto px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-orange-100 text-orange-700 border border-orange-200">
            {job.status}
          </span>
        </div>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-3">
                <User size={18} className="text-orange-500 shrink-0" />
                <span className="font-bold text-slate-900">{job.customer}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>{job.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-red-500 shrink-0" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-purple-500 shrink-0" />
                <span>{job.time}</span>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Requested Service</h2>
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600">{job.service}</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Linked to Dispatcher Booking #{job.id}</p>
          </div>

          {/* Update Status Buttons */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Update Status (Real-time to Dispatcher)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {statuses.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleStatusChange(item)}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shadow-2xs ${
                    job.status === item
                      ? "bg-[#111F36] text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 font-medium">
              Current Status: <strong className="text-orange-600 font-bold ml-1">{job.status}</strong>
            </p>
          </div>

          {/* Work Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Work Notes & Completion Log</h2>
            <textarea
              rows={4}
              value={workNotes}
              onChange={(e) => setWorkNotes(e.target.value)}
              placeholder="Add technician work notes or service completion details..."
              className="w-full rounded-xl border border-slate-200 p-4 text-xs sm:text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition resize-none bg-slate-50"
            />
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={handleSaveNotes}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-2xs cursor-pointer"
              >
                Save Notes
              </button>
              {savedNotes && (
                <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle2 size={16} /> Saved!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
