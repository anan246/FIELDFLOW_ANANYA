"use client";

export default function Button({
  children,
  type = "button",
  variant = "primary", // primary | secondary | danger | outline
  size = "md", // sm | md | lg
  onClick,
  disabled = false,
  loading = false,
  className = "",
}) {
  const baseStyles = "font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary: "bg-[#FF6000] hover:bg-[#E55600] active:bg-[#CC4C00] text-white shadow-md shadow-orange-500/25",
    secondary: "bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-200",
    danger: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-md shadow-red-500/20",
    outline: "border border-[#FF6000] hover:bg-amber-50 text-[#FF6000]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      suppressHydrationWarning
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
