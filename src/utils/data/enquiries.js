import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

/**
 * Fetches all enquiries from the database.
 */
export async function getEnquiries() {
  await dbConnect();
  const enquiries = await Enquiry.find({})
    .populate("projectId", "name")
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(enquiries));
}
