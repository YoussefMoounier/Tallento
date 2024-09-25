const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents to have googleId as null
    },
    username: {
      type: String,
      required: function () {
        return !this.googleId; // Username is required only if googleId is not present
      },
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: function () {
        return !this.googleId; // Password is required only if googleId is not present
      },
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
    },
    country:{
      type:String,
    },
    birthday: {
      type: Date,
      validate: {
        validator: function (value) {
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          const monthDifference = today.getMonth() - value.getMonth();
          const dayDifference = today.getDate() - value.getDate();

          return (
            age > 18 ||
            (age === 18 && monthDifference > 0) ||
            (age === 18 && monthDifference === 0 && dayDifference >= 0)
          );
        },
        message: "عفواً! لابد ان تكون/ي 18 عاما او اكبر للتسجيل لدينا.",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: function () {
        return !this.googleId; // Gender is required only if googleId is not present
      },
    },
    hasBeard: {
      type: Boolean,
      default: false,
    },
    wearsHijab: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    socketId: { type: String },
    chatPartners: [{ type: String }],
    stripeCustomerId: {
      type: String,
    },
    stripePaymentMethodId: {
      type: String,
    },
    isBlocked: { type: Boolean, default: false }, // حقل الحظر
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate Posts That Belongs To This User When he/she Get his/her Profile
UserSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

// Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
};

// User Model
const User = mongoose.model("User", UserSchema);


// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    phone: Joi.string().trim().min(11).max(11).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(8),
    country: Joi.string().trim().min(2),
    birthday: Joi.date().required(),
    gender: Joi.string().valid("male", "female").required(),
    hasBeard: Joi.boolean().optional(),
    wearsHijab: Joi.boolean().optional(),
    googleId: Joi.string().optional(),
  });
  return schema.validate(obj);
}


// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100),
    password: passwordComplexity(),
    bio: Joi.string(),
    country: Joi.string(),
    phone: Joi.string().optional(),
    birthday: Joi.date().optional(),
    gender: Joi.string().valid("male", "female").optional(),
    hasBeard: Joi.boolean().optional(),
    wearsHijab: Joi.boolean().optional(),
  });
  return schema.validate(obj);
}


// Validate Email
function validateEmail(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
  });
  return schema.validate(obj);
}

// Validate New Password
function validateNewPassword(obj) {
  const schema = Joi.object({
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateEmail,
  validateNewPassword,
};
