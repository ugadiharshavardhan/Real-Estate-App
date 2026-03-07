const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

// Define Schemas directly in seeding script to avoid import issues
const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    location: String,
    description: String,
    heroImage: String,
    gallery: [String],
    layoutSvg: String,
    totalPlots: Number,
    totalAcres: Number,
    amenities: [{ title: String, description: String, icon: String }],
    locationHighlights: [
      { title: String, description: String, image: String, distance: String },
    ],
  },
  { timestamps: true },
);

const PlotSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    plotId: String,
    plotNumber: String,
    areaSqFt: Number,
    areaCents: Number,
    facing: String,
    road: String,
    price: Number,
    status: {
      type: String,
      enum: ["available", "reserved", "sold"],
      default: "available",
    },
  },
  { timestamps: true },
);

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const Plot = mongoose.models.Plot || mongoose.model("Plot", PlotSchema);

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // 1. Create Project
    const projectData = {
      name: "Ugadi Ventures",
      slug: "ugadi-ventures",
      location: "Kurnool, Andhra Pradesh",
      description:
        "A premium residential venture offering well-planned plots with modern amenities and excellent connectivity. Located in the heart of Kurnool, Ugadi Ventures is designed for those seeking a peaceful and comfortable lifestyle. Our project stands out for its strategic positioning near major landmarks and transport hubs.",
      heroImage:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop", // Real Estate Hero
      gallery: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560520141-949673906370?q=80&w=1000&auto=format&fit=crop",
      ],
      layoutSvg: "/layouts/ugadi-layout.svg",
      totalPlots: 29,
      totalAcres: 5.5,
      amenities: [
        {
          title: "Gated Community",
          description: "Secure and safe environment with 24/7 security.",
          icon: "ShieldCheck",
        },
        {
          title: "Parks & Greenery",
          description: "Lush green parks and landscaped gardens.",
          icon: "Trees",
        },
        {
          title: "Avenue Plantation",
          description: "Beautiful trees planted along the roads.",
          icon: "Leaf",
        },
        {
          title: "BT Roads",
          description: "Wide black-top roads for smooth transit.",
          icon: "Road",
        },
        {
          title: "Water Tank",
          description: "Dedicated overhead tank for continuous water.",
          icon: "Droplets",
        },
        {
          title: "Electricity",
          description: "Solar street lights and underground electrical lines.",
          icon: "Zap",
        },
      ],
      locationHighlights: [
        {
          title: "Kurnool Railway Station",
          description:
            "Major transit hub connecting to Hyderabad and Bangalore.",
          image:
            "https://images.unsplash.com/photo-1474487012301-49a374665f80?q=80&w=1000&auto=format&fit=crop",
          distance: "8 km",
        },
        {
          title: "Orvakal Airport",
          description: "Kurnool (Uyalawada Narasimha Reddy) Airport.",
          image:
            "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1000&auto=format&fit=crop",
          distance: "20 km",
        },
        {
          title: "Konda Reddy Fort",
          description: "Famous historical landmark of Kurnool.",
          image:
            "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=1000&auto=format&fit=crop",
          distance: "6 km",
        },
        {
          title: "Silver Jubilee College",
          description: "One of the prestigious educational institutions.",
          image:
            "https://images.unsplash.com/photo-1498243639359-2cee70984950?q=80&w=1000&auto=format&fit=crop",
          distance: "5 km",
        },
        {
          title: "NH 44 Highway",
          description: "Direct connectivity to major cities via the highway.",
          image:
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop",
          distance: "2 km",
        },
        {
          title: "Gowri Gopal Hospital",
          description: "Multi-specialty healthcare services for emergencies.",
          image:
            "https://images.unsplash.com/photo-1519494026892-80bbd2d634cb?q=80&w=1000&auto=format&fit=crop",
          distance: "10 km",
        },
      ],
    };

    // Clear existing data for this project
    await Project.deleteOne({ slug: projectData.slug });

    const project = await Project.create(projectData);
    console.log(`Project "${project.name}" created with ID: ${project._id}`);

    // 2. Read Plots from plotData.json
    const plotsFilePath = path.join(__dirname, "../src/data/plotData.json");
    if (!fs.existsSync(plotsFilePath)) {
      throw new Error(`Plots file not found at ${plotsFilePath}`);
    }
    const plotsDataRaw = fs.readFileSync(plotsFilePath, "utf8");
    const plotsData = JSON.parse(plotsDataRaw);

    // 3. Prepare Plots
    const plotsToInsert = plotsData.map((plot) => ({
      projectId: project._id,
      plotId: plot.id,
      plotNumber: plot.number,
      areaSqFt: plot.areaSqFt,
      areaCents: plot.areaCents,
      facing: plot.facing,
      road: plot.road,
      price: Math.floor(2500000 + Math.random() * 1000000), // Dummy price between 2.5MB and 3.5M
      status: "available",
    }));

    // Clear existing plots for this project
    await Plot.deleteMany({ projectId: project._id });

    // 4. Insert Plots
    const insertedPlots = await Plot.insertMany(plotsToInsert);
    console.log(`${insertedPlots.length} plots inserted for ${project.name}`);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
