import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import * as XLSX from "xlsx";

export async function GET(request) {
  try {
    // 1. Verify Admin Auth
    const authObj = await auth();
    let role = authObj.sessionClaims?.metadata?.role || authObj.sessionClaims?.publicMetadata?.role;
    
    if (!role && authObj.userId) {
      const client = await clerkClient();
      const user = await client.users.getUser(authObj.userId);
      role = user.publicMetadata?.role;
    }

    if (role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Fetch Data from Database
    await dbConnect();
    const Project = (await import("@/models/Project")).default;
    const Plot = (await import("@/models/Plot")).default;

    const projects = await Project.find({}).lean();
    const plots = await Plot.find({}).lean();

    // Create a map for quick project name lookup
    const projectMap = {};
    projects.forEach(p => {
      projectMap[p._id.toString()] = p.name;
    });

    // 3. Format Data into JSON rows for Excel
    const rows = plots.map(plot => {
      const projectName = projectMap[plot.projectId?.toString()] || "Unknown Project";
      
      // Determine Customer Info
      let customerName = "";
      let customerPhone = "";
      let customerAadhar = "";
      
      const customerData = plot.customer || plot.customers || [];
      if (Array.isArray(customerData) && customerData.length > 0) {
        customerName = customerData.map(c => c.name).filter(Boolean).join(" & ");
        customerPhone = customerData.map(c => c.phone).filter(Boolean).join(" & ");
        customerAadhar = customerData.map(c => c.aadharNumber || c.aadhar).filter(Boolean).join(" & ");
      } else if (typeof customerData === "object" && customerData !== null && !Array.isArray(customerData)) {
        customerName = customerData.name || "";
        customerPhone = customerData.phone || "";
        customerAadhar = customerData.aadharNumber || customerData.aadhar || "";
      }

      return {
        "Project Name": projectName,
        "Plot Number": plot.plotNumber || "",
        "Status": (plot.status || "available").toUpperCase(),
        "Area (Sq.Ft)": plot.areaSqFt || "-",
        "Area (Cents)": plot.areaCents || "-",
        "Facing": plot.facing || "-",
        "Road Access": plot.road || "-",
        "Owner/Customer Name": customerName || "-",
        "Customer Phone": customerPhone || "-",
        "Aadhaar Number": customerAadhar || "-"
      };
    });

    // 4. Generate Excel File Setup
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Auto-size columns slightly for neatness
    const columnWidths = [
      { wch: 25 }, // Project Name
      { wch: 15 }, // Plot Number
      { wch: 15 }, // Status
      { wch: 15 }, // Area SqFt
      { wch: 15 }, // Area Cents
      { wch: 15 }, // Facing
      { wch: 20 }, // Road Access
      { wch: 30 }, // Owner Name
      { wch: 20 }, // Phone
      { wch: 20 }, // Aadhaar
    ];
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Real Estate Report");

    // Convert to Buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // 5. Return Response
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="Real_Estate_Report.xlsx"',
      },
    });

  } catch (error) {
    console.error("Error generating export report:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
