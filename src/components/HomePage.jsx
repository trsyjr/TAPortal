// src/components/HomePage.jsx
import React from "react";
import { FiFileText, FiUsers, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";

const faqCards = [
  { title: "ACTIVITY PROFILE", icon: <FiFileText size={50} /> },
  { title: "LDI-DIP", icon: <FiFileText size={50} /> },
  { title: "PARTICIPANT ELIGIBILITY", icon: <FiUsers size={50} /> },
  { title: "TA and SUPPORT", icon: <FiFileText size={50} /> },
  { title: "L&D STANDARDS", icon: <FiFileText size={50} /> },
  { title: "CBAs", icon: <FiMessageSquare size={50} /> },
];

const HomePage = () => {
  return (
    <div className="pt-20 font-sans">
      
      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 lg:px-40 py-12">
        <h1 className="text-md md:text-lg mb-2 text-gray-800 font-semibold">
          CBD-PLDS
        </h1>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#ee1c25]">
          Technical Assistance Portal
        </h2>

        <div className="mx-auto max-w-5xl p-4 rounded-lg">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed font-semibold">
            Coordination with the DSWD Academy is required at the planning stage, 
            prior to implementation, when significant changes to the activity are proposed, 
            and whenever further technical assistance is needed, such as requests for activity 
            management, resource persons, facilitation, or accreditation for CPD.
          </p>
        </div>

        <button className="mt-6 px-10 py-4 border border-gray-700 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
            Learn More
        </button>

      </section>

      {/* FAQ Section */}
      <section className="flex justify-center">
        <div className="bg-[#2e3192] rounded-3xl p-10 w-full max-w-[100rem]">
          <h2 className="text-[#FFE066] text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {faqCards.map((card) => (
               <motion.div
                    key={card.title}
                    className="bg-white rounded-lg p-8 flex flex-col items-center justify-center hover:shadow-xl cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="text-[#2e3192] mb-4">
                        {React.cloneElement(card.icon, { size: 70 })}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-lg md:text-xl text-center">
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
