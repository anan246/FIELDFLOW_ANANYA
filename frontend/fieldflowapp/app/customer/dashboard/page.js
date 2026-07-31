"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Wrench,
  Snowflake,
  Paintbrush,
  Hammer,
  Sparkles
} from "lucide-react";

export default function CustomerDashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Fallback default
    }
  }, []);

  const userName = user?.name || "Madhushri";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Section: Banner & Upcoming Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Welcome Banner Card */}
        <div className="lg:col-span-8 bg-[#111F36] rounded-2xl p-7 text-white relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[240px]">
          {/* Background Decorative Shapes matching screenshot */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden opacity-25">
            {/* Dark translucent circle vector shape */}
            <div className="absolute -right-10 -bottom-16 w-64 h-64 rounded-full border-[28px] border-amber-500/20" />
            <div className="absolute right-12 top-6 w-32 h-32 rounded-full border-[16px] border-amber-500/15" />
            {/* Sparkle graphic */}
            <svg
              className="absolute right-16 top-10 w-24 h-24 text-amber-400/30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          <div className="relative z-10">
            <p className="text-[#F59E0B] font-medium text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
              Welcome Back 👋
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 tracking-tight">
              Hello, {userName}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-md leading-relaxed font-normal">
              Book trusted professionals, track your services, and manage all your home service requests from one place.
            </p>
          </div>

          <div className="relative z-10 mt-6 flex items-center gap-5 flex-wrap">
            <Link
              href="/services"
              className="bg-[#FF6000] hover:bg-[#E55600] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
            >
              Book Service <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/customer/bookings"
              className="text-slate-300 hover:text-white text-xs sm:text-sm font-medium flex items-center gap-2 transition"
            >
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Manage your bookings easily</span>
            </Link>
          </div>
        </div>

        {/* Upcoming Booking Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 flex flex-col justify-between min-h-[240px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[#FF6000] text-xs font-semibold tracking-wide">
                Upcoming Booking
              </span>
              <span className="bg-emerald-100 text-emerald-600 px-3 py-0.5 rounded-full text-xs font-semibold">
                Assigned
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-2">AC Repair</h3>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>30 July 2026</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>10:30 AM</span>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>Rahul Sharma</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span className="truncate max-w-[120px]">JP Nagar, Bengaluru</span>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/customer/bookings"
            className="bg-[#FF6000] hover:bg-[#E55600] text-white w-full py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2 mt-5 text-center"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-slate-500 text-xs font-semibold">Total Bookings</p>
            <h4 className="text-3xl font-extrabold text-slate-900 mt-1">24</h4>
            <p className="text-emerald-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
              +2 This Week
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-slate-500 text-xs font-semibold">Active Services</p>
            <h4 className="text-3xl font-extrabold text-slate-900 mt-1">3</h4>
            <p className="text-emerald-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
              +2 This Week
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-slate-500 text-xs font-semibold">Completed</p>
            <h4 className="text-3xl font-extrabold text-slate-900 mt-1">19</h4>
            <p className="text-emerald-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
              +2 This Week
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-slate-500 text-xs font-semibold">Emergency</p>
            <h4 className="text-3xl font-extrabold text-slate-900 mt-1">2</h4>
            <p className="text-emerald-600 text-xs font-semibold mt-2.5 flex items-center gap-1">
              +2 This Week
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#111F36] text-white flex items-center justify-center shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Popular Services Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-slate-900">Popular Services</h3>
          <Link
            href="/services"
            className="text-[#FF6000] text-sm font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Service 1 */}
          <Link
            href="/services?cat=electrical"
            className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all group h-32"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100/70 text-[#FF6000] flex items-center justify-center mb-2.5 group-hover:bg-[#FF6000] group-hover:text-white transition-all shadow-2xs">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Electrical</span>
          </Link>

          {/* Service 2 */}
          <Link
            href="/services?cat=plumbing"
            className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all group h-32"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100/70 text-[#FF6000] flex items-center justify-center mb-2.5 group-hover:bg-[#FF6000] group-hover:text-white transition-all shadow-2xs">
              <Wrench className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Plumbing</span>
          </Link>

          {/* Service 3 */}
          <Link
            href="/services?cat=ac-repair"
            className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all group h-32"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100/70 text-[#FF6000] flex items-center justify-center mb-2.5 group-hover:bg-[#FF6000] group-hover:text-white transition-all shadow-2xs">
              <Snowflake className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">AC Repair</span>
          </Link>

          {/* Service 4 */}
          <Link
            href="/services?cat=painting"
            className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all group h-32"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100/70 text-[#FF6000] flex items-center justify-center mb-2.5 group-hover:bg-[#FF6000] group-hover:text-white transition-all shadow-2xs">
              <Paintbrush className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Painting</span>
          </Link>

          {/* Service 5 */}
          <Link
            href="/services?cat=carpentry"
            className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all group h-32"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100/70 text-[#FF6000] flex items-center justify-center mb-2.5 group-hover:bg-[#FF6000] group-hover:text-white transition-all shadow-2xs">
              <Hammer className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Carpentry</span>
          </Link>

          {/* Service 6 */}
          <Link
            href="/services?cat=cleaning"
            className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all group h-32"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100/70 text-[#FF6000] flex items-center justify-center mb-2.5 group-hover:bg-[#FF6000] group-hover:text-white transition-all shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-800">Cleaning</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
