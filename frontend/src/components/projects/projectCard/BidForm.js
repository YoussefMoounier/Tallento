import React, { useContext } from "react"; // Import useContext
import { LanguageContext } from "../../../context/LanguageContext"; // Import the context
import "./BidForm.css"; // Import the CSS file

const BidForm = ({ offer, handleChange, handleSubmit }) => {
  // Access the fee from environment variables
  const feePercentage = parseFloat(process.env.REACT_APP_FEE) || 0.1;

  // Calculate the fee (percentage of the amount)
  const fee = offer.amount ? (offer.amount * feePercentage).toFixed(2) : "0.00";

  const { language } = useContext(LanguageContext); // Use context for language

  return (
    <div className="bid-form">
      <h3>{language === "en" ? "Submit Your Bid Now" : "أضف عرضك الآن"}</h3>
      <form onSubmit={handleSubmit}>
        <label>{language === "en" ? "Delivery Duration" : "مدة التسليم"}</label>
        <input
          type="number"
          name="duration"
          value={offer.duration}
          onChange={handleChange}
          placeholder={language === "en" ? "Days" : "أيام"}
          required
        />

        <label>{language === "en" ? "Bid Amount" : "قيمة العرض"}</label>
        <div className="amount-container">
          <input
            type="number"
            name="amount"
            value={offer.amount}
            onChange={handleChange}
            placeholder="$"
            required
          />
          <p className="fee-info">
            <strong>{language === "en" ? "Fee:" : "+ العمولة :"}</strong> ${fee}
          </p>
        </div>

        <label>{language === "en" ? "Bid Details" : "تفاصيل العرض"}</label>
        <textarea
          className="descr"
          name="description"
          value={offer.description}
          onChange={handleChange}
          placeholder={language === "en" ? "Write your bid details here..." : "اكتب تفاصيل العرض هنا..."}
          required
        ></textarea>

        <button type="submit">{language === "en" ? "Submit Your Bid" : "أضف عرضك"}</button>
      </form>
    </div>
  );
};

export default BidForm;
