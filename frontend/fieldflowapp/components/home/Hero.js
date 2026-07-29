import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/heros.jpg"
        alt="Hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="absolute z-20 left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-2xl">
        <p className="text-orange-400 font-semibold uppercase tracking-widest mb-4">
          Trusted Home Services
        </p>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          Expert Home Appliance Repair At Your Doorstep
        </h1>

        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
          Book trusted technicians for appliance repair, maintenance, and
          installation. Fast, reliable, and hassle-free service whenever you
          need it.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition duration-300">Book Service</button>

            <button className="border border-white/70 text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold transition duration-300">Explore Services</button>
        </div>
      </div>
    </section>
  );
}
