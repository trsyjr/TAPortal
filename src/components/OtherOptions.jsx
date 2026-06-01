import React, { useState } from "react";
import { motion } from "framer-motion";
import TicketModal from "./TicketModal";
import JoinModal from "./JoinModal";
import { FaTicketAlt, FaLaptopMedical } from "react-icons/fa";

const OtherOptions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="-mt-[13rem] md:mt-0 pt-0 md:pt-16 pb-24 px-6 md:px-20 lg:px-40 text-center font-sans bg-white relative z-20"
    >
      <motion.h2
        variants={fadeInUp}
        className="-mt-[3.3rem] text-sm md:text-lg font-semibold mb-8 md:mb-12 text-gray-800"
      >
        Couldn’t see what you need? See other options to discuss your inquiry.
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto gap-6 md:gap-12">
        
        {/* Virtual Support Card */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ y: -10, scale: 1.02 }}
          /* p-8 for mobile, p-16 for desktop */
          className="bg-white rounded-3xl p-8 md:p-16 flex-1 flex flex-col items-center shadow-[0_15px_50px_-10px_rgba(0,0,0,0.1)] border border-gray-100 w-full"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-50 flex items-center justify-center text-[#2e3192] mb-6 md:mb-8 shadow-inner">
            <FaLaptopMedical className="text-3xl md:text-5xl" />
          </div>

          <h3 className="text-xl md:text-3xl font-bold text-[#2e3192] mb-3 md:mb-4 uppercase tracking-tight">
            Virtual Support
          </h3>

          <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-xl leading-relaxed">
            Virtual Clinic for Technical Assistance.
          </p>

          <button
            onClick={() => setJoinModalOpen(true)}
            className="bg-[#2e3192] px-8 py-3 md:px-12 md:py-4 rounded-full transition-all duration-300 hover:bg-[#ee1c25] text-white hover:border-[#2e3192] font-semibold text-base md:text-xl active:scale-95 shadow-md"
          >
            Join Here
          </button>
        </motion.div>

        {/* OR Divider */}
        <div className="flex flex-row md:flex-col items-center justify-center py-4 md:py-0">
          <div className="h-[1px] w-10 md:w-[2px] md:h-28 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <span className="mx-4 md:my-5 font-bold text-xl md:text-4xl text-gray-700 italic select-none">
            OR
          </span>
          <div className="h-[1px] w-10 md:w-[2px] md:h-28 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
        </div>

        {/* Ticket Request Card */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ y: -10, scale: 1.02 }}
          /* p-8 for mobile, p-16 for desktop */
          className="bg-white rounded-3xl p-8 md:p-16 flex-1 flex flex-col items-center shadow-[0_15px_50px_-10px_rgba(0,0,0,0.1)] border border-gray-100 w-full"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-50 flex items-center justify-center text-[#2e3192] mb-6 md:mb-8 shadow-inner">
            <FaTicketAlt className="text-3xl md:text-5xl" />
          </div>

          <h3 className="text-xl md:text-3xl font-bold text-[#2e3192] mb-3 md:mb-4 uppercase tracking-tight">
            REQUEST TICKET
          </h3>

          <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-xl leading-relaxed">
            Please submit a request ticket, and we will reach out to you shortly.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#2e3192] px-8 py-3 md:px-12 md:py-4 rounded-full transition-all duration-300 hover:bg-[#ee1c25] text-white hover:border-[#2e3192] font-semibold text-base md:text-xl active:scale-95 shadow-md"
          >
            Request Here
          </button>
        </motion.div>
      </div>

      <TicketModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <JoinModal isOpen={joinModalOpen} onClose={() => setJoinModalOpen(false)} />
    </motion.section>
  );
};

export default OtherOptions;