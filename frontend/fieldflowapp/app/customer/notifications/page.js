"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  UserRound,
  XCircle,
  CalendarDays,
  ArrowRight,
  Check,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

const notificationStyles = {
  confirmed: {
    icon: CheckCircle2,
    iconWrapper: "bg-green-50",
    iconColor: "text-green-600",
  },

  technician: {
    icon: UserRound,
    iconWrapper: "bg-blue-50",
    iconColor: "text-blue-600",
  },

  completed: {
    icon: CheckCircle2,
    iconWrapper: "bg-green-50",
    iconColor: "text-green-600",
  },

  cancelled: {
    icon: XCircle,
    iconWrapper: "bg-red-50",
    iconColor: "text-red-500",
  },

  reminder: {
    icon: CalendarDays,
    iconWrapper: "bg-orange-50",
    iconColor: "text-[#FF6B00]",
  },

  default: {
    icon: Bell,
    iconWrapper: "bg-blue-50",
    iconColor: "text-blue-600",
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * TEMPORARY USER ID
   *
   * Later this will come from the logged-in session.
   */
  const userId = 1;

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/notifications/${userId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch notifications"
        );
      }

      const formattedNotifications = (data.notifications || []).map(
        (notification) => ({
          id: notification.id,

          type: getNotificationType(
            notification.message,
            notification.booking_status
          ),

          title: getNotificationTitle(
            notification.message,
            notification.booking_status
          ),

          message: notification.message,

          time: formatTimeAgo(notification.created_at),

          date: formatDate(notification.created_at),

          bookingId: notification.booking_id,

          read: notification.is_read,

          serviceName: notification.service_name,

          bookingStatus: notification.booking_status,
        })
      );

      setNotifications(formattedNotifications);
    } catch (err) {
      console.error("Fetch notifications error:", err);

      setError(
        err.message || "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Determine notification type.
   */
  function getNotificationType(message, bookingStatus) {
    const text = (message || "").toLowerCase();

    if (text.includes("technician")) {
      return "technician";
    }

    if (
      text.includes("cancel") ||
      bookingStatus === "Cancelled"
    ) {
      return "cancelled";
    }

    if (
      text.includes("completed") ||
      bookingStatus === "Completed"
    ) {
      return "completed";
    }

    if (
      text.includes("confirmed") ||
      bookingStatus === "Confirmed"
    ) {
      return "confirmed";
    }

    return "default";
  }

  /*
   * Determine notification title.
   */
  function getNotificationTitle(message, bookingStatus) {
    const text = (message || "").toLowerCase();

    if (text.includes("technician")) {
      return "Technician assigned";
    }

    if (
      text.includes("cancel") ||
      bookingStatus === "Cancelled"
    ) {
      return "Booking cancelled";
    }

    if (
      text.includes("completed") ||
      bookingStatus === "Completed"
    ) {
      return "Service completed";
    }

    if (
      text.includes("confirmed") ||
      bookingStatus === "Confirmed"
    ) {
      return "Booking confirmed";
    }

    return "Booking update";
  }

  /*
   * Mark one notification as read.
   */
  async function markAsRead(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${id}/read`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to mark notification as read"
        );
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Mark notification as read error:", err);

      alert(
        err.message || "Unable to mark notification as read."
      );
    }
  }

  /*
   * Mark all notifications as read.
   */
  async function markAllAsRead() {
    try {
      const unreadNotifications = notifications.filter(
        (notification) => !notification.read
      );

      await Promise.all(
        unreadNotifications.map((notification) =>
          fetch(
            `http://localhost:5000/api/notifications/${notification.id}/read`,
            {
              method: "PATCH",
            }
          )
        )
      );

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (err) {
      console.error("Mark all as read error:", err);

      alert(
        "Unable to mark all notifications as read."
      );
    }
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications =
    filter === "Unread"
      ? notifications.filter(
          (notification) => !notification.read
        )
      : notifications;

  return (
    <main className="min-h-screen bg-[#F4F6F9] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">

        {/* HEADER */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#14263D]">
                <Bell
                  size={21}
                  className="text-[#FF6B00]"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#FF6B00]">
                  Updates
                </p>

                <h1 className="text-2xl font-bold text-[#14263D] sm:text-3xl">
                  Notifications
                </h1>
              </div>

            </div>

            <p className="mt-3 max-w-xl text-sm text-slate-500">
              Stay updated about your bookings, technicians, and service
              requests.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#14263D] shadow-sm transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
            >
              <Check size={17} />
              Mark all as read
            </button>
          )}

        </div>

        {/* SUMMARY */}
        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">

          {/* TOTAL */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                <Bell
                  size={19}
                  className="text-[#FF6B00]"
                />
              </div>

              <span className="text-2xl font-bold text-[#14263D]">
                {notifications.length}
              </span>

            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Total notifications
            </p>

          </div>

          {/* UNREAD */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <ClipboardList
                  size={19}
                  className="text-blue-600"
                />
              </div>

              <span className="text-2xl font-bold text-[#14263D]">
                {unreadCount}
              </span>

            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Unread
            </p>

          </div>

          {/* INFO */}
          <div className="col-span-2 rounded-2xl bg-[#14263D] p-5 text-white sm:col-span-1">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Stay updated
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-300">
              We&apos;ll notify you whenever there is an important update to
              your service.
            </p>

          </div>

        </div>

        {/* FILTER */}
        <div className="mt-7 rounded-2xl bg-white p-2 shadow-sm">

          <div className="flex gap-1">

            {["All", "Unread"].map((item) => {
              const active = filter === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-[#FF6B00] text-white shadow-sm"
                      : "text-slate-500 hover:bg-[#F4F6F9] hover:text-[#14263D]"
                  }`}
                >
                  {item}

                  {item === "Unread" && unreadCount > 0 && (
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-orange-50 text-[#FF6B00]"
                      }`}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}

          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
            <div className="flex items-start gap-3">

              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-red-500"
              />

              <div>
                <p className="font-semibold text-red-600">
                  Unable to load notifications
                </p>

                <p className="mt-1 text-sm text-red-500">
                  {error}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="mt-5 rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF6B00]" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading notifications...
            </p>

          </div>
        ) : (
          /* NOTIFICATION LIST */
          <div className="mt-5 space-y-3">

            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onRead={markAsRead}
                />
              ))
            ) : (
              <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F6F9]">
                  <Bell
                    size={25}
                    className="text-slate-400"
                  />
                </div>

                <h2 className="mt-4 text-lg font-bold text-[#14263D]">
                  You&apos;re all caught up
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  You don&apos;t have any unread notifications.
                </p>

              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}


/* ---------------- NOTIFICATION CARD ---------------- */

function NotificationCard({ notification, onRead }) {
  const style =
    notificationStyles[notification.type] ||
    notificationStyles.default;

  const Icon = style.icon;

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm transition sm:p-5 ${
        notification.read
          ? "border-transparent bg-white"
          : "border-orange-100 bg-orange-50/40"
      }`}
    >

      <div className="flex gap-4">

        {/* ICON */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.iconWrapper}`}
        >
          <Icon
            size={20}
            className={style.iconColor}
          />
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-sm font-bold text-[#14263D] sm:text-base">
                  {notification.title}
                </h2>

                {!notification.read && (
                  <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                )}

              </div>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                {notification.message}
              </p>

              {notification.serviceName && (
                <p className="mt-1 text-xs font-medium text-slate-400">
                  {notification.serviceName}
                </p>
              )}

            </div>

            <span className="shrink-0 text-[11px] font-medium text-slate-400">
              {notification.time}
            </span>

          </div>

          {/* FOOTER */}
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CalendarDays size={14} />
              {notification.date}
            </div>

            <div className="flex items-center gap-3">

              {!notification.read && (
                <button
                  type="button"
                  onClick={() => onRead(notification.id)}
                  className="text-xs font-semibold text-[#14263D] transition hover:text-[#FF6B00]"
                >
                  Mark as read
                </button>
              )}

              {notification.bookingId ? (
                <Link
                  href={`/customer/bookings/${notification.bookingId}`}
                  onClick={() => {
                    if (!notification.read) {
                      onRead(notification.id);
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B00] transition hover:text-orange-600"
                >
                  View booking
                  <ArrowRight size={14} />
                </Link>
              ) : (
                <span className="text-xs font-medium text-slate-400">
                  Booking details unavailable
                </span>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ---------------- HELPERS ---------------- */

function formatDate(date) {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


function formatTimeAgo(date) {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  const now = new Date();

  const difference = now.getTime() - parsedDate.getTime();

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}