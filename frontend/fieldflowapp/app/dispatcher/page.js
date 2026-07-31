"use client";

import DashboardLayout from "@/components/dispatcher/DashboardLayout";
import BookingHero from "@/components/dispatcher/bookings/BookingHero";
import BookingStats from "@/components/dispatcher/bookings/BookingStats";
import BookingTable from "@/components/dispatcher/bookings/BookingTable";

export default function DispatcherPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <BookingHero />
        <BookingStats />
        <BookingTable />
      </div>
    </DashboardLayout>
  );
}