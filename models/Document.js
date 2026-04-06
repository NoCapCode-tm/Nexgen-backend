import mongoose from "mongoose";
import widgetSchema from "./Widgets.js";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String, // Cloudinary / AWS S3
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "completed"],
      default: "draft",
    },
    signers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signer",
      },
    ],
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
    widgets: [widgetSchema],
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const Document = mongoose.model("Document", documentSchema);
