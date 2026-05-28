// src/components/ServicesTAAORSS.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TicketModal from "../components/TicketModal"; 
import SatisfactoryModal from "../components/SatisfactoryModal"; // Integrated component import

const ServicesTAAORSS = () => {
  const navigate = useNavigate();
  const [activeTabId, setActiveTabId] = useState(4);
  const [openAccordionId, setOpenAccordionId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const servicesTabs = [
    { id: 1, title: "Assessment, Certification and Accreditation", path: "/services-aca" },
    { id: 2, title: "Capability Building", path: "/cb-services" },
    { id: 3, title: "Knowledge Management", path: "/services-km" },
    { id: 4, title: "TAAORSS", path: "/services-taaorss" },
  ];

  const servicesContent = {
    4: {
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

  const handleTabClick = (tab) => {
    if (tab.id !== 4) {
      navigate(tab.path, { state: { defaultTabId: tab.id } });
    }
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

  const currentCategory = servicesContent[activeTabId];

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
        <div className="text-center mb-14">
          <div className="inline-block mb-4">
            <h1 className="text-[44px] tracking-tight leading-none mb-2">
              <span className="text-[#2e3192] font-extrabold">Our </span>
              <span className="text-[#ee1c25] font-extrabold italic pl-0.5">Services</span>
            </h1>
            <div className="tapered-underline w-56 mx-auto mt-2"></div>
          </div>
          <p className="text-gray-500 text-[15px] font-medium max-w-[750px] mx-auto leading-relaxed mt-2">
            DSWD Academy services in one portal. Simplifying processes, and making technical assistance more accessible and convenient.
          </p>
        </div>

        {/* PREMIUM BUTTON TABS */}
        <div className="max-w-[1100px] mx-auto mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {servicesTabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className="relative px-7 py-3.5 rounded-full font-bold text-[13.5px] tracking-wide transition-all duration-300 transform active:scale-[0.98] whitespace-nowrap overflow-hidden group border-2 bg-[#2e3192] text-white transition-colors duration-300"
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
            {currentCategory && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="flex items-center gap-3 mb-6 pl-1">
                  <div className="w-1 h-6 bg-[#ee1c25] rounded-full"></div>
                  <h2 className="text-[#2e3192] text-[20px] font-bold tracking-tight">{currentCategory.categoryTitle}</h2>
                </div>

                <div className="space-y-4">
                  {currentCategory.items.map((subItem) => {
                    const isExpanded = openAccordionId === subItem.id;
                    
                    return (
                      <div key={subItem.id} className={`w-full overflow-hidden transition-all duration-300 border ${isExpanded ? "bg-[#2e3192] border-[#2e3192] premium-shadow-active rounded-3xl" : "bg-white border-gray-200/70 hover:border-gray-300 premium-shadow rounded-3xl"}`}>
                        <button onClick={() => toggleAccordion(subItem.id, subItem.title)} className="w-full px-8 py-5 flex items-center justify-between mx-auto text-center focus:outline-none relative">
                          <div className="w-5 shrink-0 hidden sm:block"></div>
                          <div className="flex flex-col items-center justify-center mx-auto">
                            <span className={`font-bold text-[15.5px] tracking-tight ${isExpanded ? "text-[#FFE066]" : "text-gray-800"}`}>{subItem.title}</span>
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
                                  className="flex items-center gap-2 px-6 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105"
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
          />
        )}
      </AnimatePresence>

      {/* SATISFACTORY FEEDBACK MODAL INTEGRATION */}
      <SatisfactoryModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
        spreadsheetId="1FyPV2W83SQ30HdAMYsQ2Fqv9HJvuOM_v4tcWk3BaHqU"
      />
    </div>
  );
};

export default ServicesTAAORSS;