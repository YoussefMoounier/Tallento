const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/add-payment-method", async (req, res) => {
  try {
    const { userId, paymentMethodId } = req.body;

    const user = await User.findById(userId);

    if (!user.stripeCustomerId) {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
      });

      user.stripeCustomerId = customer.id;
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    // Set the payment method as the default payment method
    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    user.stripePaymentMethodId = paymentMethodId;
    await user.save();

    res.status(200).json({ message: "Payment method added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
