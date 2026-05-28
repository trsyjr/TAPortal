// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// --- FIX: Use Static Imports for Legal Pages to bypass Brave/AdBlock filters ---
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndCondition";

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

// Added CbServices Lazy Import
const CbServices = lazy(() => import("./pages/CbServices")); 

// ACA
const CPD = lazy(() => import("./pages/CPD")); 
const Certification = lazy(() => import("./pages/Certification")); 
const Accreditation = lazy(() => import("./pages/Accreditation")); 
const AscendETEEAP = lazy(() => import("./pages/AscendETEEAP")); 
const ServicesACA = lazy(() => import("./pages/ServicesACA")); 

//KM
const KnowledgeProduct = lazy(() => import("./pages/KnowledgeProduct")); 
const CGS = lazy(() => import("./pages/CGS")); 
const KSS = lazy(() => import("./pages/KSS")); 
const RoleFunctions = lazy(() => import("./pages/RoleFunctions")); 
const ServicesKM = lazy(() => import("./pages/ServicesKM")); 

//TAAORSS
const TaraProgram = lazy(() => import("./pages/TaraProgram"));
const TAMP = lazy(() => import("./pages/TAMP")); 
const PAR = lazy(() => import("./pages/PAR")); 
const ORF = lazy(() => import("./pages/ORF")); 
const ServicesTAAORSS = lazy(() => import("./pages/ServicesTAAORSS")); 

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./components/Preloader";

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // --- FIX: Scroll to top whenever the path changes ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  return (
    <>
      <Suspense fallback={<Preloader />}>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Navbar />
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
              
              {/* Added CbServices Route */}
              <Route path="/cb-services" element={<CbServices />} />

              {/* ACA */}
              <Route path="/cpd" element={<CPD />} />
              <Route path="/certification" element={<Certification />} />
              <Route path="/accreditation" element={<Accreditation />} />
              <Route path="/ascend-eteeap" element={<AscendETEEAP />} />
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
              <Route path="/ORF" element={<ORF />} />
               <Route path="/services-taaorss" element={<ServicesTAAORSS />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            </Routes>
            <Footer />
          </>
        )}
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
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