import mongoose from "mongoose";

const PlotSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    plotId: {
      type: String,
      required: true,
      description: 'Must match SVG element id like "plot-1"',
    },
    plotNumber: { type: String, required: true },
    areaSqFt: { type: Number },
    areaCents: { type: Number },
    east: { type: Number },
    west: { type: Number },
    north: { type: Number },
    south: { type: Number },
    facing: { type: String },
    road: { type: String },
    price: { type: Number },
    status: {
      type: String,
      enum: ["available", "reserved", "mortgaged", "registered", "booked"],
      default: "available",
    },
    customer: [
      {
        name: String,
        aadharNumber: String,
        phone: String,
        address: String,
      },
    ],
  },
  { timestamps: true },
);

// Force recreate model if it already exists to ensure schema updates are picked up in dev
if (process.env.NODE_ENV === "development" && mongoose.models.Plot) {
  delete mongoose.models.Plot;
}

export default mongoose.models.Plot || mongoose.model("Plot", PlotSchema);
