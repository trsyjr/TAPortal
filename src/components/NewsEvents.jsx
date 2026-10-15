import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// React Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import News1 from "../assets/news&events/News1.jpg";
import News2 from "../assets/news&events/News2.jpg";
import News3 from "../assets/news&events/News3.jpg";
import News4 from "../assets/news&events/News4.jpg";
import News5 from "../assets/news&events/News5.jpg";
import News6 from "../assets/news&events/News6.jpg";
import News7 from "../assets/news&events/News7.jpg";
import News8 from "../assets/news&events/News8.jpg";
import News9 from "../assets/news&events/News9.jpg";
import News10 from "../assets/news&events/News10.jpg";

const NewsEvents = () => {
  const newsItems = [
    {
      image: News1,
      title: "𝗕𝗘𝗛𝗜𝗡𝗗 𝗧𝗛𝗘 𝗦𝗖𝗘𝗡𝗘𝗦: 𝗣𝗥𝗘𝗣𝗔𝗥𝗜𝗡𝗚 𝗙𝗢𝗥 𝗧𝗛𝗘 𝗘𝗙𝗟 𝗦𝗨𝗠𝗠𝗜𝗧 𝟮𝟬𝟮𝟲!",
      description: [
        "Final touches and technical checks are underway! Here’s a sneak peek at our studio setup during today's dry run for the Economic and Financial Literacy (EFL) Summit 2026.",
        "Our Masters of Ceremony 𝘈𝘵𝘵𝘺. 𝘑𝘶𝘴𝘵𝘪𝘯 𝘊𝘢𝘦𝘴𝘢𝘳 𝘈𝘯𝘵𝘩𝘰𝘯𝘺 𝘋. 𝘉𝘢𝘵𝘰𝘤𝘢𝘣𝘦 (𝘉𝘶𝘳𝘦𝘢𝘶 𝘋𝘪𝘳𝘦𝘤𝘵𝘰𝘳, 𝘋𝘚𝘞𝘋 𝘈𝘤𝘢𝘥𝘦𝘮𝘺) 𝘢𝘯𝘥 𝘔𝘴. 𝘑𝘦𝘴𝘴𝘪𝘤𝘢 𝘐𝘯𝘢𝘩 𝘊. 𝘗𝘢𝘯𝘨𝘢𝘯 (𝘛𝘦𝘤𝘩𝘯𝘪𝘤𝘢𝘭 𝘚𝘵𝘢𝘧𝘧, 𝘒𝘔𝘋-𝘒𝘗𝘚𝘚), along with the dedicated production team, are gearing up to bring you an engaging and insightful session tomorrow!",
        "We are all set to deliver valuable knowledge on managing finances, economic awareness, and building a secure future for every Filipino family.",
      ],
      link: "https://www.facebook.com/share/p/1FJ8BxZjDq/",
    },
    {
      image: News2,
      title: "𝗦𝘁𝗿𝗲𝗻𝗴𝘁𝗵𝗲𝗻𝗶𝗻𝗴 𝗦𝗼𝗰𝗶𝗮𝗹 𝗣𝗿𝗼𝘁𝗲𝗰𝘁𝗶𝗼𝗻 𝗔𝗰𝗿𝗼𝘀𝘀 𝗔𝗦𝗘𝗔𝗡: 𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗛𝗲𝗹𝗽𝘀 𝗦𝗵𝗮𝗽𝗲 𝗥𝗲𝗴𝗶𝗼𝗻𝗮𝗹 𝗖𝘂𝗿𝗿𝗶𝗰𝘂𝗹𝘂𝗺",
      description: [
        "Stronger social protection systems begin with people equipped to turn policies into meaningful support for individuals, families, and communities. With this shared goal, the DSWD Academy joined regional experts at the 𝙀𝙭𝙥𝙚𝙧𝙩 𝙒𝙤𝙧𝙠𝙞𝙣𝙜 𝙂𝙧𝙤𝙪𝙥 𝙒𝙤𝙧𝙠𝙨𝙝𝙤𝙥 𝙤𝙣 𝙩𝙝𝙚 𝘾𝙪𝙧𝙧𝙞𝙘𝙪𝙡𝙪𝙢 𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙢𝙚𝙣𝙩 𝙛𝙤𝙧 𝙎𝙤𝙘𝙞𝙖𝙡 𝙋𝙧𝙤𝙩𝙚𝙘𝙩𝙞𝙤𝙣 𝙞𝙣 𝘼𝙎𝙀𝘼𝙉, 𝙝𝙚𝙡𝙙 𝙤𝙣 29–30 𝙎𝙚𝙥𝙩𝙚𝙢𝙗𝙚𝙧 2026 𝙞𝙣 𝘽𝙖𝙣𝙜𝙠𝙤𝙠, 𝙏𝙝𝙖𝙞𝙡𝙖𝙣𝙙.",
        "The workshop brought together 17 specialists from government agencies, international organizations, and relevant institutions to review and refine a curriculum responsive to ASEAN’s evolving social protection landscape and the needs of its Member States.",
        "Representing DSWD were 𝙍𝙎𝙄𝘿𝙂 𝘼𝙨𝙨𝙞𝙨𝙩𝙖𝙣𝙩 𝙎𝙚𝙘𝙧𝙚𝙩𝙖𝙧𝙮 𝙅𝙖𝙣𝙚𝙩 𝙋. 𝘼𝙧𝙢𝙖𝙨, 𝘿𝙎𝙒𝘿 𝘼𝙘𝙖𝙙𝙚𝙢𝙮–𝙆𝙣𝙤𝙬𝙡𝙚𝙙𝙜𝙚 𝙈𝙖𝙣𝙖𝙜𝙚𝙢𝙚𝙣𝙩 𝘿𝙞𝙫𝙞𝙨𝙞𝙤𝙣 𝘾𝙝𝙞𝙚𝙛 𝙈𝙖𝙧𝙞𝙜𝙧𝙖𝙘𝙚 𝘿. 𝙈𝙖𝙩𝙚𝙪𝙢, 𝙖𝙣𝙙 𝙋𝘿𝙋𝘽 𝙊𝙄𝘾-𝘼𝙨𝙨𝙞𝙨𝙩𝙖𝙣𝙩 𝘽𝙪𝙧𝙚𝙖𝙪 𝘿𝙞𝙧𝙚𝙘𝙩𝙤𝙧 𝙍𝙞𝙯𝙯𝙖 𝙅𝙖𝙣𝙚 𝙁𝙧𝙖𝙣𝙘𝙞𝙨𝙘𝙤 𝘼𝙯𝙪𝙘𝙚𝙣𝙖. The delegation contributed expertise and Philippine perspectives to help strengthen the curriculum’s relevance for social work and social welfare practitioners across the region.",
        "The workshop was organized by the 𝘼𝙎𝙀𝘼𝙉 𝙏𝙧𝙖𝙞𝙣𝙞𝙣𝙜 𝘾𝙚𝙣𝙩𝙧𝙚 𝙛𝙤𝙧 𝙎𝙤𝙘𝙞𝙖𝙡 𝙒𝙤𝙧𝙠 𝙖𝙣𝙙 𝙎𝙤𝙘𝙞𝙖𝙡 𝙒𝙚𝙡𝙛𝙖𝙧𝙚 (𝘼𝙏𝘾𝙎𝙒), 𝙞𝙣 𝙘𝙤𝙡𝙡𝙖𝙗𝙤𝙧𝙖𝙩𝙞𝙤𝙣 𝙬𝙞𝙩𝙝 𝙩𝙝𝙚 𝙋𝙧𝙤𝙟𝙚𝙘𝙩 𝙛𝙤𝙧 𝙃𝙪𝙢𝙖𝙣 𝙍𝙚𝙨𝙤𝙪𝙧𝙘𝙚 𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙢𝙚𝙣𝙩 𝙤𝙣 𝙎𝙤𝙘𝙞𝙖𝙡 𝙒𝙤𝙧𝙠 𝙞𝙣 𝙩𝙝𝙚 𝘼𝙎𝙀𝘼𝙉 𝙍𝙚𝙜𝙞𝙤𝙣 𝙖𝙣𝙙 𝙅𝙄𝘾𝘼. As a regional platform, ATCSW advances practitioner capacity through training, knowledge exchange, and professional development. Through this collaboration, DSWD affirms its commitment to shared learning, stronger workforce capacity, and more responsive social protection systems across ASEAN."
      ],
      link: "https://www.facebook.com/share/p/19WKkoD7Lc/",
    },
    {
      image: News3,
      title: "𝗠𝗶𝗻𝗱𝗮𝗻𝗮𝗼 𝗽𝗮𝗿𝘁𝗻𝗲𝗿𝘀 𝗿𝗲𝗰𝗼𝗴𝗻𝗶𝘇𝗲𝗱 𝗳𝗼𝗿 𝗼𝘂𝘁𝘀𝘁𝗮𝗻𝗱𝗶𝗻𝗴 𝘀𝗼𝗰𝗶𝗮𝗹 𝘄𝗲𝗹𝗳𝗮𝗿𝗲 𝗽𝗿𝗮𝗰𝘁𝗶𝗰𝗲𝘀 𝗶𝗻 𝗣𝗮𝗡𝗮𝗧𝗮 𝗞𝗼 𝘀𝗮 𝗕𝗮𝘆𝗮𝗻 𝗔𝘄𝗮𝗿𝗱𝘀",
      description: [
        "DAVAO CITY – Exemplary local government units (LGUs) and social welfare and development partners from across Mindanao were recognized for outstanding contributions, innovative practices, and commitment to quality social welfare services during the 2025 PaNaTa Ko sa Bayan Awards and 2026 Search for Outstanding Social Work Agencies (SWAs) and Auxiliary Social Welfare and Development Agencies (SWDAs) on September 30, 2026, at The Royal Mandaya Hotel, Davao City.",
        "Hosted by the DSWD Academy in collaboration with DSWD Field Office XI, the ceremony formed part of the Mindanao Cluster Consultation Workshop, which brought together social welfare practitioners, LGUs, SWDAs, and DSWD personnel from Zamboanga Peninsula (Region IX), Northern Mindanao (Region X), Davao Region (Region XI), SOCCSKSARGEN (Region XII), and the Caraga Region (CARAGA) from September 28 to October 1, 2026."
      ],
      link: "https://www.facebook.com/share/p/1E4rbe9Quh/",
    },
    {
      image: News4,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 𝗼𝗳𝗳𝗶𝗰𝗶𝗮𝗹𝘀 𝘃𝗶𝘀𝗶𝘁 𝗼𝗻𝗴𝗼𝗶𝗻𝗴 𝗠𝗶𝗻𝗱𝗮𝗻𝗮𝗼 𝘁𝗿𝗮𝗶𝗻𝗶𝗻𝗴 𝗳𝗮𝗰𝗶𝗹𝗶𝘁𝘆 𝗶𝗻 𝗗𝗮𝘃𝗮𝗼 𝗖𝗶𝘁𝘆",
      description: [
        "The DSWD Academy conducted a site visit to the ongoing construction of the DSWD Academy in Mindanao on September 16, 2026, at the Regional Government Center (RGC), Bago Oshiro, Davao City.",
        "The visit was led by Atty. Justin Caesar Anthony D. Batocabe, CESE, Director IV of the DSWD Academy, together with Rogelio Tomas L. Gutierrez, Project Development Officer V.",
        "The facility is being developed to support the training, capacity-building, and professional development of DSWD personnel in Mindanao. It is also envisioned to provide a dedicated space for learning activities and other programs of the Department.",
        "During the visit, the officials inspected the ongoing construction and discussed the progress and development of the project. They also coordinated with DSWD Field Office XI on matters related to the continued implementation of the facility.",
        "Once completed, the Mindanao training facility will serve as a venue for various training and learning activities, helping strengthen the skills and capabilities of DSWD personnel across the region."
      ],
      link: "https://www.facebook.com/share/p/1CTtB8m21H/",
    },
    {
      image: News5,
      title: "𝗗𝗦𝗪𝗗 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹𝘀 𝗜𝗻𝘀𝗽𝗲𝗰𝘁 𝗜𝗺𝗽𝗿𝗼𝘃𝗲𝗺𝗲𝗻𝘁𝘀 𝗮𝘁 𝘁𝗵𝗲 𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆",
      description: [
        "DSWD Academy 𝘿𝙞𝙧𝙚𝙘𝙩𝙤𝙧 𝙄𝙑 𝘼𝙩𝙩𝙮. 𝙅𝙪𝙨𝙩𝙞𝙣 𝘾𝙖𝙚𝙨𝙖𝙧 𝘼𝙣𝙩𝙝𝙤𝙣𝙮 𝘿. 𝘽𝙖𝙩𝙤𝙘𝙖𝙗𝙚 presented the ongoing improvements, upgrades, and expansion of the 𝘿𝙎𝙒𝘿 𝘼𝙘𝙖𝙙𝙚𝙢𝙮 𝙞𝙣 𝙏𝙖𝙜𝙪𝙞𝙜 𝘾𝙞𝙩𝙮 𝙩𝙤 𝘿𝙎𝙒𝘿 𝙎𝙚𝙘𝙧𝙚𝙩𝙖𝙧𝙮 𝙍𝙚𝙭 𝙂𝙖𝙩𝙘𝙝𝙖𝙡𝙞𝙖𝙣 𝙖𝙣𝙙 𝘼𝙨𝙨𝙞𝙨𝙩𝙖𝙣𝙩 𝙎𝙚𝙘𝙧𝙚𝙩𝙖𝙧𝙮 𝙅𝙖𝙣𝙚𝙩 𝙋. 𝘼𝙧𝙢𝙖𝙨, 𝘾𝙀𝙎𝙊 𝙄𝙑, together with Academy personnel and the project contractors.",
        "Once completed, the 𝙚𝙣𝙝𝙖𝙣𝙘𝙚𝙙 𝘿𝙎𝙒𝘿 𝘼𝙘𝙖𝙙𝙚𝙢𝙮 will serve as a venue for capacity-building activities and Continuing Professional Development (CPD) programs for DSWD personnel, LGU social workers and community development workers, NGO practitioners, and other social welfare and development professionals from the Philippines and the Indo-Pacific region.",
        "The continued development of the Academy reinforces its role as a hub for professional learning, knowledge sharing, and excellence in social work and community development."
      ],
      link: "https://www.facebook.com/share/p/1FfzX1z5NZ/",
    },
    {
      image: News6,
      title: "🎉 𝟏𝟏,𝟎𝟎𝟎 𝐓𝐈𝐌𝐄𝐒 𝐓𝐇𝐀𝐍𝐊 𝐘𝐎𝐔! 💙",
      description: [
        "We are immensely grateful to our growing community of 11,000+ followers!",
        "Thank you for being part of our journey as we continue to advance social work excellence, empower service providers, and foster continuous learning for social protection across the nation. Every like, share, and comment brings us closer to a more informed, skilled, and compassionate workforce.",
      ],
      link: "https://www.facebook.com/share/p/1DkPAP6rQT/",
    },
    {
      image: News7,
      title: "𝗘𝗺𝗽𝗼𝘄𝗲𝗿𝗶𝗻𝗴 𝘀𝗼𝗰𝗶𝗮𝗹 𝘄𝗼𝗿𝗸 𝘁𝗵𝗿𝗼𝘂𝗴𝗵 𝗵𝗶𝗴𝗵-𝗶𝗺𝗽𝗮𝗰𝘁 𝘃𝗶𝘀𝗶𝗯𝗶𝗹𝗶𝘁𝘆!",
      description: [
        "The 𝘿𝙎𝙒𝘿 𝘼𝙘𝙖𝙙𝙚𝙢𝙮  proudly presented a plaque of appreciation to 𝘿𝙞𝙜𝙞𝙩𝙖𝙡 𝙊𝙪𝙩-𝙤𝙛-𝙃𝙤𝙢𝙚 𝙄𝙣𝙘. (𝘿𝙊𝙊𝙃 𝙋𝙝𝙞𝙡𝙞𝙥𝙥𝙞𝙣𝙚𝙨) during an awarding ceremony on August 27, at Avant, The Fort in Bonifacio Global City.",
        "Through their generosity, DOOH 𝙥𝙧𝙤𝙫𝙞𝙙𝙚𝙙 𝙛𝙧𝙚𝙚 𝙇𝙀𝘿 𝙗𝙞𝙡𝙡𝙗𝙤𝙖𝙧𝙙 𝙖𝙙𝙫𝙚𝙧𝙩𝙞𝙨𝙞𝙣𝙜 𝙖𝙘𝙧𝙤𝙨𝙨 𝙩𝙝𝙚𝙞𝙧 𝙢𝙖𝙟𝙤𝙧 𝙨𝙞𝙩𝙚𝙨 𝙩𝙤 𝙖𝙢𝙥𝙡𝙞𝙛𝙮 𝙖𝙣𝙙 𝙘𝙚𝙡𝙚𝙗𝙧𝙖𝙩𝙚 𝙁𝙞𝙡𝙞𝙥𝙞𝙣𝙤 𝙎𝙤𝙘𝙞𝙖𝙡 𝙒𝙤𝙧𝙠𝙚𝙧𝙨’ 𝘿𝙖𝙮.",
        "By giving our modern-day heroes the spotlight they deserve on big screens nationwide, DOOH Philippines has shown true commitment to recognizing public service.",
        "Thank you, Mr. Alvin Carranza and the entire DOOH Philippines team, for standing with our social workers and using your platform for social good! 💙"
      ],
      link: "https://www.facebook.com/share/p/1F5qQRTeLX/",
    },
    {
      image: News8,
      title: "𝗔 𝘀𝘁𝗿𝗼𝗻𝗴 𝗽𝗮𝗿𝘁𝗻𝗲𝗿𝘀𝗵𝗶𝗽 𝗺𝗮𝗸𝗲𝘀 𝗳𝗼𝗿 𝗮 𝘀𝗮𝗳𝗲𝗿, 𝗯𝗿𝗶𝗴𝗵𝘁𝗲𝗿 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆!",
      description: [
        "Today, the DSWD Academy officially presented a Plaque of Appreciation to 𝘽𝙖𝙧𝙖𝙣𝙜𝙖𝙮 𝙁𝙤𝙧𝙩 𝘽𝙤𝙣𝙞𝙛𝙖𝙘𝙞𝙤, 𝙏𝙖𝙜𝙪𝙞𝙜 𝘾𝙞𝙩𝙮, led by Barangay Captain Lysandre T. 'Sonny' Vertulfo and the Barangay Kagawads, honoring our strong partnership.",
        "Through their unwavering support, the DSWD Academy continuously benefits from vital community services, including: 𝙈𝙤𝙨𝙦𝙪𝙞𝙩𝙤 𝙢𝙞𝙨𝙩𝙞𝙣𝙜 for health and sanitation, 𝙄𝙣𝙨𝙩𝙖𝙡𝙡𝙖𝙩𝙞𝙤𝙣 𝙤𝙛 𝙡𝙞𝙜𝙝𝙩𝙨 at the main gate for a safer environment for our guests, 𝘼𝙢𝙗𝙪𝙡𝙖𝙣𝙘𝙚 𝙨𝙪𝙥𝙥𝙤𝙧𝙩 and 𝙖𝙨𝙨𝙞𝙨𝙩𝙖𝙣𝙘𝙚 𝙛𝙧𝙤𝙢 𝙜𝙤𝙫𝙚𝙧𝙣𝙢𝙚𝙣𝙩 𝙝𝙤𝙨𝙥𝙞𝙩𝙖𝙡𝙨 in Taguig during emergencies",
        "The awarding ceremony was led by 𝘿𝙎𝙒𝘿 𝘼𝙘𝙖𝙙𝙚𝙢𝙮 𝘿𝙞𝙧𝙚𝙘𝙩𝙤𝙧 𝘼𝙩𝙩𝙮. 𝙅𝙪𝙨𝙩𝙞𝙣 𝘾𝙖𝙚𝙨𝙖𝙧 𝘼𝙣𝙩𝙝𝙤𝙣𝙮 𝘽𝒂𝙩𝒐𝙘𝒂𝙗𝒆",
        "Thank you, 𝘽𝙖𝙧𝙖𝙣𝙜𝙖𝙮 𝘾𝙖𝙥𝙩𝙖𝙞𝙣 𝙎𝙤𝙣𝙣𝙮 𝙑𝙚𝙧𝙩𝙪𝙡𝙛𝙤 𝙖𝙣𝙙 𝙩𝙝𝙚 𝙚𝙣𝙩𝙞𝙧𝙚 𝘽𝙖𝙧𝙖𝙣𝙜𝙖𝙮 𝙁𝙤𝙧𝙩 𝘽𝙤𝙣𝙞𝙛𝙖𝙘𝙞𝙤 𝘾𝙤𝙪𝙣𝙘𝙞𝙡, for your steadfast commitment to public service and collaboration. Here’s to doing more together for the community! 💙"
      ],
      link: "https://www.facebook.com/share/p/19hvPTDwhB/",
    },
    {
      image: News9,
      title: "𝗗𝗦𝗪𝗗 𝗔𝗰𝗮𝗱𝗲𝗺𝘆 – 𝗞𝗻𝗼𝘄𝗹𝗲𝗱𝗴𝗲 𝗠𝗮𝗻𝗮𝗴𝗲𝗺𝗲𝗻𝘁 𝗗𝗶𝘃𝗶𝘀𝗶𝗼𝗻 𝘄𝗲𝗹𝗰𝗼𝗺𝗲𝘀 𝗩𝗶𝗲𝘁𝗻𝗮𝗺𝗲𝘀𝗲 𝗴𝗼𝘃𝗲𝗿𝗻𝗺𝗲𝗻𝘁 𝗮𝗻𝗱 𝗨𝗡𝗜𝗖𝗘𝗙 𝗩𝗶𝗲𝘁 𝗡𝗮𝗺 𝗱𝗲𝗹𝗲𝗴𝗮𝘁𝗲𝘀 for a Study Visit on 𝙎𝙩𝙧𝙚𝙣𝙜𝙩𝙝𝙚𝙣𝙞𝙣𝙜 𝙎𝙝𝙤𝙘𝙠-𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙞𝙫𝙚 𝙎𝙤𝙘𝙞𝙖𝙡 𝙋𝙧𝙤𝙩𝙚𝙘𝙩𝙞𝙤𝙣 𝙎𝙮𝙨𝙩𝙚𝙢𝙨.",
      description: [
        "The exchange centers on the Philippines’ institutional arrangements, financing mechanisms, emergency cash transfers, digital innovations, and Cash Plus linkages—offering practical insights to support Viet Nam in advancing a more resilient, government-led, and child-sensitive social protection system.",
      ],
      link: "https://www.facebook.com/share/p/1ENbdTR7WM/",
    },
    {
      image: News10,
      title: "𝗦𝘁𝗿𝗲𝗻𝗴𝘁𝗵𝗲𝗻𝗶𝗻𝗴 𝗼𝗿𝗴𝗮𝗻𝗶𝘇𝗮𝘁𝗶𝗼𝗻𝘀 𝘁𝗵𝗮𝘁 𝘀𝘁𝗿𝗲𝗻𝗴𝘁𝗵𝗲𝗻 𝗼𝘂𝗿 𝘀𝗼𝗰𝗶𝗮𝗹 𝘄𝗲𝗹𝗳𝗮𝗿𝗲 𝘄𝗼𝗿𝗸𝗳𝗼𝗿𝗰𝗲.",
      description: [
        "The DSWD, through the 𝘿𝙎𝙒𝘿 𝘼𝙘𝙖𝙙𝙚𝙢𝙮, supported the Association of Local Social Welfare and Development Officers of the Philippines, Inc. (ALSWDOPI) in its Strategic Planning and Board Strengthening Activity held in Sorsogon.",
        "Facilitated by 𝘿𝙎𝙒𝘿 𝘼𝙘𝙖𝙙𝙚𝙢𝙮 𝙆𝙣𝙤𝙬𝙡𝙚𝙙𝙜𝙚 𝙈𝙖𝙣𝙖𝙜𝙚𝙢𝙚𝙣𝙩 𝘿𝙞𝙫𝙞𝙨𝙞𝙤𝙣 𝘾𝙝𝙞𝙚𝙛 𝙈𝙖𝙧𝙞𝙜𝙧𝙖𝙘𝙚 𝘿. 𝙈𝙖𝙩𝙚𝙪𝙢, the process challenged the Board to look beyond activities and define what ALSWDOPI must become - and how it will get there.",
        "Emerging from the discussions are strategic directions toward 𝙨𝙩𝙧𝙤𝙣𝙜𝙚𝙧 𝙤𝙧𝙜𝙖𝙣𝙞𝙯𝙖𝙩𝙞𝙤𝙣𝙖𝙡 𝙜𝙤𝙫𝙚𝙧𝙣𝙖𝙣𝙘𝙚 𝙖𝙣𝙙 𝙨𝙪𝙨𝙩𝙖𝙞𝙣𝙖𝙗𝙞𝙡𝙞𝙩𝙮, 𝙥𝙧𝙤𝙛𝙚𝙨𝙨𝙞𝙤𝙣𝙖𝙡 𝙙𝙚𝙫𝙚𝙡𝙤𝙥𝙢𝙚𝙣𝙩, 𝙢𝙚𝙢𝙗𝙚𝙧 𝙚𝙣𝙜𝙖𝙜𝙚𝙢𝙚𝙣𝙩, 𝙥𝙤𝙡𝙞𝙘𝙮, 𝙧𝙚𝙨𝙚𝙖𝙧𝙘𝙝 𝙖𝙣𝙙 𝙖𝙙𝙫𝙤𝙘𝙖𝙘𝙮, 𝙖𝙣𝙙 𝙨𝙩𝙧𝙖𝙩𝙚𝙜𝙞𝙘 𝙥𝙖𝙧𝙩𝙣𝙚𝙧𝙨𝙝𝙞𝙥𝙨. More importantly, the Board began laying the groundwork for clearer priorities, committee accountabilities, measurable results, and stronger systems to translate these directions into action.",
        "The activity also opened opportunities to position ALSWDOPI's national network as a stronger platform for 𝙬𝙤𝙧𝙠𝙛𝙤𝙧𝙘𝙚 𝙙𝙚𝙫𝙚𝙡𝙤𝙥𝙢𝙚𝙣𝙩, 𝙠𝙣𝙤𝙬𝙡𝙚𝙙𝙜𝙚 𝙨𝙝𝙖𝙧𝙞𝙣𝙜, 𝙥𝙤𝙡𝙞𝙘𝙮 𝙛𝙚𝙚𝙙𝙗𝙖𝙘𝙠 𝙖𝙣𝙙 𝙖𝙙𝙫𝙤𝙘𝙖𝙘𝙮, 𝙖𝙣𝙙 𝙗𝙧𝙞𝙣𝙜𝙞𝙣𝙜 𝙩𝙝𝙚 𝙧𝙚𝙖𝙡𝙞𝙩𝙞𝙚𝙨 𝙤𝙛 𝙡𝙤𝙘𝙖𝙡 𝙨𝙤𝙘𝙞𝙖𝙡 𝙬𝙚𝙡𝙛𝙖𝙧𝙚 𝙥𝙧𝙖𝙘𝙩𝙞𝙘𝙚 𝙘𝙡𝙤𝙨𝙚𝙧 𝙩𝙤 𝙣𝙖𝙩𝙞𝙤𝙣𝙖𝙡 𝙥𝙤𝙡𝙞𝙘𝙮 𝙖𝙣𝙙 𝙥𝙧𝙤𝙜𝙧𝙖𝙢 𝙙𝙚𝙫𝙚𝙡𝙤𝙥𝙢𝙚𝙣𝙩.",
        "For DSWD, supporting strong professional organizations is an investment in the people delivering social welfare and development services in our communities.  Our appreciation to the 𝙋𝒓𝙤𝒗𝙞𝒏𝙘𝒊𝙖𝒍 𝑮𝙤𝒗𝙚𝒓𝙣𝒎𝙚𝒏𝙩 𝙤𝒇 𝑺𝙤𝒓𝙨𝒐𝙜𝒐𝙣, 𝒕𝙝𝒓𝙤𝒖𝙜𝒉 𝒕𝙝𝒆 𝒍𝙚𝒂𝙙𝒆𝙧𝒔𝙝𝒊𝙥 𝙤𝒇 𝒕𝙝𝒆 𝑷𝙧𝒐𝙫𝒊𝙣𝒄𝙞𝒂𝙡 𝙂𝒐𝙫𝒆𝙧𝒏𝙤𝒓, 𝙖𝒏𝙙 𝙩𝒉𝙚 𝘼𝑳𝙎𝑾𝘿𝑶𝙋𝑰 𝑺𝙤𝒓𝙨𝒐𝙜𝒐𝙣 𝘾𝒉𝙖𝒑𝙩𝒆𝙧 for graciously hosting the activity and for sharing local innovations and practices that enriched the learning and planning process.",
        "𝙏𝙝𝙚 𝙙𝙞𝙧𝙚𝙘𝙩𝙞𝙤𝙣 𝙞𝙨 𝙨𝙚𝙩. 𝙏𝙝𝙚 𝙣𝙚𝙭𝙩 𝙨𝙩𝙚𝙥 𝙞𝙨 𝙩𝙪𝙧𝙣𝙞𝙣𝙜 𝙨𝙩𝙧𝙖𝙩𝙚𝙜𝙮 𝙞𝙣𝙩𝙤 𝙖𝙘𝙩𝙞𝙤𝙣 - 𝙖𝙣𝙙 𝙖𝙘𝙩𝙞𝙤𝙣 𝙞𝙣𝙩𝙤 𝙧𝙚𝙨𝙪𝙡𝙩𝙨. 𝙎𝙩𝙧𝙤𝙣𝙜𝙚𝙧 𝙤𝙧𝙜𝙖𝙣𝙞𝙯𝙖𝙩𝙞𝙤𝙣𝙨. 𝙎𝙩𝙧𝙤𝙣𝙜𝙚𝙧 𝙥𝙧𝙖𝙘𝙩𝙞𝙩𝙞𝙤𝙣𝙚𝙧𝙨. 𝘽𝙚𝙩𝙩𝙚𝙧 𝙨𝙚𝙧𝙫𝙞𝙘𝙚 𝙛𝙤𝙧 𝙚𝙫𝙚𝙧𝙮 𝙁𝙞𝙡𝙞𝙥𝙞𝙣𝙤."
      ],
      link: "https://www.facebook.com/share/p/1GraW2AMSf/",
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