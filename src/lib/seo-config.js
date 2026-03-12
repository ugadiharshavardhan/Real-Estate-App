export const SITE_CONFIG = {
  name: "Ventrivo",
  titleSuffix: "Ventrivo Real Estate",
  description: "Premium real estate developments across prime locations. Experience modern luxury with our curated selection of villas, plots, and apartments.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ventrivo.vercel.app", // Fallback URL
  ogImage: "/images/og-image.jpg", // Make sure this exists or is generated
  twitterHandle: "@ventrivo",
  contact: {
    email: "info@ventrivo.com",
    phone: "+91 99999 99999",
    address: "Hitech City, Hyderabad, India",
  },
  socials: {
    facebook: "https://facebook.com/ventrivo",
    instagram: "https://instagram.com/ventrivo",
    linkedin: "https://linkedin.com/company/ventrivo",
  },
  keywords: ["Ventrivo", "Ventrivo Real Estate", "villas", "plots", "high-rise apartments", "investment", "modern living"],
};
