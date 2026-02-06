// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = Array.from(document.images);
    let loadedCount = 0;

    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) setIsLoading(false);
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) setIsLoading(false);
        };
      }
    });
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      {!isLoading && (
        <Router>
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
            <Route
              path="/calendar"
              element={<div className="pt-28 px-6">Training Calendar Page</div>}
            />
            <Route path="/knowledgebank" element={<KnowledgeBank />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/active-profile" element={<ActiveProfile />} />
            <Route path="/ldi-dip" element={<Ldi />} />
            <Route path="/participant-eligibility" element={<Participant />} />
            <Route path="/ta-support" element={<TASupport />} />
            <Route path="/ld-standards" element={<LD />} />
            <Route path="/cbas" element={<CBA />} />
          </Routes>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      )}
    </>
  );
}

export default App;
