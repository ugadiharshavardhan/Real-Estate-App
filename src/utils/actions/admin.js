"use server";

import dbConnect from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

/**
 * Update plot status (Available, Reserved, Sold)
 */
export async function updatePlotStatus(plotId, status, customerData = null) {
  try {
    await dbConnect();
    // Defer model import to prevent client-side bundling issues
    const Plot = (await import("@/models/Plot")).default;
    const Project = (await import("@/models/Project")).default;

    const updateFields = { status };
    if (customerData) {
      // Ensure it's an array for the joint registration schema
      updateFields.customer = Array.isArray(customerData) ? customerData : [customerData];
    } else if (status === "available" || status === "mortgaged") {
      updateFields.customer = [];
    }

    console.log("Updating Plot Status for", plotId, "to", status, "with data:", updateFields.customer);

    const plot = await Plot.findByIdAndUpdate(plotId, updateFields, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!plot) throw new Error("Plot not found");

    console.log("Successfully updated plot in DB:", {
      id: plot._id,
      status: plot.status,
      customerCount: plot.customer?.length
    });

    // Fetch project to get slug for revalidation
    const project = await Project.findById(plot.projectId).select("slug");

    revalidatePath("/admin/plots");
    if (project) {
      revalidatePath(`/projects/${project.slug}`);
    }

    return { success: true, data: JSON.parse(JSON.stringify(plot)) };
  } catch (error) {
    console.error("Error updating plot status:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch Admin Dashboard Statistics
 */
export async function getAdminStats() {
  try {
    await dbConnect();
    // Defer model imports to prevent client-side bundling issues
    const Project = (await import("@/models/Project")).default;
    const Plot = (await import("@/models/Plot")).default;
    const Enquiry = (await import("@/models/Enquiry")).default;

    const [totalProjects, totalPlots, occupiedPlots, pendingEnquiries] =
      await Promise.all([
        Project.countDocuments(),
        Plot.countDocuments(),
        Plot.countDocuments({ status: { $ne: "available" } }),
        Enquiry.countDocuments({ status: "pending" }),
      ]);

    return {
      success: true,
      data: {
        totalProjects,
        totalPlots,
        occupiedPlots,
        pendingEnquiries,
        availablePlots: totalPlots - occupiedPlots,
      },
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Update project details
 */
export async function updateProject(projectId, data) {
  try {
    await dbConnect();
    // Defer model import to prevent client-side bundling issues
    const Project = (await import("@/models/Project")).default;

    const project = await Project.findByIdAndUpdate(projectId, data, {
      new: true,
    });

    if (!project) throw new Error("Project not found");

    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${project.slug}`);

    return { success: true, data: JSON.parse(JSON.stringify(project)) };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Create a new project
 */
export async function createProject(data) {
  try {
    await dbConnect();
    const Project = (await import("@/models/Project")).default;

    const project = await Project.create(data);

    revalidatePath("/admin/projects");
    revalidatePath("/");

    return { success: true, data: JSON.parse(JSON.stringify(project)) };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a project
 */
export async function deleteProject(projectId) {
  try {
    await dbConnect();
    const Project = (await import("@/models/Project")).default;
    const Plot = (await import("@/models/Plot")).default;

    const project = await Project.findByIdAndDelete(projectId);
    if (!project) throw new Error("Project not found");

    // Also delete associated plots
    await Plot.deleteMany({ projectId });

    revalidatePath("/admin/projects");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Update enquiry status
 */
export async function updateEnquiryStatus(enquiryId, status) {
  try {
    await dbConnect();
    const Enquiry = (await import("@/models/Enquiry")).default;

    const enquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      { status },
      { new: true },
    );

    if (!enquiry) throw new Error("Enquiry not found");

    revalidatePath("/admin/enquiries");
    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(enquiry)) };
  } catch (error) {
    console.error("Error updating enquiry status:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Update detailed plot information
 */
export async function updatePlot(plotId, data) {
  try {
    await dbConnect();
    const Plot = (await import("@/models/Plot")).default;
    const Project = (await import("@/models/Project")).default;

    const existingPlot = await Plot.findById(plotId);
    console.log("Current Data in DB for", plotId, ":", {
      east: existingPlot?.east,
      west: existingPlot?.west,
      north: existingPlot?.north,
      south: existingPlot?.south,
    });

    console.log("Attempting to save with $set:", {
      areaSqFt: data.areaSqFt,
      areaCents: data.areaCents,
      east: data.east,
      west: data.west,
      north: data.north,
      south: data.south,
    });

    const plot = await Plot.findByIdAndUpdate(
      plotId,
      {
        $set: {
          areaSqFt: data.areaSqFt,
          areaCents: data.areaCents,
          east: data.east,
          west: data.west,
          north: data.north,
          south: data.south,
          facing: data.facing,
          road: data.road,
          price: data.price,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!plot) throw new Error("Plot not found");

    console.log("Freshly Saved Result in DB:", {
      id: plot._id,
      east: plot.east,
      west: plot.west,
      north: plot.north,
      south: plot.south,
    });

    // Fetch project to get slug for revalidation
    const project = await Project.findById(plot.projectId).select("slug");

    revalidatePath("/admin/plots");
    // Also revalidate the project page where this plot might be displayed
    if (project) {
      revalidatePath(`/projects/${project.slug}`);
    }

    return { success: true, data: JSON.parse(JSON.stringify(plot)) };
  } catch (error) {
    console.error("Error updating plot:", error);
    return { success: false, error: error.message };
  }
}
