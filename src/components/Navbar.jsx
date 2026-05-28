// src/components/Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiExternalLink, FiChevronRight } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import TALogo from "../assets/TALogo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(false);
  const [mobileNestedOpen, setMobileNestedOpen] = useState(false);
  const [desktopNestedOpen, setDesktopNestedOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    {
      name: "Services",
      path: "#",
      isDropdown: true,
      children: [
        { name: "Assessment, Certification, and Accreditation", path: "/services-aca"},
        { name: "Capability Building", path: "/cb-services"},
        { name: "Knowledge Management", path: "/services-km"},
        { name: "TAAORSS", path: "/services-taaorss"},
      ],
    },
    { name: "Training Calendar", path: "https://training-calendar-three.vercel.app/", isExternal: true },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-[100] backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm select-none">
        <div className="flex items-center justify-between w-full px-6 md:px-12 py-4">
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img src={TALogo} alt="TA Portal Logo" className="h-10 md:h-12 w-auto" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 font-bold text-gray-700">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => item.isDropdown && setDropdown(item.name)}
                onMouseLeave={() => {
                  setDropdown(null);
                  setDesktopNestedOpen(false);
                }}
              >
                {item.isDropdown ? (
                  <div className="flex items-center gap-1 py-2 cursor-pointer hover:text-[#ee1c25] transition-colors">
                    <span>{item.name}</span>
                    <MdKeyboardArrowDown className={`transition-transform duration-300 ${dropdown === item.name ? "rotate-180" : ""}`} />
                  </div>
                ) : item.isExternal ? (
                  <a href={item.path} target="_blank" rel="noopener noreferrer" className="relative py-2 flex items-center gap-2 hover:text-[#ee1c25] transition-colors">
                    {item.name} <FiExternalLink size={14} />
                  </a>
                ) : (
                  <NavLink to={item.path} className={({ isActive }) => `relative py-2 block transition-colors ${isActive ? "text-[#ee1c25]" : "hover:text-[#ee1c25]"}`}>
                    {item.name}
                  </NavLink>
                )}

                {/* Desktop Dropdown */}
                <AnimatePresence>
                  {dropdown === item.name && item.children && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 rounded-lg py-2 mt-1 overflow-visible"
                    >
                      {item.children.map((child) => (
                        <li 
                          key={child.name} 
                          className="relative"
                          onMouseEnter={() => child.hasNested && setDesktopNestedOpen(true)}
                          onMouseLeave={() => child.hasNested && setDesktopNestedOpen(false)}
                        >
                          {child.hasNested ? (
                            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2e3192] cursor-pointer transition-all">
                              {child.name} <FiChevronRight size={14} />
                              
                              {/* Nested Sub-Dropdown (Desktop) */}
                              <AnimatePresence>
                                {desktopNestedOpen && (
                                  <motion.ul 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute left-full top-0 w-48 bg-white shadow-xl border border-gray-100 rounded-lg py-2 ml-1"
                                  >
                                    {child.nested.map((sub) => (
                                      <li key={sub.name}>
                                        <NavLink to={sub.path} state={{ defaultTabId: child.defaultTabId }} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2e3192]">
                                          {sub.name}
                                        </NavLink>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <NavLink 
                              to={child.path} 
                              state={{ defaultTabId: child.defaultTabId }}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2e3192] transition-all"
                            >
                              {child.name}
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <button onClick={() => setOpen(true)} className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full">
            <FiMenu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[110] md:hidden" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl p-6 z-[120] md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <img src={TALogo} alt="Logo" className="h-8" />
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-900"><FiX size={28} /></button>
              </div>

              <div className="flex flex-col overflow-y-auto">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-50">
                    {item.isDropdown ? (
                      <>
                        <button onClick={() => setMobileSubmenu(!mobileSubmenu)} className="flex items-center justify-between w-full py-4 text-lg font-bold text-gray-800">
                          {item.name}
                          <MdKeyboardArrowDown className={`transition-transform ${mobileSubmenu ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenu && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-4 overflow-hidden">
                              {item.children.map((child) => (
                                <div key={child.name}>
                                  {child.hasNested ? (
                                    <>
                                      <button onClick={() => setMobileNestedOpen(!mobileNestedOpen)} className="flex items-center justify-between w-full py-3 text-gray-600 font-medium">
                                        {child.name}
                                        <MdKeyboardArrowDown className={`transition-transform ${mobileNestedOpen ? "rotate-180" : ""}`} />
                                      </button>
                                      <AnimatePresence>
                                        {mobileNestedOpen && (
                                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="pl-4 border-l-2 border-gray-100 overflow-hidden">
                                            {child.nested.map((sub) => (
                                              <NavLink key={sub.name} to={sub.path} state={{ defaultTabId: child.defaultTabId }} onClick={() => setOpen(false)} className="block py-2 text-sm text-gray-500">
                                                {sub.name}
                                              </NavLink>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </>
                                  ) : (
                                    <NavLink 
                                      to={child.path} 
                                      state={{ defaultTabId: child.defaultTabId }}
                                      onClick={() => setOpen(false)} 
                                      className="block py-3 text-gray-600 font-medium"
                                    >
                                      {child.name}
                                    </NavLink>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink to={item.path} onClick={() => setOpen(false)} className={({ isActive }) => `block py-4 text-lg font-bold ${isActive ? "text-[#ee1c25]" : "text-gray-800"}`}>
                        {item.name}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;