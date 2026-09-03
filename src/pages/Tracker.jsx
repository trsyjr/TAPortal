import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight, Loader2, Calendar } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxpmS2obDD3aAZmGpsRZsFWoQ9DivjX9Mir3wWuQXsEUD5Bq28c0-tzQL2_Kj3Mx-lDjA/exec";

export default function Tracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rawData, setRawData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Shared Date Filters for Graphs
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedMonth, setSelectedMonth] = useState('ALL');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const monthsList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  // Flexible fractional column template for clean horizontal spacing without pinching
  const gridTemplateColumns = "1fr 1.2fr 2.2fr 1.2fr 1fr 1fr 1.8fr 2.2fr 1fr";

  const fetchData = async (isInitial = false) => {
    if (isInitial) setLoading(true);

    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Failed to fetch sheet data");
      
      const resData = await res.json();
      setRawData(resData.rows || []);
      
      if (resData.years && resData.years.length > 0) {
        setAvailableYears(resData.years);
      }

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
    const intervalId = setInterval(() => fetchData(false), 5000);
    return () => clearInterval(intervalId);
  }, []);

  const { lineChartData, barChartData, filteredByDateCount } = useMemo(() => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    const monthlyMap = months.map(m => ({
      month: m,
      "Activity Proposal": 0,
      "Training Design": 0,
      "Other Documents": 0
    }));

    const proponentMap = {};
    let matchedCount = 0;

    rawData.forEach(row => {
      const rowYear = row._year;
      const rowMonthIdx = row._monthIndex;

      if (selectedYear !== 'ALL' && rowYear !== selectedYear) return;
      if (selectedMonth !== 'ALL' && rowMonthIdx !== parseInt(selectedMonth, 10)) return;

      matchedCount++;

      const proponent = row['Proponent'] ? row['Proponent'].toString().trim().toUpperCase() : 'OTHER';
      proponentMap[proponent] = (proponentMap[proponent] || 0) + 1;

      if (rowMonthIdx >= 0 && rowMonthIdx < 12) {
        const title = row['Title of Activity'] ? row['Title of Activity'].toString().toUpperCase() : '';
        if (title.includes('ACTIVITY PROPOSAL')) {
          monthlyMap[rowMonthIdx]['Activity Proposal']++;
        } else if (title.includes('TRAINING DESIGN') || title.includes('TRAINING AND PLANNING')) {
          monthlyMap[rowMonthIdx]['Training Design']++;
        } else {
          monthlyMap[rowMonthIdx]['Other Documents']++;
        }
      }
    });

    const maxCount = Math.max(...Object.values(proponentMap), 1);
    const sortedProponents = Object.entries(proponentMap)
      .map(([code, count]) => ({
        code,
        count,
        percentage: Math.round((count / maxCount) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    return {
      lineChartData: monthlyMap,
      barChartData: sortedProponents,
      filteredByDateCount: matchedCount
    };
  }, [rawData, selectedYear, selectedMonth]);

  const tableData = rawData.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalEntries = tableData.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[#EBECEF] py-8 font-sans text-gray-800 w-full flex justify-center">
      {/* Expanded Outer Container for Full Desktop Spread */}
      <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-16 space-y-8 pt-28 pb-10">

        {/* TOP DASHBOARD SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
          
          {/* Header Description */}
          <div className="lg:col-span-5 bg-transparent xl:pr-4 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#2E3192] leading-tight">
                Activity Proposal<br />
                and Design <span className="text-red-500 italic">Tracking</span>
              </h1>
              <p className="mt-5 text-sm sm:text-base xl:text-lg text-gray-800 leading-relaxed font-medium">
                Track the status of activity proposals and training designs currently under review by the DSWD Academy. 
                This page provides proponent OBSUs and FOs with a centralized view of their submitted documents, 
                assigned reviewer, current review status, expected action, and latest updates.
              </p>
              <p className="mt-4 text-sm sm:text-base xl:text-lg text-gray-800 leading-relaxed font-medium">
                Use the information provided to monitor the progress of your submission and identify any action or 
                revisions that may be needed from the proponent.
              </p>
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="lg:col-span-4 bg-[#2E3192] text-white p-6 rounded-2xl shadow-md relative flex flex-col justify-between">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-start text-xs tracking-wider uppercase font-semibold">
                <span>MOST REQUESTED DOCUMENT</span>
                <div className="text-right text-[10px] space-y-0.5">
                  <div className="text-yellow-400 font-bold italic">REVIEW OF ACTIVITY PROPOSAL</div>
                  <div className="text-blue-300 font-bold italic">REVIEW OF TRAINING DESIGN</div>
                  <div className="text-red-400 font-bold italic">OTHER DOCUMENTS</div>
                </div>
              </div>

              {/* DATE FILTERS */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-blue-800/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-300" />
                  <span className="text-xs text-blue-200 font-medium">Filter Charts:</span>
                </div>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-indigo-900/80 text-white text-xs rounded px-2 py-1 border border-blue-600/50 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Years</option>
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>

                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-indigo-900/80 text-white text-xs rounded px-2 py-1 border border-blue-600/50 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All</option>
                  {monthsList.map((m, idx) => (
                    <option key={m} value={idx}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full h-52 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#a5b4fc" fontSize={11} tickLine={false} />
                  <YAxis stroke="#a5b4fc" fontSize={11} tickLine={false} domain={[0, 'auto']} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e1b4b', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="Activity Proposal" stroke="#FBBF24" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Training Design" stroke="#60A5FA" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Other Documents" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="lg:col-span-3 bg-[#2E3192] text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs tracking-wider uppercase font-semibold text-gray-300 border-b border-blue-800/60 pb-2 mb-3">
                <span>MOST REQUEST RECEIVED</span>
                <span>COUNT</span>
              </div>

              <div className="space-y-3.5 max-h-52 overflow-y-auto pr-1">
                {barChartData.length > 0 ? (
                  barChartData.map((item) => (
                    <div key={item.code} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="truncate">{item.code}</span>
                        <span>{item.count}</span>
                      </div>
                      <div className="w-full h-2 bg-indigo-950 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.4 }}
                          className="h-full bg-gradient-to-r from-blue-400 to-indigo-200 rounded-full"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-300 italic pt-2">No records found</div>
                )}
              </div>
            </div>

            <div className="mt-4 text-right">
              <div className="text-4xl font-extrabold tracking-tight">{filteredByDateCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-300 font-semibold">
                FILTERED REQUEST COUNT
              </div>
            </div>
          </div>

        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 items-stretch sm:items-center w-full">
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-full shadow-sm flex items-center justify-center gap-2 text-xs font-semibold transition border border-gray-200">
            <span>Filter</span>
            <Filter className="w-4 h-4" />
          </button>

          <div className="relative w-full sm:w-80 md:w-96">
            <input
              type="text"
              placeholder="Search table records..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white pl-6 pr-10 py-2.5 rounded-full shadow-sm text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200"
            />
            <Search className="w-4 h-4 text-indigo-900 absolute right-4 top-3" />
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="w-full overflow-x-auto rounded-xl shadow-sm border border-gray-200/50">
          <div className="min-w-[1100px] space-y-3">
            
            {/* TABLE HEADER */}
            <div 
              className="grid gap-4 px-6 py-4 bg-white rounded-xl text-xs font-bold text-gray-700 items-center text-left"
              style={{ gridTemplateColumns }}
            >
              <div>Proponent</div>
              <div>DRN</div>
              <div>Title of Activity</div>
              <div>Reviewer</div>
              <div>Status</div>
              <div>As of</div>
              <div>Expected Actions from Proponent</div>
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

            {/* TABLE ROWS */}
            {!loading && !error && paginatedData.map((row, index) => {
              const isEven = index % 2 === 0;
              const bgColor = isEven ? 'bg-[#2E3192]' : 'bg-white';
              const textColor = isEven ? 'text-white' : 'text-gray-800';

              return (
                <motion.div
                  key={row.id || index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`grid gap-4 p-5 rounded-xl text-xs items-center ${bgColor} ${textColor}`}
                  style={{ gridTemplateColumns }}
                >
                  <div className="font-bold truncate">{row['Proponent'] || '--'}</div>
                  <div className="font-semibold break-words">{row['DRN'] || '--'}</div>
                  <div className="font-bold uppercase leading-snug">{row['Title of Activity'] || '--'}</div>
                  <div className="break-all">{row['Reviewer'] || '--'}</div>
                  <div className="font-medium">{row['Status'] || '--'}</div>
                  <div className="font-semibold">{row['As of'] || '--'}</div>
                  <div>{row['Expected Actions from Proponent'] || '--'}</div>
                  <div className="text-left break-words">
                    {row['Comments and/or Recommendation of the Academy'] || '--'}
                  </div>
                  <div className="italic text-xs break-words">{row['Remarks'] || '--'}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-4 text-xs font-semibold text-gray-600 pt-2 w-full">
          <span>Showing <strong>{paginatedData.length}</strong> out of {totalEntries} entries</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 hover:text-indigo-900 transition disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 rounded-full transition flex items-center justify-center ${
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
              className="p-1.5 hover:text-indigo-900 transition disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}