import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePollVertical,
  faBookOpen,
  faChartPie,
  faCommentDots,
  faGear,
  faEye,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import TABG from "../assets/TABG.png"; // Make sure you have this image

// ---------- ICONS AND POSITIONS ----------
const icons = [
  { icon: faSquarePollVertical, label: "Chart", size: "text-[15rem]", color: "text-[#ee1c25]" },
  { icon: faBookOpen, label: "Book", size: "text-[10rem]", color: "text-[#2e3192]" },
  { icon: faChartPie, label: "Pie", size: "text-[15rem]", color: "text-[#FFE066]" },
  { icon: faCommentDots, label: "Comments", size: "text-[13rem]", color: "text-[#ee1c25]" },
  { icon: faGear, label: "Gear", size: "text-[10rem]", color: "text-[#2e3192]" },
];

const positionsDesktop = [
  { x: 0, y: -220 },
  { x: 250, y: -80 },
  { x: 160, y: 180 },
  { x: -160, y: 180 },
  { x: -250, y: -80 },
];

// ---------- TABLE TABS AND DATA ----------
const tableTabs = [
  "CENTRALIZATION",
  "CBD PLAN AND\nACCOMPLISHMENT",
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
    category: "CBD PLAN AND\nACCOMPLISHMENT",
    type: "MC No. 11, s. 2010",
    fileName: "Guidelines in the Preperation and Submission of IDCB Plans and Accomplishment Reports",
    dateIssued: "22 Jun, 2010",
    link: "/pdfs/MC_2010-011-IDCB-GUIDELINES.pdf",
  },
  {
    id: 6,
    category: "CBD PLAN AND\nACCOMPLISHMENT",
    type: "Memorandum",
    fileName: "Call for Submission and Invitation for the Teachnical Assistance in Accomplishing the 2026 Capability Building Plan",
    dateIssued: "6 Oct 2025",
    link: "/pdfs/221049-CALL-FOR-SUBMISSION-AND-INVITATION-FOR-THE-TECHNICAL-ASSISTANCE-IN-ACCOMPLISHING-THE-2026-CAPABILITY-BUILDING-PLAN.pdf",
  },
  {
    id: 7,
    category: "CBD PLAN AND\nACCOMPLISHMENT",
    type: "Attachments",
    fileName: "Guidance Note for the Accomplishment of the Capability Building Plan Fiscal Year 2026",
    dateIssued: "6 Oct 2025",
    link: "/pdfs/221049-GUIDANCE-NOTES-IN-ACCOMPLISHING-THE-2026-CAPABILITY-BUILDING-PLAN-1.pdf",
  },
  {
    id: 8,
    category: "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
    type: "MC No. 23, s. 2003",
    fileName: "Adoption of the DSWD Organizational Competencies",
    dateIssued: "27 Jun, 2003",
    link: "/pdfs/[SWIDB-Guideline]_DSWD-Organizational-Competencies.pdf",
  },
  {
    id: 9,
    category: "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
    type: "AO No. 20, s. 2004",
    fileName: "Omnibus Policies and Guidelines on the Management of DSWD Capability Building Efforts",
    dateIssued: "3 Jun, 2004",
    link: "/pdfs/[SWIDB-Guideline-]_Management-of-DSWD-Capability-Building-Efforts.pdf",
  },
  {
    id: 10,
    category: "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
    type: "BC No. 2007-1, s. 2007",
    fileName: "Guidelines on the Grant of Honoraria to Lecturers, Resource Persons, Coordinators and Facilitators",
    dateIssued: "23 Apr, 2007",
    link: "/pdfs/[DBM-Guideline]_Grant-of-Honoraria-to-Lecturers-Resource-Persons-Coordinators-and-Facilitators.pdf",
  },
  {
    id: 11,
    category: "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
    type: "MC No. 04, s. 2010",
    fileName: "'Institutional Development' Framework Amending for the purpose Memorandum Circular No. 32, Series of 2004",
    dateIssued: "15 Apr, 2010",
    link: "/pdfs/[SWIDB Guideline]_Institutional Development Framework (Amendment of MC 32 s. 2004).pdf",
  },
  {
    id: 12,
    category: "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
    type: "MC No. 07, s. 2010",
    fileName: "Terms of Reference on the Use of Standard Forms on Training Design, Syllabus and Documentation",
    dateIssued: "13 May, 2010",
    link: "/pdfs/[SWIDB Guideline]_Use of Standard Forms on Training Design, Syllabus and Documentation.pdf",
  },
  {
    id: 13,
    category: "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
    type: "AO No. 16, s. 2010",
    fileName: "Framework and Guidelines for Capability Building of DSWD Social Protection Intermediaries and Stakeholders",
    dateIssued: "16 Dec, 2010",
    link: "/pdfs/AO 16 Series of 2010_Framework and Guidelines for Capability Building of DSWD Social Protection Intermediaries and Stakeholders.pdf",
  },
  {
    id: 14,
    category: "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
    type: "AO No. 10, s. 2019",
    fileName: "Guidelines on the Grant of Honoraria to Lecturers, Resource Persons, Coordinators, Facilitators in Seminars, Training Programs, and other Similar Activities",
    dateIssued: "15 May, 2019",
    link: "/pdfs/[SWIDB Guideline]_Guidelines on the Grant of Honoraria.pdf",
  },
  {
    id: 15,
    category: "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
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
    dateIssued: "",
    link: "https://drive.google.com/drive/folders/1t3P41pSDNz_iOfUNk4OySMWAMPhoMKdW?usp=drive_link",
  },
  {
    id: 23,
    category: "OTHERS",
    type: "FAQs",
    fileName: "L&D Standards FAQs",
    dateIssued: "",
    link: "https://docs.google.com/spreadsheets/d/1IO9v5WsCPmifqk5w5URI1koQ73JgS2acH93OZeKl40o/edit?usp=drive_link",
  },
  {
    id: 24,
    category: "OTHERS",
    type: "Annexes",
    fileName: "DSWD L&D Guidebook Annexes",
    dateIssued: "",
    link: "https://drive.google.com/u/0/open?id=1N53g9D3p1VXDmPWXey-2zAsjGZ0qQbk-",
  },
  {
    id: 25,
    category: "TEMPLATES",
    type: "Prescribed Template",
    fileName: "LDI-DIP",
    dateIssued: "",
    link: "https://docs.google.com/document/d/12IsrxW1x10kDH5mhe5CWHZVoOGIvRxFY/edit?usp=drive_link&ouid=101943665772154647256&rtpof=true&sd=true",
  },
  {
    id: 26,
    category: "TEMPLATES",
    type: "Prescribed Template",
    fileName: "LDI Proposal",
    dateIssued: "",
    link: "https://docs.google.com/document/d/1uDx9lifnme2-R7l3v8VpP_HUo3Nhn9lO/edit?usp=drive_link&ouid=101943665772154647256&rtpof=true&sd=true",
  },
];

// ---------- KNOWLEDGE BANK COMPONENT ----------
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
    }, 2000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const mobileIconSize = "text-4xl";

  return (
    <div
      className="min-h-screen px-6 lg:px-20 py-16 flex flex-col gap-12 lg:gap-16 items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${TABG})` }}
    >
      {/* MOBILE ICONS */}
      {isMobile && (
        <div className="w-full overflow-hidden py-8">
          <motion.div
            className="flex gap-12"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            {icons.concat(icons).map((item, i) => (
              <div key={i} className={`flex-shrink-0 ${mobileIconSize} ${item.color}`}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row w-full max-w-[100rem]">
        {/* LEFT SIDE: Text */}
        <div className="flex-1 max-w-5xl text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2e3192]">
            Resources for DSWD Learning and Development Standards
          </h1>
          <p className="text-black mb-4 leading-relaxed text-md lg:text-xl">
            This page provides access to curated resources that support the
            planning, implementation, and monitoring of capability building
            initiatives. The materials available here are intended to guide
            clients in understanding technical assistance processes, complying
            with applicable standards, and enhancing the quality of their
            learning and development interventions.
          </p>
          <p className="text-black mb-4 leading-relaxed text-md lg:text-xl">
            Resources may include reference materials, guidelines, tools,
            templates, and other knowledge products developed or adopted by the
            DSWD Academy to support technical assistance delivery. These materials
            are aligned with existing policies and are continuously updated to
            reflect current practices and emerging needs.
          </p>
          <p className="text-black mb-4 leading-relaxed text-md lg:text-xl">
            Clients are encouraged to review the available resources prior to
            submitting a technical assistance request, as these may already
            address common concerns and provide practical guidance for capability
            building activities.
          </p>
        </div>

        {/* DESKTOP ICONS */}
        {!isMobile && (
          <div className="flex-1 flex justify-center items-center relative w-72 h-72 pr-5">
            {order.map((posIndex, i) => {
              const { x, y } = positionsDesktop[posIndex];
              const { icon, size, color } = icons[i];
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  animate={{ x, y }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <FontAwesomeIcon icon={icon} className={`${color} ${size}`} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- RESOURCES PAGE ----------
const Resources = () => {
  const [activeTab, setActiveTab] = useState(tableTabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const tabsRef = useRef(null);

  const filteredData = tableData
    .filter((item) => item.category === activeTab)
    .filter((item) =>
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // PAGINATION
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      {/* UPPER PART */}
      <KnowledgeBank />

      {/* TABLE SECTION */}
      <section className="w-full flex flex-col items-center mt-10 px-4 sm:px-6 lg:px-14 mb-12">
        {/* Tabs + Search Row */}
        <div className="w-full flex flex-col sm:flex-row gap-4 mb-0 ">
          {/* Tabs container */}
          <div className="flex gap-0 overflow-x-auto sm:overflow-visible scrollbar-hide flex-1">
            {tableTabs.map((tab, idx) => (
              <button
                key={tab}
                className={`
                  flex-shrink-0 sm:flex-1 h-16
                  font-semibold text-center
                  transition-all duration-200
                  px-6 py-3
                  ${activeTab === tab
                    ? "text-[#2e3192] border-b-2 border-[#2e3192] z-10"
                    : "text-gray-700 hover:text-[#2e3192] hover:border-b-2 hover:border-[#2e3192]"
                  }
                  ${idx !== 0 ? "-ml-px" : ""} 
                `}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1); // reset page when switching tabs
                }}
              >
                {tab.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-64 flex-shrink-0 pt-2 mt-2 sm:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e3192]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset page when searching
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto mt-4 sm:overflow-visible">
          <table className="w-full border-separate border-spacing-y-4 hidden sm:table">
            <thead>
              <tr className="bg-white">
                <th className="px-6 py-3 text-left w-[20%]">Type</th>
                <th className="px-6 py-3 text-left w-[60%]">File Name</th>
                <th className="px-6 py-3 text-left w-[10%]">Date Issued</th>
                <th className="px-6 py-3 text-right w-[18%]"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr className="bg-white rounded-lg shadow">
                  <td colSpan={4} className="text-center py-4">No results found.</td>
                </tr>
              ) : (
                paginatedData.map((item, index) => {
                  const isPrimary = index % 2 === 0;
                  return (
                    <tr
                      key={item.id}
                      className={`transition rounded-lg shadow ${isPrimary ? "bg-[#2e3192] text-white" : "bg-white text-black"}`}
                    >
                      <td className="px-6 py-3">{item.type}</td>
                      <td className="px-6 py-3 truncate">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {item.fileName}
                        </a>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">{item.dateIssued}</td>
                      <td className="px-6 py-3">
                        <div className="flex justify-end gap-5">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:opacity-80 ${isPrimary ? "text-white" : "text-[#2e3192]"}`}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </a>
                          <a
                            href={item.link}
                            download={item.fileName}
                            className={`hover:opacity-80 ${isPrimary ? "text-white" : "text-green-600"}`}
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* MOBILE CARD-LIKE ROWS */}
          <div className="sm:hidden flex flex-col gap-4">
            {paginatedData.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-4 text-center">
                No results found.
              </div>
            ) : (
              paginatedData.map((item, index) => {
                const isPrimary = index % 2 === 0;
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl shadow transition ${isPrimary ? "bg-[#2e3192] text-white" : "bg-white text-black"}`}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Type:</span>
                      <span>{item.type}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">File Name:</span>
                      <span className="truncate">{item.fileName}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Date Issued:</span>
                      <span>{item.dateIssued}</span>
                    </div>
                    <div className="flex justify-end gap-5">
                      <a
                        href={item.link}
                        className={`hover:opacity-80 ${isPrimary ? "text-white" : "text-[#2e3192]"}`}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                      <a
                        href={item.link}
                        className={`hover:opacity-80 ${isPrimary ? "text-white" : "text-green-600"}`}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="w-full flex justify-end items-center mt-4 text-sm gap-2">
            <span className="mr-4 text-[#2e3192] font-bold">
              Showing {currentPage} out of {totalPages}
            </span>

            <button
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded font-bold ${currentPage === 1 ? "bg-gray-200" : "bg-[#2e3192] text-white"}`}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-2 py-1 rounded font-bold ${currentPage === i + 1 ? "bg-[#2e3192] text-white" : "bg-gray-200"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded font-bold ${currentPage === totalPages ? "bg-gray-200" : "bg-[#2e3192] text-white"}`}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        )}

      </section>
    </div>
  );
};

export default Resources;
