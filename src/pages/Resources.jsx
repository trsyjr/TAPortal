import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePollVertical,
  faBookOpen,
  faChartPie,
  faCommentDots,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const icons = [
  { icon: faSquarePollVertical, label: "Chart", size: "text-[15rem]", color: "text-[#ee1c25]" },
  { icon: faBookOpen, label: "Book", size: "text-[10rem]", color: "text-[#2e3192]" },
  { icon: faChartPie, label: "Pie", size: "text-[15rem]", color: "text-[#FFE066]" },
  { icon: faCommentDots, label: "Comments", size: "text-[13rem]", color: "text-[#ee1c25]" },
  { icon: faGear, label: "Gear", size: "text-[10rem]", color: "text-[#2e3192]" },
];

// Desktop circular positions
const positionsDesktop = [
  { x: 0, y: -220 },    // top
  { x: 250, y: -80 },   // top-right
  { x: 160, y: 180 },   // bottom-right
  { x: -160, y: 180 },  // bottom-left
  { x: -250, y: -80 },  // top-left
];

const KnowledgeBank = () => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Swap positions only for desktop carousel
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const mobileIconSize = "text-4xl";

  return (
    <div className="min-h-screen px-6 lg:px-20 py-16 lg:py-- flex flex-col gap-12 lg:gap-16 items-center justify-center">

      {/* MOBILE: ICONS SECTION ABOVE TEXT */}
      {isMobile && (
        <div className="w-full overflow-hidden py-8">
          <motion.div
            className="flex gap-12"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            {icons.concat(icons).map((item, i) => (
              <div key={i} className={`flex-shrink-0 ${mobileIconSize} ${item.color}`}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className={`flex flex-col lg:flex-row w-full max-w-[100rem]`}>
        {/* LEFT SIDE: Text */}
        <div className="flex-1 max-w-5xl text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-[#2e3192]">
            Resources for Capability Building Technical Assistance
          </h1>

          <p className="text-black mb-4 leading-relaxed">
            This page provides access to curated resources that support the
            planning, implementation, and monitoring of capability building
            initiatives. The materials available here are intended to guide
            clients in understanding technical assistance processes, complying
            with applicable standards, and enhancing the quality of their
            learning and development interventions.
          </p>

          <p className="text-black mb-4 leading-relaxed">
            Resources may include reference materials, guidelines, tools,
            templates, and other knowledge products developed or adopted by the
            DSWD Academy to support technical assistance delivery. These materials
            are aligned with existing policies and are continuously updated to
            reflect current practices and emerging needs.
          </p>

          <p className="text-black mb-4 leading-relaxed">
            Clients are encouraged to review the available resources prior to
            submitting a technical assistance request, as these may already
            address common concerns and provide practical guidance for capability
            building activities.
          </p>
        </div>

        {/* DESKTOP: SWAPPING ICONS */}
        {!isMobile && (
          <div className="flex-1 flex justify-center items-center relative w-72 h-72 pr-5">
            {order.map((posIndex, i) => {
              const { x, y } = positionsDesktop[posIndex];
              const { icon, size, color } = icons[i];

              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  animate={{ x, y }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <FontAwesomeIcon icon={icon} className={`${color} ${size}`} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBank;
