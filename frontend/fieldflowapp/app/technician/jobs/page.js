import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

const jobs = [
  {
    id: "1001",
    customer: "Rahul Sharma",
    service: "Electrical Repair",
    location: "MG Road",
    time: "10:30 AM",
    status: "In Progress",
  },
  {
    id: "1002",
    customer: "Priya Singh",
    service: "AC Service",
    location: "Indiranagar",
    time: "2:00 PM",
    status: "Pending",
  },
  {
    id: "1003",
    customer: "Kiran Kumar",
    service: "Fan Installation",
    location: "Whitefield",
    time: "5:00 PM",
    status: "Completed",
  },
];

export default function JobsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Assigned Jobs
      </h1>

      <div className="space-y-5">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {job.service}
              </h2>

              <p className="text-gray-500 mt-1">
                Customer: {job.customer}
              </p>

              <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {job.location}
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {job.time}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  job.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : job.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {job.status}
              </span>

              <Link
                href={`/technician/jobs/${job.id}`}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition"
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