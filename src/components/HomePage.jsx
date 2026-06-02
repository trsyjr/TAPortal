// src/components/HomePage.jsx
import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaAward, FaShareNodes, FaBullhorn, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { LuBlocks } from "react-icons/lu"; 
import { RiArrowDownWideLine } from "react-icons/ri"; 

import Image1 from "../assets/Kliyentel.png";
import Image2 from "../assets/One.gif";

const slides = [Image2, Image1];

const slideLinks = {
  0: "/about#get-in-touch", 
  1: "https://clientfeedback.dswd.gov.ph/"
};

const faqCards = [
  { title: "Assessment, Certification, and Accreditation", icon: <FaAward />, path: "/cpd" },
  { title: <>Capability <br /> Building</>, icon: <LuBlocks />, path: "/ld-standards" },
  { title: <>Knowledge <br /> Management</>, icon: <FaShareNodes />, path: "/knowledge-product" },
  { title: "TAAORSS", icon: <FaBullhorn />, path: "/tara-program" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const bookRef = useRef(null);
  const containerRef = useRef(null);
  const isFlipping = useRef(false);
  const [isUserTouching, setIsUserTouching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [dimensions, setDimensions] = useState({ width: 300, height: 400 });

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (mobile) {
      // Calculate height based on a clean 16:9 aspect ratio container to eliminate white gaps
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

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

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
      setTimeout(() => {
        bookRef.current?.pageFlip().turnToPage(Math.floor(totalPages / 2));
      }, 1300);
    }
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
      
      {/* CAROUSEL HERO SECTION - HEIGHT CORRECTION APPLIED HERE */}
      <section
        className="relative w-full overflow-hidden bg-white z-0 flex items-center justify-center h-auto aspect-[16/9] sm:aspect-video md:h-[calc(100vh-80px)]"
        onMouseEnter={() => setIsUserTouching(true)}
        onMouseLeave={() => setIsUserTouching(false)}
      >
        {!isMobile && (
          <>
            <button 
              onClick={handlePrev} 
              className="group absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-[#2e3192]/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-center text-[#2e3192] text-4xl"
            >
              <FaChevronLeft className="drop-shadow-lg" />
            </button>
            <button 
              onClick={handleNext} 
              className="group absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-[#2e3192]/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-center text-[#2e3192] text-4xl"
            >
              <FaChevronRight className="drop-shadow-lg" />
            </button>
          </>
        )}

        <div 
          ref={containerRef} 
          className="w-full h-full flex items-center justify-center overflow-hidden"
        >
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
      <section className="max-w-[1400px] mx-auto px-6 pt-12 md:pt-24 pb-4 bg-white">
        <div className="text-center mb-12">
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
              className="relative w-full h-44 md:h-48 bg-[#2e3192] rounded-[1.5rem] md:rounded-[2rem] flex flex-col-reverse justify-start p-6 md:p-8 cursor-pointer overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#ee1c25] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              
              <h3 className="text-white font-black text-xl md:text-2xl z-10 text-left leading-tight pointer-events-none">
                {card.title}
              </h3>
              <div className="text-white/10 group-hover:text-white/20 text-8xl md:text-[9rem] absolute -right-2 top-1/2 -translate-y-1/2 transform transition-all duration-300 group-hover:scale-105 pointer-events-none z-10">
                {card.icon}
              </div>
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