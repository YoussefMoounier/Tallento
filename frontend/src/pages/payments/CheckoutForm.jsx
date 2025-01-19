import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentsPage from '../../components/Payments';
import Payments from '../../components/Payments';


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
      const response = await fetch("https://tallento.onrender.com/create-payment-intent", {
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
    <div className='flex flex-col items-center p-4 gap-4 w-2/4 mx-auto'>
<Payments/>
    <form onSubmit={handleSubmit} className="w-4/6 mx-auto p-8 bg-white shadow-md rounded-lg mt-8">
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
        </div>
  );
};

const WrappedCheckoutForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default WrappedCheckoutForm;
