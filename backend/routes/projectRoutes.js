const express = require("express");
const Project = require("../models/projectModel");
const {User} = require("../models/User"); // Ensure correct import
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// Function to handle budget payment using Stripe
const handleBudgetPayment = async (ownerId, budget) => {
  const amount = parseInt(budget * 100, 10); // Convert budget to smallest currency unit (e.g., cents for USD)
  const owner = await User.findById(ownerId);
  if (!owner.stripeCustomerId || !owner.stripePaymentMethodId) {
    throw new Error(
      "Owner does not have a Stripe customer or payment method ID"
    );
  }

  const charge = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd", // Adjust currency as needed
    customer: owner.stripeCustomerId,
    description: `Payment for project budget`,
    payment_method: owner.stripePaymentMethodId,
    off_session: true,
    confirm: true,
  });

  owner.balance -= budget; // Adjust balance after payment
  await owner.save();

  return charge;
};
router.put("/projects/:id", async (req, res) => {
  try {
    const { status, editor, ownerId, offerId } = req.body;

    // If status is changed to "قيد التنفيز", ensure an editor is selected and handle payment
    if (status === "قيد التنفيز") {
      if (!editor) {
        return res.status(400).json({ message: "Editor must be selected" });
      }

      // Find the offer by ID to get the amount
      const project = await Project.findById(req.params.id);
      const selectedOffer = project.offers.id(offerId);
      if (!selectedOffer) {
        return res.status(400).json({ message: "Offer not found" });
      }

      const offerAmount = selectedOffer.amount;

      // Update the project's budget to the offer amount
      project.budget = offerAmount;

      await handleBudgetPayment(ownerId, offerAmount);

      project.editor = editor;
      await project.save();
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("owner")
      .populate("offers.user")
      .populate("editor");

    res
      .status(200)
      .json({
        message: "Project updated successfully",
        project: updatedProject,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




// Route to create a new project
router.post("/projects", async (req, res) => {
  console.log(req.body)
  try {
    const { ownerId, ...projectData } = req.body;

    // Validate required fields
    if (
      !projectData.title ||
      !projectData.description ||
      !projectData.budget ||
      !projectData.duration
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch the user by ID
    const owner = await User.findById(ownerId);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Create the project with the owner reference
    const newProject = new Project({
      ...projectData,
      owner: owner._id,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Route to fetch all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("owner")
      .populate("offers.user")
      .sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a project
router.delete("/projects/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to submit an offer to a project
router.post("/projects/:id/offers", async (req, res) => {
  try {
    const { userId, amount, duration, description } = req.body;

    // Validate required fields
    if (!userId || !amount || !duration || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the project by ID
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Add the offer to the project
    const newOffer = {
      user: user._id,
      amount,
      duration,
      description,
    };

    project.offers.push(newOffer);
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error("Error submitting offer:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// Route to edit an offer
router.put("/projects/:projectId/offers/:offerId", async (req, res) => {
  try {
    const { projectId, offerId } = req.params;
    const { amount, duration, description } = req.body;

    // Fetch the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Find the offer in the project's offers array
    const offer = project.offers.id(offerId);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Update the offer details
    if (amount) offer.amount = amount;
    if (duration) offer.duration = duration;
    if (description) offer.description = description;

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    console.error("Error updating offer:", error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
