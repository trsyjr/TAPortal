import React, { useState } from "react";
import Slider from "react-slick";

// React Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TABG from "../assets/TABG.png";
import News1 from "../assets/News1.png";
import News2 from "../assets/News2.png";
import News3 from "../assets/News3.png";
import News4 from "../assets/News4.png";
import News5 from "../assets/News5.png";


const NewsEvents = () => {
  const newsItems = [
    {
      image: News1,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗛𝗼𝘀𝘁𝘀 𝗞𝗻𝗼𝘄𝗹𝗲𝗱𝗴𝗲 𝗦𝗵𝗮𝗿𝗶𝗻𝗴 𝗦𝗲𝘀𝘀𝗶𝗼𝗻 (𝗞𝗦𝗦) 𝘄𝗶𝘁𝗵 𝗞𝗻𝗼𝘄𝗹𝗲𝗱𝗴𝗲 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝗦𝘆𝘀𝘁𝗲𝗺𝘀 𝗕𝘂𝗿𝗲𝗮𝘂-𝗟𝗲𝗴𝗶𝘀𝗹𝗮𝘁𝗶𝘃𝗲 𝗧𝗿𝗮𝗶𝗻𝗶𝗻𝗴 𝗖𝗲𝗻𝘁𝗲𝗿  𝘁𝗼 𝗦𝘁𝗿𝗲𝗻𝗴𝘁𝗵𝗲𝗻 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗶𝗼𝗻𝗮𝗹 𝗟𝗲𝗮𝗿𝗻𝗶𝗻𝗴 𝗦𝘆𝘀𝘁𝗲𝗺𝘀",
      description:
        "The DSWD, through the DSWD Academy, held a Knowledge Sharing Session with the Knowledge Management Systems Bureau–House of Representatives on 28 January 2026 in Taguig City, reinforcing inter-agency collaboration and institutional capacity building.",
      link: "https://www.facebook.com/dswdacademy/posts/122172801110397679?ref=embed_post",
    },
    {
      image: News2,
      title: "𝗗𝗦𝗪𝗗, 𝗨𝗣 𝗶𝗻𝗸 𝗽𝗮𝗿𝘁𝗻𝗲𝗿𝘀𝗵𝗶𝗽 𝘁𝗼 𝗲𝗻𝗵𝗮𝗻𝗰𝗲 𝗹𝗲𝗮𝗿𝗻𝗶𝗻𝗴, 𝗿𝗲𝘀𝗲𝗮𝗿𝗰𝗵, 𝗮𝗻𝗱 𝘀𝗼𝗰𝗶𝗮𝗹 𝗽𝗿𝗼𝘁𝗲𝗰𝘁𝗶𝗼𝗻 𝗮𝗻𝗱 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁 𝗽𝗿𝗼𝗴𝗿𝗮𝗺𝘀",
      description:
        "On 2 February 2026, at the DSWD Central Office, the Department of Social Welfare and Development (DSWD) and the University of the Philippines (UP) forged a new chapter of collaboration through the signing of a Memorandum of Understanding (MOU), a shared pledge to advance learning, research, and social development initiatives that aims to transform the lives of the nation’s most vulnerable, poor and disadvantaged sectors. The event was organized by the DSWD Academy, headed by Director Justin Caesar Anthony D. Batocabe, highlighting the Academy’s pivotal role in strengthening the Department’s learning and development programs.",
      link: "https://www.facebook.com/dswdacademy/posts/122172727262397679?ref=embed_post",
    },
    {
      image: News3,
      title: "𝗟𝗢𝗢𝗞 | 𝗪𝗵𝗲𝗿𝗲 𝗦𝘁𝗿𝗼𝗻𝗴 𝗙𝗮𝗺𝗶𝗹𝗶𝗲𝘀 𝗕𝗲𝗴𝗶𝗻: 𝗦𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝟮𝟬𝟮𝟲 𝘄𝗶𝘁𝗵 𝗣𝘂𝗿𝗽𝗼𝘀𝗲 𝘄𝗶𝘁𝗵 𝗣𝗠𝗖 𝗖𝗼𝘂𝗻𝘀𝗲𝗹𝗼𝗿𝘀 𝗼𝗳 𝗠𝗜𝗠𝗔𝗥𝗢𝗣𝗔",
      description:
        "Kicking off its training calendar for the year, the DSWD Academy, in partnership with DSWD Field Office – MIMAROPA, successfully conducted its first Localized Training on Pre-Marriage Counseling (PMC) for 2026, held at Ramada by Wyndham Manila Central, Binondo, Manila on January 12–16, 2026. The program aimed to equip participants with essential knowledge and competencies to provide effective and standards-based Pre-Marriage Counseling (PMC) to would-be-married couples and to increase the number of accredited counselors in the region.",
      link: "https://www.facebook.com/dswdacademy/posts/122172421106397679?ref=embed_post",
    },
    {
      image: News4,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 & 𝗝𝗝𝗪𝗖 𝗦𝘁𝗿𝗲𝗻𝗴𝘁𝗵𝗲𝗻 𝗣𝗮𝗿𝘁𝗻𝗲𝗿𝘀𝗵𝗶𝗽 𝗳𝗼𝗿 𝗝𝘂𝘃𝗲𝗻𝗶𝗹𝗲 𝗝𝘂𝘀𝘁𝗶𝗰𝗲",
      description:
        "The DSWD Academy, in collaboration with the Juvenile Justice and Welfare Council (JJWC), conducted a coordination meeting on 26 January 2026 to further strengthen the institutionalization of juvenile justice programs. The partnership seeks to strengthen the capacities of duty-bearers in handling Children at Risk (CAR) and Children in Conflict with the Law (CICL) through a standardized curriculum. Beginning 2026 and moving forward, four (4) key programs will be integrated into our regular course offerings to ensure every child is handled with a rights-based and child-sensitive approach.",
      link: "https://www.facebook.com/dswdacademy/posts/122172256652397679?ref=embed_post",
    },
    {
      image: News5,
      title: "𝗛𝗮𝗻𝗱𝘀-𝗢𝗻 𝗟𝗲𝗮𝗿𝗻𝗶𝗻𝗴 𝗕𝗲𝗴𝗶𝗻𝘀: 𝗨𝗣 𝗗𝗶𝗹𝗶𝗺𝗮𝗻 𝗦𝘁𝘂𝗱𝗲𝗻𝘁𝘀 𝗘𝘅𝗽𝗹𝗼𝗿𝗲 𝗗𝗦𝗪𝗗’𝘀 𝗛𝗶𝗴𝗵-𝗜𝗺𝗽𝗮𝗰𝘁 𝗦𝗼𝗰𝗶𝗮𝗹 𝗦𝗲𝗿𝘃𝗶𝗰𝗲𝘀",
      description:
        "The Department of Social Welfare and Development (DSWD) Academy welcomed 24 participants from the University of the Philippines–Diliman’s College of Social Work and Community Development for a Knowledge Sharing Session at the Protective Services Bureau (PSB) Conference Room held last 1 December 2025, bringing together 18 first-year Bachelor of Science in Social Work students and their lead faculty member, Assistant Professor Rosalie T. Quilicol, to deepen their understanding of the Department’s mandate, organizational structure, and key programs such as Residential Care Facilities, Statutory Programs, and Crisis Intervention.",
      link: "https://www.facebook.com/dswdacademy/posts/122168352176397679?ref=embed_post",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <section className="relative pt-12 mt-12 px-6 md:px-20 lg:px-40 font-sans overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 right-0 z-0 mx-auto"
        style={{
          height: "2000px",
          maxWidth: "110rem",
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderTopLeftRadius: "5rem",
          borderTopRightRadius: "5rem",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center md:text-left">
          NEWS & EVENTS
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Carousel */}
          <div className="flex-1 w-full md:max-w-2xl">
            <Slider
              {...sliderSettings}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              {newsItems.map((item, idx) => (
                <div key={idx}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[28rem] md:h-[36rem] object-cover rounded-2xl cursor-pointer"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>

          {/* Right Text */}
          <div className="flex-1 flex flex-col justify-start space-y-6">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#ee1c25] mb-4">
                {newsItems[currentSlide].title}
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                {newsItems[currentSlide].description}
              </p>
            </div>

            {/* Dynamic Button */}
            <div>
              <a
                href={newsItems[currentSlide].link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-[#FFE066] text-black px-8 py-4 rounded-full font-semibold text-lg md:text-xl border border-black transition transform hover:scale-105">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Hashtag */}
        <p className="mt-12 mb-10 text-center text-[#2e3192] font-bold text-xl md:text-3xl lg:text-4xl">
          #BawatBuhayMahalagaSaDSWD
        </p>
      </div>
    </section>
  );
};

export default NewsEvents;
