// src/components/HomePage.jsx
import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaAward, FaShareNodes, FaBullhorn } from "react-icons/fa6";
import { LuBlocks } from "react-icons/lu"; 
import { RiArrowDownWideLine } from "react-icons/ri"; 

import Image1 from "../assets/Kliyentel.png";
import Image2 from "../assets/One.gif";

const slides = [Image1, Image2];

const faqCards = [
  { title: "Assessment, Certification, and Accreditation", icon: <FaAward />, path: "/cpd" },
  { title: <>Capability <br /> Building</>, icon: <LuBlocks />, path: "/ld-standards" },
  { title: <>Knowledge <br /> Management</>, icon: <FaShareNodes />, path: "/knowledge-product" },
  { title: "TAAORSS", icon: <FaBullhorn />, path: "/tara-program" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const bookRef = useRef(null);
  const isFlipping = useRef(false);
  const [isUserTouching, setIsUserTouching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth < 768 ? window.innerWidth : window.innerWidth / 2,
    height: window.innerWidth < 768 ? (window.innerWidth * 0.6) : (window.innerHeight - 80), 
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDimensions({ 
        width: mobile ? window.innerWidth : window.innerWidth / 2, 
        height: mobile ? (window.innerWidth * 0.6) : (window.innerHeight - 80) 
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create a large buffer for the infinite loop
  const infiniteSlides = useMemo(() => {
    let buffer = [];
    // 10 sets of slides provides a massive runway
    for(let i = 0; i < 10; i++) buffer = [...buffer, ...slides];
    return buffer;
  }, []);

  // Truly Infinite Logic: If user nears the start or end, jump to middle
  const onFlip = useCallback((e) => {
    const totalPages = isMobile ? infiniteSlides.length : infiniteSlides.length * 2;
    const currentPage = e.data;

    // If we get within 2 pages of the end, jump back to the middle set
    if (currentPage >= totalPages - 2) {
      setTimeout(() => {
        bookRef.current?.pageFlip().turnToPage(Math.floor(totalPages / 2));
      }, 1300);
    }
    // If we get within 2 pages of the start, jump to middle set
    if (currentPage <= 1) {
      setTimeout(() => {
        bookRef.current?.pageFlip().turnToPage(Math.floor(totalPages / 2));
      }, 1300);
    }
  }, [infiniteSlides.length, isMobile]);

  const handleNext = () => {
    if (!bookRef.current || isFlipping.current) return;
    bookRef.current.pageFlip().flipNext("bottom");
  };

  const handlePrev = () => {
    if (!bookRef.current || isFlipping.current) return;
    bookRef.current.pageFlip().flipPrev("top");
  };

  const onFlipStateChange = (e) => {
    if (e.data === "flipping") {
      isFlipping.current = true;
    } else {
      setTimeout(() => { isFlipping.current = false; }, 100);
    }
  };

  useEffect(() => {
    if (isUserTouching) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isUserTouching, isMobile]);

  const renderedSlides = useMemo(() => {
    const pages = [];
    infiniteSlides.forEach((image, index) => {
      if (isMobile) {
        pages.push(
          <div key={`mob-${index}`} className="bg-white h-full w-full">
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
          </div>
        );
      } else {
        pages.push(
          <div key={`left-${index}`} className="bg-white h-full w-full">
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: '200% auto',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }} />
          </div>
        );
        pages.push(
          <div key={`right-${index}`} className="bg-white h-full w-full">
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: '200% auto',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat'
            }} />
          </div>
        );
      }
    });
    return pages;
  }, [infiniteSlides, isMobile]);

  return (
    <div className="font-sans relative min-h-screen bg-white overflow-hidden pt-[80px]">
      <section
        className="relative w-full flex flex-col items-center justify-center bg-white overflow-hidden z-0"
        style={{ minHeight: isMobile ? 'auto' : 'calc(100vh - 80px)' }}
        onMouseEnter={() => setIsUserTouching(true)}
        onMouseLeave={() => setIsUserTouching(false)}
      >
        {!isMobile && (
          <>
            {/* Reduced width from w-48 to w-20 to narrow down the target space */}
            <button onClick={handlePrev} className="absolute left-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-[#2e3192]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
            <button onClick={handleNext} className="absolute right-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-l from-[#2e3192]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
          </>
        )}

        <div className="flex items-center justify-center w-full">
          <HTMLFlipBook
            key={isMobile ? "mobile" : "desktop"} 
            width={dimensions.width}
            height={dimensions.height}
            size="stretch"
            minWidth={dimensions.width}
            maxWidth={2000}
            minHeight={dimensions.height}
            maxHeight={2500}
            showCover={false}
            useMouseEvents={false} 
            className="magazine-book"
            ref={bookRef}
            onFlip={onFlip} // Detects when to loop
            onUpdateState={onFlipStateChange}
            drawShadow={true}
            flippingTime={600}
            usePortrait={isMobile} 
            startPage={isMobile ? 10 : 20} // Start in the middle of the buffer
            disableFlipByClick={true}
          >
            {renderedSlides}
          </HTMLFlipBook>
        </div>

        <motion.div 
          className="hidden md:flex absolute bottom-6 w-full justify-center z-20 pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-[#2e3192] text-[7rem] drop-shadow-md">
            <RiArrowDownWideLine />
          </div>
        </motion.div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 py-12 md:py-24 pb-0 md:pb-0 bg-white overflow-hidden">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#2e3192] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-700 text-sm md:text-base font-medium">Everything you need to know about our Services.</p>
        </div>

        <div className="flex flex-row md:grid md:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-8 snap-x snap-mandatory no-scrollbar">
          {faqCards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(card.path)}
              className="relative min-w-[85%] sm:min-w-[45%] md:min-w-0 h-44 md:h-48 bg-[#2e3192] hover:bg-[#ee1c25] rounded-[1.5rem] md:rounded-[2rem] flex flex-col-reverse justify-start p-6 md:p-8 cursor-pointer shadow-xl overflow-hidden group snap-center"
            >
              <h3 className="text-white font-black text-xl md:text-2xl z-10 text-left leading-tight transition-colors duration-300">
                {card.title}
              </h3>
              <div className="text-white/10 group-hover:text-white/30 text-9xl md:text-[10rem] absolute -right-4 top-1/2 -translate-y-1/2 transform transition-transform group-hover:scale-110 pointer-events-none">
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        body { overflow-x: hidden; margin: 0; }
        .magazine-book { background: white; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HomePage;