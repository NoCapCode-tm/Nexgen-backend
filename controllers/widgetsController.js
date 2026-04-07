import Widget from "../models/Widgets.js";
import { Document } from "../models/Document.js";

// Create Widget
export const createWidget = async (req, res) => {
  try {
    const { documentId, type, x, y, width, height, page, signerIndex } =
      req.body;

    if (
      !documentId ||
      !type ||
      page === undefined ||
      signerIndex === undefined
    ) {
      return res.status(400).json({
        message: "documentId, type, page and signerIndex are required",
      });
    }

    // check document exists
    const document = await Document.findOne({
      _id: documentId,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const widget = await Widget.create({
      document: documentId,
      type,
      x,
      y,
      width,
      height,
      page,
      signerIndex,
    });

    res.status(201).json({
      success: true,
      widget,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Widgets by Document
export const getWidgetsByDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const widgets = await Widget.find({ document: id });

    res.json({
      success: true,
      widgets,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Widget (optional)
export const deleteWidget = async (req, res) => {
  try {
    const { id } = req.params;

    const widget = await Widget.findByIdAndDelete(id);

    if (!widget) {
      return res.status(404).json({ message: "Widget not found" });
    }

    res.json({
      success: true,
      message: "Widget deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
