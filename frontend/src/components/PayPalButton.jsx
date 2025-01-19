import { toast } from "react-toastify";
import request from "../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const PayPalButton = ({ amount, currency }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const createOrder = async (data, actions) => {
    try {
      const response = await request.post('/api/paypal/create-order', {
        amount,
        currency,
        userId: user._id,
      });
      return response.data.id;
    } catch (error) {
      toast.error('Failed to create PayPal order');
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await request.post('/api/paypal/capture-order', {
        orderId: data.orderID,
        userId: user._id,
      });
      toast.success('Payment successful');
    } catch (error) {
      toast.error('Failed to capture PayPal order');
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;