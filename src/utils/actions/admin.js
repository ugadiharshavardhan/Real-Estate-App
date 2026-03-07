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

    const updateFields = { status };
    if (customerData) {
      updateFields.customer = customerData;
    } else if (status === "available" || status === "mortgaged") {
      // Clear customer data for these statuses
      updateFields.customer = {
        name: "",
        email: "",
        phone: "",
        address: "",
      };
    }

    const plot = await Plot.findByIdAndUpdate(plotId, updateFields, {
      new: true,
    });

    if (!plot) throw new Error("Plot not found");

    revalidatePath("/admin/plots");
    revalidatePath(`/projects/${plot.projectId}`);

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

    const plot = await Plot.findByIdAndUpdate(plotId, data, {
      new: true,
    });

    if (!plot) throw new Error("Plot not found");

    revalidatePath("/admin/plots");
    // Also revalidate the project page where this plot might be displayed
    revalidatePath(`/projects/${plot.projectId}`);

    return { success: true, data: JSON.parse(JSON.stringify(plot)) };
  } catch (error) {
    console.error("Error updating plot:", error);
    return { success: false, error: error.message };
  }
}
