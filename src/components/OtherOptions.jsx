import React, { useState } from "react";
import TicketModal from "./TicketModal";
import JoinModal from "./JoinModal";
import { FaTicketAlt, FaLaptopMedical } from "react-icons/fa";

const OtherOptions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <section className="py-5 px-6 md:px-20 lg:px-40 text-center font-sans">
      <h2 className="text-md md:text-lg font-semibold mb-12 text-gray-800">
        Couldn’t see what you need? See other options to discuss your inquiry.
      </h2>

      <div className="flex flex-col md:flex-row items-stretch justify-center space-y-6 md:space-y-0 md:space-x-6">
        {/* TA Clinic Card */}
        <div className="bg-white rounded-2xl p-16 flex-1 flex flex-col items-center shadow-md hover:shadow-xl transition transform hover:scale-105">
          <div className="relative mb-6">
            <FaLaptopMedical size={100} className="text-[#2e3192]" />
          </div>
          <h3 className="text-3xl font-bold text-[#2e3192] mb-4">TA WEDNESDAY</h3>
          <p className="text-gray-600 text-center mb-6 text-lg md:text-xl">
            Virtual Clinic for Technical Assistance opens every Wednesday.
          </p>
          <button
            onClick={() => setJoinModalOpen(true)}
            className="bg-[#FFE066] mt-2 px-10 py-4 border border-gray-700 text-gray-700 rounded-full transition transform hover:scale-105 font-semibold text-lg md:text-xl"
          >
            Join Here
          </button>
        </div>

        {/* OR divider */}
        <div className="mx-4 px-4 py-2 rounded-full text-gray-700 font-bold text-3xl md:text-4xl cursor-pointer transition transform hover:scale-110 hover:text-[#2e3192] self-center">
          OR
        </div>

        {/* Ticket Request Card */}
        <div className="bg-white rounded-2xl p-16 flex-1 flex flex-col items-center shadow-md hover:shadow-xl transition transform hover:scale-105">
          <div className="mb-6">
            <FaTicketAlt size={100} className="text-[#2e3192]" />
          </div>
          <h3 className="text-3xl font-bold text-[#2e3192] mb-4">REQUEST TICKET</h3>
          <p className="text-gray-600 text-center mb-6 text-lg md:text-xl">
            Please submit a request ticket, and we will reach out to you shortly.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#FFE066] mt-2 px-10 py-4 border border-gray-700 text-gray-700 rounded-full transition transform hover:scale-105 font-semibold text-lg md:text-xl"
          >
            Request Here
          </button>
        </div>
      </div>

      {/* Modals */}
      <TicketModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <JoinModal isOpen={joinModalOpen} onClose={() => setJoinModalOpen(false)} />
    </section>
  );
};

export default OtherOptions;
