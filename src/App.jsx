import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import OtherOptions from './components/OtherOptions';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <OtherOptions />
    </div>
  );
}

export default App;

