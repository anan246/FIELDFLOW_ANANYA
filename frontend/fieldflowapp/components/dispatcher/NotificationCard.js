"use client";

import {
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  XCircle,
  ClipboardList,
  Car,
  Bell,
} from "lucide-react";

const icons = {
  assignment: (
    <UserCheck
      size={22}
      className="text-blue-600"
    />
  ),

  completed: (
    <CheckCircle2
      size={22}
      className="text-green-600"
    />
  ),

  emergency: (
    <AlertTriangle
      size={22}
      className="text-orange-500"
    />
  ),

  cancelled: (
    <XCircle
      size={22}
      className="text-red-600"
    />
  ),

  booking: (
    <ClipboardList
      size={22}
      className="text-purple-600"
    />
  ),

  travel: (
    <Car
      size={22}
      className="text-cyan-600"
    />
  ),
};

export default function NotificationCard({
  notification,
}) {

  const icon =
    icons[notification.type] || (
      <Bell
        size={22}
        className="text-orange-500"
      />
    );

  return (

    <div
      className={`relative rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        notification.read
          ? "border-gray-200"
          : "border-blue-300"
      }`}
    >

      {!notification.read && (

        <span className="absolute right-5 top-5 h-3 w-3 rounded-full bg-blue-500"></span>

      )}

      <div className="flex gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">

          {icon}

        </div>

        <div className="flex-1">

          <div className="flex items-start justify-between">

            <h3 className="text-lg font-semibold text-[#08263B]">

              {notification.title}

            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                notification.read
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {notification.read
                ? "Read"
                : "Unread"}
            </span>

          </div>

          <p className="mt-2 leading-6 text-gray-600">

            {notification.message}

          </p>

          <div className="mt-4 flex items-center justify-between">

            <span className="text-sm text-gray-400">

              {notification.time}

            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">

              {notification.type}

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}