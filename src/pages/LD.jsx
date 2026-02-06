// src/pages/LD.jsx
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
} from "react-icons/fa6";
import TicketModal from "../components/TicketModal";

/* ---------------- FAQ CARDS (TOP) ---------------- */
const faqCards = [
  { title: "ACTIVITY PROPOSAL", icon: <FaFileLines />, path: "/active-profile" },
  { title: "LDI-DIP", icon: <FaNetworkWired />, path: "/ldi-dip" },
  { title: "PARTICIPANT ELIGIBILITY", icon: <FaUserCheck />, path: "/participant-eligibility" },
  { title: "TA and SUPPORT", icon: <FaHandshake />, path: "/ta-support" },
  { title: "L&D STANDARDS", icon: <FaFileCircleCheck />, path: "/ld-standards" },
  { title: "CB PLAN and ACCOMPLISHMENTS", icon: <FaComments />, path: "/cbas" },
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
            <li>Department of Social Welfare and Development (DSWD). Learning and Development (L&D) Guidebook.</li>
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
  const [currentCard, setCurrentCard] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(32);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  const floatingCards = [
        {
          title: "TA WEDNESDAY",
          icon: <FaLaptopMedical />,
          description: "Virtual Clinic for Technical Assistance opens every Wednesday.",
          buttonText: "Join Here",
          buttonAction: () => window.alert("TA CLINIC Clicked"),
        },
        {
          title: "REQUEST TICKET",
          icon: <FaTicket />,
          description: "Submit a request ticket and we will reach out shortly.",
          buttonText: "Request Here",
          buttonAction: () => setIsTicketModalOpen(true), // ✅ opens modal
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

  /* ---------------- Rotate floating cards ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % floatingCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- Footer-safe floating cards ---------------- */
  useEffect(() => {
    const handleResize = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const overlap = window.innerHeight - rect.top + 20;
        setBottomOffset(Math.max(32, overlap));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pt-20 font-sans relative">
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
                      ${isActive ? "bg-[#FFE066]" : "bg-white"}
                      rounded-3xl p-4 sm:p-5 md:p-8 min-w-[140px] sm:min-w-[160px] md:min-w-0`}
                    whileHover={{ scale: 1.05, rotate: -4 }}
                  >
                    <div className="mb-3">
                      {React.cloneElement(card.icon, {
                        size: isActive ? 60 : 45,
                      })}
                    </div>
                    <h3 className={`font-semibold text-center text-sm md:text-lg ${isActive ? "text-[#2e3192]" : "text-gray-800"}`}>
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
          <span className="text-black">FAQS / </span>
          <span className="text-[#2e3192]">{faqPage.label}</span>
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
      <div
        className="fixed right-6 z-50 w-56 h-60"
        style={{ bottom: `${bottomOffset}px` }}
      >
        {floatingCards.map((card, index) => {
          const isTop = index === currentCard;
          const offsetX = isTop ? -10 : 10;
          const offsetY = 0;
          const rotation = isTop ? -5 : 5;
          const zIndex = isTop ? 20 : 10;

          return (
            <motion.div
              key={card.title}
              className="absolute bg-white rounded-2xl shadow-xl w-48 cursor-pointer flex flex-col items-center p-4 md:p-6"
              style={{ zIndex }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                x: offsetX,
                y: offsetY,
                rotate: rotation,
                scale: isTop ? 1 : 0.95,
                opacity: 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={card.buttonAction}
            >
              <div className="flex flex-col items-center text-center">
                {React.cloneElement(card.icon, { size: 35, className: "text-[#2e3192]" })}
                <h3 className="text-sm md:text-md font-bold text-[#2e3192] mt-2">{card.title}</h3>
                <p className="text-gray-600 text-3xs md:text-xs mt-2">{card.description}</p>
                <button
                  className="bg-[#FFE066] px-4 py-2 rounded-full font-semibold hover:scale-105 transition text-sm md:text-base"
                  onClick={card.buttonAction} // ✅ button works
                >
                  {card.buttonText}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
    </div>
  );
};

export default LD;
