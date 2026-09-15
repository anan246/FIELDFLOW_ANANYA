"use client";

import { useState } from "react";

import BookingHero from "@/components/dispatcher/manualBooking/BookingHero";
import CustomerDetailsCard from "@/components/dispatcher/manualBooking/CustomerDetailsForm";
import ServiceDetailsCard from "@/components/dispatcher/manualBooking/ServiceDetailsForm";
import BookingSummary from "@/components/dispatcher/manualBooking/BookingSummary";
import ActionButtons from "@/components/dispatcher/manualBooking/ActionButtons";
import DashboardLayout from "@/components/dispatcher/DashboardLayout";

import { API_BASE_URL } from "@/lib/apiConfig";

export default function ManualBookingPage() {
  const initialState = {
    customer: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    service: "",
    priority: "",
    date: "",
    time: "",
    price: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleSubmit = async () => {
    if (
      !formData.customer ||
      !formData.phone ||
      !formData.address ||
      !formData.service ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill all required fields (Customer Name, Phone, Address, Service, Date, Time).");
      return;
    }

    const bookingId = Math.floor(Math.random() * 8000) + 1000;
    const newBookingObj = {
      id: bookingId,
      bookingId: bookingId,
      customer_name: formData.customer,
      customerName: formData.customer,
      customer: formData.customer,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city || "Bengaluru",
      pincode: formData.pincode || "560001",
      service_name: formData.service,
      serviceCategory: formData.service,
      service: formData.service,
      priority: formData.priority || "Normal",
      booking_date: formData.date,
      date: formData.date,
      booking_time: formData.time,
      time: formData.time,
      estimated_price: Number(formData.price) || 499,
      price: Number(formData.price) || 499,
      description: formData.description || "",
      status: "Pending",
      technician_name: "Unassigned",
      technician: "Unassigned",
      created_at: new Date().toISOString(),
    };

    try {
      await fetch(`${API_BASE_URL}/dispatcher/manual-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookingObj),
      });
    } catch (_) {}

    try {
      const { createNewBooking } = require("@/lib/realtimeStore");
      createNewBooking(newBookingObj);
    } catch (e) {
      console.error("Realtime sync error:", e);
    }

    // Save notification
    try {
      const notifs = JSON.parse(localStorage.getItem("dispatcher_notifications") || "[]");
      notifs.unshift({
        id: Date.now(),
        type: "booking",
        title: `New Manual Booking #${bookingId}`,
        message: `Created booking for ${formData.customer} (${formData.service})`,
        time: "Just now",
        read: false,
      });
      localStorage.setItem("dispatcher_notifications", JSON.stringify(notifs));
    } catch (_) {}

    alert(`🎉 Booking #${bookingId} Created Successfully!`);
    handleReset();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <BookingHero />

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <CustomerDetailsCard
            formData={formData}
            handleChange={handleChange}
          />

          <ServiceDetailsCard
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        <BookingSummary formData={formData} />

        <ActionButtons
          handleReset={handleReset}
          handleSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
}