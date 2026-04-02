import { Contact } from "../models/Contact.js";

// Create Contact
export const createContact = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Contacts (for logged-in user)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      contacts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      success: true,
      message: "Contact deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Contact (Optional)
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { name, email },
      { new: true },
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      success: true,
      contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
