import React, { useState } from "react";
import { toast } from "react-toastify";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, currency }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Replace the createOrder function here
  const createOrder = async (data, actions) => {
    try {
      setIsLoading(true);
      const response = await request.post("/api/paypal/create-order", {
        amount,
        currency,
        userId: user._id, // Ideally, handle userId in the backend
      });
      setIsLoading(false);
      return response.data.id;
    } catch (error) {
      setIsLoading(false);
      const message = error.response?.data?.message || "Failed to create PayPal order";
      toast.error(message);
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      setIsLoading(true);
      const response = await request.post("/api/paypal/capture-order", {
        orderId: data.orderID,
        userId: user._id,
      });
      setIsLoading(false);
      toast.success("Payment successful");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to capture PayPal order");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id":"AUjSHi5e3Tykpv6xU-UQr0LPaqAadKq44SfQ66vwKqEZEi92RUZuCZHpk9I8DjbYPBxVgCcUu5M1yjoY" }}>
      <div>
        {isLoading && <p>Processing payment...</p>}
        <PayPalButtons
          createOrder={createOrder} // Use the updated function
          onApprove={onApprove}
          style={{ layout: "vertical" }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

