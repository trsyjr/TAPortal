// src/components/Preloader.jsx
import React from "react";
import TALogo from "../assets/TALogo.png";
import TABG from "../assets/TABG.png"; // background image

const Preloader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${TABG})` }}
    >
      <div className="w-32 h-32 perspective">
        <img
          src={TALogo}
          alt="Loading..."
          className="w-full h-full animate-flip"
        />
      </div>
    </div>
  );
};

export default Preloader;
