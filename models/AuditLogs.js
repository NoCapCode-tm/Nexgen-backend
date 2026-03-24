import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },

    action: {
      type: String,
      enum: ["created", "sent", "signed", "reviewed"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    metadata: {
      type: Object,
    },
  },
  { timestamps: true },
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
