"use client";

import { useEffect, useState } from "react";
import { Search, Calendar, Clock, X, CheckCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiConfig";
import {
  getStoredData,
  subscribeRealtimeEvents,
  assignTechnicianToBooking,
  getGlobalSearchQuery,
  setGlobalSearchQuery,
} from "@/lib/realtimeStore";
import AssignTechnicianModal from "./bookings/AssignTechnician";

export default function PendingBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const fetchPendingBookings = async () => {
    let list = [];

    // 1. Fetch from API
    try {
      const res = await fetch(`${API_BASE_URL}/dispatcher/pending-bookings?_=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          list = data.map((b) => ({
            id: b.id,
            bookingId: b.id,
            customer_name: b.customer_name || b.customer || "Customer",
            customer: b.customer_name || b.customer || "Customer",
            service_name: b.service_name || b.service || "Home Service",
            service: b.service_name || b.service || "Home Service",
            booking_date: b.booking_date || b.date || new Date().toISOString(),
            date: b.booking_date || b.date || "Today",
            booking_time: b.booking_time || b.time || "10:30 AM",
            time: b.booking_time || b.time || "10:30 AM",
            address: b.address || b.location || "Bengaluru",
            location: b.address || b.location || "Bengaluru",
            status: b.status || "Pending",
          }));
        }
      }
    } catch (_) {}

    // 2. Merge local storage customer bookings
    const localBookings = getStoredData("customer_bookings", []);
    localBookings.forEach((cb) => {
      const bId = cb.id || cb.bookingId;
      const existingIdx = list.findIndex((item) => String(item.id) === String(bId));
      if (existingIdx === -1) {
        if (!cb.status || cb.status.toLowerCase() === "pending") {
          list.unshift({
            id: bId,
            bookingId: bId,
            customer_name: cb.customer_name || cb.customer || "Customer",
            customer: cb.customer_name || cb.customer || "Customer",
            service_name: cb.service_name || cb.service || "Home Service",
            service: cb.service_name || cb.service || "Home Service",
            booking_date: cb.booking_date || cb.date || "Today",
            date: cb.booking_date || cb.date || "Today",
            booking_time: cb.booking_time || cb.time || "10:30 AM",
            time: cb.booking_time || cb.time || "10:30 AM",
            address: cb.address || cb.location || "Bengaluru",
            location: cb.address || cb.location || "Bengaluru",
            status: cb.status || "Pending",
          });
        }
      } else {
        list[existingIdx].status = cb.status || list[existingIdx].status;
      }
    });

    // Filter only pending items for this panel
    const pendingList = list.filter((b) => (b.status || "").toLowerCase() === "pending");
    setBookings(pendingList);
  };

  useEffect(() => {
    fetchPendingBookings();
    setSearch(getGlobalSearchQuery("dispatcher"));

    const interval = setInterval(fetchPendingBookings, 3000);
    const unsubscribe = subscribeRealtimeEvents((type, payload) => {
      fetchPendingBookings();
      if (type === "fieldflow_search_update" && (payload.role === "dispatcher" || payload.role === "global")) {
        setSearch(payload.query || "");
      }
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const handleSearchChange = (val) => {
    setSearch(val);
    setGlobalSearchQuery(val, "dispatcher");
  };

  const handleOpenAssignModal = (booking) => {
    setSelectedBooking(booking);
    setIsAssignModalOpen(true);
  };

  const handleAssignTechnician = async (bookingId, techId, techName) => {
    assignTechnicianToBooking(bookingId, techId, techName, "Dispatcher");
    try {
      await fetch(`${API_BASE_URL}/dispatcher/assign-technician`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: bookingId, technician_id: techId, technician_name: techName }),
      });
    } catch (_) {}

    setIsAssignModalOpen(false);
    setSelectedBooking(null);
    fetchPendingBookings();
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      (booking.customer_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (booking.service_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (booking.address || "").toLowerCase().includes(search.toLowerCase()) ||
      String(booking.id).includes(search)
  );

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-[#08263B]">Pending Bookings</h2>
          <p className="text-gray-500 text-sm mt-1">Assign technicians to pending service requests.</p>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search pending..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="bg-slate-100 rounded-xl py-3 pl-11 pr-8 text-sm outline-none focus:ring-2 focus:ring-orange-500"
          />
          {search && (
            <button onClick={() => handleSearchChange("")} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead className="bg-slate-50">
            <tr className="text-left text-gray-500">
              <th className="px-6 py-4">Booking</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Schedule</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-t hover:bg-orange-50/50 transition">
                <td className="px-6 py-5 font-semibold text-[#08263B]">#{booking.id}</td>
                <td className="px-6 text-slate-800 font-medium">{booking.customer_name}</td>
                <td className="px-6 text-slate-700">{booking.service_name}</td>
                <td className="px-6">
                  <div className="flex flex-col gap-1 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar size={13} className="text-slate-400" />
                      {booking.date || "Today"}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock size={13} className="text-slate-400" />
                      {booking.booking_time || "10:30 AM"}
                    </span>
                  </div>
                </td>
                <td className="px-6">
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold capitalize">
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 text-center">
                  <button
                    type="button"
                    onClick={() => handleOpenAssignModal(booking)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-md shadow-orange-500/20"
                  >
                    Assign Technician
                  </button>
                </td>
              </tr>
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500 font-medium text-sm">
                  No pending bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AssignTechnicianModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        booking={selectedBooking}
        onAssign={handleAssignTechnician}
      />
    </div>
  );
}
