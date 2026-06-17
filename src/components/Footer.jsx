// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import KliyentelQR from "../assets/KliyentelQR.png";

const Footer = () => {
  return (
    <footer className="bg-[#2e3192] text-white pt-10 pb-8 px-6 md:px-20 lg:px-40 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Slogan with pb-10 matching footer's pt-10 */}
        <p className="pb-12 text-center text-white font-bold text-xl md:text-3xl lg:text-4xl tracking-tight">
          #BawatBuhayMahalagaSaDSWD
        </p>

        {/* Main Grid Layout - Decreased vertical and horizontal gaps */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-6 items-start">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 flex flex-col">
            <h3 className="text-3xl md:text-[36px] font-bold leading-[1.1] tracking-tight mb-4">
              DSWD Academy <br /> TA Portal
            </h3>
            
            <p className="text-[14px] leading-relaxed text-white max-w-[280px]">
              The DSWD Academy's digital portal for streamlined technical assistance requests, coordination, and support.
            </p>

            {/* Contact Us Link with optimized spacing */}
            <Link 
              to="/about#get-in-touch" 
              className="mt-3 text-[14px] text-white underline hover:text-[#FFE066] transition-colors self-start"
            >
              Contact Us
            </Link>

            {/* Address Info with decreased padding to bring it closer to Contact Us */}
            <p className="text-[14px] pt-1.5 text-white">
              111 Block 3, Taguig, 1630 Metro Manila
            </p>
          </div>

          {/* Column 2: About Us - Decreased vertical item spacing */}
          <div className="md:col-span-3 space-y-3 md:pl-4">
            <h4 className="text-[14px] font-bold uppercase tracking-[0.1em]">About Us</h4>
            <ul className="space-y-2.5 text-[14px] text-white">
              <li>
                <Link to="/about" className="hover:underline hover:text-[#FFE066]">
                  About TA Portal
                </Link>
              </li>
              <li>
                <a 
                  href="/pdfs/Official_DSWD L&D Guidebook v.2021.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-[#FFE066]"
                >
                  L&D Guidebook
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline hover:text-[#FFE066]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:underline hover:text-[#FFE066]">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Links - Decreased vertical item spacing */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[14px] font-bold uppercase tracking-[0.1em]">Links</h4>
            <ul className="space-y-2.5 text-[14px] text-white">
              <li>
                <a 
                  href="https://www.facebook.com/dswdacademy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-[#FFE066]"
                >
                  DSWD Academy Facebook Page
                </a>
              </li>
              <li>
                <a 
                  href="https://academy.dswd.gov.ph/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-[#FFE066]"
                >
                  DSWD Academy Portal
                </a>
              </li>
              <li>
                <a 
                  href="https://sites.google.com/dswd.gov.ph/swidb-cpd-portal/home" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-[#FFE066]"
                >
                  CPD Portal
                </a>
              </li>
              <li>
                <a 
                  href="https://kmportal.dswd.gov.ph/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline hover:text-[#FFE066]"
                >
                  Knowledge Management Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: KliyenTell QR */}
         <div className="md:col-span-2 flex flex-col items-start md:items-end">
            <div className="space-y-3">
              <h4 className="text-[14px] font-bold tracking-[0.1em]">KliyenTell:</h4>
              <a 
                href="https://clientfeedback.dswd.gov.ph/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <img 
                  src={KliyentelQR} 
                  alt="QR Code" 
                  className="w-36 h-36 md:w-48 md:h-48 object-contain md:-translate-x-3 md:-translate-y-1 cursor-pointer" 
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Decreased spacing above the divider to mt-4 */}
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-center">
          <p className="text-[13px] text-gray-300 text-center">
            © 2026 DSWD Academy TA Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;