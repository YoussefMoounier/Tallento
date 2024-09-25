const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const {User }= require("../models/User");
const { v4: uuidv4 } = require("uuid");
const Message = require("../models/Message");


// Create a new chat

router.post("/create", async (req, res) => {
  const { userId1, userId2, chatName } = req.body;
  if (!userId1 || !userId2 || !chatName) {
    return res
      .status(400)
      .json({ error: "userId1, userId2, and chatName are required" });
  }

  try {
    const existingChat = await Chat.findOne({
      participants: { $all: [userId1, userId2] },
    });

    if (existingChat) {
      return res.status(400).json({ error: "Chat already exists" });
    }

    const chatId = uuidv4();
    const newChat = new Chat({
      chatId,
      chatName, 
      room:chatId,// Use the chatName from the request body
      participants: [userId1, userId2],
    });

    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error creating chat:", error);
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate key error" });
    } else {
      res.status(500).json({ error: "Error creating chat" });
    }
  }
});

router.put("/read/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const userId = req.body.userId;

  try {
    await Message.updateMany(
      { chatId: chatId, receiverId: userId, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ error: "Error marking messages as read" });
  }
});



router.get("/messages/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate({
      path: "sender", // Populate the sender field
      select: "username", // Select only the fields you need
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific chat by ID
router.get("/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    
    // Find the chat by ID
    const chat = await Chat.findById(chatId).populate("participants", "userId");
    
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a participant to a chat
router.patch("/:chatId/addParticipant", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;
    
    // Find the chat and add the new participant
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { participants: userId } },
      { new: true }
    ).populate("participants", "userId");
    
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// Remove a participant from a chat
router.patch("/:chatId/removeParticipant", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;
    
    // Find the chat and remove the participant
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { participants: userId } },
      { new: true }
    ).populate("participants", "userId");
    
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get chats for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find chats that include the user and populate all user data
    const chats = await Chat.find({ participants: userId }).populate({
      path: "participants", // Field to populate
      model: "User", // Specify the model to populate
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
