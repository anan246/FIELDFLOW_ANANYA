"use client";

import Link from "next/link";
import {
  Zap,
  Droplets,
  Snowflake,
  Hammer,
  Paintbrush,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Electrician",
    slug: "electrician",
    description: "Wiring, lights, fans and electrical repairs",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=85",
    icon: Zap,
    services: "6 services",
  },
  {
    name: "Plumber",
    slug: "plumber",
    description: "Leaks, taps, pipes and drainage solutions",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=700&q=85",
    icon: Droplets,
    services: "5 services",
  },
  {
    name: "AC Repair",
    slug: "ac-repair",
    description: "Cooling, maintenance and AC installation",
    image:
      "https://images.unsplash.com/photo-1631545806609-7b5c8e7e4b7c?auto=format&fit=crop&w=700&q=85",
    icon: Snowflake,
    services: "4 services",
  },
  {
    name: "Carpenter",
    slug: "carpenter",
    description: "Furniture, doors and woodwork",
    image:
      "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=700&q=85",
    icon: Hammer,
    services: "5 services",
  },
  {
    name: "Painting",
    slug: "painting",
    description: "Interior, exterior and wall painting",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=700&q=85",
    icon: Paintbrush,
    services: "4 services",
  },
  {
    name: "General Repair",
    slug: "general-repair",
    description: "Everyday home maintenance and repairs",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=85",
    icon: Wrench,
    services: "8 services",
  },
];

export default function ServiceCategories() {
  return (
    <section>

      {/* HEADER */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
            Explore categories
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#14263D] sm:text-3xl">
            What does your home need?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Pick a category to explore available services and find the
            right professional.
          </p>
        </div>

        <span className="text-xs font-medium text-slate-400">
          {categories.length} categories available
        </span>

      </div>

      {/* CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.slug}
              href={`/customer/book-service/${category.slug}`}
              className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >

              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">

                <img
                  src={category.image}
                  alt={`${category.name} service`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14263D]/80 via-transparent to-transparent" />

                {/* ICON */}
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-[#FF6B00] shadow-lg">
                  <Icon size={21} />
                </div>

                {/* SERVICE COUNT */}
                <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                  {category.services}
                </span>

                {/* ARROW */}
                <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-lg transition group-hover:scale-110">
                  <ArrowUpRight size={17} />
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h3 className="text-lg font-bold text-[#14263D]">
                  {category.name}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

                  <span className="text-xs font-semibold text-[#FF6B00]">
                    Explore services
                  </span>

                  <span className="text-xs text-slate-400 transition group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </div>

            </Link>
          );
        })}

      </div>

    </section>
  );
}