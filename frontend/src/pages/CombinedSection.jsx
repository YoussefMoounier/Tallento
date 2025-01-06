import React, { useContext } from "react"; // Import useContext
import createAccoImage from "../components/Hero/img/create acco.jpg";
import showingTalentImage from "../components/Hero/img/showing talent.jpg";
import moneyImage from "../components/Hero/img/money.jpg";
import { useSelector } from "react-redux";
import { LanguageContext } from "../context/LanguageContext"; // Import the context

const CombinedSection = () => {
  const { user } = useSelector((state) => state.auth);
  const { language } = useContext(LanguageContext); // Use context for language

  return (
    <section className="combined-section bg-customPink py-10">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-deepPurple">{language === "en" ? "بعض المشاريع" : "Some Projects"}</h1>
      </div>

      {/* Project Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="card">
          <img src={createAccoImage} alt={language === "en" ? "Create Account" : "إنشاء حساب"} className="w-full h-auto" />
          <p className="text-center mt-2">{language === "en" ? "Create Account" : "انشئ حساب"}</p>
        </div>

        <div className="card">
          <img src={showingTalentImage} alt={language === "en" ? "Show Your Talent" : "أظهر موهبتك"} className="w-full h-auto" />
          <p className="text-center mt-2">{language === "en" ? "Show Your Talent" : "أظهر موهبتك"}</p>
        </div>

        <div className="card">
          <img src={moneyImage} alt={language === "en" ? "Earn Money" : "كسب المال"} className="w-full h-auto" />
          <p className="text-center mt-2">{language === "en" ? "Earn Money" : "إكسب المال"}</p>
        </div>
      </div>

      {/* Registration Button */}
      <div className="text-center mt-8">
        <a href="/register" className="bg-deepPurple text-white py-2 px-4 rounded">
          {language === "en" ? "Register Now" : "سجل الان"}
        </a>
      </div>
    </section>
  );
};

export default CombinedSection;
