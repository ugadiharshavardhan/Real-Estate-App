import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProjectGallery({ project }) {
  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-playfair font-bold mb-4 text-[#1B4332]">
              Project Gallery
            </h2>
            <p className="text-gray-600 font-inter text-lg">
              Glimpses of what awaits you at {project.name}.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#1B4332] hover:text-[#133024] transition-colors uppercase tracking-widest text-sm font-bold group">
            View All{" "}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((img, idx) => (
            <div
              key={idx}
              className="relative h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-500"
            >
              <Image
                src={img}
                alt={`Gallery Image ${idx + 1}`}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#1B4332]/0 group-hover:bg-[#1B4332]/10 transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
