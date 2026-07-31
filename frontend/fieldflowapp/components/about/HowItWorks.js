import {
  ShieldCheck,
  Clock3,
  MapPinned,
  BadgeDollarSign,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    desc: "Experienced and skilled technicians committed to delivering reliable home services with professionalism.",
  },
  {
    icon: Clock3,
    title: "Fast & Hassle-Free",
    desc: "Book services in minutes with a streamlined process that saves your time and effort.",
  },
  {
    icon: MapPinned,
    title: "Real-Time Updates",
    desc: "Track your service journey with timely notifications and technician progress updates.",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    desc: "Know what you're paying for with clear estimates and no hidden surprises.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#fbf7f3] py-24 text-[#0F2942]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-orange-500 font-semibold">
            Why Choose FieldFlow
          </span>

          <h2 className="text-5xl font-bold mt-5">
            Built Around
            <span className="text-orange-500"> Your Needs</span>
          </h2>

          <p className="text-[#4B5563] mt-6 leading-8">
            We combine technology, trusted professionals, and a seamless booking
            experience to make home services simple, reliable, and stress-free.
          </p>

        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">

          {/* Left Illustration */}
          <div className="relative">

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"></div>

            <div className="relative bg-white border border-orange-100 rounded-[40px] h-[520px] overflow-hidden shadow-lg">
              <img
                src="https://tridaniel.creedcreatives.net/hirara/wp-content/uploads/sites/62/2026/06/technician-repairing-wires-inside-wooden-cabinet-2026-03-20-05-56-40-utc-768x512.jpg"
                alt="Technician repairing wires inside wooden cabinet"
                className="w-full h-full object-cover rounded-[40px]"
              />
            </div>

          </div>

          {/* Right Features */}
          <div className="space-y-8">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="flex gap-5 p-6 rounded-3xl bg-white border border-orange-100 hover:border-orange-500 shadow-md hover:shadow-lg transition duration-300"
                >

                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">

                    <Icon className="text-orange-500 w-8 h-8" />

                  </div>

                  <div>

                    <h3 className="text-2xl font-semibold text-[#0F2942]">
                      {feature.title}
                    </h3>

                    <p className="text-[#6B7280] mt-3 leading-7">
                      {feature.desc}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}