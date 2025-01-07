import { LanguageContext } from "../context/LanguageContext"; // Import the context
import React, { useContext, useRef } from "react"; // Import useContext
import { PostCard } from "../components/posts/post-card";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TbSettingsCheck } from "react-icons/tb";
import { useSelector } from "react-redux";
import mic from "../assets/overlay.png";
import logo from "../assets/logo.jpg";
import { RiLoginCircleFill } from "react-icons/ri";

import { FaFacebook, FaInstagram, FaPlusCircle } from "react-icons/fa";

const CombinedSection = () => {
  const { user } = useSelector((state) => state.auth);
  const { language } = useContext(LanguageContext); // Use context for language
  const scrollRef = useRef(null);

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
    <main>
      <section className="combined-section bg-gradient-to-b from-purple-500 to customPink py-44 h-screen ">
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
          <div className="flex-none">
            <PostCard />
          </div>
          <div className="flex-none">
            <PostCard />
          </div>
          <div className="flex-none">
            <PostCard />
          </div>
          <div className="flex-none">
            <PostCard />
          </div>
          <div className="flex-none">
            <PostCard />
          </div>
          <div className="flex-none">
            <PostCard />
          </div>
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
          كيف تبدو رحلتك معنا
        </h2>
        <div className="flex justify-center gap-8 mb-10 mt-28">
          <div className="bg-white p-4 shadow-lg mb-4 shadow-deepPurple h-48 rounded-2xl items-center justify-center flex flex-col gap-8">
            <h3 className="font-semibold text-2xl text-gray-600">
              اظهر/ابحث عن موهبة
            </h3>
            <p className="text-gray-500 w-2/3">
              قم بالبحث عن الموهبة او اظهر مواهبك
            </p>
          </div>
          <div className="bg-white p-4 shadow-lg mb-4 shadow-deepPurple h-48 rounded-2xl items-center justify-center flex flex-col gap-8">
            <h3 className="font-semibold text-2xl text-gray-600">
              سجل في المنصة
            </h3>
            <p className="text-gray-500  w-2/3">
              سواء كنت تبحث عن موهبة او انت الموهبة
            </p>
          </div>
        </div>
        <a
          href="/register"
          className="bg-deepPurple text-white py-2 px-4 rounded"
        >
          سجل الان
        </a>
        <img
          src={mic}
          alt="Create Account"
          className="mb-1 absolute top-0 z-0"
        />
      </section>

      {/* Features Section */}
      <section className="text-center bg-customPink py-10 h-[500px]">
        <h2 className="text-3xl font-bold text-deepPurple mb-4">
          مزايا تالينتو
        </h2>
        <div className="flex justify-center gap-8 mb-6">
          <div className=" p-4 w-1/4 items-center flex flex-col mb-4 shadow-deepPurple">
            <span className="text-6xl mb-2">
              <RiLoginCircleFill />
            </span>
            <h3 className="font-semibold">تسجيل سريع</h3>
            <p>يمكنك التسجيل في المنصة بشكل سريع.</p>
          </div>
          <div className=" p-4 w-1/4 items-center flex flex-col mb-4 shadow-deepPurple">
            <span className="text-6xl mb-2">
              <TbSettingsCheck />
            </span>
            <h3 className="font-semibold">سهولة التعامل</h3>
            <p>تجربة مستخدم سلسة ومريحة.</p>
          </div>
          <div className=" p-4 w-1/4 items-center flex flex-col mb-4 shadow-deepPurple">
            <span className="text-6xl mb-2">
              <MdOutlineSupportAgent />
            </span>
            <h3 className="font-semibold">دعم فني</h3>
            <p>يمكنك التواصل معنا بكل سهولة في حال وجود أي استفسار.</p>
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
      <section className="bg-customPink py-10">
        <h2 className="text-center text-3xl font-bold text-deepPurple mb-6">
          الأسئلة الشائعة
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
          
          <div className="p-4 rounded mb-4">
            <h3 className="font-semibold bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              هل أموالي وحقوقي محفوظة عند استخدام تالينتو؟
              <FaPlusCircle className="inline text-[#cfa93a] h-6 w-6 mr-3" />
            </h3>
            <p className="bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              نعم، في تالينتو نضمن لك الأمان الكامل. يتم التعاملات المالية عبر
              وسائل دفع آمنة، مع نظام تقييم ومراجعات يضمن المصداقية بين الأطراف.
              فريق الدعم لدينا مستعد للتدخل وحل أي مشكلة لضمان حقوقك وعدم تعرضك
              لأي عملية نصب.
            </p>
          </div>
          <div className="p-4 rounded mb-4">
            <h3 className="font-semibold bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              كيف أبحث عن موهبة معينة؟
              <FaPlusCircle className="inline text-[#cfa93a] h-6 w-6 mr-3" />
            </h3>
            <p className="bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              قم بنشر طلبك مع تفاصيل الموهبة المطلوبة وسيتمكن أصحاب المواهب من
              الرد عليك بعروضهم.
            </p>
          </div>
          <div className="p-4 rounded mb-4">
            <h3 className="font-semibold bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              هل يمكنني التعامل مع الطرف الآخر خارج منصة تالينتو؟
              <FaPlusCircle className="inline text-[#cfa93a] h-6 w-6 mr-3" />
            </h3>
            <p className="bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              لضمان أمانك وحفظ حقوق جميع المستخدمين، يُمنع تمامًا إجراء أي
              تعاملات خارج منصة تالينتو. أي اتفاق يتم خارج المنصة يعرضك لمخاطر
              فقدان الحقوق، وسيؤدي ذلك إلى حظر حسابك بشكل نهائي. نحن نوفر نظامًا
              آمنًا للتواصل والدفع لضمان تجربة موثوقة للطرفين.
            </p>
          </div>
          <div className="p-4 rounded mb-4">
            <h3 className="font-semibold bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              كيف يتم الدفع واستخدام الأموال؟
              <FaPlusCircle className="inline text-[#cfa93a] h-6 w-6 mr-3" />
            </h3>
            <p className="bg-deepPurple rounded-lg text-white p-1 text-center mb-1">
              يتم الدفع عبر طرق آمنة مثل المحافظ الرقمية أو التحويل البنكي،
              ونوصي بعدم استخدام أي وسيلة دفع خارج النظام لضمان حقوقك.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-deepPurple text-white py-6">
        <div className="flex justify-center items-center gap-2 mb-6">
          <span>تابع Tallento</span>
          <a href="#" className="hover:text-white text-2xl">
            <FaFacebook className="text-[#CFA93A]" />
          </a>
          <a href="#" className="hover:text-white text-2xl">
            <FaInstagram className="text-[#CFA93A]" />
          </a>
        </div>

        <div className="w-3/4 mx-auto border-b border-[#CFA93A] mb-6"></div>
        <div>
          <div className="text-center flex mx-auto items-center justify-center gap-8">
            <div className="flex flex-col items-center w-1/4">
              <img
                src={logo}
                alt="Showing Talent Logo"
                className="h-8 w-8 rounded-full"
              />
              <p>
                تالينتو - وجهتك الأولى لاكتشاف المواهب، وبناء جسور التواصل بين
                المبدعين وأصحاب الفرص. نعمل على تمكين كل موهبة وتحقيق التميز من
                خلال بيئة آمنة وموثوقة تجمع بين الإبداع والاحترافية
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <b>روابط تهمك</b>
              <a href="/about" className="text-white">
                من نحن
              </a>
              <a href="/contact" className="text-white">
                تواصل معنا
              </a>
              <a href="/join" className="text-white">
                انضم الينا
              </a>
            </div>
            <p className="text-center w-1/3">
              © جميع الحقوق محفوظة: Tallento ltd
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default CombinedSection;
