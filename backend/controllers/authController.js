const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  console.log(req.body); // Log the incoming request body to debug

  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "المستخدم موجود بالفعل" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    country: req.body.country,
    phone: req.body.phone,
    password: hashedPassword,
    gender: req.body.gender,
    birthday: req.body.birthday,
    hasBeard: req.body.hasBeard,
    wearsHijab: req.body.wearsHijab,
  });
  await user.save();

  // Create and save a new VerificationToken
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();

  // Create the verification link
  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

  // Create the email HTML template
  const htmlTemplate = `
    <div>
      <p>انقر على الرابط أدناه لتفعيل بريدك الإلكتروني</p>
      <a href="${link}">تفعيل البريد الإلكتروني</a>
    </div>`;

  // Send the verification email
  await sendEmail(user.email, "تفعيل بريدك الإلكتروني", htmlTemplate);

  // Respond to the client
  res.status(201).json({
    message: "لقد أرسلنا لك بريداً إلكترونياً، يرجى تفعيل بريدك الإلكتروني",
  });
});

/**-----------------------------------------------
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
  }

  if (!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });

    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }

    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

    const htmlTemplate = `
    <div>
      <p>انقر على الرابط أدناه لتفعيل بريدك الإلكتروني</p>
      <a href="${link}">تفعيل البريد الإلكتروني</a>
    </div>`;

    await sendEmail(user.email, "تفعيل بريدك الإلكتروني", htmlTemplate);

    return res.status(400).json({
      message: "لقد أرسلنا لك بريداً إلكترونياً، يرجى تفعيل بريدك الإلكتروني",
    });
  }

  const token = user.generateAuthToken();
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
    gender: user.gender
  });
});

/**-----------------------------------------------
 * @desc    Verify User Account
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "الرابط غير صحيح" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "الرابط غير صحيح" });
  }

  user.isAccountVerified = true;
  await user.save();

  await verificationToken.remove();

  res.status(200).json({ message: "تم تفعيل حسابك بنجاح" });
});

/**-----------------------------------------------
 * @desc    Update User Profile
 * @route   /api/auth/update
 * @method  PUT
 * @access  private
 ------------------------------------------------*/
// Update User Profile
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {

  console.log(req.body)
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  const { username, email, phone, gender, birthday, hasBeard, wearsHijab } = req.body;

  // Update user fields
  user.username = username || user.username;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.gender = gender || user.gender;
  user.birthday = birthday || user.birthday;
  user.hasBeard = hasBeard !== undefined ? hasBeard : user.hasBeard;
  user.wearsHijab = wearsHijab !== undefined ? wearsHijab : user.wearsHijab;

  await user.save();

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    birthday: user.birthday,
    hasBeard: user.hasBeard,
    wearsHijab: user.wearsHijab,
    profilePhoto: user.profilePhoto,
  });
});

