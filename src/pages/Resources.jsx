import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePollVertical,
  faBookOpen,
  faChartPie,
  faCommentDots,
  faGear,
  faEye,
  faDownload,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import TABG from "../assets/TABG.png";

const icons = [
  { icon: faSquarePollVertical, size: "text-[15rem]", color: "text-[#ee1c25]" },
  { icon: faBookOpen, size: "text-[10rem]", color: "text-[#2e3192]" },
  { icon: faChartPie, size: "text-[15rem]", color: "text-[#FFE066]" },
  { icon: faCommentDots, size: "text-[13rem]", color: "text-[#ee1c25]" },
  { icon: faGear, size: "text-[10rem]", color: "text-[#2e3192]" },
];

const positionsDesktop = [
  { x: 0, y: -220 },
  { x: 250, y: -80 },
  { x: 160, y: 180 },
  { x: -160, y: 180 },
  { x: -250, y: -80 },
];

const tableTabs = [
  "CENTRALIZATION",
  "CAPABILITY BUILDING PLAN",
  "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
  "TEMPLATES",
  "OTHERS",
];

const tableData = [
  {
    id: 1,
    category: "CENTRALIZATION",
    type: "Memorandum",
    fileName: "Centralization of all Capability Building Activities (CBAs) of the Central Office (CO) to the SWIDB-DSWD Academy",
    dateIssued: "1 Feb, 2024",
    link: "/pdfs/Memorandum-from-the-Secretary-Centralization-February.pdf",
  },
  {
    id: 2,
    category: "CENTRALIZATION",
    type: "Memorandum",
    fileName: "Operationalization of the Centralization of the Capability Building (CB) in the SWIDB-DSWD Academy",
    dateIssued: "20 Jun, 2024",
    link: "/pdfs/81648-DETAILS-AND-ARRANGEMENTS-FOR-THE-CENTRAL-OFFICE-TO-OPERATIONALIZE-THE-CENTRALIZATION-OF-THE-CAPABILITY-BUILDING-(CB)-IN-THE-SWIDB-DSWD-ACADEMY_0001.pdf",
  },
  {
    id: 3,
    category: "CENTRALIZATION",
    type: "Memorandum",
    fileName: "Details and Arrangements for the Field Office to Operationalize the Centralization of the Capability Building (CB) in the SWIDB-DSWD Academy",
    dateIssued: "20 Jun, 2024",
    link: "/pdfs/81643-DETAILS-AND-ARRANGEMENTS-FOR-THE-FIELD-OFFICE-TO-OPERATIONALIZE-THE-CENTRALIZATION-OF-THE-CAPABILITY-BUILDING-(CB)-IN-THE-SWIDB-DSWD-ACADEMY_0001.pdf",
  },
  {
    id: 4,
    category: "CENTRALIZATION",
    type: "Memorandum",
    fileName: "Endorsement of Lead and Alternate Designated Focal Persons for LDIs and Capability Building Programs for CY 2025-2027",
    dateIssued: "19 Dec, 2024",
    link: "/pdfs/33886-ENDORSEMENT-OF-LEAD-AND-ALTERNATE-DESIGNATED-FOCAL-PERSONS-FOR-LDIs-AND-CAPACITY-BUILDING-PROGRAMS-FOR-CY-2025-2027_0001.pdf",
  },
  {
    id: 5,
    category: "CAPABILITY BUILDING PLAN",
    type: "MC No. 11, s. 2010",
    fileName: "Guidelines in the Preperation and Submission of IDCB Plans and Accomplishment Reports",
    dateIssued: "22 Jun, 2010",
    link: "/pdfs/MC_2010-011-IDCB-GUIDELINES.pdf",
  },
  {
    id: 6,
    category: "CAPABILITY BUILDING PLAN",
    type: "Memorandum",
    fileName: "Call for Submission and Invitation for the Technical Assistance in Accomplishing the 2026 Capability Building Plan",
    dateIssued: "6 Oct 2025",
    link: "/pdfs/221049-CALL-FOR-SUBMISSION-AND-INVITATION-FOR-THE-TECHNICAL-ASSISTANCE-IN-ACCOMPLISHING-THE-2026-CAPABILITY-BUILDING-PLAN.pdf",
  },
  {
    id: 7,
    category: "CAPABILITY BUILDING PLAN",
    type: "Attachments",
    fileName: "Guidance Note for the Accomplishment of the Capability Building Plan Fiscal Year 2026",
    dateIssued: "6 Oct 2025",
    link: "/pdfs/221049-GUIDANCE-NOTES-IN-ACCOMPLISHING-THE-2026-CAPABILITY-BUILDING-PLAN-1.pdf",
  },
  {
    id: 8,
    category: "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
    type: "MC No. 23, s. 2003",
    fileName: "Adoption of the DSWD Organizational Competencies",
    dateIssued: "27 Jun, 2003",
    link: "/pdfs/[SWIDB-Guideline]_DSWD-Organizational-Competencies.pdf",
  },
  {
    id: 9,
    category: "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
    type: "AO No. 20, s. 2004",
    fileName: "Omnibus Policies and Guidelines on the Management of DSWD Capability Building Efforts",
    dateIssued: "3 Jun, 2004",
    link: "/pdfs/[SWIDB-Guideline-]_Management-of-DSWD-Capability-Building-Efforts.pdf",
  },
  {
    id: 10,
    category: "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
    type: "BC No. 2007-1, s. 2007",
    fileName: "Guidelines on the Grant of Honoraria to Lecturers, Resource Persons, Coordinators and Facilitators",
    dateIssued: "23 Apr, 2007",
    link: "/pdfs/[DBM-Guideline]_Grant-of-Honoraria-to-Lecturers-Resource-Persons-Coordinators-and-Facilitators.pdf",
  },
  {
    id: 11,
    category: "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
    type: "MC No. 04, s. 2010",
    fileName: "'Institutional Development' Framework Amending for the purpose Memorandum Circular No. 32, Series of 2004",
    dateIssued: "15 Apr, 2010",
    link: "/pdfs/[SWIDB Guideline]_Institutional Development Framework (Amendment of MC 32 s. 2004).pdf",
  },
  {
    id: 12,
    category: "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
    type: "MC No. 07, s. 2010",
    fileName: "Terms of Reference on the Use of Standard Forms on Training Design, Syllabus and Documentation",
    dateIssued: "13 May, 2010",
    link: "/pdfs/[SWIDB Guideline]_Use of Standard Forms on Training Design, Syllabus and Documentation.pdf",
  },
  {
    id: 13,
    category: "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
    type: "AO No. 16, s. 2010",
    fileName: "Framework and Guidelines for Capability Building of DSWD Social Protection Intermediaries and Stakeholders",
    dateIssued: "16 Dec, 2010",
    link: "/pdfs/AO 16 Series of 2010_Framework and Guidelines for Capability Building of DSWD Social Protection Intermediaries and Stakeholders.pdf",
  },
  {
    id: 14,
    category: "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
    type: "AO No. 10, s. 2019",
    fileName: "Guidelines on the Grant of Honoraria to Lecturers, Resource Persons, Coordinators, Facilitators in Seminars, Training Programs, and other Similar Activities",
    dateIssued: "15 May, 2019",
    link: "/pdfs/[SWIDB Guideline]_Guidelines on the Grant of Honoraria.pdf",
  },
  {
    id: 15,
    category: "MANAGEMENT OF CAPABILITY BUILDING EFFORTS",
    type: "Memorandum",
    fileName: "Guidance on the Provision of Learning Activities for Contract of Service (COS) and Job Order (JO) Workers",
    dateIssued: "7 Feb, 2024",
    link: "/pdfs/Memorandum from the Secretary-Guidance on the Provision of Learning Activities for Contract of Service and Job Order Workers (1).pdf",
  },
  {
    id: 16,
    category: "OTHERS",
    type: "AO No. 17, s. 2011",
    fileName: "Knowledge Management (KM) Framework of the Department of Social Welfare and Development (DSWD)",
    dateIssued: "31 Aug, 2011",
    link: "/pdfs/AO_2011-017 Knowledge Management Framework.pdf",
  },
  {
    id: 17,
    category: "OTHERS",
    type: "AO No. 11, s. 2015",
    fileName: "DSWD Strategic Performance Management System (DSPMS)",
    dateIssued: "30 Jun, 2015",
    link: "/pdfs/AO 11 series of 2015_DSWD Strategic Performance Management System (DSPMS).pdf",
  },
  {
    id: 18,
    category: "OTHERS",
    type: "MC No. 10, s. 2018",
    fileName: "Guidelines on the Provision of Technical Assistance and Resource Augmentation to Local Government Units through Local Social Welfare and Development Offices",
    dateIssued: "10 May, 2018",
    link: "/pdfs/MC_2018-010 Technical Assistance and Resource Augmentation.pdf",
  },
  {
    id: 19,
    category: "OTHERS",
    type: "AO No. 04, s. 2021",
    fileName: "Guidelines in Conducting the Department of Social Welfare and Development's Knowledge Sharing Sessions)",
    dateIssued: "23 Mar, 2021",
    link: "/pdfs/AO_2021-004 Guidelines on the Conduct of Knowledge Sharing Sessions.pdf",
  },
  {
    id: 20,
    category: "OTHERS",
    type: "AO No. 09, s. 2022",
    fileName: "Implementing Guidelines of the DSWD Knowledge Management Framework",
    dateIssued: "18 Mar 2022",
    link: "/pdfs/AO_2022-009 Implementing Guidelines of the Knowledge Management Frameworkpdf",
  },
  {
    id: 21,
    category: "OTHERS",
    type: "Memorandum",
    fileName: "Fiscal Year (FY) 2025 Work and Financial Planning Guidelines",
    dateIssued: "31 May 2024",
    link: "/pdfs/FY 2025 WORK AND FINANCIAL PLANNING GUIDELINES.pdf",
  },
  {
    id: 22,
    category: "OTHERS",
    type: "Guidebook",
    fileName: "DSWD L&D Guidebook",
    dateIssued: "2021",
    link: "https://drive.google.com/drive/folders/1t3P41pSDNz_iOfUNk4OySMWAMPhoMKdW?usp=drive_link",
  },
  {
    id: 23,
    category: "OTHERS",
    type: "FAQs",
    fileName: "L&D Standards FAQs",
    dateIssued: "2021",
    link: "https://docs.google.com/spreadsheets/d/1IO9v5WsCPmifqk5w5URI1koQ73JgS2acH93OZeKl40o/edit?usp=drive_link",
  },
  {
    id: 24,
    category: "OTHERS",
    type: "Annexes",
    fileName: "DSWD L&D Guidebook Annexes",
    dateIssued: "2021",
    link: "https://drive.google.com/u/0/open?id=1N53g9D3p1VXDmPWXey-2zAsjGZ0qQbk-",
  },
  {
    id: 25,
    category: "TEMPLATES",
    type: "Prescribed Template",
    fileName: "LDI-DIP",
    dateIssued: "2021",
    link: "https://docs.google.com/document/d/12IsrxW1x10kDH5mhe5CWHZVoOGIvRxFY/edit?usp=drive_link&ouid=101943665772154647256&rtpof=true&sd=true",
  },
  {
    id: 26,
    category: "TEMPLATES",
    type: "Prescribed Template",
    fileName: "LDI Proposal",
    dateIssued: "2021",
    link: "https://docs.google.com/document/d/1uDx9lifnme2-R7l3v8VpP_HUo3Nhn9lO/edit?usp=drive_link&ouid=101943665772154647256&rtpof=true&sd=true",
  },
  {
    id: 27,
    category: "OTHERS",
    type: "Memorandum",
    fileName: "Guidelines on the Establishment and Operationalization of the DSWD Academy",
    dateIssued: "12 Feb, 2026",
    link: "/pdfs/Memorandum Circular_05_2026_Guidelines on the Establishment and Operationalization of the DSWD Academy.pdf",
  },
];

const KnowledgeBank = () => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className={`min-h-[85vh] px-6 lg:px-24 flex items-center justify-center bg-cover bg-center ${isMobile ? "pt-32 pb-16" : "pt-40 pb-20"}`} style={{ backgroundImage: `url(${TABG})` }}>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[110rem] gap-20">
        <motion.div 
          className="flex-1 text-center lg:text-left z-10"
          initial="hidden"
          animate="visible"
          variants={textContainerVariants}
        >
          <motion.h1 variants={textItemVariants} className="text-3xl lg:text-6xl font-extrabold mb-8 text-[#2e3192] leading-tight">
            Resources for DSWD Learning and Development Standards
          </motion.h1>
          <motion.p variants={textItemVariants} className="text-black mb-4 leading-relaxed text-lg lg:text-2xl opacity-90">
            This page provides access to curated resources that support the planning, implementation, and monitoring of capability building initiatives.
          </motion.p>
          <motion.p variants={textItemVariants} className="text-black mb-6 leading-relaxed text-lg lg:text-2xl opacity-90">
            The materials available here are intended to guide clients in understanding technical assistance processes and enhancing the quality of their learning interventions.
          </motion.p>
        </motion.div>
        {!isMobile ? (
          <div className="flex-1 flex justify-center items-center relative h-[600px]">
            <div className="relative w-full h-full flex items-center justify-center">
              {order.map((posIndex, i) => {
                const { x, y } = positionsDesktop[posIndex];
                const { icon, size, color } = icons[i];
                return (
                  <motion.div key={i} className="absolute" animate={{ x, y }} transition={{ duration: 1.5, ease: "easeInOut" }}>
                    <FontAwesomeIcon icon={icon} className={`${color} ${size} filter drop-shadow-xl`} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full overflow-hidden py-10">
            <motion.div className="flex gap-16 items-center w-max" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
              {icons.concat(icons).map((item, i) => (
                <div key={i} className={`flex-shrink-0 ${item.color} text-7xl`}><FontAwesomeIcon icon={item.icon} /></div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState(tableTabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [dateSort, setDateSort] = useState(null);
  const scrollContainerRef = useRef(null);

  // Auto-centering active tab logic
  useEffect(() => {
    const activeBtn = scrollContainerRef.current?.querySelector(".active-tab");
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  const toggleDateSort = () => {
    if (!dateSort) setDateSort("asc");
    else if (dateSort === "asc") setDateSort("desc");
    else setDateSort(null);
    setCurrentPage(1);
  };

  const filteredData = tableData
    .filter((item) => item.category === activeTab)
    .filter((item) =>
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!dateSort) return 0;
      const parseDate = (d) => (d ? new Date(d.replace(",", "")) : new Date(0));
      return dateSort === "asc" ? parseDate(b.dateIssued) - parseDate(a.dateIssued) : parseDate(a.dateIssued) - parseDate(b.dateIssued);
    });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const rowVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: i * 0.1 } }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-white min-h-screen pb-20 overflow-x-hidden">
      <KnowledgeBank />

      <section className="w-full max-w-[110rem] mx-auto flex flex-col mt-10 px-4 sm:px-6 lg:px-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto no-scrollbar gap-1 whitespace-nowrap scroll-smooth touch-pan-x z-20 justify-start"
          >
            {tableTabs.map((tab) => (
              <button
                key={tab}
                className={`flex-shrink-0 px-6 py-4 rounded-t-2xl font-bold text-sm lg:text-md transition-all duration-200 relative ${
                  activeTab === tab 
                  ? "bg-[#2e3192] text-white h-[60px] active-tab" 
                  : "bg-gray-100 text-gray-500 border-t border-l border-r border-gray-200 hover:bg-gray-200"
                }`}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="pb-2 w-full lg:w-80">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full border border-gray-300 rounded-full px-6 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#2e3192] outline-none"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* Desktop View */}
        <div className="w-full overflow-hidden no-scrollbar relative z-10 hidden sm:block">
          <table className="w-full border-separate border-spacing-0 min-w-[1000px] table-fixed">
            <thead>
              <tr className="bg-[#2e3192] text-white">
                <th className="w-[270px] px-8 py-6 text-left font-bold uppercase text-xs tracking-wider rounded-bl-3xl">Type</th>
                <th className="px-8 py-6 text-left font-bold uppercase text-xs tracking-wider">File Name</th>
                <th className="w-[180px] px-8 py-6 text-left font-bold uppercase text-xs tracking-wider cursor-pointer hover:bg-[#1e2060] transition" onClick={toggleDateSort}>
                  <div className="flex items-center gap-2">Date Issued <CgArrowsExchangeAltV className="text-xl" /></div>
                </th>
                <th className="w-[180px] px-8 py-6 text-center font-bold uppercase text-xs tracking-wider rounded-br-3xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => {
                    const isAlt = index % 2 !== 0;
                    return (
                      <React.Fragment key={`${activeTab}-${currentPage}-${item.id}`}>
                        <tr className="h-4 bg-transparent"><td colSpan={4}></td></tr>
                        <motion.tr custom={index} variants={rowVariants} initial="initial" animate="animate" exit="exit" className="group">
                          <td className={`px-8 py-6 border-t border-b border-l rounded-l-3xl text-xs ${isAlt ? "bg-[#4f54e0] text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200"}`}>
                            <span className={`inline-block px-5 py-2 rounded-full text-md font-black uppercase whitespace-nowrap ${isAlt ? "bg-white text-[#2e3192]" : "bg-blue-100 text-[#2e3192]"}`}>{item.type}</span>
                          </td>
                          <td className={`px-8 py-6 border-t border-b font-bold text-sm overflow-hidden ${isAlt ? "bg-[#4f54e0] text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200"}`}>
                            <a href={item.link} target="_blank" rel="noreferrer" className="block truncate hover:underline" title={item.fileName}>
                              {item.fileName}
                            </a>
                          </td>
                          <td className={`px-8 py-6 border-t border-b text-sm font-semibold ${isAlt ? "bg-[#4f54e0] text-gray-100 border-transparent" : "bg-gray-50 text-gray-500 border-gray-200"}`}>{item.dateIssued}</td>
                          <td className={`px-8 py-6 border-t border-b border-r rounded-r-3xl text-sm ${isAlt ? "bg-[#4f54e0] text-white border-transparent" : "bg-gray-50 text-gray-700 border-gray-200"}`}>
                            <div className="flex justify-center gap-4">
                              <a href={item.link} target="_blank" rel="noreferrer" className="p-3 bg-white text-blue-600 rounded-2xl shadow-md border border-gray-200 hover:bg-blue-50 transition"><FontAwesomeIcon icon={faEye} /></a>
                              <a href={item.link} download className="p-3 bg-white text-green-600 rounded-2xl shadow-md border border-gray-200 hover:bg-green-50 transition"><FontAwesomeIcon icon={faDownload} /></a>
                            </div>
                          </td>
                        </motion.tr>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td colSpan={4} className="py-20 text-center text-gray-400">
                      <FontAwesomeIcon icon={faInbox} className="text-5xl mb-4 opacity-20" />
                      <p className="text-lg font-medium italic">No results found.</p>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile View Card */}
        <div className="sm:hidden flex flex-col gap-6 mt-8">
          <AnimatePresence mode="popLayout">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => {
                const isPrimary = index % 2 === 0;
                return (
                  <motion.div key={`${activeTab}-${currentPage}-${item.id}`} custom={index} variants={rowVariants} initial="initial" animate="animate" exit="exit" className={`p-6 rounded-[2rem] shadow-xl ${isPrimary ? "bg-[#4f54e0] text-white" : "bg-gray-50 text-black border border-gray-200"}`}>
                    <div className="flex justify-between items-center mb-5">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${isPrimary ? "bg-white text-[#2e3192]" : "bg-blue-100 text-[#2e3192]"}`}>{item.type}</span>
                      <span className={`text-[12px] font-medium opacity-80 ${isPrimary ? "text-white" : "text-gray-600"}`}>{item.dateIssued}</span>
                    </div>
                    <h3 className="font-semibold mb-6 text-sm leading-snug line-clamp-2">
                      <a href={item.link} target="_blank" rel="noreferrer" className="hover:underline">
                        {item.fileName}
                      </a>
                    </h3>
                    <div className={`flex justify-end gap-6 border-t pt-5 ${isPrimary ? "border-white/20" : "border-gray-200"}`}>
                      <a href={item.link} target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-xs font-black transition ${isPrimary ? "text-white" : "text-[#2e3192]"}`}><FontAwesomeIcon icon={faEye} /> VIEW</a>
                      <a href={item.link} download className={`flex items-center gap-2 text-xs font-black transition ${isPrimary ? "text-white" : "text-green-600"}`}><FontAwesomeIcon icon={faDownload} /> SAVE</a>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-20 text-center text-gray-400">
                <FontAwesomeIcon icon={faInbox} className="text-5xl mb-4 opacity-20" />
                <p className="text-lg font-medium italic">No results found.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {filteredData.length > rowsPerPage && (
          <div className="w-full flex justify-end items-center mt-10 gap-4 sm:gap-6">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="text-sm font-bold text-[#2e3192] disabled:text-gray-300 hover:underline uppercase transition">Prev</button>
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2e3192] text-white font-bold text-sm shadow-md">{currentPage}</span>
              <span className="text-gray-400 font-bold uppercase text-xs">of {totalPages}</span>
            </div>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="text-sm font-bold text-[#2e3192] disabled:text-gray-300 hover:underline uppercase transition">Next</button>
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

export default Resources;