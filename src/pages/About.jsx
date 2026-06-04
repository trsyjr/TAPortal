// src/pages/About.jsx
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, wrap } from "framer-motion";

// ✅ React Slick Core Styles (Strictly for the top page hero banner slideshow)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import About1 from "../assets/About1.jpg";
import About2 from "../assets/About2.jpg";
import About3 from "../assets/About3.JPG";
import About4 from "../assets/About4.JPG";
import About5 from "../assets/About5.JPG";
import About6 from "../assets/About6.jpg";
import About7 from "../assets/About7.jpg";
import Cliff from "/images/Cliff-min.avif";
import Ten from "/images/Ten-min.avif";
import Ana from "/images/Ana-min.avif";
import Nori from "/images/Nori-min.avif";
import Ritch from "/images/Ritch-min.avif";
import Ros from "/images/Ros-min.avif";
import Aljohn from "/images/Aljohn-min.avif";
import Angel from "/images/Angel-min.avif";
import Jena from "/images/Jena-min.avif";
import Lyka from "/images/Lyka-min.avif";
import Merl from "/images/Merl-min.avif";
import Mina from "/images/Mina-min.avif";
import Nancy from "/images/Nancy.avif";
import Noreen from "/images/Noreen-min.avif";
import Perrine from "/images/Perrine-min.avif";
import Thea from "/images/Thea-min.avif";
import DC from "/images/DC-min.avif";
import Jes from "/images/Jes-min.avif";
import Orchid from "/images/O.avif";
import Pao from "/images/Pao-min.avif";
import Meann from "/images/Meann-min.avif";
import Edd from "/images/Edd-min.avif";
import Jo from "/images/Jo-min.avif";
import Kleng from "/images/Kleng-min.avif";
import Alma from "/images/Alma.avif";
import Anggese from "/images/Anggese.avif";
import Dan from "/images/Dan.avif";
import Ella from "/images/Ella.avif";
import Jane from "/images/Jane.avif";
import Dale from "/images/Dale.avif";
import Nate from "/images/Nate.avif";
import Olan from "/images/Olan.avif";
import Pim from "/images/Pim.avif";
import Glenda from "/images/Glenda.avif";
import Glo from "/images/Glo.avif";
import Maan from "/images/Maan.avif";
import Gelves from "/images/Gelves.avif";
import Sky from "/images/Sky.avif";
import Kath from "/images/Kath.avif";

const About = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("ALL"); 
  const [copiedEmail, setCopiedEmail] = useState("");
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0 });
  
  const [viewMode, setViewMode] = useState("CAROUSEL"); 

  const slides = [
    About1, About2, About3, About4,
    About5, About6, About7,
  ];

  const sliderSettings = {
    dots: false, 
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    swipe: true,
  };

 const focalPeople = [
  // ==================== ACAD DIVISION ====================
  { title: "OIC-DIVISION CHIEF", name: "Norilix M. Razalan", email: "nmrazalan@dswd.gov.ph", image: Nori, category: "ACAD" },
  { title: "ACCREDITATION FOCAL", name: "Rosylyn Arnigo", email: "rarnigo@dswd.gov.ph", image: Ros, category: "ACAD" },
  { title: "CPD FOCAL", name: "Kirsten Patrice E. Maglalang", email: "kpemaglalang@dswd.gov.ph", image: Ten, category: "ACAD" },
  { title: "CNA FOCAL", name: "Mr. Clifford Robin C. Gabatin", email: "crgcgabatin@dsws.gov.ph", image: Cliff, category: "ACAD" },
  { title: "CERTIFICATION FOCAL", name: "Analiza S. Ileto", email: "asileto@dswd.gov.ph", image: Ana, category: "ACAD" },
  { title: "CERTIFICATION FOCAL", name: "Richelle Fem A. Juan", email: "rfajuan@dswd.gov.ph", image: Ritch, category: "ACAD" },

  // ==================== CBD DIVISION ====================
  { title: "DIVISION CHIEF", name: "Efleda Joyce Sabater-Consulta", email: "ejsconsulta@dswd.gov.ph", image: DC, category: "CBD" },
  { title: "SECTION CHIEF", name: "Althea Muriel L. Pineda", email: "amlpineda@dswd.gov.ph", image: Thea, category: "CBD" },
  { title: "TECHNICAL ASSISTANCE FOCAL", name: "Carmina A. Llanto", email: "callanto@dswd.gov.ph", image: Mina, category: "CBD" },
  { title: "WALANG GUTOM PROGRAM FOCAL", name: "Aljohn C. Purca", email: "acpurca@dswd.gov.ph", image: Aljohn, category: "CBD" },
  { title: "GENDER AND DEVELOPMENT FOCAL", name: "Althea Muriel L. Pineda", email: "amlpineda@dswd.gov.ph", image: Thea, category: "CBD" },
  { title: "PRE-MARRIAGE COUNSELING FOCAL", name: "Merielle O. Palacio", email: "mopalacio@dswd.gov.ph", image: Merl, category: "CBD" },
  { title: "HOUSEPARENTING TRAINING FOCAL", name: "Jan Paolo M. Leyva", email: "jpmleyva@dswd.gov.ph", image: Pao, category: "CBD" },
  { title: "CRCF TRAININGS FOCAL", name: "Jena Mae C. Aguilar", email: "jmcaguilar@dswd.gov.ph", image: Jena, category: "CBD" },
  { title: "PMC ONLINE COURSE DEVELOPMENT FOCAL", name: "Mark Angel Malapira", email: "mamalapira@dswd.gov.ph", image: Angel, category: "CBD" },
  { title: "PSYCHOLOGICAL FIRST AID FOCAL", name: "Jesica S. Mencias", email: "jsmencias@dswd.gov.ph", image: Jes, category: "CBD" },
  { title: "CAMP COORDINATION AND CAMP MANAGEMENT FOCAL", name: "Perrine D. Padilla", email: "pdpadilla@dswd.gov.ph", image: Perrine, category: "CBD" },
  { title: "PARENT EFFECTIVENESS SERVICE FOCAL", name: "Noreen N. Data", email: "nndata@dswd.gov.ph", image: Noreen, category: "CBD" },
  { title: "SPECIAL DRUG EDUCATION CENTER FOCAL", name: "Carmina A. Llanto", email: "callanto@dswd.gov.ph", image: Mina, category: "CBD" },
  { title: "YAKAP BAYAN PROGRAM FOCAL", name: "Nikkita Lyka Gracia L. Ermino", email: "nlglermino@dswd.gov.ph", image: Lyka, category: "CBD" },
  { title: "COMMUNICATIONS MANAGEMENT FOCAL", name: "Orchid B. Ocampo", email: "obocampo@dswd.gov.ph", image: Orchid, category: "CBD" },
  { title: "BASIC SOCIAL WORK CONCEPTS FOCAL", name: "Aljohn C. Purca", email: "acpurca@dswd.gov.ph", image: Aljohn, category: "CBD" },
  { title: "JUVENILE JUSTICE FOCAL", name: "Nancy E. Fortes", email: "nefortes@dswd.gov.ph", image: Nancy, category: "CBD" },
  { title: "CHILD AND WOMEN FRIENDLY SPACES FOCAL", name: "Nikkita Lyka Gracia L. Ermino", email: "nlglermino@dswd.gov.ph", image: Lyka, category: "CBD" },
  { title: "WOMEN, PEACE, AND SECURITY FOCAL", name: "Jocelyn M. Edillo", email: "jmedillo@dswd.gov.ph", image: Jo, category: "CBD" },
  { title: "GENDER-RESPONSIVE CASE MANAGEMENT FOCAL", name: "Klenarchi Mae E. Flores", email: "kmeflores@dswd.gov.ph", image: Kleng, category: "CBD" },
  { title: "CCTG FOCAL", name: "Eddniel Patrick I. Papa", email: "epipapa@dswd.gov.ph", image: Edd, category: "CBD" },
  { title: "DRMG FOCAL", name: "Jesica S. Mencias", email: "jsmencias@dswd.gov.ph", image: Jes, category: "CBD" },
  { title: "GASSG FOCAL", name: "JOCELYN M. EDILLO", email: "jmedillo@dswd.gov.ph", image: Jo, category: "CBD" },
  { title: "IPDG FOCAL", name: "Marry Ann Dealo", email: "madealo@dswd.gov.ph", image: Meann, category: "CBD" },
  { title: "LEGISLATIVE & INTERGOVERNMENTAL AFFAIRS GROUP FOCAL", name: "Carmina A. Llanto", email: "callanto@dswd.gov.ph", image: Mina, category: "CBD" },
  { title: "OPERATIONS GROUP FOCAL", name: "Althea Muriel L. Pineda", email: "amlpineda@dswd.gov.ph", image: Thea, category: "CBD" },
  { title: "OSECG FOCAL", name: "Carmina A. Llanto", email: "callanto@dswd.gov.ph", image: Mina, category: "CBD" },
  { title: "PPG FOCAL", name: "Jan Paolo M. Leyva", email: "jpmleyva@dswd.gov.ph", image: Pao, category: "CBD" },
  { title: "PEACE AND DEVELOPMENT GROUP FOCAL", name: "Mark Angel Malapira", email: "mamalapira@dswd.gov.ph", image: Angel, category: "CBD" },
  { title: "RSDIG FOCAL", name: "Perrine D. Padilla", email: "pdpadilla@dswd.gov.ph", image: Perrine, category: "CBD" },

  { title: "FO NCR FOCAL", name: "Nancy E. Fortes", email: "nefortes@dswd.gov.ph", image: Nancy, category: "CBD" },
  { title: "FO CAR FOCAL", name: "Eddniel Patrick I. Papa", email: "epipapa@dswd.gov.ph", image: Edd, category: "CBD" },
  { title: "FO I & FO CARAGA FOCAL", name: "Carmina A. Llanto", email: "callanto@dswd.gov.ph", image: Mina, category: "CBD" },
  { title: "FO II FOCAL", name: "Jan Paolo M. Leyva", email: "jpmleyva@dswd.gov.ph", image: Pao, category: "CBD" },
  { title: "FO III & FO NIR FOCAL", name: "Jesica S. Mencias", email: "jsmencias@dswd.gov.ph", image: Jes, category: "CBD" },
  { title: "FO IV-A FOCAL", name: "Jena Mae C. Aguilar", email: "jmcaguilar@dswd.gov.ph", image: Jena, category: "CBD" },
  { title: "FO MIMAROPA FOCAL", name: "Klenarchi Mae E. Flores", email: "kmeflores@dswd.gov.ph", image: Kleng, category: "CBD" },
  { title: "FO V FOCAL", name: "Marry Ann Dealo", email: "madealo@dswd.gov.ph", image: Meann, category: "CBD" },
  { title: "FO VI FOCAL", name: "Mark Angel Malapira", email: "mamalapira@dswd.gov.ph", image: Angel, category: "CBD" },
  { title: "FO VII & FO XII FOCAL", name: "Merielle O. Palacio", email: "mopalacio@dswd.gov.ph", image: Merl, category: "CBD" },
  { title: "FO VIII FOCAL", name: "Noreen N. Data", email: "nndata@dswd.gov.ph", image: Noreen, category: "CBD" },
  { title: "FO IX FOCAL", name: "Nikkita Lyka Gracia L. Ermino", email: "nlglermino@dswd.gov.ph", image: Lyka, category: "CBD" },
  { title: "FO X FOCAL", name: "Perrine D. Padilla", email: "pdpadilla@dswd.gov.ph", image: Perrine, category: "CBD" },
  { title: "FO XI FOCAL", name: "Aljohn C. Purca", email: "acpurca@dswd.gov.ph", image: Aljohn, category: "CBD" },

  // ==================== KM DIVISION ====================
  { title: "DIVISION CHIEF", name: "Marigrace D. Mateum", email: "mdmateum@dswd.gov.ph", image: Anggese, category: "KM" },
  { title: "SECTION CHIEF, OMS", name: "Elladonna M. Agor", email: "emagor@dswd.gov.ph", image: Ella, category: "KM" },
  { title: "SECTION CHIEF, KPSS", name: "Daniel D. Alejandre", email: "ddalejandre@dswd.gov.ph", image: Dan, category: "KM" },
  { title: "MODULE DEVELOPMENT FOCAL", name: "Alma M. David", email: "amdavid@dswd.gov.ph", image: Alma, category: "KM" },
  { title: "CORE GROUP OF SPECIALISTS (CGS) FOCAL", name: "Jane A. Baldino", email: "jabalino@dswd.gov.ph", image: Jane, category: "KM" },
  { title: "INTELLECTUAL PROPERTY (IP) FOCAL", name: "Allendale M. De Luna", email: "amdeluna@dswd.gov.ph", image: Dale, category: "KM" },
  { title: "DSWD ACADEMY FACILITY MANAGER", name: "Efricor B. Sakilayan", email: "ebsakilayan@dswd.gov.ph", image: Pim, category: "KM" },
  { title: "IT FOCAL - KM PORTAL, DSWD ELMS", name: "Christian Olan R. Dorado", email: "cordorado@dswd.gov.ph", image: Olan, category: "KM" },
  { title: "REGIONAL LEARNING RESOURCE CENTERS FOCAL", name: "Jonathan P. Futalan", email: "jpfutalan@dswd.gov.ph", image: Nate, category: "KM" },

  // ==================== TAAORSS DIVISION ====================
  { title: "SECTION CHIEF", name: "Gloria G. Alvarado", email: "ggalvarado@dswd.gov.ph", image: Glo, category: "TAAORSS" },
  { title: "VISAYAS CLUSTER FOCAL", name: "Christian B. Baylosis", opacity: 1, email: "cbbaylosis@dswd.gov.ph", image: Sky, category: "TAAORSS" },
  { title: "LUZON B CLUSTER FOCAL", name: "Maria Annele B. Tio", email: "mabtio@dswd.gov.ph", image: "", category: "TAAORSS" },
  { title: "MINDANAO CLUSTER FOCAL", name: "Mary Ann S. Evangelista", email: "masevangelista@dswd.gov.ph", image: Maan, category: "TAAORSS" },
  { title: "LUZON A CLUSTER FOCAL", name: "Gelves C. Almiñe", email: "gcalmine@dswd.gov.ph", image: Gelves, category: "TAAORSS" },
  { title: "", name: "Kathleene Jhoy L. Lesaca", email: "kjllesaca@dswd.gov.ph", image: Kath, category: "TAAORSS" },
  { title: "", name: "Glenda Fulong", email: "gfulong@dswd.gov.ph", image: Glenda, category: "TAAORSS" }
];

  const filteredPeople = activeFilter === "ALL" 
    ? focalPeople 
    : focalPeople.filter(person => person.category === activeFilter);

  // Triple layout items array instantiation to facilitate frictionless left/right edge transitions
  const conveyorItems = [...filteredPeople, ...filteredPeople, ...filteredPeople];

  const cardWidthWithGap = 296; // 280px width + 16px gap (gap-4)
  const totalBaseWidth = filteredPeople.length * cardWidthWithGap;

  const xPosition = useMotionValue(-totalBaseWidth);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  
  const pointerStartXRef = useRef(0);
  const conveyorStartXRef = useRef(0);

  useEffect(() => {
    const currentHash = window.location.hash;
    
    if (currentHash === "#get-in-touch" || currentHash === "#about-portal") {
      const targetId = currentHash.replace("#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    }
  }, [window.location.hash]);

  // Reset viewport tracking values cleanly to the middle segment if active parameters update
  useEffect(() => {
    if (viewMode === "CAROUSEL") {
      xPosition.set(-totalBaseWidth);
    }
  }, [activeFilter, totalBaseWidth, viewMode]);

  // Framer Motion continuous loop rendering configuration engine
  useAnimationFrame((time, deltaTime) => {
    // Stop continuous animation ticks if in list view mode to preserve performance
    if (viewMode === "LIST" || isHoveredRef.current || isDraggingRef.current || totalBaseWidth === 0) return;

    // Adjusted rate calculation dynamically to handle high image densities smoothly
    const movementStep = (45 * deltaTime) / 1000;
    const currentX = xPosition.get() - movementStep;

    // Wrap precisely inside the middle segment window: [-2*totalBaseWidth, -totalBaseWidth]
    const wrappedX = wrap(-totalBaseWidth * 2, -totalBaseWidth, currentX);
    xPosition.set(wrappedX);
  });

  // Custom pointer drag handlers bypassing Framer native constraints completely
  const handlePointerDown = (event) => {
    if (viewMode === "LIST") return;
    isDraggingRef.current = true;
    pointerStartXRef.current = event.clientX;
    conveyorStartXRef.current = xPosition.get();
    
    // Attach document event monitors to capture continuous movement sequences smoothly
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current || totalBaseWidth === 0) return;
    
    const deltaX = event.clientX - pointerStartXRef.current;
    const currentX = conveyorStartXRef.current + deltaX;
    
    // Unbound continuous modulo wrap configuration
    const wrappedX = wrap(-totalBaseWidth * 2, -totalBaseWidth, currentX);
    xPosition.set(wrappedX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
  };

  const toggleFilter = (filterType) => {
    setActiveFilter((prev) => (prev === filterType ? "ALL" : filterType));
  };

  const copyToClipboard = (e, email) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    
    // Get target coordinate nodes relative to viewport to pin the copied text notification bubble accurately
    const rect = e.currentTarget.getBoundingClientRect();
    setBubblePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 28
    });
    
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(""), 1800);
  };

  const sections = [
    {
      title: "The DSWD Academy",
      content: (
        <>
          The DSWD Academy is the Department’s professional learning institute 
          and training arm responsible for strengthening the competencies of the 
          social welfare and development workforce. It leads the implementation of 
          learning and development, knowledge management, assessment, certification, 
          accreditation, and technical assistance initiatives that support the 
          effective delivery of social welfare and development programs and services.
          <br /><br />
          Established to institutionalize a comprehensive and sustainable capability-building 
          system, the DSWD Academy serves as a strategic platform for professional 
          learning, technical assistance, and standards development. It supports DSWD 
          personnel, local government units, social welfare and development agencies, 
          people’s organizations, and other partner-stakeholders through interventions 
          that enhance knowledge, improve practice, and strengthen organizational capacity.
          <br /><br />
          The Academy develops and manages learning programs, technical assistance services, 
          knowledge resources, and professional development pathways aligned with Department 
          standards and priorities. It also promotes innovation, knowledge exchange, and 
          strategic partnerships to advance quality social welfare and development practice. 
          Through these functions, the DSWD Academy contributes to building a competent, 
          responsive, and standards-driven workforce that supports improved service delivery 
          for vulnerable and marginalized sectors.
        </>
      ),
    },
    {
      title: "Capability Building Division (CBD-PLDS)",
      content: (
        <>
          The Capability Building Division (CBD) of the DSWD Academy leads 
          the development, implementation, and monitoring of capability-building 
          systems for the internal and external social welfare and development 
          workforce. It is responsible for establishing the roadmap, policies, 
          standards, frameworks, and systems that guide professional learning and 
          development across the Department and its partner-stakeholders.
          <br /><br />
          The Division manages learning and development interventions that strengthen 
          workforce competencies in the delivery of social welfare and development 
          programs and services. This includes learning needs assessment, training 
          design and implementation, technical assistance, coaching and mentoring, 
          and the development of standards that support competency-based and 
          technology-enabled learning.
          <br /><br />
          CBD also supports Offices, Bureaus, Services, Units, and Field Offices 
          in identifying capability gaps, aligning training priorities, and 
          improving the quality of learning interventions. Through its 
          capability-building initiatives, the Division promotes continuous 
          professional development, organizational learning, and strengthened 
          workforce readiness in response to emerging sectoral demands and 
          institutional priorities.
        </>
      ),
    },
    {
      title: "Assessment, Certification, and Accreditation Division (ACAD)",
      content: (
        <>
          The Assessment, Certification, and Accreditation Division (ACAD) is the 
          DSWD Academy’s quality assurance engine, dedicated to safeguarding and 
          future-proofing standards of excellence in the Social Welfare and Development 
          sector. In-charge with the certification of competencies for practitioners 
          and oversee the rigorous accreditation of learning service providers, trainers, 
          and training programs. One of its functions include managing the PRC-CPD review 
          process and processing applications to ensure all professional development 
          activities meet regulatory requirements for license renewal.
        </>
      ),
    },
    {
      title: "Knowledge Management Division (KMD)",
      content: (
        <>
          The Knowledge Management Division is responsible for strengthening the Department’s 
          capacity to generate, use, and share Social Welfare and Development (SWD) knowledge 
          internally and with partners, intermediaries, and other stakeholders. It distills 
          knowledge into relevant knowledge products and services, policies, and strategies; 
          develops technical assistance and knowledge agendas; and establishes KM systems and 
          platforms for capturing, integrating, and managing capacity-building and technical 
          assistance initiatives. It also establishes and manages Communities of Practice, 
          oversees the DSWD Library and KM Portal, and monitors and evaluates KM-related 
          technical assistance interventions implemented by the Department.
        </>
      ),
    },
    {
      title: "Technical Assistance/ Advisory and Other Related Support Services (TAAORSS)",
      content: (
        <>
          The Technical/ Advisory Assistance and Other Related Support Services Division 
          is responsible for the management and operationalization of the TA System for 
          LGUs through the different OBS, Field Offices and other stakeholders. It shall 
          lead the development and implementation of efficient, results-based, collaborative 
          and coordinative TA strategies for LGUs.
        </>
      ),
    },
    {
      title: "Contact Us",
      isCustom: true,
      content: (
        <div id="get-in-touch" className="w-full bg-[#1e2283] rounded-[2.5rem] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
          
          {/* Responsive Layout Configuration Block */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch w-full">
            
            {/* Top Area on Mobile Panels / Left Navigation Block on Large Displays */}
            <div className="col-span-12 lg:col-span-4 flex flex-col justify-between space-y-8 z-20 py-2 pr-2">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-5 rounded-sm" style={{ backgroundColor: "#FFE066" }}></div>
                  <span className="text-sm uppercase tracking-[0.2em] text-white/80 font-bold">Contact Us</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] select-none mb-6 mt-10">
                  Get In Touch <br />With <span className="italic text-[#FFE066]">US</span>
                </h3>

                {/* ✅ View Mode Switcher Buttons */}
                <div className="flex bg-[#14175c] p-1.5 rounded-2xl gap-2 max-w-[280px]">
                  <button
                    type="button"
                    onClick={() => setViewMode("CAROUSEL")}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                      viewMode === "CAROUSEL" 
                        ? "bg-[#ee1c25] text-white shadow-md" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Carousel Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("LIST")}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${
                      viewMode === "LIST" 
                        ? "bg-[#ee1c25] text-white shadow-md" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    List Mode
                  </button>
                </div>
              </div>

              {/* 🎨 NAVIGATION BUTTON TRACK WITH SPRING TAP EFFECTS */}
              <div className="flex flex-col items-start gap-3.5 z-30 w-full relative">
                
                {/* Row 1: ACAD Button */}
                <motion.button 
                  whileTap={{ scale: 0.92 }}
                  onClick={() => toggleFilter("ACAD")}
                  className={`px-5 py-3 rounded-full text-[0.82rem] font-bold tracking-wide shadow-lg transition-colors duration-200 text-left w-full sm:w-auto ${
                    activeFilter === "ACAD" 
                      ? "bg-[#ee1c25] text-white" 
                      : "bg-white text-[#1e2283] hover:bg-[#ee1c25] hover:text-white"
                  }`}
                >
                  Assessment, Certification and Accreditation
                </motion.button>
                
                {/* Row 2: Capability Building and TAAORSS Controls */}
                <div className="flex flex-wrap gap-3 w-full">
                  <motion.button 
                    whileTap={{ scale: 0.92 }}
                    onClick={() => toggleFilter("CBD")}
                    className={`px-5 py-3 rounded-full text-[0.82rem] font-bold tracking-wide shadow-lg transition-colors duration-200 text-center flex-grow sm:flex-grow-0 ${
                      activeFilter === "CBD" 
                        ? "bg-[#ee1c25] text-white" 
                        : "bg-white text-[#1e2283] hover:bg-[#ee1c25] hover:text-white"
                    }`}
                  >
                    Capability Building
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.92 }}
                    onClick={() => toggleFilter("TAAORSS")}
                    className={`px-5 py-3 rounded-full text-[0.82rem] font-bold tracking-wide shadow-lg transition-colors duration-200 text-center flex-grow sm:flex-grow-0 ${
                      activeFilter === "TAAORSS" 
                        ? "bg-[#ee1c25] text-white" 
                        : "bg-white text-[#1e2283] hover:bg-[#ee1c25] hover:text-white"
                    }`}
                  >
                    TAAORSS
                  </motion.button>
                </div>
                
                {/* Row 3: Knowledge Management Button */}
                <motion.button 
                  whileTap={{ scale: 0.92 }}
                  onClick={() => toggleFilter("KM")}
                  className={`px-5 py-3 rounded-full text-[0.82rem] font-bold tracking-wide shadow-lg transition-colors duration-200 text-left w-full sm:w-auto ${
                    activeFilter === "KM" 
                      ? "bg-[#ee1c25] text-white" 
                      : "bg-white text-[#1e2283] hover:bg-[#ee1c25] hover:text-white"
                  }`}
                >
                  Knowledge Management
                </motion.button>
              </div>

              {/* Contact Information Metadata Info Rows */}
              <div className="space-y-3 pt-3 text-[0.7rem] font-medium tracking-wide text-white/80 select-none">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#1e2283] flex-shrink-0" style={{ backgroundColor: "#FFE066" }}>
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/>
                    </svg>
                  </div>
                  <p>DSWD Academy Facility: 8 8436370 / 8 8436191 <br />DSWD Academy Central Office: 8951-28-05 loc 10010</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#1e2283] flex-shrink-0" style={{ backgroundColor: "#FFE066" }}>
                    <svg className="w-2.5 h-2.5 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <p className="break-all">academy@dswd.gov.ph / swidb@dswd.gov.ph</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#1e2283] flex-shrink-0" style={{ backgroundColor: "#FFE066" }}>
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </div>
                  <p>facebook.com/dswdacademy</p>
                </div>
              </div>
            </div>

            {/* Bottom Section on Mobile Viewports / Right Alignment Area on Desktop Devices */}
            <div className="col-span-12 lg:col-span-8 flex flex-col justify-center relative min-h-[460px] w-full overflow-hidden pl-0">
              
              {/* ✅ OPTION A: CAROUSEL MODE (Image Cards View) */}
              {viewMode === "CAROUSEL" && (
                <div 
                  onMouseEnter={() => { isHoveredRef.current = true; }}
                  onMouseLeave={() => { isHoveredRef.current = false; }}
                  onPointerDown={handlePointerDown}
                  className="w-full overflow-hidden flex items-stretch cursor-grab active:cursor-grabbing select-none touched-none"
                  style={{ touchAction: "none" }}
                >
                  <motion.div 
                    style={{ x: xPosition, willChange: "transform" }}
                    className="flex gap-4 h-auto py-2"
                  >
                    {conveyorItems.map((person, idx) => {
                      const isLocalImport = person.image && !person.image.startsWith("/assets/");

                      return (
                        <div 
                          key={`${person.name}-${idx}`}
                          className="w-[280px] flex-shrink-0 rounded-[2.2rem] bg-[#1a1c4b] overflow-hidden relative h-[440px] flex flex-col justify-end shadow-xl"
                        >
                          {/* Photo Display Base Component */}
                          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-200">
                            {isLocalImport ? (
                              <img 
                                src={person.image} 
                                alt={person.name} 
                                loading="lazy"
                                className="w-full h-full object-cover object-top pointer-events-none"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-400 to-slate-500">
                                <svg className="w-16 h-16 text-white/25" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Smoky Vignette Mask Overlay */}
                          <div 
                            className="absolute inset-x-0 bottom-0 h-[48%] z-10 pointer-events-none bg-gradient-to-t from-[#FFE066] via-[#FFE066]/80 to-transparent"
                          />

                          {/* Personnel Text Details Box */}
                          <div className="relative z-20 p-6 pb-7 text-left flex flex-col justify-end min-h-[35%] bg-transparent">
                            <h4 className="text-[1.1rem] font-bold tracking-wide text-[#1e2283] uppercase leading-tight line-clamp-2 min-h-[2.6rem]">
                              {person.title}
                            </h4>
                            <p className="text-[0.82rem] font-bold mt-0.5 text-blue-950 truncate w-full">
                              {person.name}
                            </p>
                            
                            {/* Clipboard Anchor Link Trigger */}
                            <div className="relative inline-block w-full">
                              <a 
                                href={`mailto:${person.email}`} 
                                onClick={(e) => copyToClipboard(e, person.email)}
                                className="text-[0.74rem] font-semibold text-[#1e2283] hover:underline block mt-0.5 truncate w-full pointer-events-auto cursor-pointer"
                              >
                                {person.email}
                              </a>

                              {/* Popup Animated Bubble Node Context */}
                              <AnimatePresence>
                                {copiedEmail === person.email && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.85, y: 8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -4 }}
                                    style={{ left: bubblePos.x, top: bubblePos.y }}
                                    className="absolute bg-red-600 text-white text-[0.68rem] font-bold px-2.5 py-1 rounded-md shadow-md pointer-events-none z-50 whitespace-nowrap"
                                  >
                                    Copied!
                                    <div className="absolute w-2 h-2 bg-red-600 rotate-45 left-1/2 -translate-x-1/2 top-[90%]"></div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              )}

              {/* ✅ OPTION B: LIST MODE (Text-Only View with Custom Red Styled Scrollbar) */}
              {viewMode === "LIST" && (
                <div className="w-full max-h-[450px] overflow-y-auto pr-2 space-y-3 z-20 
                  [&::-webkit-scrollbar]:w-2 
                  [&::-webkit-scrollbar-track]:bg-white/5 
                  [&::-webkit-scrollbar-track]:rounded-full 
                  [&::-webkit-scrollbar-thumb]:bg-[#ee1c25] 
                  [&::-webkit-scrollbar-thumb]:rounded-full 
                  [&::-webkit-scrollbar-thumb:hover]:bg-[#d1141c]
                  [scrollbar-width:thin]
                  [scrollbar-color:#ee1c25_rgba(255,255,255,0.05)]"
                >
                  {filteredPeople.length === 0 ? (
                    <div className="text-white/50 text-center py-12 text-sm font-medium">
                      No focal people found matching this division code.
                    </div>
                  ) : (
                    filteredPeople.map((person, idx) => (
                      <div 
                        key={`${person.name}-list-${idx}`}
                        className="w-full bg-[#14175c]/60 border border-white/10 hover:border-[#FFE066]/30 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 transition-all duration-200"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[0.62rem] uppercase tracking-wider font-extrabold bg-[#ee1c25] text-white px-2 py-0.5 rounded-md">
                              {person.category}
                            </span>
                            <span className="text-[0.7rem] font-bold text-[#FFE066] uppercase tracking-wide">
                              {person.title}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white mt-1 truncate">
                            {person.name}
                          </h4>
                        </div>

                        <div className="relative shrink-0 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={(e) => copyToClipboard(e, person.email)}
                            className="w-full sm:w-auto bg-white/10 hover:bg-[#FFE066] text-white hover:text-[#1e2283] px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 flex items-center justify-between sm:justify-start gap-2 border border-white/5"
                          >
                            <span className="truncate max-w-[200px] sm:max-w-none">{person.email}</span>
                            <svg className="w-3.5 h-3.5 fill-current opacity-70 shrink-0" viewBox="0 0 24 24">
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                            </svg>
                          </button>

                          <AnimatePresence>
                            {copiedEmail === person.email && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 -top-8 bg-red-600 text-white text-[0.65rem] font-bold px-2.5 py-1 rounded shadow-md z-50 whitespace-nowrap"
                              >
                                Copied to clipboard!
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 🎨 SYMMETRICAL EDGE VIGNETTE PLUMES */}
              {viewMode === "CAROUSEL" && (
                <>
                <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#1e2283] via-[#1e2283]/40 to-transparent z-30 pointer-events-none hidden lg:block" />
                <div className="absolute left-0 top-0 bottom-0 w-12 z-40 pointer-events-none bg-gradient-to-r from-[#1e2283]/40 via-[#1e2283]/15 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-12 z-40 pointer-events-none bg-gradient-to-l from-[#1e2283]/40 via-[#1e2283]/15 to-transparent" />
                </>
              )}
            </div>

          </div>

        </div>
      ),
    },
    {
      title: "About this Portal",
      content: (
        <>
        <div id="about-portal">
          The portal provides a centralized and structured mechanism for Offices, 
          Bureaus, Services, and Units (OBSUs) and Field Offices (FOs) to access 
          technical assistance, submit service requests, and retrieve relevant 
          resources. It consolidates standard processes, guidance materials, and 
          service channels to improve accessibility, coordination, and documentation.
          <br /><br />
          As part of the Academy’s continuing efforts to strengthen service delivery, 
          the portal promotes more efficient request management, clearer communication, 
          and improved access to institutional knowledge. It supports a more systematic 
          and responsive approach to technical assistance, aligned with departmental 
          standards, operational requirements, and the evolving needs of the workforce.
        </div> 
        </>
      ),
    },
  ];

  return (
    <div className="w-full bg-white font-['Montserrat',sans-serif]">
      {/* Slider Header Showcase */}
      <section className="relative w-full h-screen">
        <Slider {...sliderSettings} className="h-full">
          {slides.map((slide, idx) => (
            <div key={idx} className="relative w-full h-screen">
              <img
                src={slide}
                alt={`Slide ${idx + 1}`}
                className="w-full h-screen object-cover"
              />
            </div>
          ))}
        </Slider>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20 z-10 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          >
            Welcome to the DSWD Academy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          >
            Technical Assistance Portal!
          </motion.p>
        </div>
      </section>

      {/* Grid Content Sections Layout */}
      <section className="max-w-[100rem] mx-auto px-6 md:px-20 lg:px-40 py-20 space-y-24">
        {sections.map((sec, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {!sec.isCustom && (
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2e3192] border-l-4 border-[#ee1c25] pl-5">
                {sec.title}
              </h2>
            )}
            
            {sec.isCustom ? (
              sec.content
            ) : (
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
                {sec.content}
              </p>
            )}

            {/* Google Map Frame Component */}
            {index === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-12 overflow-hidden rounded-3xl shadow-2xl border border-gray-100"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.25561510197!2d121.02237177601141!3d14.52736608595041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c92e958db053%3A0x753f0abd6b2f3b60!2sDSWD%20Academy%20(formerly%20SWADCAP)!5e0!3m2!1sen!2sph!4v1779685547793!5m2!1sen!2sph"
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