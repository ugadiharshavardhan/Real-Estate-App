import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import Recognitions from "../components/Recognitions";
import StarProjects from "../components/StarProjects";
import OurStory from "../components/OurStory";
import Blogs from "../components/Blogs";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { getProjects } from "@/utils/data/projects";

import { SITE_CONFIG } from "@/lib/seo-config";

export const metadata = {
  title: "Modern Luxury Real Estate", // This will be prefixed by "LuxEstate | " due to template
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  openGraph: {
    title: `Home | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    images: [SITE_CONFIG.ogImage],
  },
  twitter: {
    title: `Home | ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
};

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-white">
      <HeroCarousel projects={projects} />
      <Recognitions projectsCount={projects.length} />
      <StarProjects projects={projects} />
      <OurStory />
      <Blogs />
      <Testimonials />
      <Newsletter projects={projects} />
      <Footer />
    </main>
  );
}
