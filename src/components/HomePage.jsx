// src/components/HomePage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaFileCircleCheck,
  FaFileLines,
  FaHandshake,
  FaNetworkWired,
  FaUserCheck,
  FaComments,
} from "react-icons/fa6";
import TABG from "../assets/TABG.png";

const faqCards = [
  { title: "ACTIVITY PROPOSAL", icon: <FaFileLines />, path: "/active-profile" },
  { title: "LDI-DIP", icon: <FaNetworkWired />, path: "/ldi-dip" },
  { title: "PARTICIPANT ELIGIBILITY", icon: <FaUserCheck />, path: "/participant-eligibility" },
  { title: "TA and SUPPORT", icon: <FaHandshake />, path: "/ta-support" },
  { title: "L&D STANDARDS", icon: <FaFileCircleCheck />, path: "/ld-standards" },
  { title: "CB PLAN and ACCOMPLISHMENTS", icon: <FaComments />, path: "/cbas" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <div className="pt-20 font-sans relative">
      {/* Background */}
      <div
        className="absolute top-0 left-0 right-0 z-0"
        style={{
          height: "680px",
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "5rem",
          borderBottomRightRadius: "5rem",
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 md:px-20 lg:px-40 py-12">
        <h1 className="text-md md:text-lg mb-2 text-gray-800 font-semibold">
          CBD-PLDS
        </h1>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#ee1c25]">
          Technical Assistance Portal
        </h2>

        <div className="mx-auto max-w-5xl p-4 rounded-lg">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed font-semibold">
            This portal is designed to support Offices, Bureaus, Services, and Units (OBSUs), Field Offices (FOs), 
            and partner-stakeholders by providing clear guidance on available technical assistance services, standard 
            processes, resources, and frequently asked questions. It aims to promote transparency, consistency, and 
            efficiency in the delivery of technical assistance, while ensuring alignment with Department policies, 
            standards, and learning and development priorities.
          </p>
        </div>

        <Link to="/about">
          <button className="mt-6 px-10 py-4 border border-gray-700 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            Learn More
          </button>
        </Link>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 mb-12">
        <div className="bg-[#2e3192] rounded-3xl w-full max-w-[100rem] mx-auto p-6 md:p-10">
          <h2 className="text-[#FFE066] text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
            Frequently Asked Questions
          </h2>

          {/* MOBILE: horizontal scroll | DESKTOP: grid */}
          <div className="flex gap-3 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-6 md:gap-4 md:overflow-visible">
            {faqCards.map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCardClick(card.path)}
                className="min-w-[160px] sm:min-w-[180px] md:min-w-0 bg-white rounded-3xl p-4 md:p-8 flex flex-col items-center justify-center hover:shadow-xl cursor-pointer"
              >
                {/* Icon */}
                <div className="text-[#2e3192] mb-2 md:mb-4">
                  {React.cloneElement(card.icon, { size: 40, className: "md:hidden" })}
                  {React.cloneElement(card.icon, { size: 70, className: "hidden md:block" })}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-sm md:text-lg text-center">
                  {card.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
