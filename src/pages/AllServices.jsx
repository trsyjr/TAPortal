// src/pages/AllServices.jsx
import React, { useState } from "react";
import ServiceHeader from "../components/ServiceHeader.jsx";
import ServicesACA from "./ServicesACA.jsx";
import CbServices from "./CbServices.jsx";
import ServicesKM from "./ServicesKM.jsx";
import ServicesTAAORSS from "./ServicesTAAORSS.jsx";

// Keyword dictionaries for all categories
const acaKeywords = [
  "assessment", "certification", "accreditation", "cpd", 
  "continuing professional development", "cna", "competency needs assessment", 
  "ascend", "eteeap"
];

const cbKeywords = [
  "capability building", "capbuild", "proposal", "design", "cb plan", 
  "training inclusion", "training management", "knowledge bank", 
  "facilitator", "training data", "guidance"
];

const kmKeywords = [
  "knowledge management", "km", "reporting", "kss", "knowledge sharing", 
  "knowledge products", "cgs", "core group of specialists", "rlrc", 
  "news", "resource person", "elms", "intellectual property", "facility", 
  "marketing", "hosting"
];

const taaorssKeywords = [
  "taaorss", "targeting", "monitoring", "planning", "budget", "wfp", 
  "resource person", "pmc", "sdca", "sdca-is", "partnership", "moa", 
  "mou", "panata ko sa bayan", "rewards", "incentives"
];

const checkMatch = (query, keywords) => {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return keywords.some((kw) => kw.includes(q) || q.includes(kw));
};

const AllServices = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const showACA = checkMatch(searchQuery, acaKeywords);
  const showCB = checkMatch(searchQuery, cbKeywords);
  const showKM = checkMatch(searchQuery, kmKeywords);
  const showTAAORSS = checkMatch(searchQuery, taaorssKeywords);

  const hasAnyMatch = showACA || showCB || showKM || showTAAORSS;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-['Montserrat',sans-serif]">
      <main className="max-w-[1440px] mx-auto px-16 pt-28 pb-24">
        {/* Render Master Header ONLY ONCE */}
        <ServiceHeader 
          activeTabId={0} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        {/* Dynamic Accordion Container */}
        {hasAnyMatch ? (
          <div className="space-y-12">
            {showACA && <ServicesACA hideHeader searchQuery={searchQuery} />}

            {showCB && (
              <div className={showACA ? "border-t border-gray-100 pt-10" : ""}>
                <CbServices hideHeader searchQuery={searchQuery} />
              </div>
            )}

            {showKM && (
              <div className={showACA || showCB ? "border-t border-gray-100 pt-10" : ""}>
                <ServicesKM hideHeader searchQuery={searchQuery} />
              </div>
            )}

            {showTAAORSS && (
              <div className={showACA || showCB || showKM ? "border-t border-gray-100 pt-10" : ""}>
                <ServicesTAAORSS hideHeader searchQuery={searchQuery} />
              </div>
            )}
          </div>
        ) : (
          /* Single Master "No Results" view if zero categories match */
          <div className="text-center py-16 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl max-w-[1000px] mx-auto">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-gray-700 font-bold text-lg mb-1">No results match your search</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-5">Try checking your spelling or adjusting your keywords.</p>
            <button 
              onClick={() => setSearchQuery("")} 
              className="px-5 py-2 text-xs font-bold text-[#2e3192] bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllServices;