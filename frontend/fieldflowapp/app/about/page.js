import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import HowItWorks from "@/components/about/HowItWorks";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import CTA from "@/components/about/CTA";

export default function AboutPage() {
  return (
    <main className="bg-[#111111] text-white overflow-x-hidden">
      <AboutHero />
      <OurStory />
      <HowItWorks />
      <WhyChooseUs />
      <CTA />
    </main>
  );
}