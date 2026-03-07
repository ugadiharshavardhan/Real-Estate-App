import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Plot from "@/models/Plot";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();

    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 },
      );
    }

    const plots = await Plot.find({ projectId: project._id });
    return NextResponse.json({
      success: true,
      count: plots.length,
      data: plots,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
