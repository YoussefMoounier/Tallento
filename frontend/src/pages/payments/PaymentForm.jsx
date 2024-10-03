import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./PaymentForm.css";
import request from "../../utils/request";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: clientSecret } = await request.post(
        "/api/create-escrow-payment",
        { amount }
      );

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Customer Name",
          },
        },
      });

      if (paymentResult.error) {
        setMessage(`Payment failed: ${paymentResult.error.message}`);
      } else {
        setMessage("Payment succeeded!");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Payment Form</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <CardElement className="card-element" />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
      {message && <div className="message">{message}</div>}
    </form>
  );
};

export default PaymentForm;
