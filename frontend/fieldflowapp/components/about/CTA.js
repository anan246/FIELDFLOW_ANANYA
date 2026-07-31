import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-[#fbf7f3] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="rounded-[40px] bg-gradient-to-r from-[#fff4e6] via-[#ffe8cc] to-[#ffd8a8] p-14 text-center border border-orange-100 shadow-xl">

          <h2 className="text-5xl font-bold text-[#0F2942]">
            Ready to Experience Better Home Services?
          </h2>

          <p className="text-[#4B5563] mt-6 max-w-2xl mx-auto text-lg leading-8">
            Join FieldFlow today and connect with trusted professionals for
            reliable, transparent, and hassle-free home services.
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <Link
              href="/services"
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg"
            >
              Explore Services
            </Link>

            <Link
              href="/contact"
              className="border border-orange-500 text-orange-500 px-8 py-4 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}