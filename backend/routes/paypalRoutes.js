// filepath: /d:/GitHub/Tallento/backend/routes/paypalRoutes.js
const express = require('express');
const router = express.Router();
const { client } = require('../config/paypalConfig');
const Payment = require('../models/Payment');
const User = require('../models/User');

router.post('/create-order', async (req, res) => {
  const { amount, currency, userId } = req.body;

  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: currency,
        value: amount
      }
    }]
  });

  try {
    const order = await client.execute(request);
    res.status(201).json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/capture-order', async (req, res) => {
  const { orderId, userId } = req.body;

  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Update the user's balance
    const amount = capture.result.purchase_units[0].amount.value;
    user.balance = (user.balance || 0) + parseFloat(amount);
    await user.save();

    // Save payment details in the database
    const payment = new Payment({
      user: user._id,
      amount: parseFloat(amount),
      currency: capture.result.purchase_units[0].amount.currency_code,
      paymentIntentId: capture.result.id,
      status: capture.result.status,
    });
    await payment.save();

    res.status(200).json({ capture, balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;