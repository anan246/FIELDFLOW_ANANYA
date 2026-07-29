import ServiceCard from "./servicecard";

const services = [
  {
    title: "Electrician",
    image: "/services/electrician.jpg",
    price: "Starting ₹199",
    rating: "4.8",
    desc: "Fan, wiring & lighting"
  },
  {
    title: "Plumbing",
    image: "/services/plumbing.jpg",
    price: "Starting ₹249",
    rating: "4.9",
    desc: "Leak repairs & fittings"
  },
  {
    title: "AC Repair",
    image: "/services/ac.jpg",
    price: "Inspection ₹299",
    rating: "4.8",
    desc: "Service & installation"
  },
  {
    title: "Cleaning",
    image: "/services/cleaning.jpg",
    price: "Starting ₹499",
    rating: "4.9",
    desc: "Deep home cleaning"
  },
  {
    title: "Painting",
    image: "/services/painting.jpg",
    price: "Quote after inspection",
    rating: "4.7",
    desc: "Interior & exterior"
  },
  {
    title: "Carpentry",
    image: "/services/carpentry.jpg",
    price: "Starting ₹299",
    rating: "4.8",
    desc: "Furniture repair"
  },
  {
    title: "Appliance Repair",
    image: "/services/appliance.jpg",
    price: "Starting ₹299",
    rating: "4.9",
    desc: "Fridge & washing machine"
  },
  {
    title: "Pest Control",
    image: "/services/pest.jpg",
    price: "Quote after inspection",
    rating: "4.7",
    desc: "Termite & insects"
  }
];

export default function ServiceGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">

      <h2 className="text-4xl font-bold text-[#2D2F39] mb-10">
        Available Services
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {services.map((service) => (
          <ServiceCard
            key={service.title}
            {...service}
          />
        ))}

      </div>

    </section>
  );
}