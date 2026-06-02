import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaAward, FaShareNodes, FaBullhorn, FaGlobe } from "react-icons/fa6";
import { LuBlocks } from "react-icons/lu";

const serviceCards = [
  {
    title: "Assessment, Certification and Accreditation",
    icon: <FaAward />,
    path: "/services-aca", 
    tabId: 1,
    textColor: "#ffff",
    accent: "#38bdf8", 
    sizeClass: "text-[9rem] md:text-[11rem]", 
    layoutClass: "md:col-start-3 md:row-start-1 p-6 flex flex-col justify-between h-[165px]"
  },
  {
    title: "Technical/Advisory Assistance and Other Support Services",
    icon: <FaBullhorn />,
    path: "/services-taaorss", 
    tabId: 4,
    textColor: "#ffff",
    accent: "#f87171", 
    sizeClass: "text-[13rem] md:text-[15rem]", 
    layoutClass: "md:col-start-3 md:row-start-2 md:row-span-2 p-6 flex flex-col justify-between h-[295px]"
  },
  {
    title: "Knowledge Management",
    icon: <FaShareNodes />,
    path: "/services-km", 
    tabId: 3,
    textColor: "#ffff",
    accent: "#DAB1DA",
    sizeClass: "text-[9rem] md:text-[11rem]",
    layoutClass: "md:col-span-1 md:row-start-3 p-6 flex flex-col justify-between h-[115px]"
  },
  {
    title: "Capability Building",
    icon: <LuBlocks />,
    path: "/cb-services", 
    tabId: 2,
    textColor: "#ffff",
    accent: "#fb923c", 
    sizeClass: "text-[9rem] md:text-[11rem]", 
    layoutClass: "md:col-span-1 md:col-start-2 md:row-start-3 p-6 flex flex-col justify-between h-[115px]"
  },
];

const CardBackgroundIcon = ({ icon, color, sizeClass, isHovered }) => (
  <div className={`absolute -right-6 -bottom-8 pointer-events-none opacity-[0.25] select-none z-0 ${sizeClass}`}>
    <motion.div
      style={{ color: color }}
      className="w-full h-full flex items-center justify-center"
      animate={isHovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {icon}
    </motion.div>
  </div>
);

// ✅ Updated Indicator: Completely static circle and arrow indicators
const CircleArrowIndicator = ({ theme = "dark" }) => {
  const circleBg = theme === "yellow-card" ? "bg-[#2e3192]" : "bg-white";
  const arrowColor = theme === "yellow-card" ? "stroke-white" : "stroke-[#2e3192]";

  return (
    <div className="absolute top-5 right-5 z-20 pointer-events-none">
      <div 
        className={`w-8 h-8 md:w-9 md:h-9 rounded-full ${circleBg} flex items-center justify-center shadow-md`}
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          className={arrowColor}
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAllHovered, setIsAllHovered] = useState(false);

  return (
    <section className="relative w-full flex items-center justify-center px-4 py-12 md:px-8 lg:px-12 bg-[#2e3192] font-['Montserrat'] overflow-hidden">
      
      <div className="relative z-10 max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Typography Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white space-y-4 lg:col-span-5 flex flex-col justify-center text-left"
        >
          <div className="space-y-1">
            <h1 className="text-4xl md:text-[3.6rem] font-black tracking-tight leading-none text-white">
              DSWD Academy
            </h1>
            <h2 className="text-4xl md:text-[3.6rem] font-black text-[#FFE066] italic leading-none pt-1">
              Services
            </h2>
          </div>
          <p className="text-sm md:text-[16px] font-medium leading-relaxed text-white/80 tracking-wide max-w-xl">
            DSWD Academy services in one portal. Simplifying processes, and making technical assistance more accessible and convenient.
          </p>
        </motion.div>

        {/* Right Layout Grid Matrix Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:col-span-7 w-full">
          
          {/* MAIN HERO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsAllHovered(true)}
            onMouseLeave={() => setIsAllHovered(false)}
            onClick={() => navigate("/all-services", { state: { defaultTabId: 0 } })}
            className="relative md:col-span-2 md:row-span-2 rounded-[2rem] p-8 h-[350px] flex flex-col justify-between cursor-pointer shadow-2xl group overflow-hidden bg-[#FFE066] text-[#1f2286] border border-black/5"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <CardBackgroundIcon 
              icon={<FaGlobe />} 
              color="#ffffff" 
              sizeClass="text-[14rem] md:text-[16rem]" 
              isHovered={isAllHovered} 
            />

            <CircleArrowIndicator theme="yellow-card" />

            <div className="z-10 mt-auto pointer-events-none">
              <h3 className="font-extrabold text-xl md:text-4xl text-left text-[#2e3192] transition-colors duration-300">
                All Services
              </h3>
              <p className="text-md text-[#1f2286]/80 text-left mt-2 leading-relaxed font-medium max-w-md">
                Browse all service categories and access the programs and interventions offered by the DSWD Academy.
              </p>
            </div>
          </motion.div>

          {/* SERVICE MATRIX BLOCKS */}
          {serviceCards.map((service, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => navigate(service.path, { state: { defaultTabId: service.tabId } })}
                style={{ backgroundColor: service.accent }}
                className={`relative rounded-[1.75rem] cursor-pointer shadow-xl group overflow-hidden border border-black/5 transition-all ${service.layoutClass}`}
                whileHover={{ y: -4 }}
              >
                <CardBackgroundIcon 
                  icon={service.icon} 
                  color="#ffffff" 
                  sizeClass={service.sizeClass} 
                  isHovered={isHovered} 
                />

                <CircleArrowIndicator theme="matrix-card" />
                
                <div className="flex flex-col justify-between h-full w-full z-10 relative pointer-events-none">
                  <div className="w-full pr-10"> 
                    <h3 
                      style={{ color: service.textColor }} 
                      className="font-black text-[14px] md:text-[15px] leading-snug text-left tracking-tight"
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Services;