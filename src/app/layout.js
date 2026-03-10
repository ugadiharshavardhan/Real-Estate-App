import { Suspense } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import ProgressBar from "@/components/ProgressBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "LuxEstate | Luxury Real Estate",
  description: "Premium real estate developments across prime locations.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${playfair.variable} ${inter.variable} font-inter antialiased`}
        >
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          {children}
          <ScrollToTop />
        </body>
      </html>
    </ClerkProvider>
  );
}