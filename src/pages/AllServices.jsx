// src/pages/AllServices.jsx
import React, { useState } from "react";
import ServiceHeader from "../components/ServiceHeader.jsx";
import ServicesACA from "./ServicesACA.jsx";
import CbServices from "./CbServices.jsx";
import ServicesKM from "./ServicesKM.jsx";
import ServicesTAAORSS from "./ServicesTAAORSS.jsx";

const AllServices = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-['Montserrat',sans-serif]">
      <main className="max-w-[1440px] mx-auto px-16 pt-28 pb-24">
        {/* Render Master Header & Tab Navigation ONLY ONCE */}
        <ServiceHeader 
          activeTabId={0} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        {/* Accordion Content Views without Duplicate Headers */}
        <div className="space-y-12">
          <ServicesACA hideHeader searchQuery={searchQuery} />
          <div className="border-t border-gray-100 pt-10">
            <CbServices hideHeader searchQuery={searchQuery} />
          </div>
          <div className="border-t border-gray-100 pt-10">
            <ServicesKM hideHeader searchQuery={searchQuery} />
          </div>
          <div className="border-t border-gray-100 pt-10">
            <ServicesTAAORSS hideHeader searchQuery={searchQuery} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllServices;