// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Advisory from "./components/Advisory"; 

// --- FIX: Use Static Imports for Legal Pages to bypass Brave/AdBlock filters ---
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndCondition";

// Import your modals globally so they can be contextually targeted from any path
import TicketModal from "./components/TicketModal";
import SatisfactoryModal from "./components/SatisfactoryModal";

// Pages/Components converted to Lazy Imports
const HomePage = lazy(() => import("./components/HomePage"));
const OtherOptions = lazy(() => import("./components/OtherOptions"));
const Services = lazy(() => import("./components/Services"));
const NewsEvents = lazy(() => import("./components/NewsEvents"));
const About = lazy(() => import("./pages/About"));
const KnowledgeBank = lazy(() => import("./pages/KnowledgeBank"));
const Resources = lazy(() => import("./pages/Resources"));
const ActiveProfile = lazy(() => import("./pages/ActiveProfile"));
const Ldi = lazy(() => import("./pages/Ldi"));
const Participant = lazy(() => import("./pages/Participant"));
const TASupport = lazy(() => import("./pages/TASupport"));
const LD = lazy(() => import("./pages/LD"));
const CBA = lazy(() => import("./pages/CBA"));
const CBPlan = lazy(() => import("./pages/CBPlan"));
const TrainingCalendar = lazy(() => import("./components/TrainingCalendar"));
const CbServices = lazy(() => import("./pages/CbServices")); 
const TACalendar = lazy(() => import("./pages/TACalendar"));

const AllServices = lazy(() => import("./pages/AllServices")); 

// ACA
const CPD = lazy(() => import("./pages/CPD")); 
const Certification = lazy(() => import("./pages/Certification")); 
const Accreditation = lazy(() => import("./pages/Accreditation")); 
const OLP = lazy(() => import("./pages/OLP")); 
const ServicesACA = lazy(() => import("./pages/ServicesACA")); 

// KM
const KnowledgeProduct = lazy(() => import("./pages/KnowledgeProduct")); 
const CGS = lazy(() => import("./pages/CGS")); 
const KSS = lazy(() => import("./pages/KSS")); 
const RoleFunctions = lazy(() => import("./pages/RoleFunctions")); 
const ServicesKM = lazy(() => import("./pages/ServicesKM")); 

// TAAORSS
const TaraProgram = lazy(() => import("./pages/TaraProgram"));
const TAMP = lazy(() => import("./pages/TAMP")); 
const PAR = lazy(() => import("./pages/PAR")); 
const SDCA = lazy(() => import("./pages/SDCA")); 
const ServicesTAAORSS = lazy(() => import("./pages/ServicesTAAORSS")); 

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./components/Preloader";

// =========================================================================
// GLOBAL ANALYTICS CONFIGURATION
// =========================================================================
const GOOGLE_ANALYTICS_URL = "https://script.google.com/macros/s/AKfycbzhhTUrdvzXhOK3cc3DHhXiyq_wmvDrfEuoK1p-gPELyRyqcJ11b2gFj5Pe_HkSJI0ETw/exec";

// Deduplication locks for fast button clicks
let lastTrackedTimestamp = 0;
let lastTrackedSignature = "";

const trackEvent = async (type, target) => {
  if (!GOOGLE_ANALYTICS_URL || GOOGLE_ANALYTICS_URL.startsWith("PASTE_YOUR")) {
    console.warn("Analytics: Setup incomplete. Missing GOOGLE_ANALYTICS_URL.");
    return;
  }

  // --- PERSISTENT SESSION HOOK LOCK ---
  // If this is a page view tracking request, check our temporary storage ticket lock
  if (type === "page_view") {
    const hasAlreadyFiredOnThisLoad = sessionStorage.getItem("analytics_pv_lock");
    if (hasAlreadyFiredOnThisLoad === "true") {
      return; // Stop immediately, we already logged this initial page hit!
    }
    // Lock it instantly so subsequent component mount stutters are completely blocked
    sessionStorage.setItem("analytics_pv_lock", "true");
  }

  // Rapid interaction debounce window (500ms for clicks/modals)
  const now = Date.now();
  const currentSignature = `${type}_${target}`;
  if (currentSignature === lastTrackedSignature && now - lastTrackedTimestamp < 500) {
    return; 
  }

  lastTrackedTimestamp = now;
  lastTrackedSignature = currentSignature;

  try {
    await fetch(GOOGLE_ANALYTICS_URL, {
      method: "POST",
      mode: "no-cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, target }),
    });
  } catch (error) {
    console.error("Analytics failure:", error);
  }
};

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Layout level state tracking if the user dismissed it during this active session view
  const [hasDismissed, setHasDismissed] = useState(() => {
    const suppressedForever = localStorage.getItem("dswd_internal_advisory_suppressed");
    if (suppressedForever) return true;

    const suppressedSession = sessionStorage.getItem("dswd_advisory_route_safe");
    return !!suppressedSession;
  });

  const [globalTicketOpen, setGlobalTicketOpen] = useState(false);
  const [globalFeedbackOpen, setGlobalFeedbackOpen] = useState(false);
  const [globalServiceType, setGlobalServiceType] = useState("");
  const [globalInquiryType, setGlobalInquiryType] = useState("");

  // Fire page view analysis on initial bootstrap mount
  useEffect(() => {
    trackEvent("page_view", window.location.pathname);
  }, []); 

  // Listen to custom DOM events emitted by any deep page down the tree + track click
  useEffect(() => {
    const handleOpenGlobalTicket = (e) => {
      const { inquiryType, serviceType } = e.detail || {};
      setGlobalInquiryType(inquiryType || "");
      setGlobalServiceType(serviceType || "");
      setGlobalTicketOpen(true);

      // Log the click action that generated this portal ticket request
      trackEvent("button_click", `Open Ticket Modal - Service: ${serviceType || "General"}`);
    };

    window.addEventListener("OPEN_PORTAL_TICKET", handleOpenGlobalTicket);
    return () => window.removeEventListener("OPEN_PORTAL_TICKET", handleOpenGlobalTicket);
  }, []);

  // --- Scroll to top whenever the path changes ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Preloader and Image asset engine
  useEffect(() => {
    setIsLoading(true);
    const preloadImages = ["/assets/TALogo.png"];
    let loadedCount = 0;

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === preloadImages.length) {
          setTimeout(() => setIsLoading(false), 500);
        }
      };
    });

    const minTimeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(minTimeout);
  }, [location.pathname]);

  // CRITICAL CLEANUP: Wipes the storage validation token during manual user reloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("dswd_advisory_route_safe");
      // Destroy the page view lock right as the user reloads so the new session is allowed to count as exactly 1 again!
      sessionStorage.removeItem("analytics_pv_lock");
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleCloseAdvisory = () => {
    sessionStorage.setItem("dswd_advisory_route_safe", "true");
    setHasDismissed(true);
    // REMOVED: trackEvent statement here so closing the layout notice doesn't trigger spreadsheet additions
  };

  return (
    <>
      <Suspense fallback={<Preloader />}>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Navbar />
            
            {/* Renders properly without resetting across routing actions */}
            {!hasDismissed && <Advisory onClose={handleCloseAdvisory} />}
            
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HomePage />
                    <OtherOptions />
                    <Services />
                    <NewsEvents />
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/knowledgebank" element={<KnowledgeBank />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/active-profile" element={<ActiveProfile />} />
              <Route path="/ldi-dip" element={<Ldi />} />
              <Route path="/participant-eligibility" element={<Participant />} />
              <Route path="/ta-support" element={<TASupport />} />
              <Route path="/ld-standards" element={<LD />} />
              <Route path="/cbas" element={<CBA />} />
              <Route path="/cbplan" element={<CBPlan />} />
              <Route path="/training-calendar" element={<TrainingCalendar />} />
              <Route path="/cb-services" element={<CbServices />} />
              <Route path="/ta-calendar" element={<TACalendar />} />

              <Route path="/all-services" element={<AllServices />} />

              {/* ACA */}
              <Route path="/cpd" element={<CPD />} />
              <Route path="/certification" element={<Certification />} />
              <Route path="/accreditation" element={<Accreditation />} />
              <Route path="/olp" element={<OLP />} />
              <Route path="/services-aca" element={<ServicesACA />} />

              {/* KM */}
              <Route path="/knowledge-product" element={<KnowledgeProduct />} />
              <Route path="/cgs" element={<CGS />} />
              <Route path="/kss" element={<KSS />} />
              <Route path="/role-functions" element={<RoleFunctions />} />
              <Route path="/services-km" element={<ServicesKM />} />

              {/* TAAORS */}
              <Route path="/tara-program" element={<TaraProgram />} />
              <Route path="/tamp" element={<TAMP />} />
              <Route path="/par" element={<PAR />} />
              <Route path="/sdca" element={<SDCA />} />
              <Route path="/services-taaorss" element={<ServicesTAAORSS />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            </Routes>
            <Footer />
          </>
        )}
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* =========================================================================
          GLOBAL MODAL IMPLEMENTATIONS (Bridges data mapping automatically)
          ========================================================================= */}
      <TicketModal
        isOpen={globalTicketOpen}
        serviceType={globalServiceType}
        defaultInquiryType={globalInquiryType}
        onClose={(inquiry, service) => {
          setGlobalTicketOpen(false);
          if (inquiry) {
            setGlobalInquiryType(inquiry);
            setGlobalServiceType(service);
            setGlobalFeedbackOpen(true);
            trackEvent("button_click", `Submitted Ticket Success - Inquiry: ${inquiry}`);
          } else {
            trackEvent("button_click", "Closed Ticket Modal Abandoned");
          }
        }}
      />

      <SatisfactoryModal
        isOpen={globalFeedbackOpen}
        inquiryType={globalInquiryType}
        serviceType={globalServiceType}
        spreadsheetId="14m2v8zTSDXrgOduADBJi9n1JudkswsOPI93A3UhPsn8" 
        onClose={() => {
          setGlobalFeedbackOpen(false);
          setGlobalInquiryType("");
          setGlobalServiceType("");
          trackEvent("button_click", "Closed Feedback Modal");
        }}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;