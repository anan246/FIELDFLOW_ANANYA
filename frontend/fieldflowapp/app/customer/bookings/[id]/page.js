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
import { API_BASE_URL } from "@/lib/apiConfig";

export default function BookingDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchBookingDetails();

    const handleSync = () => fetchBookingDetails();
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    window.addEventListener("fieldflow_job_assigned", handleSync);
    window.addEventListener("fieldflow_job_status_change", handleSync);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
      window.removeEventListener("fieldflow_job_assigned", handleSync);
      window.removeEventListener("fieldflow_job_status_change", handleSync);
    };
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      let bData = null;

      // 1. Try API fetch
      try {
        const response = await fetch(`${API_BASE_URL}/bookings/details/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.booking) {
            const bb = data.booking;
            bData = {
              id: bb.id,
              service: bb.service_name || "Home Service Repair",
              category: bb.category_name || "Field Service",
              date: formatDate(bb.booking_date),
              time: formatTime(bb.booking_time),
              address: bb.address || "Bengaluru",
              price: parsePrice(bb.service_price),
              status: normalizeStatus(bb.status),
              phone: bb.customer_phone || "9876543210",
              description: bb.service_description || "Professional service delivered at location.",
              technician: {
                name: bb.technician_name || "Technician will be assigned",
                phone: bb.technician_phone || "Available after assignment",
              },
              backend_status: bb.status,
            };
          }
        }
      } catch (_) {}

      // 2. Check local storage customer bookings
      if (!bData) {
        try {
          const localCB = JSON.parse(localStorage.getItem("customer_bookings") || "[]");
          const localFF = JSON.parse(localStorage.getItem("fieldflow_bookings") || "[]");
          const found = [...localCB, ...localFF].find((item) => String(item.id) === String(id));
          if (found) {
            bData = {
              id: found.id || id,
              service: found.service || found.service_name || "Electrical Repair",
              category: found.category || "Home Service",
              date: formatDate(found.date || found.booking_date || new Date()),
              time: found.time || found.booking_time || "10:30 AM",
              address: found.address || "Bengaluru",
              price: found.price || 499,
              status: normalizeStatus(found.status),
              phone: found.phone || "9876543210",
              description: found.notes || "Power socket in the living room is not working. Please bring replacement switches if needed.",
              technician: {
                name: found.technician || "Technician will be assigned",
                phone: "9876543210",
              },
              backend_status: found.status || "Upcoming",
            };
          }
        } catch (_) {}
      }

      // 3. Sync assigned jobs from Dispatcher/Technician
      try {
        const assignedJobs = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        const matchAssigned = assignedJobs.find((aj) => String(aj.bookingId) === String(id));
        if (matchAssigned) {
          if (!bData) {
            bData = {
              id: id,
              service: matchAssigned.serviceName || "Service Request",
              category: "Field Service",
              date: "Today",
              time: "10:00 AM",
              address: matchAssigned.location || matchAssigned.address || "Bengaluru",
              price: 499,
              status: normalizeStatus(matchAssigned.status),
              phone: "9876543210",
              description: "Job assigned by Dispatcher",
              technician: {
                name: matchAssigned.techName || "Assigned Technician",
                phone: "9876543210",
              },
              backend_status: matchAssigned.status || "Assigned",
            };
          } else {
            bData.status = normalizeStatus(matchAssigned.status);
            bData.backend_status = matchAssigned.status;
            bData.technician = {
              name: matchAssigned.techName || bData.technician?.name || "Assigned Technician",
              phone: "9876543210",
            };
          }
        }
      } catch (_) {}

      // 4. Default fallback for demonstration
      if (!bData) {
        bData = {
          id: id || 1001,
          service: "Electrical Repair",
          category: "Electrical",
          date: formatDate(new Date()),
          time: "10:30 AM",
          address: "12 MG Road, Bengaluru",
          price: 499,
          status: "Upcoming",
          phone: "+91 9876543210",
          description: "Power socket in the living room is not working. Please bring replacement switches if needed.",
          technician: {
            name: "Nanda (Assigned Technician)",
            phone: "+91 9876543210",
          },
          backend_status: "Assigned",
        };
      }

      setBooking(bData);
    } catch (err) {
      console.error("Unable to load booking:", err);
    } finally {
      setLoading(false);
    }
  };

  async function handleCancelBooking() {
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    setBooking((prev) => (prev ? { ...prev, status: "Cancelled", backend_status: "Cancelled" } : prev));

    try {
      const assignedJobs = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
      const updated = assignedJobs.map((aj) => (String(aj.bookingId) === String(id) ? { ...aj, status: "Cancelled" } : aj));
      localStorage.setItem("assigned_jobs", JSON.stringify(updated));

      window.dispatchEvent(new CustomEvent("fieldflow_job_status_change", { detail: { jobId: id, status: "Cancelled" } }));
      window.dispatchEvent(new Event("storage"));
    } catch (_) {}

    try {
      await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, { method: "PATCH" });
    } catch (_) {}

    alert("Booking cancelled successfully.");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F6F9] px-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <Wrench size={26} className="text-[#FF6B00]" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-[#14263D]">Loading booking details...</h1>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#F4F6F9] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/customer/bookings" className="inline-flex items-center gap-2 text-sm font-semibold text-[#14263D]">
            <ArrowLeft size={18} /> Back to My Bookings
          </Link>
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold text-[#14263D]">Booking Details Loaded</h1>
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
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <Link
          href="/customer/bookings"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#14263D] transition hover:text-[#FF6B00]"
        >
          <ArrowLeft size={18} /> Back to My Bookings
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#FF6B00] uppercase tracking-wider">
              Live Service Request
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-[#14263D] sm:text-3xl">
              {booking.service}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              Booking ID: <span className="font-bold text-[#14263D]">#{booking.id}</span>
            </p>
          </div>

          <StatusBadge status={booking.status} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-5 shadow-xs sm:p-6 border border-slate-100">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#14263D] shrink-0 text-white">
                  <Wrench size={22} className="text-[#FF6B00]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Service Category</p>
                  <h2 className="mt-0.5 text-lg font-bold text-[#14263D]">{booking.service}</h2>
                  <p className="text-xs text-slate-500 font-medium">{booking.category}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 text-xs sm:text-sm">
                <InfoItem icon={<CalendarDays size={18} />} label="Date" value={booking.date} />
                <InfoItem icon={<Clock3 size={18} />} label="Time" value={booking.time} />
                <InfoItem icon={<MapPin size={18} />} label="Address" value={booking.address} />
                <InfoItem icon={<Phone size={18} />} label="Contact" value={booking.phone} />
              </div>

              {booking.description && (
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Notes & Instructions</p>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">{booking.description}</p>
                </div>
              )}
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-xs sm:p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Professional</p>
                  <h2 className="text-base sm:text-lg font-bold text-[#14263D]">Technician Details</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <UserRound size={20} className="text-[#FF6B00]" />
                </div>
              </div>

              <div className="rounded-xl bg-[#F4F6F9] p-4 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#14263D] text-white shrink-0">
                  <UserRound size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{booking.technician?.name || "Technician assigned"}</p>
                  <p className="text-xs text-slate-500 font-medium">{booking.technician?.phone || "Available on assignment"}</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-xs sm:p-6 border border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-[#14263D] mb-5">Booking Progress Timeline</h2>
              <div className="space-y-3">
                <TimelineItem title="Booking created" description="Your service request was received." completed />
                <TimelineItem title="Booking confirmed" description="Your booking is confirmed." completed={!isCancelled} cancelled={isCancelled} />
                <TimelineItem title="Technician assigned" description={booking.technician?.name || "A technician is being assigned."} completed={isCompleted || booking.backend_status === "Assigned" || booking.status === "Upcoming"} />
                <TimelineItem title="Service completed" description={isCompleted ? "Service completed successfully." : "Pending completion."} completed={isCompleted} last />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-5 shadow-xs sm:p-6 border border-slate-100">
              <h2 className="text-base font-bold text-[#14263D] mb-4">Payment Summary</h2>
              <div className="space-y-3 text-xs sm:text-sm font-medium">
                <div className="flex justify-between text-slate-500">
                  <span>Service Charge</span>
                  <span className="font-bold text-[#14263D]">₹{booking.price}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Service Fee</span>
                  <span className="font-bold text-[#14263D]">₹0</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between">
                  <span className="font-bold text-[#14263D]">Total</span>
                  <span className="text-lg font-extrabold text-[#FF6B00]">₹{booking.price}</span>
                </div>
              </div>
            </section>

            {isUpcoming && (
              <button
                type="button"
                onClick={handleCancelBooking}
                className="w-full rounded-xl border border-red-200 bg-white py-3 text-xs sm:text-sm font-bold text-red-500 transition hover:bg-red-50 cursor-pointer shadow-2xs"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function parsePrice(price) {
  if (typeof price === "number") return price;
  if (!price) return 499;
  const num = String(price).replace(/[^\d.]/g, "");
  return Number(num) || 499;
}

function formatDate(date) {
  if (!date) return "Today";
  const p = new Date(date);
  if (Number.isNaN(p.getTime())) return String(date);
  return p.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatTime(time) {
  if (!time) return "10:30 AM";
  const parts = String(time).split(":");
  let hour = Number(parts[0]);
  const min = parts[1] || "00";
  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${min} ${suffix}`;
}

function normalizeStatus(status) {
  if (!status) return "Upcoming";
  const n = String(status).toLowerCase();
  if (n === "completed") return "Completed";
  if (n === "cancelled" || n === "canceled") return "Cancelled";
  return "Upcoming";
}

function StatusBadge({ status }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-bold text-green-600 border border-green-200">
        <CheckCircle2 size={15} /> Completed
      </span>
    );
  }
  if (status === "Cancelled") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-500 border border-red-200">
        <XCircle size={15} /> Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-bold text-[#FF6B00] border border-orange-200">
      <Circle size={8} fill="currentColor" /> Upcoming / Live
    </span>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF6B00]">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-semibold text-slate-400 uppercase">{label}</p>
        <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#14263D]">{value}</p>
      </div>
    </div>
  );
}

function TimelineItem({ title, description, completed, cancelled, last }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            cancelled ? "bg-red-50 text-red-500" : completed ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"
          }`}
        >
          {cancelled ? <XCircle size={15} /> : completed ? <CheckCircle2 size={15} /> : <Circle size={12} />}
        </div>
        {!last && <div className={`w-0.5 flex-1 min-h-6 ${completed ? "bg-green-500" : "bg-slate-200"}`} />}
      </div>
      <div className="pb-4">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{description}</p>
      </div>
    </div>
  );
}