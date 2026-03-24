require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');
const fs = require('fs');

async function check() {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const projects = await db.collection('projects').find({}).toArray();
    const data = projects.map(p => ({
      name: p.name,
      slug: p.slug,
      layoutSvg: p.layoutSvg
    }));
    fs.writeFileSync('db_projects.json', JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Error:", e.message);
  } finally {
    process.exit(0);
  }
}
check();
