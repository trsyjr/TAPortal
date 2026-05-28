// src/components/CbServices.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import TicketModal from "../components/TicketModal"; // Ensure path is correct
import SatisfactoryModal from "../components/SatisfactoryModal"; // Integrated shared rating view

const CbServices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // This page is explicitly dedicated to Tab ID 2 (Capability Building)
  const [activeTabId, setActiveTabId] = useState(2);
  const [openAccordionId, setOpenAccordionId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); // Controls standard satisfactory view
  const [selectedService, setSelectedService] = useState("");

  // Synchronize state if routing flags pass specific instructions
  useEffect(() => {
    if (location.state && location.state.defaultTabId) {
      if (location.state.defaultTabId !== 2) {
        handleRouting(location.state.defaultTabId);
      } else {
        setActiveTabId(2);
        setOpenAccordionId(null); 
        setSelectedService("");
      }
    }
  }, [location.state]);

  // List of titles that should trigger the modal instead of an external link
  const internalModalServices = [
    "Review of Activity Proposal and Design",
    "Request for Review of Capability Building Plan",
    "Request for Training Inclusion",
    "Request for Training Management"
  ];

  const servicesTabs = [
    { id: 1, title: "Assessment, Certification and Accreditation", path: "/services-aca" },
    { id: 2, title: "Capability Building", path: "/cb-services" },
    { id: 3, title: "Knowledge Management", path: "/services-km" },
    { id: 4, title: "TAAORSS", path: "/services-taaorss" },
  ];

  // Exclusively holding Capability Building (Category 2)
  const servicesContent = {
    2: {
      categoryTitle: "Capability Building",
      items: [
        { 
          id: 1, 
          title: "Review of Activity Proposal and Design", 
          content: "The review of training proposal and design, ensuring the adherence to the training management standards set by the DSWD Academy in support of its mandate to centralize and professionalize learning and development efforts.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 2, 
          title: "Request for Review of Capability Building Plan", 
          content: "Ensure the adherence to the Learning and Development standards set by the Department of Social Welfare and Development Academy in support of its mandate to centralize and professionalize learning and development efforts.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 3, 
          title: "Request for Training Inclusion", 
          content: "To develop and implement a streamlined, standardized, and transparent process for handling training inclusion requests to the DSWD Academy.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 4, 
          title: "Request for Training Management", 
          content: "Ensures a streamlined, standardized, and transparent process for request of training management to the DSWD Academy.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 5, 
          title: "CapBuild Knowledge Bank", 
          content: "selected and high-value TA cases provided by the Capability Building Division – Professional Learning and Development Section (CBD-PLDS) along Learning and Development (L&D) for institutional learning and continuous improvement.", 
          externalLink: "https://drive.google.com/drive/folders/1tkq8sxM354BrvQShJORFQo2wAcxKMQqe?usp=sharing",
          buttonText: "Knowledge Bank" 
        },
      ]
    }
  };

  const handleRouting = (tabId) => {
    const targetTab = servicesTabs.find(t => t.id === tabId);
    if (targetTab && targetTab.id !== 2) {
      navigate(targetTab.path, { state: { defaultTabId: tabId } });
    }
  };

  const handleTabClick = (tab) => {
    if (tab.id === 2) {
      setActiveTabId(2);
      setOpenAccordionId(null); 
      setSelectedService("");
    } else {
      handleRouting(tab.id);
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

  const handleExternalLinkClick = () => {
    setIsFeedbackModalOpen(true);
  };

  const currentCategory = servicesContent[activeTabId];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] antialiased select-none font-['Montserrat',sans-serif]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
          .premium-shadow {
            box-shadow: 0 4px 20px -2px rgba(46, 49, 146, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03);
          }
          .premium-shadow-active {
            box-shadow: 0 12px 30px -8px rgba(46, 49, 146, 0.25);
          }
          .tapered-underline {
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(46, 49, 146, 0.6) 50%, transparent 100%);
          }
          .accordion-underline {
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(252, 225, 102, 0.6) 50%, transparent 100%);
          }
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
                    animate={{
                      clipPath: isActive
                        ? "circle(100% at 50% 50%)"
                        : "circle(0% at 50% 50%)"
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  
                  <motion.span
                    className="relative z-10 block group-hover:text-white"
                    initial={false}
                    animate={{ color: isActive ? "#ffffff" : "#ffffff" }}
                    transition={{ duration: 0.3 }}
                  >
                    {tab.title}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COHESIVE BOX ACCORDION AREA */}
        <div className="max-w-[1000px] mx-auto">
          <AnimatePresence mode="wait">
            {currentCategory ? (
              <motion.div
                key={activeTabId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="flex items-center gap-3 mb-6 pl-1">
                  <div className="w-1 h-6 bg-[#ee1c25] rounded-full"></div>
                  <h2 className="text-[#2e3192] text-[20px] font-bold tracking-tight">
                    {currentCategory.categoryTitle}
                  </h2>
                </div>

                <div className="space-y-4">
                  {currentCategory.items.map((subItem) => {
                    const isExpanded = openAccordionId === subItem.id;
                    const isModalButton = internalModalServices.includes(subItem.title);
                    
                    return (
                      <div 
                        key={subItem.id} 
                        className={`w-full overflow-hidden transition-all duration-300 border ${
                          isExpanded 
                            ? "bg-[#2e3192] border-[#2e3192] premium-shadow-active rounded-3xl" 
                            : "bg-white border-gray-200/70 hover:border-gray-300 premium-shadow rounded-3xl"
                        }`}
                      >
                        <button
                          onClick={() => toggleAccordion(subItem.id, subItem.title)}
                          className="w-full px-8 py-5 flex items-center justify-between transition-colors duration-200 focus:outline-none relative"
                        >
                          <div className="w-5 shrink-0 hidden sm:block"></div>
                          <div className="flex flex-col items-center justify-center mx-auto">
                            <span className={`text-center font-bold text-[15.5px] tracking-tight transition-colors duration-200 ${
                              isExpanded ? "text-[#FFE066]" : "text-gray-800"
                            }`}>
                              {subItem.title}
                            </span>
                            {isExpanded && <div className="accordion-underline w-36 mt-2"></div>}
                          </div>
                          
                          <motion.div 
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className={`shrink-0 flex items-center justify-center w-5 h-5 ${
                              isExpanded ? "text-[#FFE066]" : "text-gray-500"
                            }`}
                          >
                            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="text-white"
                            >
                              <div className="px-8 pt-2 pb-7 flex flex-col items-center text-center">
                                <p className="text-white/85 text-[14.5px] font-medium leading-relaxed max-w-3xl mb-5">
                                  {subItem.content}
                                </p>
                                
                                {isModalButton ? (
                                  <button
                                    onClick={() => openModalWithService(subItem.title)}
                                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] tracking-wide shadow-md transition-all duration-200 ease-in-out hover:scale-105 decoration-none"
                                  >
                                    <span>{subItem.buttonText || "Request Technical Assistance"}</span>
                                  </button>
                                ) : (
                                  <a
                                    href={subItem.externalLink || "#"}
                                    onClick={handleExternalLinkClick}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] tracking-wide shadow-md transition-all duration-200 ease-in-out hover:scale-105 decoration-none"
                                  >
                                    <span>{subItem.buttonText || "Visit External Portal"}</span>
                                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                )}
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
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center text-gray-400 font-medium text-sm bg-white rounded-2xl border border-gray-100 premium-shadow"
              >
                No configuration setups specified for this dynamic branch yet.
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

      {/* DYNAMIC SATISFACTORY MODAL INTEGRATION */}
      <SatisfactoryModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
        spreadsheetId="14m2v8zTSDXrgOduADBJi9n1JudkswsOPI93A3UhPsn8"
      />
    </div>
  );
};

export default CbServices;