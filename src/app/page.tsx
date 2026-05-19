import React, { Suspense, lazy } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Lazy load features for better performance and Suspense support
const ProfileSection = lazy(() => import("@/features/profile").then(m => ({ default: m.ProfileSection })));
const AboutSection = lazy(() => import("@/features/about").then(m => ({ default: m.AboutSection })));
const ProjectsGrid = lazy(() => import("@/features/projects").then(m => ({ default: m.ProjectsGrid })));
const ResumeSection = lazy(() => import("@/features/resume").then(m => ({ default: m.ResumeSection })));
const ContactForm = lazy(() => import("@/features/contact").then(m => ({ default: m.ContactForm })));

const LoadingSection = () => (
  <div className="w-full h-32 flex items-center justify-center opacity-50 font-mono text-xs animate-pulse">
    [ LOADING MODULE... ]
  </div>
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="space-y-20 md:space-y-32 pb-20 md:pb-32">
        <Suspense fallback={<div className="h-screen w-full bg-background" />}>
          <ProfileSection />
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <AboutSection />
        </Suspense>

          <Suspense fallback={<LoadingSection />}>
            <ResumeSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <ProjectsGrid />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <ContactForm />
          </Suspense>
      </div>
      <Footer />
    </main>
  );
}
