import React, { useContext } from "react"; // Import useContext
import { LanguageContext } from "../../../context/LanguageContext"; // Import the context
import "./BidForm.css"; // Import the CSS file

const BidForm = ({ offer, handleChange, handleSubmit }) => {
  // Access the fee from environment variables
  const feePercentage = parseFloat(process.env.REACT_APP_FEE) || 0.1;

  // Calculate the fee (percentage of the amount)
  const fee = offer.amount ? (offer.amount * feePercentage).toFixed(2) : "0.00";

  const { language } = useContext(LanguageContext); // Use context for language

  // Common input class
  const inputClass = "mb-4 border-secodColor border-2 rounded-2xl p-2";

  return (
    <div className="bg-white rounded-2xl p-4 mt-6 w-full">
      <h3 className="font-bold mb-4">
        {language === "en" ? "Submit Your Bid Now" : "أضف عرضك الآن"}
      </h3>
      <form onSubmit={handleSubmit} className="flex md:flex-row flex-col">
        <div className="md:w-1/2 flex flex-col p-6">
          <label>
            {language === "en" ? "Delivery Duration" : "مدة التسليم"}
          </label>
          <input
            type="number"
            name="duration"
            value={offer.duration}
            onChange={handleChange}
            placeholder={language === "en" ? "Days" : "أيام"}
            required
            className={inputClass}
          />

          <label>{language === "en" ? "Bid Amount" : "قيمة العرض"}</label>
          <div className="">
            <input
              type="number"
              name="amount"
              value={offer.amount}
              onChange={handleChange}
              placeholder="$"
              required
              className={inputClass}
            />
            <p className="text-deepPurple">
              <strong className="text-black">
                {language === "en" ? "Fee:" : "+ عمولة الموقع :"}
              </strong>{" "}
              ${fee}
            </p>
          </div>
          <button type="submit" className="bg-secodColor rounded-2xl px-4 py-1 text-white mt-8">
            {language === "en" ? "Submit Your Bid" : "أضف عرضك"}
          </button>
        </div>

        <div className="md:w-1/2 flex flex-col p-6">
          <label>{language === "en" ? "Bid Details" : "تفاصيل العرض"}</label>
          <textarea
            className="descr"
            name="description"
            value={offer.description}
            onChange={handleChange}
            placeholder={
              language === "en"
                ? "Write your bid details here..."
                : "اكتب تفاصيل العرض هنا..."
            }
            required
          ></textarea>

         
        </div>
      </form>
    </div>
  );
};

export default BidForm;
