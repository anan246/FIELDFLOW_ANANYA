"use client";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon: Icon,
  endElement,
  disabled = false,
  className = "",
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          {label} {required && <span className="text-[#FF6000]">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          suppressHydrationWarning
          className={`w-full bg-[#F8FAFC] border ${
            error ? "border-red-500 focus:border-red-500" : "border-slate-200/80 focus:border-[#FF6000]"
          } rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition placeholder:text-slate-400 disabled:opacity-50 ${
            Icon ? "pl-11" : ""
          } ${endElement ? "pr-11" : ""} ${className}`}
        />
        {endElement && <div className="absolute right-3.5 flex items-center">{endElement}</div>}
      </div>
      {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
    </div>
  );
}
