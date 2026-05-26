// src/pages/KnowledgeBank.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";

const KnowledgeBank = () => {
  const knowledgeBankData = [
    {
      author: "Carmina A. Llanto",
      date: "26 Jan 2026",
      title: "The client sought technical guidance on whether the proposed DSWD airport caravans for Overseas Filipino Workers (OFWs) could be classified as an institutional development activity for inclusion in their IDCB Plan...",
      description: "PLDS staff clarified that the proposed OFW airport caravans are primarily service delivery and outreach activities intended to provide direct assistance and information to the beneficiaries...",
      tags: ["IDCB", "CB PLAN", "ID PLAN"],
    },
    {
      author: "Carmina A. Llanto",
      date: "28 Jan 2026",
      title: "The office inquired whether the provision of meals and transportation may be programmed under the Work and Financial Plan (WFP) as part of the Training Expense for an upcoming capability building activity.",
      description: "The client was advised that programming meals and transportation under Training Expense for capability building activities is generally not allowed. Based on DSWD Academy practice...",
      tags: ["ACTIVITY PROPOSAL", "ID PLAN"],
    },
  ];

  return (
    /* Changed min-h-screen to h-auto and reduced py-20 to pt-20 pb-10 */
    <div className="h-auto bg-[#2e3192] font-['Montserrat'] pt-20 pb-28 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-center gap-3 mb-12 text-white">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center">
            Capability Building Knowledge Bank
          </h2>
          <FiInfo className="text-2xl opacity-90 cursor-help" />
        </div>

        {/* Knowledge Cards Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {knowledgeBankData.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between border border-white/10"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm font-bold text-gray-500">
                    By <span className="text-[#ee1c25] uppercase">{item.author}</span>
                  </p>
                  <p className="text-xs text-gray-400 italic font-medium">
                    {item.date}
                  </p>
                </div>

                <h3 className="text-[#2e3192] font-black text-[17px] md:text-[19px] mb-6 leading-[1.4] text-justify">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 text-justify">
                  {item.description} 
                  <span className="text-[#2e3192] font-extrabold cursor-pointer hover:underline ml-1">
                    See more.
                  </span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {item.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="bg-[#e2e2e2] text-[#555] px-5 py-2 rounded-full text-[11px] font-black tracking-widest uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBank;