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
import FloatingCardDeck from "../components/FloatingCardDeck"; // Imported FloatingCardDeck component safely

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
  { title: "Capability Building", path: "/ld-standards", adIcon: <LuBlocks /> },
  { title: "Knowledge Management", path: "/knowledge-product", adIcon: <FaShareNodes /> },
  { title: "TAAORSS", path: "/tara-program", adIcon: <FaBullhorn /> },
];

/* ---------------- FAQ PAGES ---------------- */
const faqPage = {
  label: "L&D Standards",
  items: [
    {
      q: "Where can the official L&D standards, templates, and guidebooks be accessed?",
      a: (
        <>
          Official standards, templates, and guidebooks are available through the DSWD Academy and CBD-PLDS <strong>official platforms and shared repositories</strong>.
        </>
      ),
    },
    {
      q: "Are offices allowed to use customized templates instead of the prescribed DSWD Academy templates?",
      a: (
        <>
          Prescribed templates are recommended to ensure consistency. Customized templates may be used only if aligned with required standards and if the prescribed templates are not applicable, with clearance from the DSWD Academy.
        </>
      ),
    },
    {
      q: "\u00A0", // non-breaking space
      a: (
          <>
            <strong>Reference:</strong>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <a 
                  href="https://drive.google.com/drive/folders/1t3P41pSDNz_iOfUNk4OySMWAMPhoMKdW?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  Department of Social Welfare and Development (DSWD). Learning and Development (L&D) Guidebook.
                </a>
              </li>
            </ul>
          </>
        ),
    },
  ],
};

const LD = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRefs = useRef([]);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  // Setup explicitly targeted navigation routes
  const prevRoute = masterFaqRoutes[0]; // ACA (/cpd)
  const nextRoute = masterFaqRoutes[2]; // KM (/knowledge-product)

  // Configuration items mapping mapped parameters down to presentation layout component safely
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

  /* ---------------- Scroll active FAQ card ---------------- */
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
          <span className="text-[#2e3192]">{faqPage.label}</span>
        </h3>
        <h3 className="text-sm md:text-md font-bold mb-2 text-gray-500">
          As of 14 January, 2026
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 items-start mt-10">
          {faqPage.items.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.q && <div className="md:col-span-4 font-bold text-gray-800">{item.q}</div>}
              <div className="md:col-span-8 text-gray-700 text-sm md:text-base leading-relaxed">
                {item.a || <span className="italic text-gray-400">&lt;Blank&gt;</span>}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ---------------- FLOATING CARDS ---------------- */}
      <FloatingCardDeck cards={customDeckCards} rotateInterval={4000} footerId="footer" />

      {/* Modals */}
      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}/>
    </div>
  );
};

export default LD;