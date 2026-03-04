// src/components/HomePage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
  { title: "L&D STANDARDS", icon: <FaFileCircleCheck />, path: "/ld-standards" },
  { title: "ACTIVITY PROPOSAL", icon: <FaFileLines />, path: "/active-profile" },
  { title: "LDI-DIP", icon: <FaNetworkWired />, path: "/ldi-dip" },
  { title: "PARTICIPANT ELIGIBILITY", icon: <FaUserCheck />, path: "/participant-eligibility" },
  { title: "Capability Building Plan", icon: <FaComments />, path: "/cbas" },
  { title: "TA and SUPPORT", icon: <FaHandshake />, path: "/ta-support" },
];

// Motion Settings
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <div className="pt-20 font-sans relative overflow-x-hidden">
      {/* Background for MOBILE only */}
      <div
        className="absolute top-0 left-0 right-0 z-0 md:hidden"
        style={{
          height: "840px",
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "3rem",
          borderBottomRightRadius: "3rem",
        }}
      />

      {/* Background for DESKTOP only */}
      <div
        className="absolute top-0 left-0 right-0 z-0 hidden md:block"
        style={{
          height: "740px",
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "5rem",
          borderBottomRightRadius: "5rem",
        }}
      />

      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative z-10 text-center px-6 md:px-20 lg:px-40 py-12"
      >
        <motion.h1 variants={fadeInUp} className="text-sm md:text-base mb-3 text-gray-800 font-bold tracking-[0.15em] uppercase">
          DSWD ACADEMY CBD-PLDS
        </motion.h1>

        <motion.h2 variants={fadeInUp} className="max-w-7xl mx-auto text-center text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-[#ee1c25] tracking-tight leading-tight">
          Technical Assistance Portal
        </motion.h2>

        <motion.div variants={fadeInUp} className="mx-auto max-w-4xl p-4 rounded-lg">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed font-semibold mb-3 opacity-90">
            This portal is designed to support Offices, Bureaus, Services, and Units (OBSUs), Field Offices (FOs), and partner-stakeholders 
            by providing clear guidance on available technical assistance services, standard processes, resources, and frequently asked 
            questions along capability building.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Link to="/about">
            <button className="mt-6 px-12 py-4 border-2 border-gray-800 text-gray-800 rounded-xl text-lg font-bold hover:bg-[#FFE066] hover:text-[#2e3192] hover:border-[#2e3192] transition-all duration-300 active:scale-95 shadow-lg shadow-black/5">
              Learn More
            </button>
          </Link>
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <section className="relative z-10 mb-20 px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#2e3192] rounded-[3rem] w-full max-w-[95rem] mx-auto p-8 md:p-12 shadow-2xl shadow-indigo-900/40"
        >
          <h2 className="text-[#FFE066] text-2xl md:text-4xl font-bold mb-10 text-center tracking-tight">
            Frequently Asked Questions
          </h2>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex gap-4 overflow-x-auto pb-6 md:grid md:grid-cols-2 lg:grid-cols-6 md:gap-6 md:overflow-visible no-scrollbar"
          >
            {faqCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.03, 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                onClick={() => handleCardClick(card.path)}
                className="min-w-[170px] sm:min-w-[200px] md:min-w-0 bg-white rounded-[2.5rem] p-6 md:p-10 flex flex-col items-center justify-center cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300 border border-transparent hover:border-indigo-50"
              >
                <div className="text-[#2e3192] mb-4 pointer-events-none transition-transform group-hover:scale-110">
                  {React.cloneElement(card.icon, { size: 45, className: "md:hidden" })}
                  {React.cloneElement(card.icon, { size: 75, className: "hidden md:block" })}
                </div>

                <h3 className="font-bold text-gray-800 text-xs md:text-base text-center leading-tight uppercase tracking-wide">
                  {card.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;