// src/data/servicesData.js

export const servicesTabs = [
  { id: 1, title: "All", path: "/all-services" },
  { id: 2, title: "Assessment, Certification and Accreditation", path: "/services-aca" },
  { id: 3, title: "Capability Building", path: "/cb-services" },
  { id: 4, title: "Knowledge Management", path: "/services-km" },
  { id: 5, title: "TAAORSS", path: "/services-taaorss" },
];

export const servicesContentData = {
  1: {
    categoryTitle: "Assessment, Certification and Accreditation",
    items: [
      { 
        id: 1, 
        title: "Continuing Professional Development (CPD)", 
        content: "Requests for orientation sessions, responding to queries on the accomplishment of CPD application and completion requirements, and providing guidance on the overall CPD application and submission process.", 
        isDualButton: true,
        leftButtonText: "CPD Application Process",
        leftExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfCH_-TGlVemY2FDjao1-t8vzwUomhDbE-lVmgfdwBBiCD_3g/viewform",
        rightButtonText: "CPD Completion Process",
        rightExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSebrmPSSyZnF5AVVOV8NUqTwGM-8NI9ZVfFacdFI3UDLbWmtg/viewform"
      },
      { 
        id: 2, 
        title: "Competency Needs Assessment (CNA)", 
        content: "The development and implementation of CNA anchored on Heartwork: DSWD Academy Competency Framework, as well as guidance in the proper completion and interpretation of CNA tools.", 
        externalLink: "https://your-external-link-here.com", 
        buttonText: "Access CNA Tools",
        isDisabled: true
      },
      { 
        id: 3, 
        title: "Certification", 
        content: "TA includes responding to queries and providing clarifications on the application process and other info regarding certification process. This will also include expression of interest to be included in the certification process.",
        isDualButton: true,
        leftButtonText: "Certification Application Form",
        leftExternalLink: "https://docs.google.com/document/d/1WpT8k-9YI6mHs2T06yau0SNMjocOGIO9HvjPXw0S0WQ/edit?tab=t.0",
        rightButtonText: "Certification Submission Form",
        rightExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfZ4lPSEH1rtPA-cT8jSK0Gf6UdmZxtD59Dv6aigGVRMp9rJQ/viewform"
      },
      { 
        id: 4, 
        title: "Accreditation", 
        content: "TA includes responding to queries and providing clarifications on the application process and other info regarding accreditation program. This will also include expression of interest to be included in the certification process.", 
        externalLink: "https://forms.gle/cBFq2gTqUhfeLbpc9", 
        buttonText: "Certification Application Form",
        isDisabled: true
      },
      { 
        id: 5, 
        title: "Project ASCEND & ETEEAP", 
        content: "Clarifications on ETEEAP (BS Social Work), as well as conducting orientations on Project ASCEND and ETEEAP processes. There will be a listing of resources with links where they can see the list of ETEEAP deputized schools, list of requirements and other legal basis for ETEEAP implementation.This will include expression of interest to enroll in ETEEAP.", 
        externalLink: "https://your-external-link-here.com", 
        buttonText: "View Deputized Schools",
        isDisabled: true
      }
    ]
  },
  2: {
    categoryTitle: "Capability Building",
    items: [
      { 
        id: 1, 
        title: "Review of Activity Proposal and Design", 
        content: "The review of training proposal and design, ensuring the adherence to the training management standards set by the DSWD Academy in support of its mandate to centralize and professionalize learning and development efforts.",
        isDualButton: true,
        leftButtonText: "Request Ticket",
        leftIsModal: true,
        rightButtonText: "Activity Proposal and Design Tracking",
        rightExternalLink: "/tracker",
        rightIsDisabled: false 
      },
      { 
        id: 2, 
        title: "Request for Review of Capability Building Plan", 
        content: "Ensure the adherence to the Learning and Development standards set by the Department of Social Welfare and Development Academy in support of its mandate to centralize and professionalize learning and development efforts.",
        buttonText: "Request Ticket" 
      },
      { 
        id: 3, 
        title: "Request for Training Inclusion", 
        content: "To develop and implement a streamlined, standardized, and transparent process for handling training inclusion requests to the DSWD Academy.",
        buttonText: "Request Ticket" 
      },
      { 
        id: 4, 
        title: "Request for Training Management", 
        content: "Ensures a streamlined, standardized, and transparent process for request of training management to the DSWD Academy.",
        buttonText: "Request Ticket" 
      },
      { 
        id: 5, 
        title: "CapBuild Knowledge Bank", 
        content: "Selected and high-value TA cases provided by the Capability Building Division – Professional Learning and Development Section (CBD-PLDS) along Learning and Development (L&D) for institutional learning and continuous improvement.", 
        externalLink: "https://drive.google.com/drive/folders/1tkq8sxM354BrvQShJORFQo2wAcxKMQqe?usp=sharing",
        buttonText: "Knowledge Bank" 
      },
      { 
        id: 6, 
        title: "Request for Facilitator", 
        heading: "How to Avail", 
        content: "Provides resource persons, facilitators, or subject matter experts from the DSWD Academy to support capability building activities, subject to availability, relevance of expertise, and approval of the appropriate authority.",
        steps: [
          "Submit an official memorandum addressed to the Director of the DSWD Academy indicating the title, objectives, schedule, venue or platform, target participants, requested topic, and other pertinent details of the activity.",
          "The request shall be evaluated by the DSWD Academy and endorsed to the appropriate division for appropriate action."
        ],
        buttonText: "Request Ticket" 
      },
      { 
        id: 7, 
        title: "Request for Training Data", 
        heading: "How to Avail", 
        content: "Provides available training-related information, records, or reports maintained by the DSWD Academy, subject to existing policies on records management, data privacy, and information confidentiality.",
        steps: [
          "Submit an official memorandum addressed to the <strong>Director of the DSWD Academy</strong> specifying the information being requested, its intended purpose, and the period covered, as applicable.",
          "Requests shall be processed in accordance with existing Department policies and data governance requirements."
        ],
        buttonText: "Request Ticket" 
      },
      { 
        id: 8, 
        title: "Guidance on Capability Building", 
        heading: "How to Avail", 
        content: "Provides technical assistance, consultation, and advisory services on capability building concerns, including learning and development planning, training design, implementation, monitoring and evaluation, capability building standards, and other related matters within the mandate of the Capability Building Division.",
        steps: [
          "Review the Frequently Asked Questions (FAQs) and available reference materials in the portal.",
          "If additional assistance is needed, join the <strong>TA Wednesday Virtual Clinic</strong> during the designated schedule or submit a <strong>Technical Assistance Request Ticket</strong> through the portal."
        ],
        buttonText: "Request Ticket" 
      }
    ]
  },
  3: {
    categoryTitle: "Knowledge Management",
    items: [
      {
        id: 1,
        title: "Online Reporting System",
        content: "Field Offices and Central Office units shall be able to submit accomplishments, plans, and updates on the following KM initiatives.",
        isNestedGroup: true,
        subItems: [
          { 
            id: 1, 
            title: "Knowledge Sharing Sessions (KSS)", 
            content: "Informal activities where knowledge is exchanged or transferred among peers, colleagues, partners, and stakeholders.",
            isDualButton: true,
            leftButtonText: "KSS Reporting Form",
            leftExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLScKMrmls1BO7Ytfdmjx56EuPuI7uGxHOkhMVSEYYxYcZPr8Tw/viewform",
            rightButtonText: "Register KSS Activity",
            rightExternalLink: "https://docs.google.com/forms/d/e/1FAIpQLSdTiVPcxQM9N-pX8sdTOb3Ctdk_v9_uuXklDecpFYuZD8UG6Q/viewform"
          },
          { 
            id: 2, 
            title: "Knowledge Products", 
            content: "Knowledge outputs derived from expertise, research, lessons learned, and best practices that respond to organizational needs.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfKoZQbHwsrQsGTeUlcoi9FXWnbKeMfpXKkeL35OkBCSdsNOg/viewform", 
            buttonText: "Click Here To Submit Your Entry" 
          },
          { 
            id: 3, 
            title: "Core Group of Specialists (CGS)", 
            content: "Technical assistance mechanisms that mobilize subject matter experts across major sectors covered by DSWD.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform?usp=dialog", 
            buttonText: "Click Here To Submit Your Entry" 
          },
          { 
            id: 4, 
            title: "Regional Learning Resource Center (RLRC)", 
            content: "Facilities providing accurate, relevant, and timely information services to DSWD staff, intermediaries, and partners.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSfE65u_2ARp2s5TRcedirmtLqSc3Xdc99hkWgpHwncEmeFdhQ/viewform", 
            buttonText: "Click Here To Submit Your Entry" 
          },
          { 
            id: 6, 
            title: "Other KM Initiatives", 
            content: "Submission and publication of current news, highlights, and featured KM-related activities conducted by COs, OBSUs, and FOs.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfE3NQ0p75y8cYqCholtpAW82msShYpwX8llfjC6WSepP3wg/viewform", 
            buttonText: "Click Here To Submit Your Entry" 
          },
          { 
            id: 7, 
            title: "KM Portal News / Features", 
            content: "Other knowledge management mechanisms or innovative practices implemented by Field Offices.", 
            externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSea4smDB1FlPM8sLfJ-HTHzCq6hkKpTuuYCl_IanNs5rriSgA/viewform", 
            buttonText: "Click Here To Submit Your Entry" 
          }
        ]
      },
      {
        id: 2, 
        title: "Request for Resource Person for DSWD Academy-Offered Training Courses", 
        isCustomRequestLayout: true,
        content: "Requests may be linked to the Directory of Experts (DOE) for easier identification of subject matter specialists.",
        buttonText: "Request Ticket" 
      },
      { 
        id: 5, 
        title: "Capability Building or Knowledge Sharing Session Requests on Knowledge Management Topics and Mechanisms", 
        isCustomRequestLayout: true,
        content: "Submission of inquiries or requests related to KM systems, templates, tools, and processes.",
        listItems: [
          "Introduction to Knowledge Management",
          "Knowledge Product Development",
          "Good Practice Documentation",
          "Module Development",
          "Knowledge Sharing Session",
          "Knowledge Exchange Center",
          "Knowledge Management Team",
          "Core Group of Specialists",
          "Social Welfare and Development Learning Network",
          "Knowledge Management Portal",
          "Electronic Learning Management System",
          "Intellectual Property",
          "DSWD Academy Training Facility",
          "Knowledge Management Monitoring and Evaluation",
          "Knowledge Management Assessment",
          "Knowledge Audit",
          "Knowledge Management Productivity, Recognition, Innovation, and Development for Effectiveness (KM PRIDE)",
          "Knowledge Management Team Quarterly Report",
          "Bayanihang Bayan Program"
        ],
        buttonText: "Request Ticket" 
      },
      {
        id: 4, 
        title: "Knowledge Product Development", 
        isCustomRequestLayout: true,
        content: "Technical assistance related to the review, enhancement, and development of materials based on the existing standards of a good knowledge product. Note that only the modules are open for the request to be enhanced or developed by the DSWD Academy, subject to the official communications shared to all internal offices of the department.",
        listItems: [
          "Good Practice Documentation Review",
          "Module and Instructional Design Review",
          "Module and Instructional Design Enhancement",
          "Module and Instructional Design Development",
          "Other Types of Knowledge Product Review",
          "Knowledge Product Review by Core Group of Specialists"
        ],
        buttonText: "Request Ticket" 
      },
      { 
        id: 3, 
        title: "Big Group Knowledge Sharing Session Material Review", 
        content: "Technical assistance related to the review of materials particular to the implementation of the knowledge sharing sessions.",
        isCustomRequestLayout: true,
        listItems: [
          "Activity Design and Activity Proposal for Big Group Knowledge Sharing Session",
          "Documentation of Conducted Big Group Knowledge Sharing Session"
        ],
        buttonText: "Request Ticket" 
      },
      { 
        id: 6, 
        title: "Knowledge Exchange Center Material (Borrowing)", 
        content: "Technical assistance related to the borrowing of materials being offered by the Knowledge Exchange Center.",
        buttonText: "Request Ticket" 
      },
      { 
        id: 7, 
        title: "Intellectual Property Registration", 
        content: "Technical assistance related to the registration of qualified intellectual property for protection.",
        buttonText: "Request Ticket" 
      },
      { 
        id: 8, 
        title: "DSWD Academy Training Facility Reservation", 
        content: "Provide technical assistance to inquiries or concerns related to the reservation and booking processes at the DSWD Academy Facility. This support extends to various stakeholders, including OBS, FOs, and other partners.",
        buttonText: "Request Ticket" 
      },
      { 
        id: 9, 
        title: "Marketing Support", 
        content: "Provide technical assistance to the DSWD Academy divisions to effectively promote and execute their activities and events. This includes offering guidance on marketing strategies, communication materials, events management and promotional campaigns.",
        buttonText: "Request Ticket" 
      },
      { 
        id: 10, 
        title: "Hosting of Courses under the DSWD Academy’s ELMS", 
        content: "This Technical Assistance (TA) service supports DSWD offices and units in the onboarding and hosting of their e-learning courses within the DSWD Academy’s e-Learning Management System (ELMS). It includes guidance on the requirements, standards, and processes for lodging developed digital learning materials into the platform.",
        buttonText: "Request Ticket" 
      }
    ]
  },
  4: {
    categoryTitle: "Technical/Advisory Assistance and Other Support Services",
    items: [
      { 
        id: 1, 
        title: "Targeting, Assessment, Monitoring, and Planning", 
        content: ["Provision of technical guidance and support to enhance evidence-based planning and performance management of LGUs."],
        buttonText: "Request Ticket"
      },
      { 
        id: 2, 
        title: "Plan and Budget Development", 
        content: [
          "Support in strengthening FO planning and financial management processes:", 
          "Assistance in the preparation of the Work and Financial Plan",
          "Guidance on requests for fund modification and/or reallocation and non-withdrawal"
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 3, 
        title: "Resource Person and Activity Support", 
        content: [
          "Facilitation of technical and administrative requirements for capacity-building activities:",
          "Guidance on PMC Accreditation",
          "Assistance in the request and coordination of resource persons",
          "Support for meeting requests and related activities"
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 4, 
        title: "SDCA–Information System (SDCA-IS) Support", 
        content: [
          "Technical assistance in the use and management of the SDCA Information System:",
          "Processing of requests for account activation",
          "Provision of orientation and capacity-building sessions on SDCA-IS utilization"
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 5, 
        title: "Partnership Development", 
        content: [
          "Guidance in establishing and strengthening collaborations:",
          "Assistance in the preparation and review of Memorandum of Agreement and Memorandum of Understanding",
          "Assistance in the conduct of regional and hosted national consultation dialogue and workshop"
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 6, 
        title: "Rewards and Incentives (Panata Ko sa Bayan Program)", 
        content: [
          "Support in promoting excellence and recognizing LGU performance:", 
          "Guidance on the Panata Ko sa Bayan Program (pursuant to MC No. 18, s. 2023)" 
        ],
        buttonText: "Request Ticket"
      },
      { 
        id: 7, 
        title: "Other Technical Assistance Services", 
        content: "Provision of additional TA services not covered under the above categories, based on emerging needs and specific requests of LGUs/LSWDOs.",
        buttonText: "Request Ticket" 
      }
    ]
  }
};

// Automatically gather titles that use the internal TicketModal component
export const internalModalServices = Object.values(servicesContentData)
  .flatMap((category) => category.items)
  .filter((item) => item.buttonText === "Request Ticket" || item.leftIsModal)
  .map((item) => item.title);