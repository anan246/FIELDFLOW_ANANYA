"use client";

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  disabled = false,
  className = "",
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label} {required && <span className="text-amber-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          suppressHydrationWarning
          className={`w-full bg-[#0F172A] border ${
            error ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-amber-500"
          } rounded-xl px-4 py-3 text-white text-sm outline-none transition appearance-none cursor-pointer disabled:opacity-50 ${className}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0F172A] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
          ▼
        </div>
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
