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

  const handleSubmit = async () => {
    if (!selectedRating || !spreadsheetId) return;
    setIsSubmitting(true);
    
    const payload = {
      spreadsheetId: spreadsheetId,            // Injected dynamic ID
      sheetName: "TA Dashboard",
      targetColumn: selectedRating.targetColumn, // "K"
      targetRow: selectedRating.targetRow,       // 12, 13, 14, or 15
    };

    try {
      // Replace with your Web App Deployment URL
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
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white p-8 rounded-[32px] text-center shadow-2xl border border-gray-100">
            <button onClick={handleModalClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {!isSuccess ? (
              <>
                <h3 className="text-[#2e3192] font-extrabold text-2xl mb-2 mt-2">Rate Our Service</h3>
                <p className="text-gray-500 font-medium text-[13px] max-w-[280px] mx-auto mb-8 leading-relaxed">
                  Your feedback keeps us growing. Please select a rating matching your overall experience today.
                </p>

                <div className="grid grid-cols-4 gap-2 mb-8">
                  {ratingOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isSelected = selectedRating?.id === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedRating(option)}
                        className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl transition-all duration-300 border ${isSelected ? `${option.activeBg} border-transparent shadow-lg scale-105` : `bg-white border-gray-100 ${option.bgColor} hover:scale-102`}`}
                      >
                        <IconComponent className={`w-8 h-8 stroke-[2] mb-2 transition-colors ${isSelected ? "text-white" : option.color}`} />
                        <span className={`text-[11px] font-bold tracking-tight leading-tight ${isSelected ? "text-white" : "text-gray-600"}`}>{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={!selectedRating || isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full py-3.5 rounded-full font-bold text-[14px] shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${!selectedRating ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" : "bg-[#ee1c25] text-white hover:scale-[1.02] active:scale-[0.99]"}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Recording Feedback...</span>
                    </>
                  ) : <span>Submit Feedback</span>}
                </button>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 flex flex-col items-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 stroke-[2] mb-4 animate-bounce" />
                <h4 className="text-[#2e3192] font-extrabold text-xl mb-1">Thank You So Much!</h4>
                <p className="text-gray-400 font-medium text-xs max-w-[240px]">Your response has been logged securely under Dashboard Column K!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SatisfactoryModal;