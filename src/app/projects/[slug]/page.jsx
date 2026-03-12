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

import { SITE_CONFIG } from "@/lib/seo-config";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  const url = `${SITE_CONFIG.url}/projects/${slug}`;

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} | ${SITE_CONFIG.name}`,
      description: project.description,
      url: url,
      type: "article",
      images: [
        {
          url: project.heroImage || SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | ${SITE_CONFIG.name}`,
      description: project.description,
      images: [project.heroImage || SITE_CONFIG.ogImage],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  // Fetch data directly on the server
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.description,
    image: project.heroImage || SITE_CONFIG.ogImage,
    url: `${SITE_CONFIG.url}/projects/${slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location || "Hyderabad", // Use actual location if available
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
