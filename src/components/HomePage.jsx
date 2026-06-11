// src/components/HomePage.jsx
import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaAward, FaShareNodes, FaBullhorn, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LuBlocks } from "react-icons/lu"; 
import { RiArrowDownWideLine } from "react-icons/ri"; 

import Image1 from "../assets/Kliyentel.png";
import Image2 from "../assets/One.gif";
import Image3 from "../assets/FSWBanner.gif"

const slides = [Image2, Image1, Image3];

const slideLinks = {
  0: "/about#about-portal", 
  1: "https://clientfeedback.dswd.gov.ph/"
};

const faqCards = [
  { 
    title: "Assessment, Certification, and Accreditation", 
    icon: <FaAward />, 
    path: "/cpd",
    description: "Technical Assistance along Continuing Professional Development (CPD), Competency Needs Assessment, Certification and Accreditation, and Project Accelerated Social Work Credentialing and Equivalency for National Development (ASCEND) & Expanded Tertiary Education Equivalency and Accreditation Program (ETEEAP)."
  },
  { 
    title: <>Capability <br /> Building</>, 
    icon: <LuBlocks />, 
    path: "/ld-standards",
    description: "Technical Assistance along learning and development standards and professional development opportunities."
  },
  { 
    title: <>Knowledge <br /> Management</>, 
    icon: <FaShareNodes />, 
    path: "/knowledge-product",
    description: "Technical Assistance along knowledge management including Knowledge Sharing Session (KSS), Knowledge Products, Core Group of Specialists (CGS), Regional Learning Resource Center (RLRC), KM Systems, and others."
  },
  { 
    title: "TAAORSS", 
    icon: <FaBullhorn />, 
    path: "/tara-program",
    description: "Technical Assistance/Advisory and Other Related Support Services"
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const bookRef = useRef(null);
  const containerRef = useRef(null);
  const isFlipping = useRef(false);
  const [isUserTouching, setIsUserTouching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [dimensions, setDimensions] = useState({ width: 300, height: 400 });
  
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (mobile) {
      const calculatedMobileHeight = Math.floor(containerWidth * (9 / 16));
      setDimensions({
        width: containerWidth,
        height: calculatedMobileHeight,
      });
    } else {
      const containerHeight = containerRef.current.clientHeight;
      setDimensions({
        width: Math.floor(containerWidth / 2),
        height: containerHeight,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const resizeObserver = new ResizeObserver(() => updateDimensions());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    const timeoutId = setTimeout(updateDimensions, 150);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [updateDimensions]);

  const infiniteSlides = useMemo(() => {
    let buffer = [];
    for(let i = 0; i < 10; i++) buffer = [...buffer, ...slides];
    return buffer;
  }, []);

  const onFlip = useCallback((e) => {
    const totalPages = isMobile ? infiniteSlides.length : infiniteSlides.length * 2;
    const currentPage = e.data;

    if (currentPage >= totalPages - 2) {
      setTimeout(() => bookRef.current?.pageFlip().turnToPage(Math.floor(totalPages / 2)), 1300);
    }
    if (currentPage <= 1) {
      setTimeout(() => bookRef.current?.pageFlip().turnToPage(Math.floor(totalPages / 2)), 1300);
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

  const handleSlideClick = (path) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      navigate(path);
    }
  };

  const renderedSlides = useMemo(() => {
    const pages = [];
    infiniteSlides.forEach((image, index) => {
      const originalSlideIndex = index % slides.length;
      const targetPath = slideLinks[originalSlideIndex] || "/";

      if (isMobile) {
        pages.push(
          <div 
            key={`mob-${index}`} 
            className="bg-white h-full w-full cursor-pointer select-none flex items-center justify-center"
            onClick={() => handleSlideClick(targetPath)}
          >
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
          <div 
            key={`left-${index}`} 
            className="bg-white h-full w-full cursor-pointer select-none"
            onClick={() => handleSlideClick(targetPath)}
          >
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }} />
          </div>
        );
        pages.push(
          <div 
            key={`right-${index}`} 
            className="bg-white h-full w-full cursor-pointer select-none"
            onClick={() => handleSlideClick(targetPath)}
          >
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: '200% 100%',
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
      
      {/* CAROUSEL HERO SECTION */}
      <section
        className="relative w-full overflow-hidden bg-white z-0 flex items-center justify-center h-auto aspect-[16/9] sm:aspect-video md:h-[calc(100vh-80px)]"
        onMouseEnter={() => setIsUserTouching(true)}
        onMouseLeave={() => setIsUserTouching(false)}
      >
        {!isMobile && (
          <>
            <button onClick={handlePrev} className="group absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-[#2e3192]/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-center text-[#2e3192] text-4xl">
              <FaChevronLeft className="drop-shadow-lg" />
            </button>
            <button onClick={handleNext} className="group absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-[#2e3192]/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-center text-[#2e3192] text-4xl">
              <FaChevronRight className="drop-shadow-lg" />
            </button>
          </>
        )}

        <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
          {dimensions.width > 0 && dimensions.height > 0 && (
            <HTMLFlipBook
              key={`${dimensions.width}-${dimensions.height}-${isMobile}`} 
              width={dimensions.width}
              height={dimensions.height}
              size="stretch"
              minWidth={dimensions.width}
              maxWidth={3000}
              minHeight={dimensions.height}
              maxHeight={3000}
              showCover={false}
              useMouseEvents={false} 
              className="magazine-book"
              ref={bookRef}
              onFlip={onFlip} 
              onUpdateState={onFlipStateChange}
              drawShadow={true}
              flippingTime={600}
              usePortrait={isMobile} 
              startPage={isMobile ? 10 : 20} 
              disableFlipByClick={true}
            >
              {renderedSlides}
            </HTMLFlipBook>
          )}
        </div>

        <motion.div 
          className="hidden md:flex absolute bottom-6 w-full justify-center z-20 pointer-events-none"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-[#2e3192] text-[5rem] lg:text-[6rem] drop-shadow-md">
            <RiArrowDownWideLine />
          </div>
        </motion.div>
      </section>

      {/* FAQ GRID SECTION */}
      {/* ➡️ Changed pt-12 md:pt-36 to pt-12 md:pt-10 and pb-20 to pb-4 to tightly stitch segments close together */}
      <section className="max-w-[1400px] mx-auto px-6 pt-12 md:pt-10 pb-8 bg-white">
        {/* ➡️ Tightened bottom margin of description header block from mb-16 to mb-10 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#2e3192] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-700 text-sm md:text-base font-medium">Everything you need to know about our services.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {faqCards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={() => navigate(card.path)}
              
              onMouseEnter={() => setHoveredCardIndex(idx)}
              onMouseLeave={() => setHoveredCardIndex(null)}
              
              className="relative w-full h-44 md:h-48 bg-[#2e3192] rounded-[1.5rem] md:rounded-[2rem] flex flex-col-reverse justify-start p-6 md:p-8 cursor-pointer overflow-visible group"
            >
              <div className="absolute inset-0 bg-[#ee1c25] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[1.5rem] md:rounded-[2rem] z-0" />
              
              <h3 className="text-white font-black text-xl md:text-2xl z-10 text-left leading-tight pointer-events-none">
                {card.title}
              </h3>
              <div className="text-white/10 group-hover:text-white/20 text-8xl md:text-[9rem] absolute -right-2 top-1/2 -translate-y-1/2 transform transition-all duration-300 group-hover:scale-105 pointer-events-none z-10">
                {card.icon}
              </div>

              <AnimatePresence>
                {!isMobile && hoveredCardIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ x: "-50%" }}
                    className="absolute bottom-full left-1/2 mb-2 w-[280px] sm:w-[320px] md:w-[360px] bg-slate-900/95 backdrop-blur-sm text-white text-xs font-medium p-4 rounded-2xl shadow-xl border border-white/10 pointer-events-none z-[999] text-center"
                  >
                    <p className="leading-relaxed">{card.description}</p>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-slate-900/95" />
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        body { overflow-x: hidden; margin: 0; }
        .magazine-book { background: white; }
      `}</style>
    </div>
  );
};

export default HomePage;