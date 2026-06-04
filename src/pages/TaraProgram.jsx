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
  { title: "SDCA-IS", icon: <FaNetworkWired />, path: "/sdca" },
  { title: "PERFORMANCE AND RECOGNITION", icon: <FaFileLines />, path: "/par" },
];

/* ---------------- MASTER GLOBAL ROUTES ---------------- */
const masterFaqRoutes = [
  { title: "Assessment, Certification, and Accreditation", path: "/cpd", adIcon: <FaAward /> },
  { title: "Capability Building", path: "/ld-standards", adIcon: <LuBlocks /> },
  { title: "Knowledge Management", path: "/knowledge-product", adIcon: <FaShareNodes /> },
  { title: "TAAORSS", path: "/tara-program", adIcon: <FaBullhorn /> },
];

// Clean FAQ object divided cleanly by sequential blocks
export const faqPages = [
  {
    label: "Agency Mandate",
    items: [
      {
        q: "What are the legal basis of the program?",
        a: (
          <>
            In view of the enactment of <strong>Republic Act No. 7160</strong> or the LGC of 1991 and the subsequent issuance of <strong>Executive Order (EO) 
            No. 503 Series. of 1992</strong>, the Department of Social Welfare and Development (DSWD), as a national government agency, devolved 
            basic social welfare services – together with the direct service workers, assets and liabilities, and corresponding budget – to LGUs.  
            <strong>EO No. 50 s. 1992 (amending EO No. 503 s. 1992)</strong> was thereafter issued, resulting in a paradigm shift by the DSWD among national government 
            agencies (NGAs) affected by the LGC.  The DSWD thereby assumed a steering role on policy formulation, standard setting, monitoring 
            and technical assistance.  It also acted as an enabler and partner of LGUs and other stakeholders in the social welfare and development 
            (SWD) sector.
          </>
        ),
      },
    ],
  },
  {
    label: "About the Program",
    items: [
      {
        q: "What is TARA Program?",
        a: (
          <>
            The DSWD SWD TARA program aims to assist Local Social Welfare and Development Offices (LSWDOs) of Local Government Units (LGUs) in improving their 
            functionality or service delivery level.  It covers not only LSWDOs, but also the offices of LGUs for senior citizens (Office for Senior Citizens 
            Affairs), persons with disability (Persons with Disability Affairs Office) and other vulnerable and marginalized sectors, whether or not directly 
            under the supervision of LSWDOs
          </>
        ),
      },
      {
        q: "What are the objectives of the Program?",
        a: (
          <>
            In general, the DSWD SWD TARA Program aims at advancing the functionality or service delivery level of LSWDOs as frontline service providers, 
            for them to achieve an improved level of programs/services delivery using the Capacity Levels of Social Welfare and Development Service Delivery 
            Indicators which are as follows: Level 1 - Ad-Hoc; Level 2 - Managed/Repeatable; Level 3 - Defined/Standardized; Level 4 - Optimized/Continuous 
            Improvement.
          </>
        ),
      },
      {
        q: "Who implements the Program?",
        a: (
          <>
            It is being operationalized by the TAAORSS Division of the DSWD Academy which is responsible for the management and
            operationalization of the TA System for LGUs through the different
            OBS, Field Offices and other stakeholders. lt shall lead the
            development and implementation of efficient, results based,
            collaborative and coordinative TA strategies for LGUs
          </>
        ),
      },
      {
        q: "What is the Budget Source of the Program?",
        a: (
          <>
            Its budget comes from the approved and enacted General Appropriations under Organizational Outcome 5: Capacity of LGUs through LSWDOs on SWD 
            Service Delivery Improved. Seventy (70%) of the total MOOE TAAORSS Budget is allocated for relevant PPAs implemented by the DSWD Academy and 
            30% is directly released to DSWD Field Offices to fund primarily monitoring activities and other TA operational requirements.
          </>
        ),
      },
      {
        q: "How does the program being implemented?",
        a: (
          <>
            The program activities are implemented into phases: Assessment, Planning, Implementation and Monitoring, Evaluation and Recognition of LGUs with 
            Exemplary Performance
          </>
        ),
      },
      {
        q: "How does the program accomplishments being reported?",
        a: (
          <>
            The program accomplishments are captured and reported through the different forms of the Harmonized Planning, Monitoring and Evaluation System 
            periodically and being uploaded in the HPMES site (monthly, quarterly, semestral and annual - both statistical and narrative) Field Offices endorse 
            their HPMES Reports to the Central Office and are reviewed and consolidated by the Program Statistician and Academy Planning Officer for consistency, 
            accuracy and verifiability prior to submission to the PDPB website/portal with accompanying physical submission.
          </>
        ),
      },
    ],
  },
];

const TaraProgram = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRefs = useRef([]);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

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
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="text-black">FAQS / </span>
          <span className="text-black">TAAORSS / </span>
          <span className="text-[#2e3192]">TARA Program</span>
        </h3>
        <h3 className="text-sm md:text-md font-bold mb-20 text-gray-500">
          As of 21 May 2026
        </h3>
        
        {/* Dynamic Multi-Section Rendering with Independent Section Labels */}
        {faqPages.map((page, pageIdx) => (
          <div key={pageIdx} className="mb-12">
            {/* Renders each category section label dynamically */}
            <p className="text-[#2e3192] font-semibold text-lg mb-6 border-b pb-2">
              {page.label}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 items-start">
              {page.items.map((faq, index) => (
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
          </div>
        ))}
      </section>

      <FloatingCardDeck cards={customDeckCards} rotateInterval={4000} footerId="footer" />

      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}/>
    </div>
  );
};

export default TaraProgram;