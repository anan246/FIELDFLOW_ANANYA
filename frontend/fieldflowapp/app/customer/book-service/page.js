"use client";

import CustomerSidebar from "@/components/customer/dashboard/CustomerSidebar";
import DashboardTopbar from "@/components/customer/dashboard/DashboardTopbar";
import ServiceCategories from "@/components/customer/book-service/ServiceCategories";

export default function BookServicePage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6F9] bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(244,246,249,0.92),
            rgba(244,246,249,0.96)
          ),
          url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoAzdXycjZ1zEz-k_Uzx0aZKDKZs18JaI1B5gnognqA&s=10")
        `,
      }}
    >
      <CustomerSidebar />

      <div className="min-h-screen lg:ml-64">

        <DashboardTopbar />

        <div className="px-4 pb-12 pt-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-[1250px]">

            {/* HERO */}
            <section className="relative min-h-[330px] overflow-hidden rounded-[28px] bg-[#14263D] shadow-xl">

              {/* Background glow */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF6B00]/20" />

              <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#FF6B00]/10" />

              <div className="relative grid min-h-[330px] items-center lg:grid-cols-[1fr_430px]">

                {/* LEFT CONTENT */}
                <div className="p-6 sm:p-9 lg:p-10">

                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-500/10 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                    <span className="text-xs font-semibold text-orange-200">
                      Trusted home services
                    </span>
                  </div>

                  <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[42px]">
                    Your home needs fixing?
                    <span className="block text-[#FF6B00]">
                      We've got you.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                    Book reliable professionals for electrical, plumbing,
                    AC, carpentry and everyday home repairs — all from one
                    place.
                  </p>

                  {/* TRUST POINTS */}
                  <div className="mt-6 flex flex-wrap gap-2">

                    <span className="rounded-full bg-white/10 px-3 py-2 text-xs text-slate-200">
                      ✓ Verified professionals
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-2 text-xs text-slate-200">
                      ✓ Transparent pricing
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-2 text-xs text-slate-200">
                      ✓ Easy scheduling
                    </span>

                  </div>

                </div>

                {/* IMAGE */}
                <div className="relative hidden h-full min-h-[330px] lg:block">

                  <div className="absolute inset-y-5 right-5 w-[390px] overflow-hidden rounded-[24px]">

                    <img
                      src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85"
                      alt="Professional home service technician"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#14263D] via-transparent to-transparent" />

                    {/* FLOATING CARD */}
                    <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-[#14263D]/90 px-4 py-3 shadow-xl backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        FieldFlow promise
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">
                        Professionals at your doorstep
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* CATEGORY SECTION */}
            <div className="mt-9">
              <ServiceCategories />
            </div>

            {/* WHY FIELDFLOW */}
            <section className="mt-10">

              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
                  Why FieldFlow?
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#14263D]">
                  Simple from booking to doorstep
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {[
                  {
                    number: "01",
                    title: "Choose a service",
                    text: "Find the right service for your home.",
                  },
                  {
                    number: "02",
                    title: "Pick a time",
                    text: "Schedule a convenient date and time.",
                  },
                  {
                    number: "03",
                    title: "Meet your technician",
                    text: "A verified professional comes to you.",
                  },
                  {
                    number: "04",
                    title: "Track the job",
                    text: "Follow your booking from start to finish.",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <span className="text-2xl font-black text-orange-100">
                      {item.number}
                    </span>

                    <h3 className="mt-2 font-bold text-[#14263D]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                ))}

              </div>

            </section>

          </div>

        </div>

      </div>
    </main>
  );
}