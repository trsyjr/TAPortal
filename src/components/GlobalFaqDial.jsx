// src/components/GlobalFaqDial.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLayerGroup as FaLayerGroupIcon, FaXmark as FaXmarkIcon } from "react-icons/fa6";

const GlobalFaqDial = ({ routes, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  // Close when clicking outside of the active dial component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const radius = 135;

  // Projectile physics timeline: leaves the ground, jumps high, spins fluidly
  const ballBounceSequence = {
    y: [0, -45, 0, -22, 0, -8, 0, 0],
    rotate: [0, 140, 220, 290, 330, 350, 360, 360],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: [
        "easeOut", "easeIn",
        "easeOut", "easeIn",
        "easeOut", "easeIn",
        "easeInOut"
      ],
      times: [0, 0.08, 0.16, 0.23, 0.30, 0.35, 0.40, 1.0],
    },
  };

  // Determine the active state based on menu open and user pointer position
  const getButtonAnimationState = () => {
    if (isOpen) return "openState";
    if (isHovered) return "hoverState"; // Freezes the active bounce timeline sequence
    return ballBounceSequence;
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed bottom-8 left-8 z-[100] flex items-center justify-center w-16 h-16"
    >
      {/* Radial Fan-out Menu Items */}
      <AnimatePresence>
        {isOpen &&
          routes.map((route, index) => {
            const totalItems = routes.length;
            const startAngle = 90 * (Math.PI / 180);
            const endAngle = 0 * (Math.PI / 180);
            
            const angle = startAngle - (index / (totalItems - 1)) * (startAngle - endAngle);
            
            const customX = Math.cos(angle) * radius;
            const customY = -Math.sin(angle) * radius;

            return (
              <motion.div
                key={route.path}
                className="absolute flex items-center justify-center group cursor-pointer"
                style={{ zIndex: 200 - index }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: customX, y: customY }}
                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 230, damping: 20, delay: index * 0.02 }}
                whileHover="hoverState"
                onClick={() => {
                  if (onNavigate) onNavigate(route.path);
                  setIsOpen(false);
                }}
              >
                {/* Hover Floating Title Tooltip */}
                <div className="absolute left-16 bg-[#2e3192] border border-white/20 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-2xl opacity-0 pointer-events-none -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 uppercase whitespace-nowrap tracking-wide z-[210]">
                  {route.title}
                </div>

                {/* Circular Rounded Icon Container */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-0 bg-[#FFE066] border border-white/40 shadow-xl rounded-2xl"
                    variants={{
                      hoverState: { scale: 1.15, rotate: -12 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  />
                  <motion.div 
                    className="relative z-10 text-[#2e3192] w-6 h-6 flex items-center justify-center pointer-events-none"
                    variants={{
                      hoverState: { rotate: -12 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {route.adIcon && React.cloneElement(route.adIcon, { size: 24 })}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Main Core Toggle Trigger Button */}
      <motion.div
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-16 h-16 flex items-center justify-center cursor-pointer select-none relative z-10 rounded-2xl shadow-xl border border-black/5"
        animate={getButtonAnimationState()}
      >
        {/* Core Animated Shape - Background container */}
        <motion.div
          className="absolute inset-0 bg-[#ee1c25] border border-white/30 rounded-2xl"
          variants={{
            hoverState: { 
              scale: 1.1, 
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 15 }
            },
            openState: { 
              rotate: -135, 
              scale: 1, 
              backgroundColor: "#2e3192", 
              y: 0,
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }
          }}
        />

        {/* Dynamic Icon Layer */}
        <motion.div 
          className="relative z-20 text-white w-8 h-8 flex items-center justify-center pointer-events-none"
          variants={{
            hoverState: { 
              scale: 1.1, 
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 15 }
            },
            openState: { 
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }
          }}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="menu-icon"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.15 }}
              >
                <FaLayerGroupIcon size={26} />
              </motion.div>
            ) : (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                <FaXmarkIcon size={26} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GlobalFaqDial;