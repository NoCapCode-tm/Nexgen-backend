import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    widgets: [
      {
        signature: {
          type: String,
        },
        email: {
          type: String,
        },
        name: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Template", TemplateSchema);
