import {
  Zap,
  Wrench,
  Paintbrush,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function FeaturedServices() {
  const services = [
    {
      title: "Electrical",
      description: "Certified electricians for repairs, wiring, and installations.",
      icon: Zap,
    },
    {
      title: "Plumbing",
      description: "Quick plumbing solutions for leaks, fittings, and maintenance.",
      icon: Wrench,
    },
    {
      title: "Cleaning",
      description: "Professional home cleaning with trusted experts.",
      icon: Sparkles,
    },
    {
      title: "Painting",
      description: "Interior and exterior painting for a fresh new look.",
      icon: Paintbrush,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold uppercase tracking-wider">
            Our Services
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Services for Every Home
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600 leading-relaxed">
            From quick repairs to complete home maintenance, FieldFlow connects
            you with trusted professionals for every household need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:shadow-xl"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition">
                  <Icon
                    size={28}
                    className="text-orange-500 group-hover:text-white transition"
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <button className="mt-6 flex items-center gap-2 text-orange-500 font-medium group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}