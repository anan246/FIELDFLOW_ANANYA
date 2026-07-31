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

const INITIAL_DEMO_BOOKINGS = [
  {
    id: "BK1042",
    customer: "Rahul Sharma",
    service: "Electrical Repair",
    location: "MG Road, Bengaluru",
    phone: "9876543210",
    technician: "Ravi Kumar",
    status: "Pending",
    priority: "Emergency",
  },
  {
    id: "BK1041",
    customer: "Priya Singh",
    service: "AC Servicing",
    location: "Indiranagar, Bengaluru",
    phone: "9123456789",
    technician: "Not Assigned",
    status: "Pending",
    priority: "Normal",
  },
  {
    id: "BK1040",
    customer: "Suresh Nair",
    service: "Plumbing Repair",
    location: "Whitefield, Bengaluru",
    phone: "9988776655",
    technician: "Suresh Nair",
    status: "In Progress",
    priority: "Normal",
  },
  {
    id: "BK1039",
    customer: "Kiran Rao",
    service: "Home Painting",
    location: "Koramangala, Bengaluru",
    phone: "9765432100",
    technician: "Kiran Rao",
    status: "Completed",
    priority: "Normal",
  },
];

export default function BookingTable() {

  const [bookings, setBookings] = useState(INITIAL_DEMO_BOOKINGS);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assignBooking, setAssignBooking] = useState(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
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

      try {
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        if (stored.role === "customer" && stored.name) {
          const exists = formattedBookings.some((b) => b.customer?.toLowerCase() === stored.name?.toLowerCase());
          if (!exists) {
            formattedBookings.unshift({
              id: "BK1043",
              customer: stored.name,
              phone: stored.phone || "9876543210",
              service: "Home Service",
              location: stored.address ? `${stored.address}, ${stored.city || ""}` : (stored.city || "Bengaluru"),
              technician: "Not Assigned",
              status: "Pending",
              priority: "Emergency",
            });
          }
        }
      } catch (_) {}

      setBookings([...formattedBookings, ...INITIAL_DEMO_BOOKINGS]);
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
      const response = await fetch(
        `${API_BASE_URL}/dispatcher/assign-technician`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: bookingId,
            technician_id: technicianId,
            assigned_by: "Dispatcher",
          }),
        }
      );

      const result = await response.json();

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, technician: techName || "Assigned Technician", status: "Assigned" }
            : b
        )
      );

      alert(`Technician ${techName || ""} assigned successfully!`);
      setAssignBooking(null);
      setIsAssignOpen(false);
    } catch (error) {
      console.error(error);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, technician: techName || "Assigned Technician", status: "Assigned" }
            : b
        )
      );
      setAssignBooking(null);
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-lg border border-gray-200 overflow-hidden">

  {/* Header */}

  <div className="bg-gradient-to-r from-[#08263B] to-[#10364F] px-8 py-7 text-white flex flex-col md:flex-row md:justify-between md:items-center gap-6">

    <div>

      <h2 className="text-3xl font-bold">
        Bookings
      </h2>

      <p className="mt-2 text-gray-300">
        Monitor customer bookings and their current status.
      </p>

    </div>

    <div className="flex gap-4">

      <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

        <p className="text-xs text-gray-300">
          Total Bookings
        </p>

        <h3 className="text-3xl font-bold">
          {bookings.length}
        </h3>

      </div>

      <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

        <p className="text-xs text-gray-300">
          Pending
        </p>

        <h3 className="text-3xl font-bold text-orange-400">
          {
            bookings.filter(
              booking => booking.status === "Pending"
            ).length
          }
        </h3>

      </div>

    </div>

  </div>

  {/* Loading */}

  {loading ? (

    <div className="p-10 text-center text-lg">
      Loading bookings...
    </div>

  ) : (

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-50">

          <tr className="text-left text-sm uppercase tracking-wide text-gray-500 border-b">

            <th className="px-6 py-4">Booking</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Service</th>
            <th className="px-6 py-4">Location</th>
            <th className="px-6 py-4">Technician</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Action</th>

          </tr>

        </thead>

        <tbody>

          {bookings.map((booking) => (

            <tr
              key={booking.id}
              className="border-b border-gray-100 hover:bg-slate-50 transition"
            >

              <td className="px-6 py-5">

                <div className="flex flex-col">

                  <span className="font-bold text-[#08263B]">
                    #{booking.id}
                  </span>

                  {booking.priority === "Emergency" && (

                    <span className="mt-2 flex w-fit items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-[11px] font-semibold text-red-600">

                      <AlertTriangle size={12} />

                      Emergency

                    </span>

                  )}

                </div>

              </td>

              <td className="px-6 py-5">

                <h4 className="font-semibold text-[#08263B]">
                  {booking.customer}
                </h4>

                <p className="text-sm text-gray-500">
                  {booking.phone}
                </p>

              </td>

              <td className="px-6 py-5">
                {booking.service}
              </td>

              <td className="px-6 py-5">

                <div className="flex items-center gap-2">

                  <MapPin
                    size={15}
                    className="text-orange-500"
                  />

                  {booking.location}

                </div>

              </td>

              <td className="px-6 py-5">

                {booking.technician === "Not Assigned"

                  ? "—"

                  : booking.technician}

              </td>

              <td className="px-6 py-5">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[booking.status]}`}
                >
                  {booking.status}
                </span>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => handleView(booking)}
                    className="rounded-xl bg-[#08263B] px-4 py-2 text-white hover:bg-[#10364F]"
                  >
                    <Eye size={16} />
                  </button>

                  {booking.status === "Pending" && (

                    <button
                      onClick={() => handleAssign(booking)}
                      className="rounded-xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                    >
                      Assign
                    </button>

                  )}

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

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
    onAssign={assignTechnician}
  />

</div>

);
}