"use client";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#08263B]">
            {value}
          </h2>

        </div>

        <div className={`${color} p-4 rounded-2xl`}>
          <Icon className="text-white" size={28} />
        </div>

      </div>

    </div>
  );
}