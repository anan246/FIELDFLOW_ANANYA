"use client";

import { Info } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

export default function About() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="About FieldFlow"
        description="Platform architecture and version information"
        icon={Info}
      />

      <div className="max-w-md space-y-4">
        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF6000] flex items-center justify-center shadow-md shadow-orange-500/25">
              <span className="text-white font-black text-xl tracking-wider">FF</span>
            </div>
            <div>
              <p className="text-slate-900 font-extrabold text-lg">FieldFlow SaaS</p>
              <p className="text-slate-500 text-xs font-medium">Home Service Booking & Dispatch Platform</p>
            </div>
          </div>

          {[
            { label: "Application Version", value: "v1.0.0-production" },
            { label: "Backend Core", value: "Node.js Express + Supabase PG" },
            { label: "Frontend Stack", value: "Next.js App Router + Tailwind CSS" },
            { label: "System Support", value: "support@fieldflow.in" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center text-sm border-t border-slate-200/60 pt-3">
              <span className="text-slate-500 text-xs font-semibold">{label}</span>
              <span className="text-slate-900 font-bold text-xs">{value}</span>
            </div>
          ))}
        </div>

        <p className="text-slate-400 text-xs text-center font-medium">© 2026 FieldFlow Inc. All rights reserved.</p>
      </div>
    </div>
  );
}
