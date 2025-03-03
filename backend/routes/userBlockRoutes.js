const express = require("express");
const { blockUser, unblockUser, getBlockedUsers } = require("../controllers/block");

const router = express.Router();

// Block a user (requires authentication)
router.patch("/block/:id", blockUser);

// Unblock a user (requires authentication)
router.patch("/unblock/:id", unblockUser);

// Get all blocked users (admin only)
router.get("/", getBlockedUsers);

module.exports = router;
