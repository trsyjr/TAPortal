import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaFileCircleCheck,
  FaFileLines,
  FaHandshake,
  FaNetworkWired,
  FaUserCheck,
  FaComments,
  FaLaptopMedical,
  FaTicket,
  FaAward,
  FaShareNodes,
  FaBullhorn
} from "react-icons/fa6";
import { LuBlocks } from "react-icons/lu";
import TicketModal from "../components/TicketModal"; 
import JoinModal from "../components/JoinModal";
import GlobalFaqDial from "../components/GlobalFaqDial";
import FloatingCardDeck from "../components/FloatingCardDeck";

// Top FAQ cards
const faqCards = [
  { title: "TARA Program", icon: <FaFileCircleCheck />, path: "/tara-program" },
  { title: "TARGETING ASSESSMENT MONITORING PLANNING", icon: <FaFileCircleCheck />, path: "/tamp" },
  { title: "PERFORMANCE AND RECOGNITION", icon: <FaFileLines />, path: "/par" },
  { title: "OTHER REQUEST AND REFERRAL", icon: <FaNetworkWired />, path: "/orf" },
];

/* ---------------- MASTER GLOBAL ROUTES ---------------- */
const masterFaqRoutes = [
  { title: "Assessment, Certification, and Accreditation", path: "/cpd", adIcon: <FaAward /> },
  { title: "Capability Building", path: "/ld-standards", adIcon: <LuBlocks /> },
  { title: "Knowledge Management", path: "/knowledge-product", adIcon: <FaShareNodes /> },
  { title: "TAAORSS", path: "/tara-program", adIcon: <FaBullhorn /> },
];

// Clean FAQ object
const faqPages = [
  {
    label: "TAMP",
    items: [
      {
        q: "What is the monthly deadline for HPMES data submission?",
        a: (
          <>
          The official deadline for submitting your HPMES reports is every <strong>5th day</strong> of the month.
          </>
        ),
      },
      {
        q: "What data should be included in the submission by the 5th?",
        a: (
          <>
          Submissions due on the 5th should cover all Technical Assistance provided from the entire previous calendar month.
          </>
        ),
      },
      {
        q: "Why is my HPMES submission flagging an error regarding 'unmatched data'?",
        a: (
          <>
          The HPMES system requires strict consistency across all reporting sections. This error occurs because the figures entered 
          in your primary data entry forms (e.g., monthly summary sheets) do not align with the figures entered in your detailed 
          breakdown forms (e.g., indicator-specific or project-level tracking forms).
          </>
        ),
      },
      {
        q: "Will the system allow me to submit my HPMES report if the forms do not match?",
        a: (
          <>
          <strong>No. The HPMES platform features built-in validation rules</strong>. If there is a mismatch between the two data entry forms, the 
          system will block the submission, display a validation warning, and prevent you from completing your monthly upload until the data is reconciled.
          </>
        ),
      },
      {
        q: "Where can I find the list of acceptable MOVs?",
        a: (
          <>
          The complete list of approved MOVs can be found in the <strong>User’s Guide</strong>.
          </>
        ),
      },
      {
        q: "Who is ultimately responsible for identifying and finalizing GAA targets?",
        a: (
          <>
          While the Central Office provides macro-level ceilings and strategic directions, the Field Offices (FOs) hold the primary discretion to identify, 
          distribute, and finalize specific GAA targets within their respective jurisdictions.
          </>
        ),
      },
      {
        q: "What types of funding supports are typically downloaded under the TAAORSS Centrally Managed Funds?",
        a: (
          <>
          <strong>Technical Assistance (TA) Funds:</strong> Non-monetary capacity-building support. This includes funding for Field Offices (FOs) to conduct regional consultation 
          workshops, the regional-level Panata ko sa Bayan Awards, and national activities initiated by the Central Office (CO) but implemented in the regions. 
          <br />
          <br />
          <strong>One (1) Contract of Service (COS) Salary:</strong> Monetary, covering the salary for one (1) Level II COS staff member on the FO-T/AAORSS Team
          </>
        ),
      },
      {
        q: "Is there a nationally initiated planning workshop conducted for field offices regarding the CMF allocation?",
        a: (
          <>
          <strong>Yes</strong>, this typically occurs in <strong>November of the fiscal year</strong>, following the Integrated/ Program Review and Evaluation Workshop season. The event is usually attended by the 
          designated TAAORSS teams, budget officers, and planning officers from the field offices (FOs). This activity prepares FOs for budget allocaton, ensuring that every FO proposal 
          aligns with the Central Office's national agenda and specific CMF utilization guidelines.
          </>
        ),
      },
      {
        q: "Can a Field Office realign or modify downloaded funds to other fund line item/ purpose if they are unutilized?",
        a: (
          <>
          <strong>No, not without explicit prior approval from the Central Office</strong>. CMF are downloaded for specific purposes specified in the Sub-Allotment Advice (SAA). Any modification, realignment or reallocation of funds 
          requires a formal request with attached montly budget utilization from the Regional Director and subsequent approval from the Undersecretary for Regulatory Services, Institutional Development Group (CF: DSWD Academy)
          </>
        ),
      },
      {
        q: "What are the strict liquidation/ reporting requirements for Field Offices handling these funds?",
        a: (
          <>
          <strong>FOs must fully liquidate</strong> and <strong>report</strong> the status of CMF utilization, or submit the monthly disbursement/utilization report, to the Central Office-DSWD Academy 
          prior to subsequent endorsement for the reference of the CO-Financial Service.
          </>
        ),
      },
      {
        q: "What is the validity period for CMF usage?",
        a: (
          <>
          CMF generally follow the one-year validity of appropriations rule. <strong>Funds downloaded within a fiscal year must be obligated 
          and disbursed within that same year</strong>. Any unobligated balances at the end of the fiscal year are typically classified as 
          savings or untuilized funds, unless specific continuing appropriations guidelines state otherwise.
          </>
        ),
      },
    ],
  },
];

const TAMP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRefs = useRef([]);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  // Structured action cards config for the custom layout container
  const customDeckCards = [
    {
      title: "TA WEDNESDAY",
      icon: <FaLaptopMedical />,
      description: "Virtual Clinic for Technical Assistance opens every Wednesday.",
      buttonText: "Join Here",
      onClick: () => setIsJoinModalOpen(true),
    },
    {
      title: "REQUEST TICKET",
      icon: <FaTicket />,
      description: "Submit a request ticket and we will reach out shortly.",
      buttonText: "Request Here",
      onClick: () => setIsTicketModalOpen(true),
    },
  ];

  useEffect(() => {
    const activeIndex = faqCards.findIndex((c) => c.path === location.pathname);
    if (activeIndex !== -1 && cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [location.pathname]);

  return (
    <div className="pt-20 font-sans relative">
      {/* Global FAQ Radial Speed Dial */}
      <GlobalFaqDial routes={masterFaqRoutes} onNavigate={handleCardClick} />

      {/* FAQ Section */}
      <section className="relative z-10 mb-12 w-full">
        <div className="bg-[#2e3192] w-full py-12">
          <div className="max-w-[100rem] mx-auto px-4 md:px-20 lg:px-40">
            <h2 className="text-[#FFE066] text-2xl md:text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-6 md:grid md:grid-cols-4 md:justify-center md:gap-6 md:overflow-visible p-2">
              {faqCards.map((card, index) => {
                const isActive = location.pathname === card.path;
                return (
                  <motion.div
                    key={card.title}
                    ref={(el) => (cardRefs.current[index] = el)}
                    onClick={() => handleCardClick(card.path)}
                    className={`flex flex-col items-center justify-center cursor-pointer ${isActive ? "bg-[#ee1c25]" : "bg-white"} rounded-3xl p-4 sm:p-5 md:p-8 w-full min-w-[140px] sm:min-w-[160px] md:min-w-0 hover:shadow-2xl`}
                    whileHover={{ scale: 1.05, rotate: -4 }}
                    animate={{ rotate: isActive ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="mb-2 sm:mb-3 md:mb-4 text-center">
                      {React.cloneElement(card.icon, { size: isActive ? 50 : 35, className: isActive ? "text-white md:hidden" : "text-[#2e3192] md:hidden" })}
                      {React.cloneElement(card.icon, { size: isActive ? 70 : 60, className: isActive ? "text-white hidden md:block" : "text-[#2e3192] hidden md:block" })}
                    </div>
                    <h3 className={`font-semibold text-center text-xs sm:text-sm md:text-lg ${isActive ? "text-white" : "text-gray-800"}`}>
                      {card.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section Header / Clean FAQ Mapping */}
      <section className="max-w-[100rem] mx-auto px-4 md:px-0 lg:px-0 mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-20">
          <span className="text-black">FAQS / </span>
          <span className="text-black">TAAORSS / </span>
          <span className="text-[#2e3192]">Targeting Assessment Monitoring Planning</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 items-start">
          {faqPages[0].items.map((faq, index) => (
            <React.Fragment key={index}>
              {faq.q ? (
                <>
                  <div className="md:col-span-4 font-bold text-gray-800">{faq.q}</div>
                  <div className="md:col-span-8 text-gray-700 text-sm md:text-base leading-relaxed">{faq.a}</div>
                </>
              ) : (
                <div className="col-span-12 w-full">{faq.a}</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Shared presentation interface layout for the unified card stack deck */}
      <FloatingCardDeck cards={customDeckCards} rotateInterval={4000} footerId="footer" />

      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}/>
    </div>
  );
};

export default TAMP;