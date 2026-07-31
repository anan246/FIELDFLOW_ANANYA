"use client";

import { Bell } from "lucide-react";
import { customerDashboardData } from "@/data/customerDashboardData";

export default function NotificationPreview() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Notifications
        </h2>

        <button className="text-sm font-semibold text-[#FF6B00]">
          View All
        </button>
      </div>

      <div className="space-y-4">

        {customerDashboardData.notifications.map((item,index)=>(
          <div
            key={index}
            className="rounded-2xl bg-slate-50 p-4 border border-slate-100 hover:border-[#FF6B00] transition"
          >

            <div className="flex gap-4">

              <div className="rounded-full bg-orange-100 p-3 h-fit">
                <Bell size={18} className="text-[#FF6B00]"/>
              </div>

              <div>

                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {item.message}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {item.time}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}