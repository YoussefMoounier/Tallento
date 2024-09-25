const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

router.post('/send-email', async (req, res) => {
  const { userEmail, subject, htmlTemplate } = req.body;

  try {
    await sendEmail(userEmail, subject, htmlTemplate);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
