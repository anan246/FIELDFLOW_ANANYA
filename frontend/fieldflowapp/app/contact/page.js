"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  CalendarCheck,
  Search,
  Wrench,
  CheckCircle,
} from "lucide-react";
export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">

     

      <section className="bg-[#FFF8F1]">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center">

            <span className="inline-flex px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold">
              CONTACT US
            </span>

            <h1 className="mt-8 text-6xl font-bold text-[#08263B]">
              Get In Touch With
              <span className="text-orange-500"> FieldFlow</span>
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-8">
              Have questions about our home services? Need help booking an
              electrician, plumber, AC technician, or carpenter? We'd love to
              hear from you.
            </p>

          </div>

        </div>

      </section>


      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-12">

         

          <div className="space-y-6">

            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl transition">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Phone className="text-orange-500" size={28}/>
                </div>

                <div>

                  <h3 className="text-2xl font-semibold text-[#08263B]">
                    Phone
                  </h3>

                  <p className="text-gray-600 mt-1">
                    +91 99999999
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl transition">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Mail className="text-orange-500" size={28}/>
                </div>

                <div>

                  <h3 className="text-2xl font-semibold text-[#08263B]">
                    Email
                  </h3>

                  <p className="text-gray-600 mt-1">
                    support@fieldflow.com
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl transition">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <MapPin className="text-orange-500" size={28}/>
                </div>

                <div>

                  <h3 className="text-2xl font-semibold text-[#08263B]">
                    Address
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Mangaluru, Karnataka
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl transition">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Clock className="text-orange-500" size={28}/>
                </div>

                <div>

                  <h3 className="text-2xl font-semibold text-[#08263B]">
                    Working Hours
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Monday - Saturday
                    <br />
                    9:00 AM - 5:00 PM
                  </p>

                </div>

              </div>

            </div>

          </div>


          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

            <h2 className="text-4xl font-bold text-[#08263B]">
              Send a Message
            </h2>

            <p className="text-gray-800 mt-3 mb-8">
              Fill in your details and our team will contact you shortly.
            </p>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-4 placeholder:text-gray-500 focus:ring-2 "
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl placeholder:text-gray-500 px-5 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl placeholder:text-gray-500 px-5 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl placeholder:text-gray-500  px-5 py-4 focus:ring-2 focus:ring-orange-400 outline-none"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-4 resize-none placeholder:text-gray-500 focus:ring-2 focus:ring-orange-400 outline-none"
              ></textarea>

              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition"
              >
                <Send size={20}/>
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>
      <section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">


    <div className="text-center mb-16">

      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-[#08263B]">
        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
        Our Process
      </span>

      <h2 className="text-5xl font-bold text-[#08263B] mt-6">
        Simple Steps To Get Your Home Services Done
      </h2>

      <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
        We make booking home services quick, transparent, and hassle-free.
        Follow these simple steps and let our trusted professionals handle the rest.
      </p>

    </div>


    <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-gray-200 rounded-2xl overflow-hidden">


      <div className="border-r border-gray-200">

        <div className="bg-[#252932] text-center py-6">
          <h1 className="text-7xl font-bold text-white opacity-90">01</h1>
        </div>

        <div className="bg-white text-center p-8">

          <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto">
            <CalendarCheck className="text-white" size={28}/>
          </div>

          <h3 className="text-2xl font-semibold text-[#08263B] mt-6">
            Book Service
          </h3>

          <p className="text-gray-600 mt-4">
            Choose the service you need, select your preferred date and time,
            and confirm your booking in just a few clicks.
          </p>

        </div>

      </div>


      <div className="border-r border-gray-200">

        <div className="bg-[#252932] text-center py-6">
          <h1 className="text-7xl font-bold text-white opacity-90">02</h1>
        </div>

        <div className="bg-white text-center p-8">

          <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto">
            <Search className="text-white" size={28}/>
          </div>

          <h3 className="text-2xl font-semibold text-[#08263B] mt-6">
            Inspection
          </h3>

          <p className="text-gray-600 mt-4">
            Our certified technician visits your location to inspect the issue
            and determine the best solution.
          </p>

        </div>

      </div>


      <div className="border-r border-gray-200">

        <div className="bg-[#252932] text-center py-6">
          <h1 className="text-7xl font-bold text-white opacity-90">03</h1>
        </div>

        <div className="bg-white text-center p-8">

          <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto">
            <Wrench className="text-white" size={28}/>
          </div>

          <h3 className="text-2xl font-semibold text-[#08263B] mt-6">
            Repair
          </h3>

          <p className="text-gray-600 mt-4">
            Our experts perform the repair using professional tools and genuine
            spare parts whenever required.
          </p>

        </div>

      </div>


      <div>

        <div className="bg-[#252932] text-center py-6">
          <h1 className="text-7xl font-bold text-white opacity-90">04</h1>
        </div>

        <div className="bg-white text-center p-8">

          <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto">
            <CheckCircle className="text-white" size={28}/>
          </div>

          <h3 className="text-2xl font-semibold text-[#08263B] mt-6">
            Testing & Delivery
          </h3>

          <p className="text-gray-600 mt-4">
            We thoroughly test the repaired appliance and ensure everything is
            working perfectly before completing the service.
          </p>

        </div>

      </div>

    </div>

  </div>
</section>

      <section className="bg-[#FFF8F1] py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <span className="text-orange-500 font-semibold uppercase tracking-widest">
              Find Us
            </span>

            <h2 className="text-5xl font-bold text-[#08263B] mt-4">
              Visit Our Office
            </h2>

            <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
              Our office is always open during working hours. Feel free to visit
              us or locate us on the map below.
            </p>

          </div>

          <div className="bg-white rounded-[30px] shadow-xl border border-gray-200 overflow-hidden">

            <iframe
              title="FieldFlow Location"
              src="https://www.google.com/maps?q=Bengaluru&output=embed"
              className="w-full h-[450px]"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>

      
      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className=" rounded-[32px] p-14 text-center">

            <span className="text-orange-400 font-semibold uppercase tracking-widest">
              Need Immediate Help?
            </span>

            <h2 className="text-5xl font-bold text-black mt-5">
              Book Trusted Home Services Today
            </h2>

            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-8">
              From electricians and plumbers to AC technicians and carpenters,
              our experienced professionals are ready to help you with reliable
              and affordable services.
            </p>

            <button
              className="mt-10 bg-orange-500 hover:bg-orange-600 transition duration-300 text-white px-10 py-4 rounded-full font-semibold inline-flex items-center gap-3"
            >
              Book Service
              <ArrowRight size={20} />
            </button>

          </div>

        </div>

      </section>

     

    </main>
  );
}
