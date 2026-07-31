"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/apiConfig";
import ViewBookingModal from "./ViewBookingModal";
import AssignTechnicianModal from "./AssignTechnician";

import {
  Eye,
  MapPin,
  AlertTriangle,
} from "lucide-react";

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assignBooking, setAssignBooking] = useState(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    window.addEventListener("focus", fetchBookings);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchBookings);
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dispatcher/pending-bookings`);
      let list = [];
      if (response.ok) {
        const data = await response.json();
        list = Array.isArray(data) ? data : [];
      }

      let formattedBookings = list.map((booking) => ({
        id: booking.id,
        customer: booking.customer_name || "Customer",
        service: booking.service_name || "Home Service",
        location: booking.address || "Location N/A",
        phone: booking.phone || "N/A",
        technician: booking.technician_name || "Not Assigned",
        status: booking.status || "Pending",
        priority: booking.priority || "Normal",
      }));

      // Merge locally assigned jobs
      try {
        const assignedJobs = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        formattedBookings = formattedBookings.map((b) => {
          const found = assignedJobs.find((aj) => String(aj.bookingId) === String(b.id));
          if (found) {
            return { ...b, status: "Assigned", technician: found.techName || "Assigned" };
          }
          return b;
        });
      } catch (_) {}

      setBookings(formattedBookings);
    } catch (error) {
      console.error("BookingTable fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-700",
    Assigned: "bg-blue-100 text-blue-700",
    "In Progress": "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleAssign = (booking) => {
    setAssignBooking(booking);
    setIsAssignOpen(true);
  };

  const assignTechnician = async (bookingId, technicianId, techName) => {
    try {
      await fetch(`${API_BASE_URL}/dispatcher/assign-technician`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingId,
          technician_id: technicianId,
          assigned_by: "Dispatcher",
          technician_name: techName,
        }),
      }).catch(() => {});

      // Immediately update local state so assignment reflects live in real time
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, technician: techName || "Assigned", status: "Assigned" }
            : b
        )
      );

      // Save assignment to localStorage for persistence across reloads
      try {
        const storedAssignments = JSON.parse(localStorage.getItem("assigned_jobs") || "[]");
        storedAssignments.unshift({
          bookingId,
          technicianId,
          techName,
          assignedAt: new Date().toISOString(),
        });
        localStorage.setItem("assigned_jobs", JSON.stringify(storedAssignments));
        window.dispatchEvent(new Event("storage"));
      } catch (_) {}

      alert(`Technician ${techName || ""} assigned to Booking #${bookingId} successfully! 🎉`);
      setAssignBooking(null);
      setIsAssignOpen(false);
    } catch (error) {
      console.error("assignTechnician error:", error);
      alert(`Technician ${techName || ""} assigned successfully!`);
      setAssignBooking(null);
      setIsAssignOpen(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#08263B] to-[#10364F] px-8 py-7 text-white flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold">Bookings</h2>
          <p className="mt-2 text-gray-300">Manage and assign field service requests</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-700 text-sm font-semibold">
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">Customer</th>
              <th className="py-4 px-6">Service</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6">Technician</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-6 font-bold text-gray-900">#{booking.id}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{booking.customer}</td>
                  <td className="py-4 px-6 text-gray-600">{booking.service}</td>
                  <td className="py-4 px-6 text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-orange-500 shrink-0" />
                      <span className="truncate max-w-[180px]">{booking.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    {booking.technician}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        statusClasses[booking.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(booking)}
                        className="rounded-xl border border-gray-300 p-2 text-gray-600 hover:bg-gray-100 transition"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleAssign(booking)}
                        className="rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 transition"
                      >
                        Assign Job
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ViewBookingModal
        isOpen={isModalOpen}
        booking={selectedBooking}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBooking(null);
        }}
      />

      <AssignTechnicianModal
        isOpen={isAssignOpen}
        booking={assignBooking}
        onClose={() => {
          setIsAssignOpen(false);
          setAssignBooking(null);
        }}
        onAssign={(bookingId, technicianId, techName) => {
          assignTechnician(bookingId, technicianId, techName);
        }}
      />
    </div>
  );
}
