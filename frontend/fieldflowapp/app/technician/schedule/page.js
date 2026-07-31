import { CalendarDays, Clock, MapPin } from "lucide-react";

const schedule = [
  {
    id: "#1001",
    service: "Electrical Repair",
    customer: "Rahul Sharma",
    location: "MG Road",
    date: "Today",
    time: "10:30 AM",
  },
  {
    id: "#1002",
    service: "AC Service",
    customer: "Priya Singh",
    location: "Indiranagar",
    date: "Today",
    time: "2:00 PM",
  },
  {
    id: "#1003",
    service: "Fan Installation",
    customer: "Kiran Kumar",
    location: "Whitefield",
    date: "Tomorrow",
    time: "11:00 AM",
  },
];

export default function SchedulePage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        My Schedule
      </h1>

      <div className="space-y-6">
        {schedule.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {job.service}
                </h2>

                <p className="text-gray-500 mt-1">
                  Customer: {job.customer}
                </p>

                <div className="flex flex-wrap gap-5 mt-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <MapPin size={18} />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    {job.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock size={18} />
                    {job.time}
                  </span>
                </div>
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition">
                View Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}