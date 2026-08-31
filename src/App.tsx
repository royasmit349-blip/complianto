import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer, { StickyMobileCta, WhatsAppFab } from "./components/Footer";
import { JsonLd } from "./components/ui";
import { ScrollTrigger } from "./lib/gsap";
import { SITE } from "./data/site";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import { ComplianceCalendar, NameCheck } from "./pages/Tools";
import { About, Contact } from "./pages/AboutContact";
import { BlogIndex, BlogPost } from "./pages/Blog";
import { LegalPage } from "./pages/Static";
import NotFound from "./pages/NotFound";

/* Reset scroll and refresh GSAP measurements on every route change —
   pinned sections must never survive a navigation stale. */
function ScrollManager() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(t);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollManager />
      {/* GA4 via GTM — client's existing container («GTM-ID» to be supplied pre-launch) */}
      <div className="grain flex min-h-screen flex-col bg-paper text-ink">
        <a
          href="#main"
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("main")?.focus();
          }}
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/tools/name-check" element={<NameCheck />} />
            <Route path="/tools/compliance-calendar" element={<ComplianceCalendar />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<LegalPage doc="privacy" />} />
            <Route path="/terms" element={<LegalPage doc="terms" />} />
            <Route path="/refund-policy" element={<LegalPage doc="refund-policy" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFab />
        <StickyMobileCta />
      </div>

      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Complianto Consulting",
          legalName: SITE.legalName,
          url: "https://complianto.in",
          telephone: SITE.phoneDisplay,
          email: SITE.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "The Office Pass, 1st floor, D-9, Block D, Noida Sector 3",
            addressLocality: "Noida",
            addressRegion: "Uttar Pradesh",
            postalCode: "201301",
            addressCountry: "IN",
          },
        }}
      />
    </HashRouter>
  );
}
