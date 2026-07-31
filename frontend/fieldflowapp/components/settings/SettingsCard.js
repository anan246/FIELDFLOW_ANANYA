"use client";

export default function SettingsCard({ children, active = false, onClick, className = "" }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 border transition-all ${
        active
          ? "border-[#FF6000] bg-amber-50/40 shadow-sm"
          : "border-slate-200/80 bg-[#F8FAFC] hover:border-slate-300 hover:bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}
