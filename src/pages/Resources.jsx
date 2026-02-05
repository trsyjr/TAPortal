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
  "Centralization",
  "CBD PLAN AND\nACCOMPLISHMENT",
  "MANAGEMENT OF CAPABILITY\nBUILDING EFFORTS",
  "OTHERS",
];

const tableData = [
  { id: 1, type: "Memo", fileName: "CDO.pdf", dateIssued: "Jan 1", link: "#" },
  { id: 2, type: "Report", fileName: "Annual.pdf", dateIssued: "Feb 10", link: "#" },
  { id: 3, type: "Form", fileName: "Template.docx", dateIssued: "Mar 15", link: "#" },
  { id: 4, type: "Memo", fileName: "Guidelines.pdf", dateIssued: "Apr 20", link: "#" },
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
            Resources for Capability Building Technical Assistance
          </h1>
          <p className="text-black mb-4 leading-relaxed">
            This page provides access to curated resources that support the
            planning, implementation, and monitoring of capability building
            initiatives. The materials available here are intended to guide
            clients in understanding technical assistance processes, complying
            with applicable standards, and enhancing the quality of their
            learning and development interventions.
          </p>
          <p className="text-black mb-4 leading-relaxed">
            Resources may include reference materials, guidelines, tools,
            templates, and other knowledge products developed or adopted by the
            DSWD Academy to support technical assistance delivery. These materials
            are aligned with existing policies and are continuously updated to
            reflect current practices and emerging needs.
          </p>
          <p className="text-black mb-4 leading-relaxed">
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
  const tabsRef = useRef(null);

  const filteredData = tableData
    .filter((item) => {
      const tabText = activeTab.replace(/\n/g, "");
      return item.type.toLowerCase().includes(tabText.toLowerCase()) || tabText === "OTHERS";
    })
    .filter((item) => item.fileName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      {/* UPPER PART */}
      <KnowledgeBank />

      {/* TABLE SECTION */}
      <section className="w-full flex flex-col items-center mt-12 px-4 sm:px-6 lg:px-32 gap-4">
        {/* Tabs + Search */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Tabs swipeable */}
          <div
            ref={tabsRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-1 sm:flex-1"
          >
            {tableTabs.map((tab) => (
              <button
                key={tab}
                className={`flex-shrink-0 w-64 sm:w-auto h-16 rounded-lg font-semibold text-center whitespace-pre-line transition-all duration-200 px-6 py-2 ${
                  activeTab === tab
                    ? "bg-[#2e3192] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-64 mt-2 sm:mt-0 flex-shrink-0">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e3192]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="w-full mb-12 overflow-x-auto">
          <table className="w-full min-w-[600px] border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-gray-100 rounded-lg">
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left w-[35%]">File Name</th>
                <th className="px-6 py-3 text-left">Date Issued</th>
                <th className="px-6 py-3 text-left w-[20%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr className="bg-white rounded-lg shadow">
                  <td colSpan={4} className="text-center py-4">
                    No results found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white rounded-lg shadow hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">{item.type}</td>
                    <td className="px-6 py-3">{item.fileName}</td>
                    <td className="px-6 py-3">{item.dateIssued}</td>
                    <td className="px-6 py-3 flex gap-3 justify-center">
                      <a href={item.link} className="text-blue-600 hover:underline">
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                      <a href={item.link} className="text-green-600 hover:underline">
                        <FontAwesomeIcon icon={faDownload} />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Resources;
