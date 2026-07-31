"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  UserRound,
  Wrench,
  CheckCircle2,
  Circle,
  XCircle,
  ShieldCheck,
  IndianRupee,
  AlertCircle,
} from "lucide-react";

export default function BookingDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * FETCH BOOKING DETAILS FROM BACKEND
   */
  useEffect(() => {
    if (!id) return;

    async function fetchBooking() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/bookings/details/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "Booking not found"
          );
        }

        const backendBooking = data.booking;

        /*
         * Convert backend data into the format
         * used by our UI.
         */
        setBooking({
          id: backendBooking.id,

          service:
            backendBooking.service_name || "Service",

          category:
            backendBooking.category_name || "Service",

          date:
            formatDate(backendBooking.booking_date),

          time:
            formatTime(backendBooking.booking_time),

          address:
            backendBooking.address || "Address not provided",

          price:
            parsePrice(backendBooking.service_price),

          status:
            normalizeStatus(backendBooking.status),

          phone:
            backendBooking.customer_phone || "Not provided",

          description:
            backendBooking.service_description || "",

          technician: {
            name: "Technician will be assigned",
            phone: "Available after assignment",
          },

          /*
           * Keep original backend values.
           */
          backend_status: backendBooking.status,
          user_id: backendBooking.user_id,
          service_id: backendBooking.service_id,
        });
      } catch (err) {
        console.error("Unable to load booking:", err);

        setError(
          err.message || "Unable to load booking details."
        );

        setBooking(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [id]);

  /*
   * CANCEL BOOKING
   *
   * NOTE:
   * Your backend currently does NOT have a cancel endpoint.
   *
   * So for now this only updates the frontend state.
   *
   * We can connect this to the database next.
   */
 async function handleCancelBooking() {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/bookings/${id}/cancel`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to cancel booking"
      );
    }

    // Update the current page immediately
    setBooking((currentBooking) => ({
      ...currentBooking,
      status: "Cancelled",
      backend_status: "Cancelled",
    }));

    alert("Booking cancelled successfully.");
  } catch (error) {
    console.error("Cancel booking error:", error);

    alert(
      error.message ||
        "Something went wrong while cancelling the booking."
    );
  }
}

  /*
   * LOADING
   */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F6F9] px-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <Wrench
              size={26}
              className="text-[#FF6B00]"
            />
          </div>

          <h1 className="mt-4 text-xl font-bold text-[#14263D]">
            Loading booking...
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we load your booking details.
          </p>
        </div>
      </main>
    );
  }

  /*
   * BOOKING NOT FOUND / ERROR
   */
  if (!booking) {
    return (
      <main className="min-h-screen bg-[#F4F6F9] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">

          <Link
            href="/customer/bookings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#14263D] transition hover:text-[#FF6B00]"
          >
            <ArrowLeft size={18} />
            Back to My Bookings
          </Link>

          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <XCircle
                size={28}
                className="text-red-500"
              />
            </div>

            <h1 className="mt-4 text-xl font-bold text-[#14263D]">
              Booking Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error ||
                "We couldn't find the booking you're looking for."}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Booking ID: {id}
            </p>

            <Link
              href="/customer/bookings"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-3 text-sm font-bold text-white"
            >
              View My Bookings
            </Link>

          </div>
        </div>
      </main>
    );
  }

  const isUpcoming = booking.status === "Upcoming";
  const isCompleted = booking.status === "Completed";
  const isCancelled = booking.status === "Cancelled";

  return (
    <main className="min-h-screen bg-[#F4F6F9] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">

        {/* BACK */}
        <Link
          href="/customer/bookings"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#14263D] transition hover:text-[#FF6B00]"
        >
          <ArrowLeft size={18} />
          Back to My Bookings
        </Link>

        {/* HEADER */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-[#FF6B00]">
              Booking Details
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#14263D] sm:text-3xl">
              {booking.service}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Booking ID:{" "}
              <span className="font-semibold text-[#14263D]">
                {booking.id}
              </span>
            </p>
          </div>

          <StatusBadge status={booking.status} />

        </div>

        {/* MAIN GRID */}
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_330px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* SERVICE CARD */}
            <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14263D]">
                  <Wrench
                    size={24}
                    className="text-[#FF6B00]"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Service
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-[#14263D]">
                    {booking.service}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {booking.category}
                  </p>
                </div>

              </div>

              {/* INFO GRID */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <InfoItem
                  icon={<CalendarDays size={19} />}
                  label="Date"
                  value={booking.date}
                />

                <InfoItem
                  icon={<Clock3 size={19} />}
                  label="Time"
                  value={booking.time}
                />

                <InfoItem
                  icon={<MapPin size={19} />}
                  label="Service Address"
                  value={booking.address}
                />

                <InfoItem
                  icon={<Phone size={19} />}
                  label="Contact Number"
                  value={booking.phone}
                />

              </div>

              {booking.description && (
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Service Description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {booking.description}
                  </p>
                </div>
              )}

            </section>

            {/* TECHNICIAN */}
            <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Service Professional
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-[#14263D]">
                    Technician
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                  <UserRound
                    size={21}
                    className="text-[#FF6B00]"
                  />
                </div>

              </div>

              <div className="mt-5 rounded-xl bg-[#F4F6F9] p-4">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#14263D]">
                    <UserRound
                      size={21}
                      className="text-white"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-[#14263D]">
                      {booking.technician?.name ||
                        "Technician will be assigned"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {booking.technician?.phone ||
                        "Available after assignment"}
                    </p>
                  </div>

                </div>

                {isUpcoming && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-orange-50 p-3">

                    <ShieldCheck
                      size={17}
                      className="mt-0.5 shrink-0 text-[#FF6B00]"
                    />

                    <p className="text-xs leading-5 text-slate-600">
                      A verified technician will be assigned to your
                      booking. You&apos;ll receive a notification once
                      the assignment is confirmed.
                    </p>

                  </div>
                )}

              </div>

            </section>

            {/* BOOKING TIMELINE */}
            <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

              <h2 className="text-lg font-bold text-[#14263D]">
                Booking Timeline
              </h2>

              <div className="mt-6">

                <TimelineItem
                  title="Booking created"
                  description="Your service request was received."
                  completed
                />

                <TimelineItem
                  title="Booking confirmed"
                  description={
                    isCancelled
                      ? "Your booking was cancelled."
                      : "Your booking has been confirmed."
                  }
                  completed={!isCancelled}
                  cancelled={isCancelled}
                />

                <TimelineItem
                  title="Technician assigned"
                  description={
                    isCompleted
                      ? "A technician was assigned to your service."
                      : isCancelled
                      ? "Technician assignment was cancelled."
                      : "Waiting for technician assignment."
                  }
                  completed={
                    isCompleted ||
                    booking.backend_status === "Assigned"
                  }
                />

                <TimelineItem
                  title="Service completed"
                  description={
                    isCompleted
                      ? "The service was completed successfully."
                      : isCancelled
                      ? "Service was not completed because the booking was cancelled."
                      : "This step will be updated after your service."
                  }
                  completed={isCompleted}
                  last
                />

              </div>

            </section>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* PAYMENT */}
            <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <IndianRupee
                    size={19}
                    className="text-[#FF6B00]"
                  />
                </div>

                <h2 className="text-lg font-bold text-[#14263D]">
                  Payment Summary
                </h2>

              </div>

              <div className="mt-5 space-y-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Service charge
                  </span>

                  <span className="text-sm font-semibold text-[#14263D]">
                    ₹{booking.price}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Service fee
                  </span>

                  <span className="text-sm font-semibold text-[#14263D]">
                    ₹0
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold text-[#14263D]">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#FF6B00]">
                      ₹{booking.price}
                    </span>

                  </div>

                </div>

              </div>

              <div className="mt-5 rounded-xl bg-[#F4F6F9] p-4">

                <p className="text-xs font-semibold text-[#14263D]">
                  Payment Status
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {isCancelled
                    ? "Booking cancelled"
                    : isCompleted
                    ? "Payment completed"
                    : "Payment will be handled securely."}
                </p>

              </div>

            </section>

            {/* STATUS CARD */}
            <section className="rounded-2xl bg-[#14263D] p-5 text-white shadow-sm sm:p-6">

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Current Status
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {booking.status}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">

                {isUpcoming &&
                  "Your booking is confirmed. We'll notify you when a technician is assigned."}

                {isCompleted &&
                  "This service has been completed successfully."}

                {isCancelled &&
                  "This booking has been cancelled."}

              </p>

            </section>

            {/* ACTIONS */}
            {isUpcoming && (
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <h2 className="text-base font-bold text-[#14263D]">
                  Manage Booking
                </h2>

                <button
                  type="button"
                  onClick={handleCancelBooking}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  <XCircle size={18} />
                  Cancel Booking
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                  You can cancel this booking before the service begins.
                </p>

              </section>
            )}

            {/* BACK BUTTON */}
            <Link
              href="/customer/bookings"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#14263D] shadow-sm transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
            >
              <ArrowLeft size={17} />
              Back to My Bookings
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}

/* ---------------- HELPERS ---------------- */

function parsePrice(price) {
  if (typeof price === "number") {
    return price;
  }

  if (!price) {
    return 0;
  }

  const numericPrice = String(price).replace(/[^\d.]/g, "");

  return Number(numericPrice) || 0;
}

function formatDate(date) {
  if (!date) {
    return "Date not specified";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(date);
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time) {
  if (!time) {
    return "Time not specified";
  }

  const parts = time.split(":");

  let hour = Number(parts[0]);
  const minutes = parts[1] || "00";

  const suffix = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${minutes} ${suffix}`;
}

function normalizeStatus(status) {
  if (!status) {
    return "Upcoming";
  }

  const normalized = String(status).toLowerCase();

  if (normalized === "completed") {
    return "Completed";
  }

  if (
    normalized === "cancelled" ||
    normalized === "canceled"
  ) {
    return "Cancelled";
  }

  /*
   * Backend currently uses Pending / Assigned.
   * Both are displayed as Upcoming for customer.
   */
  return "Upcoming";
}

function StatusBadge({ status }) {
  if (status === "Upcoming") {
    return (
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-[#FF6B00]">
        <Circle
          size={9}
          fill="currentColor"
        />
        Upcoming
      </span>
    );
  }

  if (status === "Completed") {
    return (
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-600">
        <CheckCircle2 size={15} />
        Completed
      </span>
    );
  }

  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-500">
      <XCircle size={15} />
      Cancelled
    </span>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F9] text-[#FF6B00]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold leading-5 text-[#14263D]">
          {value}
        </p>

      </div>

    </div>
  );
}

function TimelineItem({
  title,
  description,
  completed,
  cancelled,
  last,
}) {
  return (
    <div className="flex gap-4">

      <div className="flex flex-col items-center">

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            cancelled
              ? "bg-red-50 text-red-500"
              : completed
              ? "bg-green-50 text-green-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {cancelled ? (
            <XCircle size={17} />
          ) : completed ? (
            <CheckCircle2 size={17} />
          ) : (
            <Circle size={14} />
          )}
        </div>

        {!last && (
          <div className="mt-1 h-10 w-px bg-slate-200" />
        )}

      </div>

      <div className="pb-5">

        <h3
          className={`text-sm font-semibold ${
            completed
              ? "text-[#14263D]"
              : "text-slate-400"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}