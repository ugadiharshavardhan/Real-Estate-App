import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { serialize } from "@/utils/serialization";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();
    const project = await Project.findOne({ slug }).lean();

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: serialize(project) });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
