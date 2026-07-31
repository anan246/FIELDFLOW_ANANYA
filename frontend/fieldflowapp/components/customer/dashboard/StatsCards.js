"use client";

import {
  CalendarCheck,
  Clock3,
  CircleCheckBig,
  TriangleAlert,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "24",
    change: "+2 This Week",
    icon: CalendarCheck,
  },
  {
    title: "Active Services",
    value: "3",
    change: "+2 This Week",
    icon: Clock3,
  },
  {
    title: "Completed",
    value: "19",
    change: "+2 This Week",
    icon: CircleCheckBig,
  },
  {
    title: "Emergency",
    value: "2",
    change: "+2 This Week",
    icon: TriangleAlert,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#FF6B00]/40 hover:shadow-md"
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-[#14263D]">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#14263D] text-white transition group-hover:bg-[#FF6B00]">
                <Icon size={21} />
              </div>

            </div>

            <p className="mt-3 text-xs font-semibold text-emerald-600">
              {stat.change}
            </p>

          </div>
        );
      })}

    </div>
  );
}