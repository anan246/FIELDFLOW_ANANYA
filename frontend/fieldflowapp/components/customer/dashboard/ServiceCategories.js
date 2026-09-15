"use client";

import { useEffect, useState } from "react";
import { customerDashboardData } from "@/data/customerDashboardData";
import { getGlobalSearchQuery, subscribeRealtimeEvents } from "@/lib/realtimeStore";

export default function ServiceCategories() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(getGlobalSearchQuery("customer"));

    const unsubscribe = subscribeRealtimeEvents((type, payload) => {
      if (type === "fieldflow_search_update" && (payload.role === "customer" || payload.role === "global")) {
        setSearch(payload.query || "");
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredServices = customerDashboardData.services.filter((s) => {
    const q = search.toLowerCase().trim();
    return !q || s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q);
  });

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Popular Services
        </h2>

        <button className="font-semibold text-[#FF6B00]">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {filteredServices.map((service, index) => {
          const Icon = service.icon;

          return (
            <button
              key={index}
              className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-md p-6 hover:border-[#FF6B00] hover:-translate-y-1 transition"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Icon size={30} className="text-[#FF6B00]" />
              </div>

              <h3 className="mt-5 font-semibold text-slate-800">
                {service.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                15+ Experts
              </p>
            </button>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="p-6 text-center text-xs text-slate-500 font-medium bg-white/50 rounded-2xl">
          No services matching "{search}"
        </div>
      )}
    </section>
  );
}