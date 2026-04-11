import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plot from "@/models/Plot";
import Project from "@/models/Project";
import { serialize } from "@/utils/serialization";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectSlug = searchParams.get("projectSlug");
        const search = searchParams.get("search");

        await dbConnect();
        let query = {};
        
        if (projectSlug) {
            const project = await Project.findOne({ slug: projectSlug });
            if (project) {
                query.projectId = project._id;
            } else {
                return NextResponse.json(
                    { success: false, error: "Project not found" },
                    { status: 404 }
                );
            }
        }

        if (search) {
            query.$or = [
                { plotNumber: { $regex: search, $options: "i" } },
                { status: { $regex: search, $options: "i" } },
                { "customer.name": { $regex: search, $options: "i" } },
                { facing: { $regex: search, $options: "i" } }
            ];
        }

        // Auto-expire reservations that are past 24 hours
        await Plot.updateMany(
            { status: "reserved", reservedUntil: { $lt: new Date() } },
            { $set: { status: "available", customer: [], reservedAt: null, reservedUntil: null } }
        );

        const plots = await Plot.find(query).lean();
        return NextResponse.json({ success: true, data: serialize(plots) });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
