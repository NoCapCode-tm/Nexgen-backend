import Template from "../models/Template.js";

// Create Template
export const createTemplate = async (req, res) => {
  try {
    const { title, fileUrl, widgets } = req.body;

    if (!title || !fileUrl) {
      return res
        .status(400)
        .json({ message: "Title and fileUrl are required" });
    }

    const template = await Template.create({
      title,
      fileUrl,
      widgets,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      template,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Templates (user-specific)
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      templates,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Template
export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findOne({
      _id: id,
      owner: req.user._id,
    });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({
      success: true,
      template,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Template
export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({
      success: true,
      message: "Template deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Template (optional but useful)
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      req.body,
      { new: true },
    );

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({
      success: true,
      template,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
