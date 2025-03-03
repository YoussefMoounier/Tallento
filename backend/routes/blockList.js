const express = require('express');
const router = express.Router();
const BlockedUser = require('../models/BlockedUser');
const { verifyToken } = require('../middlewares/verifyToken');

// Get all blocked users
router.get('/',  async (req, res) => {
  try {
    const blockedUsers = await BlockedUser.find()
      .populate('userId', 'username email profilePhoto')
      .populate('blockedUserId', 'username email profilePhoto');
    res.json(blockedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Block a user
router.post('/:userId',  async (req, res) => {
  try {
    // Check if block already exists
    const existingBlock = await BlockedUser.findOne({
      userId: req.user.id,
      blockedUserId: req.params.userId
    });

    if (existingBlock) {
      return res.status(400).json({ message: 'User is already blocked' });
    }

    const newBlock = new BlockedUser({
      userId: req.user.id,
      blockedUserId: req.params.userId
    });
    await newBlock.save();
    
    // Return the populated block data
    const populatedBlock = await BlockedUser.findById(newBlock._id)
      .populate('userId', 'username email profilePhoto')
      .populate('blockedUserId', 'username email profilePhoto');
      
    res.status(201).json(populatedBlock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Unblock a user
router.delete('/:userId',  async (req, res) => {
  try {
    const result = await BlockedUser.findOneAndDelete({
      userId: req.user.id,
      blockedUserId: req.params.userId
    });

    if (!result) {
      return res.status(404).json({ message: 'Block not found' });
    }

    res.json({ message: 'User unblocked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if a user is blocked
router.get('/check/:userId',  async (req, res) => {
  try {
    const block = await BlockedUser.findOne({
      userId: req.user.id,
      blockedUserId: req.params.userId
    });
    res.json({ isBlocked: !!block });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;