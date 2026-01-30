import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import OtherOptions from './components/OtherOptions';
import NewsEvents from './components/NewsEvents';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <OtherOptions />
      <NewsEvents />
      <Footer />
    </div>
  );
}

export default App;

