import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Background3D } from "@/components/canvas/Background3D";
import { SettingsProvider } from "@/context/SettingsContext";
import { AuthProvider } from "@/context/AuthContext";
import { SettingsModal } from "@/components/ui/SettingsModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ranjeet.ai"),
  title: "Ranjeet Kumar | AI Engineer & Innovator",
  description: "Portfolio of Ranjeet Kumar, an AI Engineer specializing in Machine Learning, Web Development, and Emerging Technologies.",
  keywords: ["AI Engineer", "Machine Learning", "Web Development", "Ranjeet Kumar", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Ranjeet Kumar" }],
  openGraph: {
    title: "Ranjeet Kumar | AI Engineer & Innovator",
    description: "Building intelligent, AI-powered solutions for the future.",
    url: "https://ranjeet.ai", // Placeholder
    siteName: "Ranjeet Kumar Portfolio",
    images: [
      {
        url: "/assets/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ranjeet Kumar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import { LoadingScreen } from "@/components/ui/LoadingScreen";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <SettingsProvider>
        <AuthProvider>
          <body className="antialiased font-sans bg-background text-foreground selection:bg-primary-start/30 selection:text-white pb-20 sm:pb-0 transition-colors duration-300">
            <LoadingScreen />
            <Navbar />
            <SettingsModal />
            <Background3D />
            {children}
          </body>
        </AuthProvider>
      </SettingsProvider>
    </html>
  );
}
