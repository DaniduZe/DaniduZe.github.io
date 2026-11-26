import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ContactSection } from './components/ContactSection';
import { CaseStudyDrawer } from './components/CaseStudyDrawer';
import type { ProjectItem } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#0A0A0A] text-[#EDEDED]">
        {/* Subtle 1px Architectural Guide Rails on Desktop (matches Figma 1440px x=80 / x=1360) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 mx-auto hidden max-w-[1440px] lg:block"
        >
          <div className="absolute inset-y-0 left-20 w-px bg-[#161618]" />
          <div className="absolute inset-y-0 right-20 w-px bg-[#161618]" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <ProjectsSection onSelectProject={setSelectedProject} />
            <CapabilitiesBento />
            <JourneyTimeline />
            <ContactSection />
          </main>
        </div>

        <CaseStudyDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
