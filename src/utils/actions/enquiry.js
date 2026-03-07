"use server";

import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { revalidatePath } from "next/cache";

/**
 * Server Action to submit an enquiry.
 * Can be called directly from a form's action attribute or via useTransition.
 */
export async function submitEnquiry(prevState, formData) {
  try {
    await dbConnect();

    const name = formData.get("name");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const projectId = formData.get("projectId");

    if (!name || !phone || !message) {
      return { success: false, error: "All fields are required" };
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      message,
      projectId: projectId || undefined,
    });

    // Revalidate paths if necessary (e.g., if there's an admin dashboard showing enquiries)
    // revalidatePath('/admin/enquiries');

    return { success: true, data: JSON.parse(JSON.stringify(enquiry)) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
