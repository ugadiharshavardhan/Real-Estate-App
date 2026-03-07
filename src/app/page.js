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

export const metadata = {
  title: "LuxEstate | Modern Luxury Real Estate",
  description:
    "Experience modern luxury real estate with LuxEstate. Premium villas, high-rise apartments, and plotted developments across prime geographic locations.",
  keywords:
    "luxury real estate, villas, plots, high-rise apartments, investment, modern living",
};

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroCarousel />
      <Recognitions />
      <StarProjects projects={projects} />
      <OurStory />
      <Blogs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
