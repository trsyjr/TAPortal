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
import TicketModal from "../components/TicketModal"; 
import JoinModal from "../components/JoinModal";

// Top FAQ cards
const faqCards = [
  { title: "CPD APPLICATION AND COMPLETION PROCESS", icon: <FaFileCircleCheck />, path: "/cpd" },
  { title: "CERTIFICATION PROGRAM", icon: <FaFileCircleCheck />, path: "/certification" },
  { title: "ACCREDITATION PROGRAM", icon: <FaFileLines />, path: "/accreditation" },
  { title: "PROJECT ASCEND & ETEEAP", icon: <FaNetworkWired />, path: "/ascend-eteeap" },
];

// Clean FAQ object
const faqPages = [
  {
    label: "CPD",
    items: [
      {
        q: "Who can avail of the DSWD Academy’s CPD endorsement service?",
        a: (
          <>
            This non-frontline service covers the review, processing, and official submission of CPD requirements to the Professional Regulation Commission (PRC). 
            <br />
            <br />
            It is designed specifically to cater to DSWD internal stakeholders, which include all program proponents from various Offices, Bureaus, Services, and Units (OBSUs) at the Central Office, as well as the Capability Building Sections (CBS) of the Field Offices (FOs).
          </>
        ),
      },
      {
        q: "Where can I apply for CPD program accreditation?",
        a: (
          <>
            To apply for CPD program accreditation, submit the requirements via CPD Portal.
          </>
        ),
      },
      {
        q: "What are the mandatory timelines for submitting a CPD Application and its corresponding Completion Report?",
        a: (
          <>
            <strong>CPD Application for Program Accreditation</strong> -- Must be submitted at least <strong>45 working days</strong> (approximately 2 months) prior to the scheduled date of the program offering
            <br />
            <br />
            <strong>CPD Completion Report (Attendance Sheets)</strong> -- Must be uploaded within <strong>7 calendar days</strong> immediately after the conduct of the activity.
            <br />
            <br />
            <strong>CPD Completion Report (Other Supporting Attachments)</strong> -- Must be submitted within <strong>20 calendar days</strong> after the conduct of the activity.
          </>
        ),
      },
      {
        q: "What options do we have if our office cannot comply with the 45-working-day submission deadline?",
        a: (
          <>
            If your office is unable to meet the mandatory 45-working-day timeline, applications will not be processed under the standard program track. You may opt for either of the following solutions:
            <br />
            <br />
            <strong>Option A:</strong> Adjust or move the implementation dates of your training activity to a later schedule that satisfies the 45-working-day period.
            <br />
            <br />
            <strong>Option B:</strong> Have your participants individually apply for credit units under the <strong>Self-Directed Learning (SDL)</strong> process.
          </>
        ),
      },
      {
        q: "Can we make adjustments to the date or venue of our training once it has been accredited by the PRC?",
        a: (
          <>
            Yes, but the PRC allows a change of dates or venue <strong>only ONCE</strong> per accredited program.
            <br />
            <br />
            For schedule adjustments, you are only permitted to move the activity to a later date; moving it to an earlier date is strictly prohibited (e.g., changing from Feb 10–15 to Mar 20–25 is allowed, but changing to Jan 20–25 is not).
            <br />
            <br />
            Official requests regarding a change of date, venue, or activity cancellation must be finalized and submitted at least <strong>7 working days</strong> prior to the activity's conduct.
          </>
        ),
      },
      {
        q: "Are we allowed to change, add, or remove Resource Persons (RPs) after an application is accredited?",
        a: (
          <>
            No, the PRC strictly prohibits any modifications, additions, or deletions to the roster of Resource Persons once the program has been formally accredited.
            <br />
            <br />
            To safeguard your activity against sudden speaker unavailability or emergencies, proponent offices are strongly advised to include alternate or substitute RPs during the initial application stage.
          </>
        ),
      },
      {
        q: "What should we do if our prospective Resource Person (RP) is unlicensed or has an expired PRC license?",
        a: (
          <>
            <strong>Unlicensed Experts</strong> -- Professionals without a PRC license can still serve as RPs, provided they accomplish and submit the standard PRC Resume for Resource Person along with a valid company or institutional ID.
            <br />
            <br />
            <strong>Expired PRC License</strong> -- Licensed professionals whose PRC IDs are currently expired must submit a copy of their renewal application together with official proof of payment.
          </>
        ),
      },
      {
        q: "If the specific hotel or venue for our face-to-face/blended activity is not yet finalized, what should we write in our application?",
        a: (
          <>
            You do not need to hold off on your submission if the exact venue is still pending procurement or finalization.
            <br />
            <br />
            Proponents may indicate the general target geographic location or area where the training is intended to take place (e.g., "within Metro Manila" or "within Region VII").
          </>
        ),
      },
      {
        q: "Do we need to submit physical or hard copies of the application forms and completion reports?",
        a: (
          <>
            No, <strong>there is no need to submit hard copies</strong> of any document to the DSWD Academy.
            <br />
            <br />
            Proponents must upload files in editable formats or via a Google Shared Folder, ensuring files are properly renamed based on the order of the official CPD checklist for easier verification.
          </>
        ),
      },
      {
        q: "What are the administrative consequences if an office fails to comply with the prescribed CPD processes and timelines?",
        a: (
          <>
            <p className="mb-4">
              Non-compliance with the mandatory rules will result in strict administrative consequences, including:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                Immediate <strong>non-acceptance</strong> of the submitted CPD application.
              </li>
              <li>
                <strong>Non-submission</strong> of your completion report to the PRC, resulting in the deferment or outright cancellation of the participants' CPD units.
              </li>
              <li>
                Outright <strong>disapproval</strong> of late requests to change an RP, which may cause the program's accreditation to be cancelled by the PRC.
              </li>
              <li>
                Jeopardizing the Department's institutional standing, which could lead to the <strong>non-renewal</strong> of the DSWD Academy as an accredited CPD Service Provider.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "What are the requirements for CPD Application?",
        a: (
          <>
            <strong>a.</strong> One (1) electronic copy of CPD Application Form
            <br />
            <strong>b.</strong> One (1) electronic copy of Instructional Design
            <br />
            <strong>c.</strong> One (1) electronic copy of Evaluation Tool
            <br />
            <strong>d.</strong> One (1) electronic copy of Program of Activities
            <br />
            <strong>e.</strong> One (1) electronic copy of Resume of Speaker/s
            <br />
            <strong>f.</strong> One (1) electronic copy of Current Professional ID of Speaker/s
            <br />
            <strong>g.</strong> One (1) electronic copy of Breakdown of Expenses for the Conduct of Program
            <br />
            <strong>h.</strong> One (1) electronic copy of Certificate of Participation
            <br />
            <strong>i.</strong> One (1) electronic or scanned copy of Letter of Undertaking
            <br />
            Additional Requirements (Online Learning):
            <br />
            <strong>j.</strong> One (1) electronic copy of Declaration of Minimum Technical Requirements
            <br />
            <strong>k.</strong> One (1) electronic copy of Privacy Policy
          </>
        ),
      },
    ],
  },
];

const CPD = () => {
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
          <span className="text-black">Assessment, Certification, and Accreditation / </span>
          <span className="text-[#2e3192]">CPD Application and Completion Process</span>
        </h3>
        {/* <h3 className="text-sm md:text-md font-bold mb-8 text-gray-500">
          As of 14 January, 2026
        </h3> */}
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

export default CPD;