const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Category } = require("../models/Category");
const Project = require("../models/projectModel");

// Full country translation map: Arabic to English
const arabicToEnglishCountryMap = {
  "أفغانستان": "Afghanistan",
  "ألبانيا": "Albania",
  "الجزائر": "Algeria",
  "أندورا": "Andorra",
  "أنغولا": "Angola",
  "الأرجنتين": "Argentina",
  "أرمينيا": "Armenia",
  "أستراليا": "Australia",
  "النمسا": "Austria",
  "أذربيجان": "Azerbaijan",
  "البحرين": "Bahrain",
  "بنغلاديش": "Bangladesh",
  "باربادوس": "Barbados",
  "بيلاروسيا": "Belarus",
  "بلجيكا": "Belgium",
  "بليز": "Belize",
  "بنين": "Benin",
  "بوتان": "Bhutan",
  "بوليفيا": "Bolivia",
  "البوسنة والهرسك": "Bosnia and Herzegovina",
  "بوتسوانا": "Botswana",
  "البرازيل": "Brazil",
  "بروناي": "Brunei",
  "بلغاريا": "Bulgaria",
  "بوركينا فاسو": "Burkina Faso",
  "بوروندي": "Burundi",
  "كمبوديا": "Cambodia",
  "الكاميرون": "Cameroon",
  "كندا": "Canada",
  "الرأس الأخضر": "Cape Verde",
  "تشاد": "Chad",
  "تشيلي": "Chile",
  "الصين": "China",
  "كولومبيا": "Colombia",
  "الكونغو": "Congo",
  "كوستاريكا": "Costa Rica",
  "كرواتيا": "Croatia",
  "كوبا": "Cuba",
  "قبرص": "Cyprus",
  "التشيك": "Czech Republic",
  "الدنمارك": "Denmark",
  "جيبوتي": "Djibouti",
  "دومينيكا": "Dominica",
  "جمهورية الدومينيكان": "Dominican Republic",
  "الإكوادور": "Ecuador",
  "مصر": "Egypt",
  "السلفادور": "El Salvador",
  "إستونيا": "Estonia",
  "إثيوبيا": "Ethiopia",
  "فيجي": "Fiji",
  "فنلندا": "Finland",
  "فرنسا": "France",
  "الغابون": "Gabon",
  "غامبيا": "Gambia",
  "جورجيا": "Georgia",
  "ألمانيا": "Germany",
  "غانا": "Ghana",
  "اليونان": "Greece",
  "غرينادا": "Grenada",
  "غواتيمالا": "Guatemala",
  "غينيا": "Guinea",
  "غينيا بيساو": "Guinea-Bissau",
  "غويانا": "Guyana",
  "هايتي": "Haiti",
  "هندوراس": "Honduras",
  "هنغاريا": "Hungary",
  "آيسلندا": "Iceland",
  "الهند": "India",
  "إندونيسيا": "Indonesia",
  "إيران": "Iran",
  "العراق": "Iraq",
  "أيرلندا": "Ireland",
  "إسرائيل": "Israel",
  "إيطاليا": "Italy",
  "ساحل العاج": "Ivory Coast",
  "جامايكا": "Jamaica",
  "اليابان": "Japan",
  "الأردن": "Jordan",
  "كازاخستان": "Kazakhstan",
  "كينيا": "Kenya",
  "كيريباتي": "Kiribati",
  "كوريا الشمالية": "North Korea",
  "كوريا الجنوبية": "South Korea",
  "الكويت": "Kuwait",
  "قيرغيزستان": "Kyrgyzstan",
  "لاوس": "Laos",
  "لاتفيا": "Latvia",
  "لبنان": "Lebanon",
  "ليسوتو": "Lesotho",
  "ليبيريا": "Liberia",
  "ليبيا": "Libya",
  "ليختنشتاين": "Liechtenstein",
  "ليتوانيا": "Lithuania",
  "لوكسمبورغ": "Luxembourg",
  "مدغشقر": "Madagascar",
  "مالاوي": "Malawi",
  "ماليزيا": "Malaysia",
  "جزر المالديف": "Maldives",
  "مالي": "Mali",
  "مالطا": "Malta",
  "جزر مارشال": "Marshall Islands",
  "موريتانيا": "Mauritania",
  "موريشيوس": "Mauritius",
  "المكسيك": "Mexico",
  "ميكرونيزيا": "Micronesia",
  "مولدوفا": "Moldova",
  "موناكو": "Monaco",
  "منغوليا": "Mongolia",
  "الجبل الأسود": "Montenegro",
  "المغرب": "Morocco",
  "موزمبيق": "Mozambique",
  "ميانمار": "Myanmar",
  "ناميبيا": "Namibia",
  "ناورو": "Nauru",
  "نيبال": "Nepal",
  "هولندا": "Netherlands",
  "نيوزيلندا": "New Zealand",
  "نيكاراغوا": "Nicaragua",
  "النيجر": "Niger",
  "نيجيريا": "Nigeria",
  "النرويج": "Norway",
  "عمان": "Oman",
  "باكستان": "Pakistan",
  "بالاو": "Palau",
  "بنما": "Panama",
  "بابوا غينيا الجديدة": "Papua New Guinea",
  "باراغواي": "Paraguay",
  "بيرو": "Peru",
  "الفلبين": "Philippines",
  "بولندا": "Poland",
  "البرتغال": "Portugal",
  "قطر": "Qatar",
  "رومانيا": "Romania",
  "روسيا": "Russia",
  "رواندا": "Rwanda",
  "سانت كيتس ونيفيس": "Saint Kitts and Nevis",
  "سانت لوسيا": "Saint Lucia",
  "سانت فنسنت والغرينادين": "Saint Vincent and the Grenadines",
  "ساموا": "Samoa",
  "سان مارينو": "San Marino",
  "ساو تومي وبرينسيبي": "Sao Tome and Principe",
  "السعودية": "Saudi Arabia",
  "السنغال": "Senegal",
  "صربيا": "Serbia",
  "سيشيل": "Seychelles",
  "سيراليون": "Sierra Leone",
  "سنغافورة": "Singapore",
  "سلوفاكيا": "Slovakia",
  "سلوفينيا": "Slovenia",
  "جزر سليمان": "Solomon Islands",
  "الصومال": "Somalia",
  "جنوب أفريقيا": "South Africa",
  "إسبانيا": "Spain",
  "سريلانكا": "Sri Lanka",
  "السودان": "Sudan",
  "سورينام": "Suriname",
  "إسواتيني": "Eswatini",
  "السويد": "Sweden",
  "سويسرا": "Switzerland",
  "سوريا": "Syria",
  "تايوان": "Taiwan",
  "طاجيكستان": "Tajikistan",
  "تنزانيا": "Tanzania",
  "تايلاند": "Thailand",
  "تيمور الشرقية": "Timor-Leste",
  "توغو": "Togo",
  "تونغا": "Tonga",
  "ترينيداد وتوباغو": "Trinidad and Tobago",
  "تونس": "Tunisia",
  "تركيا": "Turkey",
  "تركمانستان": "Turkmenistan",
  "توفالو": "Tuvalu",
  "أوغندا": "Uganda",
  "أوكرانيا": "Ukraine",
  "الإمارات": "United Arab Emirates",
  "المملكة المتحدة": "United Kingdom",
  "الولايات المتحدة": "United States",
  "أوروغواي": "Uruguay",
  "أوزبكستان": "Uzbekistan",
  "فانواتو": "Vanuatu",
  "فنزويلا": "Venezuela",
  "فيتنام": "Vietnam",
  "اليمن": "Yemen",
  "زامبيا": "Zambia",
  "زيمبابوي": "Zimbabwe",
};

// Search endpoint
router.get("/", async (req, res) => {
  try {
    let { q } = req.query; // Query parameter q for search term

    // If q is in Arabic, translate it to English for country search
    if (arabicToEnglishCountryMap[q]) {
      q = arabicToEnglishCountryMap[q];
    }

    // Search across different collections/models
    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } }, // Case-insensitive username search
        { country: { $regex: q, $options: "i" } }, // Case-insensitive country search
      ],
    }).limit(10);

    const posts = await Post.find({
      title: { $regex: q, $options: "i" },
    }).limit(10); // Case-insensitive title search

    const categories = await Category.find({
      title: { $regex: q, $options: "i" },
    }).limit(10); // Case-insensitive category title search

    const projects = await Project.find({
      title: { $regex: q, $options: "i" },
    }).limit(10); // Case-insensitive project title search

    const results = {
      users,
      posts,
      categories,
      projects,
    };

    res.json(results);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
