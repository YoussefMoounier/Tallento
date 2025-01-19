import React, { useState } from 'react';
import PayPalButton from './PayPalButton';
import { toast } from 'react-toastify';

const Payments = () => {
  const [amount, setAmount] = useState(10);

  // Add the handleAmountChange function here
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value <= 0) {
      toast.error("Please enter a valid positive amount");
      return;
    }
    setAmount(value);
  };

  return (
    <div className="payments-container">
      <div className="amount-input-container">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange} // Attach it here
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
