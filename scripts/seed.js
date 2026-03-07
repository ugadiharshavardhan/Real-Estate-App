const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env.local") });

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

    // 2. Define Plots data locally to avoid external JSON dependency
    const plotsData = [
      { "id": "plot-1", "number": "1", "areaSqFt": 1983, "areaCents": 4.55, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-2", "number": "2", "areaSqFt": 1950, "areaCents": 4.48, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-3", "number": "3", "areaSqFt": 1950, "areaCents": 4.48, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-4", "number": "4", "areaSqFt": 1950, "areaCents": 4.48, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-5", "number": "5", "areaSqFt": 1625, "areaCents": 3.73, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-6", "number": "6", "areaSqFt": 1625, "areaCents": 3.73, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-7", "number": "7", "areaSqFt": 1625, "areaCents": 3.73, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-8", "number": "8", "areaSqFt": 1625, "areaCents": 3.73, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-9", "number": "9", "areaSqFt": 1381, "areaCents": 3.17, "facing": "East Facing", "road": "25' Wide Road" },
      { "id": "plot-10", "number": "10", "areaSqFt": 942, "areaCents": 2.16, "facing": "West Facing", "road": "25' Wide Road" },
      { "id": "plot-11", "number": "11", "areaSqFt": 1375, "areaCents": 3.15, "facing": "West Facing", "road": "25' Wide Road" },
      { "id": "plot-12", "number": "12", "areaSqFt": 1375, "areaCents": 3.15, "facing": "West Facing", "road": "25' Wide Road" },
      { "id": "plot-13", "number": "13", "areaSqFt": 1375, "areaCents": 3.15, "facing": "West Facing", "road": "25' Wide Road" },
      { "id": "plot-14", "number": "14", "areaSqFt": 1375, "areaCents": 3.15, "facing": "West Facing", "road": "25' Wide Road" },
      { "id": "plot-15", "number": "15", "areaSqFt": 1650, "areaCents": 3.79, "facing": "North-West Corner", "road": "30' & 25' Wide Roads" },
      { "id": "plot-16", "number": "16", "areaSqFt": 1650, "areaCents": 3.79, "facing": "North Facing", "road": "30' Wide Road" },
      { "id": "plot-17", "number": "17", "areaSqFt": 1650, "areaCents": 3.79, "facing": "North Facing", "road": "30' Wide Road" },
      { "id": "plot-18", "number": "18", "areaSqFt": 1650, "areaCents": 3.79, "facing": "North Facing", "road": "30' Wide Road" },
      { "id": "plot-19", "number": "19", "areaSqFt": 2478, "areaCents": 5.69, "facing": "East Facing", "road": "Kodumar Road" },
      { "id": "plot-20", "number": "20", "areaSqFt": 2300, "areaCents": 5.28, "facing": "East Facing", "road": "Kodumar Road" },
      { "id": "plot-21", "number": "21", "areaSqFt": 2119, "areaCents": 4.86, "facing": "East Facing", "road": "Kodumar Road" },
      { "id": "plot-22", "number": "22", "areaSqFt": 2964, "areaCents": 6.80, "facing": "East Facing", "road": "Kodumar Road" },
      { "id": "plot-23", "number": "23", "areaSqFt": 3390, "areaCents": 7.78, "facing": "North-East Corner", "road": "30' Road & Kodumar Road" },
      { "id": "plot-24", "number": "24", "areaSqFt": 1203, "areaCents": 2.76, "facing": "South Facing", "road": "30' Wide Road" },
      { "id": "plot-25", "number": "25", "areaSqFt": 1712, "areaCents": 3.93, "facing": "South Facing", "road": "30' Wide Road" },
      { "id": "plot-26", "number": "26", "areaSqFt": 1935, "areaCents": 4.44, "facing": "East Facing", "road": "10' Road" },
      { "id": "plot-27", "number": "27", "areaSqFt": 2258, "areaCents": 5.18, "facing": "South-West Corner", "road": "30' & 10' Roads" },
      { "id": "plot-28", "number": "28", "areaSqFt": 1504, "areaCents": 3.45, "facing": "South-East Corner", "road": "30' Road & Pyalakurthi Road" },
      { "id": "plot-29", "number": "29", "areaSqFt": 2305, "areaCents": 5.29, "facing": "East Facing", "road": "Pyalakurthi Road" }
    ];

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
