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
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dispatcher/notifications`);
      if (!response.ok) {
        console.warn("Could not fetch notifications from server, using fallback");
        setLoading(false);
        return;
      }

      const data = await response.json();
      const list = Array.isArray(data) ? data : [];

      const formatted = list.map((item) => ({
        id: item.id,
        type: item.type || "booking",
        title: item.title || "Notification",
        message: item.message || "New activity recorded.",
        time: item.created_at
          ? new Date(item.created_at).toLocaleString()
          : "Just now",
        read: item.is_read ?? item.read ?? false,
      }));

      setNotifications(formatted);
    } catch (error) {
      console.error("Notification Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = notifications.filter((item) =>
    (item.title + item.message + item.type)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const unread = notifications.filter(
    (item) => !item.read
  ).length;

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

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