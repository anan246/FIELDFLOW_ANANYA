"use client";

import {
  Clock3,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const servicesByCategory = {
  Electrician: [
    {
      id: 1,
      name: "Switch & Socket Repair",
      description:
        "Repair or replacement of damaged switches, sockets and electrical points.",
      pricingType: "Fixed",
      price: 299,
      duration: "30–60 min",
      included: "Inspection + repair",
    },
    {
      id: 2,
      name: "Fan Installation & Repair",
      description:
        "Installation, wiring and troubleshooting for ceiling and wall fans.",
      pricingType: "Fixed",
      price: 399,
      duration: "1–2 hrs",
      included: "Installation / repair",
    },
    {
      id: 3,
      name: "Light Installation",
      description:
        "Professional installation of LED lights, ceiling lights and fixtures.",
      pricingType: "Fixed",
      price: 349,
      duration: "30–60 min",
      included: "Installation",
    },
    {
      id: 4,
      name: "Wiring & Electrical Repair",
      description:
        "Fault detection, wiring problems and other electrical repairs.",
      pricingType: "Quote",
      price: null,
      duration: "1–3 hrs",
      included: "Inspection first",
    },
    {
      id: 5,
      name: "MCB / Fuse Repair",
      description:
        "Troubleshooting MCB trips, fuse problems and electrical safety issues.",
      pricingType: "Fixed",
      price: 499,
      duration: "1–2 hrs",
      included: "Inspection + repair",
    },
    {
      id: 6,
      name: "Full Electrical Inspection",
      description:
        "A complete check of electrical points to identify possible faults.",
      pricingType: "Fixed",
      price: 699,
      duration: "1–2 hrs",
      included: "Safety inspection",
    },
  ],

  Plumber: [
    {
      id: 7,
      name: "Tap Repair",
      description: "Repair leaking or damaged taps and fittings.",
      pricingType: "Fixed",
      price: 299,
      duration: "30–60 min",
      included: "Inspection + repair",
    },
    {
      id: 8,
      name: "Pipe Leakage Repair",
      description: "Find and repair common household pipe leaks.",
      pricingType: "Quote",
      price: null,
      duration: "1–2 hrs",
      included: "Inspection first",
    },
    {
      id: 9,
      name: "Drain Cleaning",
      description: "Clear blocked sinks, drains and household pipelines.",
      pricingType: "Fixed",
      price: 449,
      duration: "1–2 hrs",
      included: "Cleaning",
    },
  ],

  "AC Repair": [
    {
      id: 10,
      name: "AC General Service",
      description: "Complete cleaning and maintenance for your air conditioner.",
      pricingType: "Fixed",
      price: 699,
      duration: "1–2 hrs",
      included: "Cleaning + inspection",
    },
    {
      id: 11,
      name: "AC Not Cooling",
      description: "Diagnosis and repair for AC cooling problems.",
      pricingType: "Quote",
      price: null,
      duration: "1–3 hrs",
      included: "Inspection first",
    },
    {
      id: 12,
      name: "AC Installation",
      description: "Professional installation and setup of your AC unit.",
      pricingType: "Quote",
      price: null,
      duration: "2–4 hrs",
      included: "Installation",
    },
  ],

  Carpenter: [
    {
      id: 13,
      name: "Furniture Repair",
      description: "Repair damaged tables, chairs, cabinets and furniture.",
      pricingType: "Quote",
      price: null,
      duration: "1–3 hrs",
      included: "Inspection first",
    },
    {
      id: 14,
      name: "Door Repair",
      description: "Fix hinges, locks, alignment and common door issues.",
      pricingType: "Fixed",
      price: 399,
      duration: "1–2 hrs",
      included: "Repair",
    },
  ],

  Painting: [
    {
      id: 15,
      name: "Room Painting",
      description: "Professional interior wall painting for individual rooms.",
      pricingType: "Quote",
      price: null,
      duration: "1–2 days",
      included: "Inspection + quote",
    },
    {
      id: 16,
      name: "Wall Touch-up",
      description: "Fix small patches, marks and damaged wall areas.",
      pricingType: "Fixed",
      price: 499,
      duration: "1–2 hrs",
      included: "Touch-up",
    },
  ],

  "General Repair": [
    {
      id: 17,
      name: "Home Inspection",
      description: "Identify common maintenance and repair requirements.",
      pricingType: "Fixed",
      price: 399,
      duration: "1–2 hrs",
      included: "Inspection",
    },
    {
      id: 18,
      name: "Multiple Repairs",
      description: "Handle multiple small maintenance tasks in one visit.",
      pricingType: "Quote",
      price: null,
      duration: "2–4 hrs",
      included: "Inspection first",
    },
  ],
};

export default function ServiceSelector({
  selectedCategory,
  selectedService,
  setSelectedService,
}) {
  const services =
    servicesByCategory[selectedCategory?.name] || [];

  return (
    <section>

      <div className="grid gap-4 lg:grid-cols-2">

        {services.map((service) => {

          const isSelected =
            selectedService?.id === service.id;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service)}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                isSelected
                  ? "border-[#FF6B00] bg-white shadow-lg ring-1 ring-[#FF6B00]/20"
                  : "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-[#FF6B00]/50 hover:shadow-md"
              }`}
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex gap-3">

                  <div
                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      isSelected
                        ? "bg-[#FF6B00] text-white"
                        : "bg-[#14263D] text-white"
                    }`}
                  >
                    <ShieldCheck size={20} />
                  </div>

                  <div>

                    <h3 className="font-bold text-[#14263D]">
                      {service.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {service.description}
                    </p>

                  </div>

                </div>

                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-[#FF6B00] bg-[#FF6B00] text-white"
                      : "border-slate-300 text-transparent"
                  }`}
                >
                  <CheckCircle2 size={15} />
                </div>

              </div>

              {/* Details */}
              <div className="mt-5 flex flex-wrap gap-2">

                <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                  <Clock3 size={13} />
                  {service.duration}
                </span>

                <span className="rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-semibold text-[#FF6B00]">
                  {service.included}
                </span>

              </div>

              {/* Bottom */}
              <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">

                <div>

                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Estimated price
                  </p>

                  <div className="mt-1 flex items-center gap-1">

                    {service.price ? (
                      <>
                        <IndianRupee
                          size={16}
                          className="text-[#14263D]"
                        />

                        <span className="text-lg font-bold text-[#14263D]">
                          {service.price}
                        </span>

                        <span className="text-xs text-slate-400">
                          onwards
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-[#FF6B00]">
                        Quote after inspection
                      </span>
                    )}

                  </div>

                </div>

                <span
                  className={`flex items-center gap-1 text-xs font-bold ${
                    isSelected
                      ? "text-[#FF6B00]"
                      : "text-slate-400 group-hover:text-[#FF6B00]"
                  }`}
                >
                  {isSelected ? "Selected" : "Choose"}
                  <ArrowRight size={15} />
                </span>

              </div>

            </button>
          );
        })}

      </div>

    </section>
  );
}