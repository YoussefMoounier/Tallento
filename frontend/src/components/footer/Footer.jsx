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

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const year = new Date().getFullYear();

  return (
    <>
      {/* <footer className="footer-container">
        <div className="footer-links">
          <ul>
            <li>
              <Link className="footer-link" to="/">
                <span className="title">الرئيسية</span>
                <span className="icon">
                  <FaCubes />
                </span>
              </Link>
            </li>
            {!user && (
              <li>
                <Link className="footer-link" to="/search">
                  <span className="title">ابحث عن موهوبين</span>
                  <span className="icon">
                    <FaUsers />
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link className="footer-link" to="/posts">
                <span className="title">تصفح المنشورات</span>
                <span className="icon">
                  <DiGhostSmall />
                </span>
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/projects">
                <span className="title">تصفح المشاريع</span>
                <span className="icon">
                  <FaCubes />
                </span>
              </Link>
            </li>
            {user && (
              <li>
                <Link className="footer-link" to="/add-project">
                  <span className="title">أضف مشروع</span>
                  <span className="icon">
                    <FaPlusCircle />
                  </span>
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link className="footer-link" to="/my-projects">
                  <span className="title">مشاريعي</span>
                  <span className="icon">
                    <FaBriefcase />
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="footer-contact">
          <h4>اتصل بنا</h4>
          <ul>
            <li>
              <FaPhoneAlt />
              <span>+123-456-7890</span>
            </li>
            <li>
              <FaEnvelope />
              <span>info@tallento.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-copy">
          <p>Copyright {year} &copy; Tallento</p>
        </div>
      </footer> */}
      <footer className="footer">
        <div className="footer-content">
          <div className="quick-links">
            <h3>روابط سريعة</h3>
            <ul>
              <li>
                <Link to="/about">من نحن</Link>
              </li>
              <li>
                <Link to="/contact">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/privacy">سياسة الخصوصية</Link>
              </li>
              <li>
                <Link to="/terms">الشروط والأحكام</Link>
              </li>
            </ul>
          </div>
         
            <div className="social-media">
              <h3>تابعونا</h3>
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
            <h3>اشترك في النشرة الإخبارية</h3>
            <form>
              <input type="email" placeholder="أدخل بريدك الإلكتروني" />
              <button type="submit">اشترك</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 تالينتو. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
