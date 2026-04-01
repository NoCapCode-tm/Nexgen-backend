import { Document } from "../models/Document.js";

// Create Document
export const createDocument = async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    if (!title || !fileUrl) {
      return res
        .status(400)
        .json({ message: "Title and fileUrl are required" });
    }

    const document = await Document.create({
      title,
      content,
      fileUrl,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      document,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Documents (for logged-in user)
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      documents,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Document
export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findOne({
      _id: id,
      owner: req.user._id,
    })
      .populate("signers")
      .populate("template");

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({
      success: true,
      document,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Document
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      req.body,
      { new: true },
    );

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({
      success: true,
      document,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({
      success: true,
      message: "Document deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
