// src/components/Preloader.jsx
import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-32 h-32 perspective">
        <img
          src="/assets/TALogo.png" // your preloader image
          alt="Loading..."
          className="w-full h-full animate-flip"
        />
      </div>
    </div>
  );
};

export default Preloader;
