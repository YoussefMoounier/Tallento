import React, { useState, useEffect, useContext } from "react"; 
import { LanguageContext } from "../../context/LanguageContext"; 
import mic from "../../assets/hero.png"
import { useSelector } from "react-redux";
import "./Carousel.css";

const Carousel = () => {
  const { user } = useSelector((state) => state.auth);
  const { language } = useContext(LanguageContext);




  

  return (
   
          

  <div className="relative h-96 bg-gradient-to-b from-white via-white to-purple-500 bg-red-400 flex lg:h-screen justify-center items-end">
 
        <img 
            src={mic} 
            alt="Microphone" 
            className="lg:w-[50%] object-contain md:w-96"
          />
          <div className="relative z-50 h-screen bg-gradient-to-b from-white to-purple-500 justify-center items-center flex ">

          </div>
    {/* Decorative elements */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Add musical notes, theater masks, and other icons as absolute positioned elements */}
      <div className="absolute top-1/4 left-1/4 text-4xl text-gray-300">♪</div>
      <div className="absolute top-1/3 right-1/4 text-4xl text-gray-300">♫</div>
      {/* Add more decorative elements as needed */}
    </div>
  </div>

  );
};

export default Carousel;
