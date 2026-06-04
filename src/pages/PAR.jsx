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

// Clean FAQ object
const faqPages = [
  {
    label: "PAR",
    items: [
      {
        q: "What activities are covered?",
        a: (
          <>
          <strong>Any T/AAORSS activities</strong> (orientations, briefings, workshops), regional capacity-building, 
          or large-group events requiring official technical representation.
          </>
        ),
      },
      {
        q: "Can we request a Resource Person for a localized activity that is jointly organized with a Local Government Unit (LGU) or external partner?",
        a: (
          <>
          Yes. Provided that the activity includes official invitations, caters to a large group 
          of participants, and directly aligns with our mandate and T/AAORSS frameworks.
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
          1. Endorsement Memo from the Field Office Director
          <br />
          2. Approved Activity Design
          <br />
          3. Program Matrix/Schedule
          </>
        ),
      },
      {
        q: "Who pays for travel, meals, and hotel?",
        a: (
          <>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Local FO event:</strong> Funded by the Field Office.</li>
              <li><strong>National rollout:</strong> Charged to downloaded Central Office (CO) funds.</li>
            </ul>
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
          Notify the assigned Resource Person and the clearing office immediately (at least 3 working days before). 
          Rescheduling is subject to the speaker's availability.
          </>
        ),
      },
      {
        q: "Who provides the presentation handouts for the participants?",
        a: (
          <>
          The Resource Person will provide the master copy of the presentation. The Field Office is responsible for 
          printing or digitally distributing the handouts to the participants.
          </>
        ),
      },
      {
        q: "Can we post the Resource Person’s recorded session online?",
        a: (
          <>
          Only with prior permission. The presentation content remains the intellectual property of the agency/speaker. 
          Please clear any public streaming or recording with the speaker beforehand.
          </>
        ),
      },
    ],
  },
  {
    label: "Referral Concern",
    items: [
      {
        q: "What types of concerns will be given to the Field Offices for referral?",
        a: (
          <>
          Concerns that require action, clarification, assistance, or resolution beyond the scope of assistance provided by 
          T/AAORSS may be referred to the assigned staff, other OBSUs or designated focal person for proper channeling.
          </>
        ),
      },
    ]
  }
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
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="text-black">FAQS / </span>
          <span className="text-black">TAAORSS / </span>
          <span className="text-[#2e3192]">Performance and Recognition</span>
        </h3>
        <h3 className="text-sm md:text-md font-bold mb-20 text-gray-500">
          As of 21 May 2026
        </h3>

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

      {/* Shared presentation interface layout for the unified card stack deck */}
      <FloatingCardDeck cards={customDeckCards} rotateInterval={4000} footerId="footer" />

      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}/>
    </div>
  );
};

export default PAR;