import Image from "next/image";
import { MapPin } from "lucide-react";

export default function ProjectHero({ project }) {
  if (!project) return null;

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-screen w-full overflow-hidden bg-[#fafafa] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={
            project.heroImage ||
            "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop"
          }
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute left-0 top-0 h-full w-full bg-linear-to-tl from-black/80 via-black/50 to-transparent"/>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-end justify-center h-full w-full pt-20">
        <div className="mb-4 inline-block">
          <span className="bg-[#1B4332] text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full tracking-widest uppercase">
            {project.status || "Ongoing"} Project
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playfair font-bold text-white mb-6 drop-shadow-sm">
          {project.name}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium bg-white/50 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-sm">
            <MapPin className="text-[#1B4332] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
