"use client";

import Link from "next/link";
import {
  PlusCircle,
  ClipboardList,
  PhoneCall,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Book Service",
      description: "Schedule a new service",
      icon: PlusCircle,
      href: "/customer/book-service",
    },
    {
      title: "My Bookings",
      description: "Track all your bookings",
      icon: ClipboardList,
      href: "/customer/bookings",
    },
    {
      title: "Support",
      description: "Need help? Contact us",
      icon: PhoneCall,
      href: "/contact",
    },
  ];

  return (
    <section>

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Quick Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-3">

        {actions.map((action, index) => {

          const Icon = action.icon;

          return (

            <Link
              key={index}
              href={action.href}
              className="rounded-3xl border border-white bg-white/80 backdrop-blur-xl p-6 shadow-lg transition hover:-translate-y-1 hover:border-[#FF6B00]"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">

                <Icon
                  size={28}
                  className="text-[#FF6B00]"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {action.description}
              </p>

            </Link>

          );

        })}

      </div>

    </section>
  );
}