import React from "react";
import { useSelector } from "react-redux";
import mic from "../assets/art.png"; // Ensure you have a microphone image
import "./FeaturedTalents.css"; // Import your updated CSS file

const FeaturedTalents = ({ categories }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="featured-talents-container flex items-center justify-center bg-gradient-to-b from-white via-white to-purple-500 h-screen relative">

      <div>

      <h1 className="text-8xl font-bold text-deepPurple mb-8"> <span className="text-gray-600">من </span>نحن..؟</h1>
      <p className="text-3xl text-gray-600 font-bold px-4">
      مرحبًا بك في تالينتو، منصتك الشاملة لاكتشاف المواهب وربطها بالفرص المناسبة!
نحن نؤمن بأن كل شخص يمتلك موهبة فريدة تستحق أن تُكتشف ويُحتفى بها. هنا في تالينتو، نُسهل عملية التواصل بين أصحاب المهارات والمواهب وبين الأشخاص أو الشركات الباحثة عنها.
إذا كنت تمتلك موهبة، يمكنك تسجيل حسابك على تالينتو ونشر أعمالك وتعريف الآخرين بما تُتقنه. وإذا كنت تبحث عن موهبة معينة، سواء كان ذلك موسيقيًا، فنانًا، مصورًا، أو أي مهارة أخرى، يمكنك نشر طلبك بسهولة وسيقوم أصحاب المواهب بمراسلتك مباشرة عبر المنصة.
      </p>
      </div>
      {/* Decorative elements */}
      <img src={mic} alt="Microphone" className="w-1/3 mb-4 " />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 text-4xl text-gray-300">♪</div>
        <div className="absolute top-1/3 right-1/4 text-4xl text-gray-300">♫</div>
      </div>
    </div>
  );
};

export default FeaturedTalents;
