import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plot from "@/models/Plot";
import Project from "@/models/Project";
import { serialize } from "@/utils/serialization";

export async function GET(request, { params }) {
    try {
        const { plotNo } = await params;
        const { searchParams } = new URL(request.url);
        const projectSlug = searchParams.get("projectSlug");

        await dbConnect();

        let query = { plotNumber: plotNo };

        // Scope by project if slug provided
        if (projectSlug) {
            const project = await Project.findOne({ slug: projectSlug });
            if (project) {
                query.projectId = project._id;
            }
        }

        let plot = await Plot.findOne(query);
        if (!plot) {
            return NextResponse.json(
                { success: false, error: "Plot not found" },
                { status: 404 }
            );
        }

        // Auto-expire reservation if past 24 hours
        if (plot.status === "reserved" && plot.reservedUntil && plot.reservedUntil < new Date()) {
            plot.status = "available";
            plot.customer = [];
            plot.reservedAt = null;
            plot.reservedUntil = null;
            await plot.save();
        }

        return NextResponse.json({ success: true, data: serialize(plot.toObject?.() || plot) });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        const { plotNo } = await params;
        const body = await request.json();

        await dbConnect();
        const updatedPlot = await Plot.findOneAndUpdate({ plotNumber: plotNo }, body, {
            new: true,
            runValidators: true,
        }).lean();

        if (!updatedPlot) {
            return NextResponse.json(
                { success: false, error: "Plot not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: serialize(updatedPlot) });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
