import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String, // template PDF
      required: true,
    },

    widgets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Widgets",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Template", templateSchema);
