import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhoneMockup from "@/components/PhoneMockup";
import HowItWorks from "@/components/HowItWorks";
import HelpCarousel from "@/components/HelpCarousel";
import Testimonials from "@/components/Testimonials";
import SimpleCta from "@/components/SimpleCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PhoneMockup />
        <HowItWorks />
        <HelpCarousel />
        <Testimonials />
        <SimpleCta />
      </main>
      <Footer />
    </>
  );
}
