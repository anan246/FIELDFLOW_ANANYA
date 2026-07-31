import { Bell, CheckCircle, CalendarClock, Wrench } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New Job Assigned",
    message: "Electrical Repair assigned at MG Road.",
    time: "5 mins ago",
    icon: <Wrench className="text-orange-500" size={22} />,
  },
  {
    id: 2,
    title: "Schedule Updated",
    message: "Your AC Service has been moved to 3:00 PM.",
    time: "30 mins ago",
    icon: <CalendarClock className="text-blue-500" size={22} />,
  },
  {
    id: 3,
    title: "Job Completed",
    message: "Your Plumbing Repair job was marked as completed.",
    time: "Yesterday",
    icon: <CheckCircle className="text-green-500" size={22} />,
  },
];

export default function NotificationsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Bell className="text-orange-500" size={30} />
        <h1 className="text-3xl font-bold text-gray-800">
          Notifications
        </h1>
      </div>

      <div className="space-y-5">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm p-6 flex items-start gap-4"
          >
            <div>{item.icon}</div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h2>

              <p className="text-gray-600 mt-1">
                {item.message}
              </p>

              <p className="text-sm text-gray-400 mt-3">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}