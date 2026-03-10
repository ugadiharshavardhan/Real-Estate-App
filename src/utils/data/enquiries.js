import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { serialize } from "../serialization";

/**
 * Fetches all enquiries from the database.
 */
export async function getEnquiries() {
  await dbConnect();
  const data = await Enquiry.find({})
    .populate("projectId", "name")
    .sort({ createdAt: -1 })
    .lean();
  return serialize(data);
}
