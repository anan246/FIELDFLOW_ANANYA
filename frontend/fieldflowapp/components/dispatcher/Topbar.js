"use client";

import {
  Search,
  Bell,
  Calendar,
} from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
      sticky
      top-0
      z-30
      bg-white/90
      backdrop-blur-md
      border-b
      shadow-sm
    "
    >
      <div
        className="
        flex
        items-center
        justify-between
        gap-6
        px-4
        md:px-8
        py-5
      "
      >
        {/* Search */}

        <div className="relative flex-1 max-w-xl">

          <Search
            className="absolute left-4 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search bookings, technicians..."
            className="
            w-full
            bg-slate-100
            rounded-xl
            py-3
            pl-11
            pr-4
            outline-none
            focus:ring-2
            focus:ring-orange-500
          "
          />

        </div>

        {/* Right */}

        <div className="hidden md:flex items-center gap-8">

          <div className="flex items-center gap-2 text-gray-500">

            <Calendar size={18} />

            <span>
              Thursday, 30 July 2026
            </span>

          </div>

          <div className="relative">

            <Bell />

            <span
              className="
              absolute
              -top-1
              -right-1
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
            />

          </div>

          <div className="flex items-center gap-3">

            <div
              className="
              h-12
              w-12
              rounded-full
              bg-orange-500
              flex
              items-center
              justify-center
              text-white
              font-bold
            "
            >
              D
            </div>

            <div>

              <h3 className="font-semibold text-[#08263B]">
                Dispatcher
              </h3>

              <p className="text-sm text-gray-500">
                FieldFlow Admin
              </p>

            </div>

          </div>
        </div>
      </div>
    </header>
  );
}