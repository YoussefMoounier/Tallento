const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/User");
const VerificationToken = require("../models/VerificationToken"); // تأكد من صحة المسار
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePhoto: {
              url: profile.photos[0].value,
              publicId: null,
            },
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        console.error("Error in Google Strategy:", err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error("Error in deserializing user:", err);
    done(err, null);
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.API_URL}/login`,
  }),
  asyncHandler(async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("No user found in request.");
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
        <h1>تأكيد التسجيل فى موقع تالينتو</h1>
          <p>اضغط على الرابط أدناه لتأكيد بريدك الإلكتروني</p>
          <a href="${link}">تأكيد البريد الإلكتروني</a>
        </div>`;

        await sendEmail(user.email, "تأكيد بريدك الإلكتروني", htmlTemplate);

        return res.redirect(
          `${process.env.CLIENT_DOMAIN}/login?error=${encodeURIComponent(
            "لقد أرسلنا لك بريداً إلكترونياً، يرجى تأكيد عنوان بريدك الإلكتروني"
          )}`
        );
      }

      const token = user.generateAuthToken();

      res.redirect(
        `${process.env.CLIENT_DOMAIN}/login?user=${encodeURIComponent(
          JSON.stringify({ ...user.toJSON(), token })
        )}`
      );
    } catch (err) {
      console.error("Error in Google callback:", err);
      res.redirect(
        `${process.env.CLIENT_DOMAIN}/login?error=${encodeURIComponent(
          "حدث خطأ أثناء معالجة طلبك."
        )}`
      );
    }
  })
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "تم تسجيل الدخول بنجاح",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "غير مصرح" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("sessionId"); // مسح أي ملفات تعريف ارتباط محددة إذا لزم الأمر
    res.status(200).send("تم تسجيل الخروج بنجاح");
  });
});

module.exports = router;
