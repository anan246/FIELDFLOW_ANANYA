
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  Wrench,
  ArrowRight,
  Home,
  ClipboardList,
} from "lucide-react";

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const savedBooking = localStorage.getItem(
      "fieldflow_current_booking"
    );

    if (savedBooking) {
      setBooking(JSON.parse(savedBooking));
    }
  }, []);

  /*
   * LOADING
   */
  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F6F9] px-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <CheckCircle2
              size={28}
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

  return (
    <main className="min-h-screen bg-[#F4F6F9] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">

        {/* SUCCESS HEADER */}
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2
              size={44}
              className="text-green-600"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#14263D] sm:text-3xl">
            Booking Confirmed!
          </h1>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Your service has been successfully booked. We&apos;ll make sure
            everything is ready for your scheduled appointment.
          </p>

          <div className="mt-4 inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold text-[#FF6B00]">
            Booking ID: {booking.bookingId}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* BOOKING DETAILS */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">

            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                <Wrench
                  size={21}
                  className="text-[#FF6B00]"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Service booked
                </p>

                <h2 className="mt-1 text-lg font-bold text-[#14263D]">
                  {booking.service}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {booking.category}
                </p>
              </div>

            </div>

            {/* DETAILS GRID */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {/* DATE */}
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F9]">
                  <CalendarDays
                    size={19}
                    className="text-[#FF6B00]"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#14263D]">
                    {new Date(booking.date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              {/* TIME */}
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F9]">
                  <Clock3
                    size={19}
                    className="text-[#FF6B00]"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Time
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#14263D]">
                    {booking.time}
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex gap-3 sm:col-span-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F9]">
                  <MapPin
                    size={19}
                    className="text-[#FF6B00]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Service Address
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold text-[#14263D]">
                    {booking.address}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    The technician will visit this location.
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F9]">
                  <Phone
                    size={19}
                    className="text-[#FF6B00]"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Contact
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#14263D]">
                    {booking.phone}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                  <CheckCircle2
                    size={19}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-green-600">
                    {booking.status}
                  </p>
                </div>
              </div>

              {/* NOTES */}
              {booking.notes && (
                <div className="flex gap-3 sm:col-span-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F9]">
                    <ClipboardList
                      size={19}
                      className="text-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Additional Details
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#14263D]">
                      {booking.notes}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* PAYMENT SUMMARY */}
          <section className="h-fit rounded-2xl bg-white p-5 shadow-sm sm:p-6">

            <h2 className="text-lg font-bold text-[#14263D]">
              Payment Summary
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500">
                  Service
                </span>

                <span className="text-right text-sm font-semibold text-[#14263D]">
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

              <div className="border-t border-slate-200 pt-4">

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
                Payment
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Payment details will be handled securely during the booking
                process.
              </p>

            </div>

          </section>
        </div>

        {/* WHAT HAPPENS NEXT */}
        <section className="mt-6 rounded-2xl bg-[#14263D] p-5 text-white shadow-sm sm:p-7">

          <h2 className="text-lg font-bold">
            What happens next?
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">

            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B00] text-sm font-bold">
                1
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                Booking confirmed
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-300">
                Your booking request has been received successfully.
              </p>
            </div>

            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B00] text-sm font-bold">
                2
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                Technician assigned
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-300">
                A verified technician will be assigned to your service.
              </p>
            </div>

            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B00] text-sm font-bold">
                3
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                Service visit
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-300">
                The technician will arrive at your selected time.
              </p>
            </div>

          </div>
        </section>

        {/* ACTION BUTTONS */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            href="/customer/bookings"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            <ClipboardList size={18} />
            View My Bookings
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/customer/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#14263D] transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
          >
            <Home size={18} />
            Back to Dashboard
          </Link>

        </div>

      </div>
    </main>
  );
}

