const express = require("express");
const router = express.Router();
const Blocklist = require("../models/Blocklist");

// Get all blocked users
router.get("/", async (req, res) => {
  try {
    const blockedUsers = await Blocklist.find().populate("userId", "username email");
    res.status(200).json(blockedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific blocked user
router.get("/:userId", async (req, res) => {
  try {
    const blockedUser = await Blocklist.findOne({ userId: req.params.userId }).populate("userId", "username email");
    if (!blockedUser) {
      return res.status(404).json({ message: "User not found in blocklist" });
    }
    res.status(200).json(blockedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a user to blocklist
router.post("/", async (req, res) => {
  try {
    const { userId, reason } = req.body;
    const existingBlock = await Blocklist.findOne({ userId });
    
    if (existingBlock) {
      return res.status(400).json({ message: "User is already blocked" });
    }

    const newBlock = new Blocklist({
      userId,
      reason
    });

    await newBlock.save();
    res.status(201).json(newBlock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a user from blocklist
router.delete("/:userId", async (req, res) => {
  try {
    const deletedBlock = await Blocklist.findOneAndDelete({ userId: req.params.userId });
    if (!deletedBlock) {
      return res.status(404).json({ message: "User not found in blocklist" });
    }
    res.status(200).json({ message: "User removed from blocklist successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;