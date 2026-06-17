import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, Calendar, UserCheck, Clock, X, AlignLeft, RefreshCw } from 'lucide-react';
import DABuilding from "../assets/DABuilding.jpeg";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzIj8JS8HCYoShWMb3QnEpiGv9kh101MvEag0yN6oq2odG-PnlHMDFQ9vrdM7IjGL4bg/exec?tab=calendar";

const START_HOUR = 7; 
const END_HOUR = 20;
const HOURS_TIMELINE = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
  const currentHour = START_HOUR + i;
  if (currentHour === 12) return { label: "12 PM", hour24: 12 };
  return currentHour > 12 ? { label: `${currentHour - 12} PM`, hour24: currentHour } : { label: `${currentHour} AM`, hour24: currentHour };
});

export default function TACalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); 
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [monthCoords, setMonthCoords] = useState({ top: 0, left: 0, width: 0 });
  const [yearCoords, setYearCoords] = useState({ top: 0, left: 0, width: 0 });

  const monthTriggerRef = useRef(null);
  const yearTriggerRef = useRef(null);
  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const fetchEvents = (showMask = true) => {
    if (showMask) {
      setLoading(true);
    } else {
      setIsSyncing(true);
    }
    
    fetch(APPS_SCRIPT_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response encountered an error.");
        return res.json();
      })
      .then((data) => {
        if (data.success === false) throw new Error(data.error || "Failed to parse records.");
        setEvents(Array.isArray(data) ? data : []);
     
        setLoading(false);
        setIsSyncing(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setIsSyncing(false);
      });
  };

  useEffect(() => {
    fetchEvents(true);
  }, []);

  const handleRefreshSync = () => {
    fetchEvents(false);
  };

  const handleViewModeChange = (mode) => {
    if (mode === 'day' || mode === 'week') {
      setCurrentDate(new Date());
    }
    setViewMode(mode);
  };

  const updateCoords = () => {
    if (monthTriggerRef.current) {
      const rect = monthTriggerRef.current.getBoundingClientRect();
      setMonthCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
    }
    if (yearTriggerRef.current) {
      const rect = yearTriggerRef.current.getBoundingClientRect();
      setYearCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
    }
  };

  useEffect(() => {
    if (isMonthOpen || isYearOpen) updateCoords();
  }, [isMonthOpen, isYearOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target) && monthTriggerRef.current && !monthTriggerRef.current.contains(event.target)) {
        setIsMonthOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target) && yearTriggerRef.current && !yearTriggerRef.current.contains(event.target)) {
        setIsYearOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
   
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords);
    };
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const shortMonthMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  const yearsArray = Array.from({ length: 11 }, (_, i) => year - 5 + i);

  const getEventDateKey = (dateStr) => {
    if (!dateStr || dateStr === "Recent Entry") return null;
    const match = dateStr.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
    if (match) {
      const d = parseInt(match[1], 10);
      const mStr = match[2].toLowerCase().substring(0, 3);
      const y = parseInt(match[3], 10);
      if (shortMonthMap[mStr] !== undefined) return `${y}-${shortMonthMap[mStr]}-${d}`;
    }
    const timestamp = Date.parse(dateStr);
    if (!isNaN(timestamp)) {
      const d = new Date(timestamp);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }
    return null;
  };

  const getEventTimeMetrics = (timeStr) => {
    const defaultMetrics = { topPercent: 7.14, heightPercent: 7.14, startMin: 540, endMin: 600 };
    if (!timeStr) return defaultMetrics;

    const parts = timeStr.split(/-+/);
    
    const parseSingleTime = (str) => {
      if (!str) return null;
      const match = str.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!match) return null;
      let hour = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === "PM" && hour < 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
      return (hour * 60) + minutes;
    };
    const startMinutes = parseSingleTime(parts[0]);
    if (startMinutes === null) return defaultMetrics;

    const endMinutes = parts[1] ?
      (parseSingleTime(parts[1]) || (startMinutes + 60)) : (startMinutes + 60);
    const durationMinutes = Math.max(45, endMinutes - startMinutes);
    const timelineStartMin = START_HOUR * 60; 
    const totalTimelineMin = (END_HOUR - START_HOUR + 1) * 60;
    const relativeStartMin = Math.max(0, startMinutes - timelineStartMin);
    const topPercent = (relativeStartMin / totalTimelineMin) * 100;
    const heightPercent = (durationMinutes / totalTimelineMin) * 100;

    return { topPercent, heightPercent, startMin: startMinutes, endMin: endMinutes };
  };

  const eventsByDate = events.reduce((acc, event) => {
    const key = getEventDateKey(event.date);
    if (key) {
      if (!acc[key]) acc[key] = [];
      acc[key].push(event);
    }
    return acc;
  }, {});

  const computePositionedEvents = (dayEvents) => {
    if (!dayEvents || dayEvents.length === 0) return [];
    const calculated = dayEvents.map(evt => {
      const metrics = getEventTimeMetrics(evt.time);
      return { ...evt, ...metrics };
    });
    calculated.sort((a, b) => a.startMin - b.startMin || (b.endMin - b.startMin) - (a.endMin - a.startMin));

    const columns = [];
    calculated.forEach(evt => {
      let placed = false;
      for (let i = 0; i < columns.length; i++) {
        const lastEventInCol = columns[i][columns[i].length - 1];
        if (evt.startMin >= lastEventInCol.endMin) {
          columns[i].push(evt);
          evt.colIndex = i;
          placed = true;
          break;
     
        }
      }
      if (!placed) {
        columns.push([evt]);
        evt.colIndex = columns.length - 1;
      }
    });
    calculated.forEach(evt => {
      let totalOverlapsInStack = 0;
      calculated.forEach(innerEvt => {
        if (evt.startMin < innerEvt.endMin && evt.endMin > innerEvt.startMin) {
          totalOverlapsInStack++;
        }
      });
      evt.totalCols = Math.max(columns.length, totalOverlapsInStack);
    });
    return calculated;
  };

  const handleMonthChange = (monthIndex) => {
    setCurrentDate(new Date(year, monthIndex, 1));
    setIsMonthOpen(false);
  };

  const handleYearChange = (yearValue) => {
    setCurrentDate(new Date(yearValue, month, 1));
    setIsYearOpen(false);
  };

  const handlePrevRange = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (viewMode === 'week') {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(currentDate.getDate() - 7);
      setCurrentDate(prevWeek);
    } else {
      const prevDay = new Date(currentDate);
      prevDay.setDate(currentDate.getDate() - 1);
      setCurrentDate(prevDay);
    }
  };

  const handleNextRange = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (viewMode === 'week') {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      setCurrentDate(nextWeek);
    } else {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      setCurrentDate(nextDay);
    }
  };

  const handleEventClick = (e, eventItem) => {
    e.stopPropagation();
    setSelectedEvent(eventItem);
    setIsDescExpanded(false); 
    setIsModalOpen(true);
  };

  const isToday = (d, m, y) => {
    const today = new Date();
    return today.getDate() === d && today.getMonth() === m && today.getFullYear() === y;
  };

  const gridCells = [];
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  if (viewMode === 'month') {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      gridCells.push({ day: daysInPrevMonth - i, monthContext: month === 0 ? 11 : month - 1, yearContext: month === 0 ? year - 1 : year, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      gridCells.push({ day: i, monthContext: month, yearContext: year, isCurrentMonth: true });
    }
    while (gridCells.length % 7 !== 0) {
      const nextCount = gridCells.length - (firstDayOfMonth + daysInMonth);
      gridCells.push({ day: nextCount + 1, monthContext: month === 11 ? 0 : month + 1, yearContext: month === 11 ? year + 1 : year, isCurrentMonth: false });
    }
  } else if (viewMode === 'week') {
    for (let i = 0; i < 7; i++) {
      const dayInstance = new Date(startOfWeek);
      dayInstance.setDate(startOfWeek.getDate() + i);
      gridCells.push({ day: dayInstance.getDate(), monthContext: dayInstance.getMonth(), yearContext: dayInstance.getFullYear(), isCurrentMonth: true });
    }
  }

  const worksInProgress = loading || isSyncing;
  const rawDescriptionText = selectedEvent ?
    (selectedEvent.issue || selectedEvent.description || "") : "";

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative font-sans antialiased" style={{ backgroundImage: `url(${DABuilding})` }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .overflow-y-auto, .max-h-64, .custom-scrollbar {
          scrollbar-width: thin !important;
          scrollbar-color: #ef1c24 rgba(0, 0, 0, 0.1) !important;
        }
        .overflow-y-auto::-webkit-scrollbar, .max-h-64::-webkit-scrollbar, .custom-scrollbar::-webkit-scrollbar {
          width: 6px !important;
          height: 6px !important;
          display: block !important;
        }
        .overflow-y-auto::-webkit-scrollbar-track, .max-h-64::-webkit-scrollbar-track, .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05) !important;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb, .max-h-64::-webkit-scrollbar-thumb, .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ef1c24 !important;
          border-radius: 9999px !important;
        }
      `}} />

      <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Outer padding applied evenly top and bottom (py-8 md:py-12) to create balanced vertical spacing */}
      <div className="relative z-10 w-full max-w-[95%] 2xl:max-w-[1600px] mx-auto px-2 md:px-4 pt-36 md:pt-36 pb-16 md:pb-16">
        <div className="w-full bg-white/60 backdrop-blur-[4px] rounded-3xl shadow-2xl border border-white/60 overflow-hidden min-h-[500px] relative flex flex-col">
          
          <div className="px-4 py-5 md:px-6 border-b border-slate-300 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/70">
           
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
              <div className="flex items-center space-x-2 relative">
                <div className="w-3 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: '#2f3193' }} />
               
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight pr-12">Technical Assistance Calendar</h1>
              </div>
              
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-slate-200/90 w-[120px] h-9 p-0.5 rounded-xl flex items-center justify-between border border-slate-300 shadow-md flex-shrink-0">
                  
                  <button onClick={handlePrevRange} className="w-9 h-full text-slate-800 text-sm font-black flex items-center justify-center rounded-lg hover:bg-black/5 active:scale-95 transition-all outline-none border-0">&#8249;</button>
                  <div className="w-px h-4 bg-slate-300" />
    
                  <button onClick={handleRefreshSync} title="Sync/Refresh Records" className="w-9 h-full text-slate-800 flex items-center justify-center rounded-lg hover:bg-black/5 active:scale-95 transition-all outline-none border-0">
                    <RefreshCw size={14} className={`text-slate-7700 ${worksInProgress ? 'animate-spin text-[#ef1c24]' : ''}`} strokeWidth={2.5} />
                  </button>
                  <div className="w-px h-4 bg-slate-300" />
                  <button onClick={handleNextRange} className="w-9 h-full text-slate-800 text-sm font-black flex items-center justify-center rounded-lg hover:bg-black/5 active:scale-95 transition-all outline-none border-0">&#8250;</button>
                </div>

                <span className="text-sm md:text-base font-extrabold text-slate-800 tracking-tight px-1 whitespace-nowrap">
                  {viewMode === 'month' && `${monthNames[month]} ${year}`}
                  {viewMode === 'week' && `Week of ${monthNames[gridCells[0]?.monthContext || 0]} ${gridCells[0]?.day}, ${year}`}
                  {viewMode === 'day' && `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <div className="bg-slate-200/90 w-full sm:w-52 h-9 p-0.5 rounded-xl grid grid-cols-3 border border-slate-300 shadow-md">
                {['day', 'week', 'month'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleViewModeChange(mode)}
                    className={`w-full h-full rounded-lg text-xs font-black capitalize transition-all duration-150 outline-none border-0 ${
                      viewMode === mode 
                        ? 'text-white shadow-md scale-[1.03] active:scale-95' 
                        : 'text-slate-700 hover:text-slate-900 hover:bg-black/5'
                    }`}
                    style={viewMode === mode ? { backgroundColor: '#2f3193' } : {}}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <div className="bg-slate-200/90 h-9 p-0.5 rounded-xl border border-slate-300 shadow-md flex items-center flex-1 sm:min-w-[110px]">
                  <button 
                    ref={monthTriggerRef} 
                    onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }} 
                    className="w-full h-full px-3 rounded-lg text-xs font-black text-slate-800 flex items-center justify-between hover:bg-black/5 active:scale-[0.98] transition-all border-0 outline-none"
                  >
                    <span>{monthNames[month]}</span>
                    <svg className="w-2.5 h-2.5 ml-2 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>

                <div className="bg-slate-200/90 h-9 p-0.5 rounded-xl border border-slate-300 shadow-md flex items-center flex-1 sm:min-w-[85px]">
                  <button 
                    ref={yearTriggerRef} 
                    onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }} 
                    className="w-full h-full px-3 rounded-lg text-xs font-black text-slate-800 flex items-center justify-between hover:bg-black/5 active:scale-[0.98] transition-all border-0 outline-none"
                  >
                    <span>{year}</span>
                    <svg className="w-2.5 h-2.5 ml-2 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex-1 w-full h-full flex flex-col overflow-x-hidden">
  
            {worksInProgress && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-[1px] pointer-events-none select-none transition-all">
                <div className="px-5 py-3 rounded-2xl bg-white/90 text-[#2f3193] shadow-2xl border border-slate-200/80 flex items-center gap-3 animate-pulse pointer-events-auto">
                  <RefreshCw size={16} className="animate-spin text-[#ef1c24]" strokeWidth={3} />
                  <span className="text-xs font-black uppercase tracking-wider">Syncing records...</span>
                </div>
              </div>
            )}

            <div className={`w-full flex-1 flex flex-col transition-opacity duration-300 ${worksInProgress ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              
              {viewMode === 'month' && (
                <div className="flex flex-col bg-transparent w-full overflow-x-hidden">
                  <div className="grid grid-cols-7 text-center text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-widest text-white py-3.5" style={{ backgroundColor: '#2f3193' }}>
                    {daysOfWeekNames.map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 bg-white/60 divide-x divide-y divide-slate-300 border-t border-slate-300 w-full overflow-x-hidden">
                    {gridCells.map((cell, idx) => {
                      const dayKey = `${cell.yearContext}-${cell.monthContext}-${cell.day}`;
                      const dayEvents = eventsByDate[dayKey] || [];
                      const currentDayIsToday = isToday(cell.day, cell.monthContext, cell.yearContext);

                      return (
                        <div key={idx} className={`min-h-[100px] sm:min-h-[140px] md:min-h-[155px] p-1 md:p-2 flex flex-col justify-between transition-all border-b border-r border-slate-300 ${cell.isCurrentMonth ? 'bg-transparent text-slate-900' : 'bg-black/[0.07] text-slate-400 font-medium'}`}>
                          <div className="w-full flex justify-start mb-1">
                            <span className={`text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full ${currentDayIsToday ? 'text-white font-black shadow-sm' : ''}`} style={currentDayIsToday ? { backgroundColor: '#ef1c24' } : {}}>
                              {cell.day}
                            </span>
                          </div>
    
                          <div className="space-y-1 mt-1 flex-1 overflow-y-auto overflow-x-hidden max-h-[60px] sm:max-h-[100px] md:max-h-[110px] custom-scrollbar">
                            {dayEvents.map((evt, eIdx) => (
                              <button 
                                key={eIdx} 
                                onClick={(e) => handleEventClick(e, evt)} 
                                title={`${evt.title} (${evt.time})`}
                                style={{ backgroundColor: '#f4ec59', color: '#2f3193' }}
                                className="w-full text-left text-[10px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shadow-sm truncate block border-0 transition hover:brightness-95 active:scale-[0.98]"
                              >
                                <span className="mr-1 hidden sm:inline">Ticket:</span>
                                <span>{evt.ticketNumber || 'N/A'}</span> 
                                <span className="text-[9px] sm:text-[10px] font-bold opacity-80 ml-1">({evt.time || 'N/A'})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {viewMode === 'week' && (
                <div className="flex flex-col bg-transparent w-full">
                  <div className="grid grid-cols-[55px_1fr] sm:grid-cols-[80px_1fr] border-b border-slate-300 text-white w-full" style={{ backgroundColor: '#2f3193' }}>
                    <div className="text-[9px] sm:text-[10px] text-white/70 font-black flex items-center justify-center border-r border-white/20">GMT+08</div>
                    <div className="grid grid-cols-7 text-center py-2">
                      {gridCells.map((cell, i) => {
                        const currentDayIsToday = isToday(cell.day, cell.monthContext, cell.yearContext);
                        return (
                          <div key={i} className="flex flex-col items-center border-r border-white/20 last:border-0 px-0.5">
                            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-white/70">{daysOfWeekNames[i]}</span>
                            <span className={`text-xs sm:text-sm font-black mt-0.5 w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full ${currentDayIsToday ? 'text-white bg-[#ef1c24] shadow-md' : 'text-white'}`}>
                              {cell.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-[55px_1fr] sm:grid-cols-[80px_1fr] max-h-[600px] overflow-y-auto overflow-x-hidden relative min-h-[500px] w-full custom-scrollbar">
                    <div className="flex flex-col border-r border-slate-300 bg-white/50">
                      {HOURS_TIMELINE.map((h, i) => (
                        <div key={i} className="h-16 text-[9px] sm:text-[11px] font-bold text-slate-800 pr-1.5 sm:pr-2 pt-1 text-right border-b border-slate-300/80 select-none">
                          {h.label}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 relative divide-x divide-slate-300 bg-white/60">
                      {Array.from({ length: HOURS_TIMELINE.length }).map((_, rIdx) => (
                        <div key={rIdx} className="absolute left-0 right-0 border-b border-slate-300/80 pointer-events-none" style={{ top: `${rIdx * 64}px`, height: '64px' }} />
                      ))}

                      {gridCells.map((cell, cIdx) => {
                        const dayKey = `${cell.yearContext}-${cell.monthContext}-${cell.day}`;
                        const rawEvents = eventsByDate[dayKey] || [];
                        const positionedEvents = computePositionedEvents(rawEvents);
                        return (
                          <div key={cIdx} className="h-[896px] relative">
                            {positionedEvents.map((evt, eIdx) => {
                              const widthPct = 100 / (evt.totalCols || 1);
                              const calculatedWidth = `${widthPct - 2}%`;
                              const calculatedLeft = `${(evt.colIndex || 0) * widthPct + 1}%`;
                              const calculatedTop = `${evt.topPercent}%`;

                              return (
                                <div
                                  key={eIdx}
                                  onClick={(e) => handleEventClick(e, evt)}
                                  style={{ 
                                    top: calculatedTop, 
                                    height: `${evt.heightPercent}%`, 
                                    backgroundColor: '#f4ec59',
                                    color: '#2f3193',
                                    width: calculatedWidth, 
                                    left: calculatedLeft,
                                    zIndex: 10 + (evt.colIndex || 0)
                                  }}
                                  className="absolute border-none rounded p-0.5 sm:p-1.5 md:p-2 overflow-hidden shadow-sm cursor-pointer select-none text-left transform transition hover:scale-[1.04] hover:!z-50 active:scale-95"
                                >
                                  <div className="text-[8px] sm:text-[10px] md:text-[11px] font-black truncate">#{evt.ticketNumber || 'N/A'}</div>
                                  <div className="text-[8px] md:text-[10px] font-bold opacity-90 truncate hidden sm:block">{evt.time}</div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'day' && (
                <div className="flex flex-col bg-transparent w-full">
                  <div className="grid grid-cols-[55px_1fr] sm:grid-cols-[80px_1fr] border-b border-slate-300 py-3 text-white w-full" style={{ backgroundColor: '#2f3193' }}>
                    <div className="text-[10px] text-white/70 font-black text-center border-r border-white/20 flex items-center justify-center">GMT+08</div>
                    <div className="pl-4 sm:pl-6 flex items-center space-x-3">
                      <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-widest text-white/70">{daysOfWeekNames[currentDate.getDay()]}</span>
                      <span className="text-base sm:text-xl font-black bg-[#ef1c24] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-md">{currentDate.getDate()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[55px_1fr] sm:grid-cols-[80px_1fr] max-h-[600px] overflow-y-auto overflow-x-hidden relative min-h-[500px] w-full custom-scrollbar">
                    <div className="flex flex-col border-r border-slate-300 bg-white/50">
                      {HOURS_TIMELINE.map((h, i) => (
                        <div key={i} className="h-16 text-[9px] sm:text-[11px] font-bold text-slate-800 pr-1.5 sm:pr-2 pt-1 text-right border-b border-slate-300/80 select-none">
                          {h.label}
                        </div>
                      ))}
                    </div>

                    <div className="relative h-[896px] bg-white/60 w-full">
                      {Array.from({ length: HOURS_TIMELINE.length }).map((_, rIdx) => (
                        <div key={rIdx} className="absolute left-0 right-0 border-b border-slate-300/80 pointer-events-none" style={{ top: `${rIdx * 64}px`, height: '64px' }} />
                      ))}

                      {(() => {
                        const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
                        const rawEvents = eventsByDate[dayKey] || [];
                        const positionedEvents = computePositionedEvents(rawEvents);
                        return positionedEvents.map((evt, eIdx) => {
                          const widthPct = 98 / (evt.totalCols || 1);
                          const calculatedWidth = `${widthPct - 1}%`;
                          const calculatedLeft = `${1 + ((evt.colIndex || 0) * widthPct)}%`;
                          const calculatedTop = `${evt.topPercent}%`;

                          return (
                            <div
                              key={eIdx}
                              onClick={(e) => handleEventClick(e, evt)}
                              style={{ 
                                top: calculatedTop, 
                                height: `${evt.heightPercent}%`, 
                                width: calculatedWidth, 
                                left: calculatedLeft, 
                                backgroundColor: '#f4ec59',
                                color: '#2f3193',
                                zIndex: 10 + (evt.colIndex || 0)
                              }}
                              className="absolute border-none rounded-xl p-1.5 sm:p-2 md:p-2.5 shadow-md cursor-pointer select-none text-left transform transition hover:brightness-95 hover:!z-50 active:scale-[0.99] overflow-hidden flex flex-col justify-start"
                            >
                              <div className="text-[10px] sm:text-xs font-black flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 w-full border-b border-slate-900/10 pb-0.5 mb-1">
                                <span className="truncate max-w-[70%]">Ticket #{evt.ticketNumber || 'N/A'} <span className="hidden sm:inline">- {evt.title}</span></span>
                                <span className="px-1 py-0.5 rounded text-[9px] font-black bg-black/5 whitespace-nowrap flex-shrink-0" style={{ color: '#2f3193' }}>{evt.time}</span>
                              </div>
                              <div className="text-[9px] sm:text-[11px] font-black opacity-80 truncate w-full">{evt.office} <span className="hidden sm:inline">• Assigned: {evt.assignedFocal}</span></div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {isMonthOpen && (
        <div 
          ref={monthDropdownRef} 
          className="fixed bg-white border border-slate-200 rounded-xl shadow-2xl py-1 overflow-y-auto overflow-x-hidden max-h-64 custom-scrollbar" 
          style={{ top: `${monthCoords.top + 6}px`, left: `${monthCoords.left}px`, width: `${monthCoords.width}px`, zIndex: 9999 }}
        >
          {monthNames.map((name, index) => (
            <button key={index} onClick={() => handleMonthChange(index)} className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${index === month ? 'text-white' : 'text-slate-800 hover:bg-slate-50'}`} style={index === month ? { backgroundColor: '#2f3193' } : {}}>{name}</button>
          ))}
        </div>
      )}

      {isYearOpen && (
        <div 
          ref={yearDropdownRef} 
          className="fixed bg-white border border-slate-200 rounded-xl shadow-2xl py-1 overflow-y-auto overflow-x-hidden max-h-64 custom-scrollbar" 
          style={{ top: `${yearCoords.top + 6}px`, left: `${yearCoords.left}px`, width: `${yearCoords.width}px`, zIndex: 9999 }}
        >
          {yearsArray.map((yr) => (
            <button key={yr} onClick={() => handleYearChange(yr)} className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${yr === year ? 'text-white' : 'text-slate-800 hover:bg-slate-50'}`} style={yr === year ? { backgroundColor: '#2f3193' } : {}}>{yr}</button>
          ))}
        </div>
      )}

      {/* MODAL CONTAINER */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)] max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col border-0">
       
            <div className="p-6 pb-2 flex items-start justify-between bg-gradient-to-b from-slate-50 to-white flex-shrink-0">
              <div className="space-y-2 max-w-[85%]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm" style={{ backgroundColor: '#2f3193' }}>
                    Ticket #{selectedEvent.ticketNumber}
                  </span>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 flex items-center gap-1" style={{ color: '#2f3193' }}>
                    <Clock size={11} strokeWidth={2.5} /> {selectedEvent.time}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-[#ef1c24] hover:text-white flex items-center justify-center transition-all duration-200 border-0 outline-none flex-shrink-0"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-6 pt-2 space-y-3 flex-1 overflow-y-auto w-full custom-scrollbar">
              
              {rawDescriptionText && (
                <div className="bg-slate-50 p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row items-start gap-3.5 border-0 w-full shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-700 flex-shrink-0">
                    <AlignLeft size={20} strokeWidth={2.5} />
                  </div>
 
                  <div className="flex-1 w-full min-w-0">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Issues / Concern</span>
                    <p className="text-sm md:text-base font-semibold text-slate-800 w-full break-words whitespace-pre-wrap leading-relaxed text-left">
                      {isDescExpanded 
                        ? rawDescriptionText 
                        : (rawDescriptionText.length > 50 
                            ? `${rawDescriptionText.substring(0, 50)}...` 
                            : rawDescriptionText
                        )
                      }
                    </p>
                    {rawDescriptionText.length > 50 && (
                      <button
                        onClick={() => setIsDescExpanded(!isDescExpanded)}
                        className="mt-2 text-sm font-extrabold text-[#ef1c24] hover:underline focus:outline-none block bg-transparent border-0 p-0 cursor-pointer"
                      >
                        {isDescExpanded ? 'See less' : 'See more'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3 border-0 w-full">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0" style={{ color: '#2f3193' }}>
                  <User size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Requestor</span>
                  <span className="text-sm font-bold text-slate-800 block truncate mt-0.5">{selectedEvent.requestor}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3 border-0 w-full">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0" style={{ color: '#2f3193' }}>
                  <Briefcase size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Office / Bureau / Division</span>
                  <span className="text-sm font-bold text-slate-800 block truncate mt-0.5">{selectedEvent.office}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3 border-0 w-full">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0" style={{ color: '#2f3193' }}>
                  <UserCheck size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Assigned Focal</span>
                  <span className="text-sm font-bold text-slate-800 block truncate mt-0.5">{selectedEvent.assignedFocal}</span>
                </div>
              </div>

              {selectedEvent.meetingLink && (
                <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-3.5 border-0 w-full">
                  <div className="flex items-center space-x-3 min-w-0 w-full">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-600 flex-shrink-0">
                      <Calendar size={18} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Meeting Link</span>
                      <span className="text-xs font-medium text-slate-500 block truncate mt-0.5">{selectedEvent.meetingLink}</span>
                    </div>
                  </div>
                  <a 
                    href={selectedEvent.meetingLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 text-xs font-black text-white rounded-xl shadow-md transition-all active:scale-[0.98] text-center no-underline block"
                    style={{ backgroundColor: '#2f3193' }}
                  >
                    Join Meeting
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}