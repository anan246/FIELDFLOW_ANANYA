"use client";

import { RotateCcw, PlusCircle } from "lucide-react";

export default function ActionButtons({
  handleReset,
  handleSubmit,
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md">

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={handleReset}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
        >
          <PlusCircle size={18} />
          Create Booking
        </button>

      </div>

    </div>
  );
}