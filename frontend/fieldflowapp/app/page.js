import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedServices from "@/components/home/FeaturedServices";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/whyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedServices />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      {/* <Footer /> */}
    </>
  );
}