import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plot from "@/models/Plot";

export async function GET(request, { params }) {
    try {
        const { plotNo } = await params;
        await dbConnect();

        // Find by plotNumber to match GeoJSON plot_no
        const plot = await Plot.findOne({ plotNumber: plotNo });
        if (!plot) {
            return NextResponse.json(
                { success: false, error: "Plot not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: plot });
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
        });

        if (!updatedPlot) {
            return NextResponse.json(
                { success: false, error: "Plot not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: updatedPlot });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
