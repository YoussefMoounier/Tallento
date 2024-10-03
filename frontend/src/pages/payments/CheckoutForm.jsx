import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import request from "../../utils/request";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./PaymentForm.css"

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !isReady) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://www.tallento.ae/payment-complete",
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        onReady={() => setIsReady(true)}
      />
      <button
        disabled={isLoading || !stripe || !elements || !isReady}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

const CheckoutForm = () => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null);

  const { offerAmount } = location.state || {};

  useEffect(() => {
    const fetchPublishableKey = async () => {
      try {
        const response = await request.get("/config");
        const publishableKey = response.data.publishableKey;
        setStripePromise(loadStripe(publishableKey));
      } catch (error) {
        console.error("Error fetching publishable key:", error);
        setError("Failed to fetch payment configuration.");
      }
    };

    fetchPublishableKey();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!offerAmount) return;

      try {
        const response = await request.post(
          "/create-payment-intent",
          { amount: offerAmount, currency: "usd" },
          { headers: { "Content-Type": "application/json" } }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setError("Failed to initialize payment.");
      }
    };

    fetchClientSecret();
  }, [offerAmount]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutForm;
