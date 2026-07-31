"use client";

import CustomerSidebar from "@/components/customer/dashboard/CustomerSidebar";
import DashboardTopbar from "@/components/customer/dashboard/DashboardTopbar";

import WelcomeBanner from "@/components/customer/dashboard/WelcomeBanner";
import StatsCards from "@/components/customer/dashboard/StatsCards";
import UpcomingBooking from "@/components/customer/dashboard/UpcomingBooking";
import ServiceCategories from "@/components/customer/dashboard/ServiceCategories";
import RecentBookings from "@/components/customer/dashboard/RecentBookings";
import NotificationPreview from "@/components/customer/dashboard/NotificationPreview";
import QuickActions from "@/components/customer/dashboard/QuickActions";

export default function CustomerDashboard() {
  return (
    <main
      className="min-h-screen bg-[#F4F6F9] bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(244,246,249,0.94),
            rgba(244,246,249,0.96)
          ),
          url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoAzdXycjZ1zEz-k_Uzx0aZKDKZs18JaI1B5gnognqA&s=10")
        `,
      }}
    >
      {/* FIXED CUSTOMER SIDEBAR */}
      <CustomerSidebar />

      {/* MAIN CONTENT */}
      <div className="min-h-screen lg:ml-64">

        <DashboardTopbar />

        <div className="px-4 pb-10 pt-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-[1450px]">

            {/* HERO + UPCOMING BOOKING */}
            <div className="grid gap-5 xl:grid-cols-[1fr_350px]">
              <WelcomeBanner />
              <UpcomingBooking />
            </div>

            {/* STATISTICS */}
            <div className="mt-5">
              <StatsCards />
            </div>

            {/* POPULAR SERVICES */}
            <div className="mt-7">
              <ServiceCategories />
            </div>

            {/* BOOKINGS + NOTIFICATIONS */}
            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_350px]">
              <RecentBookings />
              <NotificationPreview />
            </div>

            {/* QUICK ACTIONS */}
            <div className="mt-5">
              <QuickActions />
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}