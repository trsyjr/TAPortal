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
  FaArrowUpRightFromSquare,
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
    label: "Knowledge Product",
    items: [
      {
        q: "What are Knowledge Products (KPs)?",
        a: (
          <>
            Knowledge Products are documents and publications derived from expertise, research, and lessons learned that respond to different demands of users and may cover a wide range of purposes. It contain knowledge that is ready to be used and benefited from.
            <br />
            <br />
            This definition is expanded to include other audio and/or visual materials in the Knowledge Product Development Process Guide. Below are examples of KPs for internal and public use: 
            <br />
            <br />
            <strong>Advocacy Materials</strong> -- Educates, persuades, and mobilizes the Department’s partners and stakeholders to support the Department’s policies, programs, projects, and activities that promote the welfare and development of our clients.
            <br />
            <br />
            <strong>Learning Materials</strong> -- Supports existing materials for LDI’s; used for the conduct of the latter with accompanying Facilitator’s Notes (e.g. modules, case studies, graphic stories, etc.).
            <br />
            <br />
            <strong>Good Practice and Success Story Documentations</strong> -- Documents the positive results and impact of particular approaches or methods in real practice.
            <br />
            <br />
            <strong>Research and Development Materials</strong> -- Illustrates the impact or potential improvement of the Department’s activities/projects/programs/services (e.g. Theses, M&E results, Lessons Learned papers, concept papers, etc.).
            <br />
            <br />
            <strong>How-to Guides</strong> -- Provides guidance and methodological support on the conduct of activities/programs/projects/services related to the Department and/or its staff (Operations Manuals, User’s Manuals, Training Manuals, Guidelines, Operating Procedures, etc.).
          </>
        ),
      },
      {
        q: "Are Good Practice Documentations (GPDs) considered as KPs?",
        a: (
          <>
            Yes. In fact, all GPDs are KPs while not all KPs are GPDs.  
          </>
        ),
      },
      {
        q: "Are IEC materials KPs?",
        a: (
          <>
            Yes and No. It all depends on the adherence of a material to the definition of a KP. KPs are determined this way and not by label. For instance manuals may be labeled as such, but not considered as a KP by the Department’s standards when it does not contain knowledge that is ready to be used and benefited from. KPs focus on answering how things could or should be done and not what any particular topic is or is not.  
          </>
        ),
      },
      {
        q: "How to download KPs from the KM Portal?",
        a: (
          <>
            Browse through the KPs available, then click the specific KP that you wish to access.Click the ‘Login to Download’ button and a prompt will appear so you can either login or register for an account. Provide the complete and accurate information needed in the form. Once logged in, you can directly click the ‘Download’ button for the KP.
            <br />
            <br />
            <a 
                href="https://kmportal.dswd.gov.ph/"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-[#ee1c25] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-md italic"
            >
                Access KM Portal 
                <FaArrowUpRightFromSquare className="text-md" />
            </a>
          </>
        ),
      },
      {
        q: "Who can download KPs from the KM Portal?",
        a: (
          <>
            The users of the KM Portal can browse the available KPs even without a registered account. However, downloading of KPs is only available to users with registered accounts in the KM Portal.   
          </>
        ),
      },
      {
        q: "Is there a fee for downloading KPs? How many KPs can be downloaded by each user?",
        a: (
          <>
            None, it’s free. As long as you have an account in the KM Portal, you may download your desired KP available in the KM Portal as many as they want. However, it should be noted that proper citation must always be observed when using the reference materials accessed through the KM Portal.
          </>
        ),
      },
      {
        q: "Are there social work books accessible in the KM Portal?",
        a: (
          <>
            No. Social work books are physically present at the KEC where DSWD employees can borrow extra copies and external users can read . Only corporate knowledge materials of the Department are digitized and made available in the KM Portal.   
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
                  href="https://drive.google.com/file/d/1zj9vHGv15GPKtrPH6g2ar9WSyx3mo9oI/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  Department of Social Welfare and Development. (2011, August 31). Administrative Order No. 17, s. 2011: Knowledge Management (KM) Framework of the Department of Social Welfare and Development (DSWD). 
                </a>
              </li>
              <li>
                <a 
                  href=""
                  target=""
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  Department of Social Welfare and Development, Office of the Undersecretary for Protective Operations and Programs Group. (2018, October 5). Memorandum from the Office of the Undersecretary for Protective Operations and Programs Group.
                </a>
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
];

const KnowledgeProduct = () => {
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
          <span className="text-[#2e3192]">Knowledge Product</span>
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

export default KnowledgeProduct;