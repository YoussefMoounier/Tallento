import React, { useContext } from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import animationData from "./44.json";
import "./homepage.css";
import { useSelector } from "react-redux";
import it from "../images/4674328 1.png";
import ds from "../images/4756506 1.png";
import sm from "../images/51.png";
import cs from "../images/3212590 1.png";
import fa from "../images/rupee-dynamic-color.png";
import en from "../images/engineer-8638676-6876224 1.png";
import wt from "../images/writing-3943340-3268065 1.png";
import lg from "../images/law-book-6815122-5602636 1.png";
import ph from "../images/camera-dynamic-color.png";
import FeaturedTalents from "./FeaturedTalents";
import Carousel from "../components/Hero/Carousel";
import CombinedSection from "./CombinedSection";
import { LanguageContext } from "../context/LanguageContext";
// import { LanguageContext } from "../../context/LanguageContext";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { language } = useContext(LanguageContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const categories = [
    {
      title: language === "en" ? "IT Development" : "تطوير وتكنولوجيا المعلومات",
      rating: "4.85/5",
      skills: language === "en" ? "65 Skills" : "65 مهارة",
      icon: it,
    },
    {
      title: language === "en" ? "Design & Creativity" : "التصميم والإبداع",
      rating: "4.85/5",
      skills: language === "en" ? "12 Skills" : "12 مهارة",
      icon: ds,
    },
    {
      title: language === "en" ? "Sales & Marketing" : "المبيعات والتسويق",
      rating: "4.85/5",
      skills: language === "en" ? "22 Skills" : "22 مهارة",
      icon: sm,
    },
    { title: language === "en" ? "Customer Support" : "دعم العملاء", rating: "4.85/5", skills: language === "en" ? "5 Skills" : "5 مهارة", icon: cs },
    {
      title: language === "en" ? "Finance & Accounting" : "المالية والمحاسبة",
      rating: "4.85/5",
      skills: language === "en" ? "49 Skills" : "49 مهارة",
      icon: fa,
    },
    { title: language === "en" ? "Engineering" : "الهندسة", rating: "4.85/5", skills: language === "en" ? "80 Skills" : "80 مهارة", icon: en },
    {
      title: language === "en" ? "Writing & Translation" : "الكتابة والترجمة",
      rating: "4.85/5",
      skills: language === "en" ? "45 Skills" : "45 مهارة",
      icon: wt,
    },
    { title: language === "en" ? "Law" : "القانون", rating: "4.85/5", skills: language === "en" ? "19 Skills" : "19 مهارة", icon: lg },
    {
      title: language === "en" ? "Photography" : "التصوير الفوتوغرافي",
      rating: "4.85/5",
      skills: language === "en" ? "59 Skills" : "59 مهارة",
      icon: ph,
    },
  ];

  const testimonials = [
    {
      quote: language === "en" ? "A great platform that helped me find the best talents easily." : "منصة رائعة، ساعدتني في العثور على أفضل المواهب بسهولة.",
      author: "أحمد",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: language === "en" ? "Tallento completely changed the way I work, I will always be grateful." : "تالينتو غيرت طريقة عملي تمامًا، سأظل دائمًا ممتنًا.",
      author: "سارة",
      img: "https://images.pexels.com/photos/2738919/pexels-photo-2738919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote: language === "en" ? "The best hiring experience I've had so far, excellent user interface." : "أفضل تجربة توظيف مررت بها حتى الآن، واجهة مستخدم ممتازة.",
      author: "محمد",
      img: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const testimonialSliderSettings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Carousel />
      <div className="home-page-container">
        <FeaturedTalents categories={categories} />
        <CombinedSection />
        <div className="browse-by-category">
          <h2>{language === "en" ? "All Talents in One Place" : "كل المواهب فى مكان واحد"}</h2>
          <p>
            {language === "en" ? "Looking For work?" : "Looking For work?"} <a href="#">{language === "en" ? "Browse Jobs" : "استعرض الوظائف"}</a>
          </p>
          <div className="categories">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <img
                  src={category.icon}
                  alt={category.title}
                  className="category-icon"
                />
                <h3>{category.title}</h3>
                <p className="rating">{category.rating}</p>
                <p className="skills">{category.skills}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="how-it-works">
          <h2>{language === "en" ? "How It Works?" : "كيف يعمل؟"}</h2>
          <div className="steps">
            <div className="step">
              <h3>{language === "en" ? "1. Join Us" : "1. انضم إلينا"}</h3>
              <p>
                {language === "en" ? "Create your account and start showcasing your talents or searching for the best talents for your project." : "أنشئ حسابك وابدأ في عرض مواهبك أو البحث عن أفضل المواهب لمشروعك."}
              </p>
            </div>
            <div className="step">
              <h3>{language === "en" ? "2. Discover Talents" : "2. اكتشف المواهب"}</h3>
              <p>{language === "en" ? "Browse the list of available talents and compare skills and ratings." : "استعرض قائمة المواهب المتاحة وقم بمقارنة المهارات والتقييمات."}</p>
            </div>
            <div className="step">
              <h3>{language === "en" ? "3. Start Working" : "3. ابدأ العمل"}</h3>
              <p>{language === "en" ? "Connect with the right talent to start your project and achieve your goals." : "تواصل مع الموهبة المناسبة لبدء مشروعك وتحقيق أهدافك."}</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials">
          <h2>{language === "en" ? "What Our Clients Say" : "ماذا يقول عملاؤنا"}</h2>
          <Slider {...testimonialSliderSettings} className="testimonials-carousel">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p>"{testimonial.quote}"</p>
                <h4>- {testimonial.author}</h4>
                <img src={testimonial.img} alt="" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default HomePage;