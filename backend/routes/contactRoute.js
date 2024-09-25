const express = require("express");
const {
  submitContactForm,
  getAllContactForms,
  getContactFormById,
  updateContactFormById,
  deleteContactFormById,
} = require("../controllers/contactController");
const router = express.Router();

router.post("/", submitContactForm);
// Route to get all contact forms (admin only)
router.get("/", getAllContactForms);

// Routes to get, update, and delete a contact form by ID (admin only)
router
  .route("/:id")
  .get( getContactFormById)
  .put( updateContactFormById)
  .delete( deleteContactFormById);

module.exports = router;
