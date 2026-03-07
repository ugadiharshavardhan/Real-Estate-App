import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plot from "@/models/Plot";
import Project from "@/models/Project";
import MapData from "@/models/MapData";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectSlug = searchParams.get("projectSlug") || "ugadi-ventures";

    await dbConnect();
    const project = await Project.findOne({ slug: projectSlug });
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 },
      );
    }

    // 1. Fetch GeoJSON from MongoDB MapData instead of local files
    const mapDataRecord = await MapData.findOne({
      projectSlug,
      layerType: "plots",
    });
    if (
      !mapDataRecord ||
      !mapDataRecord.geoJson ||
      !mapDataRecord.geoJson.features
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Plot GeoJSON not found in database for this project",
        },
        { status: 404 },
      );
    }

    const geojsonData = mapDataRecord.geoJson;

    // 2. Load enriched metadata from plotData.json if available
    let enrichedMetadata = {};
    try {
      const metadataPath = path.join(
        process.cwd(),
        "src",
        "data",
        "plotData.json",
      );
      if (fs.existsSync(metadataPath)) {
        const raw = fs.readFileSync(metadataPath, "utf-8");
        const list = JSON.parse(raw);
        list.forEach((item) => {
          enrichedMetadata[item.number] = item;
        });
      }
    } catch (err) {
      console.warn("Failed to load plotData.json enrichment:", err.message);
    }

    const ops = [];
    for (const feature of geojsonData.features) {
      const { properties } = feature;

      let plotNumberRaw =
        properties.plot_no ||
        properties.name ||
        properties.plot_id ||
        properties.id;
      if (!plotNumberRaw) continue;

      const plotStr = String(plotNumberRaw);
      const plotNumber = plotStr.replace(/[^0-9]/g, "");

      if (!plotNumber) continue;

      // Merge GeoJSON properties with enriched metadata
      const metadata = enrichedMetadata[plotNumber] || {};

      // Construct update object - only set fields that have valid data
      // Use $set for identifying fields and $setOnInsert or conditional for metadata
      const updateDoc = {
        $set: {
          projectId: project._id,
          plotId: metadata.id || `plot-${plotNumber}`,
          plotNumber: plotNumber,
        },
        $setOnInsert: {
          status: properties.status || "available",
        },
      };

      // If GeoJSON explicitly has a status, we might want to update it?
      // In our current flow, the DB is the source of truth for status (managed by Admin).
      // So we should NOT overwrite status from GeoJSON properties if it already exists in DB.
      // $setOnInsert handles this for new plots.

      // Only update metadata if it's explicitly provided from the enrichment source
      // This prevents overwriting existing DB data with "0" or "Unknown"
      const metadataUpdates = {};
      if (metadata.areaSqFt) metadataUpdates.areaSqFt = metadata.areaSqFt;
      if (metadata.areaCents) metadataUpdates.areaCents = metadata.areaCents;
      if (metadata.facing) metadataUpdates.facing = metadata.facing;
      if (metadata.road) metadataUpdates.road = metadata.road;

      if (Object.keys(metadataUpdates).length > 0) {
        updateDoc.$set = { ...updateDoc.$set, ...metadataUpdates };
      }

      ops.push({
        updateOne: {
          filter: { plotNumber: plotNumber, projectId: project._id },
          update: updateDoc,
          upsert: true,
        },
      });
    }

    if (ops.length > 0) {
      await Plot.bulkWrite(ops);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synchronized ${ops.length} plots using database GeoJSON and metadata.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
