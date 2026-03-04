import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiExternalLink } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import TALogo from "../assets/TALogo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "CB Plan", path: "/CBPlan" },
    { name: "Training Calendar", path: "https://training-calendar-three.vercel.app/", isExternal: true },
    { name: "Knowledge Bank", path: "/knowledgebank" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-40 backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm select-none">
        <div className="flex items-center justify-between w-full px-6 md:px-12 py-4">
          
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img src={TALogo} alt="TA Portal Logo" className="h-10 md:h-12 w-auto" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 font-bold text-gray-700">
            {menuItems.map((item) => (
              <motion.li
                key={item.name}
                className="relative cursor-pointer"
                onMouseEnter={() => setDropdown(item.name)}
                onMouseLeave={() => setDropdown(null)}
                initial="initial"
                whileHover="hover"
              >
                {item.isExternal ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative py-2 flex items-center gap-2 hover:text-[#ee1c25] transition-colors duration-300"
                  >
                    <span>{item.name}</span>
                    <FiExternalLink size={14} className="opacity-40" />
                    
                    {/* Fixed Center-Grow Motion Underline */}
                    <motion.span 
                      variants={{
                        initial: { scaleX: 0 },
                        hover: { scaleX: 1 }
                      }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ originX: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2e3192]"
                    />
                  </a>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative py-2 block transition-colors duration-300 ${
                        isActive ? "text-[#ee1c25]" : "text-gray-700 hover:text-[#ee1c25]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}
                        {/* No underline if active, smooth motion underline if inactive */}
                        {!isActive && (
                          <motion.span 
                            variants={{
                              initial: { scaleX: 0 },
                              hover: { scaleX: 1 }
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            style={{ originX: 0.5 }}
                            className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2e3192]"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </motion.li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiMenu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl p-8 z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <img src={TALogo} alt="Logo" className="h-10" />
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                  <FiX size={30} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.isExternal ? { pathname: item.path } : item.path}
                    onClick={() => !item.isExternal && setOpen(false)}
                    target={item.isExternal ? "_blank" : "_self"}
                    className={({ isActive }) => 
                      `flex items-center justify-between py-4 px-2 text-lg font-bold transition-all border-b border-gray-50 ${
                        isActive && !item.isExternal ? "text-[#ee1c25]" : "text-gray-800"
                      }`
                    }
                  >
                    {item.name}
                    {item.isExternal && <FiExternalLink size={16} className="opacity-40" />}
                  </NavLink>
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