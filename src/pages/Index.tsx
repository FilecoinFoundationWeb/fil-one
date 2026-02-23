import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import SavingsSection from "@/components/SavingsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <PricingSection />
      <SavingsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
