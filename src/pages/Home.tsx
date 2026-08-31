import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { usePageMeta } from "../lib/seo";
import { JsonLd } from "../components/ui";
import { SITE } from "../data/site";
import ComplianceLine from "../motion/ComplianceLine";
import Hero from "../home/Hero";
import Journey from "../home/Journey";
import ServicesGrid from "../home/ServicesGrid";
import WhyAndStats from "../home/WhyAndStats";
import DeadlineTracker from "../home/DeadlineTracker";
import PeopleAndProof from "../home/PeopleAndProof";
import Closing from "../home/Closing";

export default function Home() {
  usePageMeta(
    "Complianto — Business Compliance, Company Registration, GST, ROC & Trademark | Noida",
    "From incorporation to GST, ROC filings and beyond — Complianto handles the paperwork while you build. 20,000+ businesses served across India.",
  );

  /* refresh triggers once webfonts swap in — keeps pins and rails aligned */
  useEffect(() => {
    let mounted = true;
    document.fonts?.ready.then(() => { if (mounted) ScrollTrigger.refresh(); });
    return () => { mounted = false; };
  }, []);

  return (
    <div id="home" className="relative mx-auto max-w-[1360px] lg:grid lg:grid-cols-[minmax(0,1fr)_132px]">
      <div className="min-w-0 overflow-x-clip">
        <Hero />
        <Journey />
        <ServicesGrid />
        <WhyAndStats />
        <DeadlineTracker />
        <PeopleAndProof />
        <Closing />
      </div>
      <ComplianceLine />

      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Complianto Consulting",
          legalName: SITE.legalName,
          telephone: SITE.phoneDisplay,
          email: SITE.email,
          url: "https://complianto.in",
          address: {
            "@type": "PostalAddress",
            streetAddress: "The Office Pass, 1st floor, D-9, Block D, Noida Sector 3, near Noida Sector 16 Metro",
            addressLocality: "Noida",
            addressRegion: "Uttar Pradesh",
            postalCode: "201301",
            addressCountry: "IN",
          },
          openingHours: "Mo-Sa 10:00-19:00",
          priceRange: "₹₹",
        }}
      />
    </div>
  );
}
