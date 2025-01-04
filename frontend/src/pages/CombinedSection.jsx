import React, { useContext } from "react"; // Import useContext
import "./CombinedSection.css"; // استيراد ملف CSS الموحد
import createAccoImage from "../components/Hero/img/create acco.jpg";
import showingTalentImage from "../components/Hero/img/showing talent.jpg";
import moneyImage from "../components/Hero/img/money.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LanguageContext } from "../context/LanguageContext"; // Import the context

const CombinedSection = () => {
  const { user } = useSelector((state) => state.auth);
  const { language } = useContext(LanguageContext); // Use context for language

  return (
    <section className="combined-section">
      {/* قسم المزايا */}
      <div className="features-section">
        <div className="left">
          <h1>{language === "en" ? "What Your Journey Looks Like With Us" : "كيف تبدو رحلتك معنا"}</h1>
        </div>
        <div className="right">
          <div className="card card1">
            <div className="card__content">
              <p className="card__title">{language === "en" ? "Create Account" : "انشئ حساب"}</p>
            </div>
            <img src={createAccoImage} alt={language === "en" ? "Create Account" : "إنشاء حساب"} />
          </div>

          <div className="card card2">
            <div className="card__content">
              <p className="card__title">{language === "en" ? "Show Your Talent" : "أظهر موهبتك"}</p>
            </div>
            <img src={showingTalentImage} alt={language === "en" ? "Show Your Talent" : "أظهر موهبتك"} />
          </div>

          <div className="card card3">
            <div className="card__content">
              <p className="card__title">{language === "en" ? "Earn Money" : "إكسب المال"}</p>
            </div>
            <img src={moneyImage} alt={language === "en" ? "Earn Money" : "كسب المال"} />
          </div>
        </div>
      </div>

      {/* قسم النمو */}
      <div className="grow-section">
        <div className="grow-right">
          <h1>{language === "en" ? "We Can't Wait to See Your Work Thrive!" : "لا نستطيع الانتظار لرؤية اعمالك تزدهر!"}</h1>
          <p>{language === "en" ? "For any inquiries about the platform, please contact us at" : "لأي استفسار حول المنصة, يرجى التواصل معنا على"}</p>
          <div className="subb">
            <a href="mailto:tallento@gmail.com" className="email-link">
              tallento@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedSection;
