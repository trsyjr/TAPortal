// src/pages/TASupport.jsx
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

// FAQ Cards for top navigation
const faqCards = [
  { title: "ACTIVITY PROPOSAL", icon: <FaFileLines />, path: "/active-profile" },
  { title: "LDI-DIP", icon: <FaNetworkWired />, path: "/ldi-dip" },
  { title: "PARTICIPANT ELIGIBILITY", icon: <FaUserCheck />, path: "/participant-eligibility" },
  { title: "TA and SUPPORT", icon: <FaHandshake />, path: "/ta-support" },
  { title: "L&D STANDARDS", icon: <FaFileCircleCheck />, path: "/ld-standards" },
  { title: "CBAs", icon: <FaComments />, path: "/cbas" },
];

// Floating cards data
const floatingCards = [
  {
    title: "TA CLINIC",
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

// Clean object-based FAQ data
const faqPages = [
  {
    label: "TA Services",
    items: [
      {
        q: "What types of concerns can be addressed through technical assistance by CBD-PLDS?",
        a: (
          <>
            The CBD-PLDS provides technical assistance in the following areas of Capability Building:
            <br />
            <br />
            <strong>Review of Training Proposals:</strong>
            <br />
            This assistance ensures training proposals from the Offices, Bureaus, and Services (OBS) meet DSWD Academy’s standards by assessing design, content, objectives, methodologies, and alignment with competency frameworks for quality assurance in learning interventions.
            <br />
            <strong>Training Management Standards:</strong>
            <br />
            This TA ensures DSWD Academy’s quality standards in training programs by guiding the application of standardized processes in planning, implementation, documentation, and evaluation, promoting efficiency, consistency, and learner-centered approaches.
            <br />
            <strong>Monitoring and Evaluation of Learning:</strong>
            <br />
            This service offers technical support in measuring training effectiveness, including developing M&E tools, analyzing outcomes, and providing evidence-based recommendations for improving future initiatives.
            <br />
            <strong>Capability Building Planning and Reporting:</strong>
            <br />
            This technical assistance helps DSWD offices develop and report CB Plans and Accomplishment Reports by guiding them in identifying development needs, aligning efforts with strategic priorities, setting targets, and documenting progress to inform future capability building.
          </>
        ),
      },
      {
        q: "How can offices request technical assistance along capability building?",
        a: (
          <>
            TA requests may be submitted through <strong>official communication channels</strong> or <strong>scheduled mechanisms</strong> such as TA Wednesdays.
          </>
        ),
      },
      {
        q: "When should an office avail of TA Wednesdays instead of submitting documents for review?",
        a: (
          <>
            TA Wednesdays are recommended for <strong>clarifications, initial guidance, and quick consultations</strong> prior to formal submission.
          </>
        ),
      },
      {
        q: "What is the expected turnaround time for technical assistance requests?",
        a: (
          <>
            Turnaround time varies <strong>depending on the nature and complexity of the request</strong> and <strong>existing workload</strong>, and is monitored by CBD-PLDS.
            <br />
            <br />
            Per EODB Law, simple requests are processed within three (3) working days, while complex requests are processed within seven (7) working days.
          </>
        ),
      },
      {
        q: "\u00A0",
        a: (
          <>
            <strong>Reference:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
            </ul>
          </>
        ),
      },
    ],
  },
];

const TASupport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRefs = useRef([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(32); // initial bottom-32

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  // Scroll active FAQ card into view
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

  // Rotate floating cards every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % floatingCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Adjust floating deck so it doesn't cover footer
  useEffect(() => {
    const handleResize = () => {
      const footer = document.getElementById("footer"); // make sure your footer has id="footer"
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const spaceFromBottom = window.innerHeight - footerRect.top + 20; // 20px margin
        setBottomOffset(Math.max(32, spaceFromBottom));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pt-20 font-sans relative">
      {/* FAQ Section */}
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
                    className={`
                      flex flex-col items-center justify-center cursor-pointer
                      ${isActive ? "bg-[#FFE066]" : "bg-white"}
                      rounded-3xl
                      p-4 sm:p-5 md:p-8
                      min-w-[140px] sm:min-w-[160px] md:min-w-0
                      hover:shadow-2xl
                    `}
                    whileHover={{ scale: 1.05, rotate: -4 }}
                    animate={{ rotate: isActive ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="mb-2 sm:mb-3 md:mb-4 text-center">
                      {React.cloneElement(card.icon, {
                        size: isActive ? 50 : 35,
                        className: "md:hidden",
                      })}
                      {React.cloneElement(card.icon, {
                        size: isActive ? 70 : 60,
                        className: "hidden md:block",
                      })}
                    </div>
                    <h3
                      className={`font-semibold text-center text-xs sm:text-sm md:text-lg ${
                        isActive ? "text-[#2e3192]" : "text-gray-800"
                      }`}
                    >
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
        <h3 className="text-2xl md:text-3xl font-bold mb-8">
          <span className="text-black">FAQS / </span>
          <span className="text-[#2e3192]">TA and Support</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 items-start">
          {faqPages[0].items.map((faq, index) => (
            <React.Fragment key={index}>
              {faq.q && (
                <div className="md:col-span-4 font-bold text-gray-800">{faq.q}</div>
              )}
              <div className="md:col-span-8 text-gray-700 text-sm md:text-base leading-relaxed">
                {faq.a}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Floating Split Deck (Lower Right, Footer Safe) */}
      <div className="fixed right-6 z-50 w-56 h-60" style={{ bottom: `${bottomOffset}px` }}>
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
                <div className="mb-2">
                  {React.cloneElement(card.icon, { size: 35, className: "text-[#2e3192]" })}
                </div>
                <h3 className="text-sm md:text-md font-bold text-[#2e3192] mb-2">{card.title}</h3>
                <p className="text-gray-600 text-3xs md:text-xs mb-2">{card.description}</p>
                <button className="bg-[#FFE066] px-4 py-2 rounded-full font-semibold hover:scale-105 transition text-sm md:text-base">
                  {card.buttonText}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TASupport;
