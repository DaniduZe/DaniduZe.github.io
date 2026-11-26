import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Linkedin, X } from 'lucide-react';
import { PROFILE } from '../data/profile';
import type { ProjectItem } from '../data/projects';

interface CaseStudyDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function CaseStudyDrawer({ project, onClose }: CaseStudyDrawerProps) {
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-project-title"
        >
          {/* Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-xs"
          />

          {/* Slide-Over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-20 flex h-full w-full max-w-[680px] flex-col border-l border-[#222226] bg-[#0C0C0D]"
          >
            {/* Top Sticky Header */}
            <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-[#18181B] px-5 py-4 sm:px-9 sm:py-5">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#6B6B73]">
                Case study · <span className="text-[#C6F432]">{project.code}</span> · {project.year}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close case study drawer"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#222226] bg-[#0F0F10] text-[#B4B4BB] transition-colors hover:border-[#C6F432]/60 hover:text-[#C6F432] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F432]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-9 sm:py-7">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase text-[#8A8A93]">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-[#C6F432]" />
                {project.tagLine}
              </div>

              <h3
                id="drawer-project-title"
                className="mt-3 text-[28px] leading-[1.08] font-semibold tracking-[-0.035em] text-[#EDEDED] sm:text-[34px]"
              >
                {project.title}
              </h3>

              <p className="mt-3 text-[15px] leading-[1.6] text-[#8A8A93]">{project.overview}</p>

              {/* Drawer Image (Full-Color) */}
              {project.drawerImage && (
                <div className="relative mt-5 overflow-hidden rounded-xl border border-[#1C1C1F] bg-[#111113]">
                  <img
                    src={project.drawerImage}
                    alt={project.drawerImageCaption ?? project.title}
                    className="h-[210px] w-full object-cover sm:h-[240px]"
                  />
                  {project.drawerImageCaption && (
                    <span className="absolute top-3 left-3 inline-flex max-w-[90%] items-center truncate rounded-md border border-[#2A2A2E] bg-[#0A0A0A]/80 px-2.5 py-1 font-mono text-[11px] text-[#C6F432] backdrop-blur-xs">
                      {project.drawerImageCaption}
                    </span>
                  )}
                </div>
              )}

              {/* Metrics Strip */}
              <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-[#1C1C1F] bg-[#0F0F10]">
                {project.metrics.map((kpi, idx) => (
                  <div
                    key={kpi.label}
                    className={`px-3.5 py-3.5 ${
                      idx < project.metrics.length - 1 ? 'border-r border-[#1C1C1F]' : ''
                    }`}
                  >
                    <div className="text-[17px] font-semibold tracking-[-0.03em] text-[#C6F432] sm:text-[21px]">
                      {kpi.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.03em] text-[#6B6B73]">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* System Architecture Diagram */}
              <div className="mt-7">
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#C6F432]">
                  <span className="text-[#55555C]">—</span> System architecture
                </div>
                <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {project.architecture.map((stage) => (
                    <div
                      key={stage.stage}
                      className="rounded-xl border border-[#222226] bg-[#0F0F10] p-3"
                    >
                      <div className="mb-2.5 font-mono text-[10px] tracking-[0.08em] uppercase text-[#C6F432]">
                        {stage.stage}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {stage.nodes.map((node) => (
                          <div
                            key={node}
                            className="rounded-md border border-[#26262A] bg-[#131315] px-2 py-1.5 font-mono text-[10.5px] leading-[1.35] text-[#D4D4D8]"
                          >
                            {node}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Highlights */}
              <div className="mt-7">
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#C6F432]">
                  <span className="text-[#55555C]">—</span> Engineering highlights
                </div>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-[#B4B4BB]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-[#C6F432]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete Tech Stack */}
              <div className="mt-7">
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#C6F432]">
                  <span className="text-[#55555C]">—</span> Stack
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex h-[26px] items-center rounded-md border border-[#222226] bg-[#131315] px-2.5 font-mono text-[11px] text-[#B4B4BB]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="flex shrink-0 flex-wrap items-center gap-2.5 border-t border-[#18181B] bg-[#0C0C0D] px-5 py-4 sm:px-9">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#C6F432] px-4 text-[13px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#d2f857]"
              >
                <Github className="h-4 w-4" />
                View source on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              {project.secondaryLink && (
                <a
                  href={project.secondaryLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#2A2A2E] bg-[#0F0F10] px-4 text-[13px] font-semibold text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {project.secondaryLink.label}
                </a>
              )}

              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#2A2A2E] bg-[#0F0F10] px-4 text-[13px] font-semibold text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432]"
              >
                <Linkedin className="h-3.5 w-3.5" />
                Discuss on LinkedIn
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
