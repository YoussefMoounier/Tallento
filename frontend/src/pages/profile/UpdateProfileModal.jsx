import { useState } from "react";
import "./update-profile.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";

const UpdateProfileModal = ({ setUpdateProfile, profile }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(profile.username || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState(profile.phone || "");
  const [birthday, setBirthday] = useState(
    profile.birthday
      ? new Date(profile.birthday).toISOString().substring(0, 10)
      : ""
  );
  const [gender, setGender] = useState(profile.gender || "");
  const [hasBeard, setHasBeard] = useState(profile.hasBeard || false);
  const [wearsHijab, setWearsHijab] = useState(profile.wearsHijab || false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = {
      username,
      bio,
      phone,
      country,
      birthday,
      gender,
      hasBeard,
      wearsHijab,
      ...(password.trim() && { password }),
    };

    console.log("جاري تحديث البيانات:", updatedUser);

    dispatch(updateProfile(profile._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>

        <h1 className="update-profile-title">اكمل بياناتك الشخصية</h1>
<div className="group">
        <label htmlFor="birthday" className="form-label">
          الاسم
        </label>
        <input
          type="text"
          className="update-profile-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="اسم المستخدم"
        />
</div>
<div className="group">
<label htmlFor="country" className="form-label">
    <i className="fas fa-globe"></i> البلد
  </label>
  <select
    className="form-input"
    id="country"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
  >
    <option value="">اختر البلد</option>
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
    <option value="Ecuador">الإكوادور</option>
    <option value="Egypt">مصر</option>
    <option value="El Salvador">السلفادور</option>
    <option value="Equatorial Guinea">غينيا الاستوائية</option>
    <option value="Eritrea">إريتريا</option>
    <option value="Estonia">إستونيا</option>
    <option value="Eswatini">إسواتيني</option>
    <option value="Ethiopia">إثيوبيا</option>
    <option value="Fiji">فيجي</option>
    <option value="Finland">فنلندا</option>
    <option value="France">فرنسا</option>
    <option value="Gabon">الغابون</option>
    <option value="Gambia">غامبيا</option>
    <option value="Georgia">جورجيا</option>
    <option value="Germany">ألمانيا</option>
    <option value="Ghana">غانا</option>
    <option value="Greece">اليونان</option>
    <option value="Grenada">غرينادا</option>
    <option value="Guatemala">غواتيمالا</option>
    <option value="Guinea">غينيا</option>
    <option value="Guinea-Bissau">غينيا بيساو</option>
    <option value="Guyana">غيانا</option>
    <option value="Haiti">هايتي</option>
    <option value="Honduras">هندوراس</option>
    <option value="Hungary">المجر</option>
    <option value="Iceland">آيسلندا</option>
    <option value="India">الهند</option>
    <option value="Indonesia">إندونيسيا</option>
    <option value="Iran">إيران</option>
    <option value="Iraq">العراق</option>
    <option value="Ireland">أيرلندا</option>
    <option value="Israel">إسرائيل</option>
    <option value="Italy">إيطاليا</option>
    <option value="Jamaica">جامايكا</option>
    <option value="Japan">اليابان</option>
    <option value="Jordan">الأردن</option>
    <option value="Kazakhstan">كازاخستان</option>
    <option value="Kenya">كينيا</option>
    <option value="Kiribati">كيريباتي</option>
    <option value="Kuwait">الكويت</option>
    <option value="Kyrgyzstan">قيرغيزستان</option>
    <option value="Laos">لاوس</option>
    <option value="Latvia">لاتفيا</option>
    <option value="Lebanon">لبنان</option>
    <option value="Lesotho">ليسوتو</option>
    <option value="Liberia">ليبيريا</option>
    <option value="Libya">ليبيا</option>
    <option value="Liechtenstein">ليختنشتاين</option>
    <option value="Lithuania">ليتوانيا</option>
    <option value="Luxembourg">لوكسمبورغ</option>
    <option value="Madagascar">مدغشقر</option>
    <option value="Malawi">مالاوي</option>
    <option value="Malaysia">ماليزيا</option>
    <option value="Maldives">المالديف</option>
    <option value="Mali">مالي</option>
    <option value="Malta">مالطا</option>
    <option value="Mauritania">موريتانيا</option>
    <option value="Mauritius">موريشيوس</option>
    <option value="Mexico">المكسيك</option>
    <option value="Moldova">مولدوفا</option>
    <option value="Monaco">موناكو</option>
    <option value="Mongolia">منغوليا</option>
    <option value="Montenegro">الجبل الأسود</option>
    <option value="Morocco">المغرب</option>
    <option value="Mozambique">موزمبيق</option>
    <option value="Myanmar">ميانمار</option>
    <option value="Namibia">ناميبيا</option>
    <option value="Nauru">ناورو</option>
    <option value="Nepal">نيبال</option>
    <option value="Netherlands">هولندا</option>
    <option value="New Zealand">نيوزيلندا</option>
    <option value="Nicaragua">نيكاراغوا</option>
    <option value="Niger">النيجر</option>
    <option value="Nigeria">نيجيريا</option>
    <option value="North Korea">كوريا الشمالية</option>
    <option value="North Macedonia">مقدونيا الشمالية</option>
    <option value="Norway">النرويج</option>
    <option value="Oman">عمان</option>
    <option value="Pakistan">باكستان</option>
    <option value="Palau">بالاو</option>
    <option value="Panama">بنما</option>
    <option value="Papua New Guinea">بابوا غينيا الجديدة</option>
    <option value="Paraguay">باراغواي</option>
    <option value="Peru">بيرو</option>
    <option value="Philippines">الفلبين</option>
    <option value="Poland">بولندا</option>
    <option value="Portugal">البرتغال</option>
    <option value="Qatar">قطر</option>
    <option value="Romania">رومانيا</option>
    <option value="Russia">روسيا</option>
    <option value="Rwanda">رواندا</option>
    <option value="Saint Kitts and Nevis">سانت كيتس ونيفيس</option>
    <option value="Saint Lucia">سانت لوسيا</option>
    <option value="Saint Vincent and the Grenadines">
      سانت فنسنت والغرينادين
    </option>
    <option value="Samoa">ساموا</option>
    <option value="San Marino">سان مارينو</option>
    <option value="Sao Tome and Principe">ساو تومي وبرينسيبي</option>
    <option value="Saudi Arabia">السعودية</option>
    <option value="Senegal">السنغال</option>
    <option value="Serbia">صربيا</option>
    <option value="Seychelles">سيشل</option>
    <option value="Sierra Leone">سيراليون</option>
    <option value="Singapore">سنغافورة</option>
    <option value="Slovakia">سلوفاكيا</option>
    <option value="Slovenia">سلوفينيا</option>
    <option value="Solomon Islands">جزر سليمان</option>
    <option value="Somalia">الصومال</option>
    <option value="South Africa">جنوب أفريقيا</option>
    <option value="South Korea">كوريا الجنوبية</option>
    <option value="South Sudan">جنوب السودان</option>
    <option value="Spain">إسبانيا</option>
    <option value="Sri Lanka">سريلانكا</option>
    <option value="Sudan">السودان</option>
    <option value="Suriname">سورينام</option>
    <option value="Sweden">السويد</option>
    <option value="Switzerland">سويسرا</option>
    <option value="Syria">سوريا</option>
    <option value="Taiwan">تايوان</option>
    <option value="Tajikistan">طاجيكستان</option>
    <option value="Tanzania">تنزانيا</option>
    <option value="Thailand">تايلاند</option>
    <option value="Timor-Leste">تيمور الشرقية</option>
    <option value="Togo">توغو</option>
    <option value="Tonga">تونغا</option>
    <option value="Trinidad and Tobago">ترينيداد وتوباغو</option>
    <option value="Tunisia">تونس</option>
    <option value="Turkey">تركيا</option>
    <option value="Turkmenistan">تركمانستان</option>
    <option value="Tuvalu">توفالو</option>
    <option value="Uganda">أوغندا</option>
    <option value="Ukraine">أوكرانيا</option>
    <option value="United Arab Emirates">الإمارات</option>
    <option value="United Kingdom">المملكة المتحدة</option>
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
        <div className="group">
        <label htmlFor="birthday" className="form-label">
          المسمى الوظيفي
        </label>
        <input
          type="text"
          className="update-profile-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="اللقب الوظيفي"
        /></div>
        <div className="group">
        <label htmlFor="birthday" className="form-label">
          كلمة المرور
        </label>
        <input
          type="password"
          className="update-profile-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة السر"
        /></div>
        <div className="group">
        <label htmlFor="birthday" className="form-label">
          الهاتف
        </label>
        <input
          type="tel"
          className="update-profile-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="رقم الهاتف"
          maxLength={11}
        /></div>
        <div className="group">
        <label htmlFor="birthday" className="form-label">
          تاريخ الميلاد
        </label>
        <input
          type="date"
          className="update-profile-input"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        /></div>
        <div className="group">
        <label htmlFor="gender" className="form-label">
          النوع
        </label>
        <select
          id="gender"
          className="update-profile-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">اختر النوع</option>
          <option value="male">ذكر</option>
          <option value="female">أنثى</option>
        </select>
        </div>
        {gender === "male" && (
          <div>
            <label>
              هل لديك لحية؟
              <input
                type="checkbox"
                checked={hasBeard}
                onChange={(e) => setHasBeard(e.target.checked)}
              />
            </label>
          </div>
        )}
        {gender === "female" && (
          <div>
            <label>
              هل ترتدين الحجاب؟
              <input
                type="checkbox"
                checked={wearsHijab}
                onChange={(e) => setWearsHijab(e.target.checked)}
              />
            </label>
          </div>
        )}
        <button type="submit" className="update-profile-btn">
          حفظ البيانات
        </button>
      </form>
    </div>
  );
};


export default UpdateProfileModal;