export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-600 font-semibold mb-3">
            Trusted Home Services
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Book Reliable Home Services in Minutes
          </h1>

          <p className="text-gray-600 mb-8">
            Find trusted electricians, plumbers, AC technicians, cleaners, and
            more—all in one place.
          </p>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Book Service
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">
              Explore Services
            </button>
          </div>
        </div>

        <div className="h-[450px] rounded-2xl bg-gray-200 flex items-center justify-center">
          Hero Image
        </div>
      </div>
    </div>
  );
}