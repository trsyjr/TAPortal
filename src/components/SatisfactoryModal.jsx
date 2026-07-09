// src/components/SatisfactoryModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Angry, Frown, Meh, Smile, Laugh, X, Loader2, CheckCircle2 } from "lucide-react";

const SatisfactoryModal = ({ isOpen, onClose, spreadsheetId, inquiryType, serviceType }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const ratingOptions = [
    { id: "very_unsatisfied", label: "Very Unsatisfied", icon: Angry, color: "text-red-700", bgColor: "hover:bg-red-100 bg-red-100/10", activeBg: "bg-red-700 text-white" },
    { id: "poor", label: "Unsatisfied", icon: Frown, color: "text-red-500", bgColor: "hover:bg-red-50 bg-red-50/10", activeBg: "bg-red-500 text-white" },
    { id: "okay", label: "Neutral", icon: Meh, color: "text-amber-500", bgColor: "hover:bg-amber-50 bg-amber-50/10", activeBg: "bg-amber-500 text-white" },
    { id: "satisfied", label: "Satisfied", icon: Smile, color: "text-emerald-500", bgColor: "hover:bg-emerald-50 bg-emerald-50/10", activeBg: "bg-emerald-500 text-white" },
    { id: "very_satisfied", label: "Very Satisfied", icon: Laugh, color: "text-blue-500", bgColor: "hover:bg-blue-50 bg-blue-50/10", activeBg: "bg-blue-500 text-white" },
  ];

  const handleEmojiSelect = (option) => {
    if (isSubmitting) return;
    setSelectedRating(option);
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (isSubmitting || !selectedRating || !spreadsheetId) return;

    setIsSubmitting(true);

    const payload = {
      spreadsheetId: spreadsheetId,
      sheetName: "Satisfactory Rating", 
      ratingLabel: selectedRating.label, 
      feedback: feedback.trim(),         
      inquiryType: inquiryType || "General Feedback", // Secure fallback parameter assignment
      serviceType: serviceType || "None"
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyvDaNfoIL2ZATTfvQDYz3KZi7B2qY72MfdsxSV6f9wdAReJiFLQ-UAnk8YcucL3KX80g/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSuccess(true);
      setTimeout(() => handleModalClose(), 2500);
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setSelectedRating(null);
    setFeedback("");
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none font-['Montserrat',sans-serif]">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.95, opacity: 0 }} 
            className="relative w-full max-w-4xl bg-white p-6 md:p-12 rounded-[36px] text-center shadow-2xl border border-gray-100 max-h-[95vh] overflow-y-auto"
          >
            <button 
              onClick={handleModalClose} 
              disabled={isSubmitting} 
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmitRating}>
                <h3 className="text-[#2e3192] font-extrabold text-3xl mb-3 mt-2">Rate Our Service</h3>
                <p className="text-gray-500 font-medium text-[14px] max-w-[420px] mx-auto mb-8 leading-relaxed">
                  Your feedback keeps us growing. Please select an option below to evaluate your experience.
                </p>

                {/* Inline Helper Context Tag */}
                {/* {inquiryType && (
                  <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-[#2e3192]/5 rounded-full text-[#2e3192] text-xs font-bold border border-[#2e3192]/10">
                    <span>Logging rating for: {inquiryType}</span>
                  </div>
                )} */}

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 mb-6">
                  {ratingOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = selectedRating?.id === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleEmojiSelect(option)}
                        className={`flex flex-col items-center justify-center py-6 px-3 rounded-2xl transition-all duration-300 border ${
                          isSelected
                            ? `${option.activeBg} border-transparent shadow-xl scale-105`
                            : isSubmitting
                              ? "bg-gray-50/50 border-gray-100 opacity-40 cursor-not-allowed"
                              : `bg-white border-gray-100 ${option.bgColor} hover:scale-[1.04] cursor-pointer`
                        }`}
                      >
                        <IconComponent className={`w-12 h-12 md:w-14 md:h-14 stroke-[1.5] mb-3 transition-colors ${isSelected ? "text-white" : option.color}`} />
                        <span className={`text-[12.5px] font-extrabold tracking-tight leading-tight ${isSelected ? "text-white" : "text-gray-600"}`}>
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selectedRating && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-visible text-left mb-6 p-1" 
                    >
                      <label htmlFor="feedback-text" className="block text-gray-700 font-bold text-sm mb-2 pl-1">
                        Care to share more? <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="feedback-text"
                        disabled={isSubmitting}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder={`Tell us why you chose ${selectedRating.label.toLowerCase()}...`}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#2e3192] focus:border-transparent focus:bg-white transition-all duration-200 outline-none resize-none text-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedRating}
                  className="w-full bg-[#2e3192] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 flex flex-col items-center">
                <CheckCircle2 className="w-20 h-20 text-emerald-500 stroke-[1.5] mb-5 animate-bounce" />
                <h4 className="text-[#2e3192] font-extrabold text-2xl mb-2">Thank You So Much!</h4>
                <p className="text-gray-400 font-medium text-sm max-w-[320px]">Your feedback response is greatly appreciated!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SatisfactoryModal;