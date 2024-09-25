// backend/routes/userRoutes.js
const express = require("express");
const { blockUser, unblockUser } = require("../controllers/block");

const router = express.Router();

router.patch("/block/:id", blockUser);
router.patch("/unblock/:id", unblockUser);

module.exports = router;
