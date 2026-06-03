// src/components/OtherOptions.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import TicketModal from "./TicketModal";
import JoinModal from "./JoinModal";
import SatisfactoryModal from "./SatisfactoryModal"; 
import { FaTicketAlt, FaLaptopMedical } from "react-icons/fa";

const OtherOptions = ({ spreadsheetId }) => { 
  const [modalOpen, setModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [satisfactoryModalOpen, setSatisfactoryModalOpen] = useState(false); 
  
  // Dynamic state to capture which spreadsheet ID the feedback should go to
  const [activeSpreadsheetId, setActiveSpreadsheetId] = useState(spreadsheetId);

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  // ✅ Route the Satisfactory rating to the specific Google Sheet based on inquiry type
  const handleCloseTicketModal = (selectedCategory) => {
    setModalOpen(false);

    // Hardcoded Sheet ID mapping matching your Google Apps Script configuration
    const SHEET_MAP = {
      "Capability Building": "14m2v8zTSDXrgOduADBJi9n1JudkswsOPI93A3UhPsn8",
      "TAAORSS": "1aPY6QDdyRlI9D_Zd7wI27yzBBvVZ_wEJEcXJQX-MHSs",
      "Technical Assistance": "1aPY6QDdyRlI9D_Zd7wI27yzBBvVZ_wEJEcXJQX-MHSs", 
      "Assessment/Accreditation": "1FyPV2W83SQ30HdAMYsQ2Fqv9HJvuOM_v4tcWk3BaHqU", 
      "Knowledge Management": "1KkYaquUwif5M0ybxpXg5MDX62Nrres61w-1xPE-fMUg"
    };

    // If a valid category is found, use its specific sheet ID; otherwise, fallback to prop spreadsheetId
    if (selectedCategory && SHEET_MAP[selectedCategory]) {
      setActiveSpreadsheetId(SHEET_MAP[selectedCategory]);
    } else {
      setActiveSpreadsheetId(spreadsheetId);
    }

    setSatisfactoryModalOpen(true);
  };

  // ✅ Fallback for Virtual Support Join modal closure
  const handleCloseJoinModal = () => {
    setJoinModalOpen(false);
    // Uses default fallback ID for virtual clinic support ratings (e.g. Capability Building sheet)
    setActiveSpreadsheetId("14m2v8zTSDXrgOduADBJi9n1JudkswsOPI93A3UhPsn8");
    setSatisfactoryModalOpen(true);
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="pt-4 pb-12 md:pb-20 lg:pb-24 px-4 sm:px-8 md:px-16 lg:px-24 text-center font-sans bg-white relative z-20 w-full"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-base sm:text-lg md:text-xl font-semibold mb-10 md:mb-16 text-gray-800 max-w-3xl mx-auto px-2"
      >
        Couldn’t see what you need? See other options to discuss your inquiry.
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-stretch justify-center max-w-7xl mx-auto gap-8 lg:gap-8">
        
        {/* Virtual Support Card */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ y: -6, scale: 1.01 }}
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 flex-1 flex flex-col items-center justify-between shadow-[0_15px_50px_-10px_rgba(0,0,0,0.08)] border border-gray-100 w-full"
        >
          <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center text-[#2e3192] mb-6 shadow-inner">
              <FaLaptopMedical className="text-3xl md:text-4xl" />
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2e3192] mb-3 uppercase tracking-tight">
              Virtual Support
            </h3>

            <p className="text-gray-600 text-center mb-8 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
              Virtual Clinic for Technical Assistance.
            </p>
          </div>

          <button
            onClick={() => setJoinModalOpen(true)}
            className="bg-[#2e3192] px-8 py-3 md:px-10 md:py-3.5 rounded-full transition-all duration-300 hover:bg-[#ee1c25] text-white font-semibold text-base md:text-lg active:scale-95 shadow-md mt-auto w-full sm:w-auto min-w-[180px]"
          >
            Join Here
          </button>
        </motion.div>

        {/* Divider Setup */}
        <div className="flex flex-row lg:flex-col items-center justify-center my-4 lg:my-0 lg:px-4 shrink-0">
          <div className="h-[1px] flex-1 lg:flex-none w-full lg:w-[2px] lg:h-24 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <span className="mx-4 lg:mx-0 lg:my-4 font-bold text-lg lg:text-2xl text-gray-400 italic select-none tracking-wider">
            OR
          </span>
          <div className="h-[1px] flex-1 lg:flex-none w-full lg:w-[2px] lg:h-24 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
        </div>

        {/* Ticket Request Card */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ y: -6, scale: 1.01 }}
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 flex-1 flex flex-col items-center justify-between shadow-[0_15px_50px_-10px_rgba(0,0,0,0.08)] border border-gray-100 w-full"
        >
          <div className="flex flex-col items-center w-full">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center text-[#2e3192] mb-6 shadow-inner">
              <FaTicketAlt className="text-3xl md:text-4xl" />
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2e3192] mb-3 uppercase tracking-tight">
              REQUEST TICKET
            </h3>

            <p className="text-gray-600 text-center mb-8 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
              Please submit a request ticket, and we will reach out to you shortly.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#2e3192] px-8 py-3 md:px-10 md:py-3.5 rounded-full transition-all duration-300 hover:bg-[#ee1c25] text-white font-semibold text-base md:text-lg active:scale-95 shadow-md mt-auto w-full sm:w-auto min-w-[180px]"
          >
            Request Here
          </button>
        </motion.div>
      </div>

      {/* Modals rendering setup */}
      <TicketModal isOpen={modalOpen} onClose={handleCloseTicketModal} />
      <JoinModal isOpen={joinModalOpen} onClose={handleCloseJoinModal} />
      
      {/* SatisfactoryModal receives the correctly routed spreadsheet ID */}
      <SatisfactoryModal 
        isOpen={satisfactoryModalOpen} 
        onClose={() => setSatisfactoryModalOpen(false)} 
        spreadsheetId={activeSpreadsheetId}
      />
    </motion.section>
  );
};

export default OtherOptions;