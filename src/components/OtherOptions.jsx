import React from "react";
import { AiOutlineLaptop, AiOutlinePlus } from "react-icons/ai";
import { FaTicketAlt } from "react-icons/fa";

const OtherOptions = () => {
  return (
    <section className="py-5 px-6 md:px-20 lg:px-40 text-center font-sans">
      <h2 className="text-md md:text-lg font-semibold mb-12 text-gray-800">
        Couldn’t see what you need? See other options to discuss your inquiry.
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="bg-white rounded-2xl p-16 flex flex-col items-center shadow-md hover:shadow-xl transition transform hover:scale-105">
          <div className="relative mb-6">
            <AiOutlineLaptop size={100} className="text-[#2e3192]" />
            <AiOutlinePlus
              size={50}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#ee1c25]"
            />
          </div>
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">TA CLINIC</h3>
          <p className="text-gray-600 text-center mb-6 text-lg md:text-xl">
            Virtual Clinic for Technical Assistance opens every Wednesday.
          </p>
          <button className="bg-[#FFE066] mt-2 px-10 py-4 border border-gray-700 text-gray-700 rounded-full transition transform hover:scale-105 font-semibold text-lg md:text-xl">
            Join Here
          </button>
        </div>

        <div className="mx-4 px-4 py-2 rounded-full text-gray-700 font-bold text-3xl md:text-4xl cursor-pointer transition transform hover:scale-110 hover:text-[#2e3192]">
          OR
        </div>

        <div className="bg-white rounded-2xl p-16 flex flex-col items-center shadow-md hover:shadow-xl transition transform hover:scale-105">
          <div className="mb-6">
            <FaTicketAlt size={100} className="text-[#2e3192]" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">REQUEST TICKET</h3>
          <p className="text-gray-600 text-center mb-6 text-lg md:text-xl">
            Please submit a request ticket, and we will reach out to you shortly.
          </p>
          <button className="bg-[#FFE066] mt-2 px-10 py-4 border border-gray-700 text-gray-700 rounded-full transition transform hover:scale-105 font-semibold text-lg md:text-xl">
            Request Here
          </button>

        </div>
      </div>
    </section>
  );
};

export default OtherOptions;
