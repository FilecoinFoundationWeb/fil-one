import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import ComparisonSection from "@/components/ComparisonSection";
import SavingsSection from "@/components/SavingsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fil One",
  url: "https://filone.io",
  logo: "https://filone.io/favicon.png",
  sameAs: ["https://twitter.com/FilOneStorage"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://filone.io/contact-sales",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Fil One",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "S3-compatible object storage built on Filecoin. Enterprise-grade durability, no egress fees, and verifiable data integrity.",
  url: "https://filone.io",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "30-day free trial, 1 TB included, no credit card required.",
  },
};

const Index = () => {
  useSeo({
    title: "Fil One — S3-Compatible Object Storage Built for the AI Era",
    description:
      "S3-compatible object storage built on Filecoin. Enterprise-grade durability, no egress fees, and verifiable data integrity. Drop-in replacement for AWS S3.",
    canonical: "https://filone.io/",
    ogImage: "https://filone.io/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />
      <Navbar />
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <PricingSection />
      <ComparisonSection />
      <SavingsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
