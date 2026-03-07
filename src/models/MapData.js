import mongoose from "mongoose";

const MapDataSchema = new mongoose.Schema(
    {
        projectSlug: {
            type: String,
            required: true,
            index: true,
        },
        layerType: {
            type: String,
            required: true,
            enum: ["plots", "roads", "compounds", "footpaths"],
        },
        geoJson: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);

// Ensure a project only has one entry per layer type
MapDataSchema.index({ projectSlug: 1, layerType: 1 }, { unique: true });

export default mongoose.models.MapData || mongoose.model("MapData", MapDataSchema);
