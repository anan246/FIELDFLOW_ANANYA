"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  Clock3,
  UserCog,
  AlertTriangle,
} from "lucide-react";

import StatCard from "../ui/StatCard";

export default function StatsSection() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    availableTechnicians: 0,
    emergencyJobs: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dispatcher/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  const dashboardStats = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: ClipboardList,
      color: "bg-orange-500",
    },
    {
      title: "Pending Jobs",
      value: stats.pendingBookings,
      icon: Clock3,
      color: "bg-yellow-500",
    },
    {
      title: "Technicians",
      value: stats.availableTechnicians,
      icon: UserCog,
      color: "bg-green-500",
    },
    {
      title: "Emergency",
      value: stats.emergencyJobs,
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardStats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
    </section>
  );
}