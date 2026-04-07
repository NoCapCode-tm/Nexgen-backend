import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "signature",
      "initials",
      "text",
      "checkbox",
      "radio",
      "dropdown",
      "stamps",
      "number",
      "name",
      "email",
      "date",
    ],
    required: true,
  },

  x: Number,
  y: Number,
  width: Number,
  height: Number,

  page: {
    type: Number,
    required: true,
  },

  // 🔥 IMPORTANT: which signer this belongs to
  signerIndex: {
    type: Number,
    required: true,
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
});

export default widgetSchema;
