import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/utils/data/projects";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import LocationHighlights from "@/components/project/LocationHighlights";
import VentureMapWrapper from "@/components/project/VentureMapWrapper";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectNavbar from "@/components/project/ProjectNavbar";
import PaymentOption from "@/components/project/PaymentOption";
import ProjectDevelopment from "@/components/project/ProjectDevelopment";
import RouteSection from "@/components/project/RouteSection";

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

  return (
    <main className="min-h-screen bg-white">
      <Navbar isAbsolute={true} />

      <ProjectHero project={project} />

      <ProjectNavbar layoutSvg={project.layoutSvg} />

      {/* Interactive Map - Plot Availability */}
      <div id="plot-availability">
        <VentureMapWrapper projectSlug={slug} />
      </div>

      {/* Get Route Feature */}
      <div id="get-route">
        <RouteSection
          ventureCoords={{ lat: project.latitude, lng: project.longitude }}
          ventureName={project.name}
        />
      </div>

      <div id="project-info">
        <ProjectOverview project={project} />
      </div>

      <PaymentOption />

      <div id="amenities">
        <ProjectAmenities amenities={project.amenities} />
      </div>

      <ProjectDevelopment />

      <div id="location-highlights">
        <LocationHighlights highlights={project.locationHighlights} />
      </div>

      <ProjectGallery project={project} />

      <Footer />
    </main>
  );
}
