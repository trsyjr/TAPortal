import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const JoinModal = ({ isOpen, onClose }) => {
  const [canJoin, setCanJoin] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    const updateCountdown = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const hkNow = new Date(utc + 8 * 60 * 60 * 1000);

      const day = hkNow.getDay(); // 0 = Sunday
      const hour = hkNow.getHours();
      const minute = hkNow.getMinutes();
      const second = hkNow.getSeconds();

      // Check if it's Wednesday 2–4 PM
      if (day === 3 && hour >= 14 && hour < 16) {
        setCanJoin(true);
        setCountdown("");
        return;
      } else {
        setCanJoin(false);
      }

      // Calculate next Wednesday 2 PM
      let daysUntilWednesday = (3 - day + 7) % 7; // 0 if today is Wednesday
      if (daysUntilWednesday === 0 && hour >= 16) daysUntilWednesday = 7; // already past 4 PM

      const nextWednesday2PM = new Date(
        hkNow.getFullYear(),
        hkNow.getMonth(),
        hkNow.getDate() + daysUntilWednesday,
        14,
        0,
        0
      );

      const diff = nextWednesday2PM - hkNow;

      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000); // update every second

    return () => {
      window.removeEventListener("keydown", handleEsc);
      clearInterval(interval);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition"
            >
              <FaTimes size={20} />
            </button>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#2e3192] mt-10 text-center">
              DSWD ACADEMY CBD-PLDS TA WEDNESDAYS:
              <br />
              <span className="text-gray-700 text-lg">A VIRTUAL CLINIC</span>
            </h2>

            {/* Grid layout */}
            <div className="md:flex">
              {/* LEFT SIDE */}
              <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6 items-center text-center">
                <div className="space-y-4 w-full max-w-md">
                  {/* Time Card */}
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                    <p className="font-semibold text-blue-700 mb-1">Time</p>
                    <p>Feb 18, 2026 | 02:00–4:00 PM</p>
                    <p>Hong Kong SAR</p>
                    <p>Every Wednesday</p>
                  </div>

                  {/* Meeting ID Card */}
                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                    <p className="font-semibold text-green-700 mb-1">Meeting ID</p>
                    <p>850 0469 9612</p>
                  </div>

                  {/* Passcode Card */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                    <p className="font-semibold text-yellow-700 mb-1">Passcode</p>
                    <p>CBDPLDS-TA</p>
                  </div>
                </div>
              </div>

              {/* VERTICAL DIVIDER */}
              <div className="hidden md:flex items-center">
                <div className="border-l-2 border-dashed border-gray-300 h-[15rem] mx-4"></div>
              </div>

              {/* RIGHT SIDE */}
              <div className="md:w-1/2 p-10 flex flex-col justify-center items-center text-center">
                <p className="text-gray-600 mb-6 text-lg">
                  Click below to join the Zoom session directly.
                </p>

                <a
                  href={
                    canJoin
                      ? "https://us06web.zoom.us/j/85004699612?pwd=Sshhb6KiyOkfCLpEdjxoUofzkaX39n.1"
                      : "#"
                  }
                  target={canJoin ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`px-12 py-4 rounded-full font-semibold text-lg shadow-lg transition transform hover:scale-105 ${
                    canJoin
                      ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {canJoin ? "Join Now" : "Unavailable"}
                </a>

                {!canJoin && countdown && (
                  <p className="text-gray-500 mt-2 text-sm">
                    Next session in: {countdown}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinModal;
