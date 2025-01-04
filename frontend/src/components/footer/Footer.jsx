import React, { useContext } from "react"; // Import useContext
import {
  FaSearch,
  FaPlusCircle,
  FaBriefcase,
  FaCubes,
  FaUsers,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./footer.css";
import { useSelector } from "react-redux";
import { DiGhostSmall } from "react-icons/di";
import { LanguageContext } from "../../context/LanguageContext"; // Import the context

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const year = new Date().getFullYear();
  const { language } = useContext(LanguageContext); // Use context for language

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="quick-links">
          <h3>{language === "en" ? "Quick Links" : "روابط سريعة"}</h3>
          <ul>
            <li>
              <Link to="/about">{language === "en" ? "About Us" : "من نحن"}</Link>
            </li>
            <li>
              <Link to="/contact">{language === "en" ? "Contact Us" : "اتصل بنا"}</Link>
            </li>
            <li>
              <Link to="/privacy">{language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}</Link>
            </li>
            <li>
              <Link to="/terms">{language === "en" ? "Terms and Conditions" : "الشروط والأحكام"}</Link>
            </li>
          </ul>
        </div>

        <div className="social-media">
          <h3>{language === "en" ? "Follow Us" : "تابعونا"}</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="newsletter">
          <h3>{language === "en" ? "Subscribe to our Newsletter" : "اشترك في النشرة الإخبارية"}</h3>
          <form>
            <input type="email" placeholder={language === "en" ? "Enter your email" : "أدخل بريدك الإلكتروني"} />
            <button type="submit">{language === "en" ? "Subscribe" : "اشترك"}</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{language === "en" ? `© ${year} Tallento. All rights reserved.` : `© ${year} تالينتو. جميع الحقوق محفوظة.`}</p>
      </div>
    </footer>
  );
};

export default Footer;
