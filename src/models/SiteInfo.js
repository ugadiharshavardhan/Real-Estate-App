import mongoose from "mongoose";

const SiteInfoSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    supportEmail: { type: String, required: true },
    officeAddress: { type: String, required: false },
    primaryPhone: { type: String, required: true },
    workingHours: { type: String, required: false },
    updatedBy: { type: String, required: false }, // Store Clerk User ID of last admin
  },
  {
    timestamps: true,
  }
);

// We only ever need one document to store global settings.
export default mongoose.models.SiteInfo || mongoose.model("SiteInfo", SiteInfoSchema);
