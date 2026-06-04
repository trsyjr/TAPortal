// src/components/ServicesKM.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import TicketModal from "../components/TicketModal"; 
import SatisfactoryModal from "../components/SatisfactoryModal"; 

const ServicesKM = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // This specific component is dedicated to category index '4' in the global layout architecture
  const currentCategoryKey = 4; 
  const [openAccordionId, setOpenAccordionId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); 
  const [selectedService, setSelectedService] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // List of titles that should trigger the modal instead of an external link
  const internalModalServices = [
    "Capability Building or Knowledge Sharing Session Requests on Knowledge Management Topics and Mechanisms",
    "Big Group Knowledge Sharing Session Material Review",
    "Knowledge Exchange Center Material (Borrowing)",
    "Intellectual Property Registration",
    "DSWD Academy Training Facility Reservation",
    "Marketing Support",
    "Hosting of Courses under the DSWD Academy’s ELMS"
  ];

  // Synced precisely with your global application routing blueprint
  const servicesTabs = [
    { id: 1, title: "All", path: "/all-services" },
    { id: 2, title: "Assessment, Certification and Accreditation", path: "/services-aca" },
    { id: 3, title: "Capability Building", path: "/cb-services" },
    { id: 4, title: "Knowledge Management", path: "/services-km" },
    { id: 5, title: "TAAORSS", path: "/services-taaorss" },
  ];

  // Exclusively holding Knowledge Management (Mapped to Category 4)
  const servicesContent = {
    4: {
      categoryTitle: "Knowledge Management",
      items: [
        {
          id: 1,
          title: "Online Reporting System",
          content: "Field Offices and Central Office units shall be able to submit accomplishments, plans, and updates on the following KM initiatives.",
          isNestedGroup: true,
          subItems: [
            { 
              id: 1, 
              title: "Knowledge Sharing Sessions (KSS)", 
              content: "Informal activities where knowledge is exchanged or transferred among peers, colleagues, partners, and stakeholders.",
              isDualButton: true,
              leftButtonText: "KSS Reporting Form",
              leftExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLScKMrmls1BO7Ytfdmjx56EuPuI7uGxHOkhMVSEYYxYcZPr8Tw/viewform",
              rightButtonText: "Register KSS Activity",
              rightExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSdTiVPcxQM9N-pX8sdTOb3Ctdk_v9_uuXklDecpFYuZD8UG6Q/viewform"
            },
            { 
              id: 2, 
              title: "Knowledge Products", 
              content: "Knowledge outputs derived from expertise, research, lessons learned, and best practices that respond to organizational needs.", 
              externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfKoZQbHwsrQsGTeUlcoi9FXWnbKeMfpXKkeL35OkBCSdsNOg/viewform", 
              buttonText: "Submit Entry" 
            },
            { 
              id: 3, 
              title: "Core Group of Specialists (CGS)", 
              content: "Technical assistance mechanisms that mobilize subject matter experts across major sectors covered by DSWD.", 
              externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform?usp=dialog", 
              buttonText: "Submit Entry" 
            },
            { 
              id: 4, 
              title: "Regional Learning Resource Center (RLRC)", 
              content: "Facilities providing accurate, relevant, and timely information services to DSWD staff, intermediaries, and partners.", 
              externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform", 
              buttonText: "Submit Entry" 
            },
            { 
              id: 6, 
              title: "Other KM Initiatives", 
              content: "Submission and publication of current news, highlights, and featured KM-related activities conducted by COs, OBSUs, and FOs.", 
              externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfE3NQ0p75y8cYqCholtpAW82msShYpwX8llfjC6WSepP3wg/viewform", 
              buttonText: "Submit Entry" 
            },
            { 
              id: 7, 
              title: "KM Portal News / Features", 
              content: "Other knowledge management mechanisms or innovative practices implemented by Field Offices.", 
              externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSea4smDB1FlPM8sLfJ-HTHzCq6hkKpTuuYCl_IanNs5rriSgA/viewform", 
              buttonText: "Submit Entry" 
            }
          ]
        },
        {
          id: 2, 
          title: "Request for Resource Person for DSWD Academy-Offered Training Courses", 
          isCustomRequestLayout: true,
          content: "Requests may be linked to the Directory of Experts (DOE) for easier identification of subject matter specialists.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 3, 
          title: "Capability Building or Knowledge Sharing Session Requests on Knowledge Management Topics and Mechanisms", 
          isCustomRequestLayout: true,
          content: "Submission of inquiries or requests related to KM systems, templates, tools, and processes.",
          buttonText: "Request Ticket" 
        },
        {
          id: 4, 
          title: "Knowledge Product Development", 
          isCustomRequestLayout: true,
          content: "Technical assistance related to the review, enhancement, and development of materials based on the existing standards of a good knowledge product. Note that only the modules are open for the request to be enhanced or developed by the DSWD Academy, subject to the official communications shared to all internal offices of the department.",
          listItems: [
            "1. Good Practice Documentation Review",
            "2. Module and Instructional Design Review",
            "3. Module and Instructional Design Enhancement",
            "4. Module and Instructional Design Development",
            "5. Other Types of Knowledge Product Review",
            "6. Knowledge Product Review by Core Group of Specialists"
          ],
          buttonText: "Request Ticket" 
        },
        { 
          id: 5, 
          title: "Big Group Knowledge Sharing Session Material Review", 
          content: "Technical assistance related to the review of materials particular to the implementation of the knowledge sharing sessions.",
          isCustomRequestLayout: true,
          listItems: [
            "1. Activity Design and Activity Proposal for Big Group Knowledge Sharing Session",
            "2. Documentation of Conducted Big Group Knowledge Sharing Session"
          ],
          buttonText: "Request Ticket" 
        },
        { 
          id: 6, 
          title: "Knowledge Exchange Center Material (Borrowing)", 
          content: "Technical assistance related to the borrowing of materials being offered by the Knowledge Exchange Center.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 7, 
          title: "Intellectual Property Registration", 
          content: "Technical assistance related to the registration of qualified intellectual property for protection.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 8, 
          title: "DSWD Academy Training Facility Reservation", 
          content: "Provide technical assistance to inquiries or concerns related to the reservation and booking processes at the DSWD Academy Facility. This support extends to various stakeholders, including OBS, FOs, and other partners.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 9, 
          title: "Marketing Support", 
          content: "Provide technical assistance to the DSWD Academy divisions to effectively promote and execute their activities and events. This includes offering guidance on marketing strategies, communication materials, events management and promotional campaigns.",
          buttonText: "Request Ticket" 
        },
        { 
          id: 10, 
          title: "Hosting of Courses under the DSWD Academy’s ELMS", 
          content: "This Technical Assistance (TA) service supports DSWD offices and units in the onboarding and hosting of their e-learning courses within the DSWD Academy’s e-Learning Management System (ELMS). It includes guidance on the requirements, standards, and processes for lodging developed digital learning materials into the platform.",
          buttonText: "Request Ticket" 
        }
      ]
    }
  };

  // Centralized deep text matching helper function
  const matchItem = (item, query) => {
    const lowerQuery = query.toLowerCase();
    
    // 1. Top level string parsing
    const titleMatch = item.title?.toLowerCase().includes(lowerQuery);
    const contentStr = Array.isArray(item.content) ? item.content.join(" ") : (item.content || "");
    const contentMatch = contentStr.toLowerCase().includes(lowerQuery);
    
    // 2. Scan item array variations (listItems)
    const listMatch = item.listItems?.some(li => li.toLowerCase().includes(lowerQuery));
    
    // 3. Scan nested categories variations (subItems)
    const subItemsMatch = item.subItems?.some(sub => 
      sub.title?.toLowerCase().includes(lowerQuery) || 
      sub.content?.toLowerCase().includes(lowerQuery)
    );

    // 4. Fallback checking for item ID 3 context containing static DOM string variants
    let legacyListMatch = false;
    if (item.id === 3) {
      const legacyKeywords = [
        "introduction to knowledge management", "good practice documentation", "module development", 
        "knowledge sharing session", "knowledge exchange center", "knowledge management team", 
        "core group of specialists", "social welfare and development learning network", 
        "knowledge management portal", "electronic learning management system", "intellectual property", 
        "dswd academy training facility", "knowledge management monitoring and evaluation", 
        "knowledge management assessment", "knowledge audit", "km pride", "bayanihang bayan program"
      ];
      legacyListMatch = legacyKeywords.some(keyword => keyword.includes(lowerQuery));
    }

    return titleMatch || contentMatch || listMatch || subItemsMatch || legacyListMatch;
  };

  // Expand accordion automatically if query conditions uniquely match exactly 1 result
  useEffect(() => {
    if (!searchQuery.trim()) {
      setOpenAccordionId(null);
      return;
    }

    const currentCategory = servicesContent[currentCategoryKey];
    if (currentCategory) {
      const matchedItems = currentCategory.items.filter((item) => matchItem(item, searchQuery));

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

  const handleCloseTicketModal = (inquiry, service) => {
    setIsModalOpen(false);
    if (inquiry) {
      setSelectedService(service);
    }
    setIsFeedbackModalOpen(true);
  };

  const handleExternalLinkClick = (title) => {
    setSelectedService(title);
    setIsFeedbackModalOpen(true);
  };

  const currentCategory = servicesContent[currentCategoryKey];

  const filteredItems = currentCategory
    ? currentCategory.items.filter((item) => {
        if (!searchQuery.trim()) return true;
        return matchItem(item, searchQuery);
      })
    : [];

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

        {/* Search Bar Container */}
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

        {/* BUTTON TABS */}
        <div className="max-w-[1100px] mx-auto mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {servicesTabs.map((tab) => {
              const isActive = tab.id === 4;
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
                  <span className="relative z-10 block text-white">
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACCORDION AREA */}
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
                  <h2 className="text-[#2e3192] text-[20px] font-bold tracking-tight">
                    {currentCategory.categoryTitle}
                  </h2>
                </div>

                <div className="space-y-4">
                  {filteredItems.map((subItem) => {
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
                          className="w-full px-8 py-5 flex items-center justify-between focus:outline-none relative"
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
                                {subItem.content && (
                                  <p className="text-white/85 text-[14.5px] font-medium leading-relaxed max-w-3xl mb-5">
                                    {subItem.content}
                                  </p>
                                )}

                                {/* Default legacy fallback layout template */}
                                {subItem.id === 3 && !subItem.listItems && (
                                  <div className="w-full pt-4 mt-2 mb-6 flex justify-center">
                                    <ol className="w-fit text-left text-[14px] text-white/90 space-y-1.5 font-normal tracking-wide px-4 sm:px-8 list-none">
                                      <li>1. Introduction to Knowledge Management</li>
                                      <li>
                                        2. Knowledge Product Development
                                        <ul className="list-disc pl-6 mt-1 space-y-1 text-white/80">
                                          <li>Good Practice Documentation</li>
                                          <li>Module Development</li>
                                        </ul>
                                      </li>
                                      <li>3. Knowledge Sharing Session</li>
                                      <li>4. Knowledge Exchange Center</li>
                                      <li>5. Knowledge Management Team</li>
                                      <li>6. Core Group of Specialists</li>
                                      <li>7. Social Welfare and Development Learning Network</li>
                                      <li>8. Knowledge Management Portal</li>
                                      <li>9. Electronic Learning Management System</li>
                                      <li>10. Intellectual Property</li>
                                      <li>11. DSWD Academy Training Facility</li>
                                      <li>12. Knowledge Management Monitoring and Evaluation</li>
                                      <li>13. Knowledge Management Assessment</li>
                                      <li>14. Knowledge Audit</li>
                                      <li>15. Knowledge Management Productivity, Recognition, Innovation, and Development for Effectiveness (KM PRIDE)</li>
                                      <li>16. Knowledge Management Team Quarterly Report</li>
                                      <li>17. Bayanihang Bayan Program</li>
                                    </ol>
                                  </div>
                                )}

                                {/* Root Action Button for Non-Nested top-level components */}
                                {!subItem.isNestedGroup && (
                                  <div className="w-full flex items-center justify-center mt-1">
                                    {isModalButton ? (
                                      <button
                                        onClick={() => openModalWithService(subItem.title)}
                                        className="px-6 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 whitespace-nowrap cursor-pointer"
                                      >
                                        {subItem.buttonText || "Request Ticket"}
                                      </button>
                                    ) : (
                                      <a
                                        href={subItem.externalLink || "#"}
                                        onClick={() => handleExternalLinkClick(subItem.title)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 whitespace-nowrap"
                                      >
                                        {subItem.buttonText || "Submit Entry"}
                                      </a>
                                    )}
                                  </div>
                                )}

                                {/* COMPLETELY CENTERED NESTED ITEMS LAYOUT */}
                                {subItem.isNestedGroup && subItem.subItems && (
                                  <div className="w-full mt-2 space-y-10 pt-8 max-w-2xl mx-auto text-center flex flex-col items-center">
                                    {subItem.subItems.map((child) => {
                                      const isChildModalButton = internalModalServices.includes(child.title);
                                      return (
                                        <div key={child.id} className="w-full flex flex-col items-center justify-center gap-3">
                                          <div className="w-full flex flex-col items-center justify-center">
                                            <h4 className="text-[#FFE066] font-bold text-[15px] mb-1.5 text-center">{child.title}</h4>
                                            <p className="text-white/80 text-[14px] leading-relaxed text-center max-w-xl">{child.content}</p>
                                          </div>
                                          
                                          {/* Perfectly Centered Action Buttons Below Text Content */}
                                          <div className="w-full flex items-center justify-center mt-1">
                                            {child.isDualButton ? (
                                              <div className="flex flex-wrap items-center justify-center gap-3">
                                                <a 
                                                  href={child.leftExternalLink || "#"} 
                                                  onClick={() => handleExternalLinkClick(`${child.title} - ${child.leftButtonText}`)}
                                                  target="_blank" 
                                                  rel="noopener noreferrer" 
                                                  className="px-5 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 text-center"
                                                >
                                                  {child.leftButtonText}
                                                </a>
                                                <a 
                                                  href={child.rightExternalLink || "#"} 
                                                  onClick={() => handleExternalLinkClick(`${child.title} - ${child.rightButtonText}`)}
                                                  target="_blank" 
                                                  rel="noopener noreferrer" 
                                                  className="px-5 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 text-center"
                                                >
                                                  {child.rightButtonText}
                                                </a>
                                              </div>
                                            ) : isChildModalButton ? (
                                              <button
                                                onClick={() => openModalWithService(child.title)}
                                                className="px-6 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 whitespace-nowrap cursor-pointer"
                                              >
                                                {child.buttonText || "Request Ticket"}
                                              </button>
                                            ) : (
                                              <a
                                                href={child.externalLink || "#"}
                                                onClick={() => handleExternalLinkClick(child.title)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 whitespace-nowrap"
                                              >
                                                {child.buttonText || "Submit Entry"}
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
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
            onClose={(inquiry, service) => handleCloseTicketModal(inquiry, service)} 
            serviceType={selectedService}
            defaultInquiryType="Knowledge Management"
          />
        )}
      </AnimatePresence>

      {/* SATISFACTORY MODAL INTEGRATION */}
      <SatisfactoryModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
        inquiryType="Knowledge Management" 
        serviceType={selectedService}      
        spreadsheetId="1KkYaquUwif5M0ybxpXg5MDX62Nrres61w-1xPE-fMUg"
      />
    </div>
  );
};

export default ServicesKM;