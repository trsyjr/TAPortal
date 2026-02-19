// src/pages/CBPlan.jsx
import React, { useState } from "react";
import TABG from "../assets/TABG.png";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import { SiGooglesheets, SiGoogledocs, SiGoogleslides } from "react-icons/si";

const CBPlan = () => {
  const cbPlanFiles = [
    { name: "PPG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/1NKxAVDlbYcorI54KhY3eHCzFJ4mpKo3OIK3jl110PIg/edit?usp=sharing", type: "sheet" },
    { name: "DRMG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/1oiaOKKignUiwiHCronQa7Bb5gYqUTIWwp-GLFYrcoi4/edit?usp=sharing", type: "sheet" },
    { name: "RSIDG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/1t-AW1SWgUa8fHYPFE0sq4PHjpoCjBt2bWJw5y6NpXR8/edit?usp=sharing", type: "sheet" },
    { name: "OSECG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/1XEXJSx9JV2FI5yVlbXHusvKpHI7nRPWKO60EvBE_-vg/edit?usp=sharing", type: "sheet" },
    { name: "IPDG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/1-ObIYjQNITR3vyT55PftVf5N1TC-AAQZirBMBvOk31c/edit?usp=sharing", type: "sheet" },
    { name: "OG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/1FQwEOsPtyFwxDPIb4059KsVzjdolJ1W_hmojP4tTK_I/edit?usp=sharing", type: "sheet" },
    { name: "CCTG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/1GPs2p4HNWNPdnxGMPU4hjJZmuTH9quDhADWXbOqFwAQ/edit?usp=sharing", type: "sheet" },
    { name: "OG Dashboard DSWD-CO IDCB Plan", link: "https://docs.google.com/spreadsheets/d/1qk7qiPgRZkUyyP6jLnNVPrshpqln5h5PyUnIZeFsWu0/edit?usp=sharing", type: "sheet" },
    { name: "LIAG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/145VIdQ-NV3wJeua0tPux0DQ3tSHY7ffRzxx4LNEkem8/edit?usp=sharing", type: "sheet" },
    { name: "GASSG 2026 DSWD-CO CB Plan", link: "https://docs.google.com/spreadsheets/d/1S8Pl7wv_8tq288o428ZPm6n8I3nx6ZwyaPkqWRFMxeU/edit?usp=sharing", type: "sheet" },
  ];

  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const FileIcon = ({ type, size = 24 }) => {
    switch (type) {
      case "sheet":
        return <SiGooglesheets size={size} className="text-green-600" />;
      case "doc":
        return <SiGoogledocs size={size} className="text-blue-600" />;
      case "slides":
        return <SiGoogleslides size={size} className="text-yellow-500" />;
      case "pdf":
        return <FaFilePdf size={size} className="text-red-600" />;
      default:
        return <FiFileText size={size} className="text-gray-400" />;
    }
  };

  const truncateName = (name, length = 20) => {
    return name.length > length ? name.slice(0, length) + "..." : name;
  };

  const filteredFiles = cbPlanFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section
        className="w-full h-72 md:h-96 flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>
        <div className="relative text-center text-white font-bold px-6 md:px-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Capability Building Planning
          </h1>
          <p className="text-sm md:text-lg max-w-2xl mx-auto">
            Browse the Capability Building files below.
          </p>
        </div>
      </section>

      {/* Layout Switch + Search */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Files</h2>

        {/* Mobile Search */}
        <div className="md:hidden w-full flex flex-col items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm w-full max-w-xs focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setLayout("grid")}
              className={`p-2 rounded-lg border ${
                layout === "grid"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <HiOutlineViewGrid size={20} />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-2 rounded-lg border ${
                layout === "list"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <HiOutlineViewList size={20} />
            </button>
          </div>
        </div>

        {/* Desktop: search + grid/list */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm w-64 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => setLayout("grid")}
            className={`p-2 rounded-lg border ${
              layout === "grid"
                ? "bg-blue-100 text-blue-700"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <HiOutlineViewGrid size={22} />
          </button>
          <button
            onClick={() => setLayout("list")}
            className={`p-2 rounded-lg border ${
              layout === "list"
                ? "bg-blue-100 text-blue-700"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <HiOutlineViewList size={22} />
          </button>
        </div>
      </section>

      {/* Files Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <div
          className={`transition-all duration-300 ${
            layout === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col space-y-4"
          }`}
        >
          {filteredFiles.map((file) => (
            <a
              key={file.link}
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group ${
                layout === "list"
                  ? "flex items-center p-4"
                  : "flex flex-col p-4"
              }`}
            >
              {layout === "grid" ? (
                <>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                    <FileIcon type={file.type} size={22} />
                    <span className="hidden md:block truncate max-w-[180px]">
                      {truncateName(file.name, 20)}
                    </span>
                    <span className="block md:hidden truncate max-w-full">
                      {truncateName(file.name, 30)}
                    </span>
                  </div>

                  <div className="w-full h-36 rounded-lg bg-gray-50 flex items-center justify-center mb-2">
                    <FileIcon type={file.type} size={60} />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-14 rounded-lg bg-gray-50 flex items-center justify-center mr-4">
                    <FileIcon type={file.type} size={40} />
                  </div>

                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-gray-800 max-w-full">
                      <FileIcon type={file.type} size={18} />
                      <span className="block md:hidden truncate max-w-[150px]">
                        {truncateName(file.name, 25)}
                      </span>
                      <span className="hidden md:block">{file.name}</span>
                    </div>
                  </div>
                </>
              )}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CBPlan;
