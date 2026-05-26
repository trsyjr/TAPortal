import React, { useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";

// React Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import News1 from "../assets/News1.png";
import News2 from "../assets/News2.png";
import News3 from "../assets/News3.png";
import News4 from "../assets/News4.png";
import News5 from "../assets/News5.png";

const NewsEvents = () => {
  const newsItems = [
    {
      image: News1,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗛𝗼𝘀𝘁𝘀 𝗞𝗻𝗼𝘄𝗹𝗲𝗱𝗴𝗲 𝗦𝗵𝗮𝗿𝗶𝗻𝗴 𝗦𝗲𝘀𝘀𝗶𝗼𝗻 (𝗞𝗦𝗦) 𝘄𝗶𝘁𝗵 𝗞𝗻𝗼𝘄𝗹𝗲𝗱𝗴𝗲 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝗦𝘆𝘀𝘁𝗲𝗺𝘀 𝗕𝘂𝗿𝗲𝗮𝘂-𝗟𝗲𝗴𝗶𝘀𝗹𝗮𝘁𝗶𝘃𝗲 𝗧𝗿𝗮𝗶𝗻𝗶𝗻𝗴 𝗖𝗲𝗻𝘁𝗲𝗿 to Strengthen Institutional Learning Systems",
      description: "The DSWD, through the DSWD Academy, held a Knowledge Sharing Session with the Knowledge Management Systems Bureau–House of Representatives on 28 January 2026 in Taguig City, reinforcing inter-agency collaboration and institutional capacity building.",
      link: "https://www.facebook.com/dswdacademy/posts/122172801110397679?ref=embed_post",
    },
    {
      image: News2,
      title: "𝗗𝗦𝗪𝗗, 𝗨𝗣 𝗶𝗻𝗸 𝗽𝗮𝗿𝘁𝗻𝗲𝗿𝘀𝗵𝗶𝗽 𝘁𝗼 𝗲𝗻𝗵𝗮𝗻𝗰𝗲 𝗹𝗲𝗮𝗿𝗻𝗶𝗻𝗴, 𝗿𝗲𝘀𝗲𝗮𝗿𝗰𝗵, 𝗮𝗻𝗱 𝘀𝗼𝗰𝗶𝗮𝗹 𝗽𝗿𝗼𝘁𝗲𝗰𝘁𝗶𝗼𝗻 𝗮𝗻𝗱 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁 𝗽𝗿𝗼𝗴𝗿𝗮𝗺𝘀",
      description: "On 2 February 2026, at the DSWD Central Office, the Department of Social Welfare and Development (DSWD) and the University of the Philippines (UP) forged a new chapter of collaboration through the signing of a Memorandum of Understanding (MOU), a shared pledge to advance learning, research, and social development initiatives that aims to transform the lives of the nation’s most vulnerable, poor and disadvantaged sectors.",
      link: "https://www.facebook.com/dswdacademy/posts/122172727262397679?ref=embed_post",
    },
    {
      image: News3,
      title: "𝗟𝗢𝗢𝗞 | 𝗪𝗵𝗲𝗿𝗲 𝗦𝘁𝗿𝗼𝗻𝗴 𝗙𝗮𝗺𝗶𝗹𝗶𝗲𝘀 𝗕𝗲𝗴𝗶𝗻: 𝗦𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝟮𝟬𝟮𝟲 𝘄𝗶𝘁𝗵 𝗣𝘂𝗿𝗽𝗼𝘀𝗲 𝘄𝗶𝘁𝗵 𝗣𝗠𝗖 𝗖𝗼𝘂𝗻𝘀𝗲𝗹𝗼𝗿𝘀 𝗼𝗳 𝗠𝗜𝗠𝗔𝗥𝗢𝗣𝗔",
      description: "Kicking off its training calendar for the year, the DSWD Academy, in partnership with DSWD Field Office – MIMAROPA, successfully conducted its first Localized Training on Pre-Marriage Counseling (PMC) for 2026.",
      link: "https://www.facebook.com/dswdacademy/posts/122172421106397679?ref=embed_post",
    },
    {
      image: News4,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 & 𝗝𝗝𝗪𝗖 𝗦𝘁𝗿𝗲𝗻𝗴𝘁𝗵𝗲𝗻 𝗣𝗮𝗿𝘁𝗻𝗲𝗿𝘀𝗵𝗶𝗽 𝗳𝗼𝗿 𝗝𝘂𝘃𝗲𝗻𝗶𝗹𝗲 𝗝𝘂𝘀𝘁𝗶𝗰𝗲",
      description: "The DSWD Academy, in collaboration with the Juvenile Justice and Welfare Council (JJWC), conducted a coordination meeting on 26 January 2026 to further strengthen the institutionalization of juvenile justice programs.",
      link: "https://www.facebook.com/dswdacademy/posts/122172256652397679?ref=embed_post",
    },
    {
      image: News5,
      title: "𝗛𝗮𝗻𝗱𝘀-𝗢𝗻 𝗟𝗲𝗮𝗿𝗻𝗶𝗻𝗴 𝗕𝗲𝗴𝗶𝗻𝘀: 𝗨𝗣 𝗗𝗶𝗹𝗶𝗺𝗮𝗻 𝗦𝘁𝘂𝗱𝗲𝗻𝘁𝘀 𝗘𝘅𝗽𝗹𝗼𝗿𝗲 𝗗𝗦𝗪𝗗’𝘀 𝗛𝗶𝗴𝗵-𝗜𝗺𝗽𝗮𝗰𝘁 𝗦𝗼𝗰𝗶𝗮𝗹 𝗦𝗲𝗿𝘃𝗶𝗰𝗲𝘀",
      description: "The Department of Social Welfare and Development (DSWD) Academy welcomed 24 participants from the University of the Philippines–Diliman’s College of Social Work and Community Development for a Knowledge Sharing Session.",
      link: "https://www.facebook.com/dswdacademy/posts/122168352176397679?ref=embed_post",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    afterChange: (index) => {
      setCurrentSlide(index);
      setIsExpanded(false);
    },
  };

  const renderDescription = (text) => {
    const words = text.split(" ");
    if (words.length <= 30) return text;
    return (
      <>
        {isExpanded ? text : words.slice(0, 30).join(" ") + "..."}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-[#2e3192] font-extrabold hover:underline focus:outline-none"
        >
          {isExpanded ? " See Less" : " See More"}
        </button>
      </>
    );
  };

  return (
    /* pt-24: Adds top padding to create space from the section above.
       mt-0: Ensures the background color starts exactly where the previous section ends.
    */
    <section className="relative pt-24 pb-12 mt-0 px-4 md:px-10 lg:px-16 font-sans overflow-hidden bg-white">
      {/* Main Wrapper */}
      <div className="relative z-10 max-w-[1600px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center md:text-left">
          NEWS & EVENTS
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 xl:gap-20">
          {/* Left Carousel */}
          <div className="w-full lg:w-[55%]">
            <div className="overflow-hidden shadow-2xl border-[6px] border-white bg-white">
              <Slider {...sliderSettings}>
                {newsItems.map((item, idx) => (
                  <div key={idx} className="outline-none">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={item.image}
                        alt="News"
                        className="w-full h-[26rem] md:h-[42rem] object-cover cursor-pointer"
                      />
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-[45%] flex flex-col justify-start min-h-[350px] text-center lg:text-left py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#ee1c25] leading-tight">
                  {newsItems[currentSlide].title}
                </h3>
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed transition-all">
                  {renderDescription(newsItems[currentSlide].description)}
                </p>

                <div className="pt-4">
                  <a href={newsItems[currentSlide].link} target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#ee1c25] text-white px-10 py-4 rounded-full font-semibold text-base md:text-lg transition transform hover:scale-105 active:scale-95 shadow-lg">
                      Learn More
                    </button>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Brand Hashtag */}
        <p className="mt-16 mb-5 text-center text-[#2e3192] font-bold text-xl md:text-3xl lg:text-4xl tracking-tight">
          #BawatBuhayMahalagaSaDSWD
        </p>
      </div>
    </section>
  );
};

export default NewsEvents;