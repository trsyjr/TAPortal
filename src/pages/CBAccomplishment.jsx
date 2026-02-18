import React from "react";

const CBAccomplishment = () => {
  const cbPlanFiles = [
    { name: "CB Plan Jan 2026", link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_1" },
    { name: "CB Plan Feb 2026", link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_2" },
    { name: "CB Plan Mar 2026", link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_3" },
    { name: "CB Plan Apr 2026", link: "https://docs.google.com/spreadsheets/d/YOUR_FILE_ID_4" },
  ];

  return (
    <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto mt-20">
      {/* Hero Section */}
      <section className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          CB Accomplishment
        </h1>
        <p className="text-gray-600 max-w-2xl">
          The CB Accomplishment (Capability Building Plan) outlines upcoming trainings, workshops, and
          capability-building activities. Click a file below to open it in Google Sheets.
        </p>
      </section>

      {/* Drive-style cards */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          CB Accomplishment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cbPlanFiles.map((file) => (
            <a
              key={file.link}
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 p-4"
            >
              {/* Drive-style file icon */}
              <div className="w-full h-32 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 2H8c-1.1 0-2 .9-2 2v4H5c-1.1 0-2 .9-2 2v10a2 2 0 002 2h11a2 2 0 002-2V4c0-1.1-.9-2-2-2zm0 16H8V4h11v14zM6 8h7v2H6z" />
                </svg>
              </div>

              {/* File name */}
              <span className="font-medium text-gray-800 text-center line-clamp-2">
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
