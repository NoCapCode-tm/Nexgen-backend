import mongoose from "mongoose";

const recentActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },

    type: {
      type: String,
      enum: [
        "DOCUMENT_CREATED",
        "DOCUMENT_SENT",
        "DOCUMENT_SIGNED",
        "DOCUMENT_COMPLETED",
      ],
      required: true,
    },

    message: {
      type: String,
      // Example: "You signed the document NDA.pdf"
    },

    metadata: {
      type: Object,
      // optional extra data (signerId, etc.)
    },
  },
  { timestamps: true },
);

export const RecentActivity = mongoose.model(
  "RecentActivity",
  recentActivitySchema,
);
