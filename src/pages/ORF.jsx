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
import JoinModal from "../components/JoinModal";

// Top FAQ cards
const faqCards = [
  { title: "TARA Program", icon: <FaFileCircleCheck />, path: "/tara-program" },
  { title: "TARGETING ASSESSMENT MONITORING PLANNING", icon: <FaFileCircleCheck />, path: "/tamp" },
  { title: "PERFORMANCE AND RECOGNITION", icon: <FaFileLines />, path: "/par" },
  { title: "OTHER REQUEST AND REFFERAL", icon: <FaNetworkWired />, path: "/orf" },
];

// Clean FAQ object
const faqPages = [
  {
    label: "ORF",
    items: [
      {
        q: "What activities are covered?",
        a: (
          <>
          <strong>Any T/AAORSS activities</strong> (orientations, briefings, workshops), regional capacity-building, or large-group 
          events requiring official technical representation.
          </>
        ),
      },
      {
        q: "Can we request a Resource Person for a localized activity that is jointly organized with a Local Government Unit (LGU) or external partner?",
        a: (
          <>
          Yes. Provided that the activity includes official invitations, caters to a large group of participants, and directly aligns with 
          our mandate and T/AAORSS frameworks.
          </>
        ),
      },
      {
        q: "What is the deadline to submit a request?",
        a: (
          <>
          At least <strong>15 working days (3 weeks)</strong> before the event.
          </>
        ),
      },
      {
        q: "What documents do we need to attach?",
        a: (
          <>
          <ul>
            <li>
                1. Endorsement Memo from the Field Office Director
            </li>
            <li>
                2. Approved Activity Design
            </li>
            <li>
                3. Program Matrix/Schedule
            </li>
          </ul>
          </>
        ),
      },
      {
        q: "Who pays for travel, meals, and hotel?",
        a: (
          <>
          Local FO event: Funded by the Field Office.
          <br />
          <br />
          National rollout: Charged to downloaded Central Office (CO) funds.
          </>
        ),
      },
      {
        q: "Is the Field Office responsible for local transport?",
        a: (
          <>
          Yes. The FO must arrange airport pick-ups, drop-offs, and transit to the venue.
          </>
        ),
      },
      {
        q: "Can we hold the session virtually?",
        a: (
          <>
          Yes. Virtual speakers are highly encouraged to save on travel costs. The FO must ensure stable venue internet.
          </>
        ),
      },
      {
        q: "What do we need to do after the event?",
        a: (
          <>
          Within 5 working days, send the Resource Person the completed feedback forms, final attendance sheet, and documentation photos.
          </>
        ),
      },
      {
        q: "What if our event is rescheduled or cancelled?",
        a: (
          <>
          Notify the assigned Resource Person and the clearing office immediately (at least 3 working days before). Rescheduling is subject to the speaker's availability.
          </>
        ),
      },
      {
        q: "Who provides the presentation handouts for the participants?",
        a: (
          <>
          The Resource Person will provide the master copy of the presentation. The Field Office is responsible for printing or digitally distributing the handouts 
          to the participants.
          </>
        ),
      },
      {
        q: "Can we post the Resource Person’s recorded session online?",
        a: (
          <>
          Only with prior permission. The presentation content remains the intellectual property of the agency/speaker. Please clear any public streaming or 
          recording with the speaker beforehand.
          </>
        ),
      },
    ],
  },
];

const ORF = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRefs = useRef([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(32);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  // Floating cards
  const floatingCards = [
    {
      title: "TA WEDNESDAY",
      icon: <FaLaptopMedical />,
      description: "Virtual Clinic for Technical Assistance opens every Wednesday.",
      buttonText: "Join Here",
      buttonAction: () => setIsJoinModalOpen(true),
    },
    {
      title: "REQUEST TICKET",
      icon: <FaTicket />,
      description: "Submit a request ticket and we will reach out shortly.",
      buttonText: "Request Here",
      buttonAction: () => setIsTicketModalOpen(true), // ✅ now works
    },
  ];

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
          <span className="text-[#2e3192]">"Other Request and Refferal"</span>
        </h3>
        {/* <h3 className="text-sm md:text-md font-bold mb-8 text-gray-500">
          As of 14 January, 2026
        </h3> */}
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
              <div className="flex flex-col items-center text-center w-full">
                <div className="mb-2">{React.cloneElement(card.icon, { size: 35, className: "text-[#2e3192]" })}</div>
                <h3 className="text-sm md:text-md font-bold text-[#2e3192] mb-2">{card.title}</h3>
                <p className="text-gray-600 text-3xs md:text-xs mb-2">{card.description}</p>
                <button className="bg-[#ee1c25] text-white w-full mx-auto px-4 py-2 rounded-full font-semibold hover:scale-105 transition text-sm md:text-base block text-center">
                  {card.buttonText}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}/>
    </div>
  );
};

export default ORF;