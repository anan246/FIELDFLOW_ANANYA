import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative h-[80vh] min-h-[650px] flex items-center overflow-hidden">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d9d1ca] via-[#f4ece5] to-[#fbf7f3]"></div>

      {/* Soft Orange Glow - Left */}
      <div className="absolute top-20 -left-32 w-[450px] h-[450px] bg-orange-400/15 rounded-full blur-[150px]"></div>

      {/* Soft Orange Glow - Right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-300/10 rounded-full blur-[150px]"></div>

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 uppercase tracking-[3px] text-sm font-semibold mt-8">
              About FieldFlow
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-[#0F2942]">
              Making Home
              <br />
              Services
              <span className="text-orange-500"> Effortless.</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-[#4B5563] leading-9 max-w-2xl">
              FieldFlow connects homeowners with trusted professionals through
              one intelligent platform. From booking a service to tracking its
              completion, every step is designed to be seamless, transparent,
              and reliable.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/services"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition duration-300 shadow-lg"
              >
                Explore Services
              </Link>

              <Link
                href="/contact"
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f8f5f2] to-transparent"></div>
    </section>
  );
}