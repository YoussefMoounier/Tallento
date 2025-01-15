import { FaFacebook, FaInstagram, FaPlusCircle } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext"; // Import the context
import { PostCard } from "../components/posts/post-card";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import React, { useContext, useRef, useEffect } from "react"; // Import useContext
import { TbSettingsCheck } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import mic from "../assets/overlay.png";
import logo from "../assets/logo.jpg";
import { fetchProjects } from "../redux/slices/projectSlice";
import { Link } from "react-router-dom";

const CombinedSection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { language } = useContext(LanguageContext); // Use context for language
  const scrollRef = useRef(null);
  const { projects, loading } = useSelector((state) => state.project);


  useEffect(() => {
    dispatch(fetchProjects()); // Fetch projects when the component mounts
  }, [dispatch]);

  const handleDragStart = (e) => {
    e.preventDefault();
    const startX = e.pageX - scrollRef.current.offsetLeft;
    const scrollLeft = scrollRef.current.scrollLeft;

    const handleMouseMove = (e) => {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the scroll speed
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      scrollRef.current.removeEventListener("mousemove", handleMouseMove);
      scrollRef.current.removeEventListener("mouseup", handleMouseUp);
    };

    scrollRef.current.addEventListener("mousemove", handleMouseMove);
    scrollRef.current.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <main className="flex flex-col h-full">
      <section className="combined-section bg-gradient-to-b from-purple-500 to customPink py-44 h-screen">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deepPurple">
            {language === "en" ? "Some Projects" : "بعض المشاريع"}
          </h1>
        </div>

        {/* Project Cards Section */}
        <div
          className="flex overflow-x-auto gap-6 px-4 hide-scrollbar max-w-full"
          ref={scrollRef}
          onMouseDown={handleDragStart}
        >
          {loading ? (
            <p>Loading...</p> // Show loading state
          ) : (
            projects?.map((project) => (
              <div className="flex-none" key={project.id}>
                {/* Ensure to use a unique key */}
                <Link to={`/project/${project.id}`}>
                  {" "}
                  {/* Navigate to project page */}
                  <PostCard project={project} />{" "}
                  {/* Pass project data to PostCard */}
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Registration Button */}
        <div className="text-center mt-8">
          <a
            href="/register"
            className="bg-deepPurple text-white py-2 px-4 rounded"
          >
            {language === "en" ? "Register Now" : "سجل الان"}
          </a>
        </div>
      </section>

      {/* New Section */}
      <section className="text-center bg-customPink py-10 h-[700px] relative items-center justify-center gap-10">
        <h2 className="text-3xl font-bold text-deepPurple mb-4">
          {language === "en"
            ? "What Your Journey Looks Like With Us"
            : "كيف تبدو رحلتك معنا"}
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10 mt-28">
          <div className="bg-white p-4 shadow-lg mb-4 shadow-deepPurple h-48 rounded-2xl items-center justify-center flex flex-col gap-8">
            <h3 className="font-semibold text-2xl text-gray-600">
              {language === "en"
                ? "Show/Search for Talent"
                : "اظهر/ابحث عن موهبة"}
            </h3>
            <p className="text-gray-500 w-2/3">
              {language === "en"
                ? "Search for talent or showcase your own"
                : "قم بالبحث عن الموهبة او اظهر مواهبك"}
            </p>
          </div>
          <div className="bg-white p-4 shadow-lg mb-4 shadow-deepPurple h-48 rounded-2xl items-center justify-center flex flex-col gap-8">
            <h3 className="font-semibold text-2xl text-gray-600">
              {language === "en" ? "Register on the Platform" : "سجل في المنصة"}
            </h3>
            <p className="text-gray-500 w-2/3">
              {language === "en"
                ? "Whether you're looking for talent or you are the talent"
                : "سواء كنت تبحث عن موهبة او انت الموهبة"}
            </p>
          </div>
        </div>
        <a
          href="/register"
          className="bg-deepPurple text-white py-2 px-4 rounded"
        >
          {language === "en" ? "Register Now" : "سجل الان"}
        </a>
        <img
          src={mic}
          alt={language === "en" ? "Create Account" : "إنشاء حساب"}
          className="mb-1 absolute top-0 z-0"
        />
      </section>

      {/* Features Section */}
      <section className="text-center bg-customPink py-10 h-auto mb-8">
        <h2 className="text-3xl font-bold text-deepPurple mb-4">
          {language === "en" ? "Talento Features" : "مزايا تالينتو"}
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-6">
          <div className="p-4 w-full sm:w-1/4 items-center flex flex-col mb-4 shadow-deepPurple">
            <span className="text-6xl mb-2">
              <RiLoginCircleFill />
            </span>
            <h3 className="font-semibold">
              {language === "en" ? "Quick Registration" : "تسجيل سريع"}
            </h3>
            <p>
              {language === "en"
                ? "You can register on the platform quickly."
                : "يمكنك التسجيل في المنصة بشكل سريع."}
            </p>
          </div>
          <div className="p-4 w-full sm:w-1/4 items-center flex flex-col mb-4 shadow-deepPurple">
            <span className="text-6xl mb-2">
              <TbSettingsCheck />
            </span>
            <h3 className="font-semibold">
              {language === "en" ? "Ease of Use" : "سهولة التعامل"}
            </h3>
            <p>
              {language === "en"
                ? "A smooth and comfortable user experience."
                : "تجربة مستخدم سلسة ومريحة."}
            </p>
          </div>
          <div className="p-4 w-full sm:w-1/4 items-center flex flex-col mb-4 shadow-deepPurple">
            <span className="text-6xl mb-2">
              <MdOutlineSupportAgent />
            </span>
            <h3 className="font-semibold">
              {language === "en" ? "Technical Support" : "دعم فني"}
            </h3>
            <p>
              {language === "en"
                ? "You can easily contact us if you have any inquiries."
                : "يمكنك التواصل معنا بكل سهولة في حال وجود أي استفسار."}
            </p>
          </div>
        </div>
        <a
          href="mailto:tallentos9@gmail.com"
          className="text-xl font-bold text-white p-2 mx-auto rounded-lg bg-deepPurple"
        >
          tallentos9@gmail.com
        </a>
      </section>

      {/* FAQ Section */}
      <section className="bg-customPink mt-10">
        <h2 className="text-center text-3xl font-bold text-deepPurple mb-6">
          {language === "en" ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
          <div className="p-4 rounded mb-4">
            <h3 className="font-semibold bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              {language === "en"
                ? "Are my funds and rights protected when using Talento?"
                : "هل أموالي وحقوقي محفوظة عند استخدام تالينتو؟"}
              <FaPlusCircle className="inline text-[#cfa93a] h-6 w-6 mr-3" />
            </h3>
            <p className="bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              {language === "en"
                ? "Yes, at Talento we guarantee complete security. Financial transactions are handled through secure payment methods, with a rating and review system that ensures credibility between parties. Our support team is ready to intervene and resolve any issues to ensure your rights and protect you from fraud."
                : "نعم، في تالينتو نضمن لك الأمان الكامل. يتم التعاملات المالية عبر وسائل دفع آمنة، مع نظام تقييم ومراجعات يضمن المصداقية بين الأطراف. فريق الدعم لدينا مستعد للتدخل وحل أي مشكلةة لضمان حقوقك وعدم تعرضك لأي عملية نصب."}
            </p>
          </div>
          <div className="p-4 rounded mb-4">
            <h3 className="font-semibold bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              {language === "en"
                ? "How do I search for a specific talent?"
                : "كيف أبحث عن موهبة معينة؟"}
              <FaPlusCircle className="inline text-[#cfa93a] h-6 w-6 mr-3" />
            </h3>
            <p className="bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              {language === "en"
                ? "Post your request with the talent's details and they will respond with offers."
                : "قم بنشر طلبك مع تفاصيل الموهبة وسيتمكن أصحاب المواهب من الرد عليك بعروضهم."}
            </p>
          </div>
          <div className="p-4 rounded mb-4">
            <h3 className="font-semibold bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              {language === "en"
                ? "Can I interact with the other party outside of Talento?"
                : "هل يمكنني التعامل مع الطرف الآخر خارج منصة تالينتو؟"}
              <FaPlusCircle className="inline text-[#cfa93a] h-6 w-6 mr-3" />
            </h3>
            <p className="bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              {language === "en"
                ? "To ensure your security and protect your rights, any transactions outside of the platform are strictly prohibited. Any agreement made outside the platform will result in the permanent ban of your account."
                : "لضمان أمانك وحفظ حقوق جميع المستخدمين، يُمنع تمامًا إجراء أي تعاملات خارج منصة تالينتو. أي اتفاق يتم خارج المنصة يعرضك لمخاطر فقدان الحقوق، وسيؤدي ذلك إلى حظر حسابك بشكل نهائي. نحن نوفر نظامًا آمنًا للتواصل والدفع لضمان تجربة موثوقة للطرفين."}
            </p>
          </div>
          <div className="p-4 rounded mb-4">
            <h3 className="font-semibold bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              {language === "en"
                ? "How are payments made and used?"
                : "كيف يتم الدفع واستخدام الأموال؟"}
              <FaPlusCircle className="inline text-[#cfa93a] h-6 w-6 mr-3" />
            </h3>
            <p className="bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              {language === "en"
                ? "Payments are made through secure methods such as digital wallets or bank transfers, and we advise against using any payment methods outside the platform to ensure your rights."
                : "يتم الدفع عبر طرق آمنة مثل المحافظ الرقمية أو التحويل البنكي، ونوصي بعدم استخدام أي وسيلة دفع خارج النظام لضمان حقوقك."}
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-deepPurple text-white py-6 mt-4">
        <div className="flex flex-col items-center gap-4">
          <span>{language === "en" ? "Follow Talento" : "تابع Tallento"}</span>
          <div className="flex gap-2">
            <a href="#" className="hover:text-white text-2xl">
              <FaFacebook className="text-[#CFA93A]" />
            </a>
            <a href="#" className="hover:text-white text-2xl">
              <FaInstagram className="text-[#CFA93A]" />
            </a>
          </div>
        </div>

        <div className="w-3/4 mx-auto border-b border-[#CFA93A] mb-6"></div>
        <div className="flex flex-col items-center">
          <div className="text-center flex flex-col items-center gap-4">
            <div className="flex flex-col items-center w-full">
              <img
                src={logo}
                alt={language === "en" ? "Showing Talent Logo" : "شعار تالينتو"}
                className="h-8 w-8 rounded-full"
              />
              <p className="text-center">
                {language === "en"
                  ? "Talento - Your first destination to discover talents and build bridges of communication between creators and opportunity owners. We work to empower every talent and achieve excellence through a safe and reliable environment that combines creativity and professionalism."
                  : "تالينتو - وجهتك الأولى لاكتشاف المواهب، وبناء جسور التواصل بين المبدعين وأصحاب الفرص. نعمل على تمكين كل موهبة وتحقيق التميز من خلال بيئة آمنة وموثوقة تجمع بين الإبداع والاحترافية"}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <b>{language === "en" ? "Important Links" : "روابط تهمك"}</b>
              <a href="/about" className="text-white">
                {language === "en" ? "About Us" : "من نحن"}
              </a>
              <a href="/contact" className="text-white">
                {language === "en" ? "Contact Us" : "تواصل معنا"}
              </a>
              <a href="/join" className="text-white">
                {language === "en" ? "Join Us" : "انضم الينا"}
              </a>
            </div>
            <p className="text-center w-full">
              ©{" "}
              {language === "en"
                ? "All rights reserved: Tallento ltd"
                : "جميع الحقوق محفوظة: Tallento ltd"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CombinedSection;
