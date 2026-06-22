import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLaptopMedical, FaTicket } from "react-icons/fa6";

/* 🔹 Default global fallback cards */
const DEFAULT_CARDS = [
  {
    title: "TA WEDNESDAY",
    icon: <FaLaptopMedical />,
    description:
      "Virtual Clinic for Technical Assistance opens every Wednesday.",
    buttonText: "Join Here",
    onClick: () => window.alert("TA CLINIC Clicked"),
  },
  {
    title: "REQUEST TICKET",
    icon: <FaTicket />,
    description:
      "Submit a request ticket and we will reach out shortly.",
    buttonText: "Request Here",
    onClick: () => window.alert("Request Ticket Clicked"),
  },
];

const FloatingCardDeck = ({
  cards = DEFAULT_CARDS,
  rotateInterval = 4000,
  footerId = "footer",
}) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(16);

  // rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    }, rotateInterval);
    return () => clearInterval(interval);
  }, [cards.length, rotateInterval]);

  // footer position layout calculation
  useEffect(() => {
    const handleResize = () => {
      const footer = document.getElementById(footerId);
      const isMobile = window.innerWidth < 768;
      
      // Kept the lower bottom baseline for mobile screens
      const baseMargin = isMobile ? 12 : 32;

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const spaceFromBottom = window.innerHeight - footerRect.top + 20;
        setBottomOffset(Math.max(baseMargin, spaceFromBottom));
      } else {
        setBottomOffset(baseMargin);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [footerId]);

  return (
    <div
      // ➡️ Changed "right-2" to "-right-2" to nudge the entire layout stack right against the glass viewport border on mobile
      className="fixed -right-2 sm:right-6 z-50 w-56 h-60"
      style={{ bottom: `${bottomOffset}px` }}
    >
      {cards.map((card, index) => {
        const isTop = index === currentCard;
        const triggerAction = card.onClick || card.buttonAction;

        return (
          <motion.div
            key={card.title}
            className="absolute bg-white rounded-xl shadow-xl w-48 p-4 md:p-6 cursor-pointer"
            style={{ zIndex: isTop ? 20 : 10 }}
            animate={{
              x: isTop ? -10 : 10,
              rotate: isTop ? -5 : 5,
              scale: isTop ? 1 : 0.95,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => {
              if (triggerAction) triggerAction();
            }}
          >
            <div className="flex flex-col items-center text-center">
              {React.cloneElement(card.icon, {
                size: 35,
                className: "text-[#2e3192] mb-2",
              })}

              <h3 className="text-sm font-bold text-[#2e3192] mb-2">
                {card.title}
              </h3>

              <p className="text-gray-600 text-xs mb-3">
                {card.description}
              </p>

              <button 
                className="bg-[#2e3192] text-white px-4 py-2 rounded-full font-semibold text-xs hover:scale-105 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  if (triggerAction) triggerAction();
                }}
              >
                {card.buttonText}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingCardDeck;