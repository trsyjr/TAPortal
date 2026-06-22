import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPeopleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5"; 
import TABG from "../assets/TABG.png";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const exampleEvents = [
  {
    id: 1,
    startDate: new Date(2026, 1, 23),
    endDate: new Date(2026, 1, 27),
    title: "TRAINING ON PRE-MARRIAGE COUNSELING BATCH 7",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "DSWD Academy Taguig (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: News3,
    colorId: 1,
  },
  {
    id: 2,
    startDate: new Date(2026, 1, 23),
    endDate: new Date(2026, 1, 27),
    title: "LOCALIZED TRAINING ON PRE-MARRIAGE COUNSELING",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "Bataan (Central Luzon)",
    tag: "WITH CPD UNITS",
    target: "Local Government Units",
    image: "",
    colorId: 2,
  },
  {
    id: 3,
    startDate: new Date(2026, 2, 8),
    endDate: new Date(2026, 2, 14),
    title: "TRAINING OF TRAINERS PARENT EFFECTIVENESS SERVICE",
    description: "The Training of Trainers (ToT) on the Parent Effectiveness Service (PES) Program Facilitators equips a nationwide pool of DSWD and LGU technical trainers with the competencies to deliver standardized PES modules, facilitation methodologies, and monitoring mechanisms in line with Republic ACT No. 11908 and its Implementing Rules and Regulations. It strenghtens their capacity to provide technical assistance, train PES facilitators, and ensure consistent, quality implementation of the program across regions, provinces, and municipalities. It also supports effective parenting education and promotes the holistic development and protection of Filipino children and families.",
    venue: "Baguio City (Cordillera Administrative Region)",
    tag: "TRAINING OF TRAINERS",
    target: "Field Offices, Provincial Social Welfare and Development Office (PSWDOs)",
    image: "",
    colorId: 1,
  },
  {
    id: 4,
    startDate: new Date(2026, 2, 9),
    endDate: new Date(2026, 2, 13),
    title: "LOCALIZED TRAINING ON PRE-MARRIAGE COUNSELING",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conduction the Pre-marriage Orientation and Counceling (PMOC) program",
    venue: "Palompon (Eastern Visayas)",
    tag: "WITH CPD UNITS",
    target: "Local Government Units",
    image: "",
    colorId: 2,
  },
  {
    id: 5,
    startDate: new Date(2026, 2, 10),
    endDate: new Date(2026, 2, 13),
    title: "Pilot Implementation of the training manual on Parenting  LGBTQ+ Residents in DSWD Centers and Residential Care Facilities: Creating a Safe, Affirming and Inclusive Environment",
    description: "House parents in DSWD Centers and Residential Care Facilities (CRCFs) play a critical role in ensuring the safety, well-being, and holistic development of residents, yet they often face significant challenges in meeting diverse needs. Lesbian, gay, bisexual, transgender, queer or questioning, intersex, asexual, and more (LGBTQIA+) residents, in particular, experience additional layers of vulnerability that require house parents to apply intentional, nonjudgemental, and supportive parenting approaches. This program equips house parents with essential skills to create affirming, safe, and inclusive environments where LGBTQIA+ residents feel cared for, valued, and protected",
    venue: "Region VI",
    tag: "PILOT",
    target: "Supervising Social Work, Houseparent, Teacher, Psychometrician, Psychologists",
    image: "",
    colorId: 3,
  },
  {
    id: 6,
    startDate: new Date(2026, 2, 16),
    endDate: new Date(2026, 2, 20),
    title: "Training of Trainers on Modules on Nutrition Care Process Capacity Building for Houseparents in DSWD Residential Care Facilities for Children and Youth",
    description: "To equip the DSWD trainers  with instructional, supervisory, and evaluative skills for nutrition capacity building on implementing the Nutrition Care Process (NCP) to improve the nutritional status of children and youth in residential facilities.",
    venue: "MIMAROPA",
    tag: "TRAINING OF TRAINERS",
    target: "Supervising Houseparent, Nutritionist, Medical Personnel",
    image: "",
    colorId: 3,
  },
  {
    id: 7,
    startDate: new Date(2026, 2, 22),
    endDate: new Date(2026, 2, 28),
    title: "Training of Trainers Parent Effectiveness Service",
    description: "The Training of Trainers (ToT) on the Parent Effectiveness Service (PES) Program Facilitators equips a nationwide pool of DSWD and LGU technical trainers with the competencies to deliver standardized PES modules, facilitation methodologies, and monitoring mechanisms in line with Republic Act No. 11908 and its Implementing Rules and Regulations. It strengthens their capacity to provide technical assistance, train PES facilitators, and ensure consistent, quality implementation of the program across regions, provinces, and municipalities. It also supports effective parenting education and promotes the holistic development and protection of Filipino children and families.",
    venue: "National Capital Region",
    tag: "TRAINING OF TRAINERS",
    target: "Field Offices, Provincial Social Welfare and Development Office (PSWDOs)",
    image: "",
    colorId: 1,
  },
  {
    id: 8,
    startDate: new Date(2026, 2, 22),
    endDate: new Date(2026, 2, 27),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Cordillera Administrative Region",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 9,
    startDate: new Date(2026, 2, 23),
    endDate: new Date(2026, 2, 27),
    title: "Foundational Course on Women, Peace, and Security for GAD Focal Persons",
    description: "This training program is a five-day (with half-days on Day 1 and Day 5) Gender-Responsive, Conflict-Sensitive, and Peace-Promoting (CSPP) capacity-building program for Department of Social Welfare and Development (DSWD) case managers and personnel working in conflict-affected and conflict-vulnerable contexts. The design mirrors the canonical CSPP training flow facilitated for DSWD PDOs and case managers last 2025 with OPAPRU, while being enhanced by the Women, Peace and Security Center of Excellence (WPS CoE) to foreground gender, power, participation, and protection in line with the Philippine National Action Plan on Women, Peace and Security (NAPWPS) 2023–2033.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "GAD Focal Persons",
    image: "",
    colorId: 2,
  },
  {
    id: 10,
    startDate: new Date(2026, 3, 12),
    endDate: new Date(2026, 3, 17),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Cordillera Administrative Region",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 2,
  },
  {
    id: 11,
    startDate: new Date(2026, 3, 19),
    endDate: new Date(2026, 3, 24),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region I, Region III, Region IV-A, Region V, Region VI, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 12,
    startDate: new Date(2026, 3, 19),
    endDate: new Date(2026, 3, 25),
    title: "Training of Trainers on Houseparenting",
    description: "This Training of Trainers on Houseparenting builds a sustainable pool of skilled Social Workers and allied professionals who can effectively cascade standardized, rights-based, and trauma-informed houseparenting practices nationwide to ensure safe, nurturing, and developmentally supportive care for children in residential facilities.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "TRAINING OF TRAINERS",
    target: "Core Group of Specialists, Learning Management Team",
    image: "",
    colorId: 1,
  },
  {
    id: 13,
    startDate: new Date(2026, 3, 20),
    endDate: new Date(2026, 3, 24),
    title: "Training of Trainers for Training on Pre-Marriage Counseling",
    description: "This Training of Trainers equips a nationwide pool of expert facilitators with mastery of the updated, standardized Pre-Marriage Counseling (PMC) competencies and training methodologies to ensure LGUs’ full compliance with national standards and sustain high-quality PMC implementation across all regions.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "TRAINING OF TRAINERS",
    target: "Core Group of Specialists, Learning Management Team",
    image: "",
    colorId: 2,
  },
  {
    id: 14,
    startDate: new Date(2026, 3, 21),
    endDate: new Date(2026, 3, 24),
    title: "Training of trainers of Training Manual for Caregivers on Handling Persons with Disabilities Needing Long-Term Residential Care",
    description: "",
    venue: "Region I",
    tag: "TRAINING OF TRAINERS",
    target: "Supervising Social Worker, Supervising Houseparent",
    image: "",
    colorId: 3,
  },
  {
    id: 15,
    startDate: new Date(2026, 3, 27),
    endDate: new Date(2026, 4, 1),
    title: "Rollout on Modules on Nutrition Care Process Capacity Building for Houseparents in DSWD Residential Care Facilities for Children and Youth",
    description: "This activity will enable House parents and other relevant personnel of residential care facilities for children and youth apply the  ethical, cultural, and evidence-based approaches to nutrition care delivery",
    venue: "Cordillera Administrative Region",
    tag: "TRAINING OF TRAINERS",
    target: "Houseparent, Nutritionist, Medical Personnel",
    image: "",
    colorId: 2,
  },
  {
    id: 16,
    startDate: new Date(2026, 4, 3),
    endDate: new Date(2026, 4, 8),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "NCR, Region XII, Region III, Region V, Region VI, Region II, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 17,
    startDate: new Date(2026, 4, 5),
    endDate: new Date(2026, 4, 8),
    title: "4Ps RPC Conference (1st sem)",
    description: "The conference is a semestral gathering that serves as a venue to discuss implementation, targets, directives, updates and other program-related issues both at the 4Ps national and regional levels.",
    venue: "Region VI",
    tag: "",
    target: "4Ps Regional Program Coordinators, NPMO Division Chiefs, OICs and Technical Staff",
    image: "",
    colorId: 5,
  },
  {
    id: 18,
    startDate: new Date(2026, 4, 5),
    endDate: new Date(2026, 4, 8),
    title: "Rollout of Training Manual on Basic Psychological Strategies",
    description: "The DSWD CRCF Multidisciplinary Teams  will be equipped with the essential knowledge, skills, and mindset to deliver responsive and compassionate psychological support to children and adolescents facing emotional or behavioral challenges.",
    venue: "Region III",
    tag: "",
    target: "Social Worker, Psychometrician, Houseparent, MO",
    image: "",
    colorId: 3,
  },
  {
    id: 19,
    startDate: new Date(2026, 4, 6),
    endDate: new Date(2026, 4, 8),
    title: "Internal Training for Administrative Staff",
    description: "This training is designed to enhance efficiency, accuracy, and confidence among administrative personnel while reinforcing their critical role in public service delivery. Equipped with the new set of skills, they will be able to perform their tasks more productively, effectively, and efficiently, leading to better individual and organizational performance and quality service delivery.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "Administrative and Technical Staffs",
    image: "",
    colorId: 2,
  },
  {
    id: 20,
    startDate: new Date(2026, 4, 10),
    endDate: new Date(2026, 4, 15),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region VII, Region XI, Region II, Region IV-A, MIMAROPA, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 21,
    startDate: new Date(2026, 4, 11),
    endDate: new Date(2026, 4, 15),
    title: "TOT of the Facilitator’s Manual for Social Work Case Management for CANE+D Children in Center and Residential Care Facilities: A Training  Course for CRCF Social Workers",
    description: "This training of trainers will be done in order to equip the future trainers and facilitators of the Case Management for CANE+D Children in Center and Residential Care Facilities Training.  It will review basic principles of adult learning as well as go through the entire training course.",
    venue: "Region X",
    tag: "",
    target: "Center Head, Supervising Social Worker",
    image: "",
    colorId: 3,
  },
  {
    id: 22,
    startDate: new Date(2026, 4, 11),
    endDate: new Date(2026, 4, 15),
    title: "Training on Pre-Marriage Counseling batch 2",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: "",
    colorId: 2,
  },
  {
    id: 23,
    startDate: new Date(2026, 4, 17),
    endDate: new Date(2026, 4, 22),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region III, Region IV-A, and CARAGA",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 24,
    startDate: new Date(2026, 4, 19),
    endDate: new Date(2026, 4, 22),
    title: "TOT of training manual on Parenting  LGBTQ+ Residents in DSWD Centers and Residential Care Facilities: Creating a Safe, Affirming and Inclusive Environment",
    description: "It aims to strengthen the knowledge, attitudes, and facilitation skills of caregivers and service providers in supporting LGBTQ+ residents in DSWD centers and residential care facilities. It equips trainers with practical, gender-responsive and trauma-informed approaches to guide parenting and caregiving practices that promote safety, dignity, and inclusion.",
    venue: "Region IX",
    tag: "TRAINING OF TRAINERS",
    target: "Center Head, Supervising Social Worker, Social Worker, Supervising Houseparent, Teacher, Psychometrician,Psychologists",
    image: "",
    colorId: 3,
  },
  {
    id: 25,
    startDate: new Date(2026, 4, 24),
    endDate: new Date(2026, 4, 26),
    title: "Rollout Parent Effectiveness Service",
    description: "",
    venue: "Region I, Region VII, Region V, Region X, and MIMAROPA",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 3,
  },
  {
    id: 27,
    startDate: new Date(2026, 4, 24),
    endDate: new Date(2026, 4, 26),
    title: "rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region I, Region VII, Region V, Region X, and MIMAROPA",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 28,
    startDate: new Date(2026, 4, 31),
    endDate: new Date(2026, 5, 5),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region VIII, Region XI, Region VI, Region IX, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 29,
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 5),
    title: "Training on Pre-Marriage Counseling BATCH 3",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: "",
    colorId: 2,
  },
  {
    id: 30,
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 5),
    title: "Training on Pre-Marriage Counseling BATCH 4",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: "",
    colorId: 2,
  },
  {
    id: 31,
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 5),
    title: "Upskilling on Social Work Counseling: Counseling Competencies for Today’s Social Worker Batch 1",
    description: "This training equips DSWD CRCF social workers with essential counseling competencies to effectively assess and support vulnerable and high-need clients in both in-person and remote settings. Participants will strengthen their key counseling skills, ethical decision-making, and cultural competence while applying trauma-informed and client-centered approaches in diverse practice situations. The program also emphasizes practical self-care strategies to help social workers manage stress, prevent burnout, and sustain professional effectiveness in demanding work environments.",
    venue: "Region VII",
    tag: "",
    target: "Child, Youth, Women, Family, OP, Persons With Disabillities",
    image: "",
    colorId: 3,
  },
  {
    id: 32,
    startDate: new Date(2026, 5, 1),
    endDate: new Date(2026, 5, 5),
    title: "Upskilling on Strategic Communications",
    description: "This Upskilling Program on Strategic Communication is designed for CRCF Center Heads and Supervising Social Workers to strengthen their communication and leadership skills in managing teams and engaging stakeholders. It enhances their ability to deliver clear messages, handle difficult conversations, and manage conflict effectively, especially in sensitive and high-pressure situations. The program equips participants with practical strategies to promote collaboration, transparency, and effective service delivery within their centers.",
    venue: "CARAGA",
    tag: "",
    target: "Center Head, Supervising Social Worker",
    image: "",
    colorId: 3,
  },
  {
    id: 33,
    startDate: new Date(2026, 5, 14),
    endDate: new Date(2026, 5, 19),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region VIII, Region IX, Region XII, Region VI, and others.",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 34,
    startDate: new Date(2026, 5, 22),
    endDate: new Date(2026, 5, 27),
    title: "Training on Houseparenting",
    description: "This training aims to improve the competencies of houseparents, as frontline service providers, in handling and managing children under their care.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "",
    target: "Field Offices, Social Welfare and Developmental Agencies, and LGU-Managed Centers/Residential Care Facilities",
    image: "",
    colorId: 2,
  },
  {
    id: 35,
    startDate: new Date(2026, 5, 28),
    endDate: new Date(2026, 6, 3),
    title: "Rollout Parent Effectiveness Service",
    description: "The Roll-Out Training on the Parent Effectiveness Service (PES) is designed for the facilitators who will directly conduct all the sessions with parents in their respective communities. It equips them with the knowledge, skills, and standardized tools needed to effectively deliver the PES modules in line with Republic Act No. 11908 and its Implementing Rules and Regulations.",
    venue: "Region IX, Region IV-A, Region V, Region VIII, and Region X",
    tag: "",
    target: "Cities, Municipalities",
    image: "",
    colorId: 1,
  },
  {
    id: 35,
    startDate: new Date(2026, 5, 29),
    endDate: new Date(2026, 6, 3),
    title: "Ladderized 1: Training on Leadership and Management for Local Social Welfare and Development Officers: Catalysts for Change",
    description: "The Leadership Training for Local Social Welfare and Development Officers (LSWDOs) is designed to build the essential skills, knowledge, and mindset required for effective leadership in social welfare programs. This training equips LSWDOs to navigate policy changes, manage resources, lead teams, and respond to various community challenges. Through a focus on ethical leadership, accountability, emotional intelligence, decision-making, and problem-solving, the program enhances their  capacity to deliver impactful services. It also promotes stakeholder collaboration to ensure more efficient service delivery and greater community impact. By empowering LSWDOs to advocate for marginalized populations, promote social justice.  mentor future leaders, and design sustainable, inclusive programs, the training contributes to the long-term well-being and development of the communities they serve.",
    venue: "Region IX, Region IV-A, Region V, Region VIII, and Region X",
    tag: "",
    target: "Local Social Welfare and Development Officers (LSWDOs) from LGUs (Level 1-2 Rating in the SDCA)",
    image: "",
    colorId: 6,
  },
  {
    id: 36,
    startDate: new Date(2026, 5, 29),
    endDate: new Date(2026, 6, 3),
    title: "Training on Pre-Marriage Counseling BATCH 5",
    description: "This training enhances the competencies of pre-marriage counselors at the Local Government Units in conducting the Pre-marriage Orientation and Counseling (PMOC) Program.",
    venue: "DSWD Academy (Taguig City, National Capital Region)",
    tag: "WITH CPD UNITS",
    target: "Local Social Welfare and Development Officers (LSWDOs)",
    image: "",
    colorId: 2,
  },
];

const tagColors = {
  "WITH CPD UNITS": "#EF474E",
  "TRAINING OF TRAINERS": "#5658A6",
  PILOT: "#FCF231",
};

const eventColors = {
  1: "#B083FB",
  2: "#FF69C7",
  3: "#FF751F",
  4: "#FFB2FA",
  5: "#7DD955",
  6: "#0097B2",
};

const monthCards = [
  { title: "JAN" }, { title: "FEB" }, { title: "MAR" }, { title: "APR" },
  { title: "MAY" }, { title: "JUN" }, { title: "JUL" }, { title: "AUG" },
  { title: "SEP" }, { title: "OCT" }, { title: "NOV" }, { title: "DEC" },
];

const fullMonths = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL",
  "MAY", "JUNE", "JULY", "AUGUST",
  "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

// --- Added helper component for the 30 words limit ---
const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(" ");
  const isOverLimit = words.length > 30;

  if (!isOverLimit) {
    return <p className="text-gray-600 leading-relaxed text-base md:text-lg">{text}</p>;
  }

  const displayText = isExpanded ? text : words.slice(0, 30).join(" ") + "...";

  return (
    <div className="text-gray-600 leading-relaxed text-base md:text-lg">
      <p>
        {displayText}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-[#2e3192] font-bold hover:underline underline-offset-4"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      </p>
    </div>
  );
};

const TrainingCalendar = () => {
  const today = new Date();
  const fixedYear = 2026;
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const scrollContainerRef = useRef(null);
  const monthRefs = useRef([]);

  useEffect(() => {
    if (monthRefs.current[selectedMonth] && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const target = monthRefs.current[selectedMonth];
      const targetOffset = target.offsetLeft - (container.offsetWidth / 2) + (target.offsetWidth / 2);
      container.scrollTo({ left: targetOffset, behavior: "smooth" });
    }
  }, [selectedMonth]);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    return { firstDay, daysArray };
  };

  const { firstDay, daysArray } = getDaysInMonth(fixedYear, selectedMonth);

  const renderCalendarRows = () => {
    const totalSlots = firstDay + daysArray.length;
    const numRows = Math.ceil(totalSlots / 7);
    const rows = [];

    for (let r = 0; r < numRows; r++) {
      const weekStartOffset = r * 7;
      const weekStartDate = new Date(fixedYear, selectedMonth, weekStartOffset - firstDay + 1);
      const weekEndDate = new Date(fixedYear, selectedMonth, weekStartOffset - firstDay + 7);

      const eventsInWeek = exampleEvents.filter(e => e.startDate <= weekEndDate && e.endDate >= weekStartDate);
      const sortedEvents = [...eventsInWeek].sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));

      rows.push(
        <div key={`row-${r}`} className="relative border-b border-gray-200 min-h-[120px] flex flex-col">
          <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={`bg-${i}`} className="border-r border-gray-200 last:border-r-0 h-full" />
            ))}
          </div>
          <div className="grid grid-cols-7 relative z-10">
            {Array.from({ length: 7 }).map((_, i) => {
              const dayIdx = weekStartOffset + i - firstDay;
              const date = new Date(fixedYear, selectedMonth, dayIdx + 1);
              const isCurrentMonth = date.getMonth() === selectedMonth;
              const isToday = date.toDateString() === today.toDateString();

              return (
                <div key={`date-${i}`} className="p-2 h-10">
                  <div className={`font-semibold text-xs md:text-sm 
                    ${isToday ? "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center" : ""}
                    ${!isToday && isCurrentMonth ? "text-gray-700" : ""}
                    ${!isCurrentMonth ? "text-gray-600 opacity-70 font-bold" : "opacity-100"}`}
                  >
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative z-20 pb-2 px-0.5 flex flex-col gap-y-1">
            {sortedEvents.map((event) => {
              const eventStart = event.startDate < weekStartDate ? weekStartDate : event.startDate;
              const eventEnd = event.endDate > weekEndDate ? weekEndDate : event.endDate;
              const startCol = (eventStart.getDay() % 7) + 1;
              const duration = Math.round((eventEnd - eventStart) / (1000 * 60 * 60 * 24)) + 1;
              const showTitle = event.startDate >= weekStartDate || eventStart.getDay() === 0;
              return (
                <div key={`${event.id}-${r}`} className="grid grid-cols-7 w-full">
                  <motion.div
                    className="text-white text-[10px] md:text-xs h-6 flex items-center px-2 cursor-pointer shadow-sm truncate font-medium"
                    style={{
                      gridColumn: `${startCol} / span ${duration}`,
                      backgroundColor: eventColors[event.colorId] || "#2e3192",
                      borderRadius: "4px",
                    }}
                    onClick={() => setSelectedEvent(event)}
                    whileHover={{ filter: "brightness(1.1)", scaleY: 1.1, zIndex: 30 }}
                  >
                    {showTitle && <span className="truncate">{event.title}</span>}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="pt-24 font-sans relative select-none bg-gray-50/30">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .month-card { backface-visibility: hidden; transform: translateZ(0); -webkit-font-smoothing: subpixel-antialiased; will-change: transform; }
      `}</style>

      {/* Responsive Backgrounds */}
      <div
        className="absolute top-0 left-0 right-0 z-0 md:hidden"
        style={{
          height: "370px",
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "3rem",
          borderBottomRightRadius: "3rem",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 z-0 hidden md:block"
        style={{
          height: "400px",
          backgroundImage: `url(${TABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "5rem",
          borderBottomRightRadius: "5rem",
        }}
      />

      <div className="relative z-10 w-full text-center mb-12 mt-10">
        <h1 className="text-4xl md:text-6xl font-bold text-[#2e3192] leading-[1]">2026</h1>
        <h1 className="text-4xl md:text-6xl font-bold text-[#2e3192] mt-2">TRAINING CALENDAR</h1>
      </div>

      <section className="relative z-10 w-full px-4 mb-8">
        <div className="bg-[#2e3192]/95 backdrop-blur-sm rounded-[2.5rem] w-full max-w-[100rem] mx-auto p-4 md:p-6 shadow-2xl overflow-hidden">
          <div ref={scrollContainerRef} className="flex overflow-x-auto no-scrollbar items-center gap-4 p-4 scroll-smooth">
            {monthCards.map((card, index) => {
              const isActive = selectedMonth === index;
              return (
                <motion.div
                  key={card.title}
                  ref={(el) => (monthRefs.current[index] = el)}
                  onClick={() => setSelectedMonth(index)}
                  initial={false}
                  animate={{ scale: isActive ? 1.05 : 1, backgroundColor: isActive ? "#FFE066" : "#FFFFFF" }}
                  transition={{ type: "tween", duration: 0.2 }}
                  whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                  className={`month-card flex-shrink-0 flex items-center justify-center rounded-2xl py-8 cursor-pointer w-[40%] md:w-[15.5%] shadow-md transition-shadow duration-300 ${isActive ? "shadow-lg" : ""}`}
                >
                  <h3 className="font-black text-2xl md:text-4xl text-[#2e3192] tracking-tighter">{card.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="text-center mt-8 relative z-10">
        <h2 className="text-4xl font-black text-[#2e3192] tracking-tight">{fullMonths[selectedMonth]} {fixedYear}</h2>
      </div>

      <section className="relative z-10 mt-6 max-w-[100rem] mx-auto mb-20 px-4">
        <div className="grid grid-cols-7 text-center font-bold text-gray-400 mb-2 uppercase text-sm tracking-widest">
          {weekdays.map((day) => <div key={day} className="py-2">{day}</div>)}
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {renderCalendarRows()}
        </div>
      </section>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={() => setSelectedEvent(null)}>
            <motion.div 
              initial={{ scale: 0.9, y: 50, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 50, opacity: 0 }} 
              className="rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative bg-white no-scrollbar flex flex-col" 
              style={{ 
                boxShadow: `0 25px 0px 0px ${eventColors[selectedEvent.colorId] || "#2e3192"}` 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-64 md:h-72 flex-shrink-0 relative">
                {selectedEvent.image && <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />}
                <button onClick={() => setSelectedEvent(null)} className="absolute top-5 right-5 bg-white/90 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200">
                  <IoClose size={28} />
                </button>
              </div>

              <div className="p-8 flex-grow">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center text-[#2e3192] font-bold text-sm md:text-base">
                        <span className="bg-blue-50 px-4 py-2 rounded-lg">
                          {formatDate(selectedEvent.startDate)} {selectedEvent.endDate > selectedEvent.startDate ? ` – ${formatDate(selectedEvent.endDate)}` : ""}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 font-medium">
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-sm md:text-base">{selectedEvent.venue}</span>
                      </div>
                    </div>
                    {selectedEvent.tag && (
                      <span className="text-xs md:text-sm px-6 py-3 rounded-xl text-white font-black tracking-widest uppercase shadow-md" style={{ backgroundColor: tagColors[selectedEvent.tag] || "#2e3192" }}>
                        {selectedEvent.tag}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 leading-tight">{selectedEvent.title}</h2>
                  
                  {/* --- Integrated the Expandable component here --- */}
                  {selectedEvent.description && (
                    <ExpandableDescription text={selectedEvent.description} />
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-8 border-t border-gray-100 mt-auto">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">Target Participants</span>
                <div className="flex items-start gap-3">
                  <BsPeopleFill className="text-[#2e3192] flex-shrink-0 mt-1" size={24} />
                  <p className="text-[#2e3192] font-bold text-base md:text-lg leading-snug">{selectedEvent.target}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainingCalendar;