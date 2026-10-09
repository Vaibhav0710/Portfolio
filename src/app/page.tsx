import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileSection } from "@/features/profile";
import { AboutSection } from "@/features/about";
import { WorkSection, SkillsSection, EducationSection } from "@/features/resume";
import { ProjectsGrid } from "@/features/projects";
import { ContactSection } from "@/features/contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <ProfileSection />
        <AboutSection />
        <WorkSection />
        <ProjectsGrid />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
