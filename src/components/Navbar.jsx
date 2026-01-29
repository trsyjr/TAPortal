// src/components/Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuItems = ["Home", "Training Calendar", "Resources", "About"];
  const hoverColor = "#2e3192";

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <span className="text-blue-600">TA</span>Portal
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <li key={item} className="relative group cursor-pointer font-medium text-gray-700">
              <span className="relative">{item}</span>
              {/* Underline */}
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#2e3192] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out" />
            </li>
          ))}
        </ul>

        {/* Mobile Burger Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-3xl focus:outline-none z-50"
        >
          {open ? <FiX color={hoverColor} /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-8 flex flex-col space-y-6 z-40"
          >
            {menuItems.map((item) => (
              <div
                key={item}
                className="relative cursor-pointer text-gray-700 font-medium group"
                onClick={() => setOpen(false)}
              >
                <span className="hover:text-[#2e3192] transition-colors duration-300">{item}</span>
                {/* Underline */}
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#2e3192] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out" />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
