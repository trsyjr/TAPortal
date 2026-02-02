// src/pages/Ldi.jsx
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

// Top FAQ cards
const faqCards = [
  { title: "ACTIVITY PROPOSAL", icon: <FaFileLines />, path: "/active-profile" },
  { title: "LDI-DIP", icon: <FaNetworkWired />, path: "/ldi-dip" },
  { title: "PARTICIPANT ELIGIBILITY", icon: <FaUserCheck />, path: "/participant-eligibility" },
  { title: "TA and SUPPORT", icon: <FaHandshake />, path: "/ta-support" },
  { title: "L&D STANDARDS", icon: <FaFileCircleCheck />, path: "/ld-standards" },
  { title: "CBAs", icon: <FaComments />, path: "/cbas" },
];

// Floating cards
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

// Clean FAQ object
const faqPages = [
  {
    label: "LDI-DIP",
    items: [
      {
        q: "What is an LDI-DIP, and when is it required?",
        a: (
          <>
            An LDI-DIP, or <strong>Learning and Development Intervention Design and Implementation Plan</strong>, is a structured matrix that provides <strong>clear guidance and direction to trainers</strong> in the conduct of a capability building activity. It outlines the <strong>flow of sessions using the 4As framework</strong> (Activity, Analysis, Abstraction, and Application) and specifies learning objectives, methods, and expected outputs. An LDI-DIP is required for structured capability building interventions.
          </>
        ),
      },
      {
        q: "What is the difference between an LDI-DIP and an activity design matrix?",
        a: (
          <>
            There is <strong>no substantive difference</strong> between an LDI-DIP and an activity design matrix. The LDI-DIP is the current term used by the DSWD Academy for what was formerly referred to as the activity design matrix. The <strong>terms may be used interchangeably</strong>, as both refer to the same matrix that outlines the session flow, learning objectives, methods, and expected outputs of a capability building activity.
          </>
        ),
      },
      {
        q: "Which offices are required to prepare and submit LDI-DIPs?",
        a: (
          <>
            All <strong>Offices, Bureaus, Services, and Units (OBSUs)</strong> proposing capability building activities are expected to prepare and submit an LDI-DIP to the DSWD Academy for review as an attachment to the activity proposal. An LDI-DIP <strong>may also be submitted as a standalone document</strong> when an OBSU requests guidance or technical assistance in the drafting or preparation of the activity design to <strong>ensure compliance with DSWD Academy learning and development standards</strong>.
          </>
        ),
      },
      {
        q: "What are the common reasons for the return or revision of LDI-DIPs?",
        a: (
          <>
            Common reasons include <strong>unclear</strong> objectives, <strong>misalignment</strong> with L&D standards, <strong>incomplete</strong> information, and <strong>inconsistencies</strong> between objectives, outputs, methods, and evaluation tools.
          </>
        ),
      },
      {
        q: "Can previously approved LDI-DIPs be reused or adapted for similar activities?",
        a: (
          <>
            Previously approved LDI-DIPs <strong>may be adapted</strong>, provided they are <strong>reviewed</strong> and <strong>updated</strong> to reflect the current <strong>context, participants,</strong> and <strong>objectives</strong>.
          </>
        ),
      },
      {
        q: "How many iterations of review are allowed for an LDI-DIP?",
        a: (
          <>
            LDI-DIPs <strong>may undergo several review iterations</strong> until minimum standards are met. The focus is on quality improvement rather than limiting the number of revisions.
          </>
        ),
      },
      {
        q: "How many participants can join a capability building activity or training?",
        a: (
          <>
            The <strong>appropriate number of participants</strong> in a capability building activity <strong>depends on the learning objectives and the nature of the activity</strong>. For activities with active skills practice and participatory learning, the DSWD Academy encourages a facilitator-to-participant <strong>ratio of 1:35</strong> to help ensure that learning objectives are met and participants have sufficient opportunities to engage and demonstrate learning. <strong>This ratio supports meaningful interaction and facilitation</strong>.
            <br />
            <strong>International practice</strong> shows that <strong>ideal group sizes</strong> for participatory adult learning tend to range between about <strong>15 to 30 participants</strong>, with smaller groups (e.g., 8–20) often recommended for deeper engagement and interaction, and larger groups managed through additional facilitators or breakout structures when learning goals are primarily informational or seminar-oriented.
            <br />
            Activities such as <strong>seminars or large conferences may accommodate more participants</strong> if the design and delivery approach support larger audiences, provided that <strong>additional facilitators or support mechanisms are in place</strong>. The major consideration in identifying participant numbers for any CBA remains the learning objectives and the methods required to achieve them.
          </>
        ),
      },
      {
        q: "\u00A0",
        a: (
          <>
            <strong>Reference:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Administrative Order No. 20, s. 2024. Omnibus Policies and Guidelines on the Management of DSWD Capability Building Efforts.</li>
              <li>Memorandum Circular No. 07, s. 2010. Terms of Reference on the Use of Standard Forms on Training Design, Syllabus, and Documentation.</li>
              <li>Memorandum from the Secretary (31 May 2024). FY 2025 Work and Financial Planning Guidelines.</li>
              <li>Department of Social Welfare and Development (DSWD). Learning and Development (L&D) Guidebook.</li>
            </ul>
          </>
        ),
      },
    ],
  },
];

const Ldi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRefs = useRef([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(32);

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  useEffect(() => {
    const activeIndex = faqCards.findIndex((c) => c.path === location.pathname);
    if (activeIndex !== -1 && cardRefs.current[activeIndex]) {
      cardRefs.current[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % floatingCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const spaceFromBottom = window.innerHeight - footerRect.top + 20;
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
                    className={`flex flex-col items-center justify-center cursor-pointer ${isActive ? "bg-[#FFE066]" : "bg-white"} rounded-3xl p-4 sm:p-5 md:p-8 min-w-[140px] sm:min-w-[160px] md:min-w-0 hover:shadow-2xl`}
                    whileHover={{ scale: 1.05, rotate: -4 }}
                    animate={{ rotate: isActive ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="mb-2 sm:mb-3 md:mb-4 text-center">
                      {React.cloneElement(card.icon, { size: isActive ? 50 : 35, className: "md:hidden" })}
                      {React.cloneElement(card.icon, { size: isActive ? 70 : 60, className: "hidden md:block" })}
                    </div>
                    <h3 className={`font-semibold text-center text-xs sm:text-sm md:text-lg ${isActive ? "text-[#2e3192]" : "text-gray-800"}`}>
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
          <span className="text-[#2e3192]">LDI-DIP</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12 items-start">
          {faqPages[0].items.map((faq, index) => (
            <React.Fragment key={index}>
              {faq.q && <div className="md:col-span-4 font-bold text-gray-800">{faq.q}</div>}
              <div className="md:col-span-8 text-gray-700 text-sm md:text-base leading-relaxed">{faq.a}</div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Floating Split Deck */}
      <div className="fixed right-6 z-50 w-56 h-60" style={{ bottom: `${bottomOffset}px` }}>
        {floatingCards.map((card, index) => {
          const isTop = index === currentCard;
          const offsetX = isTop ? -10 : 10;
          const rotation = isTop ? -5 : 5;
          const zIndex = isTop ? 20 : 10;

          return (
            <motion.div
              key={card.title}
              className="absolute bg-white rounded-2xl shadow-xl w-48 cursor-pointer flex flex-col items-center p-4 md:p-6"
              style={{ zIndex }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ x: offsetX, y: 0, rotate: rotation, scale: isTop ? 1 : 0.95, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={card.buttonAction}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">{React.cloneElement(card.icon, { size: 35, className: "text-[#2e3192]" })}</div>
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

export default Ldi;
