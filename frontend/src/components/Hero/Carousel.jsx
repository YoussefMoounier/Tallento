import React, { useState, useEffect } from "react";
import "./Carousel.css";
import ac from "./img/ac.jpg";
import infu from "./img/infu.jpg";
import mu from "./img/mu.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const items = [
    {
      imgSrc: ac,
      author: "ممثلة",
      title: "اعرض موهبتك",
      topic: "تالينتو",
      description: "لديك موهبة التمثيل؟ انضم الآن ...",
    },
    {
      imgSrc: infu,
      author: "لديك مهارة",
      title: " كسب المال",
      topic: "تالينتو",
      description: "مع تالينتو اصبح اسهل الان",
    },
    {
      imgSrc: mu,
      author: "مغني",
      title: "صوتك، طريقتك",
      topic: "تالينتو",
      description: "لديك موهبة الغناء؟ انضم الآن...",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="carousel">
      <div className="list">
        {items.map((item, index) => (
          <div
            key={item.author}
            className={`item ${index === currentIndex ? "active" : ""}`}
          >
            <img src={item.imgSrc} alt={`صورة مصغرة لـ ${item.author}`} />
            <div className="content">
              <div className="author">{item.author}</div>
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="des">{item.description}</div>
              <div className="buttons">
                <div className="buttons">
                  {!user && (
                    <>
                      <Link to={"/login"}>
                        <button className="subs-btn">اشترك</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="thumbnail">
        {items.map((item, index) => (
          <div
            key={`${item.author}-thumbnail`}
            className={`item ${index === currentIndex ? "active" : ""}`}
          >
            <img src={item.imgSrc} alt={`صورة مصغرة لـ ${item.author}`} />
            <div className="content">
              <div className="title">{item.author}</div>
              <div className="description">الوصف</div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button id="prev" onClick={handlePrev}>
          &lt;
        </button>
        <button id="next" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="time"></div>
    </div>
  );
};

export default Carousel;
