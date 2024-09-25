const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const Blocklist = require("../models/Blocklist");

// POST create a new message in a chat
// Define a regex pattern for phone numbers
const phoneNumberRegex = /\b\d{10,}\b/g;


router.post("/", async (req, res) => {
  const { chatId, sender, content } = req.body;
console.log(chatId, sender)
  try {
    const newMessage = new Message({ chat: chatId, sender, content });
    await newMessage.save();

    // Update the chat with the new message
    await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } });

    // Extract phone numbers from message content
    const phoneNumbers = content.match(phoneNumberRegex) || [];

    if (phoneNumbers.length > 0) {
      // Check if the sender is already in the blocklist
      let blocklistEntry = await Blocklist.findOne({ userId: sender });

      if (!blocklistEntry) {
        // Create a new blocklist entry if not found
        blocklistEntry = new Blocklist({
          userId: sender,
          reason: "Sent phone number",
        });
        await blocklistEntry.save();
      }
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// router.post("/", async (req, res, next) => {
    
//   try {
//     const { chatId, sender, content } = req.body;
//     const newMessage = new Message({ chat: chatId, sender, content });
//     await newMessage.save();

//     // Update chat with the new message
//     await Chat.findByIdAndUpdate(chatId, {
//       $push: { messages: newMessage._id },
//     });

//     res.status(201).json(newMessage);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/messages/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).populate(
      {
        path: "senderId",
        select: "username email", // Adjust fields as needed
      }
    );

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
