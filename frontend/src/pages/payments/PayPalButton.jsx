import React, { useState } from "react";
import { toast } from "react-toastify";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, currency }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Custom createOrder logic for server-side order creation
  const createOrder = async () => {
    try {
      setIsLoading(true);
      const response = await request.post("/api/paypal/create-order", {
        amount,
        currency,
        userId: user._id, // Send user ID to the backend for processing
      });
      setIsLoading(false);
      return response.data.id; // Return order ID for PayPal SDK
    } catch (error) {
      setIsLoading(false);
      const message = error.response?.data?.message || "Failed to create PayPal order";
      toast.error(message);
      console.error(error);
      throw error;
    }
  };

  // On approve logic for capturing the order
  const onApprove = async (data) => {
    try {
      setIsLoading(true);
      const response = await request.post("/api/paypal/capture-order", {
        orderId: data.orderID, // Use orderID from PayPal SDK
        userId: user._id,
      });
      setIsLoading(false);
      toast.success("Payment successful");
      console.log("Payment capture response:", response.data);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to capture PayPal order");
      console.error(error);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AUjSHi5e3Tykpv6xU-UQr0LPaqAadKq44SfQ66vwKqEZEi92RUZuCZHpk9I8DjbYPBxVgCcUu5M1yjoY" }}>
      <div>
        {isLoading && <p>Processing payment...</p>}
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => {
            toast.error("PayPal transaction failed");
            console.error("PayPal Error:", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
