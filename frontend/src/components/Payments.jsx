import PayPalButton from "./PayPalButton";



const Payments = () => {

    return (
      <div className="payments-container">
          <div className="paypal-button-container">
            <PayPalButton amount={10} currency="USD" />
          </div>
      </div>
    );
  };
  
  export default Payments;