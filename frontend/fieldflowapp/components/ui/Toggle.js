"use client";

export default function Toggle({ enabled, onChange, label, description, disabled = false }) {
  return (
    <div className="flex items-center justify-between bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 sm:p-5 transition hover:border-slate-300">
      <div>
        {label && <p className="text-slate-900 text-sm font-bold">{label}</p>}
        {description && <p className="text-slate-500 text-xs mt-0.5 font-medium">{description}</p>}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!enabled)}
        suppressHydrationWarning
        aria-label={label || "Toggle setting"}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? "bg-[#FF6000]" : "bg-slate-200"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
