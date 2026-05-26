import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaAward, FaShareNodes, FaBullhorn } from "react-icons/fa6";
import { LuBlocks } from "react-icons/lu";

const serviceCards = [
  {
    title: "Assessment, Certification and Accreditation",
    icon: <FaAward />,
    path: "/cb-services", 
    tabId: 1,
    accent: "#4f46e5",
    polyConfig: { baseScale: 2.2 },
    decor: (color) => (
      <g stroke={color} fill="none" strokeWidth="1.5">
        <path d="M40,40 L40,160 L160,160" strokeWidth="1" opacity="0.3" />
        <rect x="55" y="120" width="20" height="40" opacity="0.4" />
        <rect x="85" y="100" width="20" height="60" opacity="0.6" />
        <rect x="115" y="70" width="20" height="90" opacity="0.8" />
        <motion.path
          d="M40,140 L75,125 L105,105 L135,75"
          strokeWidth="2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.circle
          cx="135" cy="75" r="6"
          fill={color}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </g>
    )
  },
  {
    title: "Capability Building",
    icon: <LuBlocks />,
    path: "/cb-services", 
    tabId: 2,
    accent: "#06b6d4",
    polyConfig: { baseScale: 1.5 },
    decor: (color) => (
      <g stroke={color} fill="none" strokeWidth="1.5">
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={40 + i * 45}
            y={120 - i * 30}
            width="35"
            height={60 + i * 30}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </g>
    )
  },
  {
    title: "Knowledge Management",
    icon: <FaShareNodes />,
    path: "/cb-services", 
    tabId: 3,
    accent: "#e11d48",
    polyConfig: { baseScale: 1.5 },
    decor: (color) => (
      <g stroke={color} fill="none" strokeWidth="1.2">
        <circle cx="100" cy="100" r="80" />
        <ellipse cx="100" cy="100" rx="80" ry="30" />
        <ellipse cx="100" cy="100" rx="30" ry="80" />
        <motion.circle
          cx="100" cy="100" r="10"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </g>
    )
  },
  {
    title: "Technical/Advisory Assistance and Other Support Services",
    icon: <FaBullhorn />,
    path: "/cb-services", 
    tabId: 4,
    accent: "#FFE066",
    polyConfig: { baseScale: 1.5 },
    decor: (color) => (
      <g stroke={color} fill="none" strokeWidth="1.5">
        <circle cx="100" cy="100" r="25" />
        {[50, 75, 100].map((r, i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r={r}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
        <path d="M40,40 L60,60 M160,160 L140,140 M40,160 L60,140 M160,40 L140,60" opacity="0.5" />
      </g>
    )
  },
];

const BrandedDecor = ({ service, isHovered }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.2]">
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute w-full h-full -right-10 -top-10"
      style={{ originX: "80%", originY: "20%" }}
      variants={{
        hover: { 
          scale: service.polyConfig.baseScale * 1.2,
        },
        initial: { 
          scale: service.polyConfig.baseScale,
        }
      }}
      animate={isHovered ? "hover" : "initial"}
      transition={{ duration: 0.5, ease: "easeOut" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {service.decor(service.accent)}
    </motion.svg>
  </div>
);

const Services = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative w-full flex items-center justify-center px-6 py-20 lg:px-24 overflow-hidden bg-[#2e3192] font-['Montserrat']">
      <div className="relative z-10 max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white space-y-6"
        >
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
              DSWD Academy
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold text-[#FFE066] italic leading-tight">
              Services
            </h2>
          </div>
          <p className="text-base md:text-lg font-medium opacity-80 max-w-lg leading-relaxed tracking-wide">
            Empowering social welfare professionals through data-driven assessment, 
            capacity enhancement, and strategic technical support.
          </p>
        </motion.div>

        {/* Right Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {serviceCards.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(service.path, { state: { defaultTabId: service.tabId } })}
              className="relative rounded-[1.5rem] p-8 h-56 flex flex-col justify-start gap-6 cursor-pointer shadow-2xl group overflow-hidden border border-white/20 bg-white"
              whileHover={{ y: -10 }}
            >
              <BrandedDecor 
                service={service} 
                isHovered={hoveredIndex === i} 
              />

              {/* Icon Container */}
              <motion.div
                animate={hoveredIndex === i ? { rotate: 15, scale: 1.1 } : { rotate: 0, scale: 1 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-3xl z-10 shadow-lg"
                style={{ backgroundColor: service.accent }}
              >
                {service.icon}
              </motion.div>

              {/* Service Title */}
              <div className="z-10 mt-auto">
                <h3 className="text-[#2e3192] font-extrabold text-sm md:text-[20px] leading-snug text-left group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;