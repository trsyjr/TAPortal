// src/components/GlobalFaqDial.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLayerGroup, FaXmark } from "react-icons/fa6";

const GlobalFaqDial = ({ routes, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  // Increased distance from the center button to give them space
  const radius = 135;

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex items-center justify-center w-16 h-16">
      {/* Radial Fan-out Menu Items */}
      <AnimatePresence>
        {isOpen &&
          routes.map((route, index) => {
            const totalItems = routes.length;
            
            // Widen the angle distribution window so they aren't cramped.
            // Starts slightly below horizontal (-10 deg) and ends past vertical (100 deg)
            const startAngle = -10 * (Math.PI / 180);
            const endAngle = 100 * (Math.PI / 180);
            
            const angle = startAngle + (index / (totalItems - 1)) * (endAngle - startAngle);
            
            const customX = Math.cos(angle) * radius;
            const customY = -Math.sin(angle) * radius;

            return (
              <motion.div
                key={route.path}
                className="absolute flex items-center justify-center group cursor-pointer"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: customX, y: customY }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 230, damping: 20, delay: index * 0.02 }}
                onClick={() => {
                  if (onNavigate) onNavigate(route.path);
                  setIsOpen(false);
                }}
              >
                {/* Hover Floating Title Tooltip */}
                <div className="absolute left-16 bg-[#2e3192] border border-white/20 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-2xl opacity-0 pointer-events-none -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 uppercase whitespace-nowrap tracking-wide z-50">
                  {route.title}
                </div>

                {/* Circular Rounded Icon Component */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-0 bg-[#FFE066] border border-white/40 shadow-xl rounded-2xl"
                    whileHover={{ scale: 1.15, rotate: -12 }}
                  />
                  <div className="relative z-10 text-[#2e3192] w-6 h-6 flex items-center justify-center pointer-events-none">
                    {route.adIcon && React.cloneElement(route.adIcon, { size: 24 })}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Main Core Toggle Trigger Button */}
      <motion.div
        onClick={handleToggle}
        className="w-16 h-16 flex items-center justify-center cursor-pointer select-none relative z-10"
        initial="rest"
        whileHover="hover"
        animate={isOpen ? "open" : "rest"}
      >
        <motion.div
          className="absolute inset-0 bg-[#ee1c25] border border-white/30 shadow-2xl rounded-2xl"
          variants={{
            rest: { rotate: 0, scale: 1 },
            hover: { rotate: -45, scale: 1.05 },
            open: { rotate: -135, scale: 1, backgroundColor: "#2e3192" }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />

        <div className="relative z-20 text-white w-8 h-8 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="menu-icon"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.15 }}
              >
                <FaLayerGroup size={26} />
              </motion.div>
            ) : (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                <FaXmark size={26} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalFaqDial;