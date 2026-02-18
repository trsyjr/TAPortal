import React from "react";

const CBAccomplishment = () => {
  // Example CB Plan files
  const cbPlanFiles = [
    {
      name: "CB Plan Jan 2026",
      link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_1",
    },
    {
      name: "CB Plan Feb 2026",
      link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_2",
    },
    {
      name: "CB Plan Mar 2026",
      link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_3",
    },
    {
      name: "CB Plan Apr 2026",
      link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_4",
    },
  ];

  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          CB Plan
        </h1>
        <p className="text-gray-600 max-w-2xl">
          The CB Plan (Capability Building Plan) is designed to outline the
          upcoming training, workshops, and capability-building activities for
          our teams and partners. You can view the individual plans below.
        </p>
      </section>

      {/* Files Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          CB Plan Files
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cbPlanFiles.map((file) => (
            <a
              key={file.name}
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 hover:bg-gray-50"
            >
              {/* File Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500 mb-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 2H8c-1.1 0-2 .9-2 2v4H5c-1.1 0-2 .9-2 2v10a2 2 0 002 2h11a2 2 0 002-2V4c0-1.1-.9-2-2-2zm0 16H8V4h11v14zM6 8h7v2H6z" />
              </svg>

              {/* File Name */}
              <span className="text-gray-800 font-medium text-center">
                {file.name}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CBAccomplishment;
