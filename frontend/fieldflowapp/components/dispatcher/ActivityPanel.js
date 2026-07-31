"use client";

import {
  ClipboardCheck,
  UserCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function ActivityPanel() {
  const activities = [
    {
      icon: ClipboardCheck,
      color: "bg-blue-100 text-blue-600",
      title: "New booking received",
      subtitle: "Booking #7 • Electrical Repair",
      time: "5 mins ago",
    },
    {
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
      title: "Technician Assigned",
      subtitle: "Rahul Sharma → Booking #7",
      time: "20 mins ago",
    },
    {
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
      title: "Emergency Request",
      subtitle: "AC Repair • Main Street",
      time: "45 mins ago",
    },
    {
      icon: CheckCircle,
      color: "bg-orange-100 text-orange-600",
      title: "Job Completed",
      subtitle: "Booking #5 completed",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md mt-8">

      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-[#08263B]">
            Recent Activity
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest updates from your dispatcher dashboard
          </p>
        </div>
      </div>

      <div className="divide-y">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 hover:bg-slate-50 transition"
          >
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center ${activity.color}`}
            >
              <activity.icon size={22} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#08263B]">
                {activity.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {activity.subtitle}
              </p>
            </div>

            <span className="text-sm text-gray-400">
              {activity.time}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}