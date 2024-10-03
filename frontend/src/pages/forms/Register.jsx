import { useState, useContext } from "react"; // Import useContext
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";
import LoadingSpinner from "../../components/isLoading/LoadingSpinner";
import google from "./google.png";
import beard from "./hairstyle.png";
import hijab from "./hijab.png";
import { LanguageContext } from "../../context/LanguageContext"; // Import the context

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  console.log(new Date());
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [hasBeard, setHasBeard] = useState(false);
  const [wearsHijab, setWearsHijab] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useContext(LanguageContext); // Use context for language

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/api/auth/google/callback`,
      "_self"
    );
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error(language === "en" ? "Username is required" : "اسم المستخدم مطلوب");
    if (country.trim() === "") return toast.error(language === "en" ? "Country is required" : "البلد مطلوب");
    if (email.trim() === "") return toast.error(language === "en" ? "Email is required" : "البريد الالكتروني مطلوب");
    if (password.trim() === "") return toast.error(language === "en" ? "Password is required" : "كلمة السر مطلوبة");
    if (birthday.trim() === "") return toast.error(language === "en" ? "Birthday is required" : "تاريخ الميلاد مطلوب");
    if (gender.trim() === "") return toast.error(language === "en" ? "Gender is required" : "النوع مطلوب");
    if (phone.trim() === "") return toast.error(language === "en" ? "Phone number is required" : "رقم الهاتف مطلوب");

    setIsLoading(true);
    try {
      await dispatch(
        registerUser({
          username,
          email,
          country,
          password,
          birthday,
          gender,
          phone,
          hasBeard,
          wearsHijab,
        })
      );

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Registration Error:", error.message);
      toast.error(language === "en" ? "Registration failed. Please try again." : "فشل التسجيل. يرجى المحاولة مرة أخرى.");
    }
  };

  const navigate = useNavigate();

  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        navigate("/login");
      }
    });
  }

  return (
    <section className="form-container">
      <h1 className="form-title">{language === "en" ? "Create a New Account" : "انشاء حساب جديد"}</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            <i className="fas fa-user"></i> {language === "en" ? "Username" : "اسم المستخدم"}
          </label>
          <input
            type="text"
            className="form-input"
            id="username"
            placeholder={language === "en" ? "Enter your username" : "ادخل اسم المستخدم"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <i className="fas fa-envelope"></i> {language === "en" ? "Email" : "البريد الالكتروني"}
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            placeholder={language === "en" ? "Enter your email" : "ادخل بريدك الالكتروني"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            <i className="fas fa-lock"></i> {language === "en" ? "Password" : "كلمة السر"}
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            placeholder={language === "en" ? "Enter your password" : "ادخل كلمة السر"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            <i className="fas fa-phone"></i> {language === "en" ? "Phone Number" : "رقم الهاتف"}
          </label>
          <input
            type="tel"
            className="form-input"
            id="phone"
            maxLength={11}
            placeholder={language === "en" ? "Enter your phone number" : "ادخل رقم هاتفك"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday" className="form-label">
            <i className="fas fa-calendar-alt"></i> {language === "en" ? "Birthday" : "تاريخ الميلاد"}
          </label>
          <input
            type="date"
            className="form-input"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country" className="form-label">
            <i className="fas fa-globe"></i> {language === "en" ? "Country" : "البلد"}
          </label>
          <select
            className="form-input"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">{language === "en" ? "Select Country" : "اختر البلد"}</option>
            <option value="Afghanistan">أفغانستان</option>
            <option value="Albania">ألبانيا</option>
            <option value="Algeria">الجزائر</option>
            <option value="Andorra">أندورا</option>
            <option value="Angola">أنغولا</option>
            <option value="Argentina">الأرجنتين</option>
            <option value="Armenia">أرمينيا</option>
            <option value="Australia">أستراليا</option>
            <option value="Austria">النمسا</option>
            <option value="Azerbaijan">أذربيجان</option>
            <option value="Bahrain">البحرين</option>
            <option value="Bangladesh">بنغلاديش</option>
            <option value="Belarus">بيلاروسيا</option>
            <option value="Belgium">بلجيكا</option>
            <option value="Belize">بليز</option>
            <option value="Benin">بنين</option>
            <option value="Bhutan">بوتان</option>
            <option value="Bolivia">بوليفيا</option>
            <option value="Bosnia and Herzegovina">البوسنة والهرسك</option>
            <option value="Botswana">بوتسوانا</option>
            <option value="Brazil">البرازيل</option>
            <option value="Brunei">بروناي</option>
            <option value="Bulgaria">بلغاريا</option>
            <option value="Burkina Faso">بوركينا فاسو</option>
            <option value="Burundi">بوروندي</option>
            <option value="Cambodia">كمبوديا</option>
            <option value="Cameroon">الكاميرون</option>
            <option value="Canada">كندا</option>
            <option value="Cape Verde">الرأس الأخضر</option>
            <option value="Central African Republic">جمهورية أفريقيا الوسطى</option>
            <option value="Chad">تشاد</option>
            <option value="Chile">تشيلي</option>
            <option value="China">الصين</option>
            <option value="Colombia">كولومبيا</option>
            <option value="Comoros">جزر القمر</option>
            <option value="Congo">الكونغو</option>
            <option value="Costa Rica">كوستاريكا</option>
            <option value="Croatia">كرواتيا</option>
            <option value="Cuba">كوبا</option>
            <option value="Cyprus">قبرص</option>
            <option value="Czech Republic">التشيك</option>
            <option value="Denmark">الدنمارك</option>
            <option value="Djibouti">جيبوتي</option>
            <option value="Dominica">دومينيكا</option>
            <option value="Dominican Republic">جمهورية الدومينيكان</option>
            {/* ... other countries ... */}
            <option value="United States">الولايات المتحدة</option>
            <option value="Uruguay">أوروغواي</option>
            <option value="Uzbekistan">أوزبكستان</option>
            <option value="Vanuatu">فانواتو</option>
            <option value="Vatican City">مدينة الفاتيكان</option>
            <option value="Venezuela">فنزويلا</option>
            <option value="Vietnam">فيتنام</option>
            <option value="Yemen">اليمن</option>
            <option value="Zambia">زامبيا</option>
            <option value="Zimbabwe">زيمبابوي</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            <i className="fas fa-venus-mars"></i> {language === "en" ? "Gender" : "النوع"}
          </label>
          <select
            className="form-input"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">{language === "en" ? "Select Gender" : "اختر النوع"}</option>
            <option value="male">{language === "en" ? "Male" : "ذكر"}</option>
            <option value="female">{language === "en" ? "Female" : "أنثى"}</option>
          </select>
        </div>
        {gender === "male" && (
          <div className="form-group">
            <label htmlFor="hasBeard" className="form-label kind">
              <img src={beard} alt="" className="kind-img" />
              {language === "en" ? "Do you have a beard?" : "هل لديك لحية؟"}
            </label>
            <div>
              <label htmlFor="hasBeard">{language === "en" ? "Yes" : "نعم"}</label>
              <input
                type="checkbox"
                id="hasBeard"
                checked={hasBeard}
                onChange={(e) => setHasBeard(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="hasNoBeard">{language === "en" ? "No" : "لا"}</label>
              <input
                type="checkbox"
                id="hasNoBeard"
                checked={!hasBeard}
                onChange={() => setHasBeard(false)}
              />
            </div>
          </div>
        )}
        {gender === "female" && (
          <div className="form-group">
            <label htmlFor="wearsHijab" className="form-label kind">
              <img src={hijab} alt="" className="kind-img" />
              {language === "en" ? "Do you wear hijab?" : "هل ترتدين الحجاب؟"}
            </label>
            <div>
              <label htmlFor="wearsHijab">{language === "en" ? "Yes" : "نعم"}</label>
              <input
                type="checkbox"
                id="wearsHijab"
                checked={wearsHijab}
                onChange={(e) => setWearsHijab(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="wearsNoHijab">{language === "en" ? "No" : "لا"}</label>
              <input
                type="checkbox"
                id="wearsNoHijab"
                checked={!wearsHijab}
                onChange={() => setWearsHijab(false)}
              />
            </div>
          </div>
        )}
        <button className="form-btn" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : (language === "en" ? "Create Account" : "انشاء الحساب")}
        </button>
        <button className="google_btn" onClick={googleAuth}>
          <span>{language === "en" ? "Create Account with Google" : "انشئ حساب باستخدام جوجل"}</span>
          <img src={google} alt="google icon" />
        </button>
      </form>

      <div className="form-footer">
        {language === "en" ? "Already have an account?" : "لديك حساب بالفعل؟"} <Link to="/login">{language === "en" ? "Login" : "سجل الدخول"}</Link>
      </div>
    </section>
  );
};

export default Register;