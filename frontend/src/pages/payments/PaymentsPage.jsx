import React, { useContext } from 'react'; // Import useContext
import { LanguageContext } from "../../context/LanguageContext"; // Import the context
import './payments.css';
import { useSelector } from 'react-redux';

const PaymentsPage = () => {
  const { language } = useContext(LanguageContext);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="payments-container">
      <div className="payments-top-header">
        <h2>{language === "en" ? "Account Balance" : "رصيد الحساب"}</h2>
        <div className="cta-btns">
          <button className="bg-deepPurple text-white px-4 py-2 rounded-2xl flex items-center justify-center hover:bg-customBlue">{language === "en" ? "Request Withdrawal" : "طلب سحب"}</button>
          <a href="/checkout" className="bg-deepPurple text-white px-4 py-2 rounded-2xl flex items-center justify-center hover:bg-customBlue">{language === "en" ? "Add Balance" : "شحن الرصيد"}</a>
        </div>
      </div>
      <div className="payments-content">
        <div className="total-balance balance">
          <p>{language === "en" ? "Total Balance" : "رصيد حسابي"}</p>
          <h4>${user.balance}</h4>
        </div>
      </div>
    </div>
  );
}

export default PaymentsPage;
