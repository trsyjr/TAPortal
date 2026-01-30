import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#2e3192] text-white py-12 px-6 md:px-20 lg:px-40 font-sans">
      <div className="flex flex-col md:flex-row md:items-start md:gap-12">
        {/* Column 1 - Slightly narrower */}
        <div className="flex-[1.5] space-y-4">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Technical Assistance Portal</h3>
          <p className="text-sm md:text-base">
            111 Block 3, Taguig, 1630 Metro Manila
          </p>
          <p className="text-sm md:text-base">
            Contact Us at VOIPP: 10010
          </p>
          <p className="text-xs md:text-sm mt-4">
            © 2026 TA Portal. All rights reserved.
          </p>
        </div>

        {/* Columns 2 & 3 - Links */}
        <div className="flex flex-1 md:gap-12">
          {/* Column 2 */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2">LINKS:</h4>
            <div className="flex gap-40">
              <div className="flex flex-col gap-1">
                <a href="#" className="underline hover:opacity-80">DSWD Academy Portal</a>
                <a href="#" className="underline hover:opacity-80">CPD Portal</a>
                <a href="#" className="underline hover:opacity-80">Knowledge Management Portal</a>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-1">
                <a href="#" className="underline hover:opacity-80">L&D Guidebook</a>
                <a href="#" className="underline hover:opacity-80">Privacy Policy</a>
                <a href="#" className="underline hover:opacity-80">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
