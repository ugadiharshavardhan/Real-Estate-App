import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Plot from "@/models/Plot";
import { serialize } from "../serialization";

/**
 * Fetches all projects from the database.
 */
export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).lean();
  return serialize(projects);
}

/**
 * Fetches a single project by its slug.
 */
export async function getProjectBySlug(slug) {
  if (!slug) return null;
  await dbConnect();
  const project = await Project.findOne({ slug }).lean();
  return serialize(project);
}

/**
 * Fetches all plots associated with a project slug.
 */
export async function getProjectPlots(slug) {
  if (!slug) return [];
  await dbConnect();
  const project = await Project.findOne({ slug }).select("_id").lean();
  if (!project) return [];

  const plots = await Plot.find({ projectId: project._id }).lean();
  return serialize(plots);
}
