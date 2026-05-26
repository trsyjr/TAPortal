// src/components/CbServices.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import TicketModal from "../components/TicketModal"; // Ensure path is correct
import KliyentellQR from "../assets/Kliyentell.png"; // Importing your QR code asset

const CbServices = () => {
  const location = useLocation();
  
  // Initialize state directly from navigation state history
  const [activeTabId, setActiveTabId] = useState(() => {
    if (location.state && location.state.defaultTabId) {
      return location.state.defaultTabId;
    }
    return 1;
  });

  // Listen to router updates if the user clicks a navbar item while already on this page
  useEffect(() => {
    if (location.state && location.state.defaultTabId) {
      setActiveTabId(location.state.defaultTabId);
      setOpenAccordionId(null); 
      setSelectedService("");
    }
  }, [location.state]);
  
  const [openAccordionId, setOpenAccordionId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); // State for the QR pop-up
  const [selectedService, setSelectedService] = useState("");

  // List of titles that should trigger the modal instead of an external link
  const internalModalServices = [
    "Review of Activity Proposal and Design",
    "Request for Review of Capability Building Plan",
    "Request for Training Inclusion",
    "Request for Training Management"
  ];

  // List of titles that require two separate external buttons side-by-side
  const dualExternalServices = [
    "Continuing Professional Development (CPD)",
    "Knowledge Sharing Sessions (KSS)"
  ];

  const servicesTabs = [
    { id: 1, title: "Assessment, Certification and Accreditation" },
    { id: 2, title: "Capability Building" },
    { id: 3, title: "Knowledge Management" },
    { id: 4, title: "TAAORSS" },
  ];

  const servicesContent = {
    1: {
      categoryTitle: "Assessment, Certification and Accreditation",
      items: [
        { 
          id: 1, 
          title: "Continuing Professional Development (CPD)", 
          content: "Requests for orientation sessions, responding to queries on the accomplishment of CPD application and completion requirements, and providing guidance on the overall CPD application and submission process.", 
          leftButtonText: "CPD Guidelines",
          leftExternalLink: "https://your-left-link-here.com",
          rightButtonText: "Apply / Submit",
          rightExternalLink: "https://your-right-link-here.com"
        },
        { id: 2, title: "Competency Needs Assessment (CNA)", content: "The development and implementation of CNA anchored on Heartwork: DSWD Academy Competency Framework, as well as guidance in the proper completion and interpretation of CNA tools.", externalLink: "https://your-external-link-here.com" },
        { id: 3, title: "Certification & Accreditation", content: "The application process and other info regarding certification and accreditation program. This will also include expression of interest to be included in the certification process.", externalLink: "https://your-external-link-here.com" },
        { id: 4, title: "Project ASCEND & ETEEAP", content: "Clarifications on ETEEAP (BS Social Work), as well as conducting orientations on Project ASCEND and ETEEAP processes. There will be a listing of resources with links where they can see the list of ETEEAP deputized schools, list of requirements and other legal basis for ETEEAP implementation.This will include expression of interest to enroll in ETEEAP.", externalLink: "https://your-external-link-here.com" },
      ]
    },
    2: {
      categoryTitle: "Capability Building",
      items: [
        { id: 1, title: "Review of Activity Proposal and Design", content: "The review of training proposal and design, ensuring the adherence to the training management standards set by the DSWD Academy in support of its mandate to centralize and professionalize learning and development efforts." },
        { id: 2, title: "Request for Review of Capability Building Plan", content: "Ensure the adherence to the Learning and Development standards set by the Department of Social Welfare and Development Academy in support of its mandate to centralize and professionalize learning and development efforts." },
        { id: 3, title: "Request for Training Inclusion", content: "To develop and implement a streamlined, standardized, and transparent process for handling training inclusion requests to the DSWD Academy." },
        { id: 4, title: "Request for Training Management", content: "Ensures a streamlined, standardized, and transparent process for request of training management to the DSWD Academy." },
        { id: 5, title: "CapBuild Knowledge Bank", content: "selected and high-value TA cases provided by the Capability Building Division – Professional Learning and Development Section (CBD-PLDS) along Learning and Development (L&D) for institutional learning and continuous improvement.", externalLink: "https://your-external-link-here.com" },
      ]
    },
    3: {
      categoryTitle: "Knowledge Management",
      items: [
        { 
          id: 1, 
          title: "Knowledge Sharing Sessions (KSS)", 
          content: [
            "Informal activities where knowledge is exchanged or transferred among peers, colleagues, partners, and stakeholders.",
            "KSS Reporting Form",
            "Register KSS Activity"
          ],
          leftButtonText: "KSS Reporting Form",
          leftExternalLink: "https://your-left-link-here.com",
          rightButtonText: "Register KSS Activity",
          rightExternalLink: "https://your-right-link-here.com"
        },
        { id: 2, title: "Knowledge Products", content: "Knowledge outputs derived from expertise, research, lessons learned, and best practices that respond to organizational needs.", externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfKoZQbHwsrQsGTeUlcoi9FXWnbKeMfpXKkeL35OkBCSdsNOg/viewform" },
        { id: 3, title: "Core Group of Specialists (CGS)", content: "Technical assistance mechanisms that mobilize subject matter experts across major sectors covered by DSWD.", externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform?usp=dialog" },
        { id: 4, title: "Regional Learning Resource Center (RLRC)", content: "Facilities providing accurate, relevant, and timely information services to DSWD staff, intermediaries, and partners.", externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform" },
        { id: 5, title: "Other KM Initiatives", content: "Submission and publication of current news, highlights, and featured KM-related activities conducted by COs, OBSUs, and FOs.", externalLink: "https://sites.google.com/view/swidbtaportal/online-reporting/km/km-portal-news-feature" },
        { id: 6, title: "KM Portal News / Features", content: "Other knowledge management mechanisms or innovative practices implemented by Field Offices.", externalLink: "https://sites.google.com/view/swidbtaportal/online-reporting/km/other-km-initiatives" },
      ]
    },
    4: {
      categoryTitle: "TAAORSS",
      items: [
        { 
          id: 1, 
          title: "Targeting, Assessment, Monitoring, and Planning", 
          content: [
            "Provision of technical guidance and support to enhance evidence-based planning and performance management of LGUs.",
          ],
          externalLink: "https://your-external-link-here.com"
        },
        { id: 2, 
          title: "Plan and Budget Development", 
          content: [
          "Support in strengthening FO planning and financial management processes:", 
          "Assistance in the preparation of the Work and Financial Plan",
          "Guidance on requests for fund modification and/or reallocation and non-withdrawal"
          ],
          externalLink: "https://your-external-link-here.com"
        },
        { id: 3, 
          title: "Resource Person and Activity Support", 
          content: [
            "Facilitation of technical and administrative requirements for capacity-building activities:",
            "Guidance on PMC Accreditation",
            "Assistance in the request and coordination of resource persons",
            "Support for meeting requests and related activities"
          ],
          externalLink: "https://your-external-link-here.com"  
        },
        { id: 4, 
          title: "SDCA–Information System (SDCA-IS) Support", 
          content: [
          "Technical assistance in the use and management of the SDCA Information System:",
          "Processing of requests for account activation",
          "Provision of orientation and capacity-building sessions on SDCA-IS utilization"
          ],
          externalLink: "https://your-external-link-here.com"
        },
        { id: 5, 
          title: "Partnership Development", 
          content: [
          "Guidance in establishing and strengthening collaborations:",
          "Assistance in the preparation and review of Memorandum of Agreement and Memorandum of Understanding",
          "Assistance in the conduct of regional and hosted national consultation dialogue and workshop"
          ],
          externalLink: "https://your-external-link-here.com"
        },
        { id: 6, 
          title: "Rewards and Incentives (Panata Ko sa Bayan Program)", 
          content: [
          "Support in promoting excellence and recognizing LGU performance:", 
          "Guidance on the Panata Ko sa Bayan Program (pursuant to MC No. 18, s. 2023)" 
          ],
          externalLink: "https://your-external-link-here.com"
        },
        { id: 7, title: "Other Technical Assistance Services  ", content: "Provision of additional TA services not covered under the above categories, based on emerging needs and specific requests of LGUs/LSWDOs.", externalLink: "https://your-external-link-here.com" },
      ]
    }
  };

  const handleTabClick = (tab) => {
    setActiveTabId(tab.id);
    setOpenAccordionId(null); 
    setSelectedService("");
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
            DSWD Academy services in one portal. Simplifying processes, reducing paperwork, and making technical assistance more accessible and convenient.
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
                    const isDualExternalButton = dualExternalServices.includes(subItem.title);
                    
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
                                {Array.isArray(subItem.content) ? (
                                  <div className="max-w-3xl mx-auto mb-5 text-white/85 text-[14.5px] font-medium leading-relaxed flex flex-col items-center">
                                    <p className="mb-4">{subItem.content[0]}</p>
                                    {subItem.content.slice(1).map((textRow, idx) => (
                                      <p key={idx} className="mt-1">{textRow}</p>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-white/85 text-[14.5px] font-medium leading-relaxed max-w-3xl mb-5">
                                    {subItem.content}
                                  </p>
                                )}
                                
                                {isModalButton && (
                                  <button
                                    onClick={() => openModalWithService(subItem.title)}
                                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] tracking-wide shadow-md transition-all duration-200 ease-in-out hover:scale-105 decoration-none"
                                  >
                                    <span>Request Technical Assistance</span>
                                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </button>
                                )}

                                {isDualExternalButton && (
                                  <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-xl mx-auto">
                                    <a
                                      href={subItem.leftExternalLink || "#"}
                                      onClick={handleExternalLinkClick}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] tracking-wide shadow-md transition-all duration-200 ease-in-out hover:scale-105 decoration-none"
                                    >
                                      <span>{subItem.leftButtonText}</span>
                                      <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                    <a
                                      href={subItem.rightExternalLink || "#"}
                                      onClick={handleExternalLinkClick}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] tracking-wide shadow-md transition-all duration-200 ease-in-out hover:scale-105 decoration-none"
                                    >
                                      <span>{subItem.rightButtonText}</span>
                                      <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                )}

                                {!isModalButton && !isDualExternalButton && (
                                  <a
                                    href={subItem.externalLink || "#"}
                                    onClick={handleExternalLinkClick}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] tracking-wide shadow-md transition-all duration-200 ease-in-out hover:scale-105 decoration-none"
                                  >
                                    <span>Visit External Portal</span>
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

      {/* FEEDBACK POPUP SYSTEM */}
      <AnimatePresence>
        {isFeedbackModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.2 }}
              className="relative w-full max-w-sm bg-white p-6 rounded-3xl text-center shadow-xl border border-gray-100"
            >
              <button 
                onClick={() => setIsFeedbackModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-[#2e3192] font-extrabold text-xl mb-1 mt-2">
                Got what you need?
              </h3>
              <p className="text-gray-500 font-medium text-xs max-w-[240px] mx-auto mb-5 leading-relaxed">
                Please let us know your thoughts! Scan the code below to share your feedback.
              </p>

              <div className="w-44 h-44 mx-auto p-2 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center mb-2">
                <img 
                  src={KliyentellQR} 
                  alt="Feedback QR Code" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CbServices;