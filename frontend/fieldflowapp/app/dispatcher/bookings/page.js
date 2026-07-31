"use client";

import DashboardLayout from "@/components/dispatcher/DashboardLayout";

import BookingHero from "@/components/dispatcher/bookings/BookingHero";
import BookingStats from "@/components/dispatcher/bookings/BookingStats";
import BookingFilters from "@/components/dispatcher/bookings/BookingFilters";
import BookingTable from "@/components/dispatcher/bookings/BookingTable";

export default function BookingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Hero Section */}
        <BookingHero />

        {/* Statistics */}
        <BookingStats />

        

        {/* Booking Table */}
        <BookingTable />

      </div>
    </DashboardLayout>
  );
}