import React, { useState, useEffect } from "react";
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
import TABG from "../assets/TABG.png";

// ICONS
const icons = [
  { icon: faSquarePollVertical, label: "Chart", size: "text-[15rem]", color: "text-[#ee1c25]" },
  { icon: faBookOpen, label: "Book", size: "text-[10rem]", color: "text-[#2e3192]" },
  { icon: faChartPie, label: "Pie", size: "text-[15rem]", color: "text-[#FFE066]" },
  { icon: faCommentDots, label: "Comments", size: "text-[13rem]", color: "text-[#ee1c25]" },
  { icon: faGear, label: "Gear", size: "text-[10rem]", color: "text-[#2e3192]" },
];

// Desktop circular positions
const positionsDesktop = [
  { x: 0, y: -220 },
  { x: 250, y: -80 },
  { x: 160, y: 180 },
  { x: -160, y: 180 },
  { x: -250, y: -80 },
];

// KnowledgeBank Header Component
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

      <div className="flex flex-col lg:flex-row w-full max-w-[100rem]">
        {/* Text */}
        <div className="flex-1 max-w-5xl text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2e3192]">
            Knowledge Bank for Capability Building Technical Assistance
          </h1>
          <p className="text-black mb-4 leading-relaxed text-md lg:text-xl">
            This page is one of the key innovations under the Monitoring, Evaluation,
            and Knowledge Management Pillar of the Pillars of Technical Assistance
            Excellence Framework, intended to document selected and high-value TA cases
            provided by the Capability Building Division – Professional Learning and
            Development Section (CBD-PLDS) along Learning and Development (L&D) for
            institutional learning and continuous improvement.
          </p>
          <p className="text-black mb-4 leading-relaxed text-md lg:text-xl">
            The information will help capture TA cases, approaches, tools used, solutions
            provided, and key lessons learned from both formal and informal TA engagements.
            Collectively, these records will support evidence-based management, continuous
            improvement of TA delivery, and institutional learning within the DSWD Academy.
          </p>
        </div>

        {/* Desktop Icons */}
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

// CARD SECTION
const tableTabs = [
  "TRAINING PROPOSAL",
  "LDI-DIP",
  "EVALUATION",
  "ACCREDITATION",
  "CBA PLANNING",
];

const KnowledgeBankCardsSection = () => {
  const [activeTab, setActiveTab] = useState(tableTabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const rowsPerPage = 4;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("YOUR_WEB_APP_URL_HERE"); // Replace with your Apps Script URL
  //       const json = await res.json();
  //       setData(json);
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const filteredData = data
    .filter((item) => item.category === activeTab)
    .filter((item) =>
      item.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.extra?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => setCurrentPage(1), [activeTab, searchQuery]);

  const truncateText = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= 50) return text;
    return words.slice(0, 50).join(" ") + "...";
  };

  return (
    <section className="w-full flex flex-col items-center mt-20 px-4 sm:px-6 lg:px-36 mb-20">
      <h2 className="text-3xl lg:text-4xl font-bold text-[#2e3192] mb-8 text-center">
        Knowledge Bank Cards
      </h2>

      {/* Tabs + Search */}
      <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-0 overflow-x-auto sm:overflow-visible scrollbar-hide flex-1">
          {tableTabs.map((tab, idx) => (
            <button
              key={tab}
              className={`flex-shrink-0 sm:flex-1 h-14 font-semibold text-center transition-all duration-200 px-6 py-3
                ${activeTab === tab ? "text-[#2e3192] border-b-2 border-[#2e3192] z-10" : "text-gray-700 hover:text-[#2e3192] hover:border-b-2 hover:border-[#2e3192]"}
                ${idx !== 0 ? "-ml-px" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.split("\n").map((line, i) => <div key={i}>{line}</div>)}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64 flex-shrink-0 mt-2 sm:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e3192]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* CARDS */}
      <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {paginatedData.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl shadow p-6 text-center">
            No results found.
          </div>
        ) : (
          paginatedData.map((item, idx) => {
            const isPrimary = idx % 2 === 0;
            const extraText = truncateText(item.extra);
            const showSeeMore = item.extra && item.extra.split(" ").length > 50;

            return (
              <div key={idx} className={`p-6 rounded-xl shadow transition ${isPrimary ? "bg-[#2e3192] text-white" : "bg-white text-black"}`}>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>By {item.name}</span>
                  <span>{item.date}</span>
                </div>

                <div className="mb-3 font-semibold">{item.body}</div>

                {extraText && (
                  <div className="mb-3 text-sm">
                    {extraText} {showSeeMore && <span className="text-blue-500 font-medium cursor-pointer">See more</span>}
                  </div>
                )}

                {item.tags && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {item.tags.split(",").map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-200 rounded-full">{tag.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="w-full flex justify-end items-center mt-6 text-sm gap-2">
          <span className="mr-4 text-[#2e3192] font-bold">
            Showing {currentPage} out of {totalPages}
          </span>
          <button disabled={currentPage === 1} className={`px-2 py-1 rounded font-bold ${currentPage === 1 ? "bg-gray-200" : "bg-[#2e3192] text-white"}`} onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`px-2 py-1 rounded font-bold ${currentPage === i + 1 ? "bg-[#2e3192] text-white" : "bg-gray-200"}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} className={`px-2 py-1 rounded font-bold ${currentPage === totalPages ? "bg-gray-200" : "bg-[#2e3192] text-white"}`} onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
        </div>
      )}
    </section>
  );
};

// EXPORT BOTH
const KnowledgeBankPage = () => {
  return (
    <>
      <KnowledgeBank />
      <KnowledgeBankCardsSection />
    </>
  );
};

export default KnowledgeBankPage;
