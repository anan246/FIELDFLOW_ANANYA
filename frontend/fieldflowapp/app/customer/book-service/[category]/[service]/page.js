
"use client";

import Link from "next/link";
import { use, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const serviceData = {
  electrician: {
    "12": {
      title: "Fan Repair & Installation",
      category: "Electrician",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      description:
        "Get your ceiling, wall, or exhaust fan repaired or installed by a skilled electrician.",
      price: "₹499",
      priceType: "Fixed price",
      pricingType: "fixed",
      duration: "1–2 hours",
      rating: "4.8",
      reviews: "126",
      includes: [
        "Fan inspection",
        "Minor electrical repair",
        "Installation support",
        "Basic testing after service",
      ],
    },

    "13": {
      title: "Switch & Socket Repair",
      category: "Electrician",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
      description:
        "Repair loose, damaged, or non-working switches and electrical sockets.",
      price: "₹299",
      priceType: "Fixed price",
      pricingType: "fixed",
      duration: "30–60 mins",
      rating: "4.7",
      reviews: "98",
      includes: [
        "Switch/socket inspection",
        "Minor repair",
        "Connection testing",
        "Basic replacement support",
      ],
    },

    "14": {
      title: "Light Installation",
      category: "Electrician",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      description:
        "Professional installation of ceiling lights, wall lights, and other fixtures.",
      price: "₹399",
      priceType: "Fixed price",
      pricingType: "fixed",
      duration: "30–90 mins",
      rating: "4.8",
      reviews: "84",
      includes: [
        "Fixture inspection",
        "Installation",
        "Electrical connection",
        "Final testing",
      ],
    },
  },

  plumber: {
    "15": {
      title: "Tap & Faucet Repair",
      category: "Plumber",
      image:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
      description:
        "Fix leaking, loose, or damaged taps and faucets with professional plumbing support.",
      price: "₹349",
      priceType: "Fixed price",
      pricingType: "fixed",
      duration: "30–60 mins",
      rating: "4.7",
      reviews: "112",
      includes: [
        "Leak inspection",
        "Minor repair",
        "Connection check",
        "Testing after repair",
      ],
    },
  },

  "ac-repair": {
    "16": {
      title: "AC Inspection & Repair",
      category: "AC Repair",
      image:
        "https://images.unsplash.com/photo-1631545806609-3c7b2f2f8d9d?auto=format&fit=crop&w=1200&q=80",
      description:
        "Get your AC inspected by a professional and identify the issue before repair.",
      price: "Quote after inspection",
      priceType: "Inspection required",
      pricingType: "quote",
      duration: "1–2 hours",
      rating: "4.8",
      reviews: "143",
      includes: [
        "AC inspection",
        "Problem diagnosis",
        "Repair recommendation",
        "Final estimate after inspection",
      ],
    },
  },

  carpenter: {
    "17": {
      title: "Furniture Repair",
      category: "Carpenter",
      image:
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1c9c?auto=format&fit=crop&w=1200&q=80",
      description:
        "Get damaged furniture repaired by an experienced carpenter.",
      price: "Quote after inspection",
      priceType: "Inspection required",
      pricingType: "quote",
      duration: "1–3 hours",
      rating: "4.7",
      reviews: "76",
      includes: [
        "Furniture inspection",
        "Damage assessment",
        "Repair recommendation",
        "Final estimate after inspection",
      ],
    },
  },

  painting: {
    "18": {
      title: "Wall Painting",
      category: "Painting",
      image:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80",
      description:
        "Professional wall painting service for rooms, homes, and individual spaces.",
      price: "Quote after inspection",
      priceType: "Inspection required",
      pricingType: "quote",
      duration: "Varies by job",
      rating: "4.8",
      reviews: "91",
      includes: [
        "Area inspection",
        "Surface assessment",
        "Paint recommendation",
        "Final estimate",
      ],
    },
  },
};

export default function ServiceDetailsPage({ params }) {
  const { category, service } = use(params);

  const serviceInfo = serviceData[category]?.[service];

  const [selectedTab, setSelectedTab] = useState("overview");

  if (!serviceInfo) {
    return (
      <main className="min-h-screen bg-[#F4F6F9] px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">

          <Link
            href={`/customer/book-service/${category}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#14263D] transition hover:text-[#FF6B00]"
          >
            <ArrowLeft size={18} />
            Back to services
          </Link>

          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">

            <h1 className="text-2xl font-bold text-[#14263D]">
              Service not found
            </h1>

            <p className="mt-2 text-slate-500">
              This service is currently unavailable.
            </p>

          </div>
        </div>
      </main>
    );
  }

  const isQuoteBased = serviceInfo.pricingType === "quote";

  return (
    <main className="min-h-screen bg-[#F4F6F9] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">

        {/* BACK */}
        <div className="mb-6">

          <Link
            href={`/customer/book-service/${category}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#14263D] transition hover:text-[#FF6B00]"
          >
            <ArrowLeft size={18} />
            Back to {serviceInfo.category} services
          </Link>

        </div>

        {/* SERVICE DETAILS CARD */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">

          {/* HERO IMAGE */}
          <div className="relative h-[250px] w-full sm:h-[330px] lg:h-[400px]">

            <img
              src={serviceInfo.image}
              alt={serviceInfo.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#14263D]/85 via-[#14263D]/25 to-transparent" />

            <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8">

              <span className="inline-flex rounded-full bg-[#FF6B00] px-3 py-1 text-xs font-semibold text-white">
                {serviceInfo.category}
              </span>

              <h1 className="mt-3 max-w-3xl text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {serviceInfo.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/90">

                <span className="flex items-center gap-1.5">
                  <Star
                    size={16}
                    fill="currentColor"
                  />

                  {serviceInfo.rating}

                  <span className="text-white/70">
                    ({serviceInfo.reviews} reviews)
                  </span>
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={16} />
                  {serviceInfo.duration}
                </span>

              </div>

            </div>
          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">

            {/* LEFT */}
            <div className="min-w-0 p-5 sm:p-7 lg:p-9">

              {/* TABS */}
              <div className="flex gap-6 border-b border-slate-200">

                <button
                  type="button"
                  onClick={() => setSelectedTab("overview")}
                  className={`relative pb-3 text-sm font-semibold transition ${
                    selectedTab === "overview"
                      ? "text-[#FF6B00]"
                      : "text-slate-500 hover:text-[#14263D]"
                  }`}
                >
                  Overview

                  {selectedTab === "overview" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#FF6B00]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTab("included")}
                  className={`relative pb-3 text-sm font-semibold transition ${
                    selectedTab === "included"
                      ? "text-[#FF6B00]"
                      : "text-slate-500 hover:text-[#14263D]"
                  }`}
                >
                  What's included

                  {selectedTab === "included" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#FF6B00]" />
                  )}
                </button>

              </div>

              {/* OVERVIEW */}
              {selectedTab === "overview" && (
                <div className="pt-6">

                  <h2 className="text-xl font-bold text-[#14263D]">
                    About this service
                  </h2>

                  <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                    {serviceInfo.description}
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">

                    <div className="rounded-2xl bg-[#F4F6F9] p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">

                          <ShieldCheck
                            size={20}
                            className="text-[#FF6B00]"
                          />

                        </div>

                        <div>

                          <p className="text-sm font-semibold text-[#14263D]">
                            Verified professionals
                          </p>

                          <p className="text-xs text-slate-500">
                            Trusted service providers
                          </p>

                        </div>

                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#F4F6F9] p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">

                          <Users
                            size={20}
                            className="text-[#FF6B00]"
                          />

                        </div>

                        <div>

                          <p className="text-sm font-semibold text-[#14263D]">
                            Easy booking
                          </p>

                          <p className="text-xs text-slate-500">
                            Choose a convenient time
                          </p>

                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* INCLUDED */}
              {selectedTab === "included" && (
                <div className="pt-6">

                  <h2 className="text-xl font-bold text-[#14263D]">
                    What's included
                  </h2>

                  <div className="mt-5 space-y-3">

                    {serviceInfo.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >

                        <CheckCircle2
                          size={19}
                          className="shrink-0 text-[#FF6B00]"
                        />

                        <span className="text-sm text-slate-600">
                          {item}
                        </span>

                      </div>
                    ))}

                  </div>
                </div>
              )}

            </div>

            {/* BOOKING CARD */}
            <div className="border-t border-slate-200 bg-[#F8FAFC] p-5 sm:p-7 lg:border-l lg:border-t-0">

              <div className="rounded-2xl bg-white p-5 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {isQuoteBased ? "Pricing" : "Starting price"}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#14263D]">
                  {serviceInfo.price}
                </p>

                <p
                  className={`mt-1 text-xs font-medium ${
                    serviceInfo.pricingType === "fixed"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {serviceInfo.priceType}
                </p>

                <div className="my-5 h-px bg-slate-200" />

                <div className="space-y-4">

                  <div className="flex items-start gap-3">

                    <CalendarDays
                      size={19}
                      className="mt-0.5 shrink-0 text-[#FF6B00]"
                    />

                    <div>

                      <p className="text-sm font-semibold text-[#14263D]">
                        Flexible scheduling
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Choose your preferred date and time
                      </p>

                    </div>
                  </div>

                  <div className="flex items-start gap-3">

                    <MapPin
                      size={19}
                      className="mt-0.5 shrink-0 text-[#FF6B00]"
                    />

                    <div>

                      <p className="text-sm font-semibold text-[#14263D]">
                        Service at your location
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Technician comes to your address
                      </p>

                    </div>
                  </div>

                </div>

                <Link
                  href={`/customer/book-service/${category}/${service}/book`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                >
                  {isQuoteBased
                    ? "Request a Quote"
                    : "Book This Service"}

                  <ChevronRight size={18} />
                </Link>

                <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                  {isQuoteBased
                    ? "Final pricing will be provided after technician inspection."
                    : "The displayed price applies to the selected service."}
                </p>

              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

