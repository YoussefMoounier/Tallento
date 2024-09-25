const Contact = require("../models/Contact");
const asyncHandler = require("express-async-handler");

// Submit a contact form
exports.submitContactForm = asyncHandler(async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    res.status(400).json({ message: "Please fill out all fields." });
    return;
  }

  const contact = new Contact({
    name,
    phone,
    email,
    message,
  });

  await contact.save();

  res.status(201).json({
    message: "Your message has been received. We will get back to you shortly.",
  });
});

// Get all contact forms
exports.getAllContactForms = asyncHandler(async (req, res) => {
  console.log(req.body)
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// Get a single contact form by ID
exports.getContactFormById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Contact form not found" });
  }
  res.status(200).json(contact);
});

// Update a contact form by ID
exports.updateContactFormById = asyncHandler(async (req, res) => {
  const { name, phone, email, message } = req.body;

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Contact form not found" });
  }

  contact.name = name || contact.name;
  contact.phone = phone || contact.phone;
  contact.email = email || contact.email;
  contact.message = message || contact.message;

  await contact.save();
  res.status(200).json(contact);
});

// Delete a contact form by ID
exports.deleteContactFormById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Contact form not found" });
  }

  await contact.remove();
  res.status(200).json({ message: "Contact form deleted successfully" });
});
