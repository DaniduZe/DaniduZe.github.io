import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type CodeLine,
  type ProjectCategory,
  type ProjectItem,
} from '../data/projects';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const TOKEN_COLORS: Record<NonNullable<CodeLine['tokens'][number]['tone']>, string> = {
  keyword: 'text-[#C6F432]',
  string: 'text-[#9BA3AF]',
  fn: 'text-[#EDEDED]',
  comment: 'text-[#55555C]',
  plain: 'text-[#B4B4BB]',
};

function ProjectVisual({
  project,
  className = 'h-[210px]',
}: {
  project: ProjectItem;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border-b border-[#1C1C1F] bg-[#111113] ${className}`}
    >
      {project.image ? (
        <>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover grayscale contrast-[1.12] brightness-[0.82] transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-95"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent to-[#0F0F10]/90"
          />
        </>
      ) : (
        <div className="flex h-full w-full items-center bg-[#0C0C0D] px-4 pt-11 pb-4 font-mono text-[11px] leading-[1.65]">
          <div className="w-full overflow-hidden">
            {project.codePreview?.map((line, i) => (
              <div key={i} className="flex gap-3.5 whitespace-nowrap">
                <span className="w-4 shrink-0 select-none text-[#3A3A40]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="truncate">
                  {line.tokens.length === 0 ? (
                    '\u00A0'
                  ) : (
                    line.tokens.map((tok, j) => (
                      <span key={j} className={TOKEN_COLORS[tok.tone ?? 'plain']}>
                        {tok.text}
                      </span>
                    ))
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Corner Index & Year Badges */}
      <span className="absolute top-3.5 left-3.5 inline-flex h-6 items-center rounded-md border border-[#2A2A2E] bg-[#0A0A0A]/80 px-2 font-mono text-[11px] text-[#C6F432] backdrop-blur-xs">
        {project.code}
      </span>
      <span className="absolute top-3.5 right-3.5 inline-flex h-6 items-center rounded-md border border-[#2A2A2E] bg-[#0A0A0A]/80 px-2 font-mono text-[11px] text-[#B4B4BB] backdrop-blur-xs">
        {project.year}
      </span>
    </div>
  );
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [showAllMobile, setShowAllMobile] = useState(false);

  const counts = useMemo(() => {
    const map: Record<ProjectCategory, number> = {
      All: PROJECTS.length,
      'IoT & Embedded': 0,
      'Robotics & Electronics': 0,
      AI: 0,
      'Full-Stack': 0,
    };
    for (const p of PROJECTS) {
      for (const c of p.categories) {
        map[c] += 1;
      }
    }
    return map;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section id="work" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 lg:mb-12 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#C6F432] lg:text-xs">
              <span className="text-[#55555C]">01 /</span> Selected work
            </div>
            <h2 className="mt-3.5 max-w-[720px] text-[36px] leading-[1.03] font-semibold tracking-[-0.045em] text-[#EDEDED] sm:text-[46px] lg:mt-4 lg:text-[56px]">
              Systems I&apos;ve built —{' '}
              <span className="text-[#55555C]">from silicon to screen.</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] leading-[1.6] text-[#8A8A93]">
            Eight projects across embedded firmware, robotics, AI and full-stack. Every card opens a
            case study with architecture, stack and source.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter projects by engineering domain"
          className="no-scrollbar -mx-5 mb-7 flex overflow-x-auto px-5 lg:mx-0 lg:px-0"
        >
          <div className="inline-flex gap-1.5 rounded-xl border border-[#1F1F22] bg-[#0E0E0F] p-1">
            {PROJECT_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowAllMobile(true);
                  }}
                  className={`inline-flex h-[38px] items-center gap-2 rounded-[9px] px-4 text-[13px] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F432] ${
                    isSelected
                      ? 'bg-[#C6F432] text-[#0A0A0A]'
                      : 'text-[#8A8A93] hover:text-[#EDEDED]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`font-mono text-[10px] ${
                      isSelected ? 'text-[#3D4A10]' : 'text-[#55555C]'
                    }`}
                  >
                    {String(counts[category]).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => {
            const isFeaturedCard = project.featured && activeCategory === 'All';
            const hiddenOnMobileCollapsed = !showAllMobile && activeCategory === 'All' && idx >= 3;

            if (isFeaturedCard) {
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35 }}
                  onClick={() => onSelectProject(project)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1C1C1F] bg-[#0F0F10] transition-colors hover:border-[#2E2E34] md:col-span-2 lg:flex-row"
                >
                  <ProjectVisual
                    project={project}
                    className="h-[230px] shrink-0 lg:h-auto lg:w-[46%] lg:border-r lg:border-b-0"
                  />

                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase text-[#8A8A93]">
                      <span className="h-1.5 w-1.5 rounded-[2px] bg-[#C6F432]" />
                      Featured · {project.tagLine}
                    </div>

                    <h3 className="mt-3.5 text-[24px] leading-[1.1] font-semibold tracking-[-0.035em] text-[#EDEDED] transition-colors group-hover:text-white lg:text-[32px]">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-[14.5px] leading-[1.6] text-[#8A8A93] lg:text-base">
                      {project.summary}
                    </p>

                    {/* Telemetry KPI Strip */}
                    <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-xl border border-[#1C1C1F] bg-[#0B0B0C]">
                      {project.metrics.map((kpi, kIdx) => (
                        <div
                          key={kpi.label}
                          className={`px-3.5 py-3.5 ${
                            kIdx < project.metrics.length - 1 ? 'border-r border-[#1C1C1F]' : ''
                          }`}
                        >
                          <div className="text-[18px] font-semibold tracking-[-0.03em] text-[#C6F432] lg:text-[22px]">
                            {kpi.value}
                          </div>
                          <div className="mt-1 font-mono text-[10px] tracking-[0.03em] text-[#6B6B73]">
                            {kpi.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stack Chips */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 7).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex h-[26px] items-center rounded-md border border-[#222226] bg-[#131315] px-2.5 font-mono text-[11px] text-[#B4B4BB]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="inline-flex h-[38px] items-center gap-2 rounded-lg bg-[#C6F432] px-3.5 text-[13px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#d2f857]"
                      >
                        Open case study
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-[#2A2A2E] bg-[#0F0F10] px-3.5 text-[13px] font-semibold text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            }

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35 }}
                onClick={() => onSelectProject(project)}
                className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1C1C1F] bg-[#0F0F10] transition-colors hover:border-[#2E2E34] ${
                  hiddenOnMobileCollapsed ? 'hidden md:flex' : 'flex'
                }`}
              >
                <ProjectVisual project={project} className="h-[210px]" />

                <div className="flex flex-1 flex-col px-[22px] pt-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase text-[#8A8A93]">
                    <span className="h-1.5 w-1.5 rounded-[2px] bg-[#C6F432]" />
                    {project.tagLine}
                  </div>

                  <h3 className="mt-3 text-[21px] leading-[1.2] font-semibold tracking-[-0.025em] text-[#EDEDED] transition-colors group-hover:text-white">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-[1.6] text-[#8A8A93]">{project.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex h-[26px] items-center rounded-md border border-[#222226] bg-[#131315] px-2.5 font-mono text-[11px] text-[#B4B4BB]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="inline-flex h-[26px] items-center rounded-md border border-[#222226] bg-[#131315] px-2.5 font-mono text-[11px] text-[#6B6B73]">
                        +{project.stack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#18181B] px-[22px] py-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.02em] text-[#EDEDED] transition-colors group-hover:text-[#C6F432]"
                  >
                    Case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[#222226] text-[#B4B4BB] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile Expand Button (matches Figma 390px) */}
        {!showAllMobile && activeCategory === 'All' && filteredProjects.length > 3 && (
          <div className="mt-5 md:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile(true)}
              className="flex h-12 w-full items-center justify-center rounded-[10px] border border-[#2A2A2E] bg-[#0F0F10] text-[15px] font-semibold text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432]"
            >
              Show all {filteredProjects.length} projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
