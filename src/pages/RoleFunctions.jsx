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
  { title: "KNOWLEDGE PRODUCT", icon: <FaFileCircleCheck />, path: "/knowledge-product" },
  { title: "CORE GROUP OF SPECIALISTS", icon: <FaFileCircleCheck />, path: "/cgs" },
  { title: "KNOWLEDGE SHARING SESSIONS", icon: <FaFileLines />, path: "/kss" },
  { title: "ROLE AND FUNCTIONS", icon: <FaNetworkWired />, path: "/role-functions" },
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
    label: "Core Group of Specialist",
    items: [
        {
        q: "What are the roles and functions of a senior specialist?",
        a: (
            <>
            <p className="mb-4">
                Senior specialist refers to a member assessed and certified as practitioner (competency level 3) or expert (competency level 4); serves as an authority in a particular field of expertise. As such, he/she has the knowledge and practice skills in providing technical assistance to partners and intermediaries. The senior specialist performs the following functions:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Provide technical assistance on complex issues and concerns which may not have been covered by an existing policy or standard; and propose for amendment(s) thereof</li>
                <li>Provide inputs to enhance guidelines pertaining to field of expertise prior to further review by MANCOM/RMANCOM and approval by the EXECOM;</li>
                <li>Serve as mentor to identified mentees and shall conduct mentoring session in accordance to the designed learning and development intervention for each specialization</li>
                <li>Serve as subject matter expert of trainings and knowledge sharing sessions organized by DSWD and its partners;</li>
                <li>Join TWGs intended to deliver a specific output relative to the sectoral welfare and development</li>
                <li>Attend case conferences on high profile/problematic cases to provide inputs as part of resolution</li>
                <li>Attend CGS conventions</li>
                <li>Undertake research pertaining to the respective sectors as part of the continuing professional education</li>
            </ul>
            </>
        ),
        },
        {
        q: "What are the roles and functions of a junior specialist?",
        a: (
            <>
            <p className="mb-4">
                Junior Specialist refers to a member assessed and certified as apprentice (competency level 1) or associate (competency level 2); serves as the understudy of the specialist in a particular field of expertise. The Junior Specialist performs the following functions:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Provide technical assistance according to existing policies and standards</li>
                <li>Provide inputs to proposed policies/measures concerning the sectors based on primary requirements or components for a policy or program</li>
                <li>Attend mentoring sessions in accordance to the designed learning and development intervention for the specialization</li>
                <li>Serve as focal persons for implementing programs/projects/services related to sector specialization in partnership with LGUs, NGOs and CSOs</li>
            </ul>
            </>
        ),
        },
    ],
  },
];

const RoleFunctions = () => {
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
          <span className="text-black">Knowledge Management / </span>
          <span className="text-[#2e3192]">Role and Functions</span>
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

export default RoleFunctions;