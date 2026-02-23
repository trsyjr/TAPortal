// src/components/TrainingCalendar.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TABG from "../assets/TABG.png";
import News3 from "../assets/News3.png";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Multi-day events: startDate and endDate
const exampleEvents = [
  {
    id: 1,
    startDate: new Date(2026, 1, 23),
    endDate: new Date(2026, 1, 27),
    title: "TRAINING ON PRE-MARRIAGE COUNSELING BATCH 7",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "DSWD Academy Taguig (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: News3,
    colorId: 1,
  },
  {
    id: 2,
    startDate: new Date(2026, 1, 23),
    endDate: new Date(2026, 1, 27),
    title: "LOCALIZED TRAINING ON PRE-MARRIAGE COUNSELING",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "Bataan (Central Luzon)",
    tag: "WITH CPD UNITS",
    target: "Local Government Units",
    image: "/assets/valentine.jpg",
    colorId: 2,
  },
  {
    id: 3,
    startDate: new Date(2026, 2, 8),
    endDate: new Date(2026, 2, 14),
    title: "TRAINING OF TRAINERS PARENT EFFECTIVENESS SERVICE",
    description: "The Training of Trainers (ToT) on the Parent Effectiveness Service (PES) Program Facilitators equips a nationwide pool of DSWD and LGU technical trainers with the competencies to deliver standardized PES modules, facilitation methodologies, and monitoring mechanisms in line with Republic ACT No. 11908 and its Implementing Rules and Regulations. It strenghtens their capacity to provide technical assistance, train PES facilitators, and ensure consistent, quality implementation of the program across regions, provinces, and municipalities. It also supports effective parenting education and promotes the holistic development and protection of Filipino children and families.",
    venue: "Baguio City (Cordillera Administrative Region)",
    tag: "TRAINING OF TRAINERS",
    target: "Field Offices, Provincial Social Welfare and Development Office (PSWDOs)",
    image: "/assets/christmas.jpg",
    colorId: 1,
  },
  {
    id: 4,
    startDate: new Date(2026, 2, 9),
    endDate: new Date(2026, 2, 13),
    title: "LOCALIZED TRAINING ON PRE-MARRIAGE COUNSELING",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "Palompon (Eastern Visayas)",
    tag: "WITH CPD UNITS",
    target: "Local Government Units",
    image: "/assets/valentine.jpg",
    colorId: 2,
  },
];

// Tag colors
const tagColors = {
  "WITH CPD UNITS": "#EF474E",
  "TRAINING OF TRAINERS": "#5658A6",
  Pilot: "#FCF231",
};

// Bottom bar colors per event id
const eventColors = {
  1: "#B083FB",
  2: "#FF69C7",
  3: "#FF751F",
  4: "#FFB2FA",
  5: "#7DD955",
  6: "#0097B2",
};

const monthCards = [
  { title: "JAN" }, { title: "FEB" }, { title: "MAR" }, { title: "APR" },
  { title: "MAY" }, { title: "JUN" }, { title: "JUL" }, { title: "AUG" },
  { title: "SEP" }, { title: "OCT" }, { title: "NOV" }, { title: "DEC" },
];

const fullMonths = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL",
  "MAY", "JUNE", "JULY", "AUGUST",
  "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

const TrainingCalendar = () => {
  const today = new Date();
  const fixedYear = 2026;
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (containerRef.current && innerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const innerWidth = innerRef.current.scrollWidth;
      setDragConstraints({ left: -(innerWidth - containerWidth), right: 0 });
    }
  }, []);

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    return { firstDay, daysArray };
  };

  const { firstDay, daysArray } = getDaysInMonth(fixedYear, selectedMonth);

  // Only show events on their first day
  const eventsForDate = (date) => {
    return exampleEvents.filter(
      (e) => date.toDateString() === e.startDate.toDateString()
    );
  };

  // Format date as DD MMM, YYYY
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="pt-24 font-sans relative select-none">

      {/* Background */}
      <div
        className="absolute top-0 left-0 right-0 z-0 md:hidden"
        style={{
          height: "600px",
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "3rem",
          borderBottomRightRadius: "3rem",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 z-0 hidden md:block"
        style={{
          height: "630px",
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "5rem",
          borderBottomRightRadius: "5rem",
        }}
      />

      {/* Year and Title */}
      <div className="relative z-10 w-full text-center mb-16 mt-20">
        <h1 className="text-4xl md:text-[10rem] font-bold text-[#2e3192] leading-[1]">
          2026
        </h1>
        <h1 className="text-4xl md:text-7xl font-bold text-[#2e3192] mt-4">
          TRAINING CALENDAR
        </h1>
      </div>

      {/* Month Cards */}
      <section className="relative z-10 w-full mt-8">
        <div className="bg-[#2e3192] rounded-3xl w-full max-w-[100rem] mx-auto p-6 md:p-10 overflow-hidden">
          <motion.div ref={containerRef} className="overflow-hidden p-3">
            <motion.div
              ref={innerRef}
              className="flex gap-6 cursor-grab"
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.2}
            >
              {monthCards.map((card, index) => {
                const isActive = selectedMonth === index;
                return (
                  <motion.div
                    key={card.title}
                    onClick={() => setSelectedMonth(index)}
                    className={`flex-shrink-0 flex items-center justify-center rounded-3xl p-12 min-w-[10%] cursor-pointer ${
                      isActive ? "bg-[#FFE066]" : "bg-white"
                    }`}
                    whileHover={{ scale: 1.05, rotate: -4 }}
                  >
                    <h3 className="font-bold text-7xl text-center text-[#2e3192]">
                      {card.title}
                    </h3>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Month + Year Text */}
      <div className="text-center mt-10 relative z-10">
        <h2 className="text-3xl font-bold text-[#2e3192]">
          {fullMonths[selectedMonth]} {fixedYear}
        </h2>
      </div>

      {/* Calendar Grid */}
      <section className="relative z-10 mt-6 max-w-[100rem] mx-auto mb-20">
        <div className="grid grid-cols-7 text-center font-semibold mb-2">
          {weekdays.map((day) => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {daysArray.map((date) => {
            const dateEvents = eventsForDate(date);
            const isToday = date.toDateString() === today.toDateString();

            return (
              <div
                key={date}
                className={`border rounded p-4 min-h-[180px] relative ${
                  isToday
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white border-gray-300"
                }`}
              >
                <div className="font-semibold mb-2 text-lg">{date.getDate()}</div>

                {dateEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className="text-white text-sm rounded px-2 py-1 mb-1 cursor-pointer truncate"
                    style={{
                      backgroundColor: eventColors[event.colorId] || "#2e3192",
                    }}
                    onClick={() => setSelectedEvent(event)}
                    whileHover={{ scale: 1.05 }}
                  >
                    {event.title}
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden relative bg-white"
            >
              {/* Image */}
              <div className="w-full h-64 bg-gray-300 overflow-hidden relative rounded-t-2xl">
                {selectedEvent.image && (
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Close X */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-3 right-3 text-black text-3xl font-bold hover:text-red-600"
                >
                  ×
                </button>
              </div>

              {/* Card Content */}
              <div className="p-6 bg-white rounded-b-2xl relative">

                <div className="flex justify-between max-w-xl space-y-4 flex-col">

                  {/* Date | Venue */}
                  <div className="text-gray-500 text-sm">
                    <span>
                      {formatDate(selectedEvent.startDate)}
                      {selectedEvent.endDate && selectedEvent.endDate > selectedEvent.startDate
                        ? ` – ${formatDate(selectedEvent.endDate)}`
                        : ""}
                    </span>
                    {selectedEvent.venue && <> | <span>{selectedEvent.venue}</span></>}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>

                  {/* Description */}
                  {selectedEvent.description && (
                    <p className="text-gray-700">{selectedEvent.description}</p>
                  )}

                  {/* Target Participant */}
                  {selectedEvent.target && (
                    <p className="text-gray-600 font-medium">
                      <span className="font-bold">Target Participant:</span> {selectedEvent.target}
                    </p>
                  )}
                </div>

                {/* Tag stays on right */}
                {selectedEvent.tag && (
                  <span
                    className="absolute top-6 right-6 text-xs px-3 py-1 rounded text-white font-semibold whitespace-nowrap"
                    style={{
                      backgroundColor: tagColors[selectedEvent.tag] || "#2e3192",
                    }}
                  >
                    {selectedEvent.tag}
                  </span>
                )}

                {/* Bottom Thin Solid Color */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[4px] rounded-b-2xl"
                  style={{
                    backgroundColor: eventColors[selectedEvent.colorId] || "#2e3192",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainingCalendar;