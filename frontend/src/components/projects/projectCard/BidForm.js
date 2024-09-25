import React from "react";
import "./BidForm.css"; // Import the CSS file

const BidForm = ({ offer, handleChange, handleSubmit }) => {
  // Access the fee from environment variables
  const feePercentage = parseFloat(process.env.REACT_APP_FEE) || 0.1;

  // Calculate the fee (percentage of the amount)
  const fee = offer.amount ? (offer.amount * feePercentage).toFixed(2) : "0.00";

  return (
    <div className="bid-form">
      <h3>أضف عرضك الآن</h3>
      <form onSubmit={handleSubmit}>
        <label>مدة التسليم</label>
        <input
          type="number"
          name="duration"
          value={offer.duration}
          onChange={handleChange}
          placeholder="أيام"
          required
        />

        <label>قيمة العرض</label>
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
            <strong>+ العمولة :</strong> ${fee}
          </p>
        </div>

        <label>تفاصيل العرض</label>
        <textarea
          className="descr"
          name="description"
          value={offer.description}
          onChange={handleChange}
          placeholder="اكتب تفاصيل العرض هنا..."
          required
        ></textarea>

        <button type="submit">أضف عرضك</button>
      </form>
    </div>
  );
};

export default BidForm;
