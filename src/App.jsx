// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import OtherOptions from "./components/OtherOptions";
import NewsEvents from "./components/NewsEvents";
import About from "./pages/About";
import KnowledgeBank from "./pages/KnowledgeBank";
import Resources from "./pages/Resources";
import ActiveProfile from "./pages/ActiveProfile";
import Ldi from "./pages/Ldi";
import Participant from "./pages/Participant";
import TASupport from "./pages/TASupport";
import LD from "./pages/LD";
import CBA from "./pages/CBA";
import CBPlan from "./pages/CBPlan";

// New import for TrainingCalendar
import TrainingCalendar from "./components/TrainingCalendar";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndCondition";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
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

  if (isLoading) return <Preloader />;

  return (
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

        {/* New Training Calendar Route */}
        <Route path="/training-calendar" element={<TrainingCalendar />} />

        {/* New full pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
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