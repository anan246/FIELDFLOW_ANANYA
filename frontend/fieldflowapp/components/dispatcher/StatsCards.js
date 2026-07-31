"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  Clock3,
  Users,
  AlertTriangle,
} from "lucide-react";

import { API_BASE_URL } from "@/lib/apiConfig";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    availableTechnicians: 0,
    emergencyJobs: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
    const interval = setInterval(fetchDashboardStats, 5000);
    window.addEventListener("focus", fetchDashboardStats);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchDashboardStats);
    };
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/dispatcher/dashboard?_=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats({
          totalBookings: data.totalBookings || 0,
          pendingBookings: data.pendingBookings || 0,
          availableTechnicians: data.availableTechnicians || 0,
          emergencyJobs: data.emergencyJobs || 0,
        });
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: ClipboardList,
    },
    {
      title: "Pending Jobs",
      value: stats.pendingBookings,
      icon: Clock3,
    },
    {
      title: "Technicians",
      value: stats.availableTechnicians,
      icon: Users,
    },
    {
      title: "Emergency",
      value: stats.emergencyJobs,
      icon: AlertTriangle,
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 hover:shadow-xl transition duration-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold text-[#08263B] mt-3">
                {loading ? "..." : card.value}
              </h2>

              <p className="text-sm text-orange-500 mt-2">
                Updated just now
              </p>
            </div>

            <div className="h-14 w-14 rounded-2xl bg-[#08263B] flex items-center justify-center">
              <card.icon
                className="text-orange-500"
                size={28}
              />
            </div>
          </div>

          <div className="mt-6 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-orange-500 rounded-full"
              style={{ width: "70%" }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
