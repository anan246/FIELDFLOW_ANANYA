"use client";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs ${className}`}>
      {children}
    </div>
  );
}
