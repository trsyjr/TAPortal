import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import TALogo from "../assets/TALogo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null); // track which dropdown is open

  const menuItems = [
    { name: "Home", path: "/" },
    {
      name: "CB Plan and Accomplishment",
      subMenu: [
        { name: "CB Plan", path: "/cbplan" },
        { name: "CB Accomplishment", path: "/cbaccomplishment" },
      ],
    },
    { name: "Knowledge Bank", path: "/knowledgebank" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      {/* Navbar container */}
      <nav className="w-full fixed top-0 left-0 z-40 backdrop-blur-lg bg-white border-b border-white shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between w-full px-6 md:px-12 py-4">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img src={TALogo} alt="TA Portal Logo" className="h-12 md:h-16" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 font-semibold text-gray-700">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative group cursor-pointer"
                onMouseEnter={() => setDropdown(item.name)}
                onMouseLeave={() => setDropdown(null)}
              >
                {item.subMenu ? (
                  <>
                    {/* Parent item with rotating icon */}
                    <div className="flex items-center gap-1 select-none">
                      <span>{item.name}</span>
                      <motion.span
                        animate={{ rotate: dropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        <MdKeyboardArrowDown size={20} />
                      </motion.span>
                    </div>

                    {/* Desktop Dropdown */}
                    <ul
                      className={`absolute top-full left-0 bg-white shadow-lg mt-2 rounded-md overflow-hidden transition-all duration-300 ${
                        dropdown === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                    >
                      {item.subMenu.map((sub) => (
                        <li key={sub.name}>
                          <NavLink
                            to={sub.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 whitespace-nowrap hover:bg-gray-100 ${
                                isActive ? "text-[#ee1c25]" : "text-gray-700"
                              }`
                            }
                          >
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative transition-colors duration-300 ${
                        isActive ? "text-[#ee1c25]" : "text-gray-700"
                      }`
                    }
                  >
                    {item.name}
                    <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#2e3192] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out" />
                  </NavLink>
                )}
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
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col items-start space-y-2 z-50 md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="self-end text-3xl text-gray-700 focus:outline-none mb-4"
            >
              <FiX />
            </button>

            {menuItems.map((item) => (
              <div key={item.name} className="flex flex-col w-full">
                {item.subMenu ? (
                  <>
                    {/* Parent with rotating icon */}
                    <button
                      onClick={() =>
                        setDropdown(dropdown === item.name ? null : item.name)
                      }
                      className="flex justify-between items-center font-semibold text-gray-700 w-full py-2"
                    >
                      <span className="text-left">{item.name}</span>
                      <motion.span
                        animate={{ rotate: dropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        <MdKeyboardArrowDown size={20} />
                      </motion.span>
                    </button>

                    {/* Mobile submenu */}
                    <AnimatePresence>
                      {dropdown === item.name && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col w-full pl-2"
                        >
                          {item.subMenu.map((sub) => (
                            <NavLink
                              key={sub.name}
                              to={sub.path}
                              onClick={() => setOpen(false)}
                              className="py-2 text-gray-700 hover:text-[#ee1c25] w-full text-left"
                            >
                              {sub.name}
                            </NavLink>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="font-semibold text-gray-700 py-2 w-full text-left hover:text-[#ee1c25]"
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
