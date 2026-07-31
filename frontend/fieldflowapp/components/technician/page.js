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
  {
    id: "#1003",
    customer: "Kiran Kumar",
    service: "Fan Installation",
    location: "Whitefield",
    time: "5:00 PM",
    status: "Completed",
  },
];

export default function JobsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Assigned Jobs
      </h1>

      <div className="space-y-5">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#1B1B1B] rounded-2xl p-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4"
          >
            <div>
              <h2 className="text-xl font-semibold text-white">
                {job.service}
              </h2>

              <p className="text-gray-400 mt-1">
                Customer: {job.customer}
              </p>

              <div className="flex flex-wrap gap-4 mt-3 text-gray-400">
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
              <span className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400">
                {job.status}
              </span>

              <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-white font-medium transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}