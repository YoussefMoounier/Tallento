import React from 'react'
import './payments.css'

const PaymentsPage = () => {
  return (
    <div className="payments-container">
      <div className="payments-top-header">
        <h2>رصيد الحساب</h2>
        <div className="cta-btns">
          <button className="get-money">طلب سحب</button>
          <button className="add-money">شحن الرصيد</button>
        </div>
      </div>
      <div className="payments-content">
        <div className="total-balance balance">
          <p>الرصيد الكلي</p>
          <h4>$0.00</h4>
        </div>
        <div className="total-balance balance">
          <p>الرصيد المعلق</p>
          <h4>$0.00</h4>
        </div>
        <div className="total-balance balance">
          <p>الرصيد المتاح</p>
          <h4>$0.00</h4>
        </div>
        <div className="total-balance balance">
          <p>الرصيد القابل للسحب</p>
          <h4>$0.00</h4>
        </div>
      </div>
    </div>
  );
}

export default PaymentsPage