import Topbar from "@/components/technician/Topbar";
import AssignedJobsPreview from "@/components/technician/AssignedJobsPreview";
import UpcomingSchedule from "@/components/technician/UpcomingSchedule";

export default function TechnicianDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Topbar />

      <div className="bg-[#1E293B] rounded-2xl p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-orange-400 font-semibold uppercase tracking-widest text-sm mb-2">Welcome Back 👋</p>
          <h1 className="text-3xl font-bold text-white">Hello, Rajesh</h1>
          <p className="text-gray-400 mt-2">You have <span className="text-orange-400 font-semibold">3 assigned jobs</span> today.</p>
          <p className="text-gray-400 text-sm">Complete them on time to maintain your rating.</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition shrink-0">
          View Jobs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm">Assigned Jobs</h3>
            <p className="text-3xl font-bold text-orange-400 mt-3">8</p>
            <p className="text-xs text-green-500 mt-2">+2 Today</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm">In Progress</h3>
            <p className="text-3xl font-bold text-blue-400 mt-3">3</p>
            <p className="text-xs text-blue-400 mt-2">Active now</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm">Completed</h3>
            <p className="text-3xl font-bold text-green-400 mt-3">24</p>
            <p className="text-xs text-green-500 mt-2">+5 This week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm">Rating</h3>
            <p className="text-3xl font-bold text-yellow-400 mt-3">4.9★</p>
            <p className="text-xs text-gray-400 mt-2">Based on 38 reviews</p>
          </div>
        </div>

        {/* Next Assigned Job */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-xs text-orange-400 font-semibold uppercase tracking-widest mb-2">Next Assigned Job</p>
            <h3 className="text-xl font-bold text-gray-800">Electrical Repair</h3>
            <p className="text-sm text-gray-400 mt-1">Today &nbsp;·&nbsp; 10:30 AM</p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p><span className="font-medium text-gray-700">Customer:</span> Rahul Sharma</p>
              <p><span className="font-medium text-gray-700">Location:</span> MG Road</p>
            </div>
          </div>

          <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold transition w-full">
            View Details
          </button>
        </div>

      </div>

      <AssignedJobsPreview />
      <UpcomingSchedule />
    </div>
  );
}