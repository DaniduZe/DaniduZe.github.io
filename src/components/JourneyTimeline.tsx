import { motion } from 'framer-motion';
import { Briefcase, Download, GraduationCap, Linkedin } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { TIMELINE_ENTRIES, type TimelineKind } from '../data/timeline';

function KindIcon({ kind }: { kind: TimelineKind }) {
  if (kind === 'WORK') {
    return <Briefcase className="h-[17px] w-[17px]" aria-hidden="true" />;
  }
  return <GraduationCap className="h-[17px] w-[17px]" aria-hidden="true" />;
}

export function JourneyTimeline() {
  return (
    <section id="journey" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Left Sticky Summary */}
          <div className="lg:w-[400px] lg:shrink-0">
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#C6F432] lg:text-xs">
                <span className="text-[#55555C]">03 /</span> Journey
              </div>
              <h2 className="mt-3.5 text-[36px] leading-[1.03] font-semibold tracking-[-0.045em] text-[#EDEDED] sm:text-[46px] lg:mt-4 lg:text-[54px]">
                Experience, education <span className="text-[#55555C]">&amp; milestones.</span>
              </h2>
              <p className="mt-4 max-w-[360px] text-[15px] leading-[1.6] text-[#8A8A93]">
                Independent freelance engineering across IoT, hardware, AI and full-stack, backed by
                industry IoT product development at OREL Corporation and an Electronics BTech at
                SLTC.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-[#2A2A2E] bg-[#0F0F10] px-3.5 text-[13px] font-semibold text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href={PROFILE.resumeUrl}
                  download="Danidu-Sennath-Resume.pdf"
                  className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-[#2A2A2E] bg-[#0F0F10] px-3.5 text-[13px] font-semibold text-[#EDEDED] transition-colors hover:border-[#C6F432]/50 hover:text-[#C6F432]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Resume PDF
                </a>
              </div>
            </div>
          </div>

          {/* Right Vertical Signal Timeline */}
          <div className="relative flex-1">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-2 bottom-4 left-[17px] w-px bg-gradient-to-b from-[#C6F432] via-[#26262A] to-[#1A1A1D] sm:left-[19px]"
            />

            <ol className="space-y-0">
              {TIMELINE_ENTRIES.map((entry, idx) => (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="relative flex gap-4 pb-7 last:pb-0 sm:gap-7 sm:pb-8"
                >
                  <div
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border sm:h-10 sm:w-10 ${
                      entry.highlight
                        ? 'border-[#C6F432]/50 bg-[#12160A] text-[#C6F432]'
                        : 'border-[#26262A] bg-[#0F0F10] text-[#B4B4BB]'
                    }`}
                  >
                    <KindIcon kind={entry.kind} />
                  </div>

                  <div className="min-w-0 flex-1 border-b border-[#18181B] pb-6 last:border-b-0 sm:pb-7">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10.5px] tracking-[0.05em] uppercase text-[#6B6B73] sm:text-[11px]">
                      <span className="text-[#C6F432]">{entry.kind}</span>
                      <span>{entry.dateRange}</span>
                      {entry.badge && (
                        <span
                          className={`inline-flex h-[22px] items-center rounded-md border px-2 text-[10px] ${
                            entry.highlight
                              ? 'border-[#C6F432]/30 text-[#C6F432]'
                              : 'border-[#26262A] text-[#8A8A93]'
                          }`}
                        >
                          {entry.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2.5 text-[18px] leading-[1.25] font-semibold tracking-[-0.025em] text-[#EDEDED] sm:text-[22px]">
                      {entry.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#B4B4BB] sm:text-[15px]">
                      {entry.organization}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
