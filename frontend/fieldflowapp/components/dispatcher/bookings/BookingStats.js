"use client";

import {
  ClipboardList,
  Clock3,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: 124,
    icon: ClipboardList,
    color: "text-orange-500",
    progress: "80%",
    bg: "bg-orange-100",
  },
  {
    title: "Pending Jobs",
    value: 18,
    icon: Clock3,
    color: "text-amber-500",
    progress: "35%",
    bg: "bg-amber-100",
  },
  {
    title: "Assigned",
    value: 72,
    icon: UserCheck,
    color: "text-sky-500",
    progress: "60%",
    bg: "bg-sky-100",
  },
  {
    title: "Completed",
    value: 29,
    icon: CheckCircle2,
    color: "text-green-500",
    progress: "45%",
    bg: "bg-green-100",
  },
  {
    title: "Emergency",
    value: 5,
    icon: AlertTriangle,
    color: "text-red-500",
    progress: "20%",
    bg: "bg-red-100",
  },
];

export default function BookingStats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-3xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-[#0B2C45]">
                  {item.value}
                </h2>
              </div>

              <div
                className={`h-16 w-16 rounded-2xl ${item.bg} flex items-center justify-center`}
              >
                <Icon
                  className={item.color}
                  size={30}
                />
              </div>
            </div>

            <div className="mt-6">

              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Today's Progress</span>

                <span>{item.progress}</span>
              </div>

              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full rounded-full bg-orange-500"
                  style={{ width: item.progress }}
                />

              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Updated just now
            </p>

          </div>
        );
      })}
    </section>
  );
}