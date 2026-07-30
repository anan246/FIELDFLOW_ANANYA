import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    service: "AC Repair",
    review:
      "The technician arrived exactly on time and fixed my AC within an hour. Booking was effortless and the service was excellent.",
  },
  {
    name: "Rahul Verma",
    service: "Electrical Service",
    review:
      "Transparent pricing, professional technicians, and quick response. I highly recommend FieldFlow for home repairs.",
  },
  {
    name: "Ananya Reddy",
    service: "Washing Machine Repair",
    review:
      "I loved how easy it was to book a technician. Everything was smooth from booking to completion.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#111111] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-orange-400 uppercase tracking-widest font-semibold">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            What Our Customers Say
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Thousands of customers trust FieldFlow for reliable home appliance
            repair and maintenance services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="group bg-[#1B1B1B] rounded-2xl p-8 border border-white/5 hover:border-orange-500 transition-all duration-300 hover:-translate-y-2"
            >

              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl mb-6">
                {item.name.charAt(0)}
              </div>

              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-orange-400 text-orange-400"
                  />
                ))}
              </div>

              <p className="text-gray-300 italic leading-relaxed">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h4 className="text-white font-semibold">
                  {item.name}
                </h4>

                <p className="text-orange-400 text-sm">
                  {item.service}
                </p>
              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}