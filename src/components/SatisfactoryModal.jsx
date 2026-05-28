// src/components/SatisfactoryModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Frown, Meh, Smile, Laugh, X, Loader2, CheckCircle2 } from "lucide-react";

const SatisfactoryModal = ({ isOpen, onClose, spreadsheetId }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const ratingOptions = [
    { id: "poor", label: "Poor", targetRow: 12, targetColumn: "K", icon: Frown, color: "text-red-500", bgColor: "hover:bg-red-50 bg-red-50/10", activeBg: "bg-red-500 text-white" },
    { id: "okay", label: "Okay", targetRow: 13, targetColumn: "K", icon: Meh, color: "text-amber-500", bgColor: "hover:bg-amber-50 bg-amber-50/10", activeBg: "bg-amber-500 text-white" },
    { id: "satisfied", label: "Satisfied", targetRow: 14, targetColumn: "K", icon: Smile, color: "text-emerald-500", bgColor: "hover:bg-emerald-50 bg-emerald-50/10", activeBg: "bg-emerald-500 text-white" },
    { id: "very_satisfied", label: "Very Satisfied", targetRow: 15, targetColumn: "K", icon: Laugh, color: "text-blue-500", bgColor: "hover:bg-blue-50 bg-blue-50/10", activeBg: "bg-blue-500 text-white" },
  ];

  const handleEmojiClick = async (option) => {
    if (isSubmitting || !spreadsheetId) return;
    
    setSelectedRating(option);
    setIsSubmitting(true);
    
    const payload = {
      spreadsheetId: spreadsheetId,
      sheetName: "TA Dashboard",
      targetColumn: option.targetColumn,
      targetRow: option.targetRow,
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwLwMN-lxK6LJD3xZYCMjmiYQl0WNagKQIW9rHp8I40NqEBpTI2ucjrK8PjAWKeaTzNxA/exec", {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSuccess(true);
      setTimeout(() => handleModalClose(), 2000);
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setSelectedRating(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none font-['Montserrat',sans-serif]">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-xl bg-white p-10 rounded-[36px] text-center shadow-2xl border border-gray-100">
            <button onClick={handleModalClose} disabled={isSubmitting} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {!isSuccess ? (
              <>
                <h3 className="text-[#2e3192] font-extrabold text-3xl mb-3 mt-2">Rate Our Service</h3>
                <p className="text-gray-500 font-medium text-[14px] max-w-[360px] mx-auto mb-10 leading-relaxed">
                  Your feedback keeps us growing. Please tap an emoji option below to submit your rating instantly.
                </p>

                <div className="grid grid-cols-4 gap-3.5 mb-2">
                  {ratingOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = selectedRating?.id === option.id;
                    
                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleEmojiClick(option)}
                        className={`flex flex-col items-center justify-center py-6 px-3 rounded-2xl transition-all duration-300 border ${
                          isSelected 
                            ? `${option.activeBg} border-transparent shadow-xl scale-105` 
                            : isSubmitting
                              ? "bg-gray-50/50 border-gray-100 opacity-40 cursor-not-allowed"
                              : `bg-white border-gray-100 ${option.bgColor} hover:scale-[1.04] cursor-pointer`
                        }`}
                      >
                        {isSelected && isSubmitting ? (
                          <Loader2 className="w-14 h-14 stroke-[1.5] mb-3 animate-spin text-white" />
                        ) : (
                          <IconComponent className={`w-14 h-14 stroke-[1.5] mb-3 transition-colors ${isSelected ? "text-white" : option.color}`} />
                        )}
                        <span className={`text-[12.5px] font-extrabold tracking-tight leading-tight ${isSelected ? "text-white" : "text-gray-600"}`}>
                          {isSelected && isSubmitting ? "Sending..." : option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 flex flex-col items-center">
                <CheckCircle2 className="w-20 h-20 text-emerald-500 stroke-[1.5] mb-5 animate-bounce" />
                <h4 className="text-[#2e3192] font-extrabold text-2xl mb-2">Thank You So Much!</h4>
                <p className="text-gray-400 font-medium text-sm max-w-[280px]">Your response has been logged securely under Dashboard Column K!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SatisfactoryModal;