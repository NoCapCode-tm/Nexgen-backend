import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["signature", "name", "email", "date"],
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
});

export default widgetSchema;
