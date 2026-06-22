import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// React Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import News1 from "../assets/news&events/News1.png";
import News2 from "../assets/news&events/News2.png";
import News3 from "../assets/news&events/News3.png";
import News4 from "../assets/news&events/News4.png";
import News5 from "../assets/news&events/News5.png";
import News6 from "../assets/news&events/News6.png";
import News7 from "../assets/news&events/News7.png";
import News8 from "../assets/news&events/News8.png";
import News9 from "../assets/news&events/News9.png";
import News10 from "../assets/news&events/News10.png";

const NewsEvents = () => {
  const newsItems = [
    {
      image: News1,
      title: "Sama-sama nating ipagdiwang ang Filipino Social Workers’ Day 2026!",
      description: [
        "From the people in the spotlight to those working tirelessly behind the scenes, every effort—big or small—helps create meaningful change in the lives of the individuals, families, and communities we serve.",
        "Yesterday reminded us that social work is not just a profession; it is a commitment to service, compassion, and hope. It is the quiet work that often goes unseen, the extra mile willingly taken, and the collective spirit that keeps us moving forward despite challenges.",
        "As we celebrate Filipino Social Work Day, we salute all social workers and social welfare professionals whose dedication continues to embody the true spirit of Harambee—pulling together, lifting together, and succeeding together.",
        "Happy Filipino Social Work Day! Mabuhay ang mga Social Worker at Social Welfare Professionals ng Pilipinas!"
      ],
      link: "https://www.facebook.com/share/v/1G7vqGx4AA/",
    },
    {
      image: News2,
      title: "𝗧𝗵𝗲 𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗽𝗿𝗼𝘂𝗱𝗹𝘆 𝗰𝗲𝗹𝗲𝗯𝗿𝗮𝘁𝗲𝘀 𝘁𝗵𝗲 𝗿𝗲𝗰𝗼𝗴𝗻𝗶𝘁𝗶𝗼𝗻 𝗼𝗳 𝗼𝗻𝗲 𝗼𝗳 𝗶𝘁𝘀 𝘁𝗲𝗮𝗺 𝗺𝗲𝗺𝗯𝗲𝗿𝘀 𝗮𝘀 𝗮𝗻 𝗔𝗻𝗴𝗲𝗹𝘀 𝗶𝗻 𝗥𝗲𝗱 𝗩𝗲𝘀𝘁𝘀 (𝗔𝗥𝗩) 𝗮𝘄𝗮𝗿𝗱𝗲𝗲.",
      description: [
        "Mr. Tonghie R. Sy, Jr., Information Systems Analyst I of the Capability Building Division, DSWD Academy, was recognized during the On-the-Spot Angels in Red Vests Recognition at the DSWD Monday Flag Ceremony last May 25, 2026.",
        "Known to his colleagues as “Sir CJ,” he has contributed to key digital innovations such as the DSWD Academy Calendar, Work From Home Daily Time Record, and the ongoing DSWD Academy Technical Assistance Portal.",
        "The On-the-Spot Angels in Red Vests Recognition honors DSWD personnel who exemplify excellence, innovation, and dedication to public service.",
        "Congratulations, Sir CJ!"
      ],
      link: "https://www.facebook.com/share/p/1BFRiAwARc/",
    },
    {
      image: News3,
      title: "The DSWD Academy, in collaboration with the Pantawid Pamilyang Pilipino Program (4Ps), officially launched the Child Sexual Abuse and Exploitation Prevention (CSAEP) E-Learning Course for 4Ps implementers",
      description: [
        "The DSWD Academy, in collaboration with the Pantawid Pamilyang Pilipino Program (4Ps), officially launched the Child Sexual Abuse and Exploitation Prevention (CSAEP) E-Learning Course for 4Ps implementerson 26 May 2026, at the DSWD Academy in Taguig. The event included the ceremonial signing of the Memorandum of Understanding (MOU) with the Stairway Foundation, Inc. (SFI).",
        "Following a pilot run from June 1–21, 2026, the course will be hosted on the DSWD Academy’s Learning Management System (LMS) to ensure nationwide reach. This partnership highlights the shared commitment to creating a safer environment for every Filipino child through digital innovation."
      ],
      link: "https://www.facebook.com/share/p/1E4rbe9Quh/",
    },
    {
      image: News4,
      title: "Shaping Better Local Services Accross the Luzon Cluster",
      description: [
        "The DSWD Academy completed the third batch of the three-day Service Delivery Capacity Assessment Information System (SDCA-IS) Pilot Implementation and Focus Group Discussion (FGD) sessions held on 18–20 May 2026 via Google Meet.",
        "The activity gathered Luzon Regional Focal Persons and Local Social Welfare and Development Office (LSWDO) representatives to test the new assessment system and provide feedback for its improvement. This initiative supports ongoing efforts to strengthen assessment tools and improve local social welfare service delivery through more responsive and evidence-informed processes."
      ],
      link: "https://www.facebook.com/share/p/1AgwKSaqHD/",
    },
    {
      image: News5,
      title: "𝗕𝘂𝗶𝗹𝗱𝗶𝗻𝗴 𝗖𝗮𝗽𝗮𝗰𝗶𝘁𝗶𝗲𝘀 𝗳𝗼𝗿 𝗚𝗿𝗲𝗮𝘁𝗲𝗿 𝗜𝗺𝗽𝗮𝗰𝘁: 𝗣𝗘𝗦 𝗧𝗢𝗧 𝗕𝗮𝘁𝗰𝗵𝗲𝘀 𝟭–𝟯 𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲 𝗢𝗻𝗹𝗶𝗻𝗲 𝗖𝗿𝗮𝘀𝗵 𝗖𝗼𝘂𝗿𝘀𝗲 𝗼𝗻 𝗕𝗮𝘀𝗶𝗰 𝗙𝗮𝗰𝗶𝗹𝗶𝘁𝗮𝘁𝗶𝗼𝗻 𝗮𝗻𝗱 𝗣𝗿𝗲𝘀𝗲𝗻𝘁𝗮𝘁𝗶𝗼𝗻 𝗦𝗸𝗶𝗹𝗹𝘀",
      description: [
        "As part of the continuing capacity-building efforts through the Parent Effectiveness Service (PES) Training of Trainers (TOT) Program, the DSWD Academy successfully conducted its Online Crash Course on Basic Facilitation and Presentation Skills on 25–26 May 2026 via Google Meet.",
        "The activity brought together all the participants from the three TOT batches, providing them with an opportunity to further enhance their facilitation and presentation competencies. Through interactive sessions, participants strengthened their facilitation and presentation skills, helping ensure the effective delivery of the upcoming PES training rollout in their respective areas.",
        "Together, the DSWD Academy continues to build confident facilitators and champions of learning!"
      ],
      link: "https://www.facebook.com/share/1JpL7kMmrG/",
    },
    {
      image: News6,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗟𝗲𝗮𝗱𝘀 𝗪𝗼𝗿𝗸𝘀𝗵𝗼𝗽 𝘁𝗼 𝗛𝗮𝗿𝗺𝗼𝗻𝗶𝘇𝗲 𝗦𝗼𝗰𝗶𝗮𝗹 𝗣𝗿𝗼𝘁𝗲𝗰𝘁𝗶𝗼𝗻 𝗖𝗮𝗽𝗮𝗯𝗶𝗹𝗶𝘁𝘆 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁",
      description: [
        "The DSWD Academy, in partnership with the Social Protection, Inclusion and Gender Equality (SPRING) Program of the Australian Government conducted a Scoping Mission on 25 and 26 May 2026. The purpose of the activity is to undertake a rapid diagnostic of existing capability development priority gaps, refine the proposed technical approach, and inform the development of a more detailed implementation plan that will support harmonization of Social Protection Capability Development initiatives in DSWD.",
        "Two meetings were conducted to gather data from DSWD and its attached agencies. The online briefing on 25 May 2026 was attended by 42 participants from DSWD Offices/Bureaus/Services and 12 participants from the Juvenile Justice and Welfare Council (JJWC), National Authority for Child Care (NACC), and the National Commission of Senior Citizens (NCSC). The onsite workshop was attended by 32 participants from DSWD Central Office and the aforementioned attached agencies.",
        "The workshop reviewed the Department’s existing programs, competency frameworks, learning pathways and related systems to identify opportunities to strengthen alignment with the Social Protection Plan 2023-2028, and support the institutionalization of a more coherent and inclusive capability development approach for social protection."
      ],
      link: "https://www.facebook.com/share/1JHz1mtoeS/",
    },
    {
      image: News7,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗧𝗿𝗮𝗶𝗹𝗯𝗹𝗮𝘇𝗲𝘀 𝗖𝗲𝗿𝘁𝗶𝗳𝗶cation 𝗼𝗳 𝗦𝗼𝗰𝗶𝗮𝗹 𝗪𝗲𝗹𝗳𝗮𝗿𝗲 𝗮𝗻𝗱 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁 𝗖𝗼𝗺𝗽𝗲𝘁𝗲𝗻𝗰𝗶𝗲𝘀",
      description: [
        "The DSWD Academy successfully conducted the Orientation and Workshop for Prospective Applicants of the Certification Program on May 19–25, 2026, covering the six (6) competency areas for the pilot batch. A total of 87 DSWD Core Group of Specialists participated in the Orientation and Workshop.",
        "This initiative, under the leadership of Secretary Rex Gatchalian, with the guidance of Undersecretary Denise Florence B. Bernos-Bragas, the Regulatory Services and Institutional Development Group, and DSWD Academy Director Atty. Justin Caesar Anthony D. Batocabe, provides guidance on eligibility, application requirements, assessment processes, and competency alignment to help participants identify the specialization best suited to their practice, experience, and expertise."
      ],
      link: "https://www.facebook.com/share/p/18qjWgqo78/",
    },
    {
      image: News8,
      title: "📺 𝗙𝗘𝗔𝗧𝗨𝗥𝗘 𝗦𝗘𝗚𝗠𝗘𝗡𝗧 | 𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗜𝗻𝘁𝗲𝗿𝘃𝗶𝗲𝘄 (𝗨𝗡𝗧𝗩)",
      description: [
        "Sharing key highlights from the recent interview featuring the DSWD Academy, the Department’s training and capacity-building arm. The discussion focuses on how the Academy strengthens the competencies of DSWD social workers, house parents, case managers, and frontline personnel through continuous learning and development initiatives, specialized trainings, and professional capacity-building programs.",
        "This segment highlights the ongoing efforts to ensure that our workforce remains well-equipped, responsive, and aligned with the evolving needs of social welfare service delivery for Filipino individuals, families, and communities.",
        "Watch the full interview segment below.",
        "Courtesy: UNTV News and Rescue, UNTV Radyo La Verdad"
      ],
      link: "https://www.facebook.com/share/v/1PVWDh1e9T/",
    },
    {
      image: News9,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗣𝗿𝗼𝗺𝗼𝘁𝗲𝘀 𝗦𝗼𝗰𝗶𝗮𝗹 𝗪𝗼𝗿𝗸 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻𝗮𝗹 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁 𝘁𝗵𝗿𝗼𝘂𝗴𝗵 𝗨𝗣𝗢𝗨",
      description: [
        "The DSWD Academy successfully conducted the “Advancing the Social Service Workforce: Orientation on UPOU Social Work Diploma and Postgraduate Programs” in partnership with the University of the Philippines Open University held on 19 May 2026 via online platform with more than 300 participants in attendance.",
        "The activity provided DSWD personnel nationwide with valuable information on flexible learning opportunities, Diploma in Social Work, and Master of Social Work programs designed to strengthen professional growth, lifelong learning, and the continuing development of the social service workforce.",
        "Through the leadership of the DSWD Academy and the support of the RSIDG, the initiative continues to open pathways for competency development, professional advancement, and accessible quality education for social welfare practitioners."
      ],
      link: "https://www.facebook.com/share/p/1AvTVXBAQ1/",
    },
    {
      image: News10,
      title: "DSWD Academy joined a productive meeting at the Singapore Embassy with Ambassador Constance See",
      description: [
        "Yesterday, DSWD Academy joined a productive meeting at the Singapore Embassy with Ambassador Constance See, together with Usec Denise Bernos-Bragas, Asec Janet Armas, Director Alfrey Gulla, Assistant Bureau Director Precilla Docuyanan, Chief Marigrace Mateum, and other SG representatives to discuss how Singapore’s KidSTART Program may be contextualized and translated into the Philippine setting.",
        "The discussion focused on proposed approaches, shared learnings, and potential areas for collaboration to help ensure the successful implementation of initiatives that support early childhood development and strengthen Filipino families.",
        "We look forward to continued partnerships and knowledge exchange in advancing programs that create better opportunities and brighter futures for children and communities. 🇵🇭🇸🇬"
      ],
      link: "https://www.facebook.com/share/p/1HdqgFZoyc/",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const textRef = useRef(null);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000, 
    arrows: false,
    swipe: true,
    draggable: true,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };

  useEffect(() => {
    setIsExpanded(false);
    setHasOverflow(false);
  }, [currentSlide]);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && containerRef.current) {
        const isClipped = textRef.current.scrollHeight > containerRef.current.clientHeight;
        setHasOverflow(isClipped);
      }
    };

    checkOverflow();
    
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(checkOverflow);
    });

    if (containerRef.current) observer.observe(containerRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [currentSlide, isExpanded]);

  return (
    <section className="relative pt-24 pb-12 mt-0 px-8 md:px-16 lg:px-24 font-sans overflow-hidden bg-white select-none">
      
      {/* PREV Edge Overlay */}
      <button 
        onClick={() => sliderRef.current?.slickPrev()} 
        className="absolute left-0 top-0 bottom-0 w-12 md:w-20 z-30 bg-gradient-to-r from-[#2e3192]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-start pl-4 text-[#2e3192] text-3xl focus:outline-none"
        aria-label="Previous Slide"
      >
        <FaChevronLeft className="drop-shadow-md" />
      </button>

      {/* NEXT Edge Overlay */}
      <button 
        onClick={() => sliderRef.current?.slickNext()} 
        className="absolute right-0 top-0 bottom-0 w-12 md:w-20 z-30 bg-gradient-to-l from-[#2e3192]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-end pr-4 text-[#2e3192] text-3xl focus:outline-none"
        aria-label="Next Slide"
      >
        <FaChevronRight className="drop-shadow-md" />
      </button>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center md:text-left">
          NEWS & EVENTS
        </h2>

        <Slider ref={sliderRef} {...sliderSettings} className="news-events-slider">
          {newsItems.map((item, idx) => (
            <div key={idx} className="outline-none">
              <div className="flex flex-col lg:flex-row lg:items-stretch lg:h-[43rem] gap-10 xl:gap-20 px-2 pb-4">
                
                {/* Left Side: Seamless Image Panel (Containers Removed) */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center h-full">
                  <div className="outline-none h-full">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={item.image}
                        alt="News"
                        className="w-full h-[26rem] md:h-full object-cover cursor-pointer rounded-lg"
                      />
                    </a>
                  </div>
                </div>

                {/* Right Side: Text Area (FIXED: Removed overflow-hidden from this wrapper container) */}
                <div className="w-full lg:w-[45%] flex flex-col h-full justify-between text-center lg:text-left py-2">
                  <div className="flex flex-col flex-grow overflow-hidden mb-4">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight mb-4 shrink-0">
                      {item.title}
                    </h3>
                    
                    <div 
                      ref={currentSlide === idx ? containerRef : null} 
                      className={`flex-grow relative overflow-hidden transition-all duration-200 ${
                        isExpanded ? "overflow-y-auto animate-none scrollbar-thin scrollbar-thumb-[#ee1c25] scrollbar-track-gray-100 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#2e3192] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100" : ""
                      }`}
                    >
                      <div ref={currentSlide === idx ? textRef : null} className="space-y-5 pb-4">
                        {item.description.map((paragraph, pIdx) => (
                          <p 
                            key={pIdx} 
                            className="text-base md:text-lg lg:text-xl text-black leading-relaxed text-justify lg:text-left"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {hasOverflow && !isExpanded && currentSlide === idx && (
                        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      )}
                    </div>

                    {currentSlide === idx && (hasOverflow || isExpanded) && (
                      <div className="text-left lg:text-left mt-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                          }}
                          className="text-[#2e3192] font-extrabold hover:underline focus:outline-none text-base"
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 shrink-0">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <button className="bg-[#2e3192] text-white px-10 py-4 rounded-full font-semibold text-base md:text-lg transition transform hover:bg-[#ee1c25] hover:scale-105 active:scale-95 shadow-lg">
                        Learn More
                      </button>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewsEvents;