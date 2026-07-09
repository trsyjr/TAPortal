// src/components/TicketModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChevronDown,
  FaTicketAlt,
  FaInfoCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Advisory from "./Advisory";

const TicketModal = ({ isOpen, onClose, serviceType, defaultInquiryType }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false);
  const [hasPassedAdvisory, setHasPassedAdvisory] = useState(false);
  const [showCalendarBubble, setShowCalendarBubble] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const categoryRef = useRef(null);
  const communicationRef = useRef(null);

  const selectedCategory = watch("category");
  const selectedCommunication = watch("communication");

  const categoryDetails = {
    "Assessment/Accreditation":
      "Technical Assistance along Continuing Professional Development (CPD), Competency Needs Assessment, Certification and Accreditation, and Project Accelerated Social Work Credentialing and Equivalency for National Development (ASCEND) & Expanded Tertiary Education Equivalency and Accreditation Program (ETEEAP).",
    "Capability Building":
      "Technical Assistance along learning L&D standards and professional development opportunities.",
    "Knowledge Management":
      "Technical Assistance along knowledge management including Knowledge Sharing Session (KSS), Knowledge Products, Core Group of Specialists (CGS), Regional Learning Resource Center (RLRC), KM Systems, and others.",
    "TAAORSS":
      "Technical Assistance/Advisory and Other Related Support Services",
  };

  const categoryOptions = [
    { value: "Assessment/Accreditation", label: "Assessment/Accreditation/Certification" },
    { value: "Capability Building", label: "Capability Building" },
    { value: "Knowledge Management", label: "Knowledge Management" },
    { value: "TAAORSS", label: "TAAORSS" },
  ];

  const communicationOptions = [
    { value: "Face to Face", label: "Face to Face" },
    { value: "Google Meet", label: "Google Meet" },
    { value: "Google Chat", label: "Google Chat" },
    { value: "Email", label: "Email" },
  ];

  // Continuous background loop cycle handler
  useEffect(() => {
    if (isOpen && hasPassedAdvisory) {
      const interval = setInterval(() => {
        // Only trigger the flash if the user isn't already hovering over it manually
        if (!isHovered) {
          setShowCalendarBubble(true);
        }
        
        const timeout = setTimeout(() => {
          setShowCalendarBubble(false);
        }, 3000);
        
        return () => clearTimeout(timeout);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isOpen, hasPassedAdvisory, isHovered]);

  // Combined logic: Show bubble if background loop is active OR if user is explicitly hovering
  const shouldShowBubble = showCalendarBubble || isHovered;

  // Set default inquiry category if provided by parent section layouts
  useEffect(() => {
    if (isOpen && defaultInquiryType) {
      setValue("category", defaultInquiryType);
    }
  }, [isOpen, defaultInquiryType, setValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (communicationRef.current && !communicationRef.current.contains(event.target)) {
        setIsCommunicationOpen(false);
      }
    };

    if (isOpen && hasPassedAdvisory) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, hasPassedAdvisory]);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setIsSubmitting(false);
      setHoveredInfo(null);
      setIsCategoryOpen(false);
      setIsCommunicationOpen(false);
      setHasPassedAdvisory(false);
      setShowCalendarBubble(false);
      setIsHovered(false);
    }
  }, [isOpen, reset]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyj0TMY0TDuKmaX8FKNE90agvBIuiBSRWNahodpkxVKqETfUeCeYxYprv6yZF94yZRf/exec";

    try {
      let inputVal = data.email.trim();
      let cleanUsername = inputVal.toLowerCase().endsWith("@dswd.gov.ph") 
        ? inputVal.slice(0, -12) 
        : inputVal;
        
      const finalizedEmail = `${cleanUsername}@dswd.gov.ph`;

      const payload = {
        ...data,
        email: finalizedEmail,
        inquiryType: data.category,
        serviceType: serviceType || "" 
      };

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      toast.success("Ticket request submitted successfully!");
      onClose(data.category, serviceType || "");
      
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Error submitting ticket. Please check your sheet configurations.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (error) => `
    w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-800
    placeholder:text-gray-400 focus:ring-2 focus:ring-[#2e3192]
    transition-all duration-200 outline-none
    min-w-0
    ${error ? "ring-2 ring-red-500" : "ring-1 ring-gray-200"}
  `;

  const selectedCategoryLabel =
    categoryOptions.find((i) => i.value === selectedCategory)?.label ||
    "Inquiry For...";
  const selectedCommunicationLabel =
    communicationOptions.find((i) => i.value === selectedCommunication)?.label ||
    "Preferred Channel";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>{`
            @keyframes sway {
              0%, 75%, 100% { transform: rotate(0deg); }
              80% { transform: rotate(-6deg); }
              85% { transform: rotate(5deg); }
              90% { transform: rotate(-4deg); }
              95% { transform: rotate(3deg); }
            }
            .animate-sway {
              animation: sway 2.5s ease-in-out infinite;
              transform-origin: bottom center;
            }
          `}</style>

          <motion.div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose("", "")}
          />

          {!hasPassedAdvisory ? (
            <Advisory 
              forceShow={true} 
              onClose={() => setHasPassedAdvisory(true)} 
              />
          ) : (
            <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-start md:items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
              <motion.div
                className="pointer-events-auto w-full max-w-2xl bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl my-auto relative overflow-visible"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
              >
                <div className="flex flex-col items-center mb-6 md:mb-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2e3192]/10 rounded-2xl flex items-center justify-center text-[#2e3192] mb-4">
                    <FaTicketAlt size={24} className="md:w-[30px] md:h-[30px]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#2e3192] tracking-tight text-center">
                    Request a Ticket
                  </h2>
                  {serviceType && (
                    <span className="mt-1 px-4 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full max-w-md truncate text-center">
                      Service: {serviceType}
                    </span>
                  )}
                  <p className="text-gray-500 font-medium text-sm md:text-base text-center mt-2">
                    We'll get back to you as soon as possible.
                  </p>
                </div>

                <button
                  onClick={() => onClose("", "")}
                  type="button"
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900 z-10"
                >
                  <FaTimes size={20} />
                </button>

                <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-1">
                      <input
                        {...register("fullname", { required: true })}
                        type="text"
                        placeholder="Full Name"
                        className={inputClass(errors.fullname)}
                        autoComplete="new-password"
                      />
                    </div>

                    <div className="space-y-1 relative">
                      <div className="relative flex items-center">
                        <input
                          {...register("email", { 
                            required: "Email username is required",
                            validate: {
                              isValidFormat: (value) => {
                                const trimmedValue = value.trim().toLowerCase();
                                if (trimmedValue.includes("@")) {
                                  if (!trimmedValue.endsWith("@dswd.gov.ph")) {
                                    return "Invalid email. Use your DSWD email only.";
                                  }
                                  const usernamePart = trimmedValue.slice(0, -12);
                                  const isValid = /^[a-zA-Z0-9._%+,-]+$/.test(usernamePart);
                                  return isValid || "Invalid email. Use your DSWD email only.";
                                }
                                const isValid = /^[a-zA-Z0-9._%+,-]+$/.test(trimmedValue);
                                return isValid || "Invalid email. Use your DSWD email only.";
                              }
                            }
                          })}
                          type="text"
                          placeholder="Email Address"
                          onKeyDown={(e) => {
                            if (e.key === "@") {
                              e.preventDefault();
                            }
                          }}
                          className={`${inputClass(errors.email)} pr-[115px]`}
                          autoComplete="new-password"
                        />
                        <span className="absolute right-4 text-gray-400 text-sm select-none font-semibold pointer-events-none">
                          @dswd.gov.ph
                        </span>
                      </div>
                      {errors.email && (
                        <span className="text-xs font-bold text-red-500 block px-1 mt-1">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <input
                        {...register("office", { required: true })}
                        type="text"
                        placeholder="Office / Bureau / Division"
                        className={inputClass(errors.office)}
                        autoComplete="new-password"
                      />
                    </div>

                    <div className="relative" ref={categoryRef}>
                      <input type="hidden" {...register("category", { required: true })} />
                      <button
                        type="button"
                        disabled={!!defaultInquiryType}
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className={`${inputClass(errors.category)} h-[54px] flex items-center justify-between bg-gradient-to-br from-white to-gray-50 transition-all duration-200 ${
                          defaultInquiryType 
                            ? "opacity-75 cursor-not-allowed bg-gray-100/50" 
                            : "hover:ring-2 hover:ring-[#2e3192]/30"
                        }`}
                      >
                        <span className={`block max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis text-left ${selectedCategory ? "text-black font-medium" : "text-gray-400"}`}>
                          {selectedCategoryLabel}
                        </span>
                        {!defaultInquiryType && (
                          <FaChevronDown
                            className={`text-[10px] text-gray-500 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {isCategoryOpen && !defaultInquiryType && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-visible z-[120]"
                          >
                            {categoryOptions.map((item) => (
                              <div key={item.value} className="relative group">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setValue("category", item.value);
                                    setIsCategoryOpen(false);
                                  }}
                                  onMouseEnter={() => setHoveredInfo(item.value)}
                                  onMouseLeave={() => setHoveredInfo(null)}
                                  className={`w-full px-4 py-4 flex items-center justify-between text-left transition-all duration-150 border-b border-gray-100 last:border-none hover:bg-gray-50 ${selectedCategory === item.value ? "bg-gray-100 text-[#2e3192]" : "text-gray-700"}`}
                                >
                                  <span className="font-medium text-sm truncate max-w-[180px]">{item.label}</span>
                                  <div className="hidden md:flex min-w-[24px] h-[24px] rounded-full items-center justify-center bg-gray-100 text-gray-400 group-hover:bg-[#2e3192] group-hover:text-white transition-all duration-200">
                                    <FaInfoCircle size={12} />
                                  </div>
                                </button>

                                <AnimatePresence>
                                  {hoveredInfo === item.value && (
                                    <motion.div
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 10 }}
                                      className="hidden md:block absolute left-full top-0 ml-3 w-64 bg-slate-900 text-white rounded-xl p-4 text-xs leading-relaxed shadow-xl pointer-events-none z-[150]"
                                    >
                                      <div className="absolute left-[-6px] top-4 w-3 h-3 bg-slate-900 rotate-45" />
                                      {categoryDetails[item.value]}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="relative" ref={communicationRef}>
                      <input type="hidden" {...register("communication", { required: true })} />
                      <button
                        type="button"
                        onClick={() => setIsCommunicationOpen(!isCommunicationOpen)}
                        className={`${inputClass(errors.communication)} h-[54px] flex items-center justify-between bg-gradient-to-br from-white to-gray-50 hover:ring-2 hover:ring-[#2e3192]/30 transition-all duration-200`}
                      >
                        <span className={`block max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis text-left ${selectedCommunication ? "text-black font-medium" : "text-gray-400"}`}>
                          {selectedCommunicationLabel}
                        </span>
                        <FaChevronDown
                          className={`text-[10px] text-gray-500 transition-transform duration-200 ${isCommunicationOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isCommunicationOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-[120]"
                          >
                            {communicationOptions.map((item) => (
                              <button
                                key={item.value}
                                type="button"
                                onClick={() => {
                                  setValue("communication", item.value);
                                  setIsCommunicationOpen(false);
                                }}
                                className={`w-full px-4 py-4 flex items-center justify-between text-left transition-all duration-150 border-b border-gray-100 last:border-none hover:bg-gray-50 ${selectedCommunication === item.value ? "bg-gray-100 text-[#2e3192]" : "text-gray-700"}`}
                              >
                                <span className="font-medium text-sm truncate max-w-[220px]">{item.label}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <textarea
                      {...register("issue", { required: true })}
                      placeholder="Tell us more about your concern..."
                      rows={4}
                      className={`${inputClass(errors.issue)} resize-none`}
                    />
                  </div>

                  <div className="flex gap-3 items-center w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#2e3192] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        "Submit Ticket"
                      )}
                    </button>

                    <div 
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="relative transition-transform duration-200 hover:scale-110"
                    >
                      <AnimatePresence>
                        {shouldShowBubble && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute bottom-full right-0 mb-3 w-48 bg-slate-900 text-white font-semibold rounded-xl p-3 text-[11px] text-center leading-tight shadow-xl pointer-events-auto z-[150]"
                          >
                            <div className="absolute bottom-[-5px] right-6 w-2.5 h-2.5 bg-slate-900 rotate-45" />
                            View the Technical Assistance Calendar here
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <a
                        href="/ta-calendar"
                        title="View Calendar"
                        className="animate-sway flex items-center justify-center bg-[#2e3192] hover:bg-[#222475] text-white px-5 h-[56px] rounded-2xl transition-colors duration-200 active:scale-[0.98] shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
                      >
                        <FaCalendarAlt size={18} />
                      </a>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default TicketModal;