import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./FeaturedTalents.css"; // Import your updated CSS file
import { useSelector } from "react-redux";

const FeaturedTalents = ({ categories }) => {
  const { user } = useSelector((state) => state.auth);
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="featured-talents-container">
      <h2 className="featured-talents-heading"> أفضل المواهب فى مكان واحد</h2>
      <Slider {...settings} className="carousel-slider">
        {categories.map((category, index) => (
          <div key={index} className="card-item">
            <img
              src={category.icon}
              alt={category.title}
              className="card-icon"
            />
            <h3 className="card-title">{category.title}</h3>
            <p className="card-rating">{category.rating}</p>
            <p className="card-skills">{category.skills}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedTalents;
