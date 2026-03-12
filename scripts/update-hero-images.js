const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    heroImage: String,
    gallery: [String],
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

async function update() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const updateData = {
      heroImage: "/images/hero/gate.png",
      gallery: [
        "/images/hero/aerial_lush.png",
        "/images/hero/aerial_plotted.png",
        "/images/hero/plot_1.png",
        "/images/hero/plot_2.png",
        "/images/hero/plot_3.png"
      ]
    };

    const result = await Project.updateOne({ slug: "ugadi-ventures" }, { $set: updateData });
    
    if (result.matchedCount > 0) {
      console.log("Successfully updated hero images and gallery for Ugadi Ventures.");
    } else {
      console.error("Project 'ugadi-ventures' not found.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error updating project images:", error);
    process.exit(1);
  }
}

update();
