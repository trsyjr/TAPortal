import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20 lg:px-40 mt-20">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-[#2e3192] mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 mb-4">
          These Terms and Conditions govern access to and use of the DSWD Academy Technical Assistance Portal.
        </p>

        <h2 className="text-xl font-semibold text-[#2e3192] mt-6 mb-2">Authorized Use</h2>
        <p className="text-gray-700 mb-4">
          The Portal is intended for official use by authorized personnel of Offices, Bureaus, Services, Units, Field Offices, and recognized partner-stakeholders. Use of the Portal must support legitimate capability building and technical assistance activities.
        </p>

        <h2 className="text-xl font-semibold text-[#2e3192] mt-6 mb-2">Acceptable Conduct</h2>
        <p className="text-gray-700 mb-4">
          Users shall use the Portal in a lawful and professional manner. The following actions are prohibited:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Uploading inaccurate, misleading, or unauthorized content</li>
          <li>Attempting to access restricted areas without authorization</li>
          <li>Interfering with portal operations or security features</li>
          <li>Using the Portal for non-official or personal purposes</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#2e3192] mt-6 mb-2">Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          Content, templates, and resources available on the Portal are provided for official departmental use. Materials may not be reproduced or distributed outside authorized contexts without proper approval.
        </p>

        <h2 className="text-xl font-semibold text-[#2e3192] mt-6 mb-2">System Availability</h2>
        <p className="text-gray-700 mb-4">
          Portal administrators aim to maintain reliable access but do not guarantee uninterrupted availability. Scheduled maintenance or technical issues may result in temporary service interruptions.
        </p>

        <h2 className="text-xl font-semibold text-[#2e3192] mt-6 mb-2">Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          The Portal is provided as an operational support tool. Administrators are not liable for losses arising from improper use, unauthorized access, or technical disruptions beyond reasonable control.
        </p>

        <h2 className="text-xl font-semibold text-[#2e3192] mt-6 mb-2">Modifications</h2>
        <p className="text-gray-700 mb-4">
          Portal features and these Terms and Conditions may be updated as needed to support operational requirements. Continued use of the Portal indicates acceptance of any changes.
        </p>

        <h2 className="text-xl font-semibold text-[#2e3192] mt-6 mb-2">Governing Framework</h2>
        <p className="text-gray-700 mb-4">
          Use of the Portal is subject to applicable government policies, information security standards, and administrative regulations.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
