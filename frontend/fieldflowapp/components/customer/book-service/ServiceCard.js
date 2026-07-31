"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

export default function ServiceCard({
  service,
  category,
}) {
  return (
    <div className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">

      {/* SERVICE IMAGE */}
      <div className="relative h-48 overflow-hidden">

        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#14263D]/80 via-transparent to-transparent" />

        {/* TAG */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#14263D] shadow">
            {service.type}
          </span>
        </div>

        {/* PRICE OVER IMAGE */}
        <div className="absolute bottom-4 left-4">
          <p className="text-[10px] uppercase tracking-wider text-slate-300">
            Starting from
          </p>

          {service.price ? (
            <div className="mt-1 flex items-center text-white">
              <IndianRupee size={16} />
              <span className="text-xl font-bold">
                {service.price}
              </span>
            </div>
          ) : (
            <p className="mt-1 text-sm font-bold text-white">
              Quote after inspection
            </p>
          )}
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-5">

        <h3 className="text-lg font-bold text-[#14263D]">
          {service.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {service.description}
        </p>

        {/* DETAILS */}
        <div className="mt-4 flex flex-wrap gap-2">

          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600">
            <Clock3 size={13} />
            {service.duration}
          </span>

          <span className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-semibold text-[#FF6B00]">
            <CheckCircle2 size={13} />
            Verified service
          </span>

        </div>

        {/* BUTTON */}
        <Link
          href={`/customer/book-service/${category}/${service.id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#14263D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#FF6B00]"
        >
          Choose Service
          <ArrowRight size={16} />
        </Link>

      </div>

    </div>
  );
}