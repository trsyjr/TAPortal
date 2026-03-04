import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TABG from "../assets/TABG.png";
import { HiOutlineViewGrid, HiOutlineViewList, HiSearch } from "react-icons/hi";
import { FiFileText, FiExternalLink } from "react-icons/fi";
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

  const getGoogleId = (url) => {
    const match = url.match(/\/d\/(.+?)\//);
    return match ? match[1] : null;
  };

  const FileIcon = ({ type, size = 24 }) => {
    switch (type) {
      case "sheet": return <SiGooglesheets size={size} className="text-green-600" />;
      case "doc": return <SiGoogledocs size={size} className="text-blue-600" />;
      case "slides": return <SiGoogleslides size={size} className="text-yellow-500" />;
      case "pdf": return <FaFilePdf size={size} className="text-red-600" />;
      default: return <FiFileText size={size} className="text-gray-400" />;
    }
  };

  const filteredFiles = cbPlanFiles.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TABG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e3192]/90 via-[#2e3192]/70 to-[#ee1c25]/80" />
        <div className="relative text-center text-white px-6 mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Capability Building Planning
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.5 }} 
            className="text-lg opacity-90 max-w-2xl mx-auto"
          >
            Access and manage institutional learning pathways for 2026.
          </motion.p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Resources</h2>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
              {filteredFiles.length} Total
            </span>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white outline-none transition-all"
              />
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button onClick={() => setLayout("grid")} className={`p-2 rounded-md transition-all ${layout === "grid" ? "bg-white shadow-sm text-[#2e3192]" : "text-gray-500"}`}><HiOutlineViewGrid size={20} /></button>
              <button onClick={() => setLayout("list")} className={`p-2 rounded-md transition-all ${layout === "list" ? "bg-white shadow-sm text-[#2e3192]" : "text-gray-500"}`}><HiOutlineViewList size={20} /></button>
            </div>
          </div>
        </section>
      </div>

      {/* Files Content */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-10">
        {/* We use a key on the div to trigger the 1-by-1 animation whenever layout changes */}
        <motion.div 
          key={layout}
          className={layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" : "flex flex-col space-y-3"}
        >
          <AnimatePresence mode="wait">
            {filteredFiles.map((file, index) => {
              const fileId = getGoogleId(file.link);
              const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;

              return (
                <motion.a
                  key={file.link}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.04, // This creates the 1-by-1 entrance
                    ease: "easeInOut" 
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  href={file.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                    layout === "list" ? "flex items-center p-4 py-3" : "flex flex-col"
                  }`}
                >
                  {layout === "grid" ? (
                    <>
                      <div className="relative aspect-video bg-gray-50 overflow-hidden border-b border-gray-100 flex items-center justify-center">
                        <img 
                          src={thumbnailUrl} 
                          alt="" 
                          referrerPolicy="no-referrer" 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1"><FileIcon type={file.type} size={18} /></div>
                          <p className="font-bold text-gray-700 text-sm leading-tight group-hover:text-[#2e3192] transition-colors">{file.name}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <div className="flex items-center gap-3 truncate">
                        <FileIcon type={file.type} size={18} />
                        <span className="font-bold text-gray-700 truncate group-hover:text-[#2e3192] transition-colors">{file.name}</span>
                      </div>
                      <FiExternalLink className="text-gray-300 group-hover:text-[#ee1c25] ml-4 flex-shrink-0 transition-colors" />
                    </div>
                  )}
                </motion.a>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default CBPlan;