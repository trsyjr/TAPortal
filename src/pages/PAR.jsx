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
    label: "PAR",
    items: [
      {
        q: "Why is there no option for PSWDO / Province (PLGU) in the dropdown menu while registering an LGU account?",
        a: (
          <>
          The dropdown menu for the LGU is dependent on the selected region. Please ensure that you select the correct Region first before searching 
          for your specific Province. If you are registering as a PLGU (Provincial LGU), the system filters the succeeding choices based on this 
          geographical hierarchy.
          </>
        ),
      },
      {
        q: "The uploaded MOVs disappeared or were not saved after moving to another section or clicking the 'Home' tab. What is the cause of this?",
        a: (
          <>
          This issue occurs when the same user account is logged into multiple devices simultaneously, which causes synchronization conflicts and multiple 
          conflicting entries in the database. To ensure your data is saved, use one device per account and log out properly before switching devices.
          </>
        ),
      },
      {
        q: "What should we do with indicators that are not applicable to our LGU (e.g., no recorded cases of OSAEC, CSAEM, Child Marriage, or Armed Conflict)?",
        a: (
          <>
          There is no need to upload any documents if the specific case or scenario does not exist in your locality. You may simply use the "SKIP" button 
          located in the lower-left corner of the system interface. Clicking this will allow you to proceed without a penalty on your progress.
          </>
        ),
      },
      {
        q: "Why does an error occur when uploading multiple documents or links in a single indicator section?",
        a: (
          <>
          The system is currently designed and configured to accept only one (1) file per designated upload field. If you have multiple supporting 
          documents or MOVs for a single indicator, you must merge them into a single PDF file before uploading.
          </>
        ),
      },
      {
        q: "Where can we get a guide or Technical Notes for specific MOVs requested per Section and Level to ensure they match what we are preparing?",
        a: (
          <>
          The User's Guide to be released by the OCIO in the 3rd week of May 2026 is intended strictly for system (IS) navigation and utilization. For the 
          official, detailed, and complete list of required documentary evidence, please refer to the attached guidelines link.
          </>
        ),
      },
      {
        q: "Is there an automatic session timeout if the system is left open and idle? Does it have an 'Autosave' feature?",
        a: (
          <>
          Currently, there is no automatic session timeout on the platform if it is left unattended. However, please note that the system does not have an 
          automatic autosave feature for file attachments; you must manually save your progress before navigating away.
          </>
        ),
      },
      {
        q: "If an LGU mistakenly uploads an incorrect file or enters flawed text data and hits 'Submit', can the Regional Focal revert the status back to 'Draft' for LGU corrections?",
        a: (
          <>
          Yes. The Regional Focal account holds overriding administrative writes to modify database stage states from "Submitted / Under Review" back to 
          "Returned to Draft / For Modification."SOP: Locate the specific LGU profile within the evaluation queue, click the "Return for Revision" button, and append a mandatory system log note stating the exact indicator and correcting action required by the LGU.
          </>
        ),
      },
    ],
  },
];

const PAR = () => {
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
          <span className="text-[#2e3192]">Performance and Recognition</span>
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

export default PAR;