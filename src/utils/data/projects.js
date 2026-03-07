import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Plot from "@/models/Plot";

/**
 * Fetches all projects from the database.
 * Use this in Server Components for initial page load.
 */
export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).lean();
  return JSON.parse(JSON.stringify(projects));
}

/**
 * Fetches a single project by its slug.
 */
export async function getProjectBySlug(slug) {
  await dbConnect();
  const project = await Project.findOne({ slug }).lean();
  if (!project) return null;
  return JSON.parse(JSON.stringify(project));
}

/**
 * Fetches all plots associated with a project slug.
 */
export async function getProjectPlots(slug) {
  await dbConnect();
  const project = await Project.findOne({ slug }).select("_id").lean();
  if (!project) return [];

  const plots = await Plot.find({ projectId: project._id }).lean();
  return JSON.parse(JSON.stringify(plots));
}
