import Link from "next/link";

export default function OurStory() {
  return (
    <section className="bg-[#fbf7f3] py-24 text-[#0F2942]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div className="relative">

            {/* Orange Accent */}
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"></div>

            {/* Image Box */}
            <div className="relative bg-white border border-orange-100 rounded-3xl h-[500px] overflow-hidden shadow-lg">
              <img
                src="https://tridaniel.creedcreatives.net/hirara/wp-content/uploads/sites/62/2026/06/plumber-working-on-sink-pipes-in-home-2026-01-05-05-44-29-utc-768x511.jpg"
                alt="Plumber working on sink pipes in home"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

          </div>

          {/* Right Side */}
          <div>

            <span className="text-orange-500 uppercase tracking-[4px] font-semibold">
              Our Story
            </span>

            <h2 className="text-5xl font-bold mt-5 leading-tight text-[#0F2942]">
              Every Great Service
              <br />
              Starts With
              <span className="text-orange-500"> Trust.</span>
            </h2>

            <div className="w-24 h-1 bg-orange-500 rounded-full mt-7 mb-8"></div>

            <p className="text-[#4B5563] text-lg leading-9 mb-6">
              FieldFlow was created to simplify home services by bringing
              customers, technicians, dispatchers, and administrators together
              on one intelligent platform. We believe every repair should be
              easy to book, simple to track, and completed with confidence.
            </p>

            <p className="text-[#6B7280] leading-8 mb-8">
              Whether it's plumbing, electrical work, appliance repair, or AC
              servicing, our platform ensures transparency, faster response
              times, and a seamless experience from booking to job completion.
            </p>

            {/* Small Highlights */}

            <div className="grid grid-cols-2 gap-5 mb-10">

              <div className="bg-white rounded-2xl p-5 border border-orange-100 shadow-md">

                <h3 className="text-3xl font-bold text-orange-500">
                  4+
                </h3>

                <p className="text-[#6B7280] mt-2">
                  User Roles
                </p>

              </div>

              <div className="bg-white rounded-2xl p-5 border border-orange-100 shadow-md">

                <h3 className="text-3xl font-bold text-orange-500">
                  24/7
                </h3>

                <p className="text-[#6B7280] mt-2">
                  Service Support
                </p>

              </div>

            </div>

            <Link
              href="/services"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition shadow-lg"
            >
              Explore Services →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}