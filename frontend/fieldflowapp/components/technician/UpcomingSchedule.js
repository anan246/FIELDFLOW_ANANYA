import { CalendarDays, Clock } from "lucide-react";

const schedule = [
  {
    time: "11:30 AM",
    customer: "Anjali Verma",
    service: "Plumbing Repair",
  },
  {
    time: "3:00 PM",
    customer: "Rohan Gupta",
    service: "AC Installation",
  },
];

export default function UpcomingSchedule() {
  return (
    <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Upcoming Schedule
      </h2>

      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100"
          >
            <div>
              <h3 className="text-gray-800 font-medium">{item.service}</h3>
              <p className="text-gray-500 text-sm">{item.customer}</p>
            </div>

            <div className="text-right text-gray-400 text-sm">
              <div className="flex items-center gap-2 justify-end">
                <CalendarDays size={14} />
                Today
              </div>

              <div className="flex items-center gap-2 justify-end mt-1">
                <Clock size={14} />
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}