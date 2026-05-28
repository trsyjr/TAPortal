// src/components/ServicesKM.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SatisfactoryModal from "../components/SatisfactoryModal"; // Integrated component import

const ServicesKM = () => {
  const navigate = useNavigate();
  const [activeTabId, setActiveTabId] = useState(3);
  const [openAccordionId, setOpenAccordionId] = useState(null); 
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const servicesTabs = [
    { id: 1, title: "Assessment, Certification and Accreditation", path: "/services-aca" },
    { id: 2, title: "Capability Building", path: "/cb-services" },
    { id: 3, title: "Knowledge Management", path: "/services-km" },
    { id: 4, title: "TAAORSS", path: "/services-taaorss" },
  ];

  const servicesContent = {
    3: {
      categoryTitle: "Knowledge Management",
      items: [
        { 
          id: 1, 
          title: "Knowledge Sharing Sessions (KSS)", 
          content: [
            "Informal activities where knowledge is exchanged or transferred among peers, colleagues, partners, and stakeholders."
          ],
          isDualButton: true,
          leftButtonText: "KSS Reporting Form",
          leftExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLScKMrmls1BO7Ytfdmjx56EuPuI7uGxHOkhMVSEYYxYcZPr8Tw/viewform",
          rightButtonText: "Register KSS Activity",
          rightExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSdTiVPcxQM9N-pX8sdTOb3Ctdk_v9_uuXklDecpFYuZD8UG6Q/viewform"
        },
        { id: 2, title: "Knowledge Products", content: "Knowledge outputs derived from expertise, research, lessons learned, and best practices that respond to organizational needs.", externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfKoZQbHwsrQsGTeUlcoi9FXWnbKeMfpXKkeL35OkBCSdsNOg/viewform", buttonText: "Click Here To Submit Your Entry" },
        { id: 3, title: "Core Group of Specialists (CGS)", content: "Technical assistance mechanisms that mobilize subject matter experts across major sectors covered by DSWD.", externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform?usp=dialog", buttonText: "Click Here To Submit Your Entry" },
        { id: 4, title: "Regional Learning Resource Center (RLRC)", content: "Facilities providing accurate, relevant, and timely information services to DSWD staff, intermediaries, and partners.", externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform", buttonText: "Click Here To Submit Your Entry" },
        { id: 5, title: "Other KM Initiatives", content: "Submission and publication of current news, highlights, and featured KM-related activities conducted by COs, OBSUs, and FOs.", externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfE3NQ0p75y8cYqCholtpAW82msShYpwX8llfjC6WSepP3wg/viewform", buttonText: "Click Here To Submit Your Entry" },
        { id: 6, title: "KM Portal News / Features", content: "Other knowledge management mechanisms or innovative practices implemented by Field Offices.", externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSea4smDB1FlPM8sLfJ-HTHzCq6hkKpTuuYCl_IanNs5rriSgA/viewform", buttonText: "Submit an Entry" },
      ]
    }
  };

  const handleTabClick = (tab) => {
    if (tab.id !== 3) {
      navigate(tab.path, { state: { defaultTabId: tab.id } });
    }
  };

  const toggleAccordion = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
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
                        <button onClick={() => toggleAccordion(subItem.id)} className="w-full px-8 py-5 flex items-center justify-between mx-auto text-center focus:outline-none relative">
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
                                  <div className="max-w-3xl mx-auto mb-5 text-white/85 text-[14.5px] font-medium leading-relaxed flex flex-col items-center">
                                    <p className="mb-4">{subItem.content[0]}</p>
                                    {subItem.content.slice(1).map((textRow, idx) => (
                                      <p key={idx} className="mt-1">{textRow}</p>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-white/85 text-[14.5px] font-medium leading-relaxed max-w-3xl mb-5">{subItem.content}</p>
                                )}
                                
                                {subItem.isDualButton ? (
                                  <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-xl mx-auto">
                                    <a href={subItem.leftExternalLink} onClick={handleExternalLinkClick} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105">
                                      <span>{subItem.leftButtonText}</span>
                                      <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                    <a href={subItem.rightExternalLink} onClick={handleExternalLinkClick} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105">
                                      <span>{subItem.rightButtonText}</span>
                                      <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                ) : (
                                  <a href={subItem.externalLink || "#"} onClick={handleExternalLinkClick} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105">
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
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* SATISFACTORY FEEDBACK MODAL INTEGRATION */}
      <SatisfactoryModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
        spreadsheetId="1KkYaquUwif5M0ybxpXg5MDX62Nrres61w-1xPE-fMUg"
      />
    </div>
  );
};

export default ServicesKM;