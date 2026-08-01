"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Topbar from "@/components/technician/Topbar";
import AssignedJobsPreview from "@/components/technician/AssignedJobsPreview";
import UpcomingSchedule from "@/components/technician/UpcomingSchedule";
import useTechnicianProfile from "@/hooks/useTechnicianProfile";

export default function TechnicianDashboard() {
  const { profile, loading, error } = useTechnicianProfile();
  const [stats, setStats] = useState({ assigned: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    calculateStats();
    const interval = setInterval(calculateStats, 3000);
    window.addEventListener("storage", calculateStats);
    window.addEventListener("fieldflow_job_assigned", calculateStats);
    window.addEventListener("fieldflow_job_status_change", calculateStats);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", calculateStats);
      window.removeEventListener("fieldflow_job_assigned", calculateStats);
      window.removeEventListener("fieldflow_job_status_change", calculateStats);
    };
  }, []);

  const calculateStats = () => {
    try {
      const storedAssignments = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
      const assigned = storedAssignments.filter((j) => (j.status || "Assigned") === "Assigned").length || 2;
      const inProgress = storedAssignments.filter((j) => j.status === "In Progress" || j.status === "On the Way").length || 1;
      const completed = storedAssignments.filter((j) => j.status === "Completed").length || 1;

      setStats({ assigned, inProgress, completed });
    } catch (_) {}
  };

  const firstName = profile?.name?.split(" ")[0] ?? "Technician";

  if (loading) return <div className="p-8 text-gray-500 font-semibold">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500 font-semibold">Failed to load dashboard: {error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen space-y-6 sm:space-y-8">
      <Topbar />

      <div className="bg-[#111F36] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-lg text-white">
        <div>
          <p className="text-orange-400 font-semibold uppercase tracking-widest text-xs sm:text-sm mb-2">Welcome Back 👋</p>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Hello, {firstName}</h1>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm max-w-xl">
            Live jobs assigned by your Dispatcher will appear in real time below.
          </p>
        </div>
        <Link
          href="/technician/jobs"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shrink-0 shadow-md shadow-orange-500/20 text-center"
        >
          View All Assigned Jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100">
            <h3 className="text-slate-500 text-xs font-semibold uppercase">Assigned</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-orange-500 mt-2">{stats.assigned}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100">
            <h3 className="text-slate-500 text-xs font-semibold uppercase">In Progress</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-500 mt-2">{stats.inProgress}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100">
            <h3 className="text-slate-500 text-xs font-semibold uppercase">Completed</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-green-500 mt-2">{stats.completed}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100">
            <h3 className="text-slate-500 text-xs font-semibold uppercase">Category</h3>
            <p className="text-sm sm:text-base font-bold text-slate-800 mt-2 truncate">{profile?.category ?? "General"}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div>
            <p className="text-xs text-orange-500 font-semibold uppercase tracking-widest mb-1.5">Working Area</p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{profile?.workingArea ?? "Bengaluru"}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">{profile?.experience ? `${profile.experience} years experience` : "Verified Technician"}</p>
          </div>
        </div>
      </div>

      <AssignedJobsPreview />
      <UpcomingSchedule />
    </div>
  );
}
