import React from "react";
import "./CombinedSection.css"; // استيراد ملف CSS الموحد

// التأكد من أن الصور موجودة في مجلد public أو استيرادها مباشرة
import createAccoImage from "../components/Hero/img/create acco.jpg";
import showingTalentImage from "../components/Hero/img/showing talent.jpg";
import moneyImage from "../components/Hero/img/money.jpg";
import growImage from "../components/Hero/img/grow.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CombinedSection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="combined-section">
      {/* قسم المزايا */}
      <div className="features-section">
        <div className="left">
          <h1>كيف تبدو رحلتك معنا</h1>
          
        </div>
        <div className="right">
          <div className="card card1">
            <div className="card__content">
              <p className="card__title">انشئ حساب</p>
            </div>
            <img src={createAccoImage} alt="إنشاء حساب" />
          </div>

          <div className="card card2">
            <div className="card__content">
              <p className="card__title">أظهر موهبتك</p>
            </div>
            <img src={showingTalentImage} alt="أظهر موهبتك" />
          </div>

          <div className="card card3">
            <div className="card__content">
              <p className="card__title">إكسب المال</p>
            </div>
            <img src={moneyImage} alt="كسب المال" />
          </div>
        </div>
      </div>

      {/* قسم النمو */}
      <div className="grow-section">
        <div className="grow-right">
          <h1>لا نستطيع الانتظار لرؤية اعمالك تزدهر!</h1>
          
          <p>لأي استفسار حول المنصة, يرجى التواصل معنا على</p>
          
          
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
