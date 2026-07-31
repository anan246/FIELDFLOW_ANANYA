"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  Wrench,
  Zap,
  Droplets,
  Snowflake,
  Hammer,
  Paintbrush,
  SlidersHorizontal,
} from "lucide-react";

const categoryData = {
  electrician: {
    title: "Electrician Services",
    subtitle:
      "Get reliable electrical repairs, installations and maintenance from verified professionals.",
    icon: Zap,
    services: [
      {
        id: 12,
        title: "Fan Repair & Installation",
        description:
          "Repair, replace or install ceiling and wall fans.",
        price: "From ₹299",
        image:
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 13,
        title: "Switch & Socket Repair",
        description:
          "Fix damaged, loose or non-working switches and sockets.",
        price: "From ₹199",
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 14,
        title: "Light Installation",
        description:
          "Professional installation of lights, fixtures and fittings.",
        price: "From ₹249",
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 15,
        title: "Wiring & Rewiring",
        description:
          "Safe electrical wiring and rewiring for your home.",
        price: "From ₹499",
        image:
          "https://images.unsplash.com/photo-1555963966-b7ae5406b6e7?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 5,
        title: "MCB & Fuse Repair",
        description:
          "Fix electrical trips, fuse problems and MCB issues.",
        price: "From ₹299",
        image:
          "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 6,
        title: "Inverter Installation",
        description:
          "Professional inverter and backup power installation.",
        price: "From ₹599",
        image:
          "https://images.unsplash.com/photo-1624397640148-949b1732bb96?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },

  plumber: {
    title: "Plumbing Services",
    subtitle:
      "Quick and dependable plumbing solutions for your home.",
    icon: Droplets,
    services: [
      {
        id: 15,
        title: "Tap Repair",
        description: "Fix leaking and damaged taps.",
        price: "From ₹199",
        image:
          "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "Pipe Repair",
        description: "Repair leaking and damaged pipes.",
        price: "From ₹299",
        image:
          "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },

  "ac-repair": {
    title: "AC Repair Services",
    subtitle:
      "Keep your AC running efficiently with professional technicians.",
    icon: Snowflake,
    services: [
      {
        id: 16,
        title: "AC General Service",
        description:
          "Complete cleaning and maintenance of your AC.",
        price: "From ₹499",
        image:
          "https://images.unsplash.com/photo-1631545806609-4b7f4e9d4a6c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 16,
        title: "AC Repair",
        description:
          "Diagnose and repair common AC problems.",
        price: "From ₹399",
        image:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },

  carpenter: {
    title: "Carpentry Services",
    subtitle:
      "Professional furniture repair, installation and carpentry work.",
    icon: Hammer,
    services: [
      {
        id: 17,
        title: "Furniture Repair",
        description:
          "Repair damaged chairs, tables, cupboards and more.",
        price: "From ₹399",
        image:
          "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        title: "Furniture Assembly",
        description:
          "Professional assembly of home furniture.",
        price: "From ₹299",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },

  painting: {
    title: "Painting Services",
    subtitle:
      "Give your home a fresh look with professional painters.",
    icon: Paintbrush,
    services: [
      {
        id: 18,
        title: "Room Painting",
        description:
          "Professional interior wall painting.",
        price: "From ₹1,499",
        image:
          "https://images.unsplash.com/photo-1562259949-e8e7680d782e?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
};

const categories = [
  {
    name: "Electrician",
    slug: "electrician",
    icon: Zap,
  },
  {
    name: "Plumber",
    slug: "plumber",
    icon: Droplets,
  },
  {
    name: "AC Repair",
    slug: "ac-repair",
    icon: Snowflake,
  },
  {
    name: "Carpenter",
    slug: "carpenter",
    icon: Hammer,
  },
  {
    name: "Painting",
    slug: "painting",
    icon: Paintbrush,
  },
];

export default function CategoryPage({ params }) {
  const { category: categorySlug } = use(params);

  const category = categoryData[categorySlug];

  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    if (!category) return [];

    const query = search.toLowerCase().trim();

    if (!query) return category.services;

    return category.services.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );
  }, [category, search]);

  if (!category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4F6F9] px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0E3]">
            <Wrench className="text-[#FF6B00]" size={28} />
          </div>

          <h1 className="text-2xl font-bold text-[#14263D]">
            Service not found
          </h1>

          <Link
            href="/customer/book-service"
            className="mt-4 inline-block font-semibold text-[#FF6B00]"
          >
            ← Back to services
          </Link>
        </div>
      </main>
    );
  }

  const CategoryIcon = category.icon;

  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#14263D]">
      <div className="mx-auto max-w-[1450px] px-4 pb-12 pt-6 sm:px-6 lg:px-8">

        {/* BACK */}
        <Link
          href="/customer/book-service"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#FF6B00]"
        >
          <ArrowLeft size={17} />
          Back to all services
        </Link>

        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-[#14263D] px-6 py-8 text-white shadow-sm sm:px-10 lg:py-10">
          <div className="relative z-10 max-w-3xl">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B00]">
              <CategoryIcon size={28} />
            </div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FF9A52]">
              FieldFlow Services
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              {category.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              {category.subtitle}
            </p>
          </div>

          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#FF6B00]/20" />
          <div className="absolute -bottom-28 right-24 h-52 w-52 rounded-full border-[30px] border-white/5" />
        </section>

        {/* SEARCH */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${category.title.toLowerCase()}...`}
                className="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/10"
              />
            </div>

            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-[#14263D] hover:border-[#FF6B00] hover:text-[#FF6B00]"
            >
              <SlidersHorizontal size={17} />
              Filter
            </button>

          </div>
        </section>

        {/* SERVICE LIST */}
        <section className="mt-8">

          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-[#FF6B00]">
                Available services
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Choose what you need
              </h2>
            </div>

            <span className="hidden text-sm text-slate-500 sm:block">
              {filteredServices.length} services
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
              <Search
                size={30}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-3 font-bold text-[#14263D]">
                No services found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try searching for another service.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/customer/book-service/${categorySlug}/${service.id}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/30 hover:shadow-lg"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#FF6B00]">
                      {service.price}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#14263D] group-hover:text-[#FF6B00]">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#14263D]">
                        View details
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0E3] text-[#FF6B00] transition group-hover:bg-[#FF6B00] group-hover:text-white">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </section>

        {/* OTHER CATEGORIES */}
        <section className="mt-12 rounded-3xl bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-5">
            <p className="text-sm font-semibold text-[#FF6B00]">
              Need something else?
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#14263D]">
              Explore other services
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((item) => {
              const Icon = item.icon;
              const isActive = item.slug === categorySlug;

              return (
                <Link
                  key={item.slug}
                  href={`/customer/book-service/${item.slug}`}
                  className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
                    isActive
                      ? "border-[#FF6B00] bg-[#FFF0E3] text-[#FF6B00]"
                      : "border-slate-200 bg-[#F8FAFC] text-[#14263D] hover:border-[#FF6B00]/40 hover:bg-[#FFF0E3]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-[#FF6B00] text-white"
                        : "bg-white text-[#FF6B00]"
                    }`}
                  >
                    <Icon size={19} />
                  </div>

                  <span className="text-sm font-semibold">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

        </section>

      </div>
    </main>
  );
}