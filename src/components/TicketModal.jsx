// src/components/TicketModal.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";

const TicketModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [communication, setCommunication] = useState("");

  useEffect(() => {
    if (!isOpen) {
      reset();
      setCommunication("");
    }
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    try {
      // Always call the Vercel API route
      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      console.log("RAW server response:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        return toast.error("Server returned invalid response. Check console.");
      }

      if (result.success) {
        toast.success(`Ticket ${result.id} submitted successfully!`);
        onClose();
      } else {
        toast.error(`Error submitting ticket: ${result.error || result.message}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Error submitting ticket. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark background */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12 shadow-xl"
            initial={{ opacity: 0, y: "-50%", x: "-50%", scale: 0.8 }}
            animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: "-50%", x: "-50%", scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Request Ticket
            </h2>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Full Name */}
              <div className="flex flex-col">
                <input
                  {...register("fullname", { required: true })}
                  type="text"
                  placeholder="Full Name"
                  className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullname ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fullname && <span className="text-red-500 text-sm mt-1">Required</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email Address"
                  className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">Required</span>}
              </div>

              {/* Office */}
              <div className="flex flex-col">
                <input
                  {...register("office", { required: true })}
                  type="text"
                  placeholder="Office / Bureau / Division"
                  className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.office ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.office && <span className="text-red-500 text-sm mt-1">Required</span>}
              </div>

              {/* Communication */}
              <div className="flex flex-col relative">
                <select
                  {...register("communication", { required: true })}
                  value={communication}
                  onChange={(e) => setCommunication(e.target.value)}
                  className={`border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${errors.communication ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="" disabled>Ways to Communicate</option>
                  <option value="Face to Face">Face to Face</option>
                  <option value="Gmeet">Gmeet</option>
                  <option value="Gchat">Gchat</option>
                  <option value="Email">Email</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                {errors.communication && <span className="text-red-500 text-sm mt-1">Required</span>}
              </div>

              {/* Issue */}
              <div className="md:col-span-2 flex flex-col">
                <textarea
                  {...register("issue", { required: true })}
                  placeholder="Issue / Concern"
                  rows={4}
                  className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.issue ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.issue && <span className="text-red-500 text-sm mt-1">Required</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-[#2e3192] text-white font-semibold py-3 rounded-lg hover:bg-[#1b1f6f] transition md:col-span-2"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TicketModal;
