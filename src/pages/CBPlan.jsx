// src/pages/CBPlan.jsx
import React, { useState } from "react";
import TABG from "../assets/TABG.png";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { FiExternalLink, FiFileText } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import { SiGooglesheets, SiGoogledocs, SiGoogleslides } from "react-icons/si";

const CBPlan = () => {
  const cbPlanFiles = [
    { name: "CB Plan Jan 2026", link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_1", type: "sheet" },
    { name: "Training Guidelines", link: "https://docs.google.com/document/d/YOUR_FILE_ID_2", type: "doc" },
    { name: "Capability Slides", link: "https://docs.google.com/presentation/d/YOUR_FILE_ID_3", type: "slides" },
    { name: "Policy Overview", link: "https://example.com/file.pdf", type: "pdf" },
  ];

  const [layout, setLayout] = useState("grid");

  // Return correct icon based on file type
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

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section
        className="w-full h-72 md:h-96 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: `url(${TABG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>
        <div className="relative text-center md:text-left text-white px-6 md:px-12">
          <h1 className="text-3xl md:text-5xl text-center font-bold mb-4 animate-fadeIn">
            Capability Building Planning
          </h1>
          <p className="text-center text-sm md:text-lg max-w-2xl animate-fadeIn delay-200">
            The CB Plan (Capability Building Plan) outlines upcoming trainings, workshops, and capability-building activities. 
            Browse the files below or open them in a new tab.
          </p>
        </div>
      </section>

      {/* Layout Switch */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Files</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setLayout("grid")}
            className={`p-2 rounded-lg border transition ${
              layout === "grid" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            title="Grid View"
          >
            <HiOutlineViewGrid size={24} />
          </button>
          <button
            onClick={() => setLayout("list")}
            className={`p-2 rounded-lg border transition ${
              layout === "list" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            title="List View"
          >
            <HiOutlineViewList size={24} />
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
          {cbPlanFiles.map((file) => (
            <a
              key={file.link}
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex ${
                layout === "list" ? "flex-row items-center p-4" : "flex-col items-center p-4"
              } bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 group`}
            >
              {/* File Icon */}
              <div
                className={`${
                  layout === "grid"
                    ? "w-full h-36 mb-3 rounded-lg flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300"
                    : "w-12 h-12 mr-4 flex-shrink-0 rounded-lg flex items-center justify-center"
                }`}
              >
                <FileIcon type={file.type} size={layout === "grid" ? 48 : 28} />
              </div>

              {/* File Name */}
              <div className={`${layout === "grid" ? "text-center" : "flex-1 flex justify-between items-center"}`}>
                <span className="font-medium text-gray-800 line-clamp-2">{file.name}</span>
                <span className="flex items-center text-blue-600 text-sm mt-2 md:mt-0 hover:underline">
                  Open <FiExternalLink className="ml-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CBPlan;
