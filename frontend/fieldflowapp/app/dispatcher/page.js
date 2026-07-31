"use client";

import DashboardLayout from "@/components/dispatcher/DashboardLayout";
import HeroBanner from "@/components/dispatcher/HeroBanner";
import StatsCards from "@/components/dispatcher/StatsCards";

export default function DispatcherPage() {
  return (
    <DashboardLayout>
      <HeroBanner />

      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2">
          
        </div>

        <div>
          
        </div>
      </div>

      
    </DashboardLayout>
  );
}