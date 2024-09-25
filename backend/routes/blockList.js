const express = require("express");
const router = express.Router();
const Blocklist = require("../models/Blocklist");

// Get all blocked users
router.get("/", async (req, res) => {
  try {
    const blockedUsers = await Blocklist.find()
      .populate("userId", "username email") // Populate blockedUserId

    res.status(200).json(blockedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific user's blocklist entry
router.get("/:userId", async (req, res) => {
  try {
    const blocklistEntries = await Blocklist.find({ userId: req.params.userId })
      .populate("userId", "username email")
      .populate("blockedUserId", "username email");

    if (blocklistEntries.length === 0) {
      return res
        .status(404)
        .json({ message: "No blocklist entries found for this user" });
    }

    res.status(200).json(blocklistEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a blocklist entry
router.delete("/:userId/:blockedUserId", async (req, res) => {
  try {
    const { userId, blockedUserId } = req.params;

    const result = await Blocklist.deleteOne({ userId, blockedUserId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blocklist entry not found" });
    }

    res.status(200).json({ message: "Blocklist entry removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
