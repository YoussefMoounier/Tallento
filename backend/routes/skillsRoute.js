const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// Get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new skill (admin only)
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const skill = new Skill({
    name: req.body.name,
    category: req.body.category,
  });

  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a skill (admin only)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    await skill.remove();
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;