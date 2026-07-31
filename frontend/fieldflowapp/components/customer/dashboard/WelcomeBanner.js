"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";

export default function WelcomeBanner() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
  }, []);

  const userName = user?.name || "Customer";

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#14263D] shadow-lg">

      {/* Orange glow */}
      <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#FF6B00]/20" />

      <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full border-[35px] border-[#FF6B00]/10" />

      <div className="absolute right-8 top-8 opacity-10">
        <Sparkles size={110} className="text-white" />
      </div>

      <div className="relative p-6 sm:p-7 lg:p-8">

        <div className="flex items-center gap-2 text-sm font-medium text-orange-300">
          <span>Welcome Back</span>
          <span>👋</span>
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Hello, {userName}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
          Book trusted professionals, track your services,
          and manage all your home service requests from one place.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">

          <Link
            href="/customer/book-service"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600"
          >
            Book Service
            <ArrowRight size={17} />
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-300">
            <CalendarDays size={17} className="text-[#FF6B00]" />
            Manage your bookings easily
          </div>

        </div>

      </div>

    </section>
  );
}