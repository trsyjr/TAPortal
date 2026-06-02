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
import { LuBlocks as LuBlocksIcon } from "react-icons/lu"; 
import TicketModal from "../components/TicketModal";
import JoinModal from "../components/JoinModal";
import GlobalFaqDial from "../components/GlobalFaqDial";
import FloatingCardDeck from "../components/FloatingCardDeck";

/* ---------------- FAQ CARDS (TOP) ---------------- */
const faqCards = [
  { title: "L&D STANDARDS", icon: <FaFileCircleCheck />, path: "/ld-standards" },
  { title: "ACTIVITY PROPOSAL", icon: <FaFileLines />, path: "/active-profile" },
  { title: "LDI-DIP", icon: <FaNetworkWired />, path: "/ldi-dip" },
  { title: "PARTICIPANT ELIGIBILITY", icon: <FaUserCheck />, path: "/participant-eligibility" },
  { title: "Capability Building Plan", icon: <FaComments />, path: "/cbas" },
  { title: "TA and SUPPORT", icon: <FaHandshake />, path: "/ta-support" },
];

/* ---------------- MASTER GLOBAL ROUTES ---------------- */
const masterFaqRoutes = [
  { title: "Assessment, Certification, and Accreditation", path: "/cpd", adIcon: <FaAward /> },
  { title: "Capability Building", path: "/ld-standards", adIcon: <LuBlocksIcon /> },
  { title: "Knowledge Management", path: "/knowledge-product", adIcon: <FaShareNodes /> },
  { title: "TAAORSS", path: "/tara-program", adIcon: <FaBullhorn /> },
];

/* ---------------- FAQ PAGES ---------------- */
const faqPages = [
  {
    label: "Coordination and Management",
    items: [
      {
        q: "How should offices coordinate capability building activities with the DSWD Academy?",
        a: (
          <>
            Coordination should be done through <strong>official communication channels</strong> 
            and <strong>designated focal persons</strong> of the DSWD Academy.
          </>
        ),
      },
      {
        q: "When is coordination with the DSWD Academy required?",
        a: (
          <>
            Coordination with the DSWD Academy is required at the <strong>planning stage, prior to implementation</strong>, 
            when <strong>significant changes</strong> to the activity are proposed, and whenever <strong>further technical assistance is needed</strong>.
          </>
        ),
      },
      {
        q: "What is the role of the DSWD Academy in the conduct of capability building activities (CBAs) by OBSUs?",
        a: (
          <>
            The DSWD Academy provides <strong>guidance, standards, coordination support, and quality assurance</strong> 
            for CBAs conducted by OBSUs within the Department.
          </>
        ),
      },
      {
        q: "Who serves as the official focal person for capability building coordination?",
        a: (
          <>
            The <strong>Capability Building Division</strong>, through the <strong>Professional Learning and Development Section (CBD-PLDS)</strong>, 
            choose as the official focal point for capability building coordination.
          </>
        ),
      },
    ],
  },
  {
    label: "Planning and Reporting",
    items: [
      {
        q: "When is the submission of the Capability Building Plan?",
        a: "Pursuant to Memorandum Circular No. 11, Series of 2010, OBS is expected to submit the required document simultaneously with the draft Work and Financial Plan, scheduled every November.",
      },
      {
        q: "How would be the review and technical assistance done by DSWD Academy?",
        a: "The review and technical assistance of the document shall be done via the google sheet.",
      },
      {
        q: "What is the process of submission of the Capability Building Plan?",
        a: `Access the CB Plan template through the provided link.

            Locate your respective Cluster and Office.

            Once located, proceed to the Dashboard tab.

            In the CB Focal Area, enter your email address. This email will serve as the contact person of the DSWD Academy for the CB Plan processes.

            Go to your assigned sheet and fill in the required information.

            After completing the necessary details, return to the Dashboard and update the status 'DONE'. This will notify the DSWD Academy Technical Assistance Focal to begin the review.

            If the document meets the required standards, the DSWD Academy Focal will update the status to "For Endorsement."

            Once marked For Endorsement, the OBS may proceed to print the document for the signatures of the Cluster Head and the Head of the DSWD Academy.`,
      },
      {
        q: "All Capability Building Activities from the Work and Financial Plan.",
        a: (
          <>
            <p>The review and technical assistance of the document shall be done via the google sheet.</p>
            <p className="mt-2 font-semibold">More Specifically:</p>
            <ul className="list-disc list-inside ml-4 mt-1">
              {[
                "Training",
                "Training of Trainers",
                "Forum",
                "Workshop",
                "Conference",
                "Summit",
                "Meeting",
                "Seminar",
                "Brown Bag Session",
                "Coaching Session",
                "Program Review and Evaluation",
              ].map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </>
        ),
      },
      {
        q: "",
        a: (
          <>
            <strong>Reference:</strong>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <a 
                  href="/pdfs/MC_2010-011-IDCB-GUIDELINES.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  Memorandum Circular No. 11, s. 2010.
                </a>
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
];

const CBA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRefs = useRef([]);
  const [faqPage, setFaqPage] = useState(0);

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

  /* Scroll active FAQ card into view */
  useEffect(() => {
    const activeIndex = faqCards.findIndex((c) => c.path === location.pathname);
    if (activeIndex !== -1 && cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [location.pathname]);

  return (
    <div className="pt-20 font-sans relative">
      {/* Global FAQ Radial Speed Dial */}
      <GlobalFaqDial routes={masterFaqRoutes} onNavigate={handleCardClick} />

      {/* ---------------- FAQ CARDS ---------------- */}
      <section className="relative z-10 mb-12 w-full">
        <div className="bg-[#2e3192] w-full py-12">
          <div className="max-w-[100rem] mx-auto px-4 md:px-20 lg:px-40">
            <h2 className="text-[#FFE066] text-2xl md:text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-6 md:grid md:grid-cols-2 lg:grid-cols-6 md:gap-6 md:overflow-visible p-2">
              {faqCards.map((card, index) => {
                const isActive = location.pathname === card.path;
                return (
                  <motion.div
                    key={card.title}
                    ref={(el) => (cardRefs.current[index] = el)}
                    onClick={() => handleCardClick(card.path)}
                    className={`flex flex-col items-center justify-center cursor-pointer
                      ${isActive ? "bg-[#ee1c25]" : "bg-white"}
                      rounded-3xl p-4 sm:p-5 md:p-8 min-w-[140px] sm:min-w-[160px] md:min-w-0`}
                    whileHover={{ scale: 1.05, rotate: -4 }}
                    animate={{ rotate: isActive ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="mb-3">
                     {React.cloneElement(card.icon, { size: isActive ? 50 : 35, className: isActive ? "text-white md:hidden" : "text-[#2e3192] md:hidden" })}
                     {React.cloneElement(card.icon, { size: isActive ? 70 : 60, className: isActive ? "text-white hidden md:block" : "text-[#2e3192] hidden md:block" })}
                    </div>
                    <h3 className={`font-semibold text-center text-sm md:text-lg ${isActive ? "text-white" : "text-gray-800"}`}>
                      {card.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ CONTENT ---------------- */}
      <section className="max-w-[100rem] mx-auto px-4 md:px-0 lg:px-0 mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="text-black">FAQS / Capability Building / </span>
          <span className="text-[#2e3192]">Capability Building Activities (CBAs)</span>
        </h3>
        <h3 className="text-sm md:text-md font-bold mb-2 text-gray-500">
          As of 14 January, 2026
        </h3>

        <p className="text-[#2e3192] font-semibold mb-8 mt-8">
          {faqPages[faqPage].label}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 items-start">
          {faqPages[faqPage].items.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.q && (
                <div className="md:col-span-4 font-bold text-gray-800">{item.q}</div>
              )}
              <div className="md:col-span-8 text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {item.a || <span className="italic text-gray-400">&lt;Blank&gt;</span>}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* ---------------- PAGINATION ---------------- */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            disabled={faqPage === 0}
            onClick={() => setFaqPage((p) => p - 1)}
            className={`px-8 py-2 rounded-xl font-semibold
              ${faqPage === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#2e3192] text-white hover:scale-105"}`}
          >
            Prev
          </button>

          <button
            disabled={faqPage === faqPages.length - 1}
            onClick={() => setFaqPage((p) => p + 1)}
            className={`px-8 py-2 rounded-xl font-semibold
              ${faqPage === faqPages.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#2e3192] text-white hover:scale-105"}`}
          >
            Next
          </button>
        </div>
      </section>

      {/* Shared presentation interface layout for the unified card stack deck */}
      <FloatingCardDeck cards={customDeckCards} rotateInterval={4000} footerId="footer" />

      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </div>
  );
};

export default CBA;