// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react"; // Added Suspense and lazy
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages/Components converted to Lazy Imports
const HomePage = lazy(() => import("./components/HomePage"));
const OtherOptions = lazy(() => import("./components/OtherOptions"));
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
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndCondition"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./components/Preloader";

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

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