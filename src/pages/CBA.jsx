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

/* ---------------- FLOATING CARDS ---------------- */
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
    buttonAction: () => window.alert("Request Ticket Clicked"),
  },
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
            serves as the official focal point for capability building coordination.
          </>
        ),
      },
    ],
  },
  {
    label: "Planning and Reporting",
    items: [
      {
        q: "What capability building plans are required to be submitted to the DSWD Academy?",
        a: "",
      },
      {
        q: "How often should capability building plans and reports be updated?",
        a: "",
      },
      {
        q: "What are the required reports after the conduct of a capability building activity?",
        a: "",
      },
      {
        q: "",
        a: (<><strong>Reference:</strong></>),
      },
    ],
  },
];

const CBA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRefs = useRef([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(32);
  const [faqPage, setFaqPage] = useState(0);

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

  /* Rotate floating cards */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % floatingCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* Footer-safe floating cards */
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
          <span className="text-[#2e3192]">Capability Building Activities (CBAs)</span>
        </h3>

        <p className="text-[#2e3192] font-semibold mb-8 mt-8">
          {faqPages[faqPage].label}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 items-start">
          {faqPages[faqPage].items.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="md:col-span-4 font-bold text-gray-800">{item.q}</div>
              <div className="md:col-span-8 text-gray-700 text-sm md:text-base leading-relaxed">
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
            className={`px-8 py-2 rounded-full font-semibold
              ${faqPage === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#2e3192] text-white hover:scale-105"}`}
          >
            Prev
          </button>

          <button
            disabled={faqPage === faqPages.length - 1}
            onClick={() => setFaqPage((p) => p + 1)}
            className={`px-8 py-2 rounded-full font-semibold
              ${faqPage === faqPages.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#2e3192] text-white hover:scale-105"}`}
          >
            Next
          </button>
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

export default CBA;
