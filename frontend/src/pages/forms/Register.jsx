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

  const countries = {
    en: [
      { value: "Afghanistan", label: "Afghanistan" },
      { value: "Albania", label: "Albania" },
      { value: "Algeria", label: "Algeria" },
      { value: "Andorra", label: "Andorra" },
      { value: "Angola", label: "Angola" },
      { value: "Argentina", label: "Argentina" },
      { value: "Armenia", label: "Armenia" },
      { value: "Australia", label: "Australia" },
      { value: "Austria", label: "Austria" },
      { value: "Azerbaijan", label: "Azerbaijan" },
      { value: "Bahamas", label: "Bahamas" },
      { value: "Bahrain", label: "Bahrain" },
      { value: "Bangladesh", label: "Bangladesh" },
      { value: "Barbados", label: "Barbados" },
      { value: "Belarus", label: "Belarus" },
      { value: "Belgium", label: "Belgium" },
      { value: "Belize", label: "Belize" },
      { value: "Benin", label: "Benin" },
      { value: "Bhutan", label: "Bhutan" },
      { value: "Bolivia", label: "Bolivia" },
      { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
      { value: "Botswana", label: "Botswana" },
      { value: "Brazil", label: "Brazil" },
      { value: "Brunei", label: "Brunei" },
      { value: "Bulgaria", label: "Bulgaria" },
      { value: "Burkina Faso", label: "Burkina Faso" },
      { value: "Burundi", label: "Burundi" },
      { value: "Cabo Verde", label: "Cabo Verde" },
      { value: "Cambodia", label: "Cambodia" },
      { value: "Cameroon", label: "Cameroon" },
      { value: "Canada", label: "Canada" },
      { value: "Central African Republic", label: "Central African Republic" },
      { value: "Chad", label: "Chad" },
      { value: "Chile", label: "Chile" },
      { value: "China", label: "China" },
      { value: "Colombia", label: "Colombia" },
      { value: "Comoros", label: "Comoros" },
      { value: "Congo", label: "Congo" },
      { value: "Costa Rica", label: "Costa Rica" },
      { value: "Croatia", label: "Croatia" },
      { value: "Cuba", label: "Cuba" },
      { value: "Cyprus", label: "Cyprus" },
      { value: "Czech Republic", label: "Czech Republic" },
      { value: "Denmark", label: "Denmark" },
      { value: "Djibouti", label: "Djibouti" },
      { value: "Dominica", label: "Dominica" },
      { value: "Dominican Republic", label: "Dominican Republic" },
      { value: "Ecuador", label: "Ecuador" },
      { value: "Egypt", label: "Egypt" },
      { value: "El Salvador", label: "El Salvador" },
      { value: "Equatorial Guinea", label: "Equatorial Guinea" },
      { value: "Eritrea", label: "Eritrea" },
      { value: "Estonia", label: "Estonia" },
      { value: "Eswatini", label: "Eswatini" },
      { value: "Ethiopia", label: "Ethiopia" },
      { value: "Fiji", label: "Fiji" },
      { value: "Finland", label: "Finland" },
      { value: "France", label: "France" },
      { value: "Gabon", label: "Gabon" },
      { value: "Gambia", label: "Gambia" },
      { value: "Georgia", label: "Georgia" },
      { value: "Germany", label: "Germany" },
      { value: "Ghana", label: "Ghana" },
      { value: "Greece", label: "Greece" },
      { value: "Grenada", label: "Grenada" },
      { value: "Guatemala", label: "Guatemala" },
      { value: "Guinea", label: "Guinea" },
      { value: "Guinea-Bissau", label: "Guinea-Bissau" },
      { value: "Guyana", label: "Guyana" },
      { value: "Haiti", label: "Haiti" },
      { value: "Honduras", label: "Honduras" },
      { value: "Hungary", label: "Hungary" },
      { value: "Iceland", label: "Iceland" },
      { value: "India", label: "India" },
      { value: "Indonesia", label: "Indonesia" },
      { value: "Iran", label: "Iran" },
      { value: "Iraq", label: "Iraq" },
      { value: "Ireland", label: "Ireland" },
      { value: "Israel", label: "Israel" },
      { value: "Italy", label: "Italy" },
      { value: "Jamaica", label: "Jamaica" },
      { value: "Japan", label: "Japan" },
      { value: "Jordan", label: "Jordan" },
      { value: "Kazakhstan", label: "Kazakhstan" },
      { value: "Kenya", label: "Kenya" },
      { value: "Kiribati", label: "Kiribati" },
      { value: "Korea, North", label: "Korea, North" },
      { value: "Korea, South", label: "Korea, South" },
      { value: "Kuwait", label: "Kuwait" },
      { value: "Kyrgyzstan", label: "Kyrgyzstan" },
      { value: "Laos", label: "Laos" },
      { value: "Latvia", label: "Latvia" },
      { value: "Lebanon", label: "Lebanon" },
      { value: "Lesotho", label: "Lesotho" },
      { value: "Liberia", label: "Liberia" },
      { value: "Libya", label: "Libya" },
      { value: "Liechtenstein", label: "Liechtenstein" },
      { value: "Lithuania", label: "Lithuania" },
      { value: "Luxembourg", label: "Luxembourg" },
      { value: "Madagascar", label: "Madagascar" },
      { value: "Malawi", label: "Malawi" },
      { value: "Malaysia", label: "Malaysia" },
      { value: "Maldives", label: "Maldives" },
      { value: "Mali", label: "Mali" },
      { value: "Malta", label: "Malta" },
      { value: "Marshall Islands", label: "Marshall Islands" },
      { value: "Mauritania", label: "Mauritania" },
      { value: "Mauritius", label: "Mauritius" },
      { value: "Mexico", label: "Mexico" },
      { value: "Micronesia", label: "Micronesia" },
      { value: "Moldova", label: "Moldova" },
      { value: "Monaco", label: "Monaco" },
      { value: "Mongolia", label: "Mongolia" },
      { value: "Montenegro", label: "Montenegro" },
      { value: "Morocco", label: "Morocco" },
      { value: "Mozambique", label: "Mozambique" },
      { value: "Myanmar", label: "Myanmar" },
      { value: "Namibia", label: "Namibia" },
      { value: "Nauru", label: "Nauru" },
      { value: "Nepal", label: "Nepal" },
      { value: "Netherlands", label: "Netherlands" },
      { value: "New Zealand", label: "New Zealand" },
      { value: "Nicaragua", label: "Nicaragua" },
      { value: "Niger", label: "Niger" },
      { value: "Nigeria", label: "Nigeria" },
      { value: "North Macedonia", label: "North Macedonia" },
      { value: "Norway", label: "Norway" },
      { value: "Oman", label: "Oman" },
      { value: "Pakistan", label: "Pakistan" },
      { value: "Palau", label: "Palau" },
      { value: "Palestine", label: "Palestine" },
      { value: "Panama", label: "Panama" },
      { value: "Papua New Guinea", label: "Papua New Guinea" },
      { value: "Paraguay", label: "Paraguay" },
      { value: "Peru", label: "Peru" },
      { value: "Philippines", label: "Philippines" },
      { value: "Poland", label: "Poland" },
      { value: "Portugal", label: "Portugal" },
      { value: "Qatar", label: "Qatar" },
      { value: "Romania", label: "Romania" },
      { value: "Russia", label: "Russia" },
      { value: "Rwanda", label: "Rwanda" },
      { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
      { value: "Saint Lucia", label: "Saint Lucia" },
      { value: "Saint Vincent and the Grenadines", label: "Saint Vincent and the Grenadines" },
      { value: "Samoa", label: "Samoa" },
      { value: "San Marino", label: "San Marino" },
      { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
      { value: "Saudi Arabia", label: "Saudi Arabia" },
      { value: "Senegal", label: "Senegal" },
      { value: "Serbia", label: "Serbia" },
      { value: "Seychelles", label: "Seychelles" },
      { value: "Sierra Leone", label: "Sierra Leone" },
      { value: "Singapore", label: "Singapore" },
      { value: "Slovakia", label: "Slovakia" },
      { value: "Slovenia", label: "Slovenia" },
      { value: "Solomon Islands", label: "Solomon Islands" },
      { value: "Somalia", label: "Somalia" },
      { value: "South Africa", label: "South Africa" },
      { value: "South Sudan", label: "South Sudan" },
      { value: "Spain", label: "Spain" },
      { value: "Sri Lanka", label: "Sri Lanka" },
      { value: "Sudan", label: "Sudan" },
      { value: "Suriname", label: "Suriname" },
      { value: "Sweden", label: "Sweden" },
      { value: "Switzerland", label: "Switzerland" },
      { value: "Syria", label: "Syria" },
      { value: "Taiwan", label: "Taiwan" },
      { value: "Tajikistan", label: "Tajikistan" },
      { value: "Tanzania", label: "Tanzania" },
      { value: "Thailand", label: "Thailand" },
      { value: "Togo", label: "Togo" },
      { value: "Tonga", label: "Tonga" },
      { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
      { value: "Tunisia", label: "Tunisia" },
      { value: "Turkey", label: "Turkey" },
      { value: "Turkmenistan", label: "Turkmenistan" },
      { value: "Tuvalu", label: "Tuvalu" },
      { value: "Uganda", label: "Uganda" },
      { value: "Ukraine", label: "Ukraine" },
      { value: "United Arab Emirates", label: "United Arab Emirates" },
      { value: "United Kingdom", label: "United Kingdom" },
      { value: "United States", label: "United States" },
      { value: "Uruguay", label: "Uruguay" },
      { value: "Uzbekistan", label: "Uzbekistan" },
      { value: "Vanuatu", label: "Vanuatu" },
      { value: "Vatican City", label: "Vatican City" },
      { value: "Venezuela", label: "Venezuela" },
      { value: "Vietnam", label: "Vietnam" },
      { value: "Yemen", label: "Yemen" },
      { value: "Zambia", label: "Zambia" },
      { value: "Zimbabwe", label: "Zimbabwe" },
    ],
    ar: [
      { value: "Afghanistan", label: "أفغانستان" },
      { value: "Albania", label: "ألبانيا" },
      { value: "Algeria", label: "الجزائر" },
      { value: "Andorra", label: "أندورا" },
      { value: "Angola", label: "أنغولا" },
      { value: "Argentina", label: "الأرجنتين" },
      { value: "Armenia", label: "أرمينيا" },
      { value: "Australia", label: "أستراليا" },
      { value: "Austria", label: "النمسا" },
      { value: "Azerbaijan", label: "أذربيجان" },
      { value: "Bahamas", label: "الباهاماس" },
      { value: "Bahrain", label: "البحرين" },
      { value: "Bangladesh", label: "بنغلاديش" },
      { value: "Barbados", label: "باربادوس" },
      { value: "Belarus", label: "بيلاروسيا" },
      { value: "Belgium", label: "بلجيكا" },
      { value: "Belize", label: "بليز" },
      { value: "Benin", label: "بنين" },
      { value: "Bhutan", label: "بوتان" },
      { value: "Bolivia", label: "بوليفيا" },
      { value: "Bosnia and Herzegovina", label: "البوسنة والهرسك" },
      { value: "Botswana", label: "بوتسوانا" },
      { value: "Brazil", label: "البرازيل" },
      { value: "Brunei", label: "بروناي" },
      { value: "Bulgaria", label: "بلغاريا" },
      { value: "Burkina Faso", label: "بوركينا فاسو" },
      { value: "Burundi", label: "بوروندي" },
      { value: "Cabo Verde", label: "الرأس الأخضر" },
      { value: "Cambodia", label: "كمبوديا" },
      { value: "Cameroon", label: "الكاميرون" },
      { value: "Canada", label: "كندا" },
      { value: "Central African Republic", label: "جمهورية أفريقيا الوسطى" },
      { value: "Chad", label: "تشاد" },
      { value: "Chile", label: "تشيلي" },
      { value: "China", label: "الصين" },
      { value: "Colombia", label: "كولومبيا" },
      { value: "Comoros", label: "جزر القمر" },
      { value: "Congo", label: "الكونغو" },
      { value: "Costa Rica", label: "كوستاريكا" },
      { value: "Croatia", label: "كرواتيا" },
      { value: "Cuba", label: "كوبا" },
      { value: "Cyprus", label: "قبرص" },
      { value: "Czech Republic", label: "التشيك" },
      { value: "Denmark", label: "الدنمارك" },
      { value: "Djibouti", label: "جيبوتي" },
      { value: "Dominica", label: "دومينيكا" },
      { value: "Dominican Republic", label: "جمهورية الدومينيكان" },
      { value: "Ecuador", label: "الإكوادور" },
      { value: "Egypt", label: "مصر" },
      { value: "El Salvador", label: "السلفادور" },
      { value: "Equatorial Guinea", label: "غينيا الاستوائية" },
      { value: "Eritrea", label: "إريتريا" },
      { value: "Estonia", label: "إستونيا" },
      { value: "Eswatini", label: "إسواتيني" },
      { value: "Ethiopia", label: "إثيوبيا" },
      { value: "Fiji", label: "فيجي" },
      { value: "Finland", label: "فنلندا" },
      { value: "France", label: "فرنسا" },
      { value: "Gabon", label: "الغابون" },
      { value: "Gambia", label: "غامبيا" },
      { value: "Georgia", label: "جورجيا" },
      { value: "Germany", label: "ألمانيا" },
      { value: "Ghana", label: "غانا" },
      { value: "Greece", label: "اليونان" },
      { value: "Grenada", label: "غرينادا" },
      { value: "Guatemala", label: "غواتيمالا" },
      { value: "Guinea", label: "غينيا" },
      { value: "Guinea-Bissau", label: "غينيا بيساو" },
      { value: "Guyana", label: "غيانا" },
      { value: "Haiti", label: "هايتي" },
      { value: "Honduras", label: "هندوراس" },
      { value: "Hungary", label: "المجر" },
      { value: "Iceland", label: "أيسلندا" },
      { value: "India", label: "الهند" },
      { value: "Indonesia", label: "إندونيسيا" },
      { value: "Iran", label: "إيران" },
      { value: "Iraq", label: "العراق" },
      { value: "Ireland", label: "أيرلندا" },
      { value: "Israel", label: "إسرائيل" },
      { value: "Italy", label: "إيطاليا" },
      { value: "Jamaica", label: "جامايكا" },
      { value: "Japan", label: "اليابان" },
      { value: "Jordan", label: "الأردن" },
      { value: "Kazakhstan", label: "كازاخستان" },
      { value: "Kenya", label: "كينيا" },
      { value: "Kiribati", label: "كيريباتي" },
      { value: "Korea, North", label: "كوريا الشمالية" },
      { value: "Korea, South", label: "كوريا الجنوبية" },
      { value: "Kuwait", label: "الكويت" },
      { value: "Kyrgyzstan", label: "قرغيزستان" },
      { value: "Laos", label: "لاوس" },
      { value: "Latvia", label: "لاتفيا" },
      { value: "Lebanon", label: "لبنان" },
      { value: "Lesotho", label: "ليسوتو" },
      { value: "Liberia", label: "ليبيريا" },
      { value: "Libya", label: "ليبيا" },
      { value: "Liechtenstein", label: "ليختنشتاين" },
      { value: "Lithuania", label: "ليتوانيا" },
      { value: "Luxembourg", label: "لوكسمبورغ" },
      { value: "Madagascar", label: "مدغشقر" },
      { value: "Malawi", label: "مالاوي" },
      { value: "Malaysia", label: "ماليزيا" },
      { value: "Maldives", label: "مالديف" },
      { value: "Mali", label: "مالي" },
      { value: "Malta", label: "مالطا" },
      { value: "Marshall Islands", label: "جزر مارشال" },
      { value: "Mauritania", label: "موريتانيا" },
      { value: "Mauritius", label: "موريشيوس" },
      { value: "Mexico", label: "المكسيك" },
      { value: "Micronesia", label: "ميكرونيزيا" },
      { value: "Moldova", label: "مولدوفا" },
      { value: "Monaco", label: "موناكو" },
      { value: "Mongolia", label: "منغوليا" },
      { value: "Montenegro", label: "الجبل الأسود" },
      { value: "Morocco", label: "المغرب" },
      { value: "Mozambique", label: "موزمبيق" },
      { value: "Myanmar", label: "ميانمار" },
      { value: "Namibia", label: "ناميبيا" },
      { value: "Nauru", label: "ناورو" },
      { value: "Nepal", label: "نيبال" },
      { value: "Netherlands", label: "هولندا" },
      { value: "New Zealand", label: "نيوزيلندا" },
      { value: "Nicaragua", label: "نيكاراغوا" },
      { value: "Niger", label: "النيجر" },
      { value: "Nigeria", label: "نيجيريا" },
      { value: "North Macedonia", label: "مقدونيا الشمالية" },
      { value: "Norway", label: "النرويج" },
      { value: "Oman", label: "عمان" },
      { value: "Pakistan", label: "باكستان" },
      { value: "Palau", label: "بالاو" },
      { value: "Palestine", label: "فلسطين" },
      { value: "Panama", label: "بنما" },
      { value: "Papua New Guinea", label: "بابوا غينيا الجديدة" },
      { value: "Paraguay", label: "باراغواي" },
      { value: "Peru", label: "بيرو" },
      { value: "Philippines", label: "الفلبين" },
      { value: "Poland", label: "بولندا" },
      { value: "Portugal", label: "البرتغال" },
      { value: "Qatar", label: "قطر" },
      { value: "Romania", label: "رومانيا" },
      { value: "Russia", label: "روسيا" },
      { value: "Rwanda", label: "رواندا" },
      { value: "Saint Kitts and Nevis", label: "سانت كيتس ونيفيس" },
      { value: "Saint Lucia", label: "سانت لوسيا" },
      { value: "Saint Vincent and the Grenadines", label: "سانت فنسنت وجزر غرينادين" },
      { value: "Samoa", label: "ساموا" },
      { value: "San Marino", label: "سان مارينو" },
      { value: "Sao Tome and Principe", label: "ساو تومي وبرينسيبي" },
      { value: "Saudi Arabia", label: "المملكة العربية السعودية" },
      { value: "Senegal", label: "السنغال" },
      { value: "Serbia", label: "صربيا" },
      { value: "Seychelles", label: "سيشيل" },
      { value: "Sierra Leone", label: "سيراليون" },
      { value: "Singapore", label: "سنغافورة" },
      { value: "Slovakia", label: "سلوفاكيا" },
      { value: "Slovenia", label: "سلوفينيا" },
      { value: "Solomon Islands", label: "جزر سليمان" },
      { value: "Somalia", label: "الصومال" },
      { value: "South Africa", label: "جنوب أفريقيا" },
      { value: "South Sudan", label: "جنوب السودان" },
      { value: "Spain", label: "إسبانيا" },
      { value: "Sri Lanka", label: "سريلانكا" },
      { value: "Sudan", label: "السودان" },
      { value: "Suriname", label: "سورينام" },
      { value: "Sweden", label: "السويد" },
      { value: "Switzerland", label: "سويسرا" },
      { value: "Syria", label: "سوريا" },
      { value: "Taiwan", label: "تايوان" },
      { value: "Tajikistan", label: "طاجيكستان" },
      { value: "Tanzania", label: "تنزانيا" },
      { value: "Thailand", label: "تايلاند" },
      { value: "Togo", label: "توغو" },
      { value: "Tonga", label: "تونغا" },
      { value: "Trinidad and Tobago", label: "ترينيداد وتوباغو" },
      { value: "Tunisia", label: "تونس" },
      { value: "Turkey", label: "تركيا" },
      { value: "Turkmenistan", label: "تركمانستان" },
      { value: "Tuvalu", label: "توفالو" },
      { value: "Uganda", label: "أوغندا" },
      { value: "Ukraine", label: "أوكرانيا" },
      { value: "United Arab Emirates", label: "الإمارات العربية المتحدة" },
      { value: "United Kingdom", label: "المملكة المتحدة" },
      { value: "United States", label: "الولايات المتحدة" },
      { value: "Uruguay", label: "أوروغواي" },
      { value: "Uzbekistan", label: "أوزبكستان" },
      { value: "Vanuatu", label: "فانواتو" },
      { value: "Vatican City", label: "مدينة الفاتيكان" },
      { value: "Venezuela", label: "فنزويلا" },
      { value: "Vietnam", label: "فيتنام" },
      { value: "Yemen", label: "اليمن" },
      { value: "Zambia", label: "زامبيا" },
      { value: "Zimbabwe", label: "زيمبابوي" },
    ],
  };

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
            {countries[language].map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
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