import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  FileX, 
  RotateCcw, 
  ChevronDown, 
  Check,
  X,
  Copy,
  CopyCheck,
  MessageSquare,
  PieChart,
  Settings,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { FaLaptopMedical, FaTicket } from 'react-icons/fa6';

// Import external components
import FloatingCard from '../components/FloatingCardDeck';
import TicketModal from '../components/TicketModal';
import JoinModal from '../components/JoinModal';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxpmS2obDD3aAZmGpsRZsFWoQ9DivjX9Mir3wWuQXsEUD5Bq28c0-tzQL2_Kj3Mx-lDjA/exec";

// Purely decorative large icons transitioning automatically in a Card Switching Deck
const CAROUSEL_ICONS = [
  {
    id: 'gear',
    component: Settings,
    bg: 'bg-[#2E3192]',
    iconColor: 'text-white',
  },
  {
    id: 'pie',
    component: PieChart,
    bg: 'bg-[#FBD24E]',
    iconColor: 'text-[#FBD24E] fill-white stroke-[2.5]',
  },
  {
    id: 'chat',
    component: MessageSquare,
    bg: 'bg-[#EF383A]',
    iconColor: 'text-white fill-white',
  },
  {
    id: 'book',
    component: BookOpen,
    bg: 'bg-[#2E3192]',
    iconColor: 'text-white',
  },
  {
    id: 'bar',
    component: BarChart3,
    bg: 'bg-[#EF383A]',
    iconColor: 'text-white stroke-[2.5]',
  }
];

// Custom Modern Dropdown Component
function ModernSelect({ label, value, options, onChange, placeholder = "Select option..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-1 relative w-full" ref={containerRef}>
      {label && <label className="text-[11px] font-semibold text-gray-600 block">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-xs border rounded-xl px-3 py-2.5 flex items-center justify-between transition-all duration-200 bg-white shadow-sm min-h-[42px] touch-manipulation ${
          isOpen 
            ? 'border-[#2E3192] ring-2 ring-indigo-100 text-gray-900' 
            : 'border-gray-200 hover:border-indigo-300 text-gray-700'
        }`}
      >
        <span className="truncate font-medium text-left">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#2E3192]' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-[100] divide-y divide-gray-50 text-xs text-gray-800 max-h-52 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors min-h-[40px] touch-manipulation ${
                    isSelected 
                      ? 'bg-indigo-50/80 text-[#2E3192] font-semibold' 
                      : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  <span className="truncate pr-2">{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#2E3192] shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Copy-to-Clipboard Component for DRN
function CopyableDRN({ drn, className = "", isDark = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!drn || drn === '--') return;
    navigator.clipboard.writeText(drn);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (!drn || drn === '--') {
    return <span className={className}>--</span>;
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Click to copy DRN"
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-mono font-semibold transition-all group ${
        isDark 
          ? 'bg-white/10 hover:bg-white/20 text-indigo-100' 
          : 'bg-indigo-50 hover:bg-indigo-100 text-[#2E3192] border border-indigo-200/60'
      } ${className}`}
    >
      <span className="truncate max-w-[140px]">{drn}</span>
      {copied ? (
        <CopyCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-bounce" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 shrink-0 transition-opacity" />
      )}
    </button>
  );
}

// Record Detail Modal
function RecordModal({ row, onClose }) {
  const modalRef = useRef(null);
  const [copiedHeader, setCopiedHeader] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!row) return null;

  const drnValue = row['DRN'] && row['DRN'] !== '--' ? row['DRN'] : '--';

  const copyHeaderDRN = () => {
    if (drnValue === '--') return;
    navigator.clipboard.writeText(drnValue);
    setCopiedHeader(true);
    setTimeout(() => setCopiedHeader(false), 1800);
  };

  const overviewFields = [
    { label: "Proponent OBSU/FO", value: row['Proponent'] },
    { label: "Reviewer Assigned", value: row['Reviewer'] },
    { label: "Current Status", value: row['Status'] },
    { label: "As of Date", value: row['As of'] },
  ];

  const detailFields = [
    { label: "Title of Activity", value: row['Title of Activity'] },
    { label: "Expected Actions from Proponent", value: row['Expected Actions from Proponent'] },
    { label: "Comments & Recommendation of the Academy", value: row['Comments and/or Recommendation of the Academy'] },
    { label: "Remarks", value: row['Remarks'] },
  ];

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100"
      >
        <div className="bg-gradient-to-r from-[#2E3192] to-indigo-900 text-white px-6 py-5 flex items-center justify-between gap-4 border-b border-indigo-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">DRN:</span>
            <button
              onClick={copyHeaderDRN}
              title="Click to copy DRN"
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-sm font-mono font-bold tracking-wide transition border border-white/10 truncate"
            >
              <span className="truncate">{drnValue}</span>
              {copiedHeader ? (
                <CopyCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-indigo-200 group-hover:text-white shrink-0 transition" />
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            title="Close modal (Esc)"
            className="p-2 text-indigo-200 hover:text-white hover:bg-red-500 rounded-full transition-all duration-200 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
            {overviewFields.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className="font-semibold text-gray-900 block truncate" title={item.value}>
                  {item.value || '--'}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {detailFields.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-1.5">
                <div className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E3192]" />
                  {item.label}
                </div>
                <div className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap break-words text-xs">
                  {item.value || '--'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Tracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Modal States
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Deck State
  const [deck, setDeck] = useState(CAROUSEL_ICONS);
  const [isSwitching, setIsSwitching] = useState(false);

  // Filter Popover States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterProponent, setFilterProponent] = useState('ALL');
  const [filterReviewer, setFilterReviewer] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filterRef = useRef(null);

  // Grid Template Columns
  const gridTemplateColumns = "110px 170px 1fr 180px 110px 100px 1.1fr 1.2fr 130px";

  // FloatingCard Deck Definition
  const customDeckCards = [
    {
      title: "TA WEDNESDAY",
      icon: <FaLaptopMedical />,
      description: "Virtual Clinic for Technical Assistance opens every Wednesday.",
      buttonText: "Join Here",
      onClick: () => setIsJoinModalOpen(true),
    },
    {
      title: "Need Assistance?",
      icon: <FaTicket />,
      description: "Submit a support ticket or request guidance from the Academy.",
      buttonText: "Open Ticket",
      onClick: () => setIsTicketModalOpen(true),
    },
  ];

  // Carousel card switch animation
  useEffect(() => {
    const interval = setInterval(() => {
      handleSwitchCard();
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleSwitchCard = () => {
    if (isSwitching) return;
    setIsSwitching(true);

    setTimeout(() => {
      setDeck((prevDeck) => {
        const [first, ...rest] = prevDeck;
        return [...rest, first];
      });
      setIsSwitching(false);
    }, 380);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const fetchData = async (isInitial = false) => {
    if (isInitial) setLoading(true);

    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to fetch sheet data");
      
      const resData = await res.json();
      const fetchedRows = resData.rows || [];

      const sortedRows = fetchedRows.slice().sort((a, b) => {
        const timeA = a._timestamp || 0;
        const timeB = b._timestamp || 0;

        if (timeA > 0 && timeB > 0) {
          if (timeB !== timeA) return timeB - timeA;
        }

        if (timeA > 0 && timeB === 0) return -1;
        if (timeB > 0 && timeA === 0) return 1;

        return (b._rowIndex || b.id) - (a._rowIndex || a.id);
      });

      setRawData(sortedRows);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      if (isInitial) setError("Failed to load live data from Google Sheet.");
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
    const intervalId = setInterval(() => fetchData(false), 10000);
    return () => clearInterval(intervalId);
  }, []);

  const { proponentOptions, reviewerOptions, statusOptions } = useMemo(() => {
    const props = new Set();
    const revs = new Set();
    const stats = new Set();

    rawData.forEach(row => {
      if (row['Proponent']) props.add(String(row['Proponent']).trim());
      if (row['Reviewer']) revs.add(String(row['Reviewer']).trim());
      if (row['Status']) stats.add(String(row['Status']).trim());
    });

    return {
      proponentOptions: [
        { label: "All Proponents", value: "ALL" },
        ...Array.from(props).sort().map(p => ({ label: p, value: p }))
      ],
      reviewerOptions: [
        { label: "All Reviewers", value: "ALL" },
        ...Array.from(revs).sort().map(r => ({ label: r, value: r }))
      ],
      statusOptions: [
        { label: "All Statuses", value: "ALL" },
        ...Array.from(stats).sort().map(s => ({ label: s, value: s }))
      ],
    };
  }, [rawData]);

  const filteredData = useMemo(() => {
    return rawData.filter((row) => {
      if (filterProponent !== 'ALL' && String(row['Proponent'] || '').trim() !== filterProponent) return false;
      if (filterReviewer !== 'ALL' && String(row['Reviewer'] || '').trim() !== filterReviewer) return false;
      if (filterStatus !== 'ALL' && String(row['Status'] || '').trim() !== filterStatus) return false;

      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matches = Object.values(row).some((val) =>
          String(val).toLowerCase().includes(query)
        );
        if (!matches) return false;
      }

      return true;
    });
  }, [rawData, filterProponent, filterReviewer, filterStatus, searchTerm]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const isAnyFilterActive = filterProponent !== 'ALL' || filterReviewer !== 'ALL' || filterStatus !== 'ALL';

  const resetFilters = () => {
    setFilterProponent('ALL');
    setFilterReviewer('ALL');
    setFilterStatus('ALL');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#EBECEF] py-4 sm:py-8 font-sans text-gray-800 w-full flex justify-center">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 space-y-6 sm:space-y-8 pt-12 sm:pt-20 pb-10 max-w-[1920px]">

        {/* TOP DASHBOARD SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-7 xl:pr-6 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#2E3192] leading-[1.15]">
              Activity Proposal<br className="hidden sm:inline" />
              and Design <span className="text-red-500 italic">Tracking</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-xs sm:text-base xl:text-lg text-gray-800 leading-relaxed font-medium">
              Track the status of activity proposals and training designs currently under review by the DSWD Academy. 
              This page provides proponent OBSUs and FOs with a centralized view of their submitted documents, 
              assigned reviewer, current review status, expected action, and latest updates.
            </p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base xl:text-lg text-gray-800 leading-relaxed font-medium">
              Use the information provided to monitor the progress of your submission and identify any action or 
              revisions that may be needed from the proponent.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center p-2 min-h-[360px] sm:min-h-[420px]">
            <div 
              onClick={handleSwitchCard}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center cursor-pointer select-none group"
              title="Click to switch card"
            >
              {deck.slice(0, 2).map((item, index) => {
                const isFrontCard = index === 0;
                const IconComp = item.component;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={false}
                    animate={{
                      x: isFrontCard ? (isSwitching ? -200 : 0) : 32,
                      y: isFrontCard ? (isSwitching ? 15 : 0) : -26,
                      scale: isFrontCard ? (isSwitching ? 0.85 : 1) : 0.88,
                      rotate: isFrontCard ? (isSwitching ? -15 : 0) : 10,
                      opacity: isFrontCard ? (isSwitching ? 0.5 : 1) : 0.7,
                      zIndex: isFrontCard ? 20 : 10,
                    }}
                    transition={{
                      duration: 0.48,
                      ease: [0.25, 1, 0.5, 1]
                    }}
                    className={`absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] ${item.bg} flex items-center justify-center shadow-2xl transition-shadow duration-300 group-hover:shadow-indigo-500/15`}
                  >
                    <IconComp className={`w-40 h-40 sm:w-52 sm:h-52 ${item.iconColor}`} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 items-stretch sm:items-center w-full relative z-30 pt-4">
          <div className="relative w-full sm:w-auto" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-full shadow-sm flex items-center justify-center gap-2 text-xs font-semibold transition border min-h-[42px] touch-manipulation ${
                isAnyFilterActive 
                  ? 'bg-[#2E3192] text-white border-[#2E3192]' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              <span>Filter Options</span>
              <Filter className="w-4 h-4" />
              {isAnyFilterActive && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 space-y-3.5"
                >
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                    <span className="text-xs font-bold text-gray-900 tracking-wide">Filter Records</span>
                    {isAnyFilterActive && (
                      <button 
                        onClick={resetFilters}
                        className="text-[11px] text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    )}
                  </div>

                  <ModernSelect 
                    label="Proponent" 
                    value={filterProponent} 
                    options={proponentOptions} 
                    onChange={(val) => {
                      setFilterProponent(val);
                      setCurrentPage(1);
                    }} 
                  />

                  <ModernSelect 
                    label="Reviewer" 
                    value={filterReviewer} 
                    options={reviewerOptions} 
                    onChange={(val) => {
                      setFilterReviewer(val);
                      setCurrentPage(1);
                    }} 
                  />

                  <ModernSelect 
                    label="Status" 
                    value={filterStatus} 
                    options={statusOptions} 
                    onChange={(val) => {
                      setFilterStatus(val);
                      setCurrentPage(1);
                    }} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-full sm:w-80 md:w-96">
            <input
              type="text"
              placeholder="Search table records..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white pl-6 pr-10 py-2.5 rounded-full shadow-sm text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200 min-h-[42px]"
            />
            <Search className="w-4 h-4 text-indigo-900 absolute right-4 top-3.5" />
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200/50 bg-white/50 p-1 relative z-10">
          <div className="w-full min-w-[1250px] space-y-3">
            
            <div 
              className="grid gap-3 px-5 py-4 bg-white rounded-xl text-xs font-bold text-gray-700 items-center text-left shadow-xs"
              style={{ gridTemplateColumns }}
            >
              <div>Proponent</div>
              <div>DRN</div>
              <div>Title of Activity</div>
              <div>Reviewer</div>
              <div>Status</div>
              <div>As of</div>
              <div>Expected Actions</div>
              <div>Comments/Recommendation</div>
              <div>Remarks</div>
            </div>

            {loading && (
              <div className="bg-white rounded-xl p-10 flex items-center justify-center text-gray-500 text-sm gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-[#2E3192]" />
                Loading...
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 rounded-xl p-4 text-center text-xs font-semibold">
                {error}
              </div>
            )}

            {!loading && !error && paginatedData.length > 0 && paginatedData.map((row, index) => {
              const isEven = index % 2 === 0;
              const bgColor = isEven ? 'bg-[#2E3192]' : 'bg-white';
              const textColor = isEven ? 'text-white' : 'text-gray-800';

              return (
                <motion.div
                  key={row.id || index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedRecord(row)}
                  className={`grid gap-3 p-4 rounded-xl text-xs items-center ${bgColor} ${textColor} transition-all hover:shadow-md cursor-pointer`}
                  style={{ gridTemplateColumns }}
                >
                  <div className="font-bold truncate" title={row['Proponent']}>{row['Proponent'] || '--'}</div>
                  
                  <div>
                    <CopyableDRN drn={row['DRN']} isDark={isEven} />
                  </div>

                  <div className="font-bold uppercase truncate" title={row['Title of Activity']}>{row['Title of Activity'] || '--'}</div>
                  <div className="truncate" title={row['Reviewer']}>{row['Reviewer'] || '--'}</div>
                  <div className="font-medium truncate" title={row['Status']}>{row['Status'] || '--'}</div>
                  <div className="font-semibold truncate" title={row['As of']}>{row['As of'] || '--'}</div>
                  <div className="truncate" title={row['Expected Actions from Proponent']}>{row['Expected Actions from Proponent'] || '--'}</div>
                  <div className="truncate" title={row['Comments and/or Recommendation of the Academy']}>
                    {row['Comments and/or Recommendation of the Academy'] || '--'}
                  </div>
                  <div className="italic text-xs truncate" title={row['Remarks']}>{row['Remarks'] || '--'}</div>
                </motion.div>
              );
            })}

            {!loading && !error && paginatedData.length === 0 && (
              <div className="bg-white rounded-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-3">
                <FileX className="w-10 h-10 text-gray-400" />
                <h3 className="text-base font-bold text-gray-700">No Data Found</h3>
                <p className="text-xs text-gray-500 max-w-sm">
                  We couldn't find any matching records for your current search criteria or active filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-600 pt-2 w-full">
          <span>Showing <strong>{paginatedData.length}</strong> out of {totalEntries} entries</span>
          <div className="flex items-center gap-1 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 hover:text-indigo-900 transition disabled:opacity-40 min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full transition flex items-center justify-center touch-manipulation ${
                  currentPage === i + 1
                    ? 'bg-[#2E3192] text-white shadow-sm'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 hover:text-indigo-900 transition disabled:opacity-40 min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {selectedRecord && (
          <RecordModal 
            row={selectedRecord} 
            onClose={() => setSelectedRecord(null)} 
          />
        )}
      </AnimatePresence>

      {/* Floating Action Card Deck */}
      <FloatingCard cards={customDeckCards} rotateInterval={4000} />
      
      {/* Modals from src/components */}
      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </div>
  );
}