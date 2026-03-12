import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-800 pt-16 md:pt-20 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold font-playfair tracking-tight text-white">
                <span className="text-green-400">VEN</span>TRIVO
              </span>
            </div>
            <p className="text-gray-200 font-inter leading-relaxed text-sm opacity-80">
              We create unparalleled luxury real estate experiences, blending
              timeless design with sustainable living across prime locations.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:ml-12">
            <h4 className="font-playfair text-xl font-bold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 font-inter text-gray-200 text-sm opacity-80">
              {["Our Story", "Our Projects", "Blogs", "Testimonials", "Career"].map(
                (link) => (
                  <li key={link}>
                    {link === "Career" ? (
                      <Link
                        href="/careers"
                        className="hover:text-green-400 transition-colors relative group w-fit flex"
                      >
                        {link}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 transition-all group-hover:w-full"></span>
                      </Link>
                    ) : (
                      <a
                        href={`/#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-green-400 transition-colors relative group w-fit flex"
                      >
                        {link}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 transition-all group-hover:w-full"></span>
                      </a>
                    )}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-playfair text-xl font-bold text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-5 font-inter text-gray-200 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <MapPin className="text-green-400 shrink-0 mt-0.5" size={18} />
                <span>
                  Muddavaram Village, Bethamcherla Mandal, Kurnool District
                  <br />
                  Andhra Pradesh, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-green-400 shrink-0" size={18} />
                <a
                  href="tel:+919652776025"
                  className="hover:text-green-400 transition-colors"
                >
                  +91 9652776025
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-green-400 shrink-0" size={18} />
                <a
                  href="mailto:info@ventrivo.com"
                  className="hover:text-green-400 transition-colors"
                >
                  info@ventrivo.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="font-playfair text-xl font-bold text-white mb-6">
              Follow Us
            </h4>
            <p className="text-gray-200 font-inter text-sm mb-6 opacity-80">
              Join our community to stay updated on new projects and exclusive
              offers.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, url: "https://facebook.com" },
                { Icon: Twitter, url: "https://twitter.com" },
                { Icon: Instagram, url: "https://instagram.com" },
                { Icon: Linkedin, url: "https://linkedin.com" },
              ].map(({ Icon, url }, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-green-400 hover:text-green-900 hover:border-green-400 transition-all shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 font-inter">
          <p>&copy; 2026 VENTRIVO. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
