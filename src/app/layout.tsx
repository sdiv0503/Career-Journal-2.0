import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Industry-standard clean sans-serif
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

// 1. Configure Next/Font
// 'display: swap' ensures text is visible immediately before the font fully loads
const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  variable: "--font-inter" 
});

// 2. Global Metadata & OpenGraph (LinkedIn / Instagram / GitHub)
export const metadata: Metadata = {
  title: {
    template: "%s | Career Journal", // Automatically appends your site name
    default: "Career Journal | AI Resume Analyzer", 
  },
  description: "An AI-powered career growth platform. Analyze your tech resume, track daily coding habits, and ace mock interviews.",
  keywords: ["Resume Analyzer", "ATS Scanner", "Developer Journal", "Mock Interview AI", "Career Roadmap"],
  authors: [{ name: "Divyansh" }], // Personal branding
  openGraph: {
    title: "Career Journal | Build Habits, Get Hired",
    description: "Level up your tech career with AI-driven resume feedback and gamified habit tracking.",
    url: "https://careerjournal2.vercel.app", // Replace when you deploy!
    siteName: "Career Journal",
    images: [
      {
        url: "/og-image.png", // We will need to put an image in the /public folder
        width: 1200,
        height: 630,
        alt: "Career Journal Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Note: Twitter tags omitted as requested. OpenGraph covers LinkedIn, iMessage, Instagram links, etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        {/* Apply the font globally to the body */}
        <body className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
          {children}
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}