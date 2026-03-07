import mongoose from "mongoose";

const AmenitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
});

const LocationHighlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  distance: { type: String },
});

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    heroImage: { type: String, required: true },
    gallery: [{ type: String }],
    layoutSvg: { type: String, required: true },
    totalPlots: { type: Number, required: true },
    totalAcres: { type: Number, required: true },
    amenities: [AmenitySchema],
    locationHighlights: [LocationHighlightSchema],
    latitude: { type: Number },
    longitude: { type: Number },
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
