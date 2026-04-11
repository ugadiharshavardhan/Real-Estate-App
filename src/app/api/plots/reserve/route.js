import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plot from "@/models/Plot";
import Project from "@/models/Project";

export async function POST(request) {
  try {
    const { plotNumber, projectSlug, name, phone, email } = await request.json();

    if (!plotNumber || !projectSlug || !name || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the project ID
    const project = await Project.findOne({ slug: projectSlug }).lean();
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Find the plot and ensure it is available
    const plot = await Plot.findOne({
      projectId: project._id,
      plotNumber: plotNumber,
    });

    if (!plot) {
      return NextResponse.json(
        { success: false, error: "Plot not found" },
        { status: 404 }
      );
    }

    // Double check availability AND resolve any expired reservations before proceeding
    if (plot.status === "reserved" && plot.reservedUntil && plot.reservedUntil < new Date()) {
       // If it was reserved but expired, we can take it
       plot.status = "available";
       plot.customer = [];
       plot.reservedAt = null;
       plot.reservedUntil = null;
    } else if (plot.status !== "available") {
      return NextResponse.json(
        { success: false, error: `Plot is currently ${plot.status}` },
        { status: 400 }
      );
    }

    // Update plot to Reserved
    plot.status = "reserved";
    plot.customer = [{ name, phone, email }];
    plot.reservedAt = new Date();
    
    // Set expiration for 24 hours from now
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 24);
    plot.reservedUntil = expiration;

    await plot.save();

    return NextResponse.json({ success: true, data: plot });
  } catch (error) {
    console.error("Error reserving plot:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reserve plot" },
      { status: 500 }
    );
  }
}
