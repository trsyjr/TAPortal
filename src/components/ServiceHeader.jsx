// src/components/ServiceHeader.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ServiceHeader = ({ activeTabId, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const servicesTabs = [
    { id: 0, title: "All", path: "/all-services" },
    { id: 1, title: "Assessment, Certification and Accreditation", path: "/services-aca" },
    { id: 2, title: "Capability Building", path: "/cb-services" },
    { id: 3, title: "Knowledge Management", path: "/services-km" },
    { id: 4, title: "TAAORSS", path: "/services-taaorss" },
  ];

  return (
    <>
      {/* Embedded Underline CSS Styles */}
      <style>
        {`
          .tapered-underline {
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(46, 49, 146, 0.6) 50%, transparent 100%);
          }
        `}
      </style>

      {/* Title & Subtitle */}
      <div className="text-center mb-10">
        <div className="inline-block mb-4">
          <h1 className="text-[44px] tracking-tight leading-none mb-2 no-underline">
            <span className="text-[#2e3192] font-extrabold">Our </span>
            <span className="text-[#ee1c25] font-extrabold italic pl-0.5">Services</span>
          </h1>
          <div className="tapered-underline w-56 mx-auto mt-2"></div>
        </div>
        <p className="text-gray-500 text-[15px] font-medium max-w-[750px] mx-auto leading-relaxed mt-2 no-underline">
          DSWD Academy services in one portal. Simplifying processes and making technical assistance more accessible and convenient.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-[680px] mx-auto mb-14 px-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2e3192]/12 to-[#ee1c25]/12 rounded-full blur-2xl opacity-0 group-focus-within:opacity-100 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
          <div className="relative flex items-center bg-white border border-gray-200 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.03)] group-focus-within:border-[#2e3192] group-focus-within:shadow-[0_15px_45px_rgba(46,49,146,0.1)] transition-all duration-300 overflow-hidden">
            <div className="pl-7 pr-3.5 text-gray-400 group-focus-within:text-[#2e3192] transition-colors duration-300 shrink-0">
              <svg className="w-5.5 h-5.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service or topic are you looking for?"
              className="w-full py-5 pr-14 bg-transparent text-[15.5px] font-semibold tracking-wide text-gray-800 placeholder-gray-400/90 focus:outline-none"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="max-w-[1100px] mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          {servicesTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="relative px-7 py-3.5 rounded-full font-bold text-[13.5px] tracking-wide transform active:scale-[0.98] whitespace-nowrap overflow-hidden bg-[#2e3192] text-white transition-colors duration-300 cursor-pointer no-underline"
              >
                <motion.div
                  className="absolute inset-0 bg-[#ee1c25]"
                  initial={false}
                  animate={{ clipPath: isActive ? "circle(100% at 50% 50%)" : "circle(0% at 50% 50%)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <span className="relative z-10 block text-white no-underline">{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ServiceHeader;