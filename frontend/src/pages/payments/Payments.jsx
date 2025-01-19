import React, { useState } from 'react';
import PayPalButton from './PayPalButton';

const Payments = () => {
  const [amount, setAmount] = useState(10); 

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
console.log(amount)
  return (
    <div className="payments-container">
      <div className="amount-input-container">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />
      </div>
      <div className="paypal-button-container">
        <PayPalButton amount={amount} currency="USD" />
        
      </div>
    </div>
  );
};

export default Payments;