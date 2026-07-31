import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

const jobs = [
  {
    id: "#1001",
    customer: "Rahul Sharma",
    service: "Electrical Repair",
    location: "MG Road",
    time: "10:30 AM",
    status: "In Progress",
  },
  {
    id: "#1002",
    customer: "Priya Singh",
    service: "AC Service",
    location: "Indiranagar",
    time: "2:00 PM",
    status: "Pending",
  },
];

export default function AssignedJobsPreview() {
  return (
    <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Today's Assigned Jobs
        </h2>

        <Link
          href="/technician/jobs"
          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-50 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100"
          >
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {job.service}
              </h3>

              <p className="text-gray-500 text-sm mt-0.5">{job.customer}</p>

              <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location}
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {job.time}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  job.status === "In Progress"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {job.status}
              </span>

              <Link
                href={`/technician/jobs/${job.id.replace("#", "")}`}
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}