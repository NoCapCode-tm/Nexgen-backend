import Signer from "../models/Signer.js";
import { Document } from "../models/Document.js";
import { Contact } from "../models/Contact.js";

// ✅ Add Signer
export const addSigner = async (req, res) => {
  try {
    const { id: documentId } = req.params;
    const { name, email, contactId } = req.body;

    // check document exists & belongs to user
    const document = await Document.findOne({
      _id: documentId,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    let signerData = {};

    // 🔥 If contactId provided
    if (contactId) {
      const contact = await Contact.findOne({
        _id: contactId,
        owner: req.user._id,
      });

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      signerData.name = contact.name;
      signerData.email = contact.email;
    } else {
      // manual input
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      signerData.name = name;
      signerData.email = email;
    }

    // create signer
    const signer = await Signer.create({
      document: documentId,
      ...signerData,
    });

    // push into document
    document.signers.push(signer._id);
    await document.save();

    res.status(201).json({
      success: true,
      signer,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Signers for Document
export const getSigners = async (req, res) => {
  try {
    const { id: documentId } = req.params;

    const document = await Document.findOne({
      _id: documentId,
      owner: req.user._id,
    }).populate("signers");

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({
      success: true,
      signers: document.signers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};