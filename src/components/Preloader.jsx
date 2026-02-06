// src/components/Preloader.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TALogo from "../assets/TALogo.png";
import TABG from "../assets/TABG.png"; // background image

const Preloader = () => {
  const [visible, setVisible] = useState(true);

  // Automatically hide preloader after a delay (e.g., 2s)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center"
          style={{ backgroundImage: `url(${TABG})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-32 h-32 perspective">
            <motion.img
              src={TALogo}
              alt="Loading..."
              className="w-full h-full"
              animate={{ rotateY: [0, 180, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
