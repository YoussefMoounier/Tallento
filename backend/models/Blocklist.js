const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blocklistSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Ensure each user is only listed once
  },
  reason: {
    type: String,
    default: "Sent phone number",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blocklist = mongoose.model("Blocklist", blocklistSchema);

module.exports = Blocklist;
