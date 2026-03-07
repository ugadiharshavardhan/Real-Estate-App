import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plot from "@/models/Plot";
import Project from "@/models/Project";
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
                { status: 404 }
            );
        }

        // Try reading Plots.json mapped to plots.json
        let filePath = path.join(process.cwd(), "public", "maps", "Plots.json");
        if (!fs.existsSync(filePath)) {
            filePath = path.join(process.cwd(), "public", "maps", "plots.json");
            if (!fs.existsSync(filePath)) {
                return NextResponse.json(
                    { success: false, error: "GeoJSON properties file not found" },
                    { status: 404 }
                );
            }
        }

        const geojsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (!geojsonData.features) {
            return NextResponse.json(
                { success: false, error: "Invalid GeoJSON format" },
                { status: 400 }
            );
        }

        const ops = [];
        for (const feature of geojsonData.features) {
            const { properties } = feature;

            // Look for plot_no or name in properties (from Plots.json we saw name like "plot-26")
            let plotNumberRaw = properties.plot_no || properties.name || properties.plot_id || properties.id;
            if (!plotNumberRaw) continue;

            // Extract number from "plot-X" if necessary
            const plotStr = String(plotNumberRaw);
            const plotNumber = plotStr.replace(/[^0-9]/g, '');

            if (!plotNumber) continue;

            const plotData = {
                projectId: project._id,
                plotId: `plot-${plotNumber}`,
                plotNumber: plotNumber,
                areaSqFt: properties.area || 0,
                status: "available", // default status
            };

            ops.push({
                updateOne: {
                    filter: { plotNumber: plotNumber, projectId: project._id },
                    update: { $set: plotData },
                    upsert: true,
                },
            });
        }

        if (ops.length > 0) {
            await Plot.bulkWrite(ops);
        }

        return NextResponse.json({
            success: true,
            message: `Successfully synchronized ${ops.length} plots with the database.`,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
