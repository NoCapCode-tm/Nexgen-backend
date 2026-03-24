import mongoose from "mongoose";

const SignatureSchema = new mongoose.Schema(
  {
    signer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signer",
      required: true,
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    x: Number,
    y: Number,
    width: Number,
    height: Number,

    signatureImageUrl: {
      type: String, // if user uploads a signature image, store its URL here
    },
  },
  { timestamps: true },
);

export default mongoose.model("Signature", SignatureSchema);
