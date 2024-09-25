// backend/controllers/userController.js
const { User } = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );

    // إرسال بريد إلكتروني للمستخدم المحظور
    await sendEmail(
      user.email,
      "تم حظرك",
      "<p>لقد تم حظرك من استخدام منصتنا. إذا كان لديك أي استفسارات، يرجى التواصل مع الدعم.</p>"
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );

    // إرسال بريد إلكتروني للمستخدم
    await sendEmail(
      user.email,
      "تم إلغاء حظرك",
      "<p>تم إلغاء حظرك ويمكنك الآن استخدام منصتنا مرة أخرى. إذا كان لديك أي استفسارات، يرجى التواصل مع الدعم.</p>"
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { blockUser, unblockUser };
