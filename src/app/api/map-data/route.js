import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MapData from "@/models/MapData";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectSlug = searchParams.get("projectSlug");

        if (!projectSlug) {
            return NextResponse.json(
                { success: false, error: "Project slug is required" },
                { status: 400 }
            );
        }

        await dbConnect();
        const data = await MapData.find({ projectSlug });

        // Transform array into an object like { plots: {}, roads: {}, ... }
        const result = {
            plots: null,
            roads: null,
            compounds: null,
            footpaths: null
        };

        data.forEach(item => {
            result[item.layerType] = item.geoJson;
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { projectSlug, layerType, geoJson } = body;

        if (!projectSlug || !layerType || !geoJson) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        await dbConnect();

        const updatedData = await MapData.findOneAndUpdate(
            { projectSlug, layerType },
            { geoJson },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, data: updatedData });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
