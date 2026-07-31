import SearchBar from "@/components/services/serachbar";
import ServiceGrid from "@/components/services/servicegrid";

export default function ServicesPage() {
  return (
    <main className="bg-[#F8F9FB] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="text-orange-500 font-semibold uppercase tracking-widest">
          What We Offer
        </span>

        <h1 className="text-5xl font-bold text-[#2D2F39] mt-4">
          Professional Home Services
        </h1>

        <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
          Book trusted professionals for repairs, maintenance and
          installations with transparent pricing.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <SearchBar />
      </section>

      <ServiceGrid />
    </main>
  );
}