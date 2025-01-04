import React, { useState, useEffect, useContext } from "react"; 
import { LanguageContext } from "../../context/LanguageContext"; 
import mic from "../../assets/mic.png"
import { useSelector } from "react-redux";
import "./Carousel.css";

const Carousel = () => {
  const { user } = useSelector((state) => state.auth);
  const { language } = useContext(LanguageContext);




  

  return (
   
          
<div>
  <div className="relative h-screen bg-gradient-to-b from-white via-white to-purple-500">
    {/* Content container */}
    <div className="container mx-auto px-4 h-full flex items-center justify-center">
      {/* Hero content */}
      <div className="relative">
        {/* Center microphone image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        </div>
        
        {/* Circular text layout */}
        <div className="relative w-[600px] h-[600px] rounded-full">
          {/* Add your Arabic text elements positioned absolutely */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl font-bold text-gray-800">
            نجوم
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl font-bold text-gray-800">
            تالينتو
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-800">
            مكانك
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-800">
            ضمن
          </div>
          <img 
            src={mic} 
            alt="Microphone" 
            className="w-[80%]  object-cover"
          />
        </div>
      </div>
    </div>
    
    {/* Decorative elements */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Add musical notes, theater masks, and other icons as absolute positioned elements */}
      <div className="absolute top-1/4 left-1/4 text-4xl text-gray-300">♪</div>
      <div className="absolute top-1/3 right-1/4 text-4xl text-gray-300">♫</div>
      {/* Add more decorative elements as needed */}
    </div>
  </div>
</div>
  );
};

export default Carousel;
