export const SITE_CONFIG = {
  name: "LuxEstate",
  titleSuffix: "Luxury Real Estate",
  description: "Premium real estate developments across prime locations. Experience modern luxury with our curated selection of villas, plots, and apartments.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://luxury-real-estate-app.vercel.app", // Fallback URL
  ogImage: "/images/og-image.jpg", // Make sure this exists or is generated
  twitterHandle: "@luxestate",
  contact: {
    email: "info@luxestate.com",
    phone: "+91 99999 99999",
    address: "Hitech City, Hyderabad, India",
  },
  socials: {
    facebook: "https://facebook.com/luxestate",
    instagram: "https://instagram.com/luxestate",
    linkedin: "https://linkedin.com/company/luxestate",
  },
  keywords: ["luxury real estate", "villas", "plots", "high-rise apartments", "investment", "modern living"],
};
