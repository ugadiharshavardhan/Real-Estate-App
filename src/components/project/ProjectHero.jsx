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
      <div className="absolute left-0 top-0 h-full w-full bg-linear-to-t from-black/60 via-black/10 to-transparent"/>

      <div className="relative z-10 flex flex-col items-start justify-end h-full w-full px-4 md:px-10 pb-16 md:pb-24 pt-20">
        <div className="mb-4 inline-block">
          <span className="bg-[#1B4332] text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full tracking-widest uppercase">
            {project.status || "Ongoing"} Project
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          {project.name}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-sm">
            <MapPin className="text-green-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
