import Image from "next/image";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Trust You Can Count On",
    description:
      "Every service begins with trust. We connect customers with skilled professionals who are committed to delivering quality workmanship and dependable service.",
    points: [
      "Verified Technicians",
      "Professional Service",
      "Transparent Communication",
    ],
    image: "/images/about/trust.jpg",
  },
  {
    title: "Built for Efficiency",
    description:
      "From booking to completion, every step is streamlined to save time and provide a smooth experience for everyone involved.",
    points: [
      "Quick Booking",
      "Smart Job Assignment",
      "Real-Time Updates",
    ],
    image: "/images/about/efficiency.jpg",
  },
  {
    title: "Designed for Everyone",
    description:
      "FieldFlow brings customers, technicians, dispatchers, and administrators together on one connected platform, making collaboration effortless.",
    points: [
      "Customer Friendly",
      "Technician Focused",
      "Easy Administration",
    ],
    image: "/images/about/platform.jpg",
  },
];

export default function WhyFieldFlow() {
  return (
    <section className="bg-[#fbf7f3] text-[#0F2942] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[4px] text-orange-500 font-semibold">
            Why FieldFlow
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Built Around
            <span className="text-orange-500"> Your Needs</span>
          </h2>

          <p className="text-[#4B5563] mt-6 max-w-3xl mx-auto leading-8">
            Every feature is designed to make home services faster,
            simpler, and more reliable.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl border border-orange-100">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                />
              </div>

              <div>
                <h3 className="text-4xl font-bold mb-6 text-[#0F2942]">
                  {feature.title}
                </h3>

                <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>

                <p className="text-[#4B5563] text-lg leading-8 mb-8">
                  {feature.description}
                </p>

                <div className="space-y-4">
                  {feature.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-orange-500" />
                      <span className="text-[#374151]">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}