import React, { useState } from "react";
import { motion } from "framer-motion";
import TABG from "../assets/TABG.png";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

// ================= HEADER =================
const KnowledgeBank = () => {
  return (
    <div
      className="min-h-screen px-6 lg:px-20 py-16 flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${TABG})` }}
    >
      <div className="flex flex-col w-full max-w-[80rem] items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl lg:text-5xl font-bold mb-6 text-[#2e3192]"
        >
          Knowledge Bank <br />for DSWD Learning and Development Standards
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-black mb-4 leading-relaxed text-md lg:text-xl"
        >
          This page is one of the key innovations under the Monitoring, Evaluation,
          and Knowledge Management Pillar of the Pillars of Technical Assistance
          Excellence Framework, intended to document selected and high-value TA cases
          provided by the Capability Building Division – Professional Learning and
          Development Section (CBD-PLDS) along Learning and Development (L&D) for
          institutional learning and continuous improvement.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-black mb-4 leading-relaxed text-md lg:text-xl"
        >
          The information will help capture TA cases, approaches, tools used, solutions
          provided, and key lessons learned from both formal and informal TA engagements.
          Collectively, these records will support evidence-based management, continuous
          improvement of TA delivery, and institutional learning within the DSWD Academy.
        </motion.p>
      </div>
    </div>
  );
};

// ================= CARD SECTION =================
const tableTabs = [
  "TRAINING PROPOSAL",
  "LDI-DIP",
  "EVALUATION",
  "ACCREDITATION",
  "CBA PLANNING",
];

const sampleData = [
  {
    name: "Carmina A. Llanto",
    date: "26 Jan 2026",
    body: "The client sought technical guidance on whether the proposed DSWD airport caravans for Overseas Filipino Workers (OFWs) could be classified as an institutional development activity for inclusion in their IDCB Plan, particularly to support the approval of transportation expenses for social workers who will implement the activity. The inquiry aimed to determine the appropriate categorization of the caravans in line with existing DSWD definitions and planning requirements.",
    extra: "PLDS staff clarified that the proposed OFW airport caravans are primarily service delivery and outreach activities intended to provide direct assistance and information to beneficiaries and, as such, do not strictly fall under institutional development activities as defined by the DSWD",
    tags: "IDCB, CB PLAN, ID PLAN, INSTITUTIONAL DEVELOPMENT",
    category: "TRAINING PROPOSAL",
  },
  {
    name: "Carmina A. Llanto",
    date: "26 Jan 2026",
    body: "The office inquired whether the provision of meals and transportation may be programmed under the Work and Financial Plan (WFP) as part of the Training Expense for an upcoming capability building activity.",
    extra: "The client was advised that programming meals and transportation under Training Expense for capability building activities is generally not allowed. Based on DSWD Academy practice",
    tags: "ACTIVITY PROPOSAL, WFP, TRAINING EXPENSE, PARTICIPANTS TRANSPORTATION AND MEALS",
    category: "TRAINING PROPOSAL",
  },
];

// ================= CARDS =================
const KnowledgeBankCardsSection = () => {
  const [activeTab, setActiveTab] = useState(tableTabs[0]);
  const [expanded, setExpanded] = useState({});

  const filteredData = sampleData.filter(
    (item) => item.category === activeTab
  );

  const truncateText = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= 25) return text;
    return words.slice(0, 25).join(" ") + "...";
  };

  const toggleExpand = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="w-full flex flex-col items-center mt-20 px-4 sm:px-6 lg:px-36 mb-20">
      {/* Tabs + Button */}
      <div className="w-full flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-0 overflow-x-auto sm:overflow-visible flex-1">
          {tableTabs.map((tab) => (
            <button
              key={tab}
              className={`flex-shrink-0 sm:flex-1 h-14 font-semibold px-6
                ${
                  activeTab === tab
                    ? "text-[#2e3192] border-b-2 border-[#2e3192]"
                    : "text-gray-700 hover:text-[#2e3192] hover:border-b-2 hover:border-[#2e3192]"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* BIG BUTTON */}
        <div className="w-full sm:w-[22rem] flex-shrink-0">
          <a
            href="https://drive.google.com/drive/folders/1tkq8sxM354BrvQShJORFQo2wAcxKMQqe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-[56px] inline-flex items-center justify-center gap-3
                      rounded-3xl bg-[#2e3192] text-white text-lg font-semibold italic
                      transform transition duration-300 hover:scale-105 hover:bg-[#1f2470]"
          >
            Knowledge Bank Storage
            <FaArrowUpRightFromSquare className="text-lg" />
          </a>
        </div>
      </div>

      {/* CARDS FLEX 2x2 */}
      <div className="w-full flex flex-wrap -mx-3">
        {filteredData.length > 0 ? (
          filteredData.map((item, idx) => {
            const isExpanded = expanded[idx];
            const extraText = isExpanded
              ? item.extra
              : truncateText(item.extra);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="sm:w-1/2 w-full px-3 mb-6"
              >
                <div className="p-6 rounded-2xl shadow bg-white text-[#2e3192] flex flex-col">
                  <div className="flex justify-between mb-3 text-sm font-medium">
                    <span className="text-[#ee1c25] font-bold">
                      <span className="text-gray-500">By</span> {item.name}
                    </span>
                    <span className="text-gray-500 font-bold">{item.date}</span>
                  </div>

                  <div className="mb-3 font-bold text-lg leading-relaxed text-gray-800">
                    {item.body}
                  </div>

                  {extraText && (
                    <div className="mb-4 text-sm text-gray-500 leading-relaxed">
                      {extraText}
                      {item.extra?.split(" ").length > 25 && (
                        <span
                          className="ml-1 text-[#2e3192] font-bold cursor-pointer"
                          onClick={() => toggleExpand(idx)}
                        >
                          {isExpanded ? " See less" : " See more"}
                        </span>
                      )}
                    </div>
                  )}

                  {item.tags && (
                    <div className="flex flex-wrap gap-2 text-sm font-semibold mt-2">
                      {item.tags.split(",").map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-200 rounded-full text-gray-600"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="w-full text-center py-16 text-gray-500 font-semibold">
            No results found.
          </div>
        )}
      </div>
    </section>
  );
};

// ================= PAGE =================
const KnowledgeBankPage = () => {
  return (
    <>
      <KnowledgeBank />
      <KnowledgeBankCardsSection />
    </>
  );
};

export default KnowledgeBankPage;
