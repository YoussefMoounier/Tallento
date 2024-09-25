import React from "react";
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

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);

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
      title: "تطوير وتكنولوجيا المعلومات",
      rating: "4.85/5",
      skills: "65 مهارة",
      icon: it,
    },
    {
      title: "التصميم والإبداع",
      rating: "4.85/5",
      skills: "12 مهارة",
      icon: ds,
    },
    {
      title: "المبيعات والتسويق",
      rating: "4.85/5",
      skills: "22 مهارة",
      icon: sm,
    },
    { title: "دعم العملاء", rating: "4.85/5", skills: "5 مهارة", icon: cs },
    {
      title: "المالية والمحاسبة",
      rating: "4.85/5",
      skills: "49 مهارة",
      icon: fa,
    },
    { title: "الهندسة", rating: "4.85/5", skills: "80 مهارة", icon: en },
    {
      title: "الكتابة والترجمة",
      rating: "4.85/5",
      skills: "45 مهارة",
      icon: wt,
    },
    { title: "القانون", rating: "4.85/5", skills: "19 مهارة", icon: lg },
    {
      title: "التصوير الفوتوغرافي",
      rating: "4.85/5",
      skills: "59 مهارة",
      icon: ph,
    },
  ];

  const testimonials = [
    {
      quote: "منصة رائعة، ساعدتني في العثور على أفضل المواهب بسهولة.",
      author: "أحمد",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "تالينتو غيرت طريقة عملي تمامًا، سأظل دائمًا ممتنًا.",
      author: "سارة",
      img: "https://images.pexels.com/photos/2738919/pexels-photo-2738919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote: "أفضل تجربة توظيف مررت بها حتى الآن، واجهة مستخدم ممتازة.",
      author: "محمد",
      img: "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote: "منصة رائعة، ساعدتني في العثور على أفضل المواهب بسهولة.",
      author: "أحمد",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "تالينتو غيرت طريقة عملي تمامًا، سأظل دائمًا ممتنًا.",
      author: "سارة",
      img: "https://images.pexels.com/photos/2738919/pexels-photo-2738919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      quote: "أفضل تجربة توظيف مررت بها حتى الآن، واجهة مستخدم ممتازة.",
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
    <Carousel/>
    <div className="home-page-container">
      
      {/* <div className="wave-container">
        <div className="container-fluid">
          <div className="background">
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
          </div>
        </div>
      </div> */}
      {/* <header className="hero-container">
        <div className="header-content">
          <div className="header-text">
            <h1>مرحباً بك</h1>
            <p>
              مرحباً بكم في تالينتو، حيث يجتمع الإبداع مع الفرص!
              <br />
              نحن منصة تربط بين المواهب المتميزة والباحثين عن خدمات مميزة. سواء
              كنت تبحث عن موهبة لمشروعك القادم أو كنت موهوباً ترغب في عرض
              إبداعاتك، نحن هنا لنساعدك. اكتشف وتواصل وابدأ رحلتك معنا اليوم!
            </p>
            <button>
              <Link to={"./posts"}> استكشاف المواهب</Link>
            </button>
            {!user && (
              <button>
                <Link to={"/login"}> انضم كمُبدع </Link>
              </button>
            )}
          </div>
          <div className="header-image">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
      </header> */}

      {/* Featured Talents Section */}




      
      <FeaturedTalents categories={categories}/>

<CombinedSection/>
      {/* Browse by Category Section */}
      <div className="browse-by-category">
        <h2>كل المواهب فى مكان واحد</h2>
        <p>
          Looking For work? <a href="#">Browse Jobs</a>
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

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2>كيف يعمل؟</h2>
        <div className="steps">
          <div className="step">
            <h3>1. انضم إلينا</h3>
            <p>
              أنشئ حسابك وابدأ في عرض مواهبك أو البحث عن أفضل المواهب لمشروعك.
            </p>
          </div>
          <div className="step">
            <h3>2. اكتشف المواهب</h3>
            <p>استعرض قائمة المواهب المتاحة وقم بمقارنة المهارات والتقييمات.</p>
          </div>
          <div className="step">
            <h3>3. ابدأ العمل</h3>
            <p>تواصل مع الموهبة المناسبة لبدء مشروعك وتحقيق أهدافك.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      {/* <div className="testimonials">
        <h2>ماذا يقول عملاؤنا</h2>
        <Slider
          {...testimonialSliderSettings}
          className="testimonials-carousel"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p>"{testimonial.quote}"</p>
              <h4>- {testimonial.author}</h4>
              <img src={testimonial.img} alt="" />
            </div>
          ))}
        </Slider>
      </div> */}

 
    </div>
    </>
  );
};

export default HomePage;
