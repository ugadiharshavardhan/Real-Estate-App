import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false, // Optional if it's a general enquiry
    },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    plotId: { type: String },
    status: {
      type: String,
      enum: ["pending", "contacted", "closed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);
