// src/components/Advisory.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBuildingShield, FaEnvelope } from "react-icons/fa6";

const Advisory = ({ onClose, forceShow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const isSuppressedForever = localStorage.getItem("dswd_internal_advisory_suppressed");
    const isSuppressedThisRouteView = sessionStorage.getItem("dswd_advisory_route_safe");
    
    if (forceShow) {
      setIsOpen(true);
    } else if (!isSuppressedForever && !isSuppressedThisRouteView) {
      const timer = setTimeout(() => setIsOpen(true), 150);
      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  const handleProceed = () => {
    if (dontShowAgain && !forceShow) {
      localStorage.setItem("dswd_internal_advisory_suppressed", "true");
    }
    
    setIsOpen(false);
    if (onClose) onClose(); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden font-sans z-10"
          >
            <div className="h-2 bg-gradient-to-r from-[#2e3192] via-[#ee1c25] to-[#2e3192]" />

            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              {/* ℹ️ Custom Perfect Geometric SVG Info Icon with Infinite Swaying Loop Motion */}
              <div className="w-20 h-20 flex items-center justify-center text-[#2e3192] mb-4 overflow-visible">
                <motion.div
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut"
                  }}
                  className="flex items-center justify-center origin-center"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-20 h-20"
                    stroke="currentColor" 
                    strokeWidth="1.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    {/* Perfect outer circle */}
                    <circle cx="12" cy="12" r="10" />
                    {/* Centered straight line for the body of the 'i' */}
                    <line x1="12" y1="11" x2="12" y2="17" strokeWidth="1.5" />
                    {/* Centered dot for the top of the 'i' */}
                    <circle cx="12" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
                  </svg>
                </motion.div>
              </div>

              {/* <span className="text-xs font-bold tracking-widest text-[#ee1c25] uppercase mb-1 bg-red-50 px-3 py-1 rounded-full">
                Restricted Access Notice
              </span> */}
              <h2 className="text-2xl sm:text-3xl font-black text-[#2e3192] tracking-tight mb-3">
                Important Notice
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Welcome to the <span className="font-bold text-gray-800">DSWD Academy Technical Assistance Portal</span>. 
                This system is strictly reserved for authenticated internal personnel, offices, and designated stakeholders.
              </p>

              <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-4 text-left space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Authorized Users Include:
                </p>
                <div className="flex items-start gap-3">
                  <FaBuildingShield className="text-[#2e3192] mt-0.5 text-base shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700 leading-tight">
                    DSWD Central Office Bureaus, Services, and Field Offices.
                  </p>
                </div>
              </div>

              <div className="w-full bg-blue-50/50 border border-blue-100/70 rounded-2xl p-4 mb-5 text-left flex items-start gap-3">
                <FaEnvelope className="text-[#2e3192] mt-0.5 text-base shrink-0" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-[#2e3192]">External user?</span> For external partner or stakeholder, you may send your inquiries or technical assistance request via email at{" "}
                  <a 
                    href="mailto:academy@dswd.gov.ph" 
                    className="font-semibold text-[#2e3192] underline hover:text-[#ee1c25] transition-colors"
                  >
                    academy@dswd.gov.ph
                  </a>.
                </p>
              </div>

               <button
                onClick={handleProceed}
                className="w-full bg-[#2e3192] hover:bg-[#ee1c25] text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-md transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                I Understand and Proceed
              </button>

              {!forceShow && (
                <div className="w-full flex items-center justify-center gap-3 mb-5 px-1 pt-5 none group/check">
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dontShowAgain}
                      onChange={(e) => setDontShowAgain(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-md transition-all duration-200 peer-checked:bg-[#2e3192] peer-checked:border-[#2e3192] flex items-center justify-center group-hover/check:border-[#2e3192]">
                      <svg
                        className={`w-3 h-3 text-white transition-opacity duration-200 ${dontShowAgain ? 'opacity-100' : 'opacity-0'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                  <span 
                    onClick={() => setDontShowAgain(!dontShowAgain)}
                    className="text-xs sm:text-sm font-medium text-gray-600 cursor-pointer group-hover/check:text-gray-800 transition-colors"
                  >
                    Don't show this message again
                  </span>
                </div>
              )}

              <p className="text-[10px] text-gray-400 mt-4 text-center max-w-xs leading-normal">
                Unauthorized access attempts or activities violating data privacy standards are strictly audited.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Advisory;