"use client";

export default function SectionTitle({ title, description, icon: Icon, badge }) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-11 h-11 rounded-2xl bg-amber-100/90 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0">
            <Icon size={20} />
          </div>
        )}
        <div>
          <h2 className="text-slate-900 font-extrabold text-xl tracking-tight">{title}</h2>
          {description && <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-semibold">{description}</p>}
        </div>
      </div>
      {badge && (
        <span className="px-3 py-1 bg-amber-50 text-[#FF6000] border border-amber-200 text-xs font-bold rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
