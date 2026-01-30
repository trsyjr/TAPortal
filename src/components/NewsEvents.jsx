import React, { useState } from "react";
import Slider from "react-slick";

// ✅ React Slick CSS imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsEvents = () => {
  const newsItems = [
    {
      image: "https://via.placeholder.com/600x400?text=News+1",
      title: "Exciting New Program Launched!",
      description:
        "Our latest initiative aims to empower communities and ensure that every citizen has access to essential services. Stay tuned for updates and participation opportunities!",
    },
    {
      image: "https://via.placeholder.com/600x400?text=News+2",
      title: "Community Outreach Event",
      description:
        "Join us as we bring essential resources and programs to local communities. Volunteers and participants are welcome to get involved!",
    },
    {
      image: "https://via.placeholder.com/600x400?text=News+3",
      title: "Annual Awards Ceremony",
      description:
        "Celebrating outstanding achievements in our programs and recognizing those who make a difference in society.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <section className="py-12 px-6 md:px-20 lg:px-40 font-sans">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center md:text-left">
        NEWS & EVENTS
      </h2>

      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Left Carousel */}
        <div className="flex-1 w-full md:max-w-2xl">
          <Slider {...sliderSettings} className="rounded-2xl overflow-hidden shadow-md">
            {newsItems.map((item, idx) => (
              <div key={idx}>
                <img
                  src={item.image}
                  alt={`News ${idx + 1}`}
                  className="w-full h-[28rem] md:h-[36rem] object-cover rounded-2xl"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Right Text */}
        <div className="flex-1 flex flex-col justify-start space-y-6">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {newsItems[currentSlide].title}
            </h3>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              {newsItems[currentSlide].description}
            </p>
          </div>

          <div>
            <button className="bg-[#FFE066] text-black px-8 py-4 rounded-full font-semibold text-lg md:text-xl border border-black transition transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Centered hashtag below everything */}
      <p className="mt-12 text-center text-[#2e3192] font-bold text-xl md:text-3xl lg:text-4xl">
        #BawatBuhayMahalagaSaDSWD
      </p>
    </section>
  );
};

export default NewsEvents;
