// src/components/ServicesTAAORSS.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TicketModal from "../components/TicketModal"; 
import SatisfactoryModal from "../components/SatisfactoryModal"; 

const ServicesTAAORSS = () => {
  const navigate = useNavigate();
  
  // This page is explicitly dedicated to Tab ID 5 (TAAORSS) in the unified architecture
  const currentCategoryKey = 5;
  const [openAccordionId, setOpenAccordionId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Synced precisely with your global application routing blueprint
  const servicesTabs = [
    { id: 1, title: "All", path: "/all-services" },
    { id: 2, title: "Assessment, Certification and Accreditation", path: "/services-aca" },
    { id: 3, title: "Capability Building", path: "/cb-services" },
    { id: 4, title: "Knowledge Management", path: "/services-km" },
    { id: 5, title: "TAAORSS", path: "/services-taaorss" },
  ];

  // Exclusively holding TAAORSS content (Mapped to Category 5)
  const servicesContent = {
    5: {
      categoryTitle: "TAAORSS",
      items: [
        { id: 1, title: "Targeting, Assessment, Monitoring, and Planning", content: ["Provision of technical guidance and support to enhance evidence-based planning and performance management of LGUs."] },
        { 
          id: 2, 
          title: "Plan and Budget Development", 
          content: [
            "Support in strengthening FO planning and financial management processes:", 
            "• Assistance in the preparation of the Work and Financial Plan",
            "• Guidance on requests for fund modification and/or reallocation and non-withdrawal"
          ]
        },
        { 
          id: 3, 
          title: "Resource Person and Activity Support", 
          content: [
            "Facilitation of technical and administrative requirements for capacity-building activities:",
            "• Guidance on PMC Accreditation",
            "• Assistance in the request and coordination of resource persons",
            "• Support for meeting requests and related activities"
          ]
        },
        { 
          id: 4, 
          title: "SDCA–Information System (SDCA-IS) Support", 
          content: [
            "Technical assistance in the use and management of the SDCA Information System:",
            "• Processing of requests for account activation",
            "• Provision of orientation and capacity-building sessions on SDCA-IS utilization"
          ]
        },
        { 
          id: 5, 
          title: "Partnership Development", 
          content: [
            "Guidance in establishing and strengthening collaborations:",
            "• Assistance in the preparation and review of Memorandum of Agreement and Memorandum of Understanding",
            "• Assistance in the conduct of regional and hosted national consultation dialogue and workshop"
          ]
        },
        { 
          id: 6, 
          title: "Rewards and Incentives (Panata Ko sa Bayan Program)", 
          content: [
            "Support in promoting excellence and recognizing LGU performance:", 
            "• Guidance on the Panata Ko sa Bayan Program (pursuant to MC No. 18, s. 2023)" 
          ]
        },
        { id: 7, title: "Other Technical Assistance Services", content: "Provision of additional TA services not covered under the above categories, based on emerging needs and specific requests of LGUs/LSWDOs." },
      ]
    }
  };

  // Expand accordion automatically if query conditions uniquely match exactly 1 result
  useEffect(() => {
    if (!searchQuery.trim()) {
      setOpenAccordionId(null);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const currentCategory = servicesContent[currentCategoryKey];

    if (currentCategory) {
      const matchedItems = currentCategory.items.filter((item) => {
        const contentStr = Array.isArray(item.content) ? item.content.join(" ") : item.content;
        return (
          item.title.toLowerCase().includes(lowerQuery) || 
          contentStr.toLowerCase().includes(lowerQuery)
        );
      });

      if (matchedItems.length === 1) {
        setOpenAccordionId(matchedItems[0].id);
        setSelectedService(matchedItems[0].title);
      }
    }
  }, [searchQuery]);

  const handleTabClick = (tab) => {
    navigate(tab.path);
  };

  const toggleAccordion = (id, title) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
    setSelectedService(title);
  };

  const openModalWithService = (title) => {
    setSelectedService(title);
    setIsModalOpen(true);
  };

  const handleCloseTicketModal = () => {
    setIsModalOpen(false);
    setIsFeedbackModalOpen(true); 
  };

  const currentCategory = servicesContent[currentCategoryKey];

  // Filter content items safely considering both array and string variants of .content
  const filteredItems = currentCategory
    ? currentCategory.items.filter((item) => {
        if (!searchQuery.trim()) return true;
        const lowerQuery = searchQuery.toLowerCase();
        const contentStr = Array.isArray(item.content) ? item.content.join(" ") : item.content;
        return (
          item.title.toLowerCase().includes(lowerQuery) || 
          contentStr.toLowerCase().includes(lowerQuery)
        );
      })
    : [];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] antialiased select-none font-['Montserrat',sans-serif]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
          .premium-shadow { box-shadow: 0 4px 20px -2px rgba(46, 49, 146, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03); }
          .premium-shadow-active { box-shadow: 0 12px 30px -8px rgba(46, 49, 146, 0.25); }
          .tapered-underline { height: 2px; background: linear-gradient(90deg, transparent 0%, rgba(46, 49, 146, 0.6) 50%, transparent 100%); }
          .accordion-underline { height: 2px; background: linear-gradient(90deg, transparent 0%, rgba(252, 225, 102, 0.6) 50%, transparent 100%); }
        `}
      </style>

      <main className="max-w-[1440px] mx-auto px-16 pt-28 pb-24">
        {/* Master Headline Titles */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <h1 className="text-[44px] tracking-tight leading-none mb-2">
              <span className="text-[#2e3192] font-extrabold">Our </span>
              <span className="text-[#ee1c25] font-extrabold italic pl-0.5">Services</span>
            </h1>
            <div className="tapered-underline w-56 mx-auto mt-2"></div>
          </div>
          <p className="text-gray-500 text-[15px] font-medium max-w-[750px] mx-auto leading-relaxed mt-2">
            DSWD Academy services in one portal. Simplifying processes and making technical assistance more accessible and convenient.
          </p>
        </div>

        {/* Premium Redesigned Taller Search Bar Container Layout */}
        <div className="max-w-[680px] mx-auto mb-14 px-4">
          <div className="relative group">
            {/* Background Glow Accent on Focus/Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2e3192]/12 to-[#ee1c25]/12 rounded-full blur-2xl opacity-0 group-focus-within:opacity-100 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

            <div className="relative flex items-center bg-white border border-gray-200 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.03)] group-focus-within:border-[#2e3192] group-focus-within:shadow-[0_15px_45px_rgba(46,49,146,0.1)] transition-all duration-300 overflow-hidden">
              
              {/* Search Icon Indicator */}
              <div className="pl-7 pr-3.5 text-gray-400 group-focus-within:text-[#2e3192] transition-colors duration-300 shrink-0">
                <svg className="w-5.5 h-5.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Styled Input Field - Taller vertical height with py-5 */}
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service or topic are you looking for?"
                className="w-full py-5 pr-14 bg-transparent text-[15.5px] font-semibold tracking-wide text-gray-800 placeholder-gray-400/90 focus:outline-none"
              />

              {/* Reset Clear Icon Button */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                    title="Clear text"
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

        {/* PREMIUM BUTTON TABS */}
        <div className="max-w-[1100px] mx-auto mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {servicesTabs.map((tab) => {
              const isActive = tab.id === 5;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className="relative px-7 py-3.5 rounded-full font-bold text-[13.5px] tracking-wide transform active:scale-[0.98] whitespace-nowrap overflow-hidden group bg-[#2e3192] text-white transition-colors duration-300 cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#ee1c25]"
                    initial={false}
                    animate={{ clipPath: isActive ? "circle(100% at 50% 50%)" : "circle(0% at 50% 50%)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 block text-white">{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COHESIVE BOX ACCORDION AREA */}
        <div className="max-w-[1000px] mx-auto">
          <AnimatePresence mode="wait">
            {currentCategory && filteredItems.length > 0 ? (
              <motion.div 
                key={currentCategoryKey}
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="flex items-center gap-3 mb-6 pl-1">
                  <div className="w-1 h-6 bg-[#ee1c25] rounded-full"></div>
                  <h2 className="text-[#2e3192] text-[20px] font-bold tracking-tight">{currentCategory.categoryTitle}</h2>
                </div>

                <div className="space-y-4">
                  {filteredItems.map((subItem) => {
                    const isExpanded = openAccordionId === subItem.id;
                    
                    return (
                      <div key={subItem.id} className={`w-full overflow-hidden transition-all duration-300 border ${isExpanded ? "bg-[#2e3192] border-[#2e3192] premium-shadow-active rounded-3xl" : "bg-white border-gray-200/70 hover:border-gray-300 premium-shadow rounded-3xl"}`}>
                        <button onClick={() => toggleAccordion(subItem.id, subItem.title)} className="w-full px-8 py-5 flex items-center justify-between mx-auto text-center focus:outline-none relative">
                          <div className="w-5 shrink-0 hidden sm:block"></div>
                          <div className="flex flex-col items-center justify-center mx-auto">
                            <span className={`font-bold text-[15.5px] tracking-tight transition-colors duration-200 ${isExpanded ? "text-[#FFE066]" : "text-gray-800"}`}>{subItem.title}</span>
                            {isExpanded && <div className="accordion-underline w-36 mt-2"></div>}
                          </div>
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className={`shrink-0 w-5 h-5 ${isExpanded ? "text-[#FFE066]" : "text-gray-500"}`}>
                            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-white">
                              <div className="px-8 pt-2 pb-7 flex flex-col items-center text-center">
                                {Array.isArray(subItem.content) ? (
                                  <div className="max-w-3xl mx-auto mb-5 text-white/85 text-[14.5px] font-medium leading-relaxed flex flex-col items-start text-left">
                                    <p className="mb-2 self-center text-center">{subItem.content[0]}</p>
                                    {subItem.content.slice(1).map((textRow, idx) => (
                                      <p key={idx} className="mt-1 pl-4">{textRow}</p>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-white/85 text-[14.5px] font-medium leading-relaxed max-w-3xl mb-5">{subItem.content}</p>
                                )}
                                
                                <button 
                                  onClick={() => openModalWithService(subItem.title)} 
                                  className="flex items-center gap-2 px-6 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
                                >
                                  <span>Request Ticket</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* No matching search query layout fallback */
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl max-w-[1000px] mx-auto"
              >
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-gray-700 font-bold text-lg mb-1">No results match your search</h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto mb-5">Try checking your spelling or adjusting your keywords.</p>
                <button onClick={() => setSearchQuery("")} className="px-5 py-2 text-xs font-bold text-[#2e3192] bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-all cursor-pointer">Clear Search</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* TICKET MODAL SYSTEM */}
      <AnimatePresence>
        {isModalOpen && (
          <TicketModal 
            isOpen={isModalOpen} 
            onClose={handleCloseTicketModal} 
            serviceType={selectedService} 
            defaultInquiryType="TAAORSS"
          />
        )}
      </AnimatePresence>

      {/* SATISFACTORY FEEDBACK MODAL INTEGRATION */}
      <SatisfactoryModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
        inquiryType="TAAORSS"
        serviceType={selectedService}
        spreadsheetId="1aPY6QDdyRlI9D_Zd7wI27yzBBvVZ_wEJEcXJQX-MHSs"
      />
    </div>
  );
};

export default ServicesTAAORSS;