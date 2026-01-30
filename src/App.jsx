// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import OtherOptions from "./components/OtherOptions";
import NewsEvents from "./components/NewsEvents";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <OtherOptions />
            <NewsEvents />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<div className="pt-28 px-6">Training Calendar Page</div>} />
        <Route path="/resources" element={<div className="pt-28 px-6">Resources Page</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
