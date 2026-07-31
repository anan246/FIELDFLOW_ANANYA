import {
  ShieldCheck,
  Clock3,
  BadgeDollarSign,
  Headset,
  Award,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Technicians",
    desc: "Every technician is background-verified and professionally trained for quality service.",
  },
  {
    icon: Clock3,
    title: "Quick Response",
    desc: "Get connected with nearby technicians and receive fast service at your doorstep.",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    desc: "Know the service cost upfront with no hidden charges or surprise fees.",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    desc: "Our support team is always available to help with bookings and service issues.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    desc: "We ensure every service meets high-quality standards for customer satisfaction.",
  },
  {
    icon: Smartphone,
    title: "Easy Online Booking",
    desc: "Book services anytime, anywhere through a simple and user-friendly platform.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0F0F0F] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-orange-400 uppercase tracking-widest font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Why Choose FieldFlow?
          </h2>

          <p className="text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed">
            We combine trusted professionals, seamless booking, transparent
            pricing, and excellent customer support to deliver a reliable home
            service experience every time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group bg-[#1B1B1B] rounded-2xl p-8 border border-white/5 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                  <Icon className="w-8 h-8 text-orange-400 group-hover:text-white transition-all duration-300" />
                </div>

                <h3 className="text-white text-xl font-semibold mt-6 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}