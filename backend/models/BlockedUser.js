// ملف models/BlockedUser.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockedUserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blockedUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const BlockedUser = mongoose.model("BlockedUser", blockedUserSchema);

module.exports = BlockedUser;

