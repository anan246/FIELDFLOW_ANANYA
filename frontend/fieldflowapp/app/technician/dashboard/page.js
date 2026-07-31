"use client";
import Topbar from "@/components/technician/Topbar";
import AssignedJobsPreview from "@/components/technician/AssignedJobsPreview";
import UpcomingSchedule from "@/components/technician/UpcomingSchedule";
import useTechnicianProfile from "@/hooks/useTechnicianProfile";

export default function TechnicianDashboard() {
  const { profile, loading, error } = useTechnicianProfile();

  const firstName = profile?.name?.split(" ")[0] ?? "Technician";

  if (loading) return <div className="p-8 text-gray-500">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500">Failed to load dashboard: {error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Topbar />

      <div className="bg-[#1E293B] rounded-2xl p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-orange-400 font-semibold uppercase tracking-widest text-sm mb-2">Welcome Back 👋</p>
          <h1 className="text-3xl font-bold text-white">Hello, {firstName}</h1>
          <p className="text-gray-400 mt-2">Complete your jobs on time to maintain your rating.</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition shrink-0">
          View Jobs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm">Assigned Jobs</h3>
            <p className="text-3xl font-bold text-orange-400 mt-3">—</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm">In Progress</h3>
            <p className="text-3xl font-bold text-blue-400 mt-3">—</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm">Completed</h3>
            <p className="text-3xl font-bold text-green-400 mt-3">—</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm">Category</h3>
            <p className="text-xl font-bold text-yellow-400 mt-3">{profile?.category ?? "—"}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-xs text-orange-400 font-semibold uppercase tracking-widest mb-2">Working Area</p>
            <h3 className="text-xl font-bold text-gray-800">{profile?.workingArea ?? "—"}</h3>
            <p className="text-sm text-gray-400 mt-1">{profile?.experience ? `${profile.experience} yrs experience` : ""}</p>
          </div>
        </div>
      </div>

      <AssignedJobsPreview />
      <UpcomingSchedule />
    </div>
  );
}
