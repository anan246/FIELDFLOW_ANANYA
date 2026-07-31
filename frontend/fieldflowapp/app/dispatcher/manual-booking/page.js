"use client";

import { useState } from "react";

import BookingHero from "@/components/dispatcher/manualBooking/BookingHero";
import CustomerDetailsCard from "@/components/dispatcher/manualBooking/CustomerDetailsForm";
import ServiceDetailsCard from "@/components/dispatcher/manualBooking/ServiceDetailsForm";
import BookingSummary from "@/components/dispatcher/manualBooking/BookingSummary";
import ActionButtons from "@/components/dispatcher/manualBooking/ActionButtons";
import DashboardLayout from "@/components/dispatcher/DashboardLayout";

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
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/dispatcher/manual-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_name: formData.customer,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode,

            service_name: formData.service,
            priority: formData.priority || "Normal",

            booking_date: formData.date,
            booking_time: formData.time,

            estimated_price: Number(formData.price) || 0,
            description: formData.description,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to create booking.");
        return;
      }

      alert("Booking Created Successfully!");

      handleReset();
    } catch (error) {
      console.error("Manual Booking Error:", error);
      alert("Server Error. Please try again.");
    }
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