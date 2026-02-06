// src/pages/About.jsx
import React, { useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
// import { FaLaptopMedical, FaTicket } from "react-icons/fa6";
// import FloatingCardDeck from "../components/FloatingCardDeck";

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

  // Placeholder slides
  const slides = [
    About1,
    About2,
    About3,
    About4,
    About5,
    About6,
    About7,
    About8,
    About9,
    About10,
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    swipe: true,
  };

  // ✅ Floating cards for this page
  // const floatingCards = [
  //   {
  //     title: "TA WEDNESDAY",
  //     icon: <FaLaptopMedical />,
  //     description: "Virtual Clinic for Technical Assistance opens every Wednesday.",
  //     buttonText: "Join Here",
  //     onClick: () => window.alert("TA CLINIC Clicked"),
  //   },
  //   {
  //     title: "REQUEST TICKET",
  //     icon: <FaTicket />,
  //     description: "Submit a request ticket and we will reach out shortly.",
  //     buttonText: "Request Here",
  //     onClick: () => window.alert("Request Ticket Clicked"),
  //   },
  // ];

  return (
    <div className="w-full font-sans">
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
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          ))}
        </Slider>

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to the DSWD Academy CBD-PLDS
          </h1>
          <p className="text-lg md:text-2xl text-white drop-shadow-lg">
            Technical Assistance Portal!
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-[100rem] mx-auto px-6 md:px-20 lg:px-40 py-12 space-y-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2e3192]">
            The DSWD Academy
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
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
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2e3192]">
            Capability Building Division
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
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
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2e3192]">
            Technical Assistance Portal
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
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
          </p>
        </div>
      </section>

      {/* ✅ Floating Card Deck */}
      {/* <FloatingCardDeck cards={floatingCards} /> */}
    </div>
  );
};

export default About;
