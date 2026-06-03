// src/pages/KnowledgeBank.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TABG from "../assets/TABG.png";
import { HiOutlineViewGrid, HiOutlineViewList, HiSearch } from "react-icons/hi";
import { FiExternalLink, FiX } from "react-icons/fi";

const KnowledgeBank = () => {
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [layout, setLayout] = useState("grid");
  
  // Selected Card Data State for Modal Engine
  const [activeModalCard, setActiveModalCard] = useState(null);
  
  // Pagination State Engine
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Enforces strict 5x2 grid matrix layout

  useEffect(() => {
    let isMounted = true;

    const fetchKnowledgeBank = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzzIj8JS8HCYoShWMb3QnEpiGv9kh101MvEag0yN6oq2odG-PnlHMDFQ9vrdM7IjGL4bg/exec"
        );

        if (!response.ok) {
          throw new Error("Failed to communicate with live data layer server.");
        }
        
        const data = await response.json();
        
        if (isMounted) {
          if (Array.isArray(data)) {
            setKnowledgeData(data);
          } else if (data.error) {
            throw new Error(data.error);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error retrieving knowledge bank data:", err);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchKnowledgeBank();

    return () => {
      isMounted = false;
    };
  }, []);

  // Reset pagination index automatically when search parameters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const toggleExpand = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Filter content across Author, Title, or Description keywords
  const filteredData = knowledgeData.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const matchTitle = item.title?.toLowerCase().includes(query);
    const matchDesc = item.description?.toLowerCase().includes(query);
    const matchAuthor = item.author?.toLowerCase().includes(query);

    return matchTitle || matchDesc || matchAuthor;
  });

  // Pagination slicing engine
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const CHARACTER_LIMIT = 180;

  return (
    <div className="min-h-screen bg-gray-50 font-['Montserrat',sans-serif] text-[#1a1a1a] select-none">
      
      {/* Premium Hero Section with Added Top Buffer Padding Layout */}
      <section className="relative w-full min-h-[440px] flex items-center justify-center overflow-hidden pb-16 pt-32 md:pt-40">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${TABG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e3192]/95 via-[#2e3192]/85 to-[#ee1c25]/85" />
        
        <div className="relative text-center text-white px-6 max-w-4xl mx-auto z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6"
          >
            Knowledge Bank <br />
            <span className="text-white/90 text-2xl md:text-3xl font-medium block mt-2">
              for DSWD Learning and Development Standards
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.5 }} 
            className="space-y-4 text-white/80 text-[13.5px] md:text-[14.5px] font-medium leading-relaxed max-w-3xl mx-auto"
          >
            <p>
              This platform documents selected, high-value technical assistance (TA) cases provided by the 
              Capability Building Division – Professional Learning and Development Section (CBD-PLDS) to foster institutional continuous improvement.
            </p>
            <p>
              These records help capture strategic approaches, solutions, and core lessons learned to support evidence-based management within the DSWD Academy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar Grid/List Controller */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Cases Matrix</h2>
            <span className="bg-[#2e3192]/10 text-[#2e3192] text-xs font-bold px-3 py-1 rounded-full">
              {filteredData.length} Records Found
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Component */}
            <div className="relative flex-1 sm:w-96">
              <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <input
                type="text"
                placeholder="Search by title, author, key term..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white outline-none focus:ring-2 focus:ring-[#2e3192]/20 focus:border-[#2e3192] transition-all"
              />
            </div>
            
            {/* Layout Toggles */}
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button 
                onClick={() => setLayout("grid")} 
                className={`p-2 rounded-md transition-all ${layout === "grid" ? "bg-white shadow-sm text-[#2e3192]" : "text-gray-500"}`}
                title="Grid view"
              >
                <HiOutlineViewGrid size={20} />
              </button>
              <button 
                onClick={() => setLayout("list")} 
                className={`p-2 rounded-md transition-all ${layout === "list" ? "bg-white shadow-sm text-[#2e3192]" : "text-gray-500"}`}
                title="List view"
              >
                <HiOutlineViewList size={20} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Main Stream Canvas */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-10 min-h-[40vh]">
        {isLoading && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-[#2e3192] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-bold text-sm tracking-wide">Syncing Live Knowledge Engine layers...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16 bg-white rounded-2xl max-w-xl mx-auto shadow-sm border border-gray-100 px-6">
            <span className="text-red-500 text-4xl block mb-2">⚠️</span>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Failed to Load Content</h3>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredData.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl max-w-xl mx-auto shadow-sm border border-gray-200/60 px-6">
            <span className="text-gray-400 text-3xl block mb-2">🔍</span>
            <h3 className="font-bold text-gray-800 text-lg mb-1">No Matches Located</h3>
            <p className="text-gray-400 text-sm">We couldn't track items matching your keyword query parameters.</p>
          </div>
        )}

        {!isLoading && !error && filteredData.length > 0 && (
          <>
            <motion.div 
              key={layout}
              className={layout === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" : "flex flex-col space-y-4"}
            >
              <AnimatePresence mode="wait">
                {paginatedData.map((item, idx) => {
                  const globalIdx = startIndex + idx;
                  const isExpanded = !!expandedCards[globalIdx];
                  const needsTruncation = item.description && item.description.length > CHARACTER_LIMIT;
                  
                  const displayDescription = needsTruncation && !isExpanded && layout === "grid"
                    ? `${item.description.slice(0, CHARACTER_LIMIT)}...`
                    : item.description;

                  return (
                    <motion.article
                      key={globalIdx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04, ease: "easeInOut" }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      onClick={() => layout === "list" && setActiveModalCard(item)}
                      className={`bg-white border border-gray-200 overflow-hidden rounded-2xl p-8 shadow-sm transition-all duration-300 text-left ${
                        layout === "list" 
                          ? "flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:shadow-md hover:border-gray-300 cursor-pointer" 
                          : "flex flex-col justify-between min-h-[360px] hover:shadow-xl"
                      }`}
                    >
                      {layout === "grid" ? (
                        /* GRID FORMAT */
                        <>
                          <div>
                            <div className="flex justify-between items-center mb-5 text-[12px] font-bold">
                              <p className="text-gray-400">
                                By <span className="text-[#ee1c25] uppercase tracking-wide">{item.author}</span>
                              </p>
                              <p className="text-gray-400 font-medium">{item.date}</p>
                            </div>

                            <h3 className="text-[#2e3192] font-bold text-[16px] leading-relaxed mb-4">
                              {item.title}
                            </h3>

                            <p className="text-gray-500 text-[13.5px] leading-relaxed mb-6 font-medium whitespace-pre-line">
                              {displayDescription}
                              
                              {needsTruncation && (
                                <button
                                  type="button"
                                  onClick={(e) => toggleExpand(e, globalIdx)}
                                  className="text-[#2e3192] font-extrabold cursor-pointer hover:underline ml-1.5 inline-block focus:outline-none"
                                >
                                  {isExpanded ? "Show less" : "See more."}
                                </button>
                              )}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 mt-auto">
                            {item.tags && item.tags.map((tag, tIdx) => (
                              <span 
                                key={tIdx} 
                                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-tight"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        /* LIST FORMAT */
                        <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 min-w-0 w-full">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 mb-1">
                              <span className="text-[#ee1c25] uppercase tracking-wider">{item.author}</span>
                              <span>•</span>
                              <span>{item.date}</span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm md:text-base truncate group-hover:text-[#2e3192] mb-1">
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-xs md:text-sm truncate font-medium max-w-4xl">
                              {item.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-4 self-end md:self-center flex-shrink-0">
                            <div className="hidden sm:flex flex-wrap gap-1">
                              {item.tags && item.tags.slice(0, 2).map((tag, tIdx) => (
                                <span key={tIdx} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9.5px] font-bold uppercase">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <FiExternalLink className="text-gray-300 group-hover:text-[#ee1c25] size-5 transition-colors" />
                          </div>
                        </div>
                      )}
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                    currentPage === 1
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95 cursor-pointer shadow-sm"
                  }`}
                >
                  Prev
                </button>

                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                    currentPage === totalPages
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95 cursor-pointer shadow-sm"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Interactive Item Modal Display Layer */}
      <AnimatePresence>
        {activeModalCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop overlay layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalCard(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Card Window container frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden max-h-[85vh] text-left border border-gray-100"
            >
              {/* Modal Window Header Context */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <span className="text-[#ee1c25] uppercase tracking-wider">By {activeModalCard.author}</span>
                  <span>•</span>
                  <span>{activeModalCard.date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalCard(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Scrollable Modal Content Text Body */}
              <div className="p-8 overflow-y-auto space-y-6">
                <h2 className="text-[#2e3192] font-extrabold text-xl md:text-2xl leading-snug">
                  {activeModalCard.title}
                </h2>
                
                <div className="border-l-4 border-[#2e3192]/20 pl-4 py-1">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
                    {activeModalCard.description}
                  </p>
                </div>
              </div>

              {/* Modal Window Footer tags layout row */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-wrap gap-2">
                {activeModalCard.tags && activeModalCard.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KnowledgeBank;