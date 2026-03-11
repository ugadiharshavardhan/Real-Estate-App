import {
  ShieldCheck,
  Trees,
  Leaf,
  Navigation,
  Droplets,
  Zap,
} from "lucide-react";

const iconMap = {
  ShieldCheck: ShieldCheck,
  Trees: Trees,
  Leaf: Leaf,
  Road: Navigation,
  Droplets: Droplets,
  Zap: Zap,
};

export default function ProjectAmenities({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
            World-Class Amenities
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Designed for comfort, security, and a premium lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, idx) => {
            const Icon = iconMap[item.icon] || Trees;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-[#1B4332]/10 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-[#1B4332]" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 font-playfair group-hover:text-[#1B4332] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-inter">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
