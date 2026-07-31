"use client";

import Link from "next/link";
import { use, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  FileText,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";

const serviceData = {
  electrician: {
    "12": {
      title: "Fan Repair & Installation",
      category: "Electrician",
      price: 499,
      priceType: "Fixed",
      duration: "1–2 hours",
    },

    "13": {
      title: "Switch & Socket Repair",
      category: "Electrician",
      price: 299,
      priceType: "Fixed",
      duration: "30–60 mins",
    },

    "14": {
      title: "Light Installation",
      category: "Electrician",
      price: 399,
      priceType: "Fixed",
      duration: "30–90 mins",
    },
  },

  plumber: {
    "15": {
      title: "Tap & Faucet Repair",
      category: "Plumber",
      price: 349,
      priceType: "Fixed",
      duration: "30–60 mins",
    },
  },

  "ac-repair": {
    "16": {
      title: "AC Inspection & Repair",
      category: "AC Repair",
      price: 1200,
      priceType: "Fixed",
      duration: "1–2 hours",
    },
  },

  carpenter: {
    "17": {
      title: "Furniture Repair",
      category: "Carpenter",
      price: 1000,
      priceType: "Fixed",
      duration: "1–3 hours",
    },
  },

  painting: {
    "18": {
      title: "Wall Painting",
      category: "Painting",
      price: 1500,
      priceType: "Fixed",
      duration: "Varies",
    },
  },
};

const timeSlots = [
  "9:00 AM – 11:00 AM",
  "11:00 AM – 1:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

export default function BookServicePage({ params }) {
  const { category, service } = use(params);

  const selectedService = serviceData[category]?.[service];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const today = new Date().toISOString().split("T")[0];

  if (!selectedService) {
    return (
      <main className="min-h-screen bg-[#F4F6F9] px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/customer/book-service/${category}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#14263D] transition hover:text-[#FF6B00]"
          >
            <ArrowLeft size={18} />
            Back to services
          </Link>

          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[#14263D]">
              Service not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              The selected service is currently unavailable.
            </p>
          </div>
        </div>
      </main>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!date || !time || !address || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      /*
       * Convert selected time slot into
       * PostgreSQL TIME format.
       */
      const timeMap = {
        "9:00 AM – 11:00 AM": "09:00:00",
        "11:00 AM – 1:00 PM": "11:00:00",
        "2:00 PM – 4:00 PM": "14:00:00",
        "4:00 PM – 6:00 PM": "16:00:00",
        "6:00 PM – 8:00 PM": "18:00:00",
      };

      const bookingTime = timeMap[time];

      /*
       * CREATE BOOKING IN BACKEND
       *
       * IMPORTANT:
       * Your backend route is:
       *
       * POST /api/bookings/create
       *
       * NOT:
       *
       * POST /api/bookings
       */
      const response = await fetch(
        `${API_BASE_URL}/bookings/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            service_id: Number(service),
            booking_date: date,
            booking_time: bookingTime,
            address: address,
            status: "Pending",
          }),
        }
      );

      /*
       * Read response safely.
       * This prevents the confusing
       * "Unexpected token <" error.
       */
      const contentType = response.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          `Backend returned a non-JSON response (${response.status}). ${text.slice(
            0,
            150
          )}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Booking failed"
        );
      }

      /*
       * Booking successfully created in database.
       */
      const backendBooking = data.booking;

      /*
       * Save booking locally temporarily
       * for confirmation page.
       */
      const booking = {
        id: backendBooking.id,
        service: selectedService.title,
        category: selectedService.category,
        service_id: Number(service),
        price: selectedService.price,
        priceType: selectedService.priceType,
        duration: selectedService.duration,
        date,
        time,
        address,
        phone,
        notes,
        status: backendBooking.status,
      };

      localStorage.setItem(
        "fieldflow_current_booking",
        JSON.stringify(booking)
      );

      /*
       * Keep a local copy for the existing
       * frontend bookings page.
       */
      const existingBookings = JSON.parse(
        localStorage.getItem("fieldflow_bookings") || "[]"
      );

      localStorage.setItem(
        "fieldflow_bookings",
        JSON.stringify([
          booking,
          ...existingBookings,
        ])
      );

      /*
       * Create notification through backend.
       *
       * If notification API is unavailable,
       * booking will still remain successful.
       */
      try {
        const notificationResponse = await fetch(
          "http://localhost:5000/api/notifications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: 1,
              message: `Your ${selectedService.title} booking has been created successfully.`,
            }),
          }
        );

        if (!notificationResponse.ok) {
          console.log(
            "Notification API returned:",
            notificationResponse.status
          );
        }
      } catch (notificationError) {
        console.log(
          "Notification could not be created:",
          notificationError
        );
      }

      /*
       * Go to confirmation page.
       */
      window.location.href =
        "/customer/booking-confirmation";
    } catch (error) {
      console.error("Booking Error:", error);

      alert(
        error.message ||
          "Booking failed. Please try again."
      );
    }
  }

  const isQuoteBased =
    selectedService.priceType === "Quote";

  return (
    <main className="min-h-screen bg-[#F4F6F9] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">

        {/* BACK BUTTON */}
        <Link
          href={`/customer/book-service/${category}/${service}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#14263D] transition hover:text-[#FF6B00]"
        >
          <ArrowLeft size={18} />
          Back to service details
        </Link>

        {/* PAGE HEADER */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-[#FF6B00]">
            {selectedService.category}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#14263D] sm:text-3xl">
            Book Your Service
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Schedule a convenient time for your service.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

            {/* LEFT SIDE */}
            <div className="space-y-5">

              {/* DATE AND TIME */}
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                    <CalendarDays
                      size={20}
                      className="text-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#14263D]">
                      Schedule Service
                    </h2>

                    <p className="text-xs text-slate-500">
                      Choose your preferred date and time
                    </p>
                  </div>
                </div>

                {/* DATE */}
                <label
                  htmlFor="service-date"
                  className="text-sm font-semibold text-[#14263D]"
                >
                  Select date{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  id="service-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                />

                {/* TIME */}
                <div className="mt-6">
                  <p className="text-sm font-semibold text-[#14263D]">
                    Select time{" "}
                    <span className="text-red-500">*</span>
                  </p>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                          time === slot
                            ? "border-[#FF6B00] bg-orange-50 text-[#FF6B00]"
                            : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-[#FF6B00]"
                        }`}
                      >
                        <Clock3 size={16} />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* ADDRESS */}
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                    <MapPin
                      size={20}
                      className="text-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#14263D]">
                      Service Location
                    </h2>

                    <p className="text-xs text-slate-500">
                      Where should the technician visit?
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-[#14263D]"
                >
                  Full address{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="address"
                  rows={4}
                  value={address}
                  onChange={(event) =>
                    setAddress(event.target.value)
                  }
                  placeholder="House / Flat number, street, area, city, PIN code"
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                />
              </section>

              {/* CONTACT */}
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                    <Phone
                      size={20}
                      className="text-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#14263D]">
                      Contact Information
                    </h2>

                    <p className="text-xs text-slate-500">
                      Contact number for the technician
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-[#14263D]"
                >
                  Phone number{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="Enter your phone number"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                />
              </section>

              {/* NOTES */}
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                    <FileText
                      size={20}
                      className="text-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#14263D]">
                      Additional Details
                    </h2>

                    <p className="text-xs text-slate-500">
                      Tell the technician about the problem
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="notes"
                  className="text-sm font-semibold text-[#14263D]"
                >
                  Notes
                </label>

                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  placeholder="Example: The fan is making a noise..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF6B00] focus:ring-2 focus:ring-orange-100"
                />
              </section>
            </div>

            {/* RIGHT SIDE */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <h2 className="text-lg font-bold text-[#14263D]">
                  Booking Summary
                </h2>

                {/* SERVICE */}
                <div className="mt-5 rounded-xl bg-[#F4F6F9] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Selected Service
                  </p>

                  <p className="mt-1 font-bold text-[#14263D]">
                    {selectedService.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedService.category}
                  </p>
                </div>

                {/* SUMMARY */}
                <div className="my-5 space-y-4">

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">
                      Service price
                    </span>

                    {isQuoteBased ? (
                      <span className="text-right text-sm font-semibold text-amber-600">
                        Quote after inspection
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-[#14263D]">
                        ₹{selectedService.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Duration
                    </span>

                    <span className="text-sm font-medium text-[#14263D]">
                      {selectedService.duration}
                    </span>
                  </div>

                  {date && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-500">
                        Date
                      </span>

                      <span className="text-right text-sm font-medium text-[#14263D]">
                        {date}
                      </span>
                    </div>
                  )}

                  {time && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-500">
                        Time
                      </span>

                      <span className="text-right text-sm font-medium text-[#14263D]">
                        {time}
                      </span>
                    </div>
                  )}
                </div>

                {/* TOTAL */}
                <div className="border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between gap-4">

                    <span className="font-semibold text-[#14263D]">
                      Total
                    </span>

                    {isQuoteBased ? (
                      <span className="text-right text-lg font-bold text-amber-600">
                        To be determined
                      </span>
                    ) : (
                      <span className="text-xl font-bold text-[#FF6B00]">
                        ₹{selectedService.price}
                      </span>
                    )}
                  </div>

                  {isQuoteBased && (
                    <p className="mt-2 text-right text-xs leading-5 text-slate-400">
                      Final price will be provided after technician
                      inspection.
                    </p>
                  )}
                </div>

                {/* CONFIRM */}
                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.98]"
                >
                  Confirm Booking
                  <CheckCircle2 size={18} />
                </button>

                {/* SECURITY */}
                <div className="mt-4 flex gap-2 rounded-xl bg-[#F4F6F9] p-3">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-[#FF6B00]"
                  />

                  <p className="text-[11px] leading-5 text-slate-500">
                    Your booking information is kept secure and
                    will only be used to arrange your service.
                  </p>
                </div>

              </section>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}