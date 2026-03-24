require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');

async function fixDb() {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    console.log("Connecting to:", uri ? "URI found" : "URI missing");
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    
    // Update any project pointing to the SVG layout to use the PNG layout
    const result = await db.collection('projects').updateMany(
      { layoutSvg: { $in: ["/PYALAKURTI_LAYOUT.svg", "/layouts/ugadi-layout.svg"] } },
      { $set: { layoutSvg: "/PYALAKURTI  VENTURE LAYOUT.png" } }
    );
    
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s).`);
  } catch (e) {
    console.error("Error:", e.message);
  } finally {
    process.exit(0);
  }
}
fixDb();
