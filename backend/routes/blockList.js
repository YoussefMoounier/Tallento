const express = require("express");
const router = express.Router();
const { blockUser, unblockUser, getBlockedUsers } = require("../controllers/block");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// Get all blocked users (admin only)
router.get("/", verifyTokenAndAdmin, getBlockedUsers);

// Block a user (admin only)
router.post("/block", verifyTokenAndAdmin, blockUser);

// Unblock a user (admin only)
router.post("/unblock", verifyTokenAndAdmin, unblockUser);

module.exports = router;
