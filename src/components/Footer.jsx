// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Kliyentell from "../assets/Kliyentell.png";

const Footer = () => {
  return (
    <footer className="bg-[#2e3192] text-white pt-16 pb-12 px-6 md:px-20 lg:px-40 font-sans">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 items-start">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 flex flex-col">
            <h3 className="text-3xl md:text-[40px] font-bold leading-[1.1] tracking-tight mb-6">
              DSWD Academy <br /> TA Portal
            </h3>
            
            <p className="text-[14px] leading-relaxed text-gray-200 max-w-[280px]">
              The DSWD Academy's digital portal for streamlined technical assistance requests, coordination, and support.
            </p>

            {/* Contact Us Link with space directly under the description text */}
            <Link 
              to="/about#get-in-touch" 
              className="mt-5 text-[14px] text-gray-200 underline hover:text-white transition-colors self-start"
            >
              Contact Us
            </Link>

            {/* Address Info separated at the bottom */}
            <p className="text-[14px] pt-4 text-gray-200">
              111 Block 3, Taguig, 1630 Metro Manila
            </p>
          </div>

          {/* Column 2: About Us */}
          <div className="md:col-span-3 space-y-5 md:pl-8">
            <h4 className="text-[14px] font-bold uppercase tracking-[0.1em]">About Us</h4>
            <ul className="space-y-4 text-[14px] text-gray-100">
              <li>
                <Link to="/about" className="hover:underline">
                  About TA Portal
                </Link>
              </li>
              <li>
                <a 
                  href="/pdfs/Official_DSWD L&D Guidebook v.2021.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  L&D Guidebook
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-[14px] font-bold uppercase tracking-[0.1em]">Links</h4>
            <ul className="space-y-4 text-[14px] text-gray-100">
              <li>
                <a 
                  href="https://www.facebook.com/dswdacademy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  DSWD Academy Facebook Page
                </a>
              </li>
              <li>
                <a 
                  href="https://academy.dswd.gov.ph/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  DSWD Academy Portal
                </a>
              </li>
              <li>
                <a 
                  href="https://sites.google.com/dswd.gov.ph/swidb-cpd-portal/home" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  CPD Portal
                </a>
              </li>
              <li>
                <a 
                  href="https://kmportal.dswd.gov.ph/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  Knowledge Management Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: KliyenTell QR */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end">
            <div className="space-y-4">
              <h4 className="text-[14px] font-bold tracking-[0.1em]">KliyenTell:</h4>
              <a 
                href="https://clientfeedback.dswd.gov.ph/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <img 
                  src={Kliyentell} 
                  alt="QR Code" 
                  className="w-36 h-36 md:w-56 md:h-56 object-contain md:-translate-x-3 md:-translate-y-2 cursor-pointer" 
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-4 border-t border-white/10 flex justify-center">
          <p className="text-[13px] text-gray-300 text-center">
            © 2026 DSWD Academy TA Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;