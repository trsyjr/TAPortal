// src/pages/About.jsx
import React, { useState } from "react";
import Slider from "react-slick";

// ✅ React Slick CSS imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  // Placeholder slides
  const slides = [
    "https://via.placeholder.com/1920x1080?text=Slide+1",
    "https://via.placeholder.com/1920x1080?text=Slide+2",
    "https://via.placeholder.com/1920x1080?text=Slide+3",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <section className="relative w-full h-screen">
      {/* Carousel */}
      <Slider {...sliderSettings} className="h-full">
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full h-screen">
            <img
              src={slide}
              alt={`Slide ${idx + 1}`}
              className="w-full h-screen object-cover"
            />
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </Slider>

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome to the DSWD Academy CBD-PLDS
        </h1>
        <p className="text-lg md:text-2xl text-white drop-shadow-lg">
          Technical Assistance Portal!
        </p>
      </div>
    </section>
  );
};

export default About;
