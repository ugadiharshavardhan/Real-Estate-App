import Image from "next/image";
import { MapPin } from "lucide-react";

export default function LocationHighlights({ highlights }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4 inline-flex flex-col sm:flex-row sm:items-center gap-4">
            Location Highlights
            <span className="bg-[#1B4332]/10 text-[#1B4332] text-xs sm:text-sm py-1 px-3 rounded-full font-bold uppercase tracking-widest font-inter">
              Kurnool
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-inter max-w-2xl">
            Strategic location with excellent connectivity to major landmarks
            and essential services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#1B4332] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.distance} Away
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70 font-inter text-xs sm:text-sm md:text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
}
