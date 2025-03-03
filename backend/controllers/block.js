const { User } = require("../models/User");
const BlockedUser = require("../models/BlockedUser");
const sendEmail = require("../utils/sendEmail");

// Block a user
const blockUser = async (req, res) => {
  try {
    const { userId, blockedUserId } = req.body;

    // Check if user exists
    const userToBlock = await User.findById(blockedUserId);
    if (!userToBlock) {
      return res.status(404).json({ message: "User to block not found" });
    }

    // Check if already blocked
    const existingBlock = await BlockedUser.findOne({ userId, blockedUserId });
    if (existingBlock) {
      return res.status(400).json({ message: "User is already blocked" });
    }

    // Create block record
    const newBlock = new BlockedUser({
      userId,
      blockedUserId
    });
    await newBlock.save();

    // Update user's blocked status
    await User.findByIdAndUpdate(blockedUserId, { isBlocked: true });

    // Send email notification
    try {
      await sendEmail(
        userToBlock.email,
        "Account Blocked",
        "<p>Your account has been blocked. If you have any questions, please contact support.</p>"
      );
    } catch (emailError) {
      console.error("Failed to send block notification email:", emailError);
    }

    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({ message: "Failed to block user" });
  }
};

// Unblock a user
const unblockUser = async (req, res) => {
  try {
    const { userId, blockedUserId } = req.body;

    // Check if block exists
    const blockRecord = await BlockedUser.findOne({ userId, blockedUserId });
    if (!blockRecord) {
      return res.status(404).json({ message: "Block record not found" });
    }

    // Remove block record
    await BlockedUser.deleteOne({ userId, blockedUserId });

    // Update user's blocked status
    await User.findByIdAndUpdate(blockedUserId, { isBlocked: false });

    // Send email notification
    const unblockedUser = await User.findById(blockedUserId);
    if (unblockedUser) {
      try {
        await sendEmail(
          unblockedUser.email,
          "Account Unblocked",
          "<p>Your account has been unblocked. You can now use our platform again.</p>"
        );
      } catch (emailError) {
        console.error("Failed to send unblock notification email:", emailError);
      }
    }

    res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({ message: "Failed to unblock user" });
  }
};

// Get all blocked users
const getBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await BlockedUser.find()
      .populate("userId", "username email")
      .populate("blockedUserId", "username email");

    res.status(200).json(blockedUsers);
  } catch (error) {
    console.error("Get blocked users error:", error);
    res.status(500).json({ message: "Failed to get blocked users" });
  }
};

module.exports = { blockUser, unblockUser, getBlockedUsers };
