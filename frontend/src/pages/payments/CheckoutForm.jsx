import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, currency: "usd" }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setSuccess(true);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <label className="block mb-4">
        <span className="text-gray-700">Amount:</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </label>
      <div className="mb-4">
        <CardElement className="p-3 border border-gray-300 rounded-md" />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">Payment successful!</div>}
      <button
        type="submit"
        disabled={!stripe}
        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Pay
      </button>
    </form>
  );
};

const WrappedCheckoutForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default WrappedCheckoutForm;
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import request from "../../utils/request";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import "./PaymentForm.css"

// const PaymentForm = ({ clientSecret }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isReady, setIsReady] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements || !isReady) {
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: "https://www.tallento.ae/payment-complete",
//       },
//     });

//     if (error) {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <PaymentElement
//         id="payment-element"
//         options={paymentElementOptions}
//         onReady={() => setIsReady(true)}
//       />
//       <button
//         disabled={isLoading || !stripe || !elements || !isReady}
//         id="submit"
//       >
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//         </span>
//       </button>
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

// const CheckoutForm = () => {
//   const location = useLocation();
//   const [error, setError] = useState(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [stripePromise, setStripePromise] = useState(null);

//   const { offerAmount } = location.state || {};

//   useEffect(() => {
//     const fetchPublishableKey = async () => {
//       try {
//         const response = await request.get("/config");
//         const publishableKey = response.data.publishableKey;
//         setStripePromise(loadStripe(publishableKey));
//       } catch (error) {
//         console.error("Error fetching publishable key:", error);
//         setError("Failed to fetch payment configuration.");
//       }
//     };

//     fetchPublishableKey();
//   }, []);

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       if (!offerAmount) return;

//       try {
//         const response = await request.post(
//           "/create-payment-intent",
//           { amount: offerAmount, currency: "usd" },
//           { headers: { "Content-Type": "application/json" } }
//         );
//         setClientSecret(response.data.clientSecret);
//       } catch (error) {
//         console.error("Error fetching client secret:", error);
//         setError("Failed to initialize payment.");
//       }
//     };

//     fetchClientSecret();
//   }, [offerAmount]);

//   useEffect(() => {
//     console.log("offerAmount:", offerAmount);
//     console.log("clientSecret:", clientSecret);
//     console.log("stripePromise:", stripePromise);
//   }, [offerAmount, clientSecret, stripePromise]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="h-full w-full p-4 mt-40 bg-customPink flex items-center justify-center">
//       {stripePromise && clientSecret && (
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <PaymentForm clientSecret={clientSecret} />
//         </Elements>
//       )}
//     </div>
//   );
// };

// export default CheckoutForm;
