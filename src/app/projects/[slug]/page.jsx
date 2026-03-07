import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectPlots } from "@/utils/data/projects";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import LocationHighlights from "@/components/project/LocationHighlights";
import InteractiveMap from "@/components/project/InteractiveMap";
import VentureMapWrapper from "@/components/project/VentureMapWrapper";
import ProjectGallery from "@/components/project/ProjectGallery";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} | Real Estate App`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  // Fetch data directly on the server
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const plots = await getProjectPlots(slug);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <ProjectHero project={project} />

      <ProjectOverview project={project} />

      <ProjectAmenities amenities={project.amenities} />

      {/* Interactive Map */}
      {slug === "ugadi-ventures" ? (
        <VentureMapWrapper projectSlug={slug} />
      ) : (
        <InteractiveMap plots={plots} layoutSvg={project.layoutSvg} />
      )}

      <LocationHighlights highlights={project.locationHighlights} />

      <ProjectGallery project={project} />

      <Footer />
    </main>
  );
}
