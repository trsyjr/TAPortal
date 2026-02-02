// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import OtherOptions from "./components/OtherOptions";
import NewsEvents from "./components/NewsEvents";
import About from "./pages/About";

import ActiveProfile from "./pages/ActiveProfile";
import Ldi from "./pages/Ldi";
import Participant from "./pages/Participant";
import TASupport from "./pages/TASupport";
import LD from "./pages/LD";
import CBA from "./pages/CBA";

function App() {
  return (
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
        <Route path="/calendar" element={<div className="pt-28 px-6">Training Calendar Page</div>} />
        <Route path="/resources" element={<div className="pt-28 px-6">Resources Page</div>} />

        {/* FAQ Pages */}
        <Route path="/active-profile" element={<ActiveProfile />} />
        <Route path="/ldi-dip" element={<Ldi />} />
        <Route path="/participant-eligibility" element={<Participant />} />
        <Route path="/ta-support" element={<TASupport />} />
        <Route path="/ld-standards" element={<LD />} />
        <Route path="/cbas" element={<CBA />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
