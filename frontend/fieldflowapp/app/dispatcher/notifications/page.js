"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dispatcher/DashboardLayout";
import NotificationCard from "@/components/dispatcher/NotificationCard";
import { Bell, Search } from "lucide-react";

import { API_BASE_URL } from "@/lib/apiConfig";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 3000);
    window.addEventListener("storage", loadNotifications);

    if (typeof window !== "undefined") {
      const { subscribeRealtimeEvents } = require("@/lib/realtimeStore");
      const unsubscribe = subscribeRealtimeEvents(() => loadNotifications());
      return () => {
        clearInterval(interval);
        window.removeEventListener("storage", loadNotifications);
        unsubscribe();
      };
    }
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", loadNotifications);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      let list = [];
      try {
        const response = await fetch(`${API_BASE_URL}/dispatcher/notifications`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) list = data;
        }
      } catch (_) {}

      let localNotifs = [];
      try {
        localNotifs = JSON.parse(localStorage.getItem("dispatcher_notifications") || "[]");
      } catch (_) {}

      const allNotifs = [...localNotifs, ...list];

      if (allNotifs.length === 0) {
        allNotifs.push(
          { id: 1, type: "booking", title: "New Service Booking #1043", message: "Kripa requested Home Repair service at MG Road.", time: "5 mins ago", read: false },
          { id: 2, type: "emergency", title: "🚨 Critical Gas Leak Emergency #9001", message: "Urgent dispatch required at Indiranagar 100ft Road.", time: "12 mins ago", read: false },
          { id: 3, type: "technician", title: "Technician Ravi Kumar Assigned", message: "Assigned to AC Servicing for Priya Sharma.", time: "30 mins ago", read: true },
          { id: 4, type: "job", title: "Job #1002 Marked Completed", message: "Nanda completed Electrical Repair for Rahul Sharma.", time: "1 hour ago", read: true }
        );
      }

      // Deduplicate notifications by id / title
      const uniqueNotifs = [];
      const seenKeys = new Set();
      allNotifs.forEach((n) => {
        const key = `${n.id}-${n.title}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          uniqueNotifs.push({
            id: n.id,
            type: n.type || "booking",
            title: n.title || "Notification",
            message: n.message || "Activity recorded.",
            time: n.time || (n.created_at ? new Date(n.created_at).toLocaleTimeString() : "Just now"),
            read: n.read ?? n.is_read ?? false,
          });
        }
      });

      setNotifications(uniqueNotifs);
    } catch (error) {
      console.error("Notification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((item) => ({ ...item, read: true }));
      try {
        localStorage.setItem("dispatcher_notifications", JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };

  const filtered = notifications.filter((item) =>
    (item.title + item.message + item.type)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const unread = notifications.filter((item) => !item.read).length;

  return (
    <DashboardLayout>
  <div className="space-y-8">

    {/* Hero */}

    <div className="rounded-3xl bg-gradient-to-r from-[#08263B] via-[#10364F] to-[#08263B] p-8 text-white shadow-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="mt-2 text-gray-300">
            Stay updated with technician assignments, bookings,
            emergencies and dispatcher activities.
          </p>

        </div>

        <button
          onClick={markAllRead}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold transition hover:bg-orange-600"
        >
          Mark All Read
        </button>

      </div>

    </div>

    {/* Stats */}

    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-2xl bg-white p-6 shadow-md">

        <Bell
          className="mb-3 text-orange-500"
          size={32}
        />

        <p className="text-gray-500">
          Total Notifications
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
          {notifications.length}
        </h2>

      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">

        <Bell
          className="mb-3 text-blue-500"
          size={32}
        />

        <p className="text-gray-500">
          Unread
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
          {unread}
        </h2>

      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">

        <Bell
          className="mb-3 text-green-500"
          size={32}
        />

        <p className="text-gray-500">
          Read
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#08263B]">
          {notifications.length - unread}
        </h2>

      </div>

    </div>

    {/* Search */}

    <div className="relative">

      <Search
        className="absolute left-4 top-3.5 text-gray-400"
        size={20}
      />

      <input
        type="text"
        placeholder="Search notifications..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
      />

    </div>

    {/* Notifications */}

    <div className="space-y-4">

      {loading ? (

        <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow-md">
          Loading notifications...
        </div>

      ) : filtered.length > 0 ? (

        filtered.map((notification) => (

          <NotificationCard
            key={notification.id}
            notification={notification}
          />

        ))

      ) : (

        <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow-md">
          No notifications found.
        </div>

      )}

    </div>

  </div>
</DashboardLayout>
 );
}