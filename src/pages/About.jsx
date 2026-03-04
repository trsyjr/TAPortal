// src/pages/About.jsx
import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ React Slick CSS imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import About1 from "../assets/About1.jpg";
import About2 from "../assets/About2.jpg";
import About3 from "../assets/About3.png";
import About4 from "../assets/About4.jpg";
import About5 from "../assets/About5.png";
import About6 from "../assets/About6.jpg";
import About7 from "../assets/About7.jpg";
import About8 from "../assets/About8.png";
import About9 from "../assets/About9.png";
import About10 from "../assets/About10.png";

const About = () => {
  const navigate = useNavigate();

  const slides = [
    About1, About2, About3, About4, About5,
    About6, About7, About8, About9, About10,
  ];

  const sliderSettings = {
    dots: false, // ✅ Pagination dots removed
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    swipe: true,
  };

  const sections = [
    {
      title: "The DSWD Academy",
      content: (
        <>
          The DSWD Academy is the Department of Social Welfare and Development’s
          (DSWD) professional learning institute, mandated to set standards and
          provide learning opportunities that enhance the competencies of its
          partner-stakeholders. It focuses on strengthening the delivery of
          gender-responsive and socially inclusive social welfare and
          development (SWD) and social protection programs and services.
          <br /><br />
          As the Department’s concrete and strategic response to its commitment
          to institutionalized, comprehensive, and sustainable capability
          building, the Academy plays a central role in providing technical
          assistance and learning support across the organization and its
          partners. It ensures that learning and development interventions are
          aligned with Department policies, standards, and strategic
          priorities, while remaining responsive to emerging sectoral needs.
          <br /><br />
          Through its professional learning and technical assistance
          initiatives, the DSWD Academy supports the continuous strengthening
          of individual and institutional capacities, contributing to improved
          program implementation, effective service delivery, and positive
          outcomes for the Department’s target clientele.
        </>
      ),
    },
    {
      title: "Capability Building Division",
      content: (
        <>
          Capability Building Division - Professional Learning and Development
          Section (CBD-PLDS)
          <br /><br />
          The Capability Building Division, through the Professional Learning
          and Development Section (PLDS), is responsible for providing
          technical assistance along capability building to OBSUs, Field
          Offices, and partners of the Department.
          <br /><br />
          CBD-PLDS supports clients in the effective design, implementation,
          monitoring, and evaluation of capability building activities by
          offering expert guidance, technical consultations, and
          standards-based recommendations. Its technical assistance services
          aim to ensure policy compliance, enhance program quality, promote
          learning effectiveness, and support evidence-informed
          decision-making.
          <br /><br />
          Through strengthened and systematized technical assistance
          mechanisms, CBD-PLDS contributes to the delivery of responsive,
          coordinated, and sustainable capability building initiatives that
          ultimately improve social welfare and development service delivery.
        </>
      ),
    },
    {
      title: "Technical Assistance Portal",
      content: (
        <>
          The DSWD Academy CBD-PLDS Technical Assistance Portal serves as a
          centralized platform for accessing information, services, and
          resources related to capability building technical assistance
          provided by the Academy’s Capability Building Division - Professional
          Learning and Development Section (CBD-PLDS).
          <br /><br />
          This portal is designed to support Offices, Bureaus, Services, and
          Units (OBSUs), Field Offices (FOs), and partner-stakeholders by
          providing clear guidance on available technical assistance services,
          standard processes, resources, and frequently asked questions. It
          aims to promote transparency, consistency, and efficiency in the
          delivery of technical assistance, while ensuring alignment with
          Department policies, standards, and learning and development
          priorities.
          <br /><br />
          Through this platform, clients can better understand the scope of
          technical assistance offered, navigate requests more effectively,
          and access relevant references that support quality, compliant, and
          outcomes-oriented capability building initiatives.
        </>
      ),
    },
  ];

  return (
    <div className="w-full font-sans bg-white">
      {/* Carousel Section */}
      <section className="relative w-full h-screen">
        <Slider {...sliderSettings} className="h-full">
          {slides.map((slide, idx) => (
            <div key={idx} className="relative w-full h-screen">
              <img
                src={slide}
                alt={`Slide ${idx + 1}`}
                className="w-full h-screen object-cover"
              />
              {/* Overlay removed per request */}
            </div>
          ))}
        </Slider>

        {/* Centered text with shadows for readability without overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20 z-10 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          >
            Welcome to the DSWD Academy CBD-PLDS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          >
            Technical Assistance Portal!
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-[100rem] mx-auto px-6 md:px-20 lg:px-40 py-20 space-y-24">
        {sections.map((sec, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2e3192] border-l-4 border-[#ee1c25] pl-5">
              {sec.title}
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
              {sec.content}
            </p>

            {/* Embed Map after the first section */}
            {index === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-12 overflow-hidden rounded-3xl shadow-2xl border border-gray-100"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1931.127807428279!2d121.0249467!3d14.527366099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c92e958db053%3A0x753f0abd6b2f3b60!2sDSWD%20Academy%20(formerly%20SWADCAP)!5e0!3m2!1sen!2sph!4v1771383098009!5m2!1sen!2sph"
                  className="w-full h-96 md:h-[500px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DSWD Academy Map"
                ></iframe>
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default About;