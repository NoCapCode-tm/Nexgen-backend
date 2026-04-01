import mongoose from "mongoose";
import widgetSchema from "./Widgets.js";

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

    widgets: [widgetSchema],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Template", templateSchema);
