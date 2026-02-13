import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import TALogo from "../assets/TALogo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    // { name: "Training Calendar", path: "/calendar" },
    { name: "Knowledge Bank", path: "/knowledgebank" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      {/* Navbar container */}
      <nav className="w-full fixed top-0 left-0 z-40 backdrop-blur-lg bg-white border-b border-white shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between w-full px-6 md:px-12 py-4">
          
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img src={TALogo} alt="TA Portal Logo" className="h-12 md:h-16" />
            </NavLink>
          </div>


          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 font-semibold text-gray-700">
            {menuItems.map((item) => (
              <li key={item.name} className="relative group cursor-pointer">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative transition-colors duration-300 ${
                      isActive ? "text-[#ee1c25]" : "text-gray-700"
                    }`
                  }
                >
                  {item.name}
                  {/* Underline */}
                  <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#2e3192] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out" />
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Burger Icon */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 text-3xl focus:outline-none"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-8 flex flex-col space-y-6 z-50 md:hidden"
          >
            {/* X Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="self-end text-3xl text-gray-700 focus:outline-none"
            >
              <FiX />
            </button>

            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `relative font-semibold transition-colors duration-300 ${
                    isActive ? "text-[#ee1c25]" : "text-gray-700"
                  } group`
                }
              >
                {item.name}
                <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#2e3192] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out" />
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
