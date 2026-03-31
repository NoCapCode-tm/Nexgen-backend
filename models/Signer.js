import mongoose from "mongoose";

const SignerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // this is optional
    status: {
      type: String,
      enum: ["pending", "signed"],
      default: "pending",
    },
    widget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Widgets",
    },
    // signingOrder: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true },
);

export default mongoose.model("Signer", SignerSchema);
