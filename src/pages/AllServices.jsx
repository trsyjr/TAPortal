import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; 
import TicketModal from "../components/TicketModal"; 
import SatisfactoryModal from "../components/SatisfactoryModal";

// Centralized dynamic data matrix mapping out all accordion sections natively
const servicesContentData = {
  1: {
    categoryTitle: "Assessment, Certification and Accreditation",
    items: [
      { 
        id: 1, 
        title: "Continuing Professional Development (CPD)", 
        content: "Requests for orientation sessions, responding to queries on the accomplishment of CPD application and completion requirements, and providing guidance on the overall CPD application and submission process.", 
        isDualButton: true,
        leftButtonText: "CPD Application Process",
        leftExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCH_-TGlVemY2FDjao1-t8vzwUomhDbE-lVmgfdwBBiCD_3g/viewform",
        rightButtonText: "CPD Completion Process",
        rightExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSebrmPSSyZnF5AVVOV8NUqTwGM-8NI9ZVfFacdFI3UDLbWmtg/viewform"
      },
      { 
        id: 2, 
        title: "Competency Needs Assessment (CNA)", 
        content: "The development and implementation of CNA anchored on Heartwork: DSWD Academy Competency Framework, as well as guidance in the proper completion and interpretation of CNA tools.", 
        externalLink: "https://your-external-link-here.com", 
        buttonText: "Access CNA Tools",
        isDisabled: true
      },
      { 
        id: 3, 
        title: "Certification", 
        content: "TA includes responding to queries and providing clarifications on the application process and other info regarding certification process. This will also include expression of interest to be included in the certification process.",
        isDualButton: true,
        leftButtonText: "Certification Application Form",
        leftExternalLink: "https://docs.google.com/document/d/1WpT8k-9YI6mHs2T06yau0SNMjocOGIO9HvjPXw0S0WQ/edit?tab=t.0",
        rightButtonText: "Certification Submission Form",
        rightExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfZ4lPSEH1rtPA-cT8jSK0Gf6UdmZxtD59Dv6aigGVRMp9rJQ/viewform"
      },
      { 
        id: 4, 
        title: "Accreditation", 
        content: "TA includes responding to queries and providing clarifications on the application process and other info regarding accreditation program. This will also include expression of interest to be included in the certification process.", 
        externalLink: "https://forms.gle/cBFq2gTqUhfeLbpc9 ", 
        buttonText: "Certification Application Form",
        isDisabled: true
      },
      { 
        id: 5, 
        title: "Project ASCEND & ETEEAP", 
        content: "Clarifications on ETEEAP (BS Social Work), as well as conducting orientations on Project ASCEND and ETEEAP processes. There will be a listing of resources with links where they can see the list of ETEEAP deputized schools, list of requirements and other legal basis for ETEEAP implementation.This will include expression of interest to enroll in ETEEAP.", 
        externalLink: "https://your-external-link-here.com", 
        buttonText: "View Deputized Schools",
        isDisabled: true
      },
    ]
  },
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
        content: "Selected and high-value TA cases provided by the Capability Building Division – Professional Learning and Development Section (CBD-PLDS) along Learning and Development (L&D) for institutional learning and continuous improvement.", 
        externalLink: "https://drive.google.com/drive/folders/1tkq8sxM354BrvQShJORFQo2wAcxKMQqe?usp=sharing",
        buttonText: "Knowledge Bank" 
      },
      { 
        id: 6, 
        title: "Request for Facilitator", 
        heading: "How to Avail", 
        content: "Provides resource persons, facilitators, or subject matter experts from the DSWD Academy to support capability building activities, subject to availability, relevance of expertise, and approval of the appropriate authority.",
        steps: [
          "Submit an official memorandum addressed to the Director of the DSWD Academy indicating the title, objectives, schedule, venue or platform, target participants, requested topic, and other pertinent details of the activity.",
          "The request shall be evaluated by the DSWD Academy and endorsed to the appropriate division for appropriate action."
        ],
        buttonText: "Request Ticket" 
      },
      { 
        id: 7, 
        title: "Request for Training Data", 
        heading: "How to Avail", 
        content: "Provides available training-related information, records, or reports maintained by the DSWD Academy, subject to existing policies on records management, data privacy, and information confidentiality.",
        steps: [
          "Submit an official memorandum addressed to the <strong>Director of the DSWD Academy</strong> specifying the information being requested, its intended purpose, and the period covered, as applicable.",
          "Requests shall be processed in accordance with existing Department policies and data governance requirements."
        ],
        buttonText: "Request Ticket" 
      },
      { 
        id: 8, 
        title: "Guidance on Capability Building", 
        heading: "How to Avail", 
        content: "Provides technical assistance, consultation, and advisory services on capability building concerns, including learning and development planning, training design, implementation, monitoring and evaluation, capability building standards, and other related matters within the mandate of the Capability Building Division.",
        steps: [
          "Review the Frequently Asked Questions (FAQs) and available reference materials in the portal.",
          "If additional assistance is needed, join the <strong>TA Wednesday Virtual Clinic</strong> during the designated schedule or submit a <strong>Technical Assistance Request Ticket</strong> through the portal."
        ],
        buttonText: "Request Ticket" 
      }
    ]
  },
  3: {
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
            buttonText: "Click Here To Submit Your Entry" 
          },
          { 
            id: 3, 
            title: "Core Group of Specialists (CGS)", 
            content: "Technical assistance mechanisms that mobilize subject matter experts across major sectors covered by DSWD.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform?usp=dialog", 
            buttonText: "Click Here To Submit Your Entry" 
          },
          { 
            id: 4, 
            title: "Regional Learning Resource Center (RLRC)", 
            content: "Facilities providing accurate, relevant, and timely information services to DSWD staff, intermediaries, and partners.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform", 
            buttonText: "Click Here To Submit Your Entry" 
          },
          { 
            id: 6, 
            title: "Other KM Initiatives", 
            content: "Submission and publication of current news, highlights, and featured KM-related activities conducted by COs, OBSUs, and FOs.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfE3NQ0p75y8cYqCholtpAW82msShYpwX8llfjC6WSepP3wg/viewform", 
            buttonText: "Click Here To Submit Your Entry" 
          },
          { 
            id: 7, 
            title: "KM Portal News / Features", 
            content: "Other knowledge management mechanisms or innovative practices implemented by Field Offices.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSea4smDB1FlPM8sLfJ-HTHzCq6hkKpTuuYCl_IanNs5rriSgA/viewform", 
            buttonText: "Click Here To Submit Your Entry" 
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
        id: 5, 
        title: "Capability Building or Knowledge Sharing Session Requests on Knowledge Management Topics and Mechanisms", 
        isCustomRequestLayout: true,
        content: "Submission of inquiries or requests related to KM systems, templates, tools, and processes.",
        listItems: [
          "Introduction to Knowledge Management",
          "Knowledge Product Development",
          "Good Practice Documentation",
          "Module Development",
          "Knowledge Sharing Session",
          "Knowledge Exchange Center",
          "Knowledge Management Team",
          "Core Group of Specialists",
          "Social Welfare and Development Learning Network",
          "Knowledge Management Portal",
          "Electronic Learning Management System",
          "Intellectual Property",
          "DSWD Academy Training Facility",
          "Knowledge Management Monitoring and Evaluation",
          "Knowledge Management Assessment",
          "Knowledge Audit",
          "Knowledge Management Productivity, Recognition, Innovation, and Development for Effectiveness (KM PRIDE)",
          "Knowledge Management Team Quarterly Report",
          "Bayanihang Bayan Program"
        ],
        buttonText: "Request Ticket" 
      },
      {
        id: 4, 
        title: "Knowledge Product Development", 
        isCustomRequestLayout: true,
        content: "Technical assistance related to the review, enhancement, and development of materials based on the existing standards of a good knowledge product. Note that only the modules are open for the request to be enhanced or developed by the DSWD Academy, subject to the official communications shared to all internal offices of the department.",
        listItems: [
          "Good Practice Documentation Review",
          "Module and Instructional Design Review",
          "Module and Instructional Design Enhancement",
          "Module and Instructional Design Development",
          "Other Types of Knowledge Product Review",
          "Knowledge Product Review by Core Group of Specialists"
        ],
        buttonText: "Request Ticket" 
      },
      { 
        id: 3, 
        title: "Big Group Knowledge Sharing Session Material Review", 
        content: "Technical assistance related to the review of materials particular to the implementation of the knowledge sharing sessions.",
        isCustomRequestLayout: true,
        listItems: [
          "Activity Design and Activity Proposal for Big Group Knowledge Sharing Session",
          "Documentation of Conducted Big Group Knowledge Sharing Session"
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
  },
  4: {
    categoryTitle: "Technical/Advisory Assistance and Other Support Services",
    items: [
      { 
        id: 1, 
        title: "Targeting, Assessment, Monitoring, and Planning", 
        content: ["Provision of technical guidance and support to enhance evidence-based planning and performance management of LGUs."],
        buttonText: "Request Ticket"
      },
      { 
        id: 2, 
        title: "Plan and Budget Development", 
        content: [
          "Support in strengthening FO planning and financial management processes:", 
          "Assistance in the preparation of the Work and Financial Plan",
          "Guidance on requests for fund modification and/or reallocation and non-withdrawal"
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 3, 
        title: "Resource Person and Activity Support", 
        content: [
          "Facilitation of technical and administrative requirements for capacity-building activities:",
          "Guidance on PMC Accreditation",
          "Assistance in the request and coordination of resource persons",
          "Support for meeting requests and related activities"
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 4, 
        title: "SDCA–Information System (SDCA-IS) Support", 
        content: [
          "Technical assistance in the use and management of the SDCA Information System:",
          "Processing of requests for account activation",
          "Provision of orientation and capacity-building sessions on SDCA-IS utilization"
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 5, 
        title: "Partnership Development", 
        content: [
          "Guidance in establishing and strengthening collaborations:",
          "Assistance in the preparation and review of Memorandum of Agreement and Memorandum of Understanding",
          "Assistance in the conduct of regional and hosted national consultation dialogue and workshop"
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 6, 
        title: "Rewards and Incentives (Panata Ko sa Bayan Program)", 
        content: [
          "Support in promoting excellence and recognizing LGU performance:", 
          "Guidance on the Panata Ko sa Bayan Program (pursuant to MC No. 18, s. 2023)" 
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 7, 
        title: "Other Technical Assistance Services", 
        content: "Provision of additional TA services not covered under the above categories, based on emerging needs and specific requests of LGUs/LSWDOs.",
        buttonText: "Request Ticket" 
      },
    ]
  }
};

const SATISFACTORY_SHEETS = {
  1: "1FyPV2W83SQ30HdAMYsQ2Fqv9HJvuOM_v4tcWk3BaHqU", 
  2: "14m2v8zTSDXrgOduADBJi9n1JudkswsOPI93A3UhPsn8", 
  3: "1KkYaquUwif5M0ybxpXg5MDX62Nrres61w-1xPE-fMUg", 
  4: "1aPY6QDdyRlI9D_Zd7wI27yzBBvVZ_wEJEcXJQX-MHSs", 
};

const INQUIRY_TYPES = {
  1: "Assessment/Accreditation",
  2: "Capability Building",
  3: "Knowledge Management",
  4: "TAAORSS",
};

const AllServices = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  
  const [activeTabId, setActiveTabId] = useState(0); 
  const [openAccordionId, setOpenAccordionId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(""); 
  const [selectedInquiryType, setSelectedInquiryType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpreadsheetId, setActiveSpreadsheetId] = useState("1FyPV2W83SQ30HdAMYsQ2Fqv9HJvuOM_v4tcWk3BaHqU");

  const servicesTabs = [
    { id: 0, title: "All", path: "/all-services" },
    { id: 1, title: "Assessment, Certification and Accreditation", path: "/services-aca" },
    { id: 2, title: "Capability Building", path: "/cb-services" },
    { id: 3, title: "Knowledge Management", path: "/services-km" },
    { id: 4, title: "TAAORSS", path: "/services-taaorss" },
  ];

  useEffect(() => {
    const matchingTab = servicesTabs.find((tab) => tab.path === location.pathname);
    if (matchingTab && matchingTab.id !== activeTabId) {
      setIsLoading(true);
      setOpenAccordionId(null);
      const timer = setTimeout(() => {
        setActiveTabId(matchingTab.id);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setOpenAccordionId(null);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const visibleCategories = activeTabId === 0 ? [1, 2, 3, 4] : [activeTabId];
    let matchedItems = [];

    visibleCategories.forEach((catId) => {
      const category = servicesContentData[catId];
      if (category) {
        category.items.forEach((item) => {
          let contentStr = Array.isArray(item.content) ? item.content.join(" ") : (item.content || "");
          
          if (item.steps) {
            contentStr += " " + (item.heading || "") + " " + item.steps.join(" ");
          }
          if (item.listItems) {
            contentStr += " " + item.listItems.join(" ");
          }
          if (item.subItems) {
            item.subItems.forEach(sub => contentStr += " " + sub.title + " " + sub.content);
          }
          
          if (item.title.toLowerCase().includes(lowerQuery) || contentStr.toLowerCase().includes(lowerQuery)) {
            matchedItems.push(`${catId}-${item.id}`);
          }
        });
      }
    });

    if (matchedItems.length === 1) {
      setOpenAccordionId(matchedItems[0]);
    }
  }, [searchQuery, activeTabId]);

  const handleTabChange = (tab) => {
    if (activeTabId !== tab.id) {
      navigate(tab.path);
    }
  };

  const toggleAccordion = (uniqueId) => {
    setOpenAccordionId(openAccordionId === uniqueId ? null : uniqueId);
  };

  const openTicketModal = (title, categoryId) => {
    setSelectedService(title);
    setSelectedInquiryType(INQUIRY_TYPES[categoryId] || "");
    setActiveSpreadsheetId(SATISFACTORY_SHEETS[categoryId]);
    setIsModalOpen(true);
  };

  const handleCloseTicketModal = () => {
    setIsModalOpen(false);
    setIsFeedbackModalOpen(true); 
  };

  const renderContentText = (content) => {
    if (!content) return null;
    if (!Array.isArray(content)) {
      return <p className="text-white/90 text-[14.5px] font-medium leading-relaxed max-w-3xl no-underline">{content}</p>;
    }

    return (
      <div className="text-white/90 text-[14.5px] font-medium leading-relaxed max-w-3xl space-y-2 text-left">
        {content.map((line, idx) => {
          const cleanLine = line.replace(/^[•\-\s]+/, "").trim();
          return (
            <div key={idx} className="flex items-start gap-2.5">
              {idx > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#FFE066] shrink-0 mt-2" />}
              <p className="no-underline">{cleanLine}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAccordionSection = (categoryId) => {
    const category = servicesContentData[categoryId];
    if (!category) return null;
    const filteredItems = category.items.filter((subItem) => {
      if (!searchQuery.trim()) return true;
      const lowerQuery = searchQuery.toLowerCase();
      let contentStr = Array.isArray(subItem.content) ? subItem.content.join(" ") : (subItem.content || "");
      if (subItem.steps) {
        contentStr += " " + (subItem.heading || "") + " " + subItem.steps.join(" ");
      }
      if (subItem.listItems) {
        contentStr += " " + subItem.listItems.join(" ");
      }
      if (subItem.subItems) {
        subItem.subItems.forEach(sub => contentStr += " " + sub.title + " " + sub.content);
      }
      return subItem.title.toLowerCase().includes(lowerQuery) || contentStr.toLowerCase().includes(lowerQuery);
    });
    if (filteredItems.length === 0) return null;

    return (
      <div className="max-w-[1000px] mx-auto mb-12">
        <div className="flex items-center gap-3 mb-6 pl-1">
          <div className="w-1.5 h-6 bg-[#ee1c25] rounded-full"></div>
          <h2 className="text-[#2e3192] text-[20px] font-extrabold tracking-tight no-underline">
            {category.categoryTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {filteredItems.map((subItem) => {
            const uniqueAccordionKey = `${categoryId}-${subItem.id}`;
            const isExpanded = openAccordionId === uniqueAccordionKey;
            
            return (
              <div 
                key={subItem.id} 
                className={`w-full overflow-hidden transition-all duration-300 border no-underline ${
                  isExpanded 
                    ? "bg-[#2e3192] border-[#2e3192] premium-shadow-active rounded-3xl" 
                    : "bg-white border-gray-200/70 hover:border-gray-300 premium-shadow rounded-3xl"
                }`}
              >
                <button 
                  onClick={() => toggleAccordion(uniqueAccordionKey)} 
                  className="w-full px-8 py-5 flex items-center justify-between mx-auto text-center focus:outline-none relative no-underline cursor-pointer"
                >
                  <div className="w-5 shrink-0 hidden sm:block"></div>
                  <div className="flex flex-col items-center justify-center mx-auto">
                    <span className={`font-bold text-[15.5px] tracking-tight no-underline ${isExpanded ? "text-[#FFE066]" : "text-gray-800"}`}>
                      {subItem.title}
                    </span>
                  </div>
             
                  <motion.div 
                    animate={{ rotate: isExpanded ? 180 : 0 }} 
                    className={`shrink-0 w-5 h-5 ${isExpanded ? "text-[#FFE066]" : "text-gray-500"}`}
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
                      className="text-white no-underline"
                    >
                      <div className="px-8 pt-2 pb-7 flex flex-col items-center text-center">
                        <div className="mb-5 w-full flex justify-center">
                          {renderContentText(subItem.content)}
                        </div>

                        {/* Optional Heading Renderer */}
                        {subItem.heading && (
                          <div className="w-full max-w-2xl text-left mb-3">
                            <h3 className="text-[#FFE066] font-extrabold text-[15px] tracking-wide uppercase no-underline">
                              {subItem.heading}
                            </h3>
                          </div>
                        )}

                        {/* Steps Bullet Point Renderer */}
                        {subItem.steps && (
                          <div className="w-full max-w-2xl space-y-3 mb-6 text-left">
                            {subItem.steps.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#FFE066] shrink-0 mt-2" />
                                <p 
                                  className="text-white/90 text-[14px] leading-relaxed font-normal no-underline"
                                  dangerouslySetInnerHTML={{ __html: step }}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* List Items Module Clean Layout (Glassmorphism and Underline Border Removed) */}
                        {subItem.listItems && (
                          <div className="w-full pt-3 mb-6 flex justify-center">
                            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-[14px] text-white/90 font-medium">
                              {subItem.listItems.map((item, index) => {
                                const cleanText = item.replace(/^[0-9]+\.\s*/, "").replace(/^-\s*/, "").trim();
                                return (
                                  <div key={index} className="flex items-start gap-2.5 py-1.5 px-1">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FFE066] text-[#2e3192] font-bold text-[11px] shrink-0 mt-0.5">
                                      {index + 1}
                                    </span>
                                    <span className="no-underline leading-tight text-white/90">{cleanText}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Standard Base Actions Wrapper */}
                        {!subItem.isNestedGroup && (
                          <div className="w-full flex items-center justify-center mt-2">
                            {subItem.isDisabled ? (
                              <button disabled className="flex items-center gap-2 px-6 py-2.5 bg-gray-400 text-gray-200 rounded-full font-bold text-[13px] tracking-wide no-underline cursor-not-allowed opacity-80">
                                <span>Launching Soon</span> 
                              </button>
                            ) : subItem.isDualButton ? (
                              <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-xl mx-auto">
                                <a 
                                  href={subItem.leftExternalLink} 
                                  onClick={() => {
                                    setSelectedService(`${subItem.title} - ${subItem.leftButtonText}`);
                                    setActiveSpreadsheetId(SATISFACTORY_SHEETS[categoryId]);
                                    setIsFeedbackModalOpen(true);
                                  }} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105 no-underline"
                                >
                                  <span className="no-underline">{subItem.leftButtonText}</span>
                                  <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                                
                                <a 
                                  href={subItem.rightExternalLink} 
                                  onClick={() => {
                                    setSelectedService(`${subItem.title} - ${subItem.rightButtonText}`);
                                    setActiveSpreadsheetId(SATISFACTORY_SHEETS[categoryId]);
                                    setIsFeedbackModalOpen(true);
                                  }} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105 no-underline"
                                >
                                  <span className="no-underline">{subItem.rightButtonText}</span>
                                  <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                              </div>
                            ) : (
                              (subItem.buttonText || subItem.externalLink) && (
                                subItem.buttonText === "Request Ticket" ? (
                                  <button 
                                    onClick={() => openTicketModal(subItem.title, categoryId)} 
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105 cursor-pointer no-underline"
                                  >
                                    <span className="no-underline">Request Ticket</span>
                                  </button>
                                ) : (
                                  <a 
                                    href={subItem.externalLink || "#"} 
                                    onClick={() => {
                                      setSelectedService(subItem.title);
                                      setActiveSpreadsheetId(SATISFACTORY_SHEETS[categoryId]);
                                      setIsFeedbackModalOpen(true);
                                    }} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#ee1c25] text-white rounded-full font-bold text-[13px] shadow-md transition-all duration-200 hover:scale-105 no-underline"
                                  >
                                    <span className="no-underline">{subItem.buttonText || "Visit External Portal"}</span>
                                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                  </a>
                                )
                              )
                            )}
                          </div>
                        )}

                        {/* SubItems Grid Parser (Glassmorphism & Underlines Removed) */}
                        {subItem.isNestedGroup && subItem.subItems && (
                          <div className="w-full mt-2 space-y-6 pt-4 max-w-2xl mx-auto flex flex-col items-center">
                            {subItem.subItems.map((child) => (
                              <div key={child.id} className="w-full flex flex-col items-center justify-center gap-2 p-2">
                                <h4 className="text-[#FFE066] font-bold text-[15px] no-underline">{child.title}</h4>
                                <p className="text-white/90 text-[14px] leading-relaxed max-w-xl mb-1 no-underline">{child.content}</p>
                                <div className="w-full flex items-center justify-center mt-1">
                                  {child.isDualButton ? (
                                    <div className="flex flex-wrap items-center justify-center gap-3">
                                      <a 
                                        href={child.leftExternalLink} 
                                        onClick={() => {
                                          setSelectedService(`${child.title} - ${child.leftButtonText}`);
                                          setActiveSpreadsheetId(SATISFACTORY_SHEETS[categoryId]);
                                          setIsFeedbackModalOpen(true);
                                        }}
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="px-5 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 no-underline"
                                      >
                                        {child.leftButtonText}
                                      </a>
                                      <a 
                                        href={child.rightExternalLink} 
                                        onClick={() => {
                                          setSelectedService(`${child.title} - ${child.rightButtonText}`);
                                          setActiveSpreadsheetId(SATISFACTORY_SHEETS[categoryId]);
                                          setIsFeedbackModalOpen(true);
                                        }}
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="px-5 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 no-underline"
                                      >
                                        {child.rightButtonText}
                                      </a>
                                    </div>
                                  ) : (
                                    <a
                                      href={child.externalLink || "#"}
                                      onClick={() => {
                                        setSelectedService(child.title);
                                        setActiveSpreadsheetId(SATISFACTORY_SHEETS[categoryId]);
                                        setIsFeedbackModalOpen(true);
                                      }}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-6 py-2 bg-[#ee1c25] text-white rounded-full font-bold text-[12.5px] shadow-md transition-all hover:scale-105 inline-flex items-center gap-1.5 no-underline"
                                    >
                                      <span>{child.buttonText || "Submit Entry"}</span>
                                      <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
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
      </div>
    );
  };

  const renderTabContent = () => {
    const targetCategories = activeTabId === 0 ? [1, 2, 3, 4] : [activeTabId];
    const totalVisibleResults = targetCategories.reduce((acc, catId) => {
      const items = servicesContentData[catId]?.items || [];
      const matchCount = items.filter(item => {
        if (!searchQuery.trim()) return true;
        const lowerStr = searchQuery.toLowerCase();
        let contentStr = Array.isArray(item.content) ? item.content.join(" ") : (item.content || "");
        if (item.steps) {
          contentStr += " " + (item.heading || "") + " " + item.steps.join(" ");
        }
        if (item.listItems) {
          contentStr += " " + item.listItems.join(" ");
        }
        if (item.subItems) {
          item.subItems.forEach(sub => contentStr += " " + sub.title + " " + sub.content);
        }
        return item.title.toLowerCase().includes(lowerStr) || contentStr.toLowerCase().includes(lowerStr);
      }).length;
      return acc + matchCount;
    }, 0);

    if (totalVisibleResults === 0) {
      return (
        <div className="text-center py-16 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl max-w-[1000px] mx-auto">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-gray-700 font-bold text-lg mb-1 no-underline">No services matched your query</h3>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-5 no-underline">Try checking your spelling or adjusting filters to discover alternative resources.</p>
          <button 
            onClick={() => setSearchQuery("")} 
            className="px-5 py-2 text-xs font-bold text-[#2e3192] bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-all cursor-pointer no-underline"
          >
            Clear Search
          </button>
        </div>
      );
    }

    switch (activeTabId) {
      case 1:
        return renderAccordionSection(1);
      case 2:
        return renderAccordionSection(2);
      case 3:
        return renderAccordionSection(3);
      case 4:
        return renderAccordionSection(4);
      case 0:
      default:
        return (
          <div className="space-y-12">
            {renderAccordionSection(1)}
            {renderAccordionSection(2) && (
              <div className="border-t border-gray-100 pt-10">
                {renderAccordionSection(2)}
              </div>
            )}
            {renderAccordionSection(3) && (
              <div className="border-t border-gray-100 pt-10">
                {renderAccordionSection(3)}
              </div>
            )}
            {renderAccordionSection(4) && (
              <div className="border-t border-gray-100 pt-10">
                {renderAccordionSection(4)}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] antialiased select-none font-['Montserrat',sans-serif]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
          .premium-shadow { box-shadow: 0 4px 20px -2px rgba(46, 49, 146, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03); }
          .premium-shadow-active { box-shadow: 0 12px 30px -8px rgba(46, 49, 146, 0.25); }
          .tapered-underline { height: 2px; background: linear-gradient(90deg, transparent 0%, rgba(46, 49, 146, 0.6) 50%, transparent 100%); }
          a { text-decoration: none !important; }
        `}
      </style>

      <main className="max-w-[1440px] mx-auto px-16 pt-28 pb-24">
        {/* Header Title Section */}
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

        {/* Search Input Layout */}
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

        {/* Categories Tab Navigation Switch */}
        <div className="max-w-[1100px] mx-auto mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {servicesTabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab)}
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

        {/* Dynamic Accordion Area Canvas */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-[#2e3192] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm font-semibold tracking-wider">Syncing Portal Resources...</p>
            </div>
          ) : (
            renderTabContent()
          )}
        </div>
      </main>

      {/* TICKET POPUP LAYOUT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <TicketModal 
            isOpen={isModalOpen} 
            onClose={handleCloseTicketModal} 
            serviceType={selectedService}
            defaultInquiryType={selectedInquiryType}
          />
        )}
      </AnimatePresence>

      {/* FEEDBACK ASSESSMENT MODAL */}
      <SatisfactoryModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
        inquiryType={selectedInquiryType || "Knowledge Management"} 
        serviceType={selectedService}       
        spreadsheetId={activeSpreadsheetId}
      />
    </div>
  );
};

export default AllServices;