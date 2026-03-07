import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plot from "@/models/Plot";
import Project from "@/models/Project";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectSlug = searchParams.get("projectSlug");

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

        const plots = await Plot.find(query);
        return NextResponse.json({ success: true, data: plots });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
