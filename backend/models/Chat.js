const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new Schema({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  chatName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => value.trim().length > 0,
      message: "Chat name cannot be empty",
    },
  },
  room: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => value.trim().length > 0,
      message: "Room name cannot be empty",
    },
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [messageSchema], // Embedded messages schema
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

chatSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
